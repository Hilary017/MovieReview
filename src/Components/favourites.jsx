import { useSelector, useDispatch } from "react-redux";

import { movieActions } from "../store/store";
import Movie from "./movie";
import { useState } from "react";
import { Link } from "react-router-dom";

// import classes from "./favourites.module.css";
import classes from "./favourites.module.css";

const Favourites = () => {
    const dispatch = useDispatch();
    const favouriteMovie = useSelector((state) => {
        return state.favourites
    })

    const [movies, setMovies] = useState(favouriteMovie);

    useState(() => {
            setMovies(movies)
            }, 
            [movies])

    const removeMovieHandler = (id, event) => {
        event.preventDefault();

        const filteredMovies = movies.filter(movie => {
            return movie.id !== id;
        })

        dispatch(movieActions.removeFromFavourites(filteredMovies)) 
        setMovies(filteredMovies);
    }

    return  <div>
            <div className={`container ${classes.movie_main}`}>
                <div className={`row ${classes.movie_container}`}>
                    <h2 style={{textAlign: "center", fontWeight: "bold", color: "black", marginBottom: "1rem"}}>Favourite Movies</h2>
                    {movies.length > 0 && movies.map(movie => {
                        return <Movie key={movie.id} image={movie.image} action="Remove" onClick={removeMovieHandler.bind(null, movie.id)} title={movie.title} date={movie.year} />
                    })}
                    {movies.length < 1 && 
                    <div className={classes.empty_favourites}>
                        <p style={{color: "white", textAlign: "center", marginTop: "3rem"}}>You do not have any favourite movie at the moment</p>
                        <button>
                            <Link to="/">
                            Return to HomePage
                            </Link>
                        </button>
                    </div>}
                </div>
            </div>
        </div>
}

export default Favourites;