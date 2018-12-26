import {
    InvoiceModel
} from '../models/invoice.model';


/* const invoices = [{
    item: 'walmart',
    quantity: 200,
    date: '2018-11-21',
    dueDate: '2018-05-29',
    rate: 1,
    tax: 1
},
{
    item: 'Flipkart',
    quantity: 150,
    date: '2018-06-21',
    dueDate: '2018-05-28',
    rate: 1,
    tax: 2
},
{
    item: 'Amazon',
    quantity: 100,
    date: '2018-05-01',
    dueDate: '2018-05-20',
    rate: 2,
    tax: 1
},
]; */

const findAllInvoices = (req, resp, next) => { // eslint-disable-line
    resp.status(200).json({
        message: require('../config/invoices.json')
    });

};


const createInvoice = async (req, resp, next) => { // eslint-disable-line

    const {
        item,
        quantity,
        date,
        dueDate,
        rate,
        tax

    } = req.body; // destructring assignment

    if (!item || !quantity || !date || !dueDate) {

        /*      resp.status(500).json({
                 message: 'Please enter required filed'
             }); */

        // !Alternate approach of above code
        // !Throwing error to custom middleware

        const errorObj = new Error('Please enter required field');
        errorObj.status = 500;
        errorObj.message = 'Missing one of the required field';
        next(errorObj);
        return;
    }

    // async () => {

    const invoiceModel = new InvoiceModel({
        item,
        quantity,
        date,
        dueDate,
        rate,
        tax
    });

    try {
        const invoiceCreated = await invoiceModel.save();
        // console.log('invoiceCreated', invoiceCreated);
        if (!invoiceCreated) {
            resp.status(500).json({
                message: 'Failed to create Inovice Object'
            });
            return;
        }

        resp.status(200).json({
            message: 'You have created object succesfully!',
            data: invoiceCreated
        });

    } catch (err) {
        resp.status(500).send({
            message: err
        });
    }



};

module.exports = {
    findAllInvoices,
    createInvoice
};