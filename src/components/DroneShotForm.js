import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { createDroneShot, getDroneShotById, updateDroneShot } from '../api/droneShotApi';

function DroneShotForm({ droneShotId }) {
  const [droneShotData, setDroneShotData] = useState({
    name: '',
    duration: 0,
    price: 0
  });
  const [submitting, setSubmitting] = useState(false);
  const nevigate = useNavigate();

  useEffect(() => {
    async function fetchDroneShot() {
      const data = await getDroneShotById(droneShotId);
      setDroneShotData(data);
    }
    if (droneShotId) {
      fetchDroneShot();
    }
  }, [droneShotId]);

  function handleChange(event) {
    const { name, value } = event.target;
    setDroneShotData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setSubmitting(true);
    try {
      if (droneShotId) {
        await updateDroneShot(droneShotId, droneShotData);
      } else {
        await createDroneShot(droneShotData);
      }
      nevigate('/drone-shots');
    } catch (error) {
      console.error(error);
      setSubmitting(false);
    }
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formName">
        <Form.Label>Name</Form.Label>
        <Form.Control type="text" name="name" value={droneShotData.name} onChange={handleChange} required />
      </Form.Group>
      <Form.Group controlId="formDuration">
        <Form.Label>Duration (in seconds)</Form.Label>
        <Form.Control type="number" name="duration" value={droneShotData.duration} onChange={handleChange} required />
      </Form.Group>
      <Form.Group controlId="formPrice">
        <Form.Label>Price (in USD)</Form.Label>
        <Form.Control type="number" step="0.01" name="price" value={droneShotData.price} onChange={handleChange} required />
      </Form.Group>
      <Button variant="primary" type="submit" disabled={submitting}>
        {submitting ? 'Submitting...' : droneShotId ? 'Update Drone Shot' : 'Create Drone Shot'}
      </Button>
    </Form>
  );
}

export default DroneShotForm;