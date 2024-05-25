<?php
	require_once(EXTRANET . "header.php");

	$m_autoquery = $_POST['p_m_autoquery'];
	$p_id_menu = $_POST['p_n_id_menu'];
	$p_c_tributo = $_POST['p_c_tributo'];
	$p_id_tipotransacc = $_POST['p_id_tipotransacc'];

	$query = "select fun_formato_cuit(n_cuit) n_cuit, d_denominacion,n_cuit n_cuit_sin_formato 
				from contribuyentes where id_contribuyente = :id_contribuyente";

	$db_query ->setQuery($query);
	$param = array(':id_contribuyente' => $_SESSION['id_rel_persona']);
	$row_query = $db_query->do_query($param);
	$d_denominacion = $row_query[0]['D_DENOMINACION'];
	$n_cuit = $row_query[0]['N_CUIT'];
	$n_cuit_sin_format = $row_query[0]['N_CUIT_SIN_FORMATO'];

	$query = "select c_tributo, d_descrip from tributos 
			where c_tributo = :c_Tributo";

	$db_query ->setQuery($query);
	$param = array(':c_Tributo' => $p_c_tributo);
	$tributos = $db_query->do_query($param);
	$c_tributo = $tributos[0]['C_TRIBUTO'];
	$d_tributo = $tributos[0]['D_DESCRIP'];

	$query = "select d_objeto_hecho from contribuyentes_tributos 
			where id_contribuyente = :id_contribuyente
			and c_tributo = :c_tributo";



	$db_query ->setQuery($query);
	$param = array(':c_Tributo' => $p_c_tributo,
					':id_contribuyente' => $_SESSION['id_rel_persona']);
	$objetos = $db_query->do_query($param);
	
	if ($p_c_tributo == '160') {
		// NOMENCLATURAS CANON DE RIEGO
		$query = "SELECT siat.fun_nomenclatura_catastro(v.d_nomenclatura_real) d_nomenclatura
			from V_PARTIDAS_RIEGO v
			where id_contribuyente = :id_contribuyente
			and v.m_activa = 'S'";

		$db_query ->setQuery($query);
		$param = array(':id_contribuyente' => $_SESSION['id_rel_persona']);
		$nomenclaturas = $db_query->do_query($param);

	}
	require_once('cons_deuda/html/principal.html');

	$param = null;

	$sql = "select siguiente_dia_habil(trunc(sysdate)) fecha from dual";

	$db_query = new DB_Query($sql);
	$results = $db_query->do_query($param);
	$fecha_hoy = $results[0]['FECHA'];

    $sql = "select web.FUN_BUSCAR_HABIL(trunc(sysdate) + 15) fecha_max from dual";

    $db_query = new DB_Query($sql);
    $results = $db_query->do_query($param);
    $fecha_max_emision = $results[0]['FECHA_MAX'];
?>

<script>
    var v_id_contribuyente = '<?=$_SESSION['id_rel_persona']?>';
    var fecha_hoy = '<?=$fecha_hoy?>';
    var fecha_max_emision = '<?=$fecha_max_emision?>';
    var v_c_tributo = '<?=$p_c_tributo?>';
    var v_id_menu = <?=$p_id_menu?>;
    var id_sesion;
    var v_lista_regantes = <?=fun_id_lista('REGANTES POR CONTRIBUYENTE');?>;
    var n_cuit_sin_formato = <?=$n_cuit_sin_format?>;
	var disabledDays = <?php echo getFeriados(date("Y")) ?>;
	var g_id_tipotransacc = '<?php echo $p_id_tipotransacc ?>';
	var g_id_transaccion;

    var datos_main_grid = new GridParam({
		id_menu: v_id_menu,
		n_grid:0,
		m_autoquery:'N',
		param:{':id_sesion':null}
    });

    $(document).ready(function() {
        inicializarGrillas();
        inicializarEventos();
    });
</script>

<script type='text/javascript' src='cons_deuda/js/grillas.js'></script>
<script type='text/javascript' src='cons_deuda/js/eventos.js'></script>
<script type='text/javascript' src='cons_deuda/js/funciones.js'></script>

<?php
	require_once(EXTRANET."footer.php");
?>
