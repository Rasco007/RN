<?php
require_once(INTRANET."header.php");

$m_autoquery = $_POST['p_m_autoquery'];
$p_id_menu = $_POST['p_n_id_menu'];
$c_usuario = $_SESSION['usuario'];

$lista_consorcios = fun_id_lista('CONSORCIOS');
$lista_regiones_consorcio = fun_id_lista('REGIONES POR TIPO DE CONSORCIO');
$lista_areas_consorcio = fun_id_lista('AREAS POR TIPO DE CONSORCIO');
$lista_actividades = fun_id_lista('LISTA DE ACTIVIDADES RIEGO');
$lista_nomenclaturas = fun_id_lista('LISTADO DE NOMENCLATURAS');
$lista_motivos_baja = fun_id_lista('MOTIVOS DE BAJA INMUEBLES');
$lista_unidades = fun_id_lista('UNIDADES DE MEDIDA CANON RIEGO');

$m_dpa = 1;
$m_abm_historico = 1;

#HTML PRINCIPAL
include('adm_partidas/html/adm_partidas.html');
include('adm_partidas/html/modals.html');
include('adm_partidas/html/modals_historico.html');
?>

<style>
	#btn_extincion{
		display: none;
	}
	
	.partidaInactiva{
		background-color: #FF6565 !important;
	}

    .grid_hist{
        padding-right: 0px;
        padding-left: 0px;
    }

	/* Estilos dropdown */
    .dropdown-menu{
        max-width: 1px;
    }

    .cDropdown {
        padding: 5px 12px;
        color: #555;
        text-transform: none;
        font-weight: unset;
        font-size: 11px;
        border: 1px solid #c2cad8 !important;
        background-color: white !important;
    }

    .cDropdown :hover{
        background-color: white !important;
        color: #555;
    }
</style>

<script>

    //VARIABLES GLOBALES
    var v_id_menu = '<?=$p_id_menu?>';
    var v_m_autoquery = '<?=$m_autoquery?>';
    var v_c_usuario = '<?=$c_usuario?>';
    var v_lista_consorcios = '<?=$lista_consorcios?>';
    var v_lista_regiones_consorcio = '<?=$lista_regiones_consorcio?>';
    var v_lista_areas_consorcio = '<?=$lista_areas_consorcio?>';
    var v_lista_actividades = '<?=$lista_actividades?>';
    var v_lista_nomenclaturas = '<?=$lista_nomenclaturas?>';
    var v_lista_motivos_baja = '<?=$lista_motivos_baja?>';
    var v_lista_unidades = '<?=$lista_unidades?>';
    var v_m_dpa = '<?=$m_dpa?>';
    var auth_hist = '<?=$m_abm_historico?>';
    var ajax_autocomplete = null;
    var v_d_nomenclatura;

</script>

<script type='text/javascript' src='adm_partidas/js/funciones.js'></script>
<script type='text/javascript' src='adm_partidas/js/adm_partidas.js'></script>
<script type='text/javascript' src='adm_partidas/js/eventos_modals.js'></script>

<?php
require_once(INTRANET."footer.php");
?>