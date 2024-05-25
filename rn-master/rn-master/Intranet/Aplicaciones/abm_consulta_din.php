<?php
require_once(INTRANET."header.php");

$p_n_id_menu = $_POST['p_n_id_menu'];
$m_autoquery = $_POST['p_m_autoquery'];

#HTML PRINCIPAL
include('abm_consulta_din/html/principal.html');
?>
    <style>

    </style>
    <script type='text/javascript' src='abm_consulta_din/js/grillas.js?no_cache=<?=date('dmyhis')?>'></script>
    <script type='text/javascript' src='abm_consulta_din/js/eventos.js?no_cache=<?=date('dmyhis')?>'></script>
    <script type='text/javascript' src='abm_consulta_din/js/funciones.js?no_cache=<?=date('dmyhis')?>'></script>
    <script>
        var v_id_menu = '<?=$p_n_id_menu?>';
        var v_m_autoquery = '<?=$m_autoquery?>';
        var v_lista_procedimientos = '<?=fun_id_lista('LISTA DE PRC CONSULTA DINAM')?>';
        var v_lista_listas = '<?=fun_id_lista('LISTADO DE LISTAS')?>';
        var v_lista_datos_resu = '<?=fun_id_lista('LISTADO DE TIPO DE DATOS CONS_DIN_RESU')?>';
        var v_lista_datos_param = '<?=fun_id_lista('LISTADO DE TIPO DE DATOS CONS_DIN_PARAM')?>';
        var v_id_cons_dinamica;
        var consultas_grid = new GridParam({
            id_menu: v_id_menu,
            n_grid: 0,
            n_orden: 0,
            m_autoquery: v_m_autoquery
        });

        var parametros_grid = new GridParam({
            id_menu: v_id_menu,
            n_grid: 1,
            n_orden: 1,
            m_autoquery: 'N'
        });

        var resultados_grid = new GridParam({
            id_menu: v_id_menu,
            n_grid: 2,
            n_orden: 2,
            m_autoquery: 'N'
        });
        $(document).ready(function() {
            inicializarGrillas();
            inicializarEventos();
        });

    </script>

<?php
require_once(INTRANET."footer.php");
?>