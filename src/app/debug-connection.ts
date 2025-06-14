import { environment } from '../environments/environment';

// This function will help debug API connection issues
export function debugBackendConnection() {
  console.log('%c DEBUG CONNECTION INFO ', 'background: #222; color: #bada55; font-size: 16px;');
  console.log('Current environment:', environment);
  console.log('Production mode:', environment.production);
  console.log('API URL being used:', environment.apiUrl);
  console.log('Window location:', window.location.href);
  
  // Test the connection to the backend
  const apiUrl = `${environment.apiUrl}/api/departments`;
  console.log('Attempting to connect to:', apiUrl);
  
  // Add CORS headers to the request
  const requestOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    mode: 'cors' as RequestMode
  };
  
  fetch(apiUrl, requestOptions)
    .then(response => {
      console.log('Backend response received!');
      console.log('Status:', response.status);
      console.log('Status Text:', response.statusText);
      console.log('Headers:', response.headers);
      console.log('Type:', response.type); // will be 'cors' if CORS is working
      
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      
      return response.json().catch(error => {
        console.error('Error parsing JSON:', error);
        return { error: 'Failed to parse JSON response' };
      });
    })
    .then(data => {
      console.log('Backend response data:', data);
      if (Array.isArray(data)) {
        console.log('Number of departments:', data.length);
      }
    })
    .catch(error => {
      console.error('Error connecting to backend:', error);
      console.log('This could be due to:');
      console.log('1. CORS issues - Backend not allowing requests from this origin');
      console.log('2. Network connectivity issues');
      console.log('3. Backend server is down');
      console.log('4. Incorrect API URL');
    });
    
  // Also try with no-cors mode as a fallback test
  console.log('Trying alternative no-cors request as a test...');
  fetch(apiUrl, { mode: 'no-cors' })
    .then(response => {
      console.log('No-CORS response type:', response.type);
      console.log('No-CORS request succeeded, but response cannot be read due to CORS policy');
    })
    .catch(error => {
      console.error('Even no-CORS request failed:', error);
    });
}
