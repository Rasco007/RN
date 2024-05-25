<?php
require_once(FRAMEWORK_DIR."header.php");
$p_n_id_menu = $_POST['p_n_id_menu'];

include('actualizacion_representantes_fiscales/html/principal.html');

?>
<script type='text/javascript' src='actualizacion_representantes_fiscales/js/eventos.js?no_cache=<?=date('dmyhis')?>'></script>
<script type='text/javascript' src='actualizacion_representantes_fiscales/js/funciones.js?no_cache=<?=date('dmyhis')?>'></script>
<script type='text/javascript' src='actualizacion_representantes_fiscales/js/grillas.js?no_cache=<?=date('dmyhis')?>'></script>

<script>
    var grilla_cargada = false;
    var v_lista_provincias = '<?=fun_id_lista('LISTADO DE PROVINCIAS ASESORES LEGALES')?>';
    var v_lista_deptos = '<?=fun_id_lista('LISTADO DE DEPARTAMENTOS ASESORES LEGALES')?>';
    var v_lista_localidades = '<?=fun_id_lista('LISTADO DE LOCALIDADES ASESORES LEGALES')?>';
    var v_lista_circunscripciones = '<?=fun_id_lista('LISTADO DE CIRCUNSCRIPCIONES ASESORES LEGALES')?>';
    var v_lista_denominaciones = '<?=fun_id_lista('LISTADO DENOMINACIONES ASESORES LEGALES')?>';
    var v_id_menu = '<?=$p_n_id_menu?>';
    var v_oper;

    var asesores_legales_grid = new GridParam({
        id_menu:v_id_menu,
        n_grid:0,
        n_orden:0,
        m_autoquery:'N',
        param:{}
    });

    $(document).ready(function() {
        inicializarEventos(<?=$_POST['p_n_id_menu'];?>);
        inicializarLupas();
        init_grillas(<?=$_POST['p_n_id_menu'];?>);
    });
    
</script>

<?php
require_once(FRAMEWORK_DIR."footer.php");
?>