import styled from 'styled-components';
import { Navigate, useLocation } from 'react-router-dom';

import { useUser } from '../features/authentication/useUser';
import Spinner from './Spinner';
import { useEffect } from 'react';

const FullPage = styled.div`
  height: 100vh;
  background-color: var(--color-grey-50);
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default function ProtectedRoute({ children }) {
  let location = useLocation();
  const { isAuthenticated, isLoading, isFetching } = useUser();

  useEffect(() => {
    if (!isAuthenticated && !isLoading && !isFetching) {
      return <Navigate to="/login" state={{ from: location }} replace />;
    }
  }, [isAuthenticated, isLoading, isFetching, location]);

  if (isLoading)
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );

  if (isAuthenticated) return children;
}
