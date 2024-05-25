<?php
require_once(INTRANET . "header.php");

$m_autoquery = $_POST['p_m_autoquery'];
$p_id_menu = $_POST['p_n_id_menu'];

require_once('consulta_telepeaje/html/principal.html');

$param = null;

$sql = "select siguiente_dia_habil(trunc(sysdate)) fecha from dual";

$db_query = new DB_Query($sql);
$results = $db_query->do_query($param);
$fecha_hoy = $results[0]['FECHA'];

$lista_dominios = fun_id_lista('LISTADO DE DOMINIOS POR CONTRIBUYENTE');
$lista_conceptos = fun_id_lista('LISTADO DE CONCEPTOS POR TRIBUTO');
include('consulta_telepeaje/html/modal_detalles.html');
include('consulta_telepeaje/html/modal_foto.html');
?>
<style>
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
    var v_id_menu = '<?=$p_id_menu?>';
    var v_m_autoquery = '<?=$m_autoquery?>';
    var disabledDays = <?php echo getFeriados(date("Y")) ?>;
    var fecha_hoy = '<?=$fecha_hoy?>';
    var v_lista_dominios = '<?=$lista_dominios?>';
    var v_lista_conceptos = '<?=$lista_conceptos?>';
    var ajax_autocomplete = null;

    var datos_main_grid = new GridParam({
        id_menu: v_id_menu,
        n_grid: 0,
        m_autoquery: v_m_autoquery,
        param:{':p_f_actualizacion':fecha_hoy,
            ':p_deuda':null,
            ':p_d_dominio':null,
            ':p_id_contribuyente':null}
    });

    var datos_detalles_grid = new GridParam({
        id_menu: v_id_menu,
        n_grid:1,
        m_autoquery:v_m_autoquery,
        param:{':p_id_obligacion':null}
    })


    $(document).ready(function() {
        inicializarGrillas();
        inicializarEventos();
    });


</script>
<script type='text/javascript' src='consulta_telepeaje/js/grillas.js'></script>
<script type='text/javascript' src='consulta_telepeaje/js/eventos.js'></script>
<script type='text/javascript' src='consulta_telepeaje/js/funciones.js'></script>

<?php
require_once(INTRANET."footer.php");
?>
