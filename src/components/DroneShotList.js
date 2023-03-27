import React, { useState, useEffect } from 'react';
import { Table, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { getDroneShots } from '../api/droneShotApi';

function DroneShotList() {
  const [droneShots, setDroneShots] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDroneShots() {
      const data = await getDroneShots();
      setDroneShots(data);
      setLoading(false);
    }
    fetchDroneShots();
  }, []);

  return (
    <>
      <h1>Drone Shots</h1>
      <Link to="/drone-shots/new">
        <Button variant="primary">Create Drone Shot</Button>
      </Link>
      <hr />
      {loading ? (
        <p>Loading...</p>
      ) : droneShots.length === 0 ? (
        <p>No drone shots found.</p>
      ) : (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Duration (s)</th>
              <th>Price (USD)</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {droneShots.map((droneShot) => (
              <tr key={droneShot.id}>
                <td>{droneShot.id}</td>
                <td>{droneShot.name}</td>
                <td>{droneShot.duration}</td>
                <td>{droneShot.price}</td>
                <td>
                  <Link to={`/drone-shots/${droneShot.id}/edit`}>
                    <Button variant="primary" size="sm">
                      Edit
                    </Button>
                  </Link>
                  <Link to={`/drone-shots/${droneShot.id}/delete`}>
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

export default DroneShotList;