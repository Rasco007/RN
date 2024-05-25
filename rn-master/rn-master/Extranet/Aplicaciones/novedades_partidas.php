<?php
require_once(EXTRANET . "header.php");


$m_autoquery = $_POST['p_m_autoquery'];
$p_id_menu = $_POST['p_n_id_menu'];

$fecha_hoy = date('d/m/Y');

#HTML PRINCIPAL
include('novedades_partidas/html/principal.html');
?>
    
<script type='text/javascript' src='novedades_partidas/js/grillas.js'></script>
<script type='text/javascript' src='novedades_partidas/js/eventos.js'></script>

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
        param:{
            ':p_f_desde':null,
            ':p_f_hasta':null}
    });

    $(document).ready(function() {

        inicializarGrillas();
        inicializarEventos();

    });
</script>

<?php
require_once(EXTRANET."footer.php");
?>