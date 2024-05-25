<?php

$oper = $_POST['p_oper'];
$filtro = $_POST['p_filtro'];
$p_id_contribuyente = $_POST['p_id_contribuyente'];
$p_d_objeto_hecho = $_POST['p_d_objeto_hecho'];
$p_d_nomenclatura = $_POST['p_d_nomenclatura'];
$p_n_regante = $_POST['p_n_regante'];

if ($oper === 'getDatos'){
    $db_query = new DB_Query("
    SELECT
		(select n_cuit from contribuyentes where id_contribuyente = v.id_contribuyente) cuit,
		v.n_partida objeto, siat.fun_nomenclatura_catastro(v.d_nomenclatura_real) nomenclatura,
        n_regante
	from V_PARTIDAS_RIEGO v
	where id_contribuyente = :p_id_contribuyente
    and v.n_partida = nvl(:p_d_objeto_hecho, v.n_partida)
	and siat.fun_nomenclatura_catastro(v.d_nomenclatura_real) = nvl(:p_d_nomenclatura, siat.fun_nomenclatura_catastro(v.d_nomenclatura_real))
    and nvl(v.n_regante, -1) = nvl(nvl(:p_n_regante,v.n_regante), -1)
	and v.m_activa = 'S'");

    $param_query = array(
		':p_id_contribuyente' => $p_id_contribuyente,
        ':p_d_objeto_hecho' => $p_d_objeto_hecho,
		':p_d_nomenclatura' => $p_d_nomenclatura,
        ':p_n_regante' => $p_n_regante
	);
    $row_query = $db_query->do_query($param_query);

    if (count($row_query) == 1){
        $result->cuit = $row_query[0]['CUIT'];
        $result->objeto = $row_query[0]['OBJETO'];
        $result->nomenclatura = $row_query[0]['NOMENCLATURA'];
        $result->n_regante = $row_query[0]['N_REGANTE'];
        $result->resultado = 'OK';
    }else{
        $result->resultado = 'NOOK';
        $result->error = 'La partida / nomenclatura seleccionada no existe o no se encuentra vigente para el tributo.';
    }

    echo json_encode($result);
}

?>