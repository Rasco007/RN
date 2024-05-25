<?php
require_once(FRAMEWORK_DIR."header.php");
$p_n_id_menu = $_POST['p_n_id_menu'];
$c_medio_pago = $_POST['p_forma_pago'];
$d_medio_pago = $_POST['p_d_medio_pago'];
$c_producto = $_POST['p_producto'];
$d_producto = $_POST['p_d_producto'];

$p_tributo = $_POST['p_tributo'];
$p_anio   = $_POST['p_anio'];
$p_cuota   = $_POST['p_cuota'];
$p_concepto   = $_POST['p_concepto'];
$p_id_workflow_log = $_POST['p_id_workflow_log'];
$p_c_tarea = $_POST['p_c_tarea'];

$lista_medios_debito = fun_id_lista('LISTA MEDIOS DE PAGO DEBITO');
$lista_productos = fun_id_lista('LISTADO DE PRODUCTOS PARA COBROS POR INTERFACE');
$lista_f_cartera = fun_id_lista('LISTA DE FECHA CARTERA PARA COBROS POR INTERFACE');


#HTML PRINCIPAL
include('generacion_de_interfaz/html/principal.html');
?>
    <script type='text/javascript' src='generacion_de_interfaz/js/eventos.js?no_cache=<?=date('dmyhis')?>'></script>
    <script type='text/javascript' src='generacion_de_interfaz/js/funciones.js?no_cache=<?=date('dmyhis')?>'></script>
    <script type='text/javascript' src='workflow_general/js/funciones.js?no_cache=<?=date('dmyhis')?>'></script>
    <script type="text/javascript" src="<?=JS_FRAMEWORK_PROY?>barra_progreso.js"></script>

    <script>

        $(document).ready(function() {
            inicializarLupas();
            inicializarEventos();
            $('#ruta_archivo, #examinar_recibido').click(function(){
                $('#path_arch_recibido').click();
            });
            $('#path_arch_recibido').change(function(){
                $('#ruta_archivo').val( $('#path_arch_recibido').val() );
            });
        });
        var v_id_menu = '<?=$p_n_id_menu?>';
        var v_lista_medios_debito = '<?=$lista_medios_debito?>';
        var v_lista_productos = '<?=$lista_productos?>';
        var v_lista_f_cartera = '<?=$lista_f_cartera?>';

        var v_c_producto = '<?=$c_producto?>';
        var v_c_medio_pago = '<?=$c_medio_pago?>';
        var v_anio = '<?=$p_anio?>';
        var v_cuota = '<?=$p_cuota?>';
        var v_concepto = '<?=$p_concepto?>';
        var v_id_workflow_log = '<?=$p_id_workflow_log ?>';
        var v_c_tarea = '<?=$p_c_tarea ?>';
        var v_tributo = '<?=$p_tributo?>';
        let valorRuta;

    </script>

<?php
require_once(FRAMEWORK_DIR."footer.php");
?>