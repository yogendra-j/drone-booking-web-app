import {BASE_URL} from '../constants';

const API_URL = (BASE_URL ?? '') + '/api/bookings';

export async function getBookings() {
  const response = await fetch(API_URL);
  const data = await response.json();
  return data;
}

export async function getBookingById(bookingId) {
  const response = await fetch(`${API_URL}/${bookingId}`);
  const data = await response.json();
  return data;
}

export async function createBooking(bookingData) {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(bookingData)
  });
  const data = await response.json();
  return data;
}

export async function updateBooking(bookingId, bookingData) {
  const response = await fetch(`${API_URL}/${bookingId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(bookingData)
  });
  const data = await response.json();
  return data;
}

export async function deleteBooking(bookingId) {
  await fetch(`${API_URL}/${bookingId}`, {
    method: 'DELETE'
  });
}