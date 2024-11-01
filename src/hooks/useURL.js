import { useEffect } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';

// if we are fetching the value of the below arra of fields, we need to convert it to number
const NUMERIC_FIELDS = ['page'];
const PAGE_ROUTES = ['/bookings'];

// defaultValue is '' bcz in select if we pass '', it will automatcially select the first option. But in others(Filter) we need to explicitly pass the default value as filter is not build using select
function useURL(field, defaultValue = '') {
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const searchParam = searchParams.get(field) || defaultValue;

  function setSearchParam(value) {
    if (field === 'status' && searchParams.get('page'))
      searchParams.set('page', 1);
    searchParams.set(field, value);
    setSearchParams(searchParams);
  }

  // Initially set page to 1 if we are on a page that has pagination
  useEffect(() => {
    if (PAGE_ROUTES.includes(location.pathname)) {
      if (!searchParams.get('page')) searchParams.set('page', 1);
      setSearchParams(searchParams);
    }
  }, []);

  return {
    searchParam: NUMERIC_FIELDS.includes(field)
      ? Number(searchParam)
      : searchParam,
    setSearchParam,
  };
}

export default useURL;
