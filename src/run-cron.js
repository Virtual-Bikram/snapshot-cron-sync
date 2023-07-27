require('./db.js');
const { initiateSyncV2 } = require('./controllers/initiateSync');
const { Plans } = require('./models/Plans');
const cron = require('node-cron');

const PLANS = [ 'BASIC', 'PRO', 'PLATINUM', 'INSTITUTIONAL' ];


/**
 * Runs a basic cron job that executes a given function every minute.
 * @return {Promise<void>} This function does not return anything.
 */
const runBasicCron = async () => {
	const basicPlan = await Plans.findOne({ planCode: 'BASIC' }).lean().exec();
	cron.schedule('* * * * *', async () => {
		if (basicPlan) {
			await initiateSyncV2(basicPlan, PLANS[0]);
		}
	});
};


/**
 * Runs a pro cron job that executes a given function every minute.
 * @return {Promise<void>} This function does not return anything.
 */
const runProCron = async () => {
	cron.schedule('* * * * *', async () => {
		const proPlan = await Plans.findOne({ planCode: PLANS[1] }).lean().exec();
		await initiateSyncV2(proPlan, PLANS[1]);
	});
};


/**
 * Runs a platinum cron job that executes a given function every minute.
 * @return {Promise<void>} This function does not return anything.
 */
const runPlatinumCron = async () => {
	const platinumPlan = await Plans.findOne({ planCode: PLANS[2] }).lean().exec();
	cron.schedule('* * * * *', async () => {
		await initiateSyncV2(platinumPlan, PLANS[2]);
	});
};


/**
 * Runs a institutional cron job that executes a given function every minute.
 * @return {Promise<void>} This function does not return anything.
 */
const runInstitutionalCron = async () => {
	const institutionalPlan = await Plans.findOne({ planCode: PLANS[3] }).lean().exec();
	cron.schedule('* * * * *', async () => {
		await initiateSyncV2(institutionalPlan, PLANS[3]);
	});
};

Promise.all([ runBasicCron(), runProCron(), runPlatinumCron(), runInstitutionalCron() ]);
