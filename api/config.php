<?php
define('DB_HOST', 'localhost');
define('DB_NAME', 'database');
define('DB_USER', 'root');
define('DB_PASS', '');
define('ADMIN_PASS', 'isi-password-anda');
function db(){
  return new PDO('mysql:host='.DB_HOST.';dbname='.DB_NAME.';charset=utf8mb4', DB_USER, DB_PASS,
    [PDO::ATTR_ERRMODE=>PDO::ERRMODE_EXCEPTION, PDO::ATTR_DEFAULT_FETCH_MODE=>PDO::FETCH_ASSOC]);
}