<?php
require_once(EXTRANET."header.php");

$m_autoquery = $_POST['p_m_autoquery'];
$p_id_menu = $_POST['p_n_id_menu'];

$desactivar = 'N';
if (isset($_SESSION['id_rel_persona'])){
    $query = "select  fun_formato_cuit (n_cuit) as n_cuit, 
            d_denominacion,
            c_tipo_documento,
            (SELECT d_dato from siat.tablas_generales tg 
                where tg.n_tabla = c.n_tabla_tipo_doc
                AND tg.c_dato = c.c_tipo_documento) as d_tipo_documento,
            n_documento
            from contribuyentes c
            where id_contribuyente = :id_contribuyente";

    $db_query ->setQuery($query);
    $param = array(':id_contribuyente' => $_SESSION['id_rel_persona']);
    $row_query = $db_query->do_query($param);
    $d_denominacion = $row_query[0]['D_DENOMINACION'];
    $n_cuit = $row_query[0]['N_CUIT'];
    $c_tipo_doc = $row_query[0]['C_TIPO_DOCUMENTO'];
    $d_tipo_doc = $row_query[0]['D_TIPO_DOCUMENTO'];
    $n_doc = $row_query[0]['N_DOCUMENTO'];
    $desactivar = 'S';
}

$db_query = new DB_query("SELECT OBTENER_CONSTANTE('VIGENCIA_NAES') vigencia FROM DUAL");
$row = $db_query->do_query();

$vig_naes = $row[0]['VIGENCIA'];

$lista_tdoc = fun_id_lista('LISTADO TIPOS DE DOC CTA CTE');
$lista_timp = fun_id_lista('LISTADO DE TIPOS IMPONIBLES IBD-IBCM');
$lista_trib = fun_id_lista('LISTADO DE TRIBUTOS POR TIPO IMP');
$lista_obj = fun_id_lista('LISTA OBJETOS HECHOS CON CONTRIB CON F_CESE_PROV');
$lista_act = fun_id_lista('LISTA ACTIVIDADES CON UNIDAD POR NOMENCLADOR');
$lista_uni = fun_id_lista('LISTA UNIDADES POR ACTIVIDAD');
$lista_com_loc = fun_id_lista('LISTADO LOCALIDADES RIO NEGRO');
$lista_actxcont = fun_id_lista('LISTA ACTIVIDADES CON UNIDAD POR CONTRIBUYENTE');
$lista_art = fun_id_lista('LISTA DE ARTICULOS CM');
$lista_actcm = fun_id_lista('LISTA DE ACTIVIDADES CM POR NOMENCLADOR');
$lista_jur = fun_id_lista('LISTA DE JURISDICCIONES');
#HTML PRINCIPAL
include('abm_act_tit_com/html/principal.html');
include('abm_act_tit_com/html/modals.html');
?>
    <style>
        .formError {
            z-index: 15000;
        }
    </style>
    <script type='text/javascript' src='abm_act_tit_com/js/grillas.js'></script>
    <script type='text/javascript' src='abm_act_tit_com/js/eventos.js'></script>
    <script type='text/javascript' src='abm_act_tit_com/js/funciones.js'></script>

    <script>
        //VARIABLES GLOBALES
        var desactivar = '<?=$desactivar?>';
        var v_id_menu = '<?=$p_id_menu?>';
        var v_m_autoquery = '<?=$m_autoquery?>';
        var v_lista_tdoc = '<?=$lista_tdoc?>';
        var v_lista_timp = '<?=$lista_timp?>';
        var v_lista_trib = '<?=$lista_trib?>';
        var v_lista_obj = '<?=$lista_obj?>';
        var v_lista_act = '<?=$lista_act?>';
        var v_lista_uni = '<?=$lista_uni?>';
        var v_lista_com_loc = '<?=$lista_com_loc?>';
        var v_lista_actxcont = '<?=$lista_actxcont?>';
        var v_lista_art = '<?=$lista_art?>';
        var v_lista_actcm = '<?=$lista_actcm?>';
        var v_lista_jur = '<?=$lista_jur?>';
        var ajax_autocomplete;


        var vig_naes = '<?=$vig_naes?>';
        var id_contrib;
        var objeto_hecho;
        var c_tipo_imponible;
        var c_tributo;
        var f_vig_desde_obj;

        var datos_main_grid = new GridParam({
            id_menu: v_id_menu,
            n_grid:0,
            m_autoquery:v_m_autoquery,
            param:{'p_id_contrib':null,
                'p_c_timp':null,
                'p_c_trib':null,
                'p_objeto':null}
        });

        var datos_actibd_grid = new GridParam({
            id_menu: v_id_menu,
            n_grid:1,
            m_autoquery:'N',
            param:{'p_id_contrib':null,
                'p_c_timp':null,
                'p_c_trib':null,
                'p_objeto':null}
        });

        var datos_com_grid = new GridParam({
            id_menu: v_id_menu,
            n_grid:2,
            m_autoquery:'N',
            param:{'p_id_contrib':null,
                'p_c_timp':null,
                'p_c_trib':null,
                'p_objeto':null}
        });

        var datos_actcm_grid = new GridParam({
            id_menu: v_id_menu,
            n_grid:3,
            m_autoquery:'N',
            param:{'p_id_contrib':null,
                'p_c_timp':null,
                'p_c_trib':null,
                'p_objeto':null}
        });

        var datos_jur_grid = new GridParam({
            id_menu: v_id_menu,
            n_grid:4,
            m_autoquery:'N',
            param:{'p_id_contrib':null,
                'p_c_timp':null,
                'p_c_trib':null,
                'p_objeto':null}
        });

        var datos_uni_grid = new GridParam({
            id_menu: v_id_menu,
            n_grid:5,
            m_autoquery:'N',
            param:{'p_id_contrib':null,
                'p_c_timp':null,
                'p_c_trib':null,
                'p_objeto':null}
        });

        $(document).ready(function() {
            useron();
            inicializarGrillas();
            inicializarEventos();

        });
    </script>

<?php
require_once(EXTRANET."footer.php");
?>