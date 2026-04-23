// src/utils/dateUtils.js

export function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

export function formatDateShort(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-IN', {
    month: 'short',
    day: 'numeric'
  });
}

export function getRelativeTime(dateString) {
  const date = new Date(dateString);
  const now = new Date();
  const diff = date - now;
  const days = Math.ceil(diff / (1000 * 60 * 60 * 24));

  if (days < 0) return `${Math.abs(days)} days ago`;
  if (days === 0) return 'Today';
  if (days === 1) return 'Tomorrow';
  if (days < 30) return `In ${days} days`;
  if (days < 365) return `In ${Math.floor(days / 30)} months`;
  return `In ${Math.floor(days / 365)} years`;
}

export function isUpcoming(dateString) {
  return new Date(dateString) > new Date();
}

export function isPast(dateString) {
  return new Date(dateString) < new Date();
}
