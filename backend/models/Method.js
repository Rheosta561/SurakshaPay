const mongoose = require('mongoose');
const MethodSchema = mongoose.Schema({
    upi:{
        type:String,
    },
    card_number:{
        type:Number,
    },
    userId : {
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    }

});

module.exports= mongoose.model('Method',MethodSchema);