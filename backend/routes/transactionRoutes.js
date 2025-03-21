const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transactionController');

// Route to store a transaction
router.post('/transactions', transactionController.createTransaction);

// Route to get all transactions
router.get('/transactions', transactionController.getAllTransactions);

// Route to get a transaction by ID
router.get('/transactions/:id', transactionController.getTransactionById);

module.exports = router;
