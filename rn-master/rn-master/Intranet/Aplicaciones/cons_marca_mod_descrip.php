<?php
require_once(INTRANET . "header.php");

$id_lista_marcas = fun_id_lista('LISTA MARCAS AUTOMOTOR PARA CONSULTA');
$id_lista_modelos = fun_id_lista('LISTA DE MODELOS AUTOMOTOR PARA CONSULTA');
$id_lista_descripcion = fun_id_lista('LISTA DESCRIPCION AUTOMOTOR PARA CONSULTA');
$id_lista_grupo = fun_id_lista('LISTA DE GRUPOS AUTOMOTOR PARA CONSULTA');

$fecha_hoy = date('d/m/Y');
$m_autoquery = $_POST['p_m_autoquery'];
$p_id_menu = $_POST['p_n_id_menu'];
$user = $_SESSION['usuario'];

#HTML PRINCIPAL
include('cons_marca_mod_descrip/html/principal.html');
?>

<script type='text/javascript' src='cons_marca_mod_descrip/js/eventos.js?no_cache=<?=date('dmyhis')?>'></script>
<script type='text/javascript' src='cons_marca_mod_descrip/js/grillas.js?no_cache=<?=date('dmyhis')?>'></script>

<script>
    //VARIABLES GLOBALES
    var filtros_no_nativos_ar = new Array();
    filtros_no_nativos_ar['main_grid'] = new Array();
    var fecha_hoy = '<?=$fecha_hoy?>';
    var v_c_usuario = '<?=$user?>';
    var v_id_menu = '<?=$p_id_menu?>';
    var v_m_autoquery = '<?=$m_autoquery?>';
    var ajax_autocomplete = null;
    var id_lista_marcas = '<?=$id_lista_marcas?>';
    var id_lista_modelos = '<?=$id_lista_modelos?>';
    var id_lista_descripcion = '<?=$id_lista_descripcion?>';
    var id_lista_grupo = '<?=$id_lista_grupo?>';

    var datos_main_grid = new GridParam({
        id_menu:v_id_menu,
        n_grid:0,
        m_autoquery:'N',
        param: {}
    });

    $(document).ready(function() {
        inicializar_grillas();
        inicializar_eventos();
    });
</script>

<?php
require_once(INTRANET."footer.php");
?>
