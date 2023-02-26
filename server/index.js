const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 5000;

app.use(bodyParser.json());

function requireAuth(req, res, next) {
    if (!req.user) {
        res.status(401).send('Unauthorized');
    } else {
        next();
    }
}

app.get('/offers', requireAuth, (req, res) => {
    const page = req.query.page || 1;
    const recordsPerPage = req.query.records || 100;
    const searchAttribute = req.query.attribute || 'offer_title';
    const searchQuery = req.query.query || '';


    const results = [];

    res.status(200).json({
        page: page,
        has_more: false,
        offers: results,
    });
});

app.put('/offers/:id', requireAuth, (req, res) => {
    const offerId = req.params.id;
    const offerData = req.body;
    const savedOffer = offerData;
    res.status(200).json(savedOffer);
});

app.delete('/offers/:id', requireAuth, (req, res) => {
    const offerId = req.params.id;

    res.status(200).send('Offer deleted successfully');
});

app.listen(port, () => {
    console.log(`Live Ops Engine API listening at http://localhost:${port}`);
});
