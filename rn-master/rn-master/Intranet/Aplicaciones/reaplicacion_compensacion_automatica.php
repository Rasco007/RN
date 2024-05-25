<?php
require_once(FRAMEWORK_DIR."header.php");

//PONER PARAMETROS DE MI FORM

$fecha_hoy = date('d/m/Y');
$p_id_menu = $_POST['p_n_id_menu'];
$p_modo = $_POST['p_modo'];

$lista_d_denominacion = fun_id_lista('LISTA DE CONTRIB CCTEA051');
$lista_tipo_documento = fun_id_lista('LISTADO DE TIPOS DE DOCUMENTO');
$lista_c_tributo = fun_id_lista('LISTADO DE TRIBUTOS DE INGRESOS DE BRUTOS');
$lista_tipos_imponibles = fun_id_lista('LISTADO DE TIPOS IMPONIBLES CCTEA051');

#HTML PRINCIPAL
include('reaplicacion_compensacion_automatica/html/principal.html');

?>
    <script type='text/javascript' src='reaplicacion_compensacion_automatica/js/eventos.js?no_cache=<?=date('dmyhis')?>'></script>
    <script type="text/javascript" >
        var fecha_hoy = '<?=$fecha_hoy?>';
        var p_modo = '<?=$p_modo?>';
        let v_lista_d_denominacion = '<?=$lista_d_denominacion?>';
        let v_lista_tipo_documento = '<?=$lista_tipo_documento?>';
        let v_lista_c_tributo = '<?=$lista_c_tributo?>';
        let v_lista_tipos_imponibles = '<?=$lista_tipos_imponibles?>';
        var v_id_menu = '<?=$p_id_menu?>';
        var proceso;

        $(document).ready(function() {
            initEventos();
            inicializarLupas();
        });

    </script>

<?php
require_once(FRAMEWORK_DIR."footer.php");
?>