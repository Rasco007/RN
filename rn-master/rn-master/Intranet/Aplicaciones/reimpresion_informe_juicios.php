<?php
require_once(FRAMEWORK_DIR."header.php");

$fecha_hoy = date('d/m/Y');
$p_n_id_menu = $_POST['p_n_id_menu'];

include('reimpresion_informe_juicios/html/principal.html');

?>
<script type='text/javascript' src='reimpresion_informe_juicios/js/eventos.js?no_cache=<?=date('dmyhis')?>'></script>
<script type='text/javascript' src='reimpresion_informe_juicios/js/funciones.js?no_cache=<?=date('dmyhis')?>'></script>

<script>
    var v_lista_boletas = '<?=fun_id_lista('LISTADO DE BOLETAS REIMPR JUICIOS')?>';
    var v_lista_denominaciones = '<?=fun_id_lista('LISTA DENOMINACIONES')?>';
    var v_lista_expedientes = '<?=fun_id_lista('LISTADO EXPEDIENTES REIMPR JUICIOS')?>';

    var fecha_hoy = '<?=$fecha_hoy?>';
    var p_cont = '%'
    var p_id_contrib;
    var p_chk_crear_pdf = 'N';
    var fecha_envio;
    var id_contribuyente;
    var f_confirmacion;
    var v_masivo = 'N';
    var v_id_menu = '<?=$p_n_id_menu?>';

    $(document).ready(function() {
        inicializarLupas();
        inicializarEventos();
    });
</script>

<?php
require_once(FRAMEWORK_DIR."footer.php");
?>