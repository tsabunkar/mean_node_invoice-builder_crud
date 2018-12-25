import {
    InvoiceModel
} from '../models/invoice.model';


const invoices = [{
        id: '123',
        item: 'Amazon'
    },
    {
        id: '124',
        item: 'Flipkart'
    },
    {
        id: '125',
        item: 'Snapdeal'
    },
];

const findAllInvoices = (req, resp, next) => { // eslint-disable-line
    resp.status(200).json({
        message: invoices
    });

};


const createInvoice = (req, resp, next) => { // eslint-disable-line
    /*   const {
          item,
          quantity,
          date,
          dueDate,
          rate,
          tax
      } = req.body; // destructring assignment */

    const {
        invoiceObject
    } = req.body; // destructring assignment


    if (!invoiceObject.item || !invoiceObject.quantity || !invoiceObject.date || !invoiceObject.dueDate) {
        resp.status(500).json({
            message: 'Please enter required filed'
        });
        return;
    }

    async () => {
        const invoiceCreated = await InvoiceModel.create(invoiceObject);

        if (!invoiceCreated) {
            resp.status(500).json({
                message: 'Failed to create Inovice Object'
            });
            return;
        }

        resp.status(500).json({
            message: invoiceCreated
        });
    };

};

module.exports = {
    findAllInvoices,
    createInvoice
};