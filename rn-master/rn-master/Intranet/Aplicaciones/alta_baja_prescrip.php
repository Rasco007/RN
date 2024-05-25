<?php
require_once(INTRANET."header.php");

$m_autoquery = $_POST['p_m_autoquery'];
$p_id_menu = $_POST['p_n_id_menu'];

$query = "select userenv('sessionid') idsesion from dual";

$db_query ->setQuery($query);
$param = array();
$row_query = $db_query->do_query($param);
$id_sesion = $row_query[0]['IDSESION'];

$lista_timp = fun_id_lista('LISTADO DE TRIBUTOS POR CONTRIBUYENTE Y OBJETOS');
$lista_trib = fun_id_lista('LISTADO DE SUBTRIBUTOS POR CONTRIBUYENTE Y OBJETOS');
$lista_obj = fun_id_lista('LISTA OBJETOS HECHOS CON CONTRIBUYENTE');

$fecha_hoy = date('d/m/Y');
include('alta_baja_prescrip/html/principal.html');
?>
    <style>
        #ui-datepicker-div {
            z-index: 11000 !important;
            position: absolute !important;
        }
    </style>

    <script type='text/javascript' src='alta_baja_prescrip/js/grillas.js'></script>
    <script type='text/javascript' src='alta_baja_prescrip/js/eventos.js'></script>
    <script type='text/javascript' src='alta_baja_prescrip/js/funciones.js'></script>

    <script>
        //VARIABLES GLOBALES
        var v_id_menu = '<?=$p_id_menu?>';
        var v_m_autoquery = '<?=$m_autoquery?>';
        var v_id_sesion = '<?=$id_sesion?>';
        var ajax_autocomplete = null;
        var v_lista_timp = '<?=$lista_timp?>';
        var v_lista_trib = '<?=$lista_trib?>';
        var v_lista_obj = '<?=$lista_obj?>';
        var fecha_hoy = '<?=$fecha_hoy?>';

        var datos_main_grid = new GridParam({
            id_menu: v_id_menu,
            n_grid:0,
            m_autoquery:v_m_autoquery,
            param:{':p_id_sesion':null}
        });

        $(document).ready(function() {

            inicializarGrillas();
            inicializarEventos();

        });
    </script>


<?php
require_once(INTRANET."footer.php");
?>