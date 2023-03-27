import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Table, Button } from 'react-bootstrap';
import { getCustomers, deleteCustomer } from '../api/customerApi';

function CustomerListPage() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getCustomers();
        setCustomers(data);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    await deleteCustomer(id);
    const data = await getCustomers();
    setCustomers(data);
    setLoading(false);
  };

  return (
    <>
      <h1>Customers</h1>
      <Link to="/customers/create">
        <Button variant="primary">Create Customer</Button>
      </Link>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan="5">Loading...</td>
            </tr>
          ) : customers.length ? (
            customers.map((customer) => (
              <tr key={customer.id}>
                <td>{customer.id}</td>
                <td>{customer.name}</td>
                <td>{customer.email}</td>
                <td>{customer.phoneNumber || '-'}</td>
                <td>
                  <Link to={`/customers/${customer.id}/edit`}>
                    <Button variant="warning">Edit</Button>
                  </Link>
                  <Button onClick={() => handleDelete(customer.id)} className='btn btn-danger'>Delete</Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">No customers found.</td>
            </tr>
          )}
        </tbody>
      </Table>
    </>
  );
}

export default CustomerListPage;