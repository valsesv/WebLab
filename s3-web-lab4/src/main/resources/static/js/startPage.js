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
            window.location.href = "mainPage.html";
            this.isLoggedIn = true;
        },
        register() {
            // Здесь можно добавить логику для перехода на страницу регистрации или открытия модального окна
            alert('Registration functionality is not implemented yet.');
        }
    }
});