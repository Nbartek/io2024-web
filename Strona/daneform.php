<?php
session_start();
require_once 'connect.php';

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

header('Content-Type: application/json');

if (!isset($_SESSION['login']) || !isset($_SESSION['password'])) {
    http_response_code(403);
    echo json_encode(['error' => 'Brak autoryzacji. Zaloguj się ponownie.']);
    exit();
}

$username = $_SESSION['login'];
$password = $_SESSION['password'];

try {
    $conn = new PDO("sqlsrv:server=$serverName;Database=$database", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        $gabaryt = $_POST['size'] ?? null;
        $kod_pocztowy_nadawcy = $_POST['sender-zip'] ?? null;
        $kod_pocztowy_odbiorcy = $_POST['receiver-zip'] ?? null;
        $dane_nadawcy = $_POST['sender-name'] ?? null;
        $dane_odbiorcy = $_POST['receiver-name'] ?? null;

        $adres_nadawcy = implode(' ', array_filter([
            $_POST['sender-city'] ?? null,
            $_POST['sender-street'] ?? null,
            trim(($_POST['sender-house'] ?? '') . ($_POST['sender-flat'] ? '/' . $_POST['sender-flat'] : ''))
        ]));

        $adres_odbiorcy = implode(' ', array_filter([
            $_POST['receiver-city'] ?? null,
            $_POST['receiver-street'] ?? null,
            trim(($_POST['receiver-house'] ?? '') . ($_POST['receiver-flat'] ? '/' . $_POST['receiver-flat'] : ''))
        ]));

        $status = 'Nadano';
        $data_nadania = date('Y-m-d H:i:s');
        $czyzniszczona = 0;

        $sql = "INSERT INTO dbo.Paczki (
                    Gabaryt, Kod_Pocztowy_Nadawcy, Kod_Pocztowy_Odbiorcy, Dane_Nadawcy, Dane_Odbiorcy,
                    Adres_Nadawcy, Adres_Odbiorcy, Status, Data_Nadania, czyZniszczona
                ) VALUES (
                    :gabaryt, :kod_pocztowy_nadawcy, :kod_pocztowy_odbiorcy, :dane_nadawcy, :dane_odbiorcy,
                    :adres_nadawcy, :adres_odbiorcy, :status, :data_nadania, :czyzniszczona
                )";

        $stmt = $conn->prepare($sql);

        $stmt->bindParam(':gabaryt', $gabaryt);
        $stmt->bindParam(':kod_pocztowy_nadawcy', $kod_pocztowy_nadawcy);
        $stmt->bindParam(':kod_pocztowy_odbiorcy', $kod_pocztowy_odbiorcy);
        $stmt->bindParam(':dane_nadawcy', $dane_nadawcy);
        $stmt->bindParam(':dane_odbiorcy', $dane_odbiorcy);
        $stmt->bindParam(':adres_nadawcy', $adres_nadawcy);
        $stmt->bindParam(':adres_odbiorcy', $adres_odbiorcy);
        $stmt->bindParam(':status', $status);
        $stmt->bindParam(':data_nadania', $data_nadania);
        $stmt->bindParam(':czyzniszczona', $czyzniszczona);

        $stmt->execute();

        $lastId = $conn->lastInsertId();

        echo json_encode([
            'success' => true,
            'Id_Paczki' => $lastId,
            'data_nadania' => $data_nadania
        ]);
    }
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Błąd bazy danych: ' . $e->getMessage()]);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => $e->getMessage()]);
}
?>
