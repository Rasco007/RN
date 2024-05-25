<?php

$db_query = new DB_query("SELECT 1 FROM DUAL");
$row = $db_query->do_query();

echo json_encode('OK');

?>