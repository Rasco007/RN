<?php
require_once(INTRANET."header.php");

//print_r($_POST); exit();

$m_autoquery = $_POST['p_m_autoquery'];
$p_id_menu = $_POST['p_n_id_menu'];

if (isset($_POST['p_modo'])){
    //MODO CONSULTA 'C'
    $modo = $_POST['p_modo'];

}else{
    //MODO CARGA 'X'
    $modo = 'X';
}

$query = "select count(1) cantidad from user_role_privs where granted_role = 'ROLE_TOTAL' AND USERNAME = user";
$db_query ->setQuery($query);
$param = array();
$row_query = $db_query->do_query($param);
if ($row_query[0]['CANTIDAD'] > 0){
    $role_total = 'S';
}else{
    $role_total = 'N';
}



$lista_tdoc = fun_id_lista('LISTADO TIPOS DE DOC CTA CTE');
$lista_timp = fun_id_lista('BONIF_EXEN TIPOS IMP X CONT');
$lista_trib = fun_id_lista('LISTADO DE TRIBUTOS POR TIPO IMP');
$lista_obj = fun_id_lista('LISTA DE OBJETOS X CONT SIN F_CESE/F_HASTA');
#HTML PRINCIPAL
include('abm_bonificaciones/html/principal.html');
include('abm_bonificaciones/html/modals.html');
?>
    <style>
        .formError {
            z-index: 15000;
        }
    </style>
    <script type='text/javascript' src='abm_bonificaciones/js/grillas.js'></script>
    <script type='text/javascript' src='abm_bonificaciones/js/eventos.js'></script>
    <script type='text/javascript' src='abm_bonificaciones/js/funciones.js'></script>

    <script>
        //VARIABLES GLOBALES
        var v_id_menu = '<?=$p_id_menu?>';
        var v_m_autoquery = '<?=$m_autoquery?>';
        var modo = '<?=$modo?>';
        var role_total = '<?=$role_total?>';
        var v_lista_tdoc = '<?=$lista_tdoc?>';
        var v_lista_timp = '<?=$lista_timp?>';
        var v_lista_trib = '<?=$lista_trib?>';
        var v_lista_obj = '<?=$lista_obj?>';
        var ajax_autocomplete;


        var id_contrib;
        var objeto_hecho;
        var c_tipo_imponible;
        var c_tributo;
        var f_vig_desde_obj;


        var datos_main_grid = new GridParam({
            id_menu: v_id_menu,
            n_grid:0,
            m_autoquery:v_m_autoquery,
            param:{ ':p_id_contrib':'<?=$_POST['p_id_contrib']?>',
                    ':p_c_timp':'<?=$_POST['p_c_timp']?>',
                    ':p_c_trib':'<?=$_POST['p_c_trib']?>',
                    ':p_objeto':'<?=$_POST['p_objeto']?>'}
        });

        var datos_bonificaciones_grid = new GridParam({
            id_menu: v_id_menu,
            n_grid:1,
            m_autoquery:'N',
            param:{ ':p_id_contrib':null,
                    ':p_c_timp':null,
                    ':p_c_trib':null,
                    ':p_objeto':null}
        });


        $(document).ready(function() {
            inicializarGrillas();
            inicializarEventos();
        });

    </script>

<?php
require_once(INTRANET."footer.php");
?>