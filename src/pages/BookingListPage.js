import React, { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { getCustomers } from "../api/customerApi";
import { getDroneSites } from "../api/droneSiteApi";
import { getDroneShots } from "../api/droneShotApi";
import BookingList from "../components/BookingList";

function BookingListPage() {
  const [customers, setCustomers] = useState([]);
  const [droneShots, setDroneShots] = useState([]);
  const [droneSites, setDroneSites] = useState([]);
  const [filterData, setFilterData] = useState({
    customerId: "",
    droneSiteId: "",
    droneShotId: "",
    startDate: "",
    endDate: "",
  });

  useEffect(() => {
    async function fetchData() {
      const [customers, droneShots, droneSites] = await Promise.all([getCustomers(), getDroneShots(), getDroneSites()]);
      setCustomers(customers);
      setDroneShots(droneShots);
      setDroneSites(droneSites);
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
            {customers.map((customer) => (
              <option key={'customer' + customer.id} value={customer.id}>
                {customer.name}
              </option>
            ))}
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="droneSiteId">
          <Form.Label>Drone Site</Form.Label>
          <Form.Control as="select" name="droneSiteId" onChange={handleChange}>
            <option value="">All Sites</option>
            {droneSites.map((droneSite) => (
              <option key={'site' + droneSite.id} value={droneSite.id}>
                {droneSite.name}
              </option>
            ))}
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="droneShotId">
          <Form.Label>Drone Shot</Form.Label>
          <Form.Control as="select" name="droneShotId" onChange={handleChange}>
            <option value="">All Shots</option>
            {droneShots.map((droneShot) => (
              <option key={'shot' + droneShot.id} value={droneShot.id}>
                {droneShot.name}
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
      <BookingList filterData={filterData}></BookingList>
    </>
  );
}

export default BookingListPage;
