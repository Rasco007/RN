<?php
require_once(FRAMEWORK_DIR."header.php");

$fecha_hoy = date('d/m/Y');
$p_n_id_menu = $_POST['p_n_id_menu'];

include('actualizacion_informacion_adicional/html/principal.html');

?>
<script type='text/javascript' src='actualizacion_informacion_adicional/js/eventos.js?no_cache=<?=date('dmyhis')?>'></script>
<script type='text/javascript' src='actualizacion_informacion_adicional/js/funciones.js?no_cache=<?=date('dmyhis')?>'></script>

<script>

    var v_lista_denominaciones = '<?=fun_id_lista('LISTA DE CONTRIBUYENTES ACTUALIZACION INFORMACION ADICIONAL')?>';
    var v_lista_tributos = '<?=fun_id_lista('LISTA DE TRIBUTOS ACTUALIZACION INFORMACION ADICIONAL')?>';
    var v_lista_objetos = '<?=fun_id_lista('LISTA DE OBJETOS HECHOS ADMINISTRACION INFORMACION ADICIONAL')?>';

    var v_id_menu = '<?=$p_n_id_menu?>';

    $(document).ready(function() { 
        inicializarLupas();
        inicializarEventos();
    });
</script>

<?php
require_once(FRAMEWORK_DIR."footer.php");
?>