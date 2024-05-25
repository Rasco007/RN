<?php
require_once(FRAMEWORK_DIR."header.php");

$fecha_hoy = date('d/m/Y');
$p_id_menu = $_POST['p_n_id_menu'];


include('ingreso_ddjj_sirpei/html/principal.html');

?>
<script type='text/javascript' src='ingreso_ddjj_sirpei/js/eventos.js?no_cache=<?=date('dmyhis')?>'></script>
<script type='text/javascript' src='ingreso_ddjj_sirpei/js/funciones.js?no_cache=<?=date('dmyhis')?>'></script>
<script type='text/javascript' src='ingreso_ddjj_sirpei/js/grillas.js?no_cache=<?=date('dmyhis')?>'></script>
<script type="text/javascript" src="<?=JS_FRAMEWORK_PROY?>barra_progreso.js"></script>

<script>
    var v_id_menu = '<?=$p_id_menu?>';
    var v_f_hoy = '<?=$fecha_hoy?>';
    var v_cod_agente = 'COD_AP';

    var fechas_grid = new GridParam({
        id_menu:v_id_menu,
        n_grid:0,
        n_orden:0,
        m_autoquery:'N',
        param:{}
    });

    $(document).ready(function() {
        inicializarEventos();
        inicializarGrillas();
        buscar_agente('N');
    });
</script>

<?php
require_once(FRAMEWORK_DIR."footer.php");
?>