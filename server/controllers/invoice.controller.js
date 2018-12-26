import {
    InvoiceModel
} from '../models/invoice.model';

import Joi from 'joi';
const {
    ObjectID
} = require('mongodb');


const findAllInvoices = async (req, resp, next) => { // eslint-disable-line
    try {
        const invoices = await InvoiceModel.find();

        resp.status(200).json(invoices);

    }
    catch (err) {
        resp.status(500).json({
            message: err
        });
    }

};


const createInvoice = async (req, resp, next) => { // eslint-disable-line

    /*   const {
          item,
          quantity,
          date,
          dueDate,
          rate,
          tax

      } = req.body; // destructring assignment



    if (!item || !quantity || !date || !dueDate) {

        //  resp.status(500).json({
        //      message: 'Please enter required filed'
        //  });

        // !Alternate approach of above code
        // !Throwing error to custom middleware

        const errorObj = new Error('Please enter required field');
        errorObj.status = 500;
        errorObj.message = 'Missing one of the required field';
        next(errorObj);
        return;
    }*/

    // !Instead of we validating the request body - weather particular property is there, data-type of a
    // ! property is correct, We can use Joi for validating our  http reqest body matches our mongooses schema
    const idealSchemaForInvoiceModel = Joi.object().keys({
        item: Joi.string().required(),
        quantity: Joi.number().integer().required(),
        date: Joi.date().required(),
        dueDate: Joi.date().required(),
        rate: Joi.number().required(),
        tax: Joi.number().optional()
    });

    // !JOI is mainly used to validate our schema
    // !Below JOi is validation our Idealschema with the request body send by frontend (instead we
    // !writing each validation logic manually)
    const { error, value } = Joi.validate(req.body, idealSchemaForInvoiceModel);

    if (error) {
        const errorObj = new Error('Request body Validation of Schema failed');
        errorObj.status = 500;
        errorObj.message = error;
        next(errorObj);
        return;
    }

    /*  const invoiceModel = new InvoiceModel({
         item,
         quantity,
         date,
         dueDate,
         rate,
         tax
     }); */
    const invoiceModel = new InvoiceModel(value);


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
        resp.status(500).json({
            message: err
        });
    }



};


const findInvoiceById = async (req, resp, next) => { // eslint-disable-line

    const uriIdFetch = req.params.id;

    if (!ObjectID.isValid(uriIdFetch)) {
        resp.status(404).json({
            message: 'Id Format is not valid'
        });
        return;
    }
    try {
        const invoice = await InvoiceModel.findOne({
            _id: uriIdFetch
        });

        if (!invoice) {
            // If document is empty
            resp.status(404).json({
                message: 'Id format is valid but no docu found with this id'
            });
            return;
        }

        //success
        resp.status(200).json({
            message: invoice
        });
    }
    catch (err) {
        resp.status(500).json({
            message: err
        });
    }

};

const deleteInvoicebyId = async (req, resp, next) => { // eslint-disable-line

    const uriIdFetch = req.params.id;

    if (!ObjectID.isValid(uriIdFetch)) {
        resp.status(404).json({
            message: 'Id Format is not valid'
        });
        return;
    }

    try {
        const invoiceDeleted = await InvoiceModel.findOneAndRemove({ //findOneAndRemove() fun return promise Object so, use await :)
            _id: uriIdFetch,
        });


        if (!invoiceDeleted) {
            // If document is empty
            resp.status(404).json({
                message: 'Id format is valid but no docu found with this id',
            });
            return;
        }

        //success
        resp.status(200).json({
            message: invoiceDeleted
        });
    }
    catch (err) {
        resp.status(500).json({
            message: err
        });
    }
};

const deleteAllInvoices = async (req, resp, next) => { // eslint-disable-line


    try {
        const invoicesDeleted = await InvoiceModel.deleteMany();


        if (!invoicesDeleted) {
            // If document is empty
            resp.status(404).json({
                message: 'Id format is valid but some error while deleting the documents'
            });
            return;
        }

        //success
        resp.status(200).json({
            message: invoicesDeleted
        });
    }
    catch (err) {
        resp.status(500).json({
            message: err
        });
    }
};


const updateInvoice = async (req, resp, next) => { // eslint-disable-line
    const idealSchemaForInvoiceModel = Joi.object().keys({
        item: Joi.string().optional(),
        quantity: Joi.number().integer().optional(),
        date: Joi.date().optional(),
        dueDate: Joi.date().optional(),
        rate: Joi.number().optional(),
        tax: Joi.number().optional()
    });

    const { error, value } = Joi.validate(req.body, idealSchemaForInvoiceModel);

    if (error) {
        resp.status(500).json({
            message: error
        });
        return;
    }



    const uriIdFetch = req.params.id;

    if (!ObjectID.isValid(uriIdFetch)) {
        resp.status(404).json({
            message: 'Id Format is not valid'
        });
        return;
    }

    try {
        const invoiceUpdated = await InvoiceModel.findOneAndUpdate({
            _id: uriIdFetch,
        }, value, { new: true });

        if (!invoiceUpdated) {
            resp.status(404).json({
                error: 'Id format is valid but no docu found with this id',
                isEveryThingOk: false
            });
            return;
        }

        //success
        resp.status(200).json({
            message: invoiceUpdated
        });

    } catch (err) {
        resp.status(500).json({
            message: err
        });
    }


};




module.exports = {
    findAllInvoices,
    createInvoice,
    findInvoiceById,
    deleteInvoicebyId,
    deleteAllInvoices,
    updateInvoice
};