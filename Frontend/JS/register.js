const scriptURL = "https://script.google.com/macros/s/AKfycbxNAzYAROmefBWGhUyE2mC9Clm7S5-LEpeyIG1I5OMle5f1Htj-bcsdWBOqvEwqRjRY/exec";

document.getElementById('registrationForm').addEventListener('submit', async function(event) {
  event.preventDefault(); // Prevent normal form reload

  let isValid = true;

  // Clear previous errors
  document.getElementById('usernameError').textContent = '';
  document.getElementById('emailError').textContent = '';
  document.getElementById('passwordError').textContent = '';
  document.getElementById('confirmPasswordError').textContent = '';

  // Username validation
  const username = document.getElementById('username').value.trim();
  if (username.length < 3) {
    document.getElementById('usernameError').textContent = 'Username must be at least 3 characters long.';
    isValid = false;
  }

  // Email validation
  const email = document.getElementById('email').value.trim();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    document.getElementById('emailError').textContent = 'Please enter a valid email address.';
    isValid = false;
  }

  // Password validation
  const password = document.getElementById('password').value;
  if (password.length < 6) {
    document.getElementById('passwordError').textContent = 'Password must be at least 6 characters long.';
    isValid = false;
  }

  // Confirm Password validation
  const confirmPassword = document.getElementById('confirmPassword').value;
  if (password !== confirmPassword) {
    document.getElementById('confirmPasswordError').textContent = 'Passwords do not match.';
    isValid = false;
  }

  if (!isValid) return; // Stop if invalid

  // If valid → send data to backend
  const userData = {
    name: username,
    email: email,
    password: password
  };

  try {
    // Show loading message
    const btn = document.querySelector("button[type='submit']");
    btn.disabled = true;
    btn.textContent = "Registering...";

    const res = await fetch("http://localhost:5000/api/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData)
    });

    const data = await res.json();

    if (data.success) {
      alert("✅ Registration successful!");
      document.getElementById('registrationForm').reset();
    } else {
      alert("❌ Failed to register. Try again.");
    }

    btn.disabled = false;
    btn.textContent = "Register";

  } catch (error) {
    console.error("Error:", error);
    alert("⚠️ Server not responding. Check backend connection.");
  }
});