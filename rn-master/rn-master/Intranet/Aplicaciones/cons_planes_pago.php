<?php
    require_once(INTRANET."header.php");

    $p_modo = $_POST['p_modo'];

    if($p_modo == 'C'){
        $p_id_contribuyente = $_POST['p_id_contribuyente'];
        $p_n_plan_pago = $_POST['p_n_plan_pago'];
        $p_oblig = $_POST['p_oblig'];

        if (isset($p_n_plan_pago) or isset($p_id_contribuyente) or isset($p_oblig)){
            if (isset($p_oblig)){
                // set_block_property('PP', DEFAULT_WHERE, '(c_tipo_plan_pago, n_plan_pago) IN (SELECT ppd.c_tipo_plan_pago, ppd.n_plan_pago FROM planes_de_pago_detalle ppd WHERE ppd.id_obligacion = '||:parameter.p_oblig||') AND f_efectivacion IS NOT NULL');
            }else{
                if (isset($p_id_contribuyente) and empty($p_n_plan_pago)){
                    $db_query = new DB_query(
                        "SELECT fun_formato_cuit(n_cuit) n_cuit, d_denominacion
                        FROM contribuyentes
                        WHERE id_contribuyente = :p_id_contribuyente");
                    $par = array(':p_id_contribuyente' => $p_id_contribuyente);
                    $row = $db_query->do_query($par);

                    $p_n_cuit = $row[0]['N_CUIT'];
                    $p_d_denominacion = $row[0]['D_DENOMINACION'];
                }
            }
        }
    }

    $lista_tributos_planes = fun_id_lista('LISTADO TRIBUTOS PLANES POR CONTRIB');
    $lista_tipo_imponible_planes = fun_id_lista('LISTADO TIPO IMPONIBLES PLANES POR CONTRIB');
    $lista_objetos_planes = fun_id_lista('LISTADO OBJETOS PLANES POR CONTRIB');
    $lista_tipo_planes = fun_id_lista('LISTADO TIPOS DE PLANES DE PAGO X CONTRIB');
    $lista_planes = fun_id_lista('LISTADO DE PLANES DE PAGO X CONTRIB');

    include('cons_planes_pago/html/principal.html');
    include('cons_planes_pago/html/tabs.html');
?>

<link rel="stylesheet" type="text/css" href="cons_planes_pago/css/estilos.css">
<script type="text/javascript" src="cons_planes_pago/js/funciones.js?no_cache=<?=date('dmy')?>" async></script>
<script type="text/javascript" src="cons_planes_pago/js/eventos.js?no_cache=<?=date('dmy')?>" async></script>
<script type="text/javascript" src="cons_planes_pago/js/grillas.js?no_cache=<?=date('dmy')?>" async></script>

<script type="text/javascript">
    var p_modo = '<?=$p_modo?>';
    var id_contribuyente = '<?=$p_id_contribuyente?>';

    var lista_tributos_planes = '<?=$lista_tributos_planes?>';
    var lista_tipo_imponible_planes = '<?=$lista_tipo_imponible_planes?>';
    var lista_objetos_planes = '<?=$lista_objetos_planes?>';
    var lista_tipo_planes = '<?=$lista_tipo_planes?>';
    var lista_planes = '<?=$lista_planes?>';
    
    var ajax_autocomplete = null;

    var datos_planes_grid = new GridParam({
        id_menu:10891,
        n_grid:2,
        m_autoquery:'S',
        param:{':id_contribuyente':id_contribuyente,
            ':c_tributo':null,
            ':c_tipo_imponible':null,
            ':d_objeto_hecho':null}
    });

    var datos_detalle_grid = new GridParam({
        id_menu:10891,
        n_grid:0,
        m_autoquery:'S',
        param:{':c_tipo_plan_pago':null,
            ':n_plan_pago':null}
    });

    var datos_cuotas_grid = new GridParam({
        id_menu:10891,
        n_grid:1,
        m_autoquery:'S',
        param:{':c_tipo_plan_pago':null,
            ':n_plan_pago':null}
    });

    $(document).ready(function($){
        iniciarGrillas();
        init_eventos();
    });
</script>

<?php
    require_once(INTRANET."footer.php");
?>