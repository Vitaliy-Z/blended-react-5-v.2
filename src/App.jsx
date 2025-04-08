import { lazy, Suspense, useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { fetchBaseCurrency } from './redux/currency/currencyOps';
import { setDefaultBaseCurrency } from './redux/currency/currencySlice';
import Header from './components/Header/Header';
import Loader from './components/Loader/Loader';
const Home = lazy(() => import('./pages/Home'));
const Rates = lazy(() => import('./pages/Rates'));

export const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    };
    const successGetPosition = position => {
      dispatch(fetchBaseCurrency(position.coords));
    };
    const errorGetPosition = () => {
      dispatch(setDefaultBaseCurrency('USD'));
    };

    navigator.geolocation.getCurrentPosition(
      successGetPosition,
      errorGetPosition,
      options,
    );
  }, [dispatch]);

  return (
    <>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<Header />}>
            <Route index element={<Home />} />
            <Route path="/rates" element={<Rates />} />
          </Route>
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Suspense>
    </>
  );
};
