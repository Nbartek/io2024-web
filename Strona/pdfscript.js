document.getElementById('package-form').addEventListener('submit', async function(event) {
    event.preventDefault();

    // Pobierz dane z formularza
    const formData = new FormData(event.target);
    const data = {
        packageId: formData.get('package-id'),
        size: formData.get('size'),
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
    };

    // Generuj kod QR
    const qr = new QRious({
        value: JSON.stringify(data),
        size: 200 // Zwiększono rozmiar kodu QR
    });

    // Tworzenie PDF
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    // Ustawienia czcionki
    const mainFontSize = 14; // Zwiększona czcionka
    const subFontSize = 12; // Czcionka dla szczegółów adresowych
    doc.setFontSize(mainFontSize);

    // Sekcja 1: ID paczki, gabaryt i kod QR
    doc.text(`ID Paczki: ${data.packageId}`, 10, 20);
    doc.text(`Gabaryt: ${data.size}`, 10, 30);
    const qrImage = qr.toDataURL();
    doc.addImage(qrImage, 'PNG', 100, 10, 60, 60); // Większy kod QR



    // Sekcja 2: Dane nadawcy
    doc.text(`Dane nadawcy:`, 10, 80);
    doc.setFontSize(subFontSize);
    doc.text(`Imie i nazwisko: ${data.senderName}`, 10, 90);
    doc.text(`Adres: ${data.senderCity}, ${data.senderStreet}`, 10, 100);
    doc.text(`Nr domu: ${data.senderHouse}, Nr mieszkania: ${data.senderFlat}`, 10, 110);
    doc.text(`Kod pocztowy: ${data.senderZip}`, 10, 120);

    // Sekcja 3: Dane odbiorcy
    doc.setFontSize(mainFontSize);
    doc.text(`Dane odbiorcy:`, 10, 140);
    doc.setFontSize(subFontSize);
    doc.text(`Imie i nazwisko: ${data.receiverName}`, 10, 150);
    doc.text(`Adres: ${data.receiverCity}, ${data.receiverStreet}`, 10, 160);
    doc.text(`Nr domu: ${data.receiverHouse}, Nr mieszkania: ${data.receiverFlat}`, 10, 170);
    doc.text(`Kod pocztowy: ${data.receiverZip}`, 10, 180);

    

    // Pobierz PDF
    doc.save('etykieta.pdf');
});
