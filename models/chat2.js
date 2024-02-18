const mongoose = require('mongoose');
let incomeSchema = mongoose.Schema({
    amount:{
        type:Number,
        required:true,
        default:0.
    }
})
const Income  =  mongoose.model("Income",incomeSchema);


module.exports = Income;