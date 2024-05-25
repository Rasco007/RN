<?php
$oper = $_POST['p_oper'];

if ($oper === 'checkDigito'){
    $db_query = new DB_Query("SELECT SIAT.fun_calcula_digito_verificador(:p_dominio) digito,
                                            SIAT.fun_calcula_digito_verificador(:p_dominio_ant) digito_ant FROM DUAL");

    $par = array(':p_dominio' => $_POST['p_dominio'],':p_dominio_ant' => $_POST['p_dominio_ant']);
    $row_query = $db_query->do_query($par);

    echo json_encode($row_query[0]);
}

if ($oper === 'getDominio'){
    $db_query = new DB_Query("SELECT d_patente,
                                            SIAT.fun_calcula_digito_verificador(d_patente) digito
                                            FROM automotores
                                            WHERE d_patente_vieja = :p_dominio_ant");

    $par = array(':p_dominio_ant' => $_POST['p_dominio_ant']);
    $row_query = $db_query->do_query($par);

    echo json_encode($row_query[0]);
}