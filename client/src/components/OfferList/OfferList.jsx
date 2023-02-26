import React, { useState, useEffect } from 'react';
import axios from 'axios';

function OffersList() {
    const [offers, setOffers] = useState([]);
    const [editing, setEditing] = useState(null);
    const [newOffer, setNewOffer] = useState({
        offer_title: '',
        offer_description: '',
        offer_image: '',
        offer_sort_order: 0,
        content: [],
        schedule: {
            days_of_week: [],
            dates_of_month: [],
            months_of_year: []
        },
        target: '',
        pricing: []
    });

    useEffect(() => {
        axios.get('/api/offers').then((response) => {
            setOffers(response.data.offer);
        });
    }, []);

    function handleEdit(offer) {
        setEditing(offer.offer_id);
        setNewOffer(offer);
    }

    function handleDelete(offer) {
        axios.delete(`/api/offers/${offer.offer_id}`).then(() => {
            setOffers((prevOffers) => prevOffers.filter((o) => o.offer_id !== offer.offer_id));
        });
    }

    function handleSave() {

        if (editing) {
            axios.put(`/api/offers/${editing}`, newOffer).then(() => {
                setOffers((prevOffers) => prevOffers.map((o) => (o.offer_id === editing ? newOffer : o)));
                setEditing(null);
                setNewOffer({
                    offer_title: '',
                    offer_description: '',
                    offer_image: '',
                    offer_sort_order: 0,
                    content: [],
                    schedule: {
                        days_of_week: [],
                        dates_of_month: [],
                        months_of_year: []
                    },
                    target: '',
                    pricing: []
                });
            });
        } else {
            axios.post('/api/offers', newOffer).then((response) => {
                setOffers((prevOffers) => [...prevOffers, response.data]);
                setNewOffer({
                    offer_title: '',
                    offer_description: '',
                    offer_image: '',
                    offer_sort_order: 0,
                    content: [],
                    schedule: {
                        days_of_week: [],
                        dates_of_month: [],
                        months_of_year: []
                    },
                    target: '',
                    pricing: []
                });
            });
        }
    }

    return (
        <div>
            <h1>Offers List</h1>
            <table>
                <thead>
                    <tr>
                        <th>Offer Title</th>
                        <th>Offer Description</th>
                        <th>Offer Image</th>
                        <th>Offer Sort Order</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {offers.map((offer) => (
                        <tr key={offer.offer_id}>
                            <td>{offer.offer_title}</td>
                            <td>{offer.offer_description}</td>
                            <td>{offer.offer_image}</td>
                            <td>{offer.offer_sort_order}</td>
                            <td>
                                <button onClick={() => handleEdit(offer)}>Edit</button>
                            </td>
                            <td>
                                <button onClick={() => handleDelete(offer)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <h2>{editing ? 'Edit Offer' : 'Create New Offer'}</h2>
            <form>
                <label htmlFor="offerTitle">Offer Title:</label>
                <input
                    type="text"
                    id="offerTitle"
                    name="offerTitle"
                    value={formData.offerTitle}
                    onChange={handleChange}
                />

                <label htmlFor="offerDescription">Offer Description:</label>
                <textarea
                    id="offerDescription"
                    name="offerDescription"
                    value={formData.offerDescription}
                    onChange={handleChange}
                ></textarea>

                <label htmlFor="offerCategory">Offer Category:</label>
                <select
                    id="offerCategory"
                    name="offerCategory"
                    value={formData.offerCategory}
                    onChange={handleChange}
                >
                    <option value="food">Food</option>
                    <option value="technology">Technology</option>
                    <option value="fashion">Fashion</option>
                    <option value="health">Health</option>
                    <option value="other">Other</option>
                </select>

                <label htmlFor="offerExpiryDate">Offer Expiry Date:</label>
                <input
                    type="date"
                    id="offerExpiryDate"
                    name="offerExpiryDate"
                    value={formData.offerExpiryDate}
                    onChange={handleChange}
                />

                <button type="submit">Create Offer</button>
            </form>
        </div>
    )
}

export default OffersList