import { formatDistance, parseISO, differenceInDays } from 'date-fns';
// import { differenceInDays } from 'date-fns/esm';

// We want to make this function work for both Date objects and strings (which come from Supabase)
export const subtractDates = (dateStr1, dateStr2) =>
  differenceInDays(parseISO(String(dateStr1)), parseISO(String(dateStr2)));

/**
 * Formats the distance between the given ISO date string and now,
 * adding a suffix like "ago" or "In X minutes" for better readability.
 *
 * @param {string} dateStr - The date in ISO format (e.g., "2024-10-22T14:30:00Z") Z refers to UTC.
 * @returns {string} - Human-readable relative time (e.g., "3 days ago" or "In 5 minutes").
 */
export const formatDistanceFromNow = dateStr =>
  formatDistance(parseISO(dateStr), new Date(), {
    addSuffix: true,
  })
    .replace('about ', '')
    .replace('in', 'In');

// Supabase needs an ISO date string. However, that string will be different on every render because the MS or SEC have changed, which isn't good. So we use this trick to remove any time
export const getToday = function (options = {}) {
  const today = new Date();

  // This is necessary to compare with created_at from Supabase, because it it not at 0.0.0.0, so we need to set the date to be END of the day when we compare it with earlier dates
  if (options?.end)
    // Set to the last second of the day
    today.setUTCHours(23, 59, 59, 999);
  else today.setUTCHours(0, 0, 0, 0);
  return today.toISOString();
};

export const formatCurrency = value =>
  new Intl.NumberFormat('en', {
    style: 'currency',
    currency: 'USD',
  }).format(value);

// Salla format date(for learning purpose - not the best)
export const formatDate = date => {
  const options = {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  };

  const formattedDate = new Date(date).toLocaleDateString('ar-EG', options);

  return formattedDate.split(',')[0];
};
