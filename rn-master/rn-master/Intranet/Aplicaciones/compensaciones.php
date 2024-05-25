<?php
	require_once(INTRANET."header.php");

	$m_autoquery = $_POST['p_m_autoquery'];
	$p_n_id_menu = $_POST['p_n_id_menu'];
	$p_id_obligacion = $_POST['p_id_obligacion'];
	
	if(!isset($m_autoquery)){
		$m_autoquery = 'N';
	}
	
	if(isset($p_id_obligacion)){
		$query = "select o.c_tipo_imponible, 
			(select d_dato from tablas_generales where n_tabla = 3 and c_dato = o.c_tipo_imponible) d_tipo_imponible,
			o.c_tributo, (select d_descrip from tributos where c_tipo_imponible = o.c_tipo_imponible
			and c_tributo = o.c_tributo) d_tributo, o.d_objeto_hecho
		from obligaciones o, contribuyentes c
		where o.id_obligacion =  :id_obligacion
		and o.id_contribuyente = c.id_contribuyente";

		$db_query->setQuery($query);
		$parametros = array(':id_obligacion'=>$p_id_obligacion);
		$row_query = $db_query->do_query($parametros);
		
		$c_tipo_imponible = $row_query[0]['C_TIPO_IMPONIBLE'];
		$d_tipo_imponible = $row_query[0]['D_TIPO_IMPONIBLE'];
		$c_tributo = $row_query[0]['C_TRIBUTO'];
		$d_tributo = $row_query[0]['D_TRIBUTO'];
		$d_objeto_hecho = $row_query[0]['D_OBJETO_HECHO'];
	}



	$query = "SELECT ppal.FUN_TIENE_PERMISO('AUT_COMP_DISTINTO_CUIT') AUT_COMP_DISTINTO_CUIT from dual";
    $db_query ->setQuery($query);
    $row = $db_query->do_query();

    $aut_comp_distinto_cuit  = $row[0]['AUT_COMP_DISTINTO_CUIT'];


    $query = "SELECT ppal.FUN_TIENE_PERMISO('AUT_COMP_IGUAL_OBJETO') AUT_COMP_IGUAL_OBJETO from dual";
    $db_query ->setQuery($query);
    $row = $db_query->do_query();

    $aut_comp_igual_objeto = $row[0]['AUT_COMP_IGUAL_OBJETO'];


	$query = "select obtener_constante('TRAUTOMOTOR') auto, obtener_constante('TRINMOBILIARIO') inmo, obtener_constante('COD_IBD') cod_ibd from dual";

	$db_query ->setQuery($query);
	$row = $db_query->do_query();
	
	$auto = $row[0]['AUTO'];
	$inmo = $row[0]['INMO'];
	$cod_ibd = $row[0]['COD_IBD'];
	
	 $lista_tributos = fun_id_lista('LISTA DE TRIBUTOS COMPENSACIONES');
	 $lista_subtributos = fun_id_lista('LISTA DE SUBTRIBUTOS COMPENSACIONES');
	 $lista_objetos = fun_id_lista('LISTA DE OBJETOS COMPENSACIONES');
	 $lista_contribuyentes = fun_id_lista('LISTA CONTRIBUYENTES POR TRIBUTO Y OBJETO');
	
	require_once("compensaciones/html/compensaciones.html");

	echo 'Version: 18/11/2022 07:00';
?>

    <link rel="stylesheet" type="text/css" href="compensaciones/css/estilos.css">
<script type="text/javascript" src="compensaciones/js/eventos.js?no_cache=<?=date('dmyhis')?>"></script>
<script type="text/javascript" src="compensaciones/js/funciones.js?no_cache=<?=date('dmyhis')?>"></script>
<script type="text/javascript" src="compensaciones/js/grillas.js?no_cache=<?=date('dmyhis')?>"></script>

<script>
	//VARIABLES GLOBALES
    var v_proceso = 'N';
    var editando = 'N';
    var v_id_menu = '<?=$p_n_id_menu?>';
	var v_m_autoquery = '<?=$m_autoquery?>';
	var vg_auto = '<?=$auto?>';

    var aut_comp_distinto_cuit = '<?=$aut_comp_distinto_cuit?>';
    var aut_comp_igual_objeto  = '<?=$aut_comp_igual_objeto?>';

    var vg_inmo = '<?=$inmo?>';
    var vg_cod_ibd = '<?=$cod_ibd?>';
    var vg_lista_tributos = '<?=$lista_tributos?>';
    var vg_lista_subtributos = '<?=$lista_subtributos?>';
    var vg_lista_objetos = '<?=$lista_objetos?>';
    var vg_lista_contribuyentes = '<?=$lista_contribuyentes?>';
	
    var ajax_autocomplete = null;
	var vg_cred_interes_desde = 'DESDE_MOV';
	var vg_lote_deb = null;
	var vg_lote_cred = null;

    var datos_creditos_grid = new GridParam({
        id_menu:v_id_menu,
        n_grid:0,
        m_autoquery:v_m_autoquery,
        keyNavigation: false,
        param:{':p_n_lote': null}
    });

    var datos_deudas_grid = new GridParam({
        id_menu:v_id_menu,
        n_grid:1,
        m_autoquery:v_m_autoquery,
        keyNavigation: false,
        param:{':p_n_lote': null}
    });


    $('#c_tributo').focusout(function(){
                $('#d_objeto_hecho').focus();
    });

    $('#c_tributo1').focusout(function(){
        $('#d_objeto_hecho1').focus();
    });


    $(document).ready(function() {
		$('#content_wraper').hide();

		inicializarEventos();
		inicializarGrillas();
	});
</script>

<?php
	require_once(INTRANET."footer.php");
?>