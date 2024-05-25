<?php
require_once(INTRANET . "header.php");

$id_lista_marcas = fun_id_lista('LISTA MARCAS AUTOMOTOR');
$id_lista_modelos = fun_id_lista('LISTA MODELOS AUTOMOTOR');
$id_lista_descrip = fun_id_lista('LISTA DESCRIPCION AUTOMOTOR PARA CONSULTA');
$id_lista_grupo = fun_id_lista('LISTA DE GRUPOS AUTOMOTOR PARA CONSULTA');
$id_lista_monedas = fun_id_lista('LISTADO TIPOS MONEDA');
$id_lista_origen = fun_id_lista('LISTADO DE ORIGEN AUTOMOTOR');

$fecha_hoy = date('d/m/Y');
$p_modo = $_POST['p_modo'];
$p_id_menu = $_POST['p_n_id_menu'];
$user = $_SESSION['usuario'];

#HTML PRINCIPAL
include('actualizacion_cons_valuaciones/html/principal.html');
include('actualizacion_cons_valuaciones/html/modal_edit_valuacion.html');
include('actualizacion_cons_valuaciones/html/modal_detalle.html');
?>

<script type='text/javascript' src='actualizacion_cons_valuaciones/js/grillas.js?no_cache=<?=date('dmyhis')?>'></script>
<script type='text/javascript' src='actualizacion_cons_valuaciones/js/eventos.js?no_cache=<?=date('dmyhis')?>'></script>
<script type='text/javascript' src='actualizacion_cons_valuaciones/js/funciones.js?no_cache=<?=date('dmyhis')?>'></script>

<script>
    //VARIABLES GLOBALES
    var filtros_no_nativos_ar = new Array();
    filtros_no_nativos_ar['main_grid'] = new Array();
    filtros_no_nativos_ar['detail_grid'] = new Array();
    var fecha_hoy = '<?=$fecha_hoy?>';
    var v_c_usuario = '<?=$user?>';
    var v_id_menu = '<?=$p_id_menu?>';
    var p_modo = '<?=$p_modo?>';
    var ajax_autocomplete = null;
    var id_lista_marcas = '<?=$id_lista_marcas?>';
    var id_lista_modelos = '<?=$id_lista_modelos?>';
    var id_lista_descrip = '<?=$id_lista_descrip?>';
    var id_lista_grupo = '<?=$id_lista_grupo?>';
    var id_lista_monedas = '<?=$id_lista_monedas?>';
    var id_lista_origen = '<?=$id_lista_origen?>';

    var datos_main_grid = new GridParam({
        id_menu: v_id_menu,
        n_grid:0,
        m_autoquery:'N'
    });

    var datos_detalle_grid = new GridParam({
        id_menu: v_id_menu,
        n_grid:1,
        m_autoquery:'N'
    });

    $(document).ready(function() {
        inicializar_grillas();
        inicializar_eventos();
    });
</script>

<?php
require_once(INTRANET."footer.php");
?>
