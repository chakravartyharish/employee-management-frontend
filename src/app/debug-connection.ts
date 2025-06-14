import { environment } from '../environments/environment';

// This function will help debug API connection issues
export function debugBackendConnection() {
  console.log('Current environment:', environment);
  console.log('API URL being used:', environment.apiUrl);
  
  // Test the connection to the backend
  fetch(`${environment.apiUrl}/api/departments`)
    .then(response => {
      console.log('Backend response status:', response.status);
      return response.json().catch(error => {
        console.error('Error parsing JSON:', error);
        return { error: 'Failed to parse JSON response' };
      });
    })
    .then(data => {
      console.log('Backend response data:', data);
    })
    .catch(error => {
      console.error('Error connecting to backend:', error);
    });
}
