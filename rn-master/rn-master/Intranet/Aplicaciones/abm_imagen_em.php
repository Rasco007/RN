<?php
    require_once(INTRANET."header.php");

    $p_id_menu = $_POST['p_n_id_menu'];
    $c_usuario = $_SESSION['usuario'];

    include('abm_imagen_em/html/principal.html');
?>

<script type="text/javascript" src="abm_imagen_em/js/grillas.js?no_cache=<?=date('dmy')?>"></script>
<script type="text/javascript" src="abm_imagen_em/js/funciones.js?no_cache=<?=date('dmy')?>"></script>
<script type="text/javascript" src="abm_imagen_em/js/eventos.js?no_cache=<?=date('dmy')?>"></script>

<script type="text/javascript">
    var v_id_menu = '<?=$p_id_menu?>';
    var c_usuario = '<?=$c_usuario?>';

    var lista_tributos = '<?=fun_id_lista('LISTADO DE TRIBUTOS')?>';
    var lista_conceptos = '<?=fun_id_lista('LISTADO DE CONCEPTOS POR TRIBUTO')?>';
    var lista_tablas_generales = '<?=fun_id_lista('TABLAS GENERALES')?>';
    var lista_provincias = '<?=fun_id_lista('LISTADO DE PROVINCIAS')?>';
    var lista_departamentos = '<?=fun_id_lista('LISTADO DE PARTIDOS')?>';
    var lista_localidades = '<?=fun_id_lista('LISTADO DE LOCALIDADES')?>';
    var lista_consorcios = '<?=fun_id_lista('CONSORCIOS')?>';
    var lista_regiones = '<?=fun_id_lista('REGIONES POR CONSORCIO')?>';
    var lista_areas = '<?=fun_id_lista('AREAS POR CONSORCIO')?>';

    

    var imagenes_grid = new GridParam({
        id_menu: v_id_menu,
        n_grid:0,
        n_orden:0,
        m_autoquery: 'S'
    });

    $(document).ready(function(){
        init_grillas();
        init_eventos();
    });

</script>

<?php
    require_once(INTRANET."footer.php");
?>