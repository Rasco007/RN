<?php

$oper = $_POST['p_oper'];
$p_c_organismo = $_POST['p_c_organismo'];
$p_c_region = $_POST['p_c_region'];

if ($oper === 'getRegiones'){
    $db_query = new DB_Query("
    SELECT distinct c_region as c_dato,
        (select d_dato from siat.tablas_generales where n_tabla=26 and c_dato=cr.c_region) as d_dato
    from consorcios_regiones cr
    where (cr.c_organismo = :p_c_organismo OR :p_c_organismo = 'DPA')");

    $par = array(':p_c_organismo' => $p_c_organismo);
    $row_query = $db_query->do_query($par);

    for ($i=0; $i < count($row_query); $i++){
        $result.='<option value="'.$row_query[$i]['C_DATO'].'">'.$row_query[$i]['D_DATO'].'</option>';
    }

    echo $result;
}

if ($oper === 'getArea'){
    $db_query = new DB_Query("
    SELECT distinct c_area as c_dato,
        (select d_dato from siat.tablas_generales where n_tabla=62 and c_dato=cr.c_area and d_dato1=cr.c_region) as d_dato
    from consorcios_regiones cr
    where (cr.c_organismo = :p_c_organismo OR :p_c_organismo = 'DPA')
    and c_region = :p_c_region");

    $par = array(':p_c_organismo' => $p_c_organismo, ':p_c_region' => $p_c_region);
    $row_query = $db_query->do_query($par);

    for ($i=0; $i < count($row_query); $i++){
        $result.='<option value="'.$row_query[$i]['C_DATO'].'">'.$row_query[$i]['D_DATO'].'</option>';
    }

    echo $result;
}