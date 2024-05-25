<?php

//$reset = opcache_reset();

require_once(INTRANET . "header.php");

$m_autoquery = $_POST['p_m_autoquery'];
$p_id_menu = $_POST['p_n_id_menu'];
$p_n_instancia = $_POST['p_n_instancia'];
$p_n_orden = $_POST['p_n_orden'];
$p_id_obligacion = $_POST['p_id_obligacion'];

if (isset($_POST['p_modo'])) {
    $modo = $_POST['p_modo'];
} else {
    $modo = 'CAR';
}

$fecha_hoy = date('d/m/Y');

$query = "  select c_dato, d_dato
            from SIAT.TABLAS_GENERALES WHERE N_TABLA = 254 order by c_dato";

$db_query->setQuery($query);
$param = array();
$monedas = $db_query->do_query($param);

$query = "  select d_dato2, d_dato
            from SIAT.TABLAS_GENERALES WHERE N_TABLA = 241 order by c_dato";

$db_query->setQuery($query);
$param = array();
$cuentas = $db_query->do_query($param);

$query = "  select c_tributo, d_objeto_hecho from obligaciones where id_obligacion = :p_id_obligacion";

$db_query->setQuery($query);
$param = array(':p_id_obligacion' => $p_id_obligacion);
$results = $db_query->do_query($param);

$c_tributo = $results[0]['C_TRIBUTO'];
$d_objeto_hecho = $results[0]['D_OBJETO_HECHO'];



#HTML PRINCIPAL
include('carga_inspec_iibb_oblig/html/principal.html');
include('carga_inspec_iibb_oblig/html/modal_abm_actividad.html');
include('carga_inspec_iibb_oblig/html/modales_deducciones.html');
include('carga_inspec_iibb_oblig/html/modal_inf_adicional.html');
?>
<style>
    .dropdown-menu {
        font-size: 11px !important;
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

    .cDropdown :hover {
        background-color: white !important;
        color: #555;
    }

    .ui-autocomplete {
        z-index: 59000 !important;
    }



</style>

<script type='text/javascript' src='carga_inspec_iibb_oblig/js/grillas.js?no_cache=<?=date('dmy')?>'></script>
<script type='text/javascript' src='carga_inspec_iibb_oblig/js/eventos.js?no_cache=<?=date('dmy')?>'></script>
<script type='text/javascript' src='carga_inspec_iibb_oblig/js/funciones.js?no_cache=<?=date('dmy')?>'></script>

<script>
    //VARIABLES GLOBALES

    var v_reset         =   '<?=$reset?>';
    var v_id_menu       = '<?=$p_id_menu?>';
    var v_m_autoquery   = '<?=$m_autoquery?>';
    var fecha_hoy       = '<?=$fecha_hoy?>';
    var v_n_instancia   = <?=$p_n_instancia?>;
    var v_n_orden       = <?=$p_n_orden?>;
    var v_id_obligacion = <?=$p_id_obligacion?>;
    var v_c_tributo     = '<?=$c_tributo?>';
    var v_d_objeto_hecho = '<?=$d_objeto_hecho?>';
    var modo = '<?=$modo?>';
    var modo_obl = null;
    var ajax_autocomplete = null;
    var pos_fiscal=null;
    var v_anio;
    var v_mes;
    var v_pos_fiscal;


    var lastSel;

    console.log(v_id_menu);
    console.log(v_reset);

    var datos_main_grid = new GridParam({
        id_menu: v_id_menu,
        n_grid: 0,
        m_autoquery: 'N',
        keyNavigation: false,
        param: {
            ':p_n_instancia': v_n_instancia,
            ':p_n_orden': v_n_orden,
            ':p_id_obligacion': v_id_obligacion
        }
    });

    var datos_modal_deduc_grid1 = new GridParam({
        id_menu: v_id_menu,
        n_grid: 1,
        m_autoquery: 'N',
        keyNavigation: false,
        param: {
            ':p_n_instancia': v_n_instancia,
            ':p_n_orden': v_n_orden,
            ':p_id_obligacion': v_id_obligacion
        }
    });

    /*BANCO*/
    var datos_modal_deduc_grid2 = new GridParam({
        id_menu: v_id_menu,
        n_grid: 2,
        m_autoquery: 'N',
        keyNavigation: false,
        param: {
            ':p_n_instancia': v_n_instancia,
            ':p_n_orden': v_n_orden,
            ':p_id_obligacion': v_id_obligacion
        }
    });

    /*IIBB*/
    var datos_modal_deduc_grid3 = new GridParam({
        id_menu: v_id_menu,
        n_grid: 5,
        m_autoquery: 'N',
        keyNavigation: false,
        param: {
            ':p_n_instancia': v_n_instancia,
            ':p_n_orden': v_n_orden,
            ':p_id_obligacion': v_id_obligacion
        }
    });

    /*PERCEPCIONES*/
    var datos_modal_deduc_grid4 = new GridParam({
        id_menu: v_id_menu,
        n_grid: 4,
        m_autoquery: 'N',
        keyNavigation: false,
        param: {
            ':p_n_instancia': v_n_instancia,
            ':p_n_orden': v_n_orden,
            ':p_id_obligacion': v_id_obligacion
        }
    });

    /*ADUANA*/
    var datos_modal_deduc_grid5 = new GridParam({
        id_menu: v_id_menu,
        n_grid: 3,
        m_autoquery: 'N',
        keyNavigation: false,
        param: {
            ':p_n_instancia': v_n_instancia,
            ':p_n_orden': v_n_orden,
            ':p_id_obligacion': v_id_obligacion
        }
    });

    var datos_info_adicional = new GridParam({
        id_menu: v_id_menu,
        n_grid: 6,
        m_autoquery: 'N',
        keyNavigation: false,
        param: {
            ':p_n_instancia': v_n_instancia,
            ':p_n_orden': v_n_orden,
            ':p_id_obligacion': v_id_obligacion
        }
    });

    $(document).ready(function () {
        if (modo == 'CON') {
            modo_consulta();
        } else {
            $('#i_otros_cred_verif').attr('title', 'Recuerde que no se deben consignar bonificaciones');
            $('#i_otros_cred_verif').tooltip();

            $('#i_otros_deb_verif').attr('title', 'Correspondiente a Ajustes Manuales en Cta. Cte.');
            $('#i_otros_deb_verif').tooltip();


            if (v_c_tributo === '20'){
                $('#i_bonif_decl').attr('title', 'Incluida en el campo Otros Créditos');
                $('#i_bonif_decl').tooltip();
            }
        }
        inicializarGrillas();
        inicializarEventos();

    });
</script>

<?php
require_once(INTRANET . "footer.php");
?>
