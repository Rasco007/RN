<?php
    require_once(EXTRANET."header.php");

    if($_SESSION['entorno'] == 'EXTRANET'){
        $id_transacc = log_transaction(1060);
    }									   
    $p_id_menu = $_POST['p_n_id_menu'];
    $c_usuario = $_SESSION['usuario'];
    $p_n_pos_fiscal = $_POST['p_n_pos_fiscal'];
    $p_n_cuota = $_POST['p_n_cuota'];
    $p_c_region = $_POST['p_c_region'];
    $p_c_area = $_POST['p_c_area'];

    // tiene asociado a la DPA?
    $db_query = new DB_Query(
        "SELECT distinct case when c_organismo='DPA' then 'S'
                else 'N'
            end m_dpa
        from entes_usuarios eu
        where eu.c_ente='DPA' and eu.c_usuario = get_info_user('c_usuario')");

    $row_query = $db_query->do_query();
    $m_dpa = $row_query[0]['M_DPA'];

    $lista_consorcios = fun_id_lista('CONSORCIOS Y DPA EXTRANET');
    $lista_regiones = fun_id_lista('CONSORCIOS REGIONES POR USUARIO');
    $lista_areas = fun_id_lista('CONSORCIOS AREAS POR USUARIO');
    
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
        "SELECT *
        from (
            SELECT distinct po.c_organismo, po.d_organismo
            from entes_usuarios eu, param_organismos po
            where eu.c_organismo=po.c_ente
            and eu.c_organismo = 'DPA'
            and eu.c_usuario = get_info_user('c_usuario')
            union
            SELECT distinct po.c_organismo, po.d_organismo
            from entes_usuarios eu, param_organismos po
            where eu.c_organismo=po.c_organismo
            and eu.c_ente=po.c_ente
            and eu.c_usuario = get_info_user('c_usuario') ) v
        where (PAC_CANON_RIEGO.FUN_PERMISOS_ABM_DPA(get_info_user('c_usuario'),v.c_organismo) = 'S'
            OR
            PAC_CANON_RIEGO.FUN_TIENE_DPA(get_info_user('c_usuario')) = 0)");
    $consorcios = $db_query->do_query();

    include('cons_emisiones_canon/html/principal.html');
    include('cons_emisiones_canon/html/modals.php');
?>

<script type="text/javascript" src="cons_emisiones_canon/js/grillas.js?no_cache=<?=date('dmy')?>"></script>
<script type="text/javascript" src="cons_emisiones_canon/js/funciones.js?no_cache=<?=date('dmy')?>"></script>
<script type="text/javascript" src="cons_emisiones_canon/js/eventos.js?no_cache=<?=date('dmy')?>"></script>

<script type="text/javascript">
    var id_menu = '<?=$p_id_menu?>';
    var c_usuario = '<?=$c_usuario?>';
    var p_n_pos_fiscal = ('<?=$p_n_pos_fiscal?>').replace('/','');
    var p_n_cuota = '<?=$p_n_cuota?>';
    var p_c_region = '<?=$p_c_region?>';
    var p_c_area = '<?=$p_c_area?>';
    var v_c_organismo = '<?=$c_organismo?>';
    var v_m_dpa = '<?=$m_dpa?>';
    
    var v_lista_consorcios = '<?=$lista_consorcios?>';
    var v_lista_regiones = '<?=$lista_regiones?>';
    var v_lista_areas = '<?=$lista_areas?>';

    var emisiones_grid = new GridParam({
        id_menu: id_menu,
        n_grid:0,
        m_autoquery: 'S',
        param:{
            ':n_posicion_fiscal': p_n_pos_fiscal,
            ':n_cuota': p_n_cuota,
            ':c_region': p_c_region,
            ':c_area': p_c_area,
            ':c_organismo': v_c_organismo
        }
    });

    var boletas_emitidas_grid = new GridParam({
        id_menu: id_menu,
        n_grid:1,
        m_autoquery: 'S',
        param:{
            ':id_sesion': null,
            ':c_region': p_c_region,
            ':c_area': p_c_area,
            ':c_organismo': v_c_organismo
        }
    });

    var errores_emisiones_grid = new GridParam({
        id_menu: id_menu,
        n_grid:2,
        m_autoquery: 'S',
        param:{
            ':n_posicion_fiscal': p_n_pos_fiscal,
            ':n_cuota': p_n_cuota
        }
    });

    $(document).ready(function(){
        init_grillas();
        init_eventos();
    });

</script>

<?php
    require_once(EXTRANET."footer.php");
?>