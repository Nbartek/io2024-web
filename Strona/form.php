<?php
    session_start();
?>

<!DOCTYPE html>
<html lang="pl">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="style_form.css">
    <title>Etykieta z kodem QR</title>
    <script src="https://cdn.jsdelivr.net/npm/qrious/dist/qrious.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.4.0/jspdf.umd.min.js"></script>
</head>
<body>
    <img src="images/logotyp.png" alt="Logo"   class="logo">
    <form id="package-form" method="post" action="daneform.php">
        <h1>Wypełnij formularz</h1>
                <label for="size">Gabaryt</label>
    <div class="size-container">
        <select class= "sizebox" id="size" name="size" required>
            <option value="" disabled selected>Gabaryt</option>
            <option value="tak">TAK</option>
            <option value="nie">NIE</option>
        </select>
      
    </div>

        <label for="sender-zip">Kod pocztowy nadawcy</label>
        <input type="text" id="sender-zip" name="sender-zip" pattern="^[0-9]{2}-[0-9]{3}$" placeholder="00-000" required maxlength="6" oninput="formatZipCode(this)">

        <label for="receiver-zip">Kod pocztowy odbiorcy</label>
        <input type="text" id="receiver-zip" name="receiver-zip" pattern="^[0-9]{2}-[0-9]{3}$" placeholder="00-000" required maxlength="6" oninput="formatZipCode(this)">

        <label for="sender-name">Dane nadawcy</label>
        <input type="text" id="sender-name" name="sender-name" placeholder="Imię i nazwisko" required oninput="validateText(this, 'Imię i nazwisko')">

        <label for="receiver-name">Dane odbiorcy</label>
        <input type="text" id="receiver-name" name="receiver-name" placeholder="Imię i nazwisko" required oninput="validateText(this, 'Imię i nazwisko')">

        <label for="sender-address">Adres nadawcy</label>
        <input type="text" id="sender-city" name="sender-city" placeholder="Miasto" required oninput="validateText(this, 'Miasto')">
        <input type="text" id="sender-street" name="sender-street" placeholder="Ulica" required>
        <input type="number" id="sender-house" name="sender-house" placeholder="Numer Domu" required min="0">
        <input type="number" id="sender-flat" name="sender-flat" placeholder="Numer Mieszkania*" min="0">

        <label for="receiver-address">Adres odbiorcy</label>
        <input type="text" id="receiver-city" name="receiver-city" placeholder="Miasto" required oninput="validateText(this, 'Miasto')">
        <input type="text" id="receiver-street" name="receiver-street" placeholder="Ulica" required>
        <input type="number" id="receiver-house" name="receiver-house" placeholder="Numer Domu" required min="0">
        <input type="number" id="receiver-flat" name="receiver-flat" placeholder="Numer Mieszkania*" min="0">
        <label for="region">Dane kurierskie</label>
        <input type="text" id="region" name="region" placeholder="Region kurierski" required>
        <input type="text" id="destination" name="destination" placeholder="Destynacja" required>
        <label for="sender-comment">Uwagi nadawcy</label>        
        <textarea id="sender-comment" name="sender-comment"></textarea>
        <label class="poleno"> *Pole nieobowiązkowe</label>



        <button type="submit" class="btn" >Generuj etykietę PDF</button>
    </form>
    <div class="user-info">
        <span id="logged-user">Zalogowany jako: <?php echo $_SESSION['email']; ?>
        <button id="logout-button">Wyloguj</button>
    </div>
    <script src = "pdfscript.js"></script>

    <script src="formaty.js"></script>
    

</body>
</html>
