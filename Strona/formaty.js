function formatZipCode(input) {
    let value = input.value.replace(/[^0-9]/g, '');  // Usuwamy wszystko oprócz cyfr
    if (value.length > 2) {
        value = value.slice(0, 2) + '-' + value.slice(2, 6); // Dodajemy pauzę po drugiej cyfrze
    }
    input.value = value;  // Zaktualizowanie wartości pola
}
 // Funkcja walidacji tekstu (imię, miasto, itp.)
 function validateText(input, fieldName) {
    const regex = /^[A-Za-ząćęłńóśżźĄĆĘŁŃÓŚŻŹ\s]+$/; // Zezwalamy tylko na litery i spacje
    if (!regex.test(input.value)) {
        alert(`Pole "${fieldName}" może zawierać tylko litery i spacje.`);
        input.setCustomValidity('Nieprawidłowy format.'); // Wyświetlenie błędu
    } else {
        input.setCustomValidity(''); // Jeśli jest poprawnie, usuwamy błąd
    }
}

// Funkcja walidacji formularza
document.getElementById('package-form').addEventListener('submit', function (event) {
    const form = event.target;
    if (!form.checkValidity()) {
        event.preventDefault(); // Zapobiegaj wysłaniu formularza, jeśli jest nieprawidłowy
    }
});

// Funkcja walidacji numerów domu i mieszkania, zapobiegająca wprowadzaniu liczb ujemnych
function validatePositiveNumber(input) {
    if (parseInt(input.value) < 0) {
        alert("Numer domu/mieszkania nie może być liczbą ujemną.");
        input.value = ''; // Możemy także wyczyścić pole, jeśli liczba jest ujemna
    }
}

// Dodatkowy kod, aby obsłużyć walidację po każdej zmianie w polu
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