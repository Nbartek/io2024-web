function formatZipCode(input) {
    let value = input.value.replace(/[^0-9]/g, ''); 
    if (value.length > 2) {
        value = value.slice(0, 2) + '-' + value.slice(2, 6); 
    }
    input.value = value;  
}
 function validateText(input, fieldName) {
    const regex = /^[A-Za-ząćęłńóśżźĄĆĘŁŃÓŚŻŹ\s]+$/; 
    if (!regex.test(input.value)) {
        alert(`Pole "${fieldName}" może zawierać tylko litery i spacje.`);
        input.setCustomValidity('Nieprawidłowy format.'); 
    } else {
        input.setCustomValidity(''); 
    }
}

document.getElementById('package-form').addEventListener('submit', function (event) {
    const form = event.target;
    if (!form.checkValidity()) {
        event.preventDefault(); 
    }
});

function validatePositiveNumber(input) {
    if (parseInt(input.value) < 0) {
        alert("Numer domu/mieszkania nie może być liczbą ujemną.");
        input.value = ''; 
    }
}

document.getElementById('sender-house').addEventListener('input', function() {
    validatePositiveNumber(this);
});
document.getElementById('sender-flat').addEventListener('input', function() {
    validatePositiveNumber(this);
});
document.getElementById('receiver-house').addEventListener('input', function() {
    validatePositiveNumber(this);
});
document.getElementById('receiver-flat').addEventListener('input', function() {
    validatePositiveNumber(this);
});