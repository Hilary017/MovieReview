import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './components/home';


import './App.css';

import SearchBar from './components/movie-container';
import Favourites from './components/favourites';
import MovieDetails from './components/movie-detail';
import Error from './components/error';


const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <SearchBar />,
      },
      {
        path: "/favourites",
        element: <Favourites />
      },
      {
        path: "/movie-detail/:movieId",
        element: <MovieDetails />
      },
    ]
  }
])

function App() {
  return (
      <>
        <RouterProvider router={router} />
      </>
  )
}

export default App;
