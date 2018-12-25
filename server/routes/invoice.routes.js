import express from 'express';
import InvoiceController from '../controllers/invoice.controller';

const router = express.Router();

// !GET
router.get('/invoice', InvoiceController.findAllInvoices);

// !POST
router.post('/invoice', InvoiceController.createInvoice);

module.exports = {
    invoiceRoute: router
};