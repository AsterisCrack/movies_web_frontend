import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

function MovieDetails() {
  const id = window.location.pathname.split("/").pop();
  const [movie, setMovie] = useState({});
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch(`https://dummyjson.com/products?limit=1&skip=${id-1}`);
        if (!response.ok) {
          throw new Error('Unable to fetch movies');
        }
        const data = await response.json();
        setMovie(data.products[0])
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };
    fetchMovies();
  }, [id]);

  return <div className="container">
    <main className="movie-details">
      <img src={movie.thumbnail} alt="Thumbnail" id="thumbnail" />
      <div className="info">
        <h2>{movie.title}</h2>
        <p>{movie.description}</p>
        <p>
          <strong>Precio:</strong><span>{movie.price}€</span>
        </p>
        <p>
          <strong>Stock:</strong> <span>{movie.stock}</span>
        </p>
      </div>
    </main>
  </div>
}

export default MovieDetails;