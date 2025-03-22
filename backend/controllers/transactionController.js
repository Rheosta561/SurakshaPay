const Transaction = require('../models/Transaction'); // Import Transaction Model

// @desc   Create and Store a New Transaction
// @route  POST /api/transactions
// @access Public
exports.createTransaction = async (req, res) => {
    try {
        const transactionData = req.body;

        // Check if transaction ID already exists to prevent duplicates
        const existingTransaction = await Transaction.findOne({ transaction_id_anonymous: transactionData.transaction_id });
        if (existingTransaction) {
            return res.status(400).json({ message: 'Transaction ID already exists' });
        }

        // Create new transaction entry
        const transaction = new Transaction(transactionData);
        await transaction.save();

        res.status(201).json({ message: 'Transaction stored successfully', transaction });
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

// @desc   Get All Transactions
// @route  GET /api/transactions
// @access Public
exports.getAllTransactions = async (req, res) => {
    try {
        const transactions = await Transaction.find();
        res.status(200).json(transactions);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

// @desc   Get a Single Transaction by ID
// @route  GET /api/transactions/:id
// @access Public
exports.getTransactionById = async (req, res) => {
    try {
        const transaction = await Transaction.findOne({ transaction_id_anonymous: req.params.id });

        if (!transaction) {
            return res.status(404).json({ message: 'Transaction not found' });
        }

        res.status(200).json(transaction);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};
