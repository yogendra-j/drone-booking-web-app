import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { getDroneShotById, updateDroneShot } from '../api/droneShotApi';

function DroneShotEditPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    duration: '',
    price: ''
  });
  const [, setFormErrors] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getDroneShotById(id);
        setFormData(data);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, [id]);

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
      await updateDroneShot(id, formData);
      navigate(`/drone-shots`);
    } catch (error) {
      setFormErrors(error.errors);
    }
  }

  return (
    <>
      <h1>Edit Drone Shot Type</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
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
            Save
          </Button>
        </Form>
      )}
    </>
  );
}

export default DroneShotEditPage;