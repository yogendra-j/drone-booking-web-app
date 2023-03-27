import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { createCustomer, getCustomerById, updateCustomer } from '../api/customerApi';

function CustomerForm({ customerId }) {
  const [customerData, setCustomerData] = useState({
    name: '',
    email: '',
    phoneNumber: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const nevigate = useNavigate();

  useEffect(() => {
    async function fetchCustomer() {
      const data = await getCustomerById(customerId);
      setCustomerData(data);
    }
    if (customerId) {
      fetchCustomer();
    }
  }, [customerId]);

  function handleChange(event) {
    const { name, value } = event.target;
    setCustomerData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setSubmitting(true);
    try {
      if (customerId) {
        await updateCustomer(customerId, customerData);
      } else {
        await createCustomer(customerData);
      }
      nevigate('/customers');
    } catch (error) {
      console.error(error);
      setSubmitting(false);
    }
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formName">
        <Form.Label>Name</Form.Label>
        <Form.Control type="text" name="name" value={customerData.name} onChange={handleChange} required />
      </Form.Group>
      <Form.Group controlId="formEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" name="email" value={customerData.email} onChange={handleChange} required />
      </Form.Group>
      <Form.Group controlId="formPhoneNumber">
        <Form.Label>Phone Number</Form.Label>
        <Form.Control type="text" name="phoneNumber" value={customerData.phoneNumber} onChange={handleChange} />
      </Form.Group>
      <Button variant="primary" type="submit" disabled={submitting}>
        {submitting ? 'Submitting...' : customerId ? 'Update Customer' : 'Create Customer'}
      </Button>
    </Form>
  );
}

export default CustomerForm;