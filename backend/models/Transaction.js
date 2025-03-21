const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  transaction_id: { type: String, required: true, unique: true },
  transaction_date: { type: Date, required: true },
  transaction_amount: { type: Number, required: true },
  transaction_channel: { type: String, enum: ['web', 'mobile', 'POS', 'other'], required: true },
  transaction_payment_mode: { type: String, enum: ['Card', 'UPI', 'NEFT', 'Wallet', 'Cash'], required: true },
  payment_gateway_bank: { type: String, required: true },
  payer_email: { type: String, required: true },
  payer_mobile: { type: String, required: true },
  payer_card_brand: { type: String, required: true },
  payer_device: { type: String, required: true },
  payer_browser: { type: String, required: true },
  payer_id:{type:mongoose.Schema.Types.ObjectId, ref:'User', required:true},
  payee_id: { type: mongoose.Schema.Types.ObjectId, ref:'User', required: true }
}, { timestamps: true });

module.exports = mongoose.model('Transaction', transactionSchema);
