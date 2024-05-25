<?php
require_once(FRAMEWORK_DIR."header.php");

$fecha_hoy = date('d/m/Y');
$p_id_menu = $_POST['p_n_id_menu'];
$p_c_tipo_form = $_POST['p_c_tipo_form'];
$p_c_tributo = $_POST['p_c_tributo'];
$p_c_concepto = $_POST['p_c_concepto'];


include('ingreso_ddjj_manual/html/principal.html');

?>
<script type='text/javascript' src='ingreso_ddjj_manual/js/eventos.js?no_cache=<?=date('dmyhis')?>'></script>
<script type='text/javascript' src='ingreso_ddjj_manual/js/funciones.js?no_cache=<?=date('dmyhis')?>'></script>
<script type='text/javascript' src='ingreso_ddjj_manual/js/grillas.js?no_cache=<?=date('dmyhis')?>'></script>

<script>
    var v_id_menu = '<?=$p_id_menu?>';
    var v_f_hoy = '<?=$fecha_hoy?>';
    var v_oper;
    var p_c_tipo_form = '<?=$p_c_tipo_form?>';
    var p_c_tributo = '<?=$p_c_tributo?>';
    var p_c_concepto = '<?=$p_c_concepto?>';
    
    var v_lista_tipo_form = '<?=fun_id_lista('LISTA TIPO FORM DDJJ')?>';
    var v_lista_tributo = '<?=fun_id_lista('LISTA TRIBUTOS INGR DDJJ')?>';
    var v_lista_concepto = '<?=fun_id_lista('LISTA CONCEPTOS INGR DDJJ')?>';
    var v_lista_objeto_hecho = '<?=fun_id_lista('LISTA OBJETO HECHO INGR DDJJ')?>';
    var v_lista_pos_fiscal = '<?=fun_id_lista('LISTA POS FISCAL CUOTA INGR DDJJ')?>';
    var v_lista_denominacion = '<?=fun_id_lista('LISTA DENOMINACION INGR DDJJ')?>';
    var v_lista_contribuyentes = '<?=fun_id_lista('LISTA CONTRIBUYENTES INGR DDJJ')?>';

    var v_form_ret = 'IB16';
    var v_form_ret1 = 'IB06';
    var v_form_per = 'AP02';

    var v_i_saldo_declarado;
    var v_m_favor_rentas;
    var v_hay_cambios = 'N';
    var v_cancelado = false;

    var personales_grid = new GridParam({
        id_menu:v_id_menu,
        n_grid:0,
        n_orden:0,
        m_autoquery:'N',
        param:{}
    });

    var percepciones_grid = new GridParam({
        id_menu:v_id_menu,
        n_grid:1,
        n_orden:0,
        m_autoquery:'N',
        param:{}
    });

    var retenciones_grid = new GridParam({
        id_menu:v_id_menu,
        n_grid:2,
        n_orden:0,
        m_autoquery:'N',
        param:{}
    });

    var sellos_grid = new GridParam({
        id_menu:v_id_menu,
        n_grid:3,
        n_orden:0,
        m_autoquery:'N',
        param:{}
    });

    var errores_grid = new GridParam({
        id_menu:v_id_menu,
        n_grid:4,
        n_orden:0,
        m_autoquery:'N',
        param:{}
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