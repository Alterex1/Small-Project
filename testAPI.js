

const url = 'http://cop4331slp-18contactmanager.xyz/LAMPAPI/searchContact.php';
const firstname = 'firstname';
const lastname = 'lastname'
const userID = '1';
const email = 'email'; // Replace with the actual login
const phone = 'phone'; // Replace with the actual password

// Create a JSON payload object
const payload = {
  firstname : firstname,
  lastname: lastname,
  userid : userID,
  email: email,
  phone: phone
  
};

// Configure the fetch request
const requestOptions = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(payload)
};

// Send the POST request
fetch(url, requestOptions)
  .then(response => {
    if (response.status === 200) {
      return response.json();
    } else {
      throw new Error('Login failed');
    }
  })
  .then(data => {
    // Handle the response data here (e.g., store user data, redirect, etc.)
    console.log('Login successful:', data);
  })
  .catch(error => {
    // Handle errors here (e.g., display an error message)
    console.error('Error:', error.message);
  });
  