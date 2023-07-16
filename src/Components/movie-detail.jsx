import { Fragment, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { movieActions } from "../store/store";

import classes from "./movie-details.module.css";

const MovieDetails = () => {
    const navigate = useNavigate();
    const [showFavourite, setShowFavourite] = useState(false);


    const dispatch = useDispatch()
    

    const movieInfo = useSelector(state => {
        return state.value
    })

    const movieFavourite = useSelector(state => {
        return state.favourites
    })

    console.log(movieFavourite)

    console.log(movieInfo);

    const date = new Date(movieInfo.movies.release_date)
    const year = date.getFullYear();

    const addToFavouritesHandler = (id, e) => {
        e.preventDefault();
        setShowFavourite(true)
        
        const favouritesCollection = []
        const favouriteMovie = {
            id: movieInfo.movies.id,
            image: `https://image.tmdb.org/t/p/w500/${movieInfo.movies.poster_path}`,
            title: movieInfo.movies.title,
            rating: movieInfo.movies.vote_average,
            year: year
        }

        const movieExist = movieFavourite.find(collection => collection.id === favouriteMovie.id);

        if(!movieExist) {
            console.log("new movie added");
            favouritesCollection.push(favouriteMovie)
            dispatch(movieActions.addToFavourites(favouritesCollection))
            setShowFavourite("Movies added to favourites");
            console.log(movieInfo)
            console.log(movieFavourite);
            setTimeout(() => {
                setShowFavourite(false)
            }, 2000);
            return;
        } else {
           const newFave = movieFavourite.filter(movie => movie.id !== id);
           console.log(newFave);
   
        }

        setTimeout(() => {
            setShowFavourite(false)
        }, 2000);
    }

    const returnHandler = (e) => {
        e.preventDefault();
        navigate("/");
    }

    console.log(movieInfo)

    return <Fragment>
        {showFavourite && <div style={{display: "flex", justifyContent: "center"}}>
            <p style={{color: "white", 
                                textAlign: "center",
                                 maxWidth: "400px", 
                                 position:"fixed", 
                                 backgroundColor: `${showFavourite === 
                                    "Movies added to favourites" ? 
                                    "green": "red"}`, 
                                 width: "80%",
                                 marginTop: "-3rem",
                                 borderRadius: "10px",
                                 padding: "0.7rem"
                                 }}>{showFavourite === "Movies added to favourites" ? 
                                    "movie added to favourites" : "movie already a favourite"}</p>
        </div>
        }
        {movieInfo.movies &&
        <div className={`${classes.details__division} container`}>
            <div className={`${classes.details__main}`}>
                <div className={classes.details_main}>
                    <h3>{movieInfo.movies.title}</h3>
                    <img src={`https://image.tmdb.org/t/p/w500/${movieInfo.movies.poster_path}`} alt={movieInfo.movies.title} className={classes.cartitem_img} />
                </div>
                <div className={classes.detail_description}>
                    <p>{movieInfo.movies.overview}</p>
                    <p><span>Rating:</span> {movieInfo.movies.vote_average}</p>
                    <p><span>Release Year:</span> {year || "Not Stated"}</p>
                </div>
            </div>
            <div className={classes.description_actions}>
                <button className={classes.return_btn} onClick={returnHandler}>Back</button>
                <button className={classes.add_btn} onClick={addToFavouritesHandler.bind(null, movieInfo.movies.id)}>Add to Favourites</button>
            </div>
        </div>}
        {!movieFavourite && <h3>You haven't selected any movie.</h3>}
    </Fragment>
}

export default MovieDetails;