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
        results: []
    },
    methods: {
        checkPoint() {
            // Implement the logic to check if the point falls within the area
            // Add the result to the results array
        },
        logout() {
            // Implement the logout functionality
        }
    }
});
