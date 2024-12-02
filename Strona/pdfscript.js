document.getElementById('package-form').addEventListener('submit', async function (event) {
    event.preventDefault(); // Zatrzymanie domyślnego wysyłania

    const formData = new FormData(event.target); // Pobranie danych z formularza

    try {
        // Wyślij dane do serwera
        const response = await fetch('daneform.php', {
            method: 'POST',
            body: formData
        });

        if (!response.ok) {
            throw new Error(`Błąd HTTP: ${response.status}`);
        }

        const result = await response.json(); // Oczekujemy odpowiedzi JSON

        if (result.error) {
            throw new Error(`Serwer zwrócił błąd: ${result.error}`);
        }

        const packageId = result.package_id;

        // Teraz generujemy etykietę po otrzymaniu ID paczki
        generateLabel(packageId, formData);


    } catch (error) {
        console.error('Wystąpił błąd podczas wysyłania formularza:', error);
        alert('Wystąpił błąd podczas wysyłania formularza. Spróbuj ponownie.');
    }
});

// Funkcja generująca etykietę
function generateLabel(packageId, formData) {
    // Generowanie kodu QR tylko z ID paczki
    const qr = new QRious({
        value: packageId.toString(), // Tylko ID paczki
        size: 130
    });

    // Pobranie danych z formularza do wyświetlenia na etykiecie
    const data = {
        size: formData.get('size'),
        region: formData.get('region'),
        destination: formData.get('destination'),
        senderZip: formData.get('sender-zip'),
        receiverZip: formData.get('receiver-zip'),
        senderName: formData.get('sender-name'),
        receiverName: formData.get('receiver-name'),
        senderCity: formData.get('sender-city'),
        senderStreet: formData.get('sender-street'),
        senderHouse: formData.get('sender-house'),
        senderFlat: formData.get('sender-flat'),
        receiverCity: formData.get('receiver-city'),
        receiverStreet: formData.get('receiver-street'),
        receiverHouse: formData.get('receiver-house'),
        receiverFlat: formData.get('receiver-flat'),
        senderComment: formData.get('sender-comment')
    };

            const { jsPDF } = window.jspdf;
        const doc = new jsPDF('p', 'mm', 'a6');

        doc.setFontSize(16);
        doc.text('PPPPPP', 10, 15);
        const qrImage = qr.toDataURL();
        doc.addImage(qrImage, 'PNG', 50, 2, 45, 45);

        doc.setFontSize(10);
        doc.text('Nadawca:', 10, 61);
        doc.setFontSize(8);
        doc.text(`Imie i nazwisko: ${data.senderName}`, 10, 68);
        doc.text(`Adres: ${data.senderStreet} ${data.senderHouse}/${data.senderFlat}`, 10, 75);
        doc.text(`Miasto: ${data.senderCity}, Kod pocztowy: ${data.senderZip}`, 10, 82);

        doc.text('Odbiorca:', 10, 99);
        doc.setFontSize(8);
        doc.text(`Imie i nazwisko: ${data.receiverName}`, 10, 106);
        doc.text(`Adres: ${data.receiverStreet} ${data.receiverHouse}/${data.receiverFlat}`, 10, 113);
        doc.text(`Miasto: ${data.receiverCity}, Kod pocztowy: ${data.receiverZip}`, 10, 120);

        if (data.senderComment) {
            doc.text(`Uwagi: ${data.senderComment}`, 10, 130);
        }

        doc.save('etykieta.pdf');
}
