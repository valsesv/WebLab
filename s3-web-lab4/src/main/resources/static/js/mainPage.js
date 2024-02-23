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
            if (isNaN(this.xCoordinate)) {
                this.alertMessage = 'Please select X coordinate.';
                return;
            }

            if (this.yCoordinate === '' || isNaN(this.yCoordinate) || this.yCoordinate < -3 || this.yCoordinate > 3) {
                this.alertMessage = 'Y coordinate must be between -3 and 3.';
                return;
            }

            if (isNaN(this.radius)) {
                this.alertMessage = 'Please select R coordinate.';
                return;
            }
            this.alertMessage = '';

            const data = {
                x: this.xCoordinate,
                y: this.yCoordinate,
                r: this.radius,
                username: this.username
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
                    this.updateUserPoints();
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
        updateUserPoints(){
            fetch(`/getResultElementsByUsername?username=${this.username}`, {
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
                    this.drawPoints();
                })
                .catch(error => {
                    // Handle errors if the request fails
                    console.error('Error:', error);
                });
        },
        drawPoints() {
            // Get reference to the SVG container
            const svg = document.getElementById('coordinatePanel');
            let R = this.radius;

            const circles = svg.querySelectorAll('circle');
            circles.forEach(circle => {
                circle.parentNode.removeChild(circle);
            });

            // Iterate over results array and draw points on SVG
            this.results.forEach(result => {
                if (result.coordinates.r === this.radius){
                    const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');

                    let x = result.coordinates.x;
                    let y = result.coordinates.y;

                    let normalizedX = 200 + x * 150 / R;
                    let normalizedY = 200 - y * 150 / R;

                    // Set circle attributes based on result
                    circle.setAttribute('cx', normalizedX);
                    circle.setAttribute('cy', normalizedY);
                    circle.setAttribute('r', "3");

                    if (result.result === "true") {
                        circle.setAttribute("fill", "white");
                    } else {
                        circle.setAttribute("fill", "#e42575");
                    }
                    // Add outline
                    circle.setAttribute('stroke', 'black');
                    circle.setAttribute('stroke-width', '1');

                    // Append circle to SVG container
                    svg.appendChild(circle);
                }
            });

        }
    },
    mounted() {
        this.updateUserPoints();
    },
});

if (localStorage.getItem('isLoggedIn') === "false") {
    startPage.logout();
}