<?php
require_once(INTRANET . "header.php");
require_once('baja_ddjj_agentes/php/traer_datos.php');

$id_lista_tributos = fun_id_lista('LISTADO DE TRIBUTOS AGENTES');
$id_lista_documentos = fun_id_lista('LISTADO DOCUMENTOS CALCULO MAXMIN IIBB');
$id_lista_denominaciones = fun_id_lista('LISTA DENOMINACIONES');
$id_lista_objetos = fun_id_lista('LISTADO DE OBJETOS AGENTES');
$id_lista_forms = fun_id_lista('LISTADO DE TIPO FORM AGENTES');

$fecha_hoy = date('d/m/Y');
$p_id_menu = $_POST['p_n_id_menu'];
$p_elimina_sircar = $_POST['p_elimina_sircar'];
$user = $_SESSION['usuario'];

$data_forms = traer_datos();
$p_form_per = $data_forms[0]['FORM_PER'];
$p_form_ret = $data_forms[0]['FORM_RET'];
$p_form_ret1 = $data_forms[0]['FORM_RET1'];

#HTML PRINCIPAL
include('baja_ddjj_agentes/html/principal.html');
?>

<script type='text/javascript' src='baja_ddjj_agentes/js/grillas.js?no_cache=<?=date('dmyhis')?>'></script>
<script type='text/javascript' src='baja_ddjj_agentes/js/eventos.js?no_cache=<?=date('dmyhis')?>'></script>
<script type='text/javascript' src='baja_ddjj_agentes/js/funciones.js?no_cache=<?=date('dmyhis')?>'></script>

<script>
    //VARIABLES GLOBALES
    var filtros_no_nativos_ar = new Array();
    filtros_no_nativos_ar['main_grid'] = new Array();
    filtros_no_nativos_ar['detail_reten_grid'] = new Array();
    filtros_no_nativos_ar['detail_percep_grid'] = new Array();
    filtros_no_nativos_ar['detail_sellos_grid'] = new Array();
    filtros_no_nativos_ar['detail_recau_grid'] = new Array();
    var fecha_hoy = '<?=$fecha_hoy?>';
    var v_c_usuario = '<?=$user?>';
    var v_id_menu = '<?=$p_id_menu?>';
    var p_elimina_sircar = '<?=$p_elimina_sircar?>';
    var ajax_autocomplete = null;
    var p_form_per = '<?=$p_form_per?>';
    var p_form_ret = '<?=$p_form_ret?>';
    var p_form_ret1 = '<?=$p_form_ret1?>';
    var id_lista_denominaciones = '<?=$id_lista_denominaciones?>';
    var id_lista_tributos = '<?=$id_lista_tributos?>';
    var id_lista_documentos = '<?=$id_lista_documentos?>';
    var id_lista_objetos = '<?=$id_lista_objetos?>';
    var id_lista_forms = '<?=$id_lista_forms?>';

    var datos_main_grid = new GridParam({
        id_menu: v_id_menu,
        n_grid:0,
        m_autoquery:'N',
    });

    var datos_detail_reten_grid = new GridParam({
        id_menu: v_id_menu,
        n_grid:1,
        m_autoquery:'N',
    });

    var datos_detail_percep_grid = new GridParam({
        id_menu: v_id_menu,
        n_grid:2,
        m_autoquery:'N',
    });

    var datos_detail_sellos_grid = new GridParam({
        id_menu: v_id_menu,
        n_grid:3,
        m_autoquery:'N',
    });

    var datos_detail_recau_grid = new GridParam({
        id_menu: v_id_menu,
        n_grid:4,
        m_autoquery:'N',
    });

    $(document).ready(function() {
        inicializar_grillas();
        inicializar_eventos();
    });
</script>

<?php
require_once(INTRANET."footer.php");
?>
