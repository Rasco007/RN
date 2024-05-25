<?php
require_once(INTRANET . "header.php");

$m_autoquery = $_POST['p_m_autoquery'];
$p_id_menu = $_POST['p_n_id_menu'];
$p_modo = $_POST['p_modo'];
$fecha_hoy = date('d/m/Y');

$query = " select c_dato, d_dato from tablas_generales inner join parametros using(n_tabla) where c_constante = 'TIPO_CONV' ";

$db_query ->setQuery($query);
$param = array();
$tipos_msj = $db_query->do_query($param);


$query = " select c_dato, d_dato from tablas_generales inner join parametros using(n_tabla) where c_constante = 'ORIG_REL'";

$db_query ->setQuery($query);
$param = array();
$origenes_msj = $db_query->do_query($param);

$query = "select
                FUN_TIENE_PERMISO('AUT_MSJ_VE') AUT_MSJ_VE,
                FUN_TIENE_PERMISO('AUT_ENVIAR_MSJ_VE') AUT_ENVIAR_MSJ_VE,
                FUN_TIENE_PERMISO('AUT_ANULAR_MSJ_VE') AUT_ANULAR_MSJ_VE,
                FUN_TIENE_PERMISO('AUT_ALTA_MSJ_VE') AUT_ALTA_MSJ_VE,
                FUN_TIENE_PERMISO('AUT_NOTIF_FALTA_DFE') AUT_NOTIF_FALTA_DFE
          from dual";

$db_query ->setQuery($query);
$param = array();
$permisos = $db_query->do_query($param);

#HTML PRINCIPAL
include('e-ventanilla/principal.php');
?>

<script type='text/javascript' src='e-ventanilla/js/grillas.js'></script>
<script type='text/javascript' src='e-ventanilla/js/eventos.js'></script>
<script type='text/javascript' src='e-ventanilla/js/funciones.js'></script>

<script>
    //VARIABLES GLOBALES
    var v_id_menu = '<?=$p_id_menu?>';
    var v_m_autoquery = '<?=$m_autoquery?>';
    var ajax_autocomplete = null;
    var fecha_hoy = '<?=$fecha_hoy?>';

    var datos_main_grid = new GridParam({
        id_menu: v_id_menu,
        n_grid:0,
        m_autoquery:v_m_autoquery,
        param:{'p_c_tipo_conv':null,
            'p_id_contribuyente':null}
    });

    $(document).ready(function() {

        inicializarGrillas();
        inicializarEventos();

    });
</script>
<link rel="stylesheet" href="e-ventanilla/css/style_ventanilla.css">
<script src="<?=RECURSOS_FRAMEWORK_PROY?>tinyMCE/tinymce.min.js" type='text/javascript'></script>

<?php
require_once(INTRANET."footer.php");
?>
