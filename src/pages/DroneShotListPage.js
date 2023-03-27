import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Table, Button } from 'react-bootstrap';
import { getDroneShots, deleteDroneShot } from '../api/droneShotApi';

function DroneShotListPage() {
  const [droneShots, setDroneShots] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getDroneShots();
        setDroneShots(data);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    await deleteDroneShot(id);
    const data = await getDroneShots();
    setDroneShots(data);
    setLoading(false);
  };

  return (
    <>
      <h1>Drone Shot Types</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Name</th>
              <th>Duration (mins)</th>
              <th>Price (USD)</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {droneShots.map((droneShot) => (
              <tr key={droneShot.id}>
                <td>{droneShot.name}</td>
                <td>{droneShot.duration}</td>
                <td>{droneShot.price}</td>
                <td>
                  <Link to={`/drone-shots/${droneShot.id}/edit`} className="btn btn-secondary">
                    Edit
                  </Link>
                  <Button onClick={() => handleDelete(droneShot.id)} className="btn btn-danger">
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
}

export default DroneShotListPage;