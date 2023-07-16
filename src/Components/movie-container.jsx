import { Fragment, useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { movieActions } from "../store/store";
import Movie from "./movie";
import Footer from "./footer";

import classes from "./movie-container.module.css";


const MovieContainer = (props) => {
    const [movies, setMovies] = useState([]);
    const [error, setError] = useState("");
    const [filteredMovies, setFilteredMovies] = useState([]);
    const [movieFilter, setMovieFilter] = useState("")
    const [title, setTitle] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const params = useParams();
    const navigate = useNavigate();
    

    const titleRef = useRef();
    const movieYearRef = useRef();
    const movieRatingRef = useRef();
    const movieFilterRef = useRef();

    const movieId = params.movieId;

    

    useEffect(() => {
        setTitle(titleRef.current.value);

        let time;

        if(title) {
            time = 1000
        } else {
            time = 0;
        }

        
        const timer = setTimeout(() => {
            setIsLoading(true)
            fetch(`https://api.themoviedb.org/3/search/movie?query=${title || "Troy"}&include_adult=false&language=en-US&page=1`,
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjMTFjNThiMWU1MDU5NjllNzQ4NGQ3NmE3ZTgxZWY3NSIsInN1YiI6IjY0YWY3MWIwM2UyZWM4MDEwZGFlOTJmNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.SyXvOKQKqOFbh2h-ZSZ0i_t1_bO4Hk8nfrrJ8F0ybTU"
                }
                }
            )
            .then(res => {
                if(!res.ok) {
                    throw new Error("oops! something went wrong");
                }
                return res.json();
            })
            .then(data => {
                setIsLoading(false)
                setMovies(data.results)
            })
            .catch(err => {
                setError(err.message || "oops! something went wrong")
                setIsLoading(false)
            })
        }, time)
        
        return () => {
            clearTimeout(timer);
        }
    }, [title]);

  

    const dispatch = useDispatch();

    // const movieId = router.query.movieId

    // const movieInfo = useSelector(state => {
    //     return state.value
    // })


    const titleChangeHandler = () => {
        setTitle(titleRef.current.value);

        if(movieFilter === "by rating") {
            movieRatingRef.current.value = "Select movie ratings";
        }

        if(movieFilter === "by year") {
            movieYearRef.current.value = "";
        }
        
        setFilteredMovies([])
    }

    const movieDetailsHandler = (id, event) => {
        event.preventDefault();
        
        const filteredMovie = movies.filter(movie => {
            return movie.id === id
        })

        dispatch(movieActions.searchMovies({movies: filteredMovie[0]}))

        navigate(`/movie-detail/${id}`)

    }


    const filterMovieHandler = (e) => {
        e.preventDefault()

        let movieRating;
        let movieYear;

        if(movieFilter === "by rating") {
            movieRating = movieRatingRef.current.value;
        } 

        if(movieFilter === "by year") {
            movieYear = movieYearRef.current.value;
        }


        if(movies.length > 0) {
            const movieFilter = movies.filter(movie => {
                const date = new Date(movie.release_date)
                const year = date.getFullYear();
                
                
                let movieRate
    
                if(movieRating === "ratings (below 5)") {
                    movieRate = movie.vote_average < 5
                } else if (movieRating === "ratings (5 and above)"){
                    movieRate = movie.vote_average >= 5
                }
    
                return year == movieYear || movieRate
            })

            setFilteredMovies(movieFilter);
        }
    }

    const movieFilterHandler = () => {
        const movieFilterValue = movieFilterRef.current.value;

        setMovieFilter(movieFilterValue);
    }

    const prevPage = (e) => {
        e.preventDefault();

        if(currentPage !== 1) {
            setCurrentPage(currentPage - 1)
        } else {
            return;
        }
    }

    const nextPage = (e) => {
        e.preventDefault();

        if(currentPage !== npage) {
            setCurrentPage(currentPage + 1)
        } else {
            return;
        }
    }

    const changePage = (id, e) => {
        e.preventDefault();

        setCurrentPage(id)
    }   

    
    const recordPerPage = 10;
    const lastIndex = currentPage * recordPerPage;
    const firstIndex = lastIndex - recordPerPage;

    const records = filteredMovies.length > 0 ?  filteredMovies.slice(firstIndex, lastIndex) : movies.slice(firstIndex, lastIndex);
    const npage = Math.ceil(filteredMovies.length > 0 ? filteredMovies.length / recordPerPage : movies.length / recordPerPage);
    const numbers = [...Array(npage + 1).keys()].slice(1);

    return <Fragment>
        <form className="text-center">
            <p style={{color: "red", fontSize: "0.8rem"}} >{error}</p>
            <div className={`container ${classes.search_bar}`} onChange={props.onChange}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" style={{
                    position: "absolute",
                    top: "30%",
                    left: "1.5rem"
                }}
                fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                </svg>
                <input type="text" className={classes.search_field} ref={titleRef} onChange={titleChangeHandler} placeholder="Enter movie title here..." />
            </div>
            {isLoading && <p className={classes.loading_text}>Loading...</p>}
            <div className={classes.filter__sect}>
                <div className={classes.select_options}>
                    <select ref={movieFilterRef} onChange={movieFilterHandler} className={movieFilter && movieFilter !== "Filter Movies" && `${classes.filter__movie}`}>
                        <option selected>Filter Movies</option>
                        <option>by rating</option>
                        <option>by year</option>
                    </select>
                    {movieFilter === "by rating" && <select ref={movieRatingRef}>
                        <option selected>Select movie ratings</option>
                        <option>ratings (below 5)</option>
                        <option>ratings (5 and above)</option>
                    </select>}
                    {movieFilter === "by year" && <input type="number" ref={movieYearRef} min="1" name="year" placeholder="enter movie year" />}
                </div>
                <div>
                    <button className={classes.filter_btn} onClick={filterMovieHandler}>Filter</button>
                </div>
            </div>
        </form>
        <div className={`container ${classes.movie_main}`}>
            <div className={`row ${classes.movie_container}`}>
            {movies.length > 0 && filteredMovies.length < 1 && records.map(movie => {
                return <Movie key={movie.id} image={movie.poster_path} action="View Details" onClick={movieDetailsHandler.bind(null, movie.id)} title={movie.title} date={movie.release_date} />
            })}
            {filteredMovies.length > 0 && records.map(movie => {
                return <Movie key={movie.id} image={movie.poster_path} action="View Details" onClick={movieDetailsHandler.bind(null, movie.id)} title={movie.title} date={movie.release_date} />
            })}
            {movies.length < 1 && filteredMovies.length < 1 && !error &&
                <div style={{textAlign: "center", margin: "7rem", marginBottom: "15rem"}}>
                    <p style={{fontWeight: "bold", fontSize: "1.5rem", marginBottom: "-0.2rem"}}>No Results</p>
                    <p>Sorry! no result for your search.</p>
                </div>}
            {error &&
                <div style={{textAlign: "center", margin: "7rem", marginBottom: "15rem"}}>
                    <p style={{fontWeight: "bold", fontSize: "1.5rem", marginBottom: "-0.2rem"}}>oops! Something went wrong!</p>
                    <p>Kindly try again</p>
                </div>}
            </div>
        </div>
        {numbers.length > 0 &&  
            <div className={classes.page__actions}>
                <button onClick={prevPage}>Prev</button>
                {numbers.map((num, i) => <button id={num} className={currentPage === num && `${classes.btn__active}`} onClick={changePage.bind(null, num)} key={i}>{num}</button>)}
                <button onClick={nextPage}>Next</button>
            </div>
        }
        <Footer />
    </Fragment>
}


export default MovieContainer;