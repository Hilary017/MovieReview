// import Link from "next/link";
import { Link } from "react-router-dom";
import classes from "./Navbar.module.css";

import { useSelector } from "react-redux";

const Navbar = () => {
    const favourites = useSelector(state => {
        return state.favourites
    })

    return <header className={`${classes.nav_container}`}>
        <nav className={`${classes.nav__bar} container`}>
            <div className={classes.nav__list}>
                <h1>
                    <Link to="/">
                        MoviePreview
                    </Link>
                </h1>
                <li className={classes.favourites__link}>
                    <Link to="/favourites">
                        <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" className="bi bi-star-fill" viewBox="0 0 16 16">
                            <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                        </svg>
                    </Link>
                    <span style={{color: "red", fontWeight: "bold"}}>{favourites.length}</span>
                </li>
            </div>
        </nav>
    </header>
}

export default Navbar;