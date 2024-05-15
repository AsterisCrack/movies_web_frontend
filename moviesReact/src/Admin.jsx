import React, { useState } from "react";

export default function AdminPage() {
    const [movie, setMovie] = useState({
        title: "",
        genre: "",
        description: "",
        rating: 0,
        image: null
    });
    const [errorMessage, setErrorMessage] = useState("");

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setMovie({ ...movie, [name]: value });
    };

    const handleImageChange = (e) => {
        setMovie({ ...movie, image: e.target.files[0] });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Basic form validation
        if (!movie.title || !movie.genre || !movie.description || !movie.rating || !movie.image) {
            setErrorMessage("All fields are required.");
            return;
        }

        setErrorMessage("");

        const formData = new FormData();
        formData.append("title", movie.title);
        formData.append("genre", movie.genre);
        formData.append("description", movie.description);
        formData.append("rating", movie.rating);
        formData.append("image", movie.image);

        // Submit the form data to an API endpoint or server
        // Example POST request
        /*
        fetch("/api/movies", {
            method: "POST",
            body: formData,
        })
        .then(response => response.json())
        .then(data => {
            // Handle successful response
            console.log("Movie submitted successfully:", data);
        })
        .catch(error => {
            // Handle error response
            console.error("Error submitting movie:", error);
        });
        */

        console.log("Movie submitted:", movie);
    };

    return (
        <main className="admin-page">
            <h1>Add a New Movie</h1>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            <form onSubmit={handleSubmit} className="movie-form">
                <label>
                    Title:
                    <input
                        type="text"
                        name="title"
                        value={movie.title}
                        onChange={handleInputChange}
                        required
                    />
                </label>
                <label>
                    Genre:
                    <input
                        type="text"
                        name="genre"
                        value={movie.genre}
                        onChange={handleInputChange}
                        required
                    />
                </label>
                <label>
                    Description:
                    <textarea
                        name="description"
                        value={movie.description}
                        onChange={handleInputChange}
                        required
                    ></textarea>
                </label>
                <label>
                    Rating:
                    <input
                        type="number"
                        name="rating"
                        value={movie.rating}
                        onChange={handleInputChange}
                        min="0"
                        max="10"
                        step="0.1"
                        required
                    />
                </label>
                <label>
                    Image:
                    <input
                        type="file"
                        name="image"
                        onChange={handleImageChange}
                        accept="image/*"
                        required
                    />
                </label>
                <button type="submit">Submit</button>
            </form>
        </main>
    );
}