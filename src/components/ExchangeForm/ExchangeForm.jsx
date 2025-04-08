import { RiExchangeDollarFill } from 'react-icons/ri';
import styles from './ExchangeForm.module.css';
import { useDispatch } from 'react-redux';
import { fetchExchangeInfo } from '../../redux/currency/currencyOps';

const ExchangeForm = () => {
  const dispatch = useDispatch();
  const handleSubmit = e => {
    e.preventDefault();
    const [amount, from, , to] = e.target.elements.input.value.split(' ');
    dispatch(fetchExchangeInfo({ amount, from, to }));
  };
  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <button className={styles.button} type="submit">
        <RiExchangeDollarFill className={styles.icon} />
      </button>
      <input
        name="input"
        className={styles.input}
        placeholder="Request format 15 USD in UAH"
        pattern="^\d+(\.\d{1,2})?\s[a-zA-Z]{3}\sin\s[a-zA-Z]{3}$"
      />
    </form>
  );
};

export default ExchangeForm;
