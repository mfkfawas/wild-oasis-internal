import styled from 'styled-components';
import Spinner from '../../ui/Spinner';
import { useRecentStays } from './useRecentStays';
import { useRecentBookings } from './useRecentBookings';

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;

export default function DashboardLayout() {
  const { bookings, isLoading } = useRecentBookings();
  const { stays, confirmedStays, isLoading: isLoadingStays } = useRecentStays();

  if (isLoading || isLoadingStays) return <Spinner />;

  return (
    <StyledDashboardLayout>
      <div>Statistics</div>
      <div>Today&apos;s activity</div>
      <div>Chart Stay Duration</div>
      <div>Chart Sales</div>
    </StyledDashboardLayout>
  );
}
