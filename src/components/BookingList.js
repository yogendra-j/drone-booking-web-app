import React, { useState, useEffect } from "react";
import { Table, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { getBookings, deleteBooking } from "../api/bookingApi";

function BookingList({ filterData }) {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  console.log("bookinglist render");

  useEffect(() => {
    async function fetchBookings() {
      let data = await getBookings();
      data = data.filter(filterBookings);
      setBookings(data);
      setLoading(false);
    }
    fetchBookings();
  }, [filterData]);

  function filterBookings(booking) {
    const {
      customerId: filterCustomerId,
      droneSiteId: filterDroneSiteId,
      droneShotId: filterDroneShotId,
      startDate,
      endDate,
    } = filterData;

    if (
      (filterCustomerId &&
        booking.customer.id !== parseInt(filterCustomerId)) ||
      (filterDroneSiteId &&
        booking.droneSite.id !== parseInt(filterDroneSiteId)) ||
      (filterDroneShotId &&
        booking.droneShot.id !== parseInt(filterDroneShotId))
    ) {
      return false;
    }

    if (startDate && new Date(booking.createdTime) < new Date(startDate)) {
      return false;
    }

    if (endDate && new Date(booking.createdTime) > new Date(endDate)) {
      return false;
    }

    return true;
  };

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
              <tr key={"booking" + booking.id}>
                <td>{booking.id}</td>
                <td>{booking.customer.name}</td>
                <td>{booking.droneSite.name}</td>
                <td>
                  {booking.droneShot.name} ({booking.droneShot.duration} mins, $
                  {booking.droneShot.price})
                </td>
                <td>{new Date(booking.createdTime).toLocaleString()}</td>
                <td>
                  <Link to={`/bookings/${booking.id}/edit`}>
                    <Button variant="primary" size="sm">
                      Edit
                    </Button>
                  </Link>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleDelete(booking.id)}
                  >
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
