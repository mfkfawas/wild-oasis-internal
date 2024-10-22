import useURL from '../hooks/useURL';
import Select from './Select';

function SortBy({ options }) {
  const { searchParam, setSearchParam } = useURL('sortBy');

  function handleChange(e) {
    setSearchParam(e.target.value);
  }

  return (
    <Select
      options={options}
      type="white"
      value={searchParam}
      onChange={handleChange}
    />
  );
}

export default SortBy;
