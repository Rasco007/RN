<?php
require_once(FRAMEWORK_DIR."header.php");
$p_n_id_menu = $_POST['p_n_id_menu'];
$c_medio_pago = $_POST['p_c_medio_pago'];
$d_medio_pago = $_POST['p_d_medio_pago'];
$c_producto = $_POST['p_c_producto'];
$d_producto = $_POST['p_d_producto'];

$lista_medios_debito = fun_id_lista('LISTA MEDIOS DE PAGO DEBITO');
$lista_productos = fun_id_lista('LISTADO DE PRODUCTOS PARA COBROS POR INTERFACE');
$lista_f_cartera = fun_id_lista('LISTA DE FECHA CARTERA PARA COBROS POR INTERFACE');


#HTML PRINCIPAL
include('incorporacion_cobros_por_interfaz/html/principal.html');
?>
    <script type='text/javascript' src='incorporacion_cobros_por_interfaz/js/eventos.js?no_cache=<?=date('dmyhis')?>'></script>
    <script type='text/javascript' src='incorporacion_cobros_por_interfaz/js/funciones.js?no_cache=<?=date('dmyhis')?>'></script>
    <script>
        function actualizar_input(){
            $('#ruta_archivo_recibido').val( $('#path_arch_recibido').val() );
        }

        $(document).ready(function() {
            inicializarLupas();
            inicializarEventos();
            $('#examinar_recibido').click(function(){
                $('#path_arch_recibido').click();
            });
            $('#path_arch_recibido').change(function(){
                $('#ruta_archivo_recibido').val( $('#path_arch_recibido').val() );
            });

            $("#rechazos_grid").jqGrid({
                colNames:datos_main_grid_rechazos.colNames(),
                colModel:datos_main_grid_rechazos.colModel(),
                pager: $("#rechazos_grid_pager"),
                sortname:"n_linea",
                height:300,
                postData:datos_main_grid_rechazos.postData()
            }).navGrid('#rechazos_grid_pager', {add : false,edit : false,del : false},
                {}, // edit options
                {}, //alta
                {}, //del
                {}//search
            );

            $('#rechazos_modal').on('shown.bs.modal', function (e) {
                let gridParentWidth = $('#gbox_rechazos_grid').parent().parent().width();
                $('#rechazos_grid').setGridWidth(gridParentWidth);
            });
        });
        var proceso;
        var v_id_menu = '<?=$p_n_id_menu?>';
        var v_lista_medios_debito = '<?=$lista_medios_debito?>';
        var v_lista_productos = '<?=$lista_productos?>';
        var v_lista_f_cartera = '<?=$lista_f_cartera?>';
        var datos_main_grid_rechazos = new GridParam({id_menu:<?=$_POST['p_n_id_menu']?>,
            n_grid:0,
            m_autoquery:'N'});

    </script>

<?php
require_once(FRAMEWORK_DIR."footer.php");
?>