var startPage = new Vue({
    el: '#mainPage',
    data: {
        fullName: 'Demidovich Vseslav',
        groupNumber: 'P33091',
        variantNumber: '423315',
        xCoordinate: '',
        yCoordinate: '',
        radius: '',
        xCoordinates: [ -2, -1.5, -1, -0.5, 0, 0.5, 1, 1.5, 2],
        yMin: -3,
        yMax: 3,
        radiusOptions: [ -2, -1.5, -1, -0.5, 0, 0.5, 1, 1.5, 2],
        results: [],
        alertMessage: '',
        username: localStorage.getItem('username')

    },
    methods: {
        checkPoint() {
            if (!this.xCoordinate) {
                this.alertMessage = 'Please select X coordinate.';
                return;
            }

            if (this.yCoordinate === '' || isNaN(this.yCoordinate) || this.yCoordinate < -3 || this.yCoordinate > 3) {
                this.alertMessage = 'Y coordinate must be between -3 and 3.';
                return;
            }

            if (!this.radius) {
                this.alertMessage = 'Please select R coordinate.';
                return;
            }
            this.alertMessage = '';

            const data = {
                x: this.xCoordinate,
                y: this.yCoordinate,
                r: this.radius
            };

            // Make an HTTP POST request to your Spring backend
            fetch('/sendDataToBackend', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => {
                    // Handle the successful response from the backend
                    this.alertMessage = data;
                })
                .catch(error => {
                    // Handle errors if the request fails
                    this.alertMessage = 'Failed to send data to the server.';
                    console.error('Error:', error);
                });
        },
        logout() {
            localStorage.setItem('isLoggedIn', "false");
            localStorage.setItem('username', '');
            window.location.href = "index.html";
        },
        getPoints(){
            return;
            fetch(`/getResultElementsByUsername?username=${"man"}`, {
                method: 'GET',
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => {
                    // Handle the successful response from the backend
                    this.results = data;
                })
                .catch(error => {
                    // Handle errors if the request fails
                    console.error('Error:', error);
                });
        }
    },
    mounted() {
        this.getPoints();
    },
});

if (localStorage.getItem('isLoggedIn') === "false") {
    startPage.logout();
}