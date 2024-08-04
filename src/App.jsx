import { Route, Routes } from 'react-router-dom';
import './App.css';
import { lazy, Suspense } from 'react';
import Header from './components/Header/Header';

const Home = lazy(() => import('./pages/HomePage/HomePage'));
const Movies = lazy(() => import('./pages/MoviesPage/MoviesPage'));
const MovieDetails = lazy(() =>
  import('./pages/MovieDetailsPage/MovieDetailsPage')
);
const MovieCast = lazy(() => import('./components/MovieCast/MovieCast'));
const MovieReviews = lazy(() =>
  import('./components/MovieReviews/MovieReviews')
);
const NotFound = lazy(() => import('./pages/NotFoundPage/NotFoundPage'));

function App() {
  return (
    <>
      <Header />
      <Suspense fallback={<h2>LOADING YOUR COMPONENT!</h2>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movies" element={<Movies />} />

          <Route path="/movies/:movieId" element={<MovieDetails />}>
            <Route path="cast" element={<MovieCast />} />
            <Route path="reviews" element={<MovieReviews />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
