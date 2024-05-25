<?php
require_once(FRAMEWORK_DIR."header.php");

//PONER PARAMETROS DE MI FORM

$fecha_hoy = date('d/m/Y');
$p_id_menu = $_POST['p_n_id_menu'];
$p_modo = $_POST['p_modo'];

$lista_d_denominacion = fun_id_lista('LISTADO DE NOMBRES DE CONTRIBUYENTES');
$lista_tipo_documento = fun_id_lista('LISTADO DE TIPOS DE DOCUMENTO');
$lista_c_tributo = fun_id_lista('LISTADO DE TRIBUTOS DE INGRESOS BRUTOS CONVENIO');
$lista_conceptos_ddjj = fun_id_lista('CONCEPTOS DDJJ');
$lista_obj = fun_id_lista('LISTA DE OBJETOS HECHOS Y CONTRIB C/F DE OBJ');

#HTML PRINCIPAL
include('modif_e_ingreso_de_DDJJ_procesadas_con_error/html/principal.html');

?>

    <script type='text/javascript' src='modif_e_ingreso_de_DDJJ_procesadas_con_error/js/eventos.js?no_cache=<?=date('dmyhis')?>'></script>
    <script type='text/javascript' src='modif_e_ingreso_de_DDJJ_procesadas_con_error/js/grillas.js?no_cache=<?=date('dmyhis')?>'></script>
    
    <script type="text/javascript" >
        var fecha_hoy = '<?=$fecha_hoy?>';
        var p_modo = '<?=$p_modo?>';
        let v_lista_d_denominacion = '<?=$lista_d_denominacion?>';
        let v_lista_tipo_documento = '<?=$lista_tipo_documento?>';
        let v_lista_c_tributo = '<?=$lista_c_tributo?>';
        let v_lista_conceptos_ddjj = '<?=$lista_conceptos_ddjj?>';
        var v_lista_obj = '<?=$lista_obj?>';
        var v_id_menu = '<?=$p_id_menu?>';
        var filtros_no_nativos_ar = new Array();
        var filtros_arr_main = [];
        var proceso;

        filtros_no_nativos_ar['main_grid'] = new Array();


        var datos_main_grid = new GridParam({
                id_menu:v_id_menu,
                n_grid:0,
                n_orden: 0,
                m_autoquery:'N'
            });

        var datos_detalles_grid = new GridParam({
            id_menu:v_id_menu,
            n_grid:1,
            n_orden: 1,
            m_autoquery:'N'
        });

        $(document).ready(function() {
            inicializarGrillas();
            initEventos();
            inicializarLupas();
        });

    </script>

<?php
require_once(FRAMEWORK_DIR."footer.php");
?>