<?php
require_once(INTRANET."header.php");

$fecha_hoy = date('d/m/Y');
$p_n_id_menu = $_POST['p_n_id_menu'];
$m_autoquery = $_POST['p_m_autoquery'];
$lista_medios_debito = fun_id_lista('LISTA MEDIOS DE PAGO DEBITO');
$lista_bancos = fun_id_lista('LISTADO DE BANCOS');
$lista_sucursales = fun_id_lista('LISTADO DE SUCURSALES');
$lista_tributos = fun_id_lista('LISTADO DE TRIBUTOS');
$lista_tributos_filtro = fun_id_lista('LISTADO DE TRIBUTOS');
$lista_obj_hecho = fun_id_lista('LISTA DE OBJETOS SEGUN TRIBUTO');
$lista_obj_hecho_filtro = fun_id_lista('LISTA DE OBJETOS SEGUN TRIBUTO');
$lista_productos = fun_id_lista('LISTADO DE PRODUCTOS');
$lista_denominaciones = fun_id_lista('LISTA DENOMINACIONES');
$p_modo = $_POST['p_modo'];

#HTML PRINCIPAL
include('abm_adhesion/html/principal.html');
include('abm_adhesion/html/modals.html');
?>
    <style>

    </style>
    <script type='text/javascript' src='abm_adhesion/js/grillas.js?no_cache=<?=date('dmyhis')?>'></script>
    <script type='text/javascript' src='abm_adhesion/js/eventos.js?no_cache=<?=date('dmyhis')?>'></script>
    <script type='text/javascript' src='abm_adhesion/js/funciones.js?no_cache=<?=date('dmyhis')?>'></script>
    <script>
        //VARIABLES GLOBALES
        var p_medio;
        var p_producto;
        var p_contrib;
        var p_id_contribuyente;
        var p_desc_denom;
        var p_trib;
        var p_obj;
        var p_f_desde;
        var p_f_hasta;
        var p_cbu;
        var p_n_cuit;
        var p_modo='<?=$p_modo?>';
        var filtros_no_nativos_ar = [];
        var filtros_arr_main = [];
        var ajax_autocomplete = null;
        var m_abm;
        var v_id_menu = '<?=$p_n_id_menu?>';
        var fecha_hoy = '<?=$fecha_hoy?>';
        var v_carga_grilla_manual = false;

        var v_id_contribuyente_backup;


        filtros_no_nativos_ar['main_grid'] = new Array();
        filtros_no_nativos_ar['consulta_grid'] = new Array();
        var datos_main_grid = new GridParam({
            id_menu: v_id_menu,
            n_grid: 0,
            n_orden: 0,
            m_autoquery:'N'
        });

        var consulta_main_grid = new GridParam({
            id_menu: v_id_menu,
            n_grid: 0,
            n_orden: 0,
            m_autoquery:'N'
        });
        $(document).ready(function() {

            init_eventos();
            inicializar_lupas_filtros();
            inicializarGrillas();

        });
        var v_lista_medios_debito = '<?=$lista_medios_debito?>';
        var v_lista_bancos = '<?=$lista_bancos?>';
        var v_lista_sucursales = '<?=$lista_sucursales?>';
        var v_lista_tributos = '<?=$lista_tributos?>';
        var v_lista_tributos_filtro = '<?=$lista_tributos_filtro?>';
        var v_lista_obj_hecho = '<?=$lista_obj_hecho?>';
        var v_lista_obj_hecho_filtro = '<?=$lista_obj_hecho_filtro?>';
        var v_lista_productos = '<?=$lista_productos?>';
        var v_lista_denominaciones ='<?=$lista_denominaciones?>'

    </script>

<?php
require_once(INTRANET."footer.php");
?>