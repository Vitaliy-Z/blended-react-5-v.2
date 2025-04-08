import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Wave } from 'react-animated-text';
import {
  selectBaseCurrency,
  selectError,
  selectFilter,
  selectIsLoading,
  selectRates,
} from '../redux/selectors';
import { fetchLatestRates } from '../redux/currency/currencyOps';
import Section from '../components/Section/Section';
import Container from '../components/Container/Container';
import Heading from '../components/Heading/Heading';
import Loader from '../components/Loader/Loader';
import RatesList from '../components/RatesList/RatesList';
import Filter from '../components/Filter/Filter';

const Rates = () => {
  const isError = useSelector(selectError);
  const isLoading = useSelector(selectIsLoading);
  const baseCurrency = useSelector(selectBaseCurrency);
  const filter = useSelector(selectFilter);
  const rates = useSelector(selectRates);

  const dispatch = useDispatch();

  const fileredRates = rates
    .filter(
      ([key]) => key !== baseCurrency && key.toLowerCase().includes(filter),
    )
    .map(([key, value]) => ({ key, value: (1 / value).toFixed(2) }));

  useEffect(() => {
    dispatch(fetchLatestRates(baseCurrency));
  }, [dispatch, baseCurrency]);

  return (
    <Section>
      <Container>
        {isError && (
          <Heading
            error
            title="Something went wrong...😐 We cannot show current rates!"
          />
        )}
        {isLoading && <Loader />}

        <Heading
          info
          bottom
          title={
            <Wave
              text={`$ $ $ Current exchange rate for 1 ${baseCurrency} $ $ $`}
              effect="fadeOut"
              effectChange={4.0}
            />
          }
        />

        {fileredRates.length > 0 && (
          <>
            <Filter />
            <RatesList rates={fileredRates} />
          </>
        )}
      </Container>
    </Section>
  );
};

export default Rates;
