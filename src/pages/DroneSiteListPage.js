import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Table, Button } from 'react-bootstrap';
import { getDroneSites, deleteDroneSite } from '../api/droneSiteApi';

function DroneSiteListPage() {
  const [droneSites, setDroneSites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getDroneSites();
        setDroneSites(data);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, []);

  async function handleDelete(id) {
    try {
      await deleteDroneSite(id);
      setDroneSites(droneSites.filter((droneSite) => droneSite.id !== id));
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <h1>Drone Sites</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Name</th>
              <th>Address</th>
              <th>City</th>
              <th>State</th>
              <th>Country</th>
              <th>Zip Code</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {droneSites.map((droneSite) => (
              <tr key={droneSite.id}>
                <td>{droneSite.name}</td>
                <td>{droneSite.address}</td>
                <td>{droneSite.city}</td>
                <td>{droneSite.state}</td>
                <td>{droneSite.country}</td>
                <td>{droneSite.zipCode}</td>
                <td>
                  <Button as={Link} to={`/drone-sites/${droneSite.id}/edit`} variant="warning">
                    Edit
                  </Button>{' '}
                  <Button variant="danger" onClick={() => handleDelete(droneSite.id)}>
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
      <Button as={Link} to="/drone-sites/create" variant="success">
        Add Drone Site
      </Button>
    </>
  );
}

export default DroneSiteListPage;