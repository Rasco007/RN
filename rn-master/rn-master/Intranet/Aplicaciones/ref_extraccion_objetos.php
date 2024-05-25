<?php
require_once(INTRANET . "header.php");

$id_lista_denominaciones = fun_id_lista('LISTA DENOMINACIONES');
$id_lista_planes = fun_id_lista('LISTA DE PLANES DE PAGO POR CONTRIBUYENTES');
$id_lista_tipos_planes = fun_id_lista('LISTADO TIPOS DE PLANES DE PAGO');
$id_lista_tipo_imponible = fun_id_lista('LISTA DE TIPO IMPONIBLE PARA OBJETOS');
$id_lista_objeto_hecho = fun_id_lista('LISTA DE OBJETO HECHO POR CONTRIBUYENTE');
$id_lista_tipo_documento = fun_id_lista('LISTADO DE TIPOS DE DOCUMENTO');
$id_lista_delegacion = fun_id_lista('LISTADO DE DELEGACIONES');

$fecha_hoy = date('d/m/Y');
$m_autoquery = $_POST['p_m_autoquery'];
$p_id_menu = $_POST['p_n_id_menu'];
$user = $_SESSION['usuario'];

#HTML PRINCIPAL
include('ref_extraccion_objetos/html/principal.html');
include('ref_extraccion_objetos/html/modal_chequera.html');
include('ref_extraccion_objetos/html/modal_reformular.html');
?>

<link rel="stylesheet" type="text/css" href="ref_extraccion_objetos/css/estilos.css">
<script type='text/javascript' src='ref_extraccion_objetos/js/eventos.js?no_cache=<?=date('dmyhis')?>'></script>
<script type='text/javascript' src='ref_extraccion_objetos/js/grillas.js?no_cache=<?=date('dmyhis')?>'></script>
<script type='text/javascript' src='ref_extraccion_objetos/js/funciones.js?no_cache=<?=date('dmyhis')?>'></script>
<script>
    //VARIABLES GLOBALES
    var filtros_no_nativos_ar = [];
    var filtros_arr_main = [];
    var fecha_hoy = '<?=$fecha_hoy?>';
    var v_c_usuario = '<?=$user?>';
    var v_id_menu = '<?=$p_id_menu?>';
    var v_m_autoquery = '<?=$m_autoquery?>';
    var ajax_autocomplete = null;
    var id_lista_denominaciones = '<?=$id_lista_denominaciones?>';
    var id_lista_planes = '<?=$id_lista_planes?>';
    var id_lista_tipos_planes = '<?=$id_lista_tipos_planes?>';
    var id_lista_tipo_imponible = '<?=$id_lista_tipo_imponible?>';
    var id_lista_objeto_hecho = '<?=$id_lista_objeto_hecho?>';
    var id_lista_tipo_documento = '<?=$id_lista_tipo_documento?>';
    var id_lista_delegacion = '<?=$id_lista_delegacion?>';
    var p_id_sesion_refor;

    filtros_no_nativos_ar['main_grid'] = [];

    var datos_main_grid = new GridParam({
        id_menu:v_id_menu,
        n_grid:0,
        m_autoquery:'N',
        param: {}
    });

    var datos_detalle_grid = new GridParam({
        id_menu:v_id_menu,
        n_grid:1,
        m_autoquery:'S',
        param:{':p_id_sesion':null}
    });

    var datos_cuota_grid = new GridParam({
        id_menu:v_id_menu,
        n_grid:2,
        m_autoquery:'S',
        param:{':p_id_sesion':null}
    });

    $(document).ready(function() {
        inicializar_grillas();
        inicializar_eventos();
    });
</script>

<?php
require_once(INTRANET."footer.php");
?>
