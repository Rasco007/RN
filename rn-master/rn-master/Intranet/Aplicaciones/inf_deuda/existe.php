<?php
$filtro = trim($_POST['d_objeto']);
$id_contribuyente = $_POST['id_contribuyente'];
$c_tributo = $_POST['c_tributo'];
$c_tipo_imponible = $_POST['c_tipo_imponible'];

$options='ERROR';

if ($filtro != '') {
    $db_query = new DB_Query("SELECT count(*) as SUMA
                             FROM CONTRIBUYENTES_TRIBUTOS CT, CONTRIBUYENTES C, tributos t
                             WHERE UPPER(d_objeto_hecho) = UPPER(nvl(:filtro,d_objeto_hecho))
                            -- AND CT.F_VIG_HASTA IS NULL
                             AND C.ID_CONTRIBUYENTE = NVL(:id_contribuyente,c.id_contribuyente)
                             AND CT.C_TRIBUTO = NVL(:c_tributo,CT.C_TRIBUTO)
                             AND CT.C_TIPO_IMPONIBLE = NVL(:c_tipo_imponible,CT.C_TIPO_IMPONIBLE)
                             AND CT.ID_CONTRIBUYENTE = C.ID_CONTRIBUYENTE
                             and t.c_tipo_imponible = ct.c_tipo_imponible and t.c_tributo = ct.c_tributo");

    $par = array(':filtro' => $filtro,':id_contribuyente' => $id_contribuyente,':c_tipo_imponible' => $c_tipo_imponible,':c_tributo' => $c_tributo,':c_tipo_objeto' => $c_tipo_objeto);
}else{
    $db_query = new DB_Query("SELECT count(*) as SUMA
                                 FROM CONTRIBUYENTES C
                                 WHERE C.ID_CONTRIBUYENTE = :id_contribuyente");

    $par = array(':id_contribuyente' => $id_contribuyente);
}
$row_query = $db_query->do_query($par);

if($row_query[0]['SUMA'] > 0){
	$options='OK';
}

echo $options;

?>