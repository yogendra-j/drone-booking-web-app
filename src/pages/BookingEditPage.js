import React from 'react';
import { useParams } from 'react-router-dom';

import BookingForm from '../components/BookingForm';

function BookingEditPage() {
  const { id } = useParams();

  return (
    <>
      <h1>Edit Booking</h1>
      <BookingForm
        bookingId={id}
      />
    </>
  );
}

export default BookingEditPage;