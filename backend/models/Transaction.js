const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  transaction_id_anonymous: { type: String, required: true, unique: true },
  transaction_date: { type: Date, required: true },
  transaction_amount: { type: Number, required: true },
  transaction_channel: { type: String, enum: ['web', 'mobile', 'POS', 'other'], required: true },
  transaction_payment_mode_anonymous: { type: String, enum: ['Card', 'UPI', 'NEFT', 'Wallet', 'Cash'], required: true },
  payment_gateway_bank_anonymous: { type: String, required: true },
  payer_email_anonymous: { type: String, required: true },
  payer_mobile_anonymous: { type: String, required: true },
  payee_ip_anonymous:{type:String , default:`773220d255be3b46b7bacc6ef9bc3174aeb7fa962080961bdf119860b2f1b71b` },
  payer_card_brand: { type: String },
  payer_device: { type: String, required: true },
  payer_browser_anonymous: { type: String, required: true },
  payer_id:{type:mongoose.Schema.Types.ObjectId, ref:'User', required:true},
  payee_id_anonymous: { type: mongoose.Schema.Types.ObjectId, ref:'User', required: true },
}, { timestamps: true });

module.exports = mongoose.model('Transaction', transactionSchema);
