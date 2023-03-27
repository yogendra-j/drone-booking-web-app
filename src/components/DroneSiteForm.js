import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { createDroneSite, getDroneSiteById, updateDroneSite } from '../api/droneSiteApi';

function DroneSiteForm({ droneSiteId }) {
  const [droneSiteData, setDroneSiteData] = useState({
    name: '',
    address: '',
    city: '',
    state: '',
    country: '',
    zipCode: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const nevigate = useNavigate();

  useEffect(() => {
    async function fetchDroneSite() {
      const data = await getDroneSiteById(droneSiteId);
      setDroneSiteData(data);
    }
    if (droneSiteId) {
      fetchDroneSite();
    }
  }, [droneSiteId]);

  function handleChange(event) {
    const { name, value } = event.target;
    setDroneSiteData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setSubmitting(true);
    try {
      if (droneSiteId) {
        await updateDroneSite(droneSiteId, droneSiteData);
      } else {
        await createDroneSite(droneSiteData);
      }
      nevigate('/drone-sites');
    } catch (error) {
      console.error(error);
      setSubmitting(false);
    }
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formName">
        <Form.Label>Name</Form.Label>
        <Form.Control type="text" name="name" value={droneSiteData.name} onChange={handleChange} required />
      </Form.Group>
      <Form.Group controlId="formAddress">
        <Form.Label>Address</Form.Label>
        <Form.Control type="text" name="address" value={droneSiteData.address} onChange={handleChange} required />
      </Form.Group>
      <Form.Group controlId="formCity">
        <Form.Label>City</Form.Label>
        <Form.Control type="text" name="city" value={droneSiteData.city} onChange={handleChange} required />
      </Form.Group>
      <Form.Group controlId="formState">
        <Form.Label>State</Form.Label>
        <Form.Control type="text" name="state" value={droneSiteData.state} onChange={handleChange} required />
      </Form.Group>
      <Form.Group controlId="formCountry">
        <Form.Label>Country</Form.Label>
        <Form.Control type="text" name="country" value={droneSiteData.country} onChange={handleChange} required />
      </Form.Group>
      <Form.Group controlId="formZipCode">
        <Form.Label>Zip Code</Form.Label>
        <Form.Control type="text" name="zipCode" value={droneSiteData.zipCode} onChange={handleChange} required />
      </Form.Group>
      <Button variant="primary" type="submit" disabled={submitting}>
        {submitting ? 'Submitting...' : droneSiteId ? 'Update Drone Site' : 'Create Drone Site'}
      </Button>
    </Form>
  );
}

export default DroneSiteForm;