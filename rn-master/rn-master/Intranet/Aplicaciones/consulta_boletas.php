<?php
require_once(INTRANET."header.php");
$lista_denominaciones = fun_id_lista('LISTA DENOMINACIONES');
$lista_trib = fun_id_lista('LISTADO DE TRIBUTOS');
$lista_tipo = fun_id_lista('LISTA DE TIPO CONSULTA BOLETAS');
$lista_obj_hecho = fun_id_lista('LISTA DE OBJETOS SEGUN TRIBUTO CYL PAGOS ACREDITADOS');

#HTML PRINCIPAL
include('consulta_boletas/html/principal.html');
include('consulta_boletas/html/modals.html');
?>
    <style>

    </style>
    <link rel="stylesheet" href="consulta_boletas/css/estilos.css">
    <script type='text/javascript' src='consulta_boletas/js/grillas.js?no_cache=<?=date('dmyhis')?>'></script>
    <script type='text/javascript' src='consulta_boletas/js/eventos.js?no_cache=<?=date('dmyhis')?>'></script>
    <script type='text/javascript' src='consulta_boletas/js/funciones.js?no_cache=<?=date('dmyhis')?>'></script>

    <script>
        var filtros_no_nativos_ar = [];
        var filtros_arr_main = [];
        var v_n_id_menu = '<?=$_POST['p_n_id_menu']?>';
        var ajax_autocomplete;
        var v_lista_denominaciones = '<?=$lista_denominaciones?>';
        var v_lista_trib = '<?=$lista_trib?>';
        var v_lista_tipo = '<?=$lista_tipo?>';
        var v_lista_obj_hecho = '<?=$lista_obj_hecho?>';

        var datos_main_grid_boletas = new GridParam({
            id_menu:v_n_id_menu,
            n_grid:0,
            m_autoquery:'N'
        });

        var datos_detalles_grid_boletas = new GridParam({
            id_menu:v_n_id_menu,
            n_grid:1,
            m_autoquery:'N'
        });

        var datos_main_mails_grid = new GridParam({
            id_menu:v_n_id_menu,
            n_grid:2,
            m_autoquery:'N'
        });

        var datos_detalle_dbl_click_boleta_grid = new GridParam({
            id_menu:v_n_id_menu,
            n_grid:3,
            m_autoquery:'N'
        });

        var datos_main_grid_boletas_pagas = new GridParam({
            id_menu:v_n_id_menu,
            n_grid:4,
            m_autoquery:'N'
        });

        var datos_main_grid_boletas_impagas = new GridParam({
            id_menu:v_n_id_menu,
            n_grid:5,
            m_autoquery:'N'
        });

        var datos_main_grid_boletas_sellos = new GridParam({
            id_menu:v_n_id_menu,
            n_grid:0,
            m_autoquery:'N'
        });

        var datos_main_grid_boletas_tasa_externa = new GridParam({
            id_menu:v_n_id_menu,
            n_grid:7,
            m_autoquery:'N'
        });

        var datos_detalles_grid_boletas_sellos = new GridParam({
            id_menu:v_n_id_menu,
            n_grid:8,
            m_autoquery:'N'
        });

        var datos_detalle_dbl_click_boleta_sellos_grid = new GridParam({ //tambien se usa para tasa externa 'S'
            id_menu:v_n_id_menu,
            n_grid:10,
            m_autoquery:'N'
        });

        var datos_detalle_dbl_click_boleta_sellos_sin_obj_hecho_grid = new GridParam({
            id_menu:v_n_id_menu,
            n_grid:11,
            m_autoquery:'N'
        });

        $(document).ready(function() {
            inicializarGrillas();
            inicializarEventos();

            $("#mails_grid").jqGrid({
                colNames:datos_main_mails_grid.colNames(),
                colModel:datos_main_mails_grid.colModel(),
                pager: $("#mails_grid_pager"),
                sortname:"nro_envio",
                postData:datos_main_mails_grid.postData()
            });

            $("#detalle_dbl_click_boleta_grid").jqGrid({
                colNames:datos_detalle_dbl_click_boleta_grid.colNames(),
                colModel:datos_detalle_dbl_click_boleta_grid.colModel(),
                pager: $("#detalle_dbl_click_boleta_grid_pager"),
                postData:datos_detalle_dbl_click_boleta_grid.postData()
            });

            $("#detalle_dbl_click_boleta_sellos_grid").jqGrid({
                colNames:datos_detalle_dbl_click_boleta_sellos_grid.colNames(),
                colModel:datos_detalle_dbl_click_boleta_sellos_grid.colModel(),
                pager: $("#detalle_dbl_click_boleta_sellos_grid_pager"),
                postData:datos_detalle_dbl_click_boleta_sellos_grid.postData()
            });

            $("#detalle_dbl_click_boleta_sellos_sin_obj_hecho_grid").jqGrid({
                colNames:datos_detalle_dbl_click_boleta_sellos_sin_obj_hecho_grid.colNames(),
                colModel:datos_detalle_dbl_click_boleta_sellos_sin_obj_hecho_grid.colModel(),
                pager: $("#detalle_dbl_click_boleta_sellos_sin_obj_hecho_grid_pager"),
                postData:datos_detalle_dbl_click_boleta_sellos_sin_obj_hecho_grid.postData()
            });

            $('#mails_grid_modal').on('shown.bs.modal', function (e) {
                let gridParentWidth = $('#gbox_mails_grid').parent().parent().width();
                $('#mails_grid').setGridWidth(gridParentWidth);
            });

        });

    </script>

<?php
require_once(INTRANET."footer.php");
?>