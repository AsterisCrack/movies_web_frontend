import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import StarRating from './StarRating';
import './MovieDetails.css'; // Importamos el archivo CSS para estilos

function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState({});
  const [rating, setRating] = useState(0);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/apps/movies/${id}`);
        if (!response.ok) {
          throw new Error('Unable to fetch movie details');
        }
        const data = await response.json();
        setMovie(data);
        // Setting a default rating for demonstration
        setRating(4);
      } catch (error) {
        console.error('Error fetching movie details:', error);
      }
    };
    fetchMovieDetails();
  }, [id]);

  return (
    <div className="container">
      <main className="movie-details">
        <img src={movie.link_image} alt="Thumbnail" id="thumbnail" />
        <div className="info">
          <h2>{movie.title}</h2>
          <p>{movie.description}</p>
          <p>
            <strong>Director:</strong><span>{movie.director}</span>
          </p>
          <p>
            <strong>Genre:</strong> <span>{movie.genre}</span>
          </p>
          <StarRating rating={rating} setRating={setRating} blocked={false} num_stars={5}/>
          <div className="opinions">
            <h3>Opinions</h3>
            <ul>
              {movie.opinions && movie.opinions.map(opinion => (
                <li key={opinion.id} className="opinion-item">
                  <p><strong>User:</strong> {opinion.user}</p>
                  <p><strong>Comment:</strong> {opinion.comment}</p>
                  <p><strong>Rating:</strong> {opinion.calification}</p>
                  <p><strong>Created At:</strong> {opinion.created_at}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
}

export default MovieDetails;


