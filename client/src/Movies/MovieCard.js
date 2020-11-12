import Axios from 'axios';
import React from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';


const MovieCard = props => {
  const { id, title, director, metascore, stars } = props.movie;
  const { push } = useHistory()

  const handleUpdate = () => {
    push(`/update-movie/${id}`)
  }

  const handleDelete = () => {
    axios
      .delete(`http://localhost:5000/api/movies/${id}`)
      .then(res => {
        console.log(res)
        const newMovieList = props.movieList.filter(movie => movie.id !== id)

        props.setMovieList(newMovieList)

      })
      .catch(err => {
        console.log(err)
      })
    push('/')
  }

  return (
    <div className="movie-card">


      <h2>{title}</h2>
      <div className="movie-director">
        Director: <em>{director}</em>
      </div>
      <div className="movie-metascore">
        Metascore: <strong>{metascore}</strong>
      </div>
      <h3>Actors</h3>

      {stars.map(star => (
        <div key={star} className="movie-star">
          {star}
        </div>
      ))}

      <button onClick={handleUpdate}>Update Movie</button>
      <button onClick={handleDelete}>Delete Movie</button>
    </div>
  );
};

export default MovieCard;
