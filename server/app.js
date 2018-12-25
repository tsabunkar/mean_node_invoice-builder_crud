// const express = require('express');
import express from 'express';
const app = express();
const PORT = 3000;
app.get('/', (req, resp) => {
    resp.json({
        message: "'Welcone'"
    });
});

app.listen(PORT);