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

const findAllInvoices = (req, resp) => {
    resp.status(200).json({
        message: invoices
    });
};

module.exports = {
    findAllInvoices
};