<?php
$oper = $_POST['p_oper'];

if ($oper === 'checkDigito'){
    $db_query = new DB_Query("SELECT SIAT.fun_calcula_digito_verificador(:param) digito FROM DUAL");

    $par = array(':param' => $_POST['param']);
    $row_query = $db_query->do_query($par);

    echo json_encode($row_query[0]);
}

if ($oper === 'getDominio'){
    if ($_POST['obtener'] === 'patente_vieja'){
        $query = "SELECT d_patente_vieja objeto,SIAT.fun_calcula_digito_verificador(d_patente_vieja) digito
                    FROM automotores where d_patente = :dominio";
    }else if ($_POST['obtener'] === 'patente'){
        $query = "SELECT d_patente objeto,SIAT.fun_calcula_digito_verificador(d_patente) digito
                    FROM automotores where d_patente_vieja = :dominio";
    }
    $db_query = new DB_Query($query);
    $par = array(':dominio' => $_POST['dominio']);
    $row_query = $db_query->do_query($par);
    echo json_encode($row_query[0]);
}