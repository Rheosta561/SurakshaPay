const express = require("express");
const { register, login } = require("../controllers/authController");
const router = express.Router();
const User = require("../models/User");
const Method = require("../models/Method");
const { v4: uuidv4 } = require("uuid");
const Transaction = require("../models/Transaction");


router.post("/register", register);
router.post("/login", login);
router.post('/saveMethod' , async(req,res)=>{
    const userId = req.body.userId;
    const upi = req.body.upi;
    const card_number = req.body.card_number;
    const newMethod = await Method.findOneAndUpdate({userId}, {
        upi,
        card_number,

    });
    res.status(200).json({message:"Method saved successfully",
        methdo:newMethod
    });


});
router.post("/saveTransaction", async (req, res) => {
    try {
        const {
            userId,
            payeeId,
            amount,
            channel,
            paymentMode,
            bank,
            email,
            mobile,
            cardBrand,
            device,
            browser
        } = req.body;

        if (!userId || !payeeId || !amount || !channel || !paymentMode || !bank || !email || !mobile || !cardBrand || !device || !browser) {
            return res.status(400).json({ error: "All fields are required" });
        }


        const newTransaction = await Transaction.create({
            transaction_id_anonymous: uuidv4(),
            transaction_date: new Date(),
            transaction_amount: amount,
            transaction_channel: channel,
            transaction_payment_mode_anonymous: paymentMode,
            payment_gateway_bank_anonymous: bank,
            payer_email_anonymous: email,
            payer_mobile_anonymous: mobile,
            payer_card_brand: cardBrand,
            payer_device: device,
            payer_browser_anonymous: browser,
            payer_id: userId,
            payee_id_anonymous: payeeId
        });

        return res.status(201).json({ success: true, message: "Transaction saved successfully!", transaction: newTransaction });
    } catch (error) {
        console.error("Error saving transaction:", error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
});
router.get('/getTransactions/:userId', async (req, res) => {
    try {
        const userId = req.params.userId;
        const transactions = await Transaction.find({ payer_id: userId });

        if (!transactions.length) {
            return res.status(404).json({ message: "No transactions found" });  // ✅ Ensure response is returned
        }

        res.status(200).json({ transactions });  // ✅ Only one response sent
    } catch (error) {
        console.error("Error fetching transactions:", error);
        return res.status(500).json({ message: "Internal Server Error" });  // ✅ Return ensures no duplicate response
    }
});


module.exports = router;
