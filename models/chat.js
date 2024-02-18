const mongoose = require('mongoose');

const expScheme = mongoose.Schema({
    name:{
        type:String,
        required:true  
      },
    amount:{
        type:Number,
        required:true
    },
    description:{
        type:String,
        maxLength :100,                            
    },
    bank:{
        type:String,
        required:true,
        default:"SBI"
    }
});


const Expense = mongoose.model("Expense",expScheme);

module.exports  = Expense;    // exporting file to index.js
