import React, { useState, useEffect } from 'react';
import { Table, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { getBookings, deleteBooking } from '../api/bookingApi';

function BookingList() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBookings() {
      const data = await getBookings();
      setBookings(data);
      setLoading(false);
    }
    fetchBookings();
  }, []);

  const handleDelete = async (id) => {
    await deleteBooking(id);
    const data = await getBookings();
    setBookings(data);
    setLoading(false);
  };

  return (
    <>
      {loading ? (
        <p>Loading...</p>
      ) : bookings.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Customer</th>
              <th>Drone Site</th>
              <th>Drone Shot</th>
              <th>Created Time</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={'booking' + booking.id}>
                <td>{booking.id}</td>
                <td>{booking.customer.name}</td>
                <td>{booking.droneSite.name}</td>
                <td>
                  {booking.droneShot.name} ({booking.droneShot.duration} mins, ${booking.droneShot.price})
                </td>
                <td>{new Date(booking.createdTime).toLocaleString()}</td>
                <td>
                  <Link to={`/bookings/${booking.id}/edit`}>
                    <Button variant="primary" size="sm">
                      Edit
                    </Button>
                  </Link>
                  <Button variant="danger" size="sm" onClick={() => handleDelete(booking.id)}>
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
}

export default BookingList;