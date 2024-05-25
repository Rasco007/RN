<?php
require_once(FRAMEWORK_DIR."header.php");

$fecha_hoy = date('d/m/Y');
$p_id_menu = $_POST['p_n_id_menu'];
$p_modo = $_POST['p_modo'];
$p_nro_envio = $_POST['p_nro_envio'];


include('correccion_errores_mov_rnpa/html/principal.html');

?>
<link rel="stylesheet" type="text/css" href="correccion_errores_mov_rnpa/css/styles.css">
<script type='text/javascript' src='correccion_errores_mov_rnpa/js/eventos.js?no_cache=<?=date('dmyhis')?>'></script>
<script type='text/javascript' src='correccion_errores_mov_rnpa/js/funciones.js?no_cache=<?=date('dmyhis')?>'></script>
<script type='text/javascript' src='correccion_errores_mov_rnpa/js/grillas.js?no_cache=<?=date('dmyhis')?>'></script>

<script>
    var v_id_menu = '<?=$p_id_menu?>';
    var f_hoy = '<?=$fecha_hoy?>';
    var p_modo = '<?=$p_modo?>';
    var p_nro_envio = '<?=$p_nro_envio?>';
    
    var v_lista_tipo_registro = '<?=fun_id_lista('LISTA TIPO REGISTRO RNPA')?>';
    var v_lista_localidades = '<?=fun_id_lista('LISTA LOCALIDADES AUTR003')?>';
    var v_lista_denominaciones = '<?=fun_id_lista('LISTA DENOMINACIONES')?>';
    var v_lista_envios = '<?=fun_id_lista('LISTA NRO ENVIO RNPA')?>';

    var v_c_filtro;
    var inputs_iniciales = {};
    var inputs_iniciales_tit = {};
    var hay_cambios_titulares = false;

    var main_grid = new GridParam({
        id_menu:v_id_menu,
        n_grid:0,
        n_orden:0,
        m_autoquery:'N',
        param:{}
    });

    var c2_grid = new GridParam({
        id_menu:v_id_menu,
        n_grid:1,
        n_orden:0,
        m_autoquery:'N',
        param:{}
    });

    var c4_grid = new GridParam({
        id_menu:v_id_menu,
        n_grid:2,
        n_orden:0,
        m_autoquery:'N',
        param:{}
    });

    var c6_grid = new GridParam({
        id_menu:v_id_menu,
        n_grid:3,
        n_orden:0,
        m_autoquery:'N',
        param:{}
    });

    var c7_grid = new GridParam({
        id_menu:v_id_menu,
        n_grid:4,
        n_orden:0,
        m_autoquery:'N',
        param:{}
    });

    var c8_grid = new GridParam({
        id_menu:v_id_menu,
        n_grid:5,
        n_orden:0,
        m_autoquery:'N',
        param:{}
    });

    var c1_grid = new GridParam({
        id_menu:v_id_menu,
        n_grid:6,
        n_orden:0,
        m_autoquery:'N',
        param:{}
    });

    var c8_det_grid = new GridParam({
        id_menu:v_id_menu,
        n_grid:7,
        n_orden:0,
        m_autoquery:'N',
        param:{}
    });

    var titulares_grid = new GridParam({
        id_menu:v_id_menu,
        n_grid:8,
        n_orden:0,
        m_autoquery:'N',
        param:{}
    });


    

    $(document).ready(function() { 
        inicializarLupas();
        inicializarEventos();
        inicializarGrillas();
        definir_menu(p_modo);
        definir_nro_envio(p_nro_envio);
    });
</script>

<?php
require_once(FRAMEWORK_DIR."footer.php");
?>