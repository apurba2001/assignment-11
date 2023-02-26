import React, { useState } from 'react';

const AddOffer = () => {
    const [offerTitle, setOfferTitle] = useState('');
    const [offerCategory, setOfferCategory] = useState('');
    const [offerDescription, setOfferDescription] = useState('');
    const [offerPrice, setOfferPrice] = useState('');
    const [offerImage, setOfferImage] = useState(null);

    const handleInputChange = (event) => {
        const { name, value } = event.target;

        switch (name) {
            case 'offerTitle':
                setOfferTitle(value);
                break;
            case 'offerCategory':
                setOfferCategory(value);
                break;
            case 'offerDescription':
                setOfferDescription(value);
                break;
            case 'offerPrice':
                setOfferPrice(value);
                break;
            default:
                break;
        }
    };

    const handleImageChange = (event) => {
        setOfferImage(event.target.files[0]);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        // Create offer object from form data
        const formData = new FormData();
        formData.append('offerTitle', offerTitle);
        formData.append('offerCategory', offerCategory);
        formData.append('offerDescription', offerDescription);
        formData.append('offerPrice', offerPrice);
        formData.append('offerImage', offerImage);

        // Send form data to backend API
        fetch('http://localhost:5000/api/offers', {
            method: 'POST',
            body: formData,
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setFormMessage(data.message);
                if (data.success) {
                    setFormData(defaultFormData);
                }
            })
            .catch((error) => {
                console.error(error);
                setFormMessage('An error occurred while submitting the form.');
            });
    };

    return (
        <div className="offer-form-container">
            <h2>Create an Offer</h2>
            {formMessage && <p className={formSuccess ? 'success' : 'error'}>{formMessage}</p>}
            <form onSubmit={handleSubmit}>
                <label htmlFor="offerTitle">Offer Title:</label>
                <input
                    type="text"
                    id="offerTitle"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                />
                <label htmlFor="offerDescription">Offer Description:</label>
                <textarea
                    id="offerDescription"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                ></textarea>
                <label htmlFor="offerPrice">Price:</label>
                <input
                    type="number"
                    id="offerPrice"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                />
                <label htmlFor="offerExpiration">Expiration Date:</label>
                <input
                    type="date"
                    id="offerExpiration"
                    name="expiration"
                    value={formData.expiration}
                    onChange={handleInputChange}
                />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default AddOffer
