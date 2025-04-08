import { useSelector, useDispatch } from 'react-redux';
import styles from './Filter.module.css';
import { selectFilter } from '../../redux/selectors';
import { setFilter } from '../../redux/filter/filterSlice';

const Filter = () => {
  const filter = useSelector(selectFilter);
  const dispatch = useDispatch();
  const handleChange = e => {
    dispatch(setFilter(e.target.value));
  };
  return (
    <input
      placeholder="What currency are you looking for?🧐"
      className={styles.input}
      value={filter}
      onChange={handleChange}
    />
  );
};

export default Filter;
