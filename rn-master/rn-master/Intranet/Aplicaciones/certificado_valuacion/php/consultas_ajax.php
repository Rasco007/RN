<?php
$d_nomenclatura = $_POST['d_nomenclatura'];
$f_emision = $_POST['f_emision'];
$db_query = new DB_Query(
    "select d_denominacion, fun_formato_cuit(n_cuit) n_cuit
    from   objetos_contribuyentes
    where  d_objeto_hecho = :d_nomenclatura
    and    c_tributo      = 60
    and    c_tipo_respon  = 9
    and    ((:f_emision >= f_vig_desde and f_vig_hasta is null)
    or (:f_emision between f_vig_desde and f_vig_hasta))");

$par = array(':d_nomenclatura' => $d_nomenclatura,':f_emision' => $f_emision);
$row_query = $db_query->do_query($par);

if(count($row_query)==0){
    $result['resultado'] = 'NOOK';
} else {
    $result['resultado'] = 'OK';
    $result['d_denominacion'] = $row_query[0]['D_DENOMINACION'];
    $result['n_cuit'] = $row_query[0]['N_CUIT'];
}

echo json_encode($result);
?>