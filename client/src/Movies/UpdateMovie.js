import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import axios from 'axios';
import MovieList from './MovieList';

const initialInput = {
    title:"",
    director:'',
    metascore:0,
}

const UpdateMovie = props => {
    const [input, setInput ] = useState(initialInput)
    const { id } = useParams();
    const { push } = useHistory();

    useEffect(() => {
        axios
            .get(`http://localhost:5000/api/movies/${id}`)
            .then(res => {
                setInput(res.data);
            })
            .catch(err => {
                console.log(err)
            })
    }, [])

    const changeHandler = e => {
        e.preventDefault();
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = e => {
        e.preventDefault();
        axios
            .put(`http://localhost:5000/api/movies/${id}`, input)
            .then(res => {
    
                const newMovieList = props.movieList.map(movie => {
                    if (movie.id === id) {
                        return res.data
                    }
                    return movie
                })

                props.setMovieList(newMovieList)
                push(`/`)
            })
            .catch(err => {
                console.log(err)
            })
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>
                    Title
                    <input
                        type='text'
                        name='title'
                        onChange={changeHandler}
                        value={input.title}
                    />
                </label>
                <label>
                    Director
                    <input
                        type='text'
                        name='director'
                        onChange={changeHandler}
                        value={input.director}
                    />
                </label>
                <label>
                    Metascore
                    <input
                        type='number'
                        name='metascore'
                        onChange={changeHandler}
                        value={input.metascore}
                    />
                </label>
                <button>Submit</button>
            </form>
        </div>
    )
}

export default UpdateMovie;