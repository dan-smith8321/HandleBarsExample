// console.log('test'); 

const usernameField = document.querySelector('#username');
const signUpSubmit = document.querySelector('#signUpSubmit');

signUpSubmit.addEventListener('click', (e) => {
    if(usernameField.value === ""){
        e.preventDefault();
        window.alert('Form Requires username');
    }
    if(password.value != confirmPassword.value) {
        e.preventDefault();
        window.alert('Passwords do not match');
    }
})