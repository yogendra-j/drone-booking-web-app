import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { getCustomers } from "../api/customerApi";
import { getDroneSites } from "../api/droneSiteApi";
import { getDroneShots } from "../api/droneShotApi";
import {
  createBooking,
  getBookingById,
  updateBooking,
} from "../api/bookingApi";

function BookingForm({ bookingId }) {
  const [bookingData, setBookingData] = useState({
    customerId: "",
    droneSiteId: "",
    droneShotId: "",
  });
  const [customers, setCustomers] = useState([]);
  const [droneSites, setDroneSites] = useState([]);
  const [droneShots, setDroneShots] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const nevigate = useNavigate();

  useEffect(() => {
    async function fetchCustomers() {
      const data = await getCustomers();
      setCustomers(data);
    }
    async function fetchDroneSites() {
      const data = await getDroneSites();
      setDroneSites(data);
    }
    async function fetchDroneShots() {
      const data = await getDroneShots();
      setDroneShots(data);
    }
    fetchCustomers();
    fetchDroneSites();
    fetchDroneShots();
  }, []);

  useEffect(() => {
    async function fetchBooking() {
      const data = await getBookingById(bookingId);
      setBookingData({
        customerId: data.customerId,
        droneSiteId: data.droneSiteId,
        droneShotId: data.droneShotId,
      });
    }
    if (bookingId) {
      fetchBooking();
    }
  }, [bookingId]);

  function handleChange(event) {
    const { name, value } = event.target;
    setBookingData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setSubmitting(true);
    try {
      if (bookingId) {
        await updateBooking(bookingId, bookingData);
      } else {
        await createBooking(bookingData);
      }
      nevigate("/bookings");
    } catch (error) {
      console.error(error);
      setSubmitting(false);
    }
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formCustomer">
        <Form.Label>Customer</Form.Label>
        <Form.Control
          as="select"
          name="customerId"
          value={bookingData.customerId}
          onChange={handleChange}
          required
        >
          <option value="">Select customer...</option>
          {customers.map((customer) => (
            <option key={customer.id} value={customer.id}>
              {customer.name}
            </option>
          ))}
        </Form.Control>
      </Form.Group>
      <Form.Group controlId="formDroneSite">
        <Form.Label>Drone Site</Form.Label>
        <Form.Control
          as="select"
          name="droneSiteId"
          value={bookingData.droneSiteId}
          onChange={handleChange}
          required
        >
          <option value="">Select drone site...</option>
          {droneSites.map((droneSite) => (
            <option key={droneSite.id} value={droneSite.id}>
              {droneSite.name}
            </option>
          ))}
        </Form.Control>
      </Form.Group>
      <Form.Group controlId="formDroneShot">
        <Form.Label>Drone Shot</Form.Label>
        <Form.Control
          as="select"
          name="droneShotId"
          value={bookingData.droneShotId}
          onChange={handleChange}
          required
        >
          <option value="">Select drone shot...</option>
          {droneShots.map((droneShot) => (
            <option key={droneShot.id} value={droneShot.id}>
              {droneShot.name} ({droneShot.duration} mins, ${droneShot.price})
            </option>
          ))}
        </Form.Control>
      </Form.Group>
      <Button variant="primary" type="submit" disabled={submitting}>
        {submitting
          ? "Submitting..."
          : bookingId
          ? "Update Booking"
          : "Create Booking"}
      </Button>
    </Form>
  );
}

export default BookingForm;
