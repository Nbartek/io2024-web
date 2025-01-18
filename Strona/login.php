<?php

session_start();

require_once "connect.php";


try {
    $conn = new PDO("sqlsrv:server=$serverName;Database=$database", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $inputUsername = $_POST['login'] ?? null;
    $inputPassword = $_POST['password'] ?? null;

    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        if (!$inputUsername || !$inputPassword) {
            $_SESSION['error'] = "Login i hasło muszą być podane.";
            header('Location: login.php');
            exit();
        }

        $sql = "SELECT 1 FROM dbo.Pracownicy WHERE Login = :username AND Hasło = :password";
        $stmt = $conn->prepare($sql);

        $stmt->bindParam(':username', $inputUsername, PDO::PARAM_STR);
        $stmt->bindParam(':password', $inputPassword, PDO::PARAM_STR);
        $stmt->execute();

        $isValidUser = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($isValidUser) {
            $_SESSION['login'] = $inputUsername;
            header('Location: form.php');
            exit();
        } else {
            $_SESSION['error'] = "Nieprawidłowy login lub hasło.";
            header('Location: login.html');
            exit();
        }
    }
} catch (PDOException $e) {
    $_SESSION['error'] = "Błąd połączenia z SQL Server: " . $e->getMessage();
    header('Location: login.php');
    exit();
} catch (Exception $e) {
    $_SESSION['error'] = "Wystąpił błąd: " . $e->getMessage();
    header('Location: login.php');
    exit();
}

?>
