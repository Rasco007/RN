<?php
require_once(FRAMEWORK_DIR."header.php");

//PONER PARAMETROS DE MI FORM

$fecha_hoy = date('d/m/Y');
$p_id_menu = $_POST['p_n_id_menu'];
$p_modo = $_POST['p_modo'];

$lista_d_denominacion = fun_id_lista('LISTADO DE NOMBRES DE CONTRIBUYENTES');
$lista_tipo_documento = fun_id_lista('LISTADO DE TIPOS DE DOCUMENTO');
$lista_c_tributo = fun_id_lista('LISTADO DE TRIBUTO IB');
$lista_tipos_imponibles = fun_id_lista('LISTADO DE TIPOS IMPONIBLES');

#HTML PRINCIPAL
include('liquidacion_puntual_reg_simplificado/html/principal.html');

?>

    <script type='text/javascript' src='liquidacion_puntual_reg_simplificado/js/eventos.js?no_cache=<?=date('dmyhis')?>'></script>
    
    <script type="text/javascript" >
        var fecha_hoy = '<?=$fecha_hoy?>';
        var p_modo = '<?=$p_modo?>';
        let v_lista_d_denominacion = '<?=$lista_d_denominacion?>';
        let v_lista_tipo_documento = '<?=$lista_tipo_documento?>';
        let v_lista_c_tributo = '<?=$lista_c_tributo?>';
        let v_lista_tipos_imponibles = '<?=$lista_tipos_imponibles?>';
        var v_id_menu = '<?=$p_id_menu?>';


        $(document).ready(function() {
            initEventos();
            inicializarLupas();          
        });
       
    </script>

<?php
require_once(FRAMEWORK_DIR."footer.php");
?>