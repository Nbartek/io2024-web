document.getElementById('package-form').addEventListener('submit', async function (event) {
    event.preventDefault();

    const formData = new FormData(event.target);

    try {
        const response = await fetch('daneform.php', {
            method: 'POST',
            body: formData
        });

        if (!response.ok) {
            throw new Error(`Błąd HTTP: ${response.status}`);
        }

        const result = await response.json();

        if (result.error) {
            throw new Error(`Serwer zwrócił błąd: ${result.error}`);
        }

        const packageId = result.Id_Paczki; 
        const dataNadania = result.data_nadania;

        generateLabel(packageId, formData, dataNadania);

    } catch (error) {
        console.error('Wystąpił błąd podczas wysyłania formularza:', error);
        alert('Wystąpił błąd podczas wysyłania formularza. Spróbuj ponownie.');
    }
});

function generateLabel(packageId, formData, dataNadania) {
    const qr = new QRious({
        value: packageId.toString(),
        size: 130
    });

    const data = {
        size: formData.get('size'),
        senderAddress: formData.get('sender-city') + ' ' + formData.get('sender-street') + ' ' +
            formData.get('sender-house') + (formData.get('sender-flat') ? '/' + formData.get('sender-flat') : ''),
        receiverAddress: formData.get('receiver-city') + ' ' + formData.get('receiver-street') + ' ' +
            formData.get('receiver-house') + (formData.get('receiver-flat') ? '/' + formData.get('receiver-flat') : ''),
        senderName: formData.get('sender-name'),
        receiverName: formData.get('receiver-name'),
        dataNadania: dataNadania
    };

    const { jsPDF } = window.jspdf;
    const doc = new jsPDF('p', 'mm', 'a6');

    doc.setFontSize(16);
    doc.text('PPPPPP', 10, 15);
    const qrImage = qr.toDataURL();
    doc.addImage(qrImage, 'PNG', 50, 2, 45, 45);

    doc.setFontSize(12);
    doc.text('Dane Paczki:', 10, 60); 
    doc.setFontSize(10);
    doc.text(`ID: ${packageId}`, 10, 73); 
    doc.text(`Data Nadania: ${data.dataNadania}`, 10, 80); 
    
    doc.text('Nadawca:', 10, 87); 
    doc.text(`Imie i nazwisko: ${data.senderName}`, 10, 94);
    doc.text(`Adres: ${data.senderAddress}`, 10, 101); 
    
    doc.text('Odbiorca:', 10, 109); 
    doc.text(`Imie i nazwisko: ${data.receiverName}`, 10, 115); 
    doc.text(`Adres: ${data.receiverAddress}`, 10, 122);
    

    doc.save('etykieta.pdf');
}
