import { useEffect, useState } from 'react';
import StarRating from './StarRating';
import { NavLink } from 'react-router-dom';
import GetUserData from './GetUserData';

const INITIAL_PAGE = 1;
const MOVIES_PER_PAGE = 3;

function ListPage({ movieList, currentPage, setCurrentPage, title, setTitle, description, setDescription, genre, setGenre, rating, setRating }) {
  return (
    <div className="container">
      <h2>Our movies</h2>
      <PageFilter currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <Filter 
        title={title} setTitle={setTitle} 
        description={description} setDescription={setDescription} 
        genre={genre} setGenre={setGenre} 
        rating={rating} setRating={setRating} />
      <MovieList 
        movieList={movieList} 
        titleFilter={title} 
        descriptionFilter={description} 
        genreFilter={genre} 
        ratingFilter={rating} />
    </div>
  );
}

function AdminAddMovie() {

  const [addError, setAddError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
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

    try {
      const response = await fetch('http://127.0.0.1:8000/apps/movies/add/', {
        method: 'POST',
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
      //form.reset();
    } catch (error) {
      console.error('Error adding movie:', error);
    }
  }

  return <div className="container">
    <h2>Add movie</h2>
    <form className="form add-movie-form" onSubmit={handleSubmit}>
      <input className="form-field" type="text" name="title" placeholder="Title" required/>
      <input className="form-field" type="text" name="description" placeholder="Description" required/>
      <input className="form-field" type="text" name="genre" placeholder="Genre" required/>
      <input className="form-field" type="text" name="link_image" placeholder="Image URL" required/>
      <input className="form-field" type="text" name="director" placeholder="Director" required/>
      <input className="form-field" type="number" name="calification" placeholder="Calification" min="0" max="10"required/>
      {addError && <span className="span-error">{addError}</span>}
      <button type="submit">Add movie</button>
      
    </form>
  </div>
}



function PageFilter({ currentPage, setCurrentPage }) {
  function changePage(page) {
    page = Math.max(1, page);
    setCurrentPage(page);
  }

  return (
    <>
      <div className="buttons">
        <button onClick={() => changePage(currentPage - 1)} disabled={currentPage === INITIAL_PAGE}>&lt;</button>
        <input type="number" value={currentPage} onChange={(e) => changePage(e.target.value)} />
        <button onClick={() => changePage(currentPage + 1)}>&gt;</button>
      </div>
    </>
  );
}

function Filter({ title, setTitle, description, setDescription, genre, setGenre, rating, setRating }) {
  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleGenreChange = (e) => {
    setGenre(e.target.value);
  };

  const handleRatingChange = (e) => {
    setRating(e.target.value);
  };

  return (
    <div className="filter">
      <input type="text" placeholder="Title" value={title} onInput={handleTitleChange} />
      <input type="text" placeholder="Description" value={description} onInput={handleDescriptionChange} />
      <input type="text" placeholder="Genre" value={genre} onInput={handleGenreChange} />
      <input type="text" placeholder="Rating" value={rating} onInput={handleRatingChange} />
    </div>
  );
}



function MovieList({ movieList, titleFilter, descriptionFilter, genreFilter, ratingFilter }) {
  let filteredMovies = movieList;

  // Apply filters
  if (titleFilter) {
    filteredMovies = filteredMovies.filter(movie => movie.title.toLowerCase().includes(titleFilter.toLowerCase()));
  }

  if (descriptionFilter) {
    filteredMovies = filteredMovies.filter(movie => movie.description.toLowerCase().includes(descriptionFilter.toLowerCase()));
  }

  if (genreFilter) {
    filteredMovies = filteredMovies.filter(movie => movie.genre.toLowerCase().includes(genreFilter.toLowerCase()));
  }

  if (ratingFilter) {
    filteredMovies = filteredMovies.filter(movie => movie.calification.toString().toLowerCase().includes(ratingFilter.toLowerCase()));
  }

  if (!filteredMovies) {
    return <div>Loading...</div>;
  }
  if (filteredMovies.length === 0) {
    return <div>No movies found matching the criteria</div>;
  }
  
  return (
    <div>
      {filteredMovies.map(movie => <Movie key={movie.id} movie={movie} />)}
    </div>
  );
}

function Movie({ movie }) {
  return (
    <div className="movie-details" id="movieDetails">
      <NavLink to={`/movie/${movie.id}`}>
        <img src={movie.link_image} alt="Thumbnail" id="thumbnail" />
      </NavLink>
      <div className="info">
        <NavLink to={`/movie/${movie.id}`}>
          <h2>{movie.title}</h2>
        </NavLink>
        <p>{movie.description}</p>
        <StarRating rating={movie.calification} setRating={() => { }} blocked={true} num_stars={10} />
        <p>
          <strong>Genre:</strong> <span>{movie.genre}</span>
        </p>
        <p>
          <strong>Director:</strong> <span>{movie.director}</span>
        </p>
        <p>
          <strong>Rating:</strong> <span>{movie.calification}</span>
        </p>
      </div>
    </div>
  );
}

function App() {
  const [user, setUser] = useState({});
  GetUserData({setUser});

  const [currentPage, setCurrentPage] = useState(INITIAL_PAGE);
  // Users can filter by title, description, genre and rating
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [genre, setGenre] = useState('');
  const [rating, setRating] = useState('');
  const [movieList, setMovieList] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/apps/movies/`);
        if (!response.ok) {
          throw new Error('Unable to fetch movies');
        }
        const data = await response.json();
        setMovieList(data);
      } catch (error) {
        console.error('Error while fetching movies:', error);
      }
    };

    fetchMovies();
  }, []);

  return (
    <>
      {user.username === "admin" && <AdminAddMovie />}
    <ListPage
      movieList={movieList}
      currentPage={currentPage}
      setCurrentPage={setCurrentPage}
      title={title}
      setTitle={setTitle}
      description={description}
      setDescription={setDescription}
      genre={genre}
      setGenre={setGenre}
      rating={rating}
      setRating={setRating}
    />
    </>
  );
}

export default App;
