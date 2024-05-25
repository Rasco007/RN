<?php
require_once(EXTRANET."header.php");

if($_SESSION['entorno'] == 'EXTRANET'){
    $id_transacc = log_transaction(1055);
}

$m_autoquery = $_POST['p_m_autoquery'];
$p_id_menu = $_POST['p_n_id_menu'];
$lista_consorcios = fun_id_lista('CONSORCIOS Y DPA EXTRANET');
$lista_regiones_consorcio = fun_id_lista('CONSORCIOS REGIONES POR USUARIO');
$lista_areas_consorcio = fun_id_lista('CONSORCIOS AREAS POR USUARIO');
$lista_conceptos = fun_id_lista('CONSORCIOS CONCEPTOS PARAM VAL LIQ');
$lista_actividades = fun_id_lista('LISTA DE ACTIVIDADES RIEGO');

$db_query = new DB_Query(
	"SELECT
	    distinct case when c_organismo='DPA' then 1
	        else 0
	    end m_dpa,
	    nvl((select 1 from usuarios_perfiles where c_usuario=eu.c_usuario and id_perfil=31),0) as aut_modif_fecha
	from entes_usuarios eu
	where c_usuario = get_info_user('c_usuario')
	and c_ente = 'DPA'");
$row_query = $db_query->do_query();
$m_dpa = $row_query[0]['M_DPA'];
$aut_modif_fecha = $row_query[0]['AUT_MODIF_FECHA'];

$fecha_hoy = date('d/m/Y');

#HTML PRINCIPAL
include('param_val_liq_canon/html/param_val_liq_canon.html');
include('param_val_liq_canon/html/modals.html');
?>

<script>

    //VARIABLES GLOBALES
    var v_id_menu = '<?=$p_id_menu?>';
    var v_m_autoquery = '<?=$m_autoquery?>';
    var v_m_dpa = '<?=$m_dpa?>';
    var v_aut_modif_fecha = '<?=$aut_modif_fecha?>';
    var fecha_hoy = '<?=$fecha_hoy?>';
    var v_operacion;
    var v_lista_consorcios = '<?=$lista_consorcios?>';
    var v_lista_regiones_consorcio = '<?=$lista_regiones_consorcio?>';
    var v_lista_areas_consorcio = '<?=$lista_areas_consorcio?>';
    var v_lista_conceptos = '<?=$lista_conceptos?>';
    var v_lista_actividades = '<?=$lista_actividades?>';

</script>

<script type='text/javascript' src='param_val_liq_canon/js/funciones.js'></script>
<script type='text/javascript' src='param_val_liq_canon/js/param_val_liq_canon.js'></script>

<?php
require_once(EXTRANET."footer.php");
?>