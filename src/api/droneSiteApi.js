const API_URL = 'http://localhost:8080/api/drone-sites';

export async function getDroneSites() {
  const response = await fetch(API_URL);
  const data = await response.json();
  return data;
}

export async function getDroneSiteById(droneSiteId) {
  const response = await fetch(`${API_URL}/${droneSiteId}`);
  const data = await response.json();
  return data;
}

export async function createDroneSite(droneSiteData) {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(droneSiteData)
  });
  const data = await response.json();
  return data;
}

export async function updateDroneSite(droneSiteId, droneSiteData) {
  const response = await fetch(`${API_URL}/${droneSiteId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(droneSiteData)
  });
  const data = await response.json();
  return data;
}

export async function deleteDroneSite(droneSiteId) {
  const response = await fetch(`${API_URL}/${droneSiteId}`, {
    method: 'DELETE'
  });
  const data = await response.json();
  return data;
}
