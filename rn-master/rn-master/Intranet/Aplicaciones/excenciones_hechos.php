<?php
//print_r($_POST);exit();
require_once(INTRANET."header.php");

$m_autoquery = $_POST['p_m_autoquery'];
$p_id_menu = $_POST['p_n_id_menu'];

if (isset($_POST['p_modo'])){
    //MODO CONSULTA 'C'
    $modo = $_POST['p_modo'];
    if (isset($_POST['p_id_contrib'])) {
        $query = "select fun_formato_cuit (c.n_cuit) as cuit, 
            c.d_denominacion as denominacion,
            c.c_tipo_documento,
            (select 
                d_dato 
            from 
                tablas_generales tg
            where 
                tg.n_tabla = c.n_tabla_tipo_doc
            and tg.c_dato = c.c_tipo_documento) as d_tipo_documento,
            c.n_documento
            from contribuyentes c 
            where c.id_contribuyente = :p_id_contribuyente";
        $db_query ->setQuery($query);
        $param = array(':p_id_contribuyente'=>$_POST['p_id_contrib']);
        $row_query = $db_query->do_query($param);
        $c_cuit = $row_query[0]['CUIT'];
        $c_deno = $row_query[0]['DENOMINACION'];
        $c_tdocu = $row_query[0]['C_TIPO_DOCUMENTO'];
        $c_ddocu = $row_query[0]['D_TIPO_DOCUMENTO'];
        $c_ndocu = $row_query[0]['N_DOCUMENTO'];
    }
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
$lista_exen_mot = fun_id_lista('LISTA MOTIVOS EXENCION ACTUALIZABLES');
$lista_exen_deleg = fun_id_lista('LISTADO DE DELEGACIONES');
#HTML PRINCIPAL
include('excenciones_hechos/html/principal.html');
include('excenciones_hechos/html/modals.html');
?>
    <style>
        .formError {
            z-index: 15000;
        }
    </style>
    <script type='text/javascript' src='excenciones_hechos/js/grillas.js'></script>
    <script type='text/javascript' src='excenciones_hechos/js/eventos.js'></script>
    <script type='text/javascript' src='excenciones_hechos/js/funciones.js'></script>

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
        var v_lista_exen_mot = '<?=$lista_exen_mot?>';
        var v_lista_exen_deleg = '<?=$lista_exen_deleg?>';
        var ajax_autocomplete;


        var id_contrib;
        var objeto_hecho;
        var c_tipo_imponible;
        var c_tributo;
        var f_vig_desde_obj;
        var f_vig_hasta_obj;
        var f_cese_prov_obj;

        var datos_main_grid = new GridParam({
            id_menu: v_id_menu,
            n_grid:0,
            m_autoquery:v_m_autoquery,
            param:{':p_id_contrib':'<?=$_POST['p_id_contrib']?>',
                ':p_c_timp':'<?=$_POST['p_c_timp']?>',
                ':p_c_trib':'<?=$_POST['p_c_trib']?>',
                ':p_objeto':'<?=$_POST['p_objeto']?>'}
        });

        var datos_exenciones_grid = new GridParam({
            id_menu: v_id_menu,
            n_grid:1,
            m_autoquery:'N',
            param:{':p_id_contrib':null,
                ':p_c_timp':null,
                ':p_c_trib':null,
                ':p_objeto':null,
                ':p_modo':null,
                ':p_f_vig_desde': null,
                ':p_f_vig_hasta': null}
        });

        $(document).ready(function() {
            inicializarGrillas();
            inicializarEventos();
            /*MODO CONSULTA AUTOMATICO*/
            if (modo == 'C') {
                $('#n_cuit').addClass('validate[required]');
                $('#c_tipo_imponible,#c_tributo').removeClass('validate[required]');
                if ($('#id_contribuyente').val()) {
                    $('#c_tipo_imponible,#c_tributo').blur();
                    $('#btn_buscar').click();
                }
            }else{
                $('#n_cuit').removeClass('validate[required]');
                $('#c_tipo_imponible,#c_tributo,#d_objeto_hecho').addClass('validate[required]');
            }
        });
    </script>

<?php
require_once(INTRANET."footer.php");
?>