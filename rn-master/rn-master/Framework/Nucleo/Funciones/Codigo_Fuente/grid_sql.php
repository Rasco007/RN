<?php

checklogin($_POST['id_menu']);
session_write_close();
$parametros = json_decode($_POST['param']);

$db_pager = new DB_Pager(new QL_Grid($_POST['id_menu'],$_POST['n_grid']),$_POST['m_autoquery'],
                     $_POST['page'],$_POST['rows'],$_POST['sidx'],$_POST['sord']);

$response = $db_pager->do_pager($parametros);

session_start();
echo json_encode($response);

?>
