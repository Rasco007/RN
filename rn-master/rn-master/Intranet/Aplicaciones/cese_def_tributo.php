<?php
    require_once(INTRANET."header.php");

    $p_id_menu = $_POST['p_n_id_menu'];
    $c_usuario = $_SESSION['usuario'];

    include('cese_def_tributo/html/principal.html');
?>

<script type="text/javascript" src="cese_def_tributo/js/grillas.js?no_cache=<?=date('dmy')?>"></script>
<script type="text/javascript" src="cese_def_tributo/js/funciones.js?no_cache=<?=date('dmy')?>"></script>
<script type="text/javascript" src="cese_def_tributo/js/eventos.js?no_cache=<?=date('dmy')?>"></script>

<script>
    var filtros_no_nativos_ar = [];
    var filtros_arr_main = [];
    var filtros_arr_errores = [];

    filtros_no_nativos_ar['errores_grid'] = [];
    filtros_no_nativos_ar['jurisdicciones_grid'] = [];

    var v_id_menu = '<?=$p_id_menu?>';
    var v_lista_obj = '<?=fun_id_lista('LISTA DE OBJETOS HECHOS CESE DEF. TRIBUTO')?>';
    var v_lista_denominaciones = '<?=fun_id_lista('LISTA DENOMINACIONES')?>';
    var v_lista_tributos = '<?=fun_id_lista('LISTA TRIBUTO CESE DEF')?>';
    var v_lista_tipo_doc = '<?=fun_id_lista('LISTADO DE TIPOS DE DOCUMENTO')?>';
    var v_lista_motivo_baja = '<?=fun_id_lista('LISTA MOTIVO BAJA CESE DEF')?>';

    var v_no_carga_inicial_ct = false;


    var contrib_tributo_grid = new GridParam({
        id_menu:v_id_menu,
        n_grid:0,
        m_autoquery:'N',
        params: {}
    });
    
    var actividades_grid = new GridParam({
        id_menu:v_id_menu,
        n_grid:1,
        m_autoquery:'N',
        params: {}
    });
    
    var jurisdicciones_grid = new GridParam({
        id_menu:v_id_menu,
        n_grid:2,
        m_autoquery:'N',
        params: {}
    });
    
    var comercios_grid = new GridParam({
        id_menu:v_id_menu,
        n_grid:3,
        m_autoquery:'N',
        params: {}
    });

    var errores_grid = new GridParam({
        id_menu:v_id_menu,
        n_grid:4,
        m_autoquery:'N',
        params: {}
    });

    $(document).ready(function(){
        inicializarLupas();
        inicializarEventos();
        inicializarGrillas();
    });

</script>

<?php
    require_once(INTRANET."footer.php");
?>