<?php
require_once(INTRANET . "header.php");

$m_autoquery = $_POST['p_m_autoquery'];
$p_id_menu = $_POST['p_n_id_menu'];

$fecha_hoy = date('d/m/Y');

#HTML PRINCIPAL
include('carga_inspecciones/html/principal.html');
include('carga_inspecciones/html/modal_abm_alcance.php');
?>

<script type='text/javascript' src='carga_inspecciones/js/grillas.js'></script>
<script type='text/javascript' src='carga_inspecciones/js/eventos.js'></script>
<script type='text/javascript' src='carga_inspecciones/js/funciones.js'></script>

<script>
    //VARIABLES GLOBALES
    var v_id_menu = '<?=$p_id_menu?>';
    var v_m_autoquery = '<?=$m_autoquery?>';
    var ajax_autocomplete = null;
    var fecha_hoy = '<?=$fecha_hoy?>';

    var datos_main_grid = new GridParam({
        id_menu: v_id_menu,
        n_grid:0,
        m_autoquery:v_m_autoquery,
        param:{':p_n_expediente':null,
            ':p_n_anio':null,
            ':p_id_contribuyente':null}
    });

    var datos_detail_grid = new GridParam({
        id_menu: v_id_menu,
        n_grid:1,
        m_autoquery:'N',
        param:{':p_id_inspeccion':null}
    });

    $(document).ready(function() {

        inicializarGrillas();
        inicializarEventos();

    });
</script>

<?php
require_once(INTRANET."footer.php");
?>
