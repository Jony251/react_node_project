import React, { useState, useEffect } from 'react';
import './GameUpload.css';
import dataGames from '../../Data/gameData';
import CustomButton from '../common/CustomButton/CustomButton';

const GameUpload = () => {
    const [gameData, setGameData] = useState({
        title: '',
        description: '',
        image: null,
    });
    const [existingGames, setExistingGames] = useState([]);
    const [showPopup, setShowPopup] = useState(false);

    // Fetch existing games when component mounts
    useEffect(() => {
        fetchExistingGames();
    }, []);

    const fetchExistingGames = () => {
        try {
            setExistingGames(dataGames);
        } catch (error) {
            console.error('Error processing games:', error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setGameData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setGameData(prevState => ({
            ...prevState,
            image: file
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Check if game already exists
        const gameExists = existingGames.some(
            game => game.title.toLowerCase() === gameData.title.toLowerCase()
        );

        if (gameExists) {
            setShowPopup(true);
            setTimeout(() => setShowPopup(false), 3000); // Hide popup after 3 seconds
            return;
        }

        // Add new game to the list
        const newGame = {
            id: existingGames.length + 1,
            title: gameData.title,
            description: gameData.description,
            image: gameData.image ? URL.createObjectURL(gameData.image) : null,
        };

        setExistingGames(prev => [...prev, newGame]);

        // Reset form after submission
        setGameData({
            title: '',
            description: '',
            image: null,
        });

        // Optional: You can add a success message here
        alert('Game successfully added!');
    };

    return (
        <div className="game-upload-container">
            <h2>Upload New Game</h2>
            {showPopup && (
                <div className="popup error">
                    Game already exists! Please choose a different name.
                </div>
            )}
            <form onSubmit={handleSubmit} className="game-upload-form">
                <div className="form-group">
                    <label htmlFor="title">Game Title</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={gameData.title}
                        onChange={handleInputChange}
                        required
                        placeholder="Enter game title"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <textarea
                        id="description"
                        name="description"
                        value={gameData.description}
                        onChange={handleInputChange}
                        required
                        placeholder="Enter game description"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="image">Game Image</label>
                    <div className="custom-file-input">
                        <input
                            type="file"
                            id="image"
                            name="image"
                            accept="image/*"
                            onChange={handleImageChange}
                            required
                            className="file-input"
                        />
                        <CustomButton 
                            isFileInput={true}
                            onClick={() => document.getElementById('image').click()}
                        >
                            Choose Image
                        </CustomButton>
                        {gameData.image && (
                            <span className="file-name">
                                {gameData.image.name}
                            </span>
                        )}
                    </div>
                </div>

                <CustomButton 
                    type="submit"
                    variant="primary" 
                    className="primary"
                >
                    Upload Game
                </CustomButton>
            </form>
        </div>
    );
};

export default GameUpload;
