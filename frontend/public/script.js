document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('login-form');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const togglePassword = document.getElementById('togglePassword');
    const errorMessage = document.getElementById('error-message');
    const loadingMessage = document.getElementById('loading-message');
  
    // Show/hide password toggle
    togglePassword.addEventListener('click', function() {
      const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
      passwordInput.setAttribute('type', type);
      this.textContent = type === 'password' ? 'Show Password' : 'Hide Password';
    });
  
    // Form submit event listener
    loginForm.addEventListener('submit', async function(event) {
      event.preventDefault(); // Prevent the form from submitting
  
      // Show loading message
      loadingMessage.style.display = 'block';
      errorMessage.style.display = 'none';
  
      try {
        const response = await axios.post('http://localhost:5000/api/login', {
          email: emailInput.value,
          password: passwordInput.value
        });
  
        // Handle successful login
        loadingMessage.style.display = 'none';
        const { token, user } = response.data;
        console.log(`Logged in successfully as ${user.name}`);
  
        // Example: Store token in localStorage (replace with your token handling logic)
        localStorage.setItem('token', token);
  
        // Redirect to dashboard or next page
        window.location.href = 'dashboard.html'; // Replace with your desired redirect URL
      } catch (error) {
        // Handle login error
        loadingMessage.style.display = 'none';
        errorMessage.textContent = 'Invalid email or password. Please try again.';
        errorMessage.style.display = 'block';
        console.error('Login error:', error);
      }
    });
  });
  