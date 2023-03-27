import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { createDroneShot } from '../api/droneShotApi';

function DroneShotCreatePage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    duration: '',
    price: ''
  });
  const [, setFormErrors] = useState({});

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      await createDroneShot(formData);
      navigate('/drone-shots');
    } catch (error) {
      setFormErrors(error.errors);
    }
  }

  return (
    <>
      <h1>Create Drone Shot Type</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" name="name" value={formData.name} onChange={handleChange} />
        </Form.Group>
        <Form.Group controlId="duration">
          <Form.Label>Duration (in minutes)</Form.Label>
          <Form.Control type="number" name="duration" value={formData.duration} onChange={handleChange} />
        </Form.Group>
        <Form.Group controlId="price">
          <Form.Label>Price (in USD)</Form.Label>
          <Form.Control type="number" name="price" value={formData.price} onChange={handleChange} />
        </Form.Group>
        <Button variant="primary" type="submit">
          Create
        </Button>
      </Form>
    </>
  );
}

export default DroneShotCreatePage;