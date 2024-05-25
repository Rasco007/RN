<?php
/*require_once('../funciones/db_pager.php');
require_once('../funciones/query_loader.php');
require_once('../funciones/funciones.php');*/

/*require_once(FUNCIONES_FRAMEWORK."db_pager.php");
require_once(FUNCIONES_FRAMEWORK."query_loader.php");
require_once(FUNCIONES_FRAMEWORK.'funciones.php');*/

//checklogin();

function get_desc_trib_subtrib($c_tipo_imponible, $c_tributo)
{
	$db_query = new DB_Query("SELECT tg.d_dato as d_tipo_imponible, t.d_descrip as d_tributo  FROM tributos t INNER JOIN siat.tablas_generales tg ON T.C_TIPO_IMPONIBLE = TG.C_DATO WHERE t.c_tipo_imponible = :c_tipo_imponible AND t.c_tributo = :c_tributo AND TG.N_TABLA = 3");
	$parametros = array(':c_tipo_imponible' => $c_tipo_imponible,  ':c_tributo' => $c_tributo);
	$row_query = $db_query->do_query($parametros);
	
	return $row_query[0];
}

function get_cuit($id_contribuyente)
{
	$db_query = new DB_Query("select n_cuit,fun_formato_cuit(n_cuit) as cuit_mascara,d_denominacion from contribuyentes c where id_contribuyente = :id_contribuyente");
	$parametros = array(':id_contribuyente' => $id_contribuyente);
	$row_query = $db_query->do_query($parametros);
	
	return $row_query[0];
}

function get_btn_info($type){
    $db_query = new DB_Query("SELECT DISTINCT D_DATO4 FROM siat.TABLAS_GENERALES WHERE N_TABLA=776 AND D_DATO = :c_tipo AND ROWNUM <= 1");
    $parametros = array(':c_tipo' => $type);
    $row_titulo = $db_query->do_query($parametros);
    $titulo = $row_titulo[0]['D_DATO4'];

	$db_query = new DB_Query("SELECT D_DATO1, case D_DATO1 when '#04B404' then '#FFFFFF' else '#FF0000' end COLOR, D_DATO2,D_DATO5 FROM siat.TABLAS_GENERALES WHERE N_TABLA=776 AND D_DATO = :c_tipo");
	$parametros = array(':c_tipo' => $type);
	$row_query = $db_query->do_query($parametros);
	$htm = '<div class="content">';
	$htm .= '<p><b><u>'.$titulo.':</u></b></p>';
	foreach ($row_query as $r){

		if ($r['D_DATO5'] == 'COLOR'){
			$htm .= '<p><span class="btn_info" style="background-color: '.$r['COLOR'].';border:1px solid !important;"></span> '.$r['D_DATO2'].'</p>';
        }elseif ($r['D_DATO5'] == 'ICONO'){
            $htm .= '<p><span class="btn_info '.$r['COLOR'].'"></span> '.$r['D_DATO2'].'</p>';
		}
	}
	$htm .= '</div>';

	return $htm;
}
?>


