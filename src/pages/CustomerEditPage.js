import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { getCustomerById, updateCustomer } from '../api/customerApi';

function CustomerEditPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phoneNumber: ''
  });
  const [, setFormErrors] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getCustomerById(id);
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
      await updateCustomer(id, formData);
      navigate(`/customers`);
    } catch (error) {
      setFormErrors(error.errors);
    }
  }

  return (
    <>
      <h1>Edit Customer</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" name="name" value={formData.name} onChange={handleChange} />
          </Form.Group>
          <Form.Group controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" name="email" value={formData.email} onChange={handleChange} />
          </Form.Group>
          <Form.Group controlId="phoneNumber">
            <Form.Label>Phone Number</Form.Label>
            <Form.Control type="tel" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} />
          </Form.Group>
          <Button variant="primary" type="submit">
            Save
          </Button>
        </Form>
      )}
    </>
  );
}

export default CustomerEditPage;