import { useEffect, useState } from 'react';

import Header from './Header.jsx'
import Footer from './Footer.jsx'
import { NavLink } from 'react-router-dom';

const INITIAL_PAGE = 1;
const MOVIES_PER_PAGE = 3;

function ListPage({movieList, currentPage, setCurrentPage}) {
  return <div className="container">
    <h2>Our movies</h2>
    <PageFilter currentPage={currentPage} setCurrentPage={setCurrentPage}/>
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

function MovieList({movieList}) {
  if (!movieList) {
    return <div>Loading...</div>;
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
      </div>
    </div>)
}

function App() {
  const [currentPage, setCurrentPage] = useState(INITIAL_PAGE);
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
        console.log(data.products[0]);
        setMovieList(data.products);
      } catch (error) {
        console.error('Error while fetching movies:', error);
      }
    };

    fetchMovies();
  }, [currentPage]);

  return (
      <ListPage movieList={movieList} currentPage={currentPage} setCurrentPage={setCurrentPage}/>
  )
}

export default App
