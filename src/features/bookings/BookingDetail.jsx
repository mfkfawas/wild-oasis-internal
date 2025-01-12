import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import BookingDataBox from './BookingDataBox';
import Row from '../../ui/Row';
import Heading from '../../ui/Heading';
import Tag from '../../ui/Tag';
import ButtonGroup from '../../ui/ButtonGroup';
import Button from '../../ui/Button';
import ButtonText from '../../ui/ButtonText';
import Spinner from '../../ui/Spinner';
import Modal from '../../ui/Modal';
import ConfirmDelete from '../../ui/ConfirmDelete';
import Empty from '../../ui/Empty';

import { useMoveBack } from '../../hooks/useMoveBack';
import { useBooking } from './useBooking';
import { STATUS_TO_TAG_NAME } from '../../utils/constants';
import { useCheckOut } from '../check-in-out/useCheckOut';
import { useDeleteBooking } from './useBookingDelete';

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

function BookingDetail() {
  const navigate = useNavigate();
  const { booking = {}, isLoading } = useBooking();
  const moveBack = useMoveBack();
  const { checkOut, isCheckingOut } = useCheckOut();
  const { bookingDelete, isDeleting } = useDeleteBooking();

  const { status, id: bookingId } = booking;
  console.log('🚀 ~ BookingDetail ~ booking:', booking);

  if (isLoading) return <Spinner />;

  if (Object.keys(booking).length === 0)
    return <Empty resourceName="booking" />;

  return (
    <Modal>
      <Row type="horizontal">
        <HeadingGroup>
          <Heading as="h1">Booking #{bookingId}</Heading>
          <Tag type={STATUS_TO_TAG_NAME[status]}>
            {status.replace('-', ' ')}
          </Tag>
        </HeadingGroup>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      <ButtonGroup>
        {status === 'unconfirmed' && (
          <Button onClick={() => navigate(`/checkin/${bookingId}`)}>
            Check In
          </Button>
        )}

        {status === 'checked-in' && (
          <Button onClick={() => checkOut(bookingId)} disabled={isCheckingOut}>
            Check Out
          </Button>
        )}

        <Modal.Open opens="delete">
          <Button variation="danger">Delete</Button>
        </Modal.Open>

        <Button variation="danger" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>

      <Modal.Window name="delete">
        <ConfirmDelete
          resourceName="bookings"
          onConfirm={() => bookingDelete(bookingId, { onSettled: moveBack })}
          disabled={isDeleting}
        />
      </Modal.Window>
    </Modal>
  );
}

export default BookingDetail;
