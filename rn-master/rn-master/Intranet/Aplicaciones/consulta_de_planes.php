<?php
require_once(INTRANET."header.php");
include('consulta_de_planes/html/main.html');

$fecha_hoy = date('d/m/Y');
$p_n_plan_pago = $_POST['p_n_plan_pago'];
$p_id_menu = $_POST['p_n_id_menu'];
$lista_tipo_documentos = fun_id_lista('LISTADO DE TIPOS DE DOCUMENTO');
$lista_delegaciones = fun_id_lista('LISTADO DE DELEGACIONES');
$lista_tipo_imponible = fun_id_lista('LISTADO DE TIPO IMPONIBLE FACP002');
$lista_tipo_pp = fun_id_lista('LISTADO DE TIPO DE PLANES DE PAGO');
$lista_tributos = fun_id_lista('LISTADO DE TRIBUTOS');
$lista_conceptos = fun_id_lista('LISTADO DE CONCEPTOS');
$lista_objetos = fun_id_lista('LISTA DE OBJETOS HECHOS CONSULTA PLANES DE PAGO');
$lista_denom = fun_id_lista('LISTA DENOMINACIONES');
$lista_planes = fun_id_lista('LISTA PLANES DE PAGO CONSULTA PLANES');

?>

    <script type="text/javascript" src="consulta_de_planes/js/eventos.js?no_cache=<?=date('dmyhis')?>"></script>
    <script type="text/javascript" src="consulta_de_planes/js/grillas.js?no_cache=<?=date('dmyhis')?>"></script>

    <script type="text/javascript">
        var fecha_hoy = '<?=$fecha_hoy?>';
        var param_n_plan_pago = '<?=$p_n_plan_pago?>'
        var v_id_menu = '<?=$p_id_menu?>';
        var v_lista_doc = '<?=$lista_tipo_documentos?>';
        var v_lista_deleg = '<?=$lista_delegaciones?>';
        var v_lista_tipo_imp = '<?=$lista_tipo_imponible?>';
        var v_lista_tipo_pp = '<?=$lista_tipo_pp?>';
        var v_lista_tributos = '<?=$lista_tributos?>';
        var v_lista_conceptos = '<?=$lista_conceptos?>';
        var v_lista_objetos = '<?=$lista_objetos?>';
        var ajax_autocomplete = null;
        var v_lista_denominacion = '<?=$lista_denom?>';
        var v_lista_plan_pago = '<?=$lista_planes?>';

        var main_grid_datos = new GridParam({
            id_menu: v_id_menu,
            n_grid: 0,
            m_autoquery:'N',
            param:{}
        });

        var secondary_grid_datos = new GridParam({
            id_menu: v_id_menu,
            n_grid: 1,
            m_autoquery:'N',
            param:{}
        });

        var honorarios_grid = new GridParam({
            id_menu:v_id_menu,
            n_grid:3,
            n_orden:0,
            m_autoquery:'N',
            params: {}
        });

        var relacionados_grid = new GridParam({
            id_menu:v_id_menu,
            n_grid:4,
            n_orden:0,
            m_autoquery:'N',
            params: {}
        });

        var resumen_grid = new GridParam({
            id_menu:v_id_menu,
            n_grid:5,
            n_orden:0,
            m_autoquery:'N',
            params: {}
        });

        $(document).ready(function() {
            init_eventos();
            init_grillas();
        });

    </script>

<?php
require_once(INTRANET."footer.php");
?><?php
