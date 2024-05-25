<?php
require_once(EXTRANET."header.php");

$m_autoquery = $_POST['p_m_autoquery'];
$p_id_menu = $_POST['p_n_id_menu'];
$p_id_obligacion = $_POST['id_obligacion'];

if(isset($_POST['id_obligacion'])){
	$db_query = new DB_Query("
	    SELECT  c.id_contribuyente,
	            fun_formato_cuit(n_cuit) as n_cuit, 
	            d_denominacion,
	            c_tipo_documento,
	            n_documento,
	            c_tipo_imponible,
	            (select d_dato from tablas_generales 
				where n_tabla=3 and c_dato=o.c_tipo_imponible) d_tipo_imponible,
	            d_objeto_hecho,
	            c_tributo,
	            (select d_descrip from tributos
				where c_tipo_imponible=o.c_tipo_imponible
				and c_tributo=o.c_tributo) d_tributo,
				c_concepto,
				(select d_concepto from tributos_conceptos
				where c_tributo=o.c_tributo
				and c_concepto=o.c_concepto) d_concepto,
				substr(n_posicion_fiscal,1,4)||'/'||substr(n_posicion_fiscal,5) n_posicion_fiscal,
				n_cuota_anticipo as n_cuota,
				f_vto_pago,
				id_obligacion,
				id_plan_pago,
				trunc(sysdate) f_actualizacion
	    from contribuyentes c, obligaciones o
	    where c.id_contribuyente = o.id_contribuyente
	    	and o.id_obligacion = :id_obligacion");

	$param = array(':id_obligacion' => $p_id_obligacion);
	$row_query = $db_query->do_query($param);

	$id_contribuyente = $row_query[0]['ID_CONTRIBUYENTE'];
	$n_cuit = $row_query[0]['N_CUIT'];
	$d_denominacion = $row_query[0]['D_DENOMINACION'];
	$c_tipo_documento = $row_query[0]['C_TIPO_DOCUMENTO'];
	$n_documento = $row_query[0]['N_DOCUMENTO'];
	$c_tipo_imponible = $row_query[0]['C_TIPO_IMPONIBLE'];
	$d_tipo_imponible = $row_query[0]['D_TIPO_IMPONIBLE'];
	$d_objeto_hecho = $row_query[0]['D_OBJETO_HECHO'];
	$c_tributo = $row_query[0]['C_TRIBUTO'];
	$c_concepto = $row_query[0]['C_CONCEPTO'];
	$d_concepto = $row_query[0]['D_CONCEPTO'];
	$n_posicion_fiscal = $row_query[0]['N_POSICION_FISCAL'];
	$n_cuota = $row_query[0]['N_CUOTA'];
	$f_vto_pago = $row_query[0]['F_VTO_PAGO'];
	$id_obligacion = $row_query[0]['ID_OBLIGACION'];
	$id_plan_pago = $row_query[0]['ID_PLAN_PAGO'];
	$f_actualizacion = $row_query[0]['F_ACTUALIZACION'];
}

#HTML PRINCIPAL
include('calculo_interes/html/principal.html');
?>

<script>

    //VARIABLES GLOBALES
    var v_id_menu = '<?=$p_id_menu?>';
    var v_m_autoquery = '<?=$m_autoquery?>';
    var v_id_obligacion = '<?=$p_id_obligacion?>';
    var v_f_actualizacion = '<?=$f_actualizacion?>';
    var v_c_tributo = '<?=$c_tributo?>';

    var datos_main_grid = new GridParam({
        id_menu: v_id_menu,
        n_grid:0,
        m_autoquery:v_m_autoquery,
        param:{':id_obligacion':v_id_obligacion,
    		':c_tributo':v_c_tributo,
    		':f_actualizacion':v_f_actualizacion
    	}
    });

</script>

<script type='text/javascript' src='calculo_interes/js/funciones.js'></script>

<?php
require_once(EXTRANET."footer.php");
?>