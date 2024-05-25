<?php
require_once(FRAMEWORK_DIR."header.php");

$fecha_hoy = date('d/m/Y');
$p_n_id_menu = $_POST['p_n_id_menu'];

include('consulta_registro_intermediarios/html/principal.html');

?>
<script type='text/javascript' src='consulta_registro_intermediarios/js/eventos.js?no_cache=<?=date('dmyhis')?>'></script>
<script type='text/javascript' src='consulta_registro_intermediarios/js/funciones.js?no_cache=<?=date('dmyhis')?>'></script>
<script type='text/javascript' src='consulta_registro_intermediarios/js/grillas.js?no_cache=<?=date('dmyhis')?>'></script>

<script>
    var v_lista_tipo_imponible = '<?=fun_id_lista('LISTADO DE TIPOS IMPONIBLES')?>';
    var v_lista_tributos = '<?=fun_id_lista('LISTADO DE TRIBUTOS')?>';
    var v_lista_contrib_interm = '<?=fun_id_lista('LISTADO CONTRIBUYENTES INTERMEDIARIOS')?>';
    var v_lista_tipo_doc_habilitante = '<?=fun_id_lista('LISTADO TIPO DOC HABILITANTE')?>';
    var v_lista_provincias = '<?=fun_id_lista('LISTADO DE PROVINCIAS')?>';
    var v_lista_denominaciones = '<?=fun_id_lista('LISTA DENOMINACIONES REGISTRO INTERMEDIARIOS')?>';
    var v_lista_tipo_doc = '<?=fun_id_lista('LISTADO DE TIPOS DE DOCUMENTO')?>';
    var v_lista_denom_gral = '<?=fun_id_lista('LISTA DENOMINACION INTERMEDIARIOS CONTRIB')?>';
    var v_id_menu = '<?=$p_n_id_menu?>';
    var fecha_hoy = '<?=$fecha_hoy?>';
    var filtros_no_nativos_ar = new Array();
    var filtros_arr_main = [];

    filtros_no_nativos_ar['main_grid'] = new Array();

    var v_es_carga_inicial = true;
    var v_consulta_general = false;
    var v_filtros_ingresados = [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, 
                                null, null, null, null, null, null];

    var main_grid = new GridParam({
        id_menu:v_id_menu,
        n_grid:0,
        n_orden:0,
        m_autoquery:'N',
        params: {}
    });

    $(document).ready(function() { 
        inicializarLupas();
        inicializarEventos();
        inicializarGrillas();
    });
</script>

<?php
require_once(FRAMEWORK_DIR."footer.php");
?>