<?php
require_once(FRAMEWORK_DIR."header.php");

$fecha_hoy = date('d/m/Y');
$p_n_id_menu = $_POST['p_n_id_menu'];

include('reversa_cese_definitivo/html/principal.html');

?>
<script type='text/javascript' src='reversa_cese_definitivo/js/eventos.js?no_cache=<?=date('dmyhis')?>'></script>
<script type='text/javascript' src='reversa_cese_definitivo/js/funciones.js?no_cache=<?=date('dmyhis')?>'></script>
<script type='text/javascript' src='reversa_cese_definitivo/js/grillas.js?no_cache=<?=date('dmyhis')?>'></script>

<script>
    var v_id_menu = '<?=$p_n_id_menu?>';
    var v_lista_denominaciones = '<?=fun_id_lista('LISTA DENOMINACIONES')?>';
    var v_lista_tributos = '<?=fun_id_lista('LISTA TRIBUTO REV CESE DEF')?>';
    var v_lista_objetos = '<?=fun_id_lista('LISTA OBJETO HECHO MODIF F VIG INSC')?>';
    var v_lista_tipo_doc = '<?=fun_id_lista('LISTADO DE TIPOS DE DOCUMENTO')?>';

    var filtros_no_nativos_ar = new Array();
    var filtros_arr_main = [];

    var p_tributo = '<?=$p_tributo?>';
    var v_no_carga_inicial_act_cm = false;
    var v_no_carga_inicial_act_ibd = false;
    var v_no_carga_inicial_juris = false;
    var v_no_carga_inicial_establ = false;
    var v_no_carga_inicial_ct = false;

    var contrib_tributo_grid = new GridParam({
        id_menu:v_id_menu,
        n_grid:0,
        n_orden:0,
        m_autoquery:'N',
        params: {}
    });
    
    var establecimientos_grid = new GridParam({
        id_menu:v_id_menu,
        n_grid:1,
        n_orden:0,
        m_autoquery:'N',
        params: {}
    });
  
   var actividades_cm_grid = new GridParam({
        id_menu:v_id_menu,
        n_grid:2,
        n_orden:0,
        m_autoquery:'N',
        params: {}
    });

    var jurisdicciones_grid = new GridParam({
        id_menu:v_id_menu,
        n_grid:3,
        n_orden:0,
        m_autoquery:'N',
        params: {}
    });

    var actividades_ibd_grid = new GridParam({
        id_menu:v_id_menu,
        n_grid:4,
        n_orden:0,
        m_autoquery:'N',
        params: {}
    });

    $(document).ready(function() { 
        inicializarLupas();
        inicializarEventos();
        inicializarGrillas();
        $('#p_tributo').val(p_tributo);
    });
</script>

<?php
require_once(FRAMEWORK_DIR."footer.php");
?>