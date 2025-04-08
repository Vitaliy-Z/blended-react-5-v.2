import Section from '../components/Section/Section';
import Container from '../components/Container/Container';
import Heading from '../components/Heading/Heading';
import { useSelector } from 'react-redux';
import {
  selectError,
  selectExchangeInfo,
  selectIsLoading,
} from '../redux/selectors';
import Loader from '../components/Loader/Loader';
import ExchangeForm from '../components/ExchangeForm/ExchangeForm';
import ExchangeInfo from '../components/ExchangeInfo/ExchangeInfo';

const Home = () => {
  const isError = useSelector(selectError);
  const isLoading = useSelector(selectIsLoading);
  const exchangeInfo = useSelector(selectExchangeInfo);

  return (
    <Section>
      <Container>
        {isError && (
          <Heading
            error
            title="Something went wrong...😐 Check the data validity and try again!"
          />
        )}
        {isLoading && <Loader />}
        {!isLoading && !isError && (
          <>
            <Heading info title="What currencies do you want to exchange?🙂" />
            <br />
            <ExchangeForm />
            {exchangeInfo && <ExchangeInfo {...exchangeInfo} />}
            {isError && (
              <Heading
                error
                title="Something went wrong...😐 Check the data validity and try again!"
              />
            )}
          </>
        )}
      </Container>
    </Section>
  );
};

export default Home;
