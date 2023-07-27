const { Types } = require('mongoose');
const { Subscription } = require('../models/Subscription');
const { User } = require('../models/User');
const { Balance } = require('../models/Balance');
const { Snapshot } = require('../models/Snapshot');


/**
 * Initiates the synchronization process for a given plan.
 * @param {object} plan - The plan object for which synchronization needs to be initiated.
 * @return {boolean} Returns true if the synchronization process is successful, otherwise false.
 */
async function initiateSyncV2(plan) {
	let users;
	try {
		users = await getUsersForSyncAsPlans(plan);
	} catch (e) {
		console.log('error', e);
		return false;
	}

	if (users && users.length === 0) {
		console.log('No users found for sync');
		return false;
	}

	try {
		await Promise.all(
			users.map(async (user) => {
				await syncUser(user._id);
			})
		);
	} catch (e) {
		console.log('error', e);
		return false;
	}
}

/**
 * Retrieves users for sync based on the specified plan.
 * @param {object} plan - The plan object containing syncPeriod, syncRepetation, and _id.
 * @return {Promise} A promise that resolves with the updated users.
 */
const getUsersForSyncAsPlans = async (plan) => {
	const { syncPeriod, syncRepetation, _id } = plan;
	let new_next_sync_time = new Date().getTime();
	if (syncPeriod === 'DAY') {
		let nextRepetation = Math.floor(24 * 60 * 60 * 1000 / syncRepetation);
		new_next_sync_time = new_next_sync_time + nextRepetation;
	}
	if (syncPeriod === 'HOUR') {
		let nextRepetation = Math.floor(60 * 60 * 1000 / syncRepetation);
		new_next_sync_time = new_next_sync_time + nextRepetation;
	}

	try {
		const subscribedUsers = (await Subscription.find({ planId: _id, status: true })).map((user) => {
			return new Types.ObjectId(user.userId);
		});

		const usersWithNextSync = await User.aggregate([
			{
				$match: {
					_id: { $in: subscribedUsers },
					status: true,
					sync_running: false,
					next_sync_time: { $lte: new Date().getTime() }
				}
			}
		]);

		const updatedUsers = await Promise.all(
			usersWithNextSync.map(async (user) => {
				try {
					const userID = user._id;
					const userUpdateSync = await User.findOneAndUpdate(
						{
							_id: userID
						},
						{
							$set: { next_sync_time: new_next_sync_time }
						},
						{ new: true }
					)
						.lean()
						.exec();
					return userUpdateSync;
				} catch (error) {
					console.error(`Error updating user ${user._id}:`, error);
					return null; // Return null or handle the error as needed
				}
			})
		);
		return updatedUsers;
	} catch (error) {
		console.log(error);
	}
};

/**
 * Updates the user's snapshot with the current balance.
 * @param {string} userId - The ID of the user.
 * @return {Promise<void>} The promise that resolves once the snapshot has been updated.
 */
const syncUser = async (userId) => {
	const balance = await Balance.findOne({ user: userId }).lean().exec();
	if (balance) {
		const userSnapshot = await Snapshot.findOne({ user: userId }).lean().exec();

		if (userSnapshot) {
			await Snapshot.updateOne({ user: userId }, { $set: { totalBalance: balance.balance + 100 } }).lean().exec();
		} else {
			const snapshot = await Snapshot.create({
				user: userId,
				totalBalance: balance.balance + 100
			})
				.lean()
				.exec();
			snapshot.save();
		}
	}
};

module.exports = {
	initiateSyncV2
};
