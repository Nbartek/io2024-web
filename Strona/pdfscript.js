document.getElementById('package-form').addEventListener('submit', async function (event) {
    event.preventDefault();


    // Pobierz dane z formularza
    const formData = new FormData(event.target);
    const data = {
        // packageId: formData.get('package-id'), //packageid niepotrzebne
        size: formData.get('size'),
        region: formData.get('region'), // Nowe pole regionu kuriera
        destination: formData.get('destination'), // Nowe pole destynacji
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
        senderComment: formData.get('sender-comment') // Pole na dodatkowe uwagi
    };

    // Generuj kod QR
    const qr = new QRious({
        value: JSON.stringify(data),
        size: 130 // Rozmiar kodu QR
    });

    // Tworzenie PDF
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF('p', 'mm', 'a6');

    // Czcionki
    const headerFontSize = 16;
    const mainFontSize = 10;
    const smallFontSize = 8;

    // Logo (opcjonalnie)
    doc.setFontSize(headerFontSize);
    doc.text('PPPPPP', 10, 15); // Logo tekstowe zamiast obrazka
    doc.setFontSize(mainFontSize);

    // Kod QR
    const qrImage = qr.toDataURL();
    doc.addImage(qrImage, 'PNG', 50, 2, 45, 45);  // Pozycja i rozmiar QR w A6

    // Linie separacyjne
    doc.setLineWidth(0.5);
    doc.line(10, 51, 100, 51);

    // Sekcja 2: Dane nadawcy
    doc.text('Nadawca:', 10, 61);
    doc.setFontSize(smallFontSize);
    doc.text(`Imie i nazwisko: ${data.senderName}`, 10, 68);
    doc.text(`Adres: ${data.senderStreet} ${data.senderHouse}/${data.senderFlat}`, 10, 75);
    doc.text(`Miasto: ${data.senderCity}, Kod pocztowy: ${data.senderZip}`, 10, 82);

    // Sekcja 3: Dane odbiorcy
    doc.line(10, 89, 100, 89); // Linia separacyjna
    doc.text('Odbiorca:', 10, 99);
    doc.setFontSize(smallFontSize);
    doc.text(`Imie i nazwisko: ${data.receiverName}`, 10, 106);
    doc.text(`Adres: ${data.receiverStreet} ${data.receiverHouse}/${data.receiverFlat}`, 10, 113);
    doc.text(`Miasto: ${data.receiverCity}, Kod pocztowy: ${data.receiverZip}`, 10, 120);

    if (data.senderComment) {
        doc.text(`Uwagi: ${data.senderComment}`, 10, 130);
    }

    doc.line(10, 140, 100, 140);

    // Pobierz PDF
    doc.save('etykieta.pdf');
});
