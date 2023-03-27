import React, { useState, useEffect } from "react";
import { Table, Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { getBookings } from "../api/bookingApi";
import BookingList from "../components/BookingList";

function BookingListPage() {
  const [bookings, setBookings] = useState([]);
  const [, setLoading] = useState(true);
  const [filterData, setFilterData] = useState({
    customerId: "",
    droneSiteId: "",
    droneShotId: "",
    startDate: "",
    endDate: "",
  });

  useEffect(() => {
    async function fetchData() {
      const data = await getBookings();
      setBookings(data);
      setLoading(false);
    }
    fetchData();
  }, []);

  function handleChange(event) {
    const { name, value } = event.target;
    setFilterData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

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
  }

  const filteredBookings = bookings.filter(filterBookings);

  return (
    <>
      <h1>Bookings</h1>
      <Link to="/bookings/create">
        <Button variant="primary">Create Booking</Button>
      </Link>
      <Form className="my-3">
        <Form.Group controlId="customerId">
          <Form.Label>Customer</Form.Label>
          <Form.Control as="select" name="customerId" onChange={handleChange}>
            <option value="">All Customers</option>
            {bookings.map((booking) => (
              <option key={'customer' + booking.customer.id} value={booking.customer.id}>
                {booking.customer.name}
              </option>
            ))}
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="droneSiteId">
          <Form.Label>Drone Site</Form.Label>
          <Form.Control as="select" name="droneSiteId" onChange={handleChange}>
            <option value="">All Sites</option>
            {bookings.map((booking) => (
              <option key={'site' + booking.droneSite.id} value={booking.droneSite.id}>
                {booking.droneSite.name}
              </option>
            ))}
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="droneShotId">
          <Form.Label>Drone Shot</Form.Label>
          <Form.Control as="select" name="droneShotId" onChange={handleChange}>
            <option value="">All Shots</option>
            {bookings.map((booking) => (
              <option key={'shot' + booking.droneShot.id} value={booking.droneShot.id}>
                {booking.droneShot.name}
              </option>
            ))}
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="startDate">
          <Form.Label>Start Date</Form.Label>
          <Form.Control type="date" name="startDate" onChange={handleChange} />
        </Form.Group>
        <Form.Group controlId="endDate">
          <Form.Label>End Date</Form.Label>
          <Form.Control type="date" name="endDate" onChange={handleChange} />
        </Form.Group>
      </Form>
      <BookingList></BookingList>
    </>
  );
}

export default BookingListPage;
