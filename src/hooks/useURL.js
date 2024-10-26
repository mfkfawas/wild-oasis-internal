import { useSearchParams } from 'react-router-dom';

// if we are fetching the value of the below arra of fields, we need to convert it to number
const NUMERIC_FIELDS = ['page'];

// defaultValue is '' bcz in select if we pass '', it will automatcially select the first option. But in others(Filter) we need to explicitly pass the default value as filter is not build using select
function useURL(field, defaultValue = '') {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchParam = searchParams.get(field) || defaultValue;

  function setSearchParam(value) {
    searchParams.set(field, value);
    // if (searchParams.get('page')) searchParams.set('page', 1);
    setSearchParams(searchParams);
  }

  return {
    searchParam: NUMERIC_FIELDS.includes(field)
      ? Number(searchParam)
      : searchParam,
    setSearchParam,
  };
}

export default useURL;
