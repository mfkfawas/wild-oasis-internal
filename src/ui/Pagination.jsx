import { HiChevronLeft, HiChevronRight } from 'react-icons/hi2';
import styled from 'styled-components';
import useURL from '../hooks/useURL';
import { PAGE_SIZE } from '../utils/constants';

const StyledPagination = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const P = styled.p`
  font-size: 1.4rem;
  margin-left: 0.8rem;

  & span {
    font-weight: 600;
  }
`;

const Buttons = styled.div`
  display: flex;
  gap: 0.6rem;
`;

const PaginationButton = styled.button`
  background-color: ${props =>
    props.active ? ' var(--color-brand-600)' : 'var(--color-grey-50)'};
  color: ${props => (props.active ? ' var(--color-brand-50)' : 'inherit')};
  border: none;
  border-radius: var(--border-radius-sm);
  font-weight: 500;
  font-size: 1.4rem;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  padding: 0.6rem 1.2rem;
  transition: all 0.3s;

  &:has(span:last-child) {
    padding-left: 0.4rem;
  }

  &:has(span:first-child) {
    padding-right: 0.4rem;
  }

  & svg {
    height: 1.8rem;
    width: 1.8rem;
  }

  &:hover:not(:disabled) {
    background-color: var(--color-brand-600);
    color: var(--color-brand-50);
  }
`;

function Pagination({ count }) {
  const { searchParam: currentPage, setSearchParam } = useURL('page', 1);

  const pageCount = Math.ceil(count / PAGE_SIZE);

  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === pageCount;
  const from = (currentPage - 1) * PAGE_SIZE + 1;
  const to = currentPage !== pageCount ? currentPage * PAGE_SIZE : count;

  function nextPage() {
    setSearchParam(isLastPage ? pageCount : currentPage + 1);
  }

  function previousPage() {
    setSearchParam(isFirstPage ? 1 : currentPage - 1);
  }

  if (pageCount === 1) return null;

  return (
    <StyledPagination>
      <P>
        Showing <span>{from}</span> to <span>{to}</span> of <span>{count}</span>{' '}
        results
      </P>

      <Buttons>
        <PaginationButton onClick={previousPage} disabled={isFirstPage}>
          <HiChevronLeft />
          <span>Previous</span>
        </PaginationButton>

        <PaginationButton onClick={nextPage} disabled={isLastPage}>
          <span>Next</span>
          <HiChevronRight />
        </PaginationButton>
      </Buttons>
    </StyledPagination>
  );
}

export default Pagination;
