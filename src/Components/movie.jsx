import classes from "./Movie.module.css";

const Movie = (props) => {
    const d = new Date(props.date);
    const year = d.getFullYear();

    return  <div className={`col-sm-12 col-md-4 col-lg-3 ${classes.cartitem__div}`}>
        <img src={`https://image.tmdb.org/t/p/w500/${props.image}`} alt={props.title} className={classes.cartitem_img} />
        <div className={classes.movie__actions}>
            <div>
                <h3>Movie Title: <span>{props.title}</span></h3>
                <h3>Release Year: <span>{year || "Not Stated"}</span></h3>
            </div>
        </div>
        <div className={classes.details_btn}>
            <button onClick={props.onClick}>{props.action}</button>
        </div>
    </div>
}

export default Movie;