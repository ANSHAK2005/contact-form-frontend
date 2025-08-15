const form = document.getElementById('contactForm');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();


  if (!name || !email || !message) {
    alert('Please fill all fields.');
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    alert('Please enter a valid email address.');
    return;
  }

  if (message.length < 10) {
    alert('Message should be at least 10 characters long.');
    return;
  }

  try {

    const response = await fetch('https://contact-form-backend-24.onrender.com', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, message })
    });

    const data = await response.json();

    if (response.ok) {
      alert(data.message); 
      form.reset(); 
    } else {
      alert(data.message || 'Error sending message.');
    }

  } catch (error) {
    console.error('Error:', error);
    alert('Error sending message. Please try again later.');
  }
});
