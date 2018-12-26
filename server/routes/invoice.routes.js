import express from 'express';
import InvoiceController from '../controllers/invoice.controller';

const router = express.Router();

// !GET
router.get('', InvoiceController.findAllInvoices);

// !POST
router.post('', InvoiceController.createInvoice);

module.exports = {
    invoiceRoute: router
};