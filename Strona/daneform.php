<?php
require_once 'connect.php';

// Włącz debugowanie błędów
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Ustaw nagłówek JSON
header('Content-Type: application/json');

$connection = @new mysqli($host, $user, $pass, $db);

if ($connection->connect_errno != 0) {
    http_response_code(500);
    echo json_encode(['error' => 'Błąd połączenia z bazą danych.']);
    exit();
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    try {
        // Pobranie danych z POST
        $size = $_POST['size'] ?? null;
        $sender_zip = $_POST['sender-zip'] ?? null;
        $receiver_zip = $_POST['receiver-zip'] ?? null;
        $sender_name = $_POST['sender-name'] ?? null;
        $receiver_name = $_POST['receiver-name'] ?? null;
        $sender_city = $_POST['sender-city'] ?? null;
        $sender_street = $_POST['sender-street'] ?? null;
        $sender_house = $_POST['sender-house'] ?? null;
        $sender_flat = $_POST['sender-flat'] ?? null;
        $receiver_city = $_POST['receiver-city'] ?? null;
        $receiver_street = $_POST['receiver-street'] ?? null;
        $receiver_house = $_POST['receiver-house'] ?? null;
        $receiver_flat = $_POST['receiver-flat'] ?? null;
        $region = $_POST['region'] ?? null;
        $destination = $_POST['destination'] ?? null;

        $sql = "INSERT INTO dataform (
                    size, sender_zip, receiver_zip, sender_name, receiver_name,
                    sender_city, sender_street, sender_house, sender_flat,
                    receiver_city, receiver_street, receiver_house, receiver_flat,
                    region, destination
                ) VALUES (
                    ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?
                )";

        $stmt = $connection->prepare($sql);

        if (!$stmt) {
            throw new Exception('Błąd przygotowania zapytania: ' . $connection->error);
        }

        $stmt->bind_param(
            'sssssssssssssss',
            $size, $sender_zip, $receiver_zip, $sender_name, $receiver_name,
            $sender_city, $sender_street, $sender_house, $sender_flat,
            $receiver_city, $receiver_street, $receiver_house, $receiver_flat,
            $region, $destination
        );

        if (!$stmt->execute()) {
            throw new Exception('Błąd wykonania zapytania: ' . $stmt->error);
        }

        // Pobierz ID wstawionego rekordu
        $package_id = $stmt->insert_id;
        echo json_encode(['package_id' => $package_id]);

    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode(['error' => $e->getMessage()]);
    } finally {
        $stmt->close();
        $connection->close();
    }
}
?>
