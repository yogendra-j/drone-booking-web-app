const API_URL = 'http://localhost:8080/api/customers';

export async function getCustomers() {
  const response = await fetch(API_URL);
  const data = await response.json();
  return data;
}

export async function getCustomerById(customerId) {
  const response = await fetch(`${API_URL}/${customerId}`);
  const data = await response.json();
  return data;
}

export async function createCustomer(customerData) {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(customerData)
  });
  const data = await response.json();
  return data;
}

export async function updateCustomer(customerId, customerData) {
  const response = await fetch(`${API_URL}/${customerId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(customerData)
  });
  const data = await response.json();
  return data;
}

export async function deleteCustomer(customerId) {
  const response = await fetch(`${API_URL}/${customerId}`, {
    method: 'DELETE'
  });
  const data = await response.json();
  return data;
}