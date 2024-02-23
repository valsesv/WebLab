const startPage = new Vue({
    el: '#startPage',
    data: {
        fullName: 'Demidovich Vseslav',
        groupNumber: 'P33091',
        variantNumber: '423315',
        username: '',
        password: '',
        isLoggedIn: false
    },
    methods: {
        login() {
            const userData = {
                username: this.username,
                password: this.password
            };

            fetch('/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.text();
                })
                .then(data => {
                    if (data === 'Login successful') {
                        this.isLoggedIn = true;
                        window.location.href = "mainPage.html";
                    } else {
                        alert(data); // Display the error message
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                    alert('Failed to login. Please try again later.');
                });
        },
        register() {
            const userData = {
                username: this.username,
                password: this.password
            };

            fetch('/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.text();
                })
                .then(data => {
                    if (data === 'Registration successful') {
                        // Automatically login after successful registration
                        console.log(data);
                        this.login();
                    } else {
                        alert(data); // Display the error message
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                    alert('Failed to register. Please try again later.');
                });
        }
    }
});