const API_URL = 'http://localhost:8080/api/drone-shots';

export async function getDroneShots() {
  const response = await fetch(API_URL);
  const data = await response.json();
  return data;
}

export async function getDroneShotById(droneShotId) {
  const response = await fetch(`${API_URL}/${droneShotId}`);
  const data = await response.json();
  return data;
}

export async function createDroneShot(droneShotData) {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(droneShotData)
  });
  const data = await response.json();
  return data;
}

export async function updateDroneShot(droneShotId, droneShotData) {
  const response = await fetch(`${API_URL}/${droneShotId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(droneShotData)
  });
  const data = await response.json();
  return data;
}

export async function deleteDroneShot(droneShotId) {
  const response = await fetch(`${API_URL}/${droneShotId}`, {
    method: 'DELETE'
  });
  const data = await response.json();
  return data;
}