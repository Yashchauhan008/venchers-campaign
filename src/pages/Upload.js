import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ImageUpload from '../components/ImageUpload';
import Navbar from '../components/navbar';
import { useKindeAuth } from "@kinde-oss/kinde-auth-react";

const Upload = () => {
    const { user } = useKindeAuth();
    const imageUrls = Array(160).fill('https://via.placeholder.com/150');
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [selectedBlock, setSelectedBlock] = useState(null);

    useEffect(() => {
        if (user) {
            checkUserExists();
        }
    }, [user]);

    const checkUserExists = async () => {
        try {
            const response = await axios.get('http://localhost:5000/users');
            const users = response.data;
            const userExists = users.some(existingUser => existingUser.email === user.email);

            if (!userExists) {
                await addUser();
            }
        } catch (error) {
            console.error('Error checking user:', error);
        }
    };

    const addUser = async () => {
        try {
            await axios.post('http://localhost:5000/users', {
                email: user.email,
                name: user.given_name + ' ' + user.family_name,
                picture: user.picture
            });
            console.log('User added successfully');
        } catch (error) {
            console.error('Error adding user:', error);
        }
    };

    const handleBlockClick = (index) => {
        setSelectedBlock(index);
        setIsPopupOpen(true);
    };

    const closePopup = () => {
        setIsPopupOpen(false);
        setSelectedBlock(null);
    };

    return (
        <>
            <Navbar />
            <h2>You have 2 credits. Click any block to upload a photo.</h2>
            <div className="grid-container">
                {imageUrls.map((url, index) => (
                    <div key={index} className="grid-item" onClick={() => handleBlockClick(index)}>
                        <img src={url} alt={`img-${index}`} />
                    </div>
                ))}
            </div>
            {isPopupOpen && (
                <div className="popup">
                    <div className="popup-content">
                        <button className="close-popup" onClick={closePopup}>Close</button>
                        <ImageUpload blockNumber={selectedBlock} closePopup={closePopup} />
                    </div>
                </div>
            )}
        </>
    );
};

export default Upload;