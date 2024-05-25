<?php
require_once(EXTRANET . "header.php");


$m_autoquery = $_POST['p_m_autoquery'];
$p_id_menu = $_POST['p_n_id_menu'];

$fecha_hoy = date('d/m/Y');

//logueo transacción
$db_query = new DB_Query("BEGIN prc_log_transaccion(:p_id_tipotransacc,:p_id_transaccion);END;");
$param = array(':p_id_tipotransacc' => 1046,
    ':p_id_transaccion' => null);
$result = $db_query->do_query($param);
$db_query->db_commit();

#HTML PRINCIPAL
include('cons_inspecciones/html/principal.html');
include('cons_inspecciones/html/modal_detalle.html');
include('cons_inspecciones/html/modal_adjunto.php');

?>
    <script type='text/javascript' src='cons_inspecciones/js/grillas.js'></script>
    <script type='text/javascript' src='cons_inspecciones/js/eventos.js'></script>
    <script type='text/javascript' src='cons_inspecciones/js/funciones.js'></script>

    <script>
        //VARIABLES GLOBALES
        var v_id_menu = '<?=$p_id_menu?>';
        var v_m_autoquery = '<?=$m_autoquery?>';
        var v_id_cont = '<?=$_SESSION['id_rel_persona']?>';
        var fecha_hoy = '<?=$fecha_hoy?>';

        var datos_main_grid = new GridParam({
            id_menu: v_id_menu,
            n_grid: 0,
            m_autoquery: v_m_autoquery,
            param: {':p_id_contribuyente': v_id_cont}
        });

        var datos_detail_grid = new GridParam({
            id_menu: v_id_menu,
            n_grid: 1,
            keyNavigation: false,
            m_autoquery: 'N',
            param: {
                ':p_n_instancia': null,
                ':p_n_orden': null
            }
        });

        $(document).ready(function () {

            inicializarGrillas();
            inicializarEventos();

        });
    </script>

<?php
require_once(EXTRANET . "footer.php");
?>