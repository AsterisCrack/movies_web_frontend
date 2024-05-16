import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import StarRating from './StarRating';
import GetUserData from './GetUserData';
import { useNavigate } from "react-router-dom";
import { LuPencil } from "react-icons/lu";
import './MovieDetails.css'; // Importamos el archivo CSS para estilos

function AdminUpdateMovie({ movie }) {

  const [addError, setAddError] = useState('');
  const [submitOk, setSubmitOk] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setAddError('');
    setSubmitOk('');
    const form = e.target;
    const data = new FormData(form);
    const payload = {
      title: data.get('title'),
      description: data.get('description'),
      genre: data.get('genre'),
      link_image: data.get('link_image'),
      director: data.get('director'),
      calification: data.get('calification'),
    };
    //delete empty fields of the payload
    Object.keys(payload).forEach(key => payload[key] === "" && delete payload[key]);
    console.log(payload);
    try {
      const response = await fetch(`http://127.0.0.1:8000/apps/movies/update/${movie.id}/` , {
        method: 'PATCH',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
      if (!response.ok) {
        const data = await response.json();
        Object.keys(data).forEach((key) => {
          setAddError(`${key}: ${data[key]}`);
        });
      }
      else {
        form.reset();
        setSubmitOk('Movie updated successfully');
      }
    } catch (error) {
      console.error('Error adding movie:', error);
    }
  }

  return <div className="container update-movie-form-container">
    <h2>Update movie</h2>
    <form className="form update-movie-form" onSubmit={handleSubmit}>
      <input className="form-field" type="text" name="title" placeholder={movie.title}/>
      <input className="form-field" type="text" name="description" placeholder={movie.description}/>
      <input className="form-field" type="text" name="genre" placeholder={movie.genre}/>
      <input className="form-field" type="text" name="link_image" placeholder={movie.link_image}/>
      <input className="form-field" type="text" name="director" placeholder={movie.director}/>
      <input className="form-field" type="number" name="calification" placeholder={movie.calification} min="0" max="10"/>
      {addError && <span className="span-error">{addError}</span>}
      {submitOk && <span className="span-ok">{submitOk}</span>}
      <button type="submit">Add movie</button>
      
    </form>
  </div>
}


function OpinionsList({ opinions }) {
  return (
    <>
    <ul>
      {opinions.map((opinion) => (
        <OpinionItem key={opinion.id} opinion={opinion} />
      ))}

    </ul>
    {opinions.length === 0 && <p>No opinions yet</p>}
    </>
  );
}
function OpinionItem({ opinion }) {
  const [username, setUsername] = useState('');
  useEffect(() => {
    const fetchUsername = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/apps/users/${opinion.user}/`);
        if (!response.ok) {
          setUsername('Deleted Account');
          throw new Error('Unable to fetch username');
        }
        const data = await response.json();
        setUsername(data.username);
      }
      catch (error) {
        setUsername('Deleted Account');
        console.error('Error fetching username:', error);
      }
    }
    fetchUsername();
  }
  , [opinion.user]);

  return (
    <li className="opinion-item">
      <p><strong>{username}</strong></p>
      <p>{opinion.comment}</p>
      <StarRating rating={opinion.calification/2} setRating={() => {}} blocked={true} num_stars={5}/>
    </li>
  );
}

function MovieDetails() {
  const navigate = useNavigate(); 
  const [user, setUser] = useState({});
  GetUserData({setUser});
  const { id } = useParams();
  const [movie, setMovie] = useState({});
  const [rating, setRating] = useState(0);
  const [opinion, setOpinion] = useState('');
  const [ratingError, setRatingError] = useState('');
  const [opinionError, setOpinionError] = useState('');
  const [submitOk, setSubmitOk] = useState('');

  const fetchMovieDetails = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/apps/movies/${id}`);
      if (!response.ok) {
        throw new Error('Unable to fetch movie details');
      }
      const data = await response.json();
      setMovie(data);
      setRating(data.calification/2);
    } catch (error) {
      console.error('Error fetching movie details:', error);
    }
  };

  useEffect(() => {
    fetchMovieDetails();
  }, [id]);

  const handleRatingSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://127.0.0.1:8000/apps/movies/${id}/rate/`, {
        method: 'PUT',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          calification: rating*2,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        console.log(data);
      }
      else {
        const data = await response.json();
        setSubmitOk('Rating added successfully');
        console.log('Rating added:', data);
        await fetchMovieDetails();
      }

    } catch (error) {
      console.error('Error adding rating:', error);
    }
  }

  const handleOpinionSubmit = async (e) => {
    e.preventDefault();
    setOpinionError('');
    setRatingError('');
    if (rating === 0) {
      setRatingError('Please enter a rating');
    }
    else {
      try {
        const response = await fetch(`http://127.0.0.1:8000/apps/movies/${id}/opinions/`, {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            user: user.id,
            comment: opinion,
            calification: rating*2,
          }),
        });

        if (!response.ok) {
          const data = await response.json();
          if (data.comment) {
            setOpinionError(data.comment);
          }
          if (data.calification) {
            setRatingError(data.calification);
          }
        }
        else {
          const data = await response.json();
          console.log('Opinion added:', data);
          setOpinion('');
          setSubmitOk('Opinion added successfully')
          await fetchMovieDetails();
        }
      }
      catch (error) {
        console.error('Error adding opinion:', error);
      }
    }
  }
  return (
    <div className="container">
      <main className="movie-details movie-details-focus">
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
          <p>
            <strong>Rating:</strong> <span>{Math.round(movie.calification * 100) / 100}</span>
          </p>
          <StarRating rating={movie.calification/2} setRating={setRating} blocked={true} num_stars={5}/>
        </div>
        {user.username === 'admin' && <AdminUpdateMovie movie={movie} />}
        <div className="opinions">
          <h3>Opinions</h3>
          {user.username && (
          <form className="form opinion-form" onSubmit={opinion ? handleOpinionSubmit : handleRatingSubmit}>
            <textarea
              placeholder="Enter your opinion"
              className='form-field'
              value={opinion}
              onChange={(e) => setOpinion(e.target.value)}
            ></textarea>
            {opinionError && <span className="span-error">{opinionError}</span>}
            <StarRating rating={rating} setRating={setRating} blocked={false} num_stars={5}/>
            {ratingError && <span className="span-error">{ratingError}</span>}
            {submitOk && <span className="span-ok">{submitOk}</span>}
            <button className='form-field' type="submit">Add Opinion</button>
          </form>
          )}
          {!user.username && <p>Login to add an opinion</p>}
          {movie.opinions && movie.opinions.length > 0 && <OpinionsList opinions={movie.opinions} />}
          {movie.opinions && movie.opinions.length === 0 && <p>No opinions yet</p>}
        </div>
        
        
      </main>
    </div>
  );
}

export default MovieDetails;
