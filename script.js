document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('signup-form');
    const errorMessage = document.getElementById('error-message');
    const passwordInput = document.getElementById('password');
    const passwordConfirmInput = document.getElementById('password-confirm');
    const consentAllCheckbox = document.getElementById('consent-all');
    const consentRequiredCheckbox = document.getElementById('consent-required');
    const consentOptionalCheckbox = document.getElementById('consent-optional');
    const consentErrorMessage = document.getElementById('consent-error-message');
    const loadingOverlay = document.getElementById('loading-overlay'); // Reference to the loading overlay
    const themeToggleButton = document.getElementById('theme-toggle-button'); // Reference to the theme toggle button
    const bodyElement = document.body; // Reference to the body element

    // Tab elements
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');

    // Login form elements
    const loginForm = document.getElementById('login-form');
    const loginUsernameInput = document.getElementById('login-username');
    const loginPasswordInput = document.getElementById('login-password');
    const loginErrorMessage = document.getElementById('login-error-message');

    // Helper function to validate email format
    function validateEmail(email) {
        const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        return re.test(String(email).toLowerCase());
    }

    // Function to update "Select All" checkbox state
    function updateSelectAllCheckbox() {
        consentAllCheckbox.checked = consentRequiredCheckbox.checked && consentOptionalCheckbox.checked;
    }

    // Event listener for "Select All" checkbox
    consentAllCheckbox.addEventListener('change', function() {
        consentRequiredCheckbox.checked = this.checked;
        consentOptionalCheckbox.checked = this.checked;
    });

    // Event listeners for individual checkboxes
    consentRequiredCheckbox.addEventListener('change', updateSelectAllCheckbox);
    consentOptionalCheckbox.addEventListener('change', updateSelectAllCheckbox);

    // Function to set theme
    function setTheme(theme) {
        if (theme === 'dark') {
            bodyElement.classList.add('dark-mode');
            themeToggleButton.textContent = '라이트 모드'; // Change button text
        } else {
            bodyElement.classList.remove('dark-mode');
            themeToggleButton.textContent = '다크 모드'; // Change button text
        }
        localStorage.setItem('theme', theme); // Save preference
    }

    // Event listener for theme toggle button
    themeToggleButton.addEventListener('click', () => {
        const currentTheme = bodyElement.classList.contains('dark-mode') ? 'dark' : 'light';
        setTheme(currentTheme === 'dark' ? 'light' : 'dark');
    });

    // --- Tab Functionality ---
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons and hide all tab contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));

            // Add active class to the clicked button
            button.classList.add('active');

            // Show the corresponding tab content
            const targetTabId = button.getAttribute('data-tab');
            document.getElementById(`${targetTabId}-tab`).classList.add('active');
        });
    });

    // --- Sign Up Form Submission Handler ---
    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent default form submission

        // Show loading spinner
        loadingOverlay.classList.remove('hidden');

        const username = document.getElementById('username').value.trim();
        const password = passwordInput.value;
        const passwordConfirm = passwordConfirmInput.value;
        const email = document.getElementById('email').value.trim();

        // Clear previous error messages
        errorMessage.textContent = '';
        consentErrorMessage.textContent = '';

        // --- General Field Validations ---
        if (!username || !password || !passwordConfirm || !email) {
            errorMessage.textContent = '모든 필드를 입력해주세요.';
            loadingOverlay.classList.add('hidden'); // Hide spinner on error
            return;
        }

        // Password complexity validation
        const hasLetter = /[a-z]/i.test(password); // Case-insensitive letter check
        const hasNumber = /\d/.test(password); // Number check
        const hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(password); // Special character check

        if (password.length < 8 || !hasLetter || !hasNumber || !hasSpecialChar) {
            errorMessage.textContent = '비밀번호는 8자 이상이어야 하며, 영문, 숫자, 특수문자를 포함해야 합니다.';
            loadingOverlay.classList.add('hidden'); // Hide spinner on error
            return;
        }

        if (password !== passwordConfirm) {
            errorMessage.textContent = '비밀번호가 일치하지 않습니다.';
            loadingOverlay.classList.add('hidden'); // Hide spinner on error
            return;
        }

        if (!validateEmail(email)) {
            errorMessage.textContent = '유효한 이메일 주소를 입력해주세요.';
            loadingOverlay.classList.add('hidden'); // Hide spinner on error
            return;
        }

        // --- Consent Validation ---
        if (!consentRequiredCheckbox.checked) {
            consentErrorMessage.textContent = '필수 항목에 동의해야 회원가입할 수 있습니다.';
            loadingOverlay.classList.add('hidden'); // Hide spinner on error
            return;
        }

        // If all validations pass
        alert('회원가입이 완료되었습니다!');
        form.reset(); // Reset the form
        // Reset consent checkboxes and error message after reset
        consentAllCheckbox.checked = false;
        consentRequiredCheckbox.checked = false;
        consentOptionalCheckbox.checked = false;
        consentErrorMessage.textContent = '';
        errorMessage.textContent = ''; // Clear general error message too

        // Hide loading spinner after successful completion
        loadingOverlay.classList.add('hidden');
    });

    // --- Login Form Submission Handler ---
    loginForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent default form submission

        // Show loading spinner
        loadingOverlay.classList.remove('hidden');

        const username = loginUsernameInput.value.trim();
        const password = loginPasswordInput.value;

        // Clear previous error messages
        loginErrorMessage.textContent = '';
        errorMessage.textContent = ''; // Clear registration errors too if any
        consentErrorMessage.textContent = '';

        // Basic validation for login fields
        if (!username || !password) {
            loginErrorMessage.textContent = '아이디와 비밀번호를 모두 입력해주세요.';
            loadingOverlay.classList.add('hidden'); // Hide spinner on error
            return;
        }

        // --- Simulate Login Process ---
        // In a real application, you would send these credentials to a server.
        // For this example, we'll just show an alert.
        console.log(`Attempting login with username: ${username}, password: ${password}`);

        // Simulate a delay for the loading spinner
        setTimeout(() => {
            // For demonstration, let's assume login is successful if fields are not empty
            // In a real app, this would be based on server response
            alert('로그인되었습니다!');
            loginForm.reset(); // Reset the login form
            loadingOverlay.classList.add('hidden'); // Hide spinner after success
        }, 1500); // Simulate a 1.5 second login process
    });


    // Initial setup
    updateSelectAllCheckbox(); // Ensure correct state on load
    // Apply saved theme on page load
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        setTheme(savedTheme);
    } else {
        // Default to light mode if no preference saved
        setTheme('light');
    }

    // Initialize the first tab to be active
    document.getElementById('signup-tab').classList.add('active');
    document.querySelector('.tab-button[data-tab="signup"]').classList.add('active');
});