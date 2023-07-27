const { Types } = require("mongoose");
const { Balance } = require("./models/Balance");
const {Plans} = require("./models/Plans");
const { Subscription } = require("./models/Subscription");
const {User} = require("./models/User");
require('./db.js');

// /**
//  * Inserts an array of plans into the "Plans" collection when the server starts.
//  * @return {Promise<any>} A promise that resolves with the result of the insert operation.
//  */
// const insertToPlans = async () => {
//   const data = [
//     {
//       name: "basic",
//       price: 10,
//       status: true,
//       duration: 120,
//       description:
//         "Users snapshots is taken 2 times a day / Store snapshot every 12 hour.",
//       expiresInDays: 365,
//       syncPeriod: "DAY",
//       syncRepetation: 2,
//       planCode: "BASIC",
//     },
//     {
//       name: "pro",
//       price: 20,
//       status: true,
//       duration: 60,
//       description:
//         "Users snapshot taken every 1 hours/ Store snapshot every 1 hour.",
//       expiresInDays: 40,
//       syncPeriod: "HOUR",
//       syncRepetation: 1,
//       planCode: "PRO",
//     },
//     {
//       name: "platinum",
//       price: 55,
//       status: true,
//       duration: 10,
//       description:
//         "Users snapshot is taken every 15 minutes/ Store snapshot every 15 min.",
//       expiresInDays: 50,
//       syncPeriod: "HOUR",
//       syncRepetation: 4,
//       planCode: "PLATINUM",
//     },
//     {
//       name: "institutional",
//       price: 20,
//       status: true,
//       duration: 15,
//       description:
//         "Users snapshot is taken every 15 minutes/ Store snapshot every 15 min.",
//       expiresInDays: 60,
//       syncPeriod: "HOUR",
//       syncRepetation: 4,
//       planCode: "INSTITUTIONAL",
//     },
//   ];

//   const existingPlans = await Plans.find({});
//   // Check if any of the data already exists in the database as this function runs on the server start
//   const newData = data.filter((newItem) => {
//     return !existingPlans.some((existingItem) => {
//       return (
//         newItem.name === existingItem.name &&
//         newItem.price === existingItem.price &&
//         newItem.status === existingItem.status &&
//         newItem.syncPeriod === existingItem.syncPeriod &&
//         newItem.syncRepetation === existingItem.syncRepetation &&
//         newItem.planCode === existingItem.planCode &&
//         newItem.description === existingItem.description &&
//         newItem.expiresInDays === existingItem.expiresInDays
//       );
//     });
//   });
//   if (newData.length === 0) {
//     return;
//   }
//   const result = await Plans.insertMany(newData);
//   return result;
// };

// insertToPlans();

// User.insertMany([
//     {
//       email: "user1@example.com",
//       first_name: "John",
//       last_name: "Doe",
//       role: "admin",
//       address: "123 Main Street",
//     },
//     {
//       email: "user2@example.com",
//       first_name: "Jane",
//       last_name: "Smith",
//       role: "user",
//       address: "456 Elm Avenue",
//     },
//     {
//       email: "user3@example.com",
//       first_name: "Michael",
//       last_name: "Johnson",
//       role: "user",
//       address: "789 Oak Road",
//     },
//     {
//       email: "user4@example.com",
//       first_name: "Emily",
//       last_name: "Williams",
//       role: "user",
//       address: "1010 Pine Lane",
//     },
//     {
//       email: "user5@example.com",
//       first_name: "David",
//       last_name: "Brown",
//       role: "user",
//       address: "111 Maple Drive",
//     }
//   ]);


// Subscription.insertMany([
//     {
//         planId:"64c148701abeb0741078e1d4",
//         userId:"64c149b6e14cc3c928e9ff03",
//     },
//     {
//         planId:"64c148701abeb0741078e1d5",
//         userId:"64c149b6e14cc3c928e9ff04",
//     },
//     {
//         planId:"64c148701abeb0741078e1d6",
//         userId:"64c149b6e14cc3c928e9ff05",
//     },
//     {
//         planId:"64c148701abeb0741078e1d7",
//         userId:"64c149b6e14cc3c928e9ff06",
//     },
//     {
//         planId:"64c148701abeb0741078e1d7",
//         userId:"64c149b6e14cc3c928e9ff07",
//     }
// ])
  


// Assuming you have already inserted five users in the "users" collection as shown in the previous example.

// Example user IDs from the "users" collection
const userId1 =new Types.ObjectId("64c149b6e14cc3c928e9ff03"); // Use the actual ObjectId for user1 from your "users" collection
const userId2 =new Types.ObjectId("64c149b6e14cc3c928e9ff04"); // Use the actual ObjectId for user2 from your "users" collection
const userId3 =new Types.ObjectId("64c149b6e14cc3c928e9ff05"); // Use the actual ObjectId for user3 from your "users" collection
const userId4 =new Types.ObjectId("64c149b6e14cc3c928e9ff06"); // Use the actual ObjectId for user4 from your "users" collection
const userId5 =new Types.ObjectId("64c149b6e14cc3c928e9ff07"); // Use the actual ObjectId for user5 from your "users" collection

// Inserting five balance records
//  Balance.insertMany([
//   {
//     user: userId1,
//     balance: 1000,
//     account: "defi",
//   },
//   {
//     user: userId2,
//     balance: 500,
//     account: "cefi",
//   },
//   {
//     user: userId3,
//     balance: 750,
//     account: "defi",
//   },
//   {
//     user: userId4,
//     balance: 2000,
//     account: "defi",
//   },
//   {
//     user: userId5,
//     balance: 300,
//     account: "cefi",
//   },
// ]);
