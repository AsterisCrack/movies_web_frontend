import { useEffect, useState } from 'react';
import StarRating from './StarRating';
import { NavLink } from 'react-router-dom';

const INITIAL_PAGE = 1;
const MOVIES_PER_PAGE = 3;

function ListPage({movieList, currentPage, setCurrentPage, title, setTitle, description, setDescription, genre, setGenre, rating, setRating}) {
  return <div className="container">
    <h2>Our movies</h2>
    <PageFilter currentPage={currentPage} setCurrentPage={setCurrentPage}/>
    <Filter title={title} setTitle={setTitle} description={description} setDescription={setDescription} genre={genre} setGenre={setGenre} rating={rating} setRating={setRating}/>
    <MovieList movieList={movieList}/>
  </div>
}

function PageFilter({currentPage, setCurrentPage}) {

  function changePage(page) {
    page = Math.max(1, page);
    setCurrentPage(page);
  }

  return <>
    <div className="buttons">
      <button onClick={() => changePage(currentPage - 1)} disabled={currentPage==INITIAL_PAGE}>&lt;</button>
      <input type="number" value={currentPage} onChange={(e) => changePage(e.target.value)}/>
      <button onClick={() => changePage(currentPage + 1)}>&gt;</button>
    </div>
  </>
}

function Filter({title, setTitle, description, setDescription, genre, setGenre, rating, setRating}) {
  return <div className="filter">
    <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)}/>
    <input type="text" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)}/>
    <input type="text" placeholder="Genre" value={genre} onChange={(e) => setGenre(e.target.value)}/>
    <input type="text" placeholder="Rating" value={rating} onChange={(e) => setRating(e.target.value)}/>
  </div>
}

function MovieList({movieList}) {
  if (!movieList) {
    return <div>Loading...</div>;
  }
  if (movieList.length === 0) {
    return <div>No movies found matching the criteria</div>;
  }
  return (<div>
    {movieList.map(movie =>
        <Movie key={movie.id} movie={movie} />
      )}
  </div>);
}

function Movie({movie}) {
  return (
    <div className="movie-details" id="movieDetails">
      <NavLink to={`/movie/${movie.id}`}>
        <img src={movie.thumbnail} alt="Thumbnail" id="thumbnail" />
      </NavLink>
      <div className="info">
        <NavLink to={`/movie/${movie.id}`}>
          <h2>{movie.title}</h2>
        </NavLink>
        <p>{movie.description}</p>
        <p>
          <strong>Precio:</strong><span>{movie.price}€</span>
        </p>
        <p>
          <strong>Stock:</strong> <span>{movie.stock}</span>
        </p>
        <StarRating rating={movie.rating} setRating={() => {}} blocked={true} num_stars={10}/>
      </div>
    </div>)
}

function App() {
  const [currentPage, setCurrentPage] = useState(INITIAL_PAGE);
  // Users can filter by title, description, gente and rating
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [genre, setGenre] = useState('');
  const [rating, setRating] = useState('');
  const [movieList, setMovieList] = useState([]);

  useEffect(() => {
    let skip = (currentPage - INITIAL_PAGE) * MOVIES_PER_PAGE;
    const fetchMovies = async () => {
      try {
        const response = await fetch(`https://dummyjson.com/products?limit=${MOVIES_PER_PAGE}&skip=${skip}`);
        if (!response.ok) {
          throw new Error('Unable to fetch movies');
        }
        const data = await response.json();
        setMovieList(data.products);
      } catch (error) {
        console.error('Error while fetching movies:', error);
      }
    };

    fetchMovies();
  }, [currentPage]);

  return (
      <ListPage movieList={movieList} currentPage={currentPage} setCurrentPage={setCurrentPage} title={title} setTitle={setTitle} description={description} setDescription={setDescription} genre={genre} setGenre={setGenre} rating={rating} setRating={setRating}/>
  )
}

export default App
