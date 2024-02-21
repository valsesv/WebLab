new Vue({
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
        alertMessage: ''
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
        },
        logout() {
            window.location.href = "index.html";
        }
    }
});
