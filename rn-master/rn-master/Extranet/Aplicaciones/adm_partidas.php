<?php
require_once(EXTRANET."header.php");

if($_SESSION['entorno'] == 'EXTRANET'){
    $id_transacc = log_transaction(1056);
}

$m_autoquery = $_POST['p_m_autoquery'];
$p_id_menu = $_POST['p_n_id_menu'];

$lista_consorcios = fun_id_lista('CONSORCIOS Y DPA EXTRANET');
$lista_regiones_consorcio = fun_id_lista('CONSORCIOS REGIONES POR USUARIO');
$lista_areas_consorcio = fun_id_lista('CONSORCIOS AREAS POR USUARIO');
$lista_actividades = fun_id_lista('LISTA DE ACTIVIDADES RIEGO');
$lista_nomenclaturas = fun_id_lista('LISTADO DE NOMENCLATURAS');
$lista_motivos_baja = fun_id_lista('MOTIVOS DE BAJA INMUEBLES');
$lista_unidades = fun_id_lista('UNIDADES DE MEDIDA CANON RIEGO');

$db_query = new DB_Query(
	"SELECT
	    distinct case when c_organismo='DPA' then 1
	        else 0
	    end m_dpa,
        nvl((select 1 from usuarios_perfiles where c_usuario=eu.c_usuario and id_perfil=33),0) as auth_abm_historico
	from entes_usuarios eu
	where c_usuario = get_info_user('c_usuario')
	and c_ente = 'DPA'");
$row_query = $db_query->do_query();
$m_dpa = $row_query[0]['M_DPA'];
$m_abm_historico = $row_query[0]['AUTH_ABM_HISTORICO'];

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
require_once(EXTRANET."footer.php");
?>