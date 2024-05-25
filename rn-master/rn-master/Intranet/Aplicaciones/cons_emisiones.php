<?php
    require_once(INTRANET."header.php");

    $p_id_menu = $_POST['p_n_id_menu'];
    $c_usuario = $_SESSION['usuario'];

    $p_tributo = $_POST['p_tributo'];
    $p_concepto = $_POST['p_concepto'];
    $p_anio   = $_POST['p_n_anio'];
    $p_cuota   = $_POST['p_n_cuota'];
    $p_id_workflow_log = $_POST['p_id_workflow_log'];
    $p_c_tarea = $_POST['p_c_tarea'];

    $lista_consorcios = fun_id_lista('CONSORCIOS');
    $lista_regiones = fun_id_lista('REGIONES POR TIPO DE CONSORCIO');
    $lista_areas = fun_id_lista('AREAS POR TIPO DE CONSORCIO');
    
    if (isset($p_c_region)){
        $par = array(':c_region' => $p_c_region, ':c_area' => $p_c_area);
        $db_query = new DB_query(
            "SELECT d_dato from siat.tablas_generales where n_tabla=26 and c_dato=:c_region");
        $row = $db_query->do_query($par);
        $p_d_region = $row[0]['D_DATO'];
    }
    if (isset($p_c_area)){
        $db_query = new DB_query(
            "SELECT d_dato from siat.tablas_generales where n_tabla=62 and c_dato=:c_area and d_dato1=:c_region");
        $row = $db_query->do_query($par);
        $p_d_area = $row[0]['D_DATO'];
    }

    //Cargo Combo para Consorcios
    $db_query = new DB_Query(
        "SELECT c_organismo, d_organismo
        from param_organismos
        where c_tipo!=1 and c_ente='DPA'
        and trunc(sysdate) between f_vig_desde and nvl(f_vig_hasta,trunc(sysdate))");
    $consorcios = $db_query->do_query();

    include('cons_emisiones/html/principal.html');
    include('cons_emisiones/html/modals.php');
?>

<script type="text/javascript" src="cons_emisiones/js/grillas.js?no_cache=<?=date('dmy')?>"></script>
<script type="text/javascript" src="cons_emisiones/js/funciones.js?no_cache=<?=date('dmy')?>"></script>
<script type="text/javascript" src="cons_emisiones/js/eventos.js?no_cache=<?=date('dmy')?>"></script>
<script type='text/javascript' src='workflow_general/js/funciones.js?no_cache=<?=date('dmyhis')?>'></script>

<script type="text/javascript">
    var v_id_menu = '<?=$p_id_menu?>';
    var c_usuario = '<?=$c_usuario?>';
    
    var v_c_tributo = '<?=$p_tributo?>';
    var v_n_cuota = '<?=$p_cuota?>';
    var v_id_workflow_log = '<?=$p_id_workflow_log ?>';
    var v_c_tarea = '<?=$p_c_tarea ?>';
    var v_c_concepto = '<?=$p_concepto?>';
    var v_n_anio = '<?=$p_anio?>';

    var lista_tributos = '<?=fun_id_lista('TRIBUTOS DE EMISION MASIVA')?>';
    var lista_conceptos = '<?=fun_id_lista('LISTADO DE CONCEPTOS POR TRIBUTO')?>';
    var lista_distribuciones = '<?=fun_id_lista('LISTADO TIPOS DISTRIBUCION')?>';

    

    var emisiones_grid = new GridParam({
        id_menu: v_id_menu,
        n_grid:0,
        m_autoquery: 'N'
    });

    var boletas_emitidas_grid = new GridParam({
        id_menu: v_id_menu,
        n_grid:1,
        m_autoquery: 'N'
    });

    var errores_emisiones_grid = new GridParam({
        id_menu: v_id_menu,
        n_grid:2,
        m_autoquery: 'N'
    });

    $(document).ready(function(){
        init_grillas();
        init_eventos();
    });

</script>

<?php
    require_once(INTRANET."footer.php");
?>