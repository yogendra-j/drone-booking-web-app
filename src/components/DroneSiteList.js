import React, { useState, useEffect } from 'react';
import { Table, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { getDroneSites } from '../api/droneSiteApi';

function DroneSiteList() {
  const [droneSites, setDroneSites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDroneSites() {
      const data = await getDroneSites();
      setDroneSites(data);
      setLoading(false);
    }
    fetchDroneSites();
  }, []);

  return (
    <>
      <h1>Drone Sites</h1>
      <Link to="/drone-sites/new">
        <Button variant="primary">Create Drone Site</Button>
      </Link>
      <hr />
      {loading ? (
        <p>Loading...</p>
      ) : droneSites.length === 0 ? (
        <p>No drone sites found.</p>
      ) : (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
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
                <td>{droneSite.id}</td>
                <td>{droneSite.name}</td>
                <td>{droneSite.address}</td>
                <td>{droneSite.city}</td>
                <td>{droneSite.state}</td>
                <td>{droneSite.country}</td>
                <td>{droneSite.zipCode}</td>
                <td>
                  <Link to={`/drone-sites/${droneSite.id}/edit`}>
                    <Button variant="primary" size="sm">
                      Edit
                    </Button>
                  </Link>
                  <Link to={`/drone-sites/${droneSite.id}/delete`}>
                    <Button variant="danger" size="sm">
                      Delete
                    </Button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
}

export default DroneSiteList;