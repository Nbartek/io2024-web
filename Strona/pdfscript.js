document.getElementById('package-form').addEventListener('submit', async function (event) {
    event.preventDefault();

    // Pobierz dane z formularza
    const formData = new FormData(event.target);
    const data = {
        packageId: formData.get('package-id'),
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
        size: 200 // Rozmiar kodu QR
    });

    // Tworzenie PDF
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    // Czcionki
    const headerFontSize = 18;
    const mainFontSize = 14;
    const smallFontSize = 10;

    // Logo (opcjonalnie)
    doc.setFontSize(headerFontSize);
    doc.text('PPPPPP', 10, 15); // Logo tekstowe zamiast obrazka
    doc.setFontSize(mainFontSize);

    // Kod QR
    const qrImage = qr.toDataURL();
    doc.addImage(qrImage, 'PNG', 120, 7, 60, 60);

    // Linie separacyjne
    doc.setLineWidth(0.5);
    doc.line(10, 80, 200, 80);

    // Sekcja 2: Dane nadawcy
    doc.text('Nadawca:', 10, 90);
    doc.setFontSize(smallFontSize);
    doc.text(`Imie i nazwisko: ${data.senderName}`, 10, 100);
    doc.text(`Adres: ${data.senderStreet} ${data.senderHouse}/${data.senderFlat}`, 10, 110);
    doc.text(`Miasto: ${data.senderCity}, Kod pocztowy: ${data.senderZip}`, 10, 120);
    if (data.senderComment) {
        doc.text(`Uwagi: ${data.senderComment}`, 10, 100);
    }
    doc.setFontSize(mainFontSize);

    // Sekcja 3: Dane odbiorcy
    doc.line(10, 130, 200, 130); // Linia separacyjna
    doc.text('Odbiorca:', 10, 140);
    doc.setFontSize(smallFontSize);
    doc.text(`Imie i nazwisko: ${data.receiverName}`, 10, 150);
    doc.text(`Adres: ${data.receiverStreet} ${data.receiverHouse}/${data.receiverFlat}`, 10, 160);
    doc.text(`Miasto: ${data.receiverCity}, Kod pocztowy: ${data.receiverZip}`, 10, 170);
    doc.line(10, 180, 200, 180);
    // Pobierz PDF
    doc.save('etykieta.pdf');
});
