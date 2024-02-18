const mongoose = require('mongoose');
const Expense = require("./models/chat.js"); 
const Income = require("./models/chat2.js");
main()
.then((res)=>{
    console.log("connection successfull");
})
.catch((err)=>{
    console.log(err);
})

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/bank');

}

// Expense.insertMany([
//     {
//         name:"books",
//         amount:2000,
//         description:"Waste of money",
//     },
    
// ])

Income.insertMany([
    {
        amount:10000,
    },
    {
        amount:10000,
    }
]);


