<?php
require_once(FRAMEWORK_DIR."header.php");

//PONER PARAMETROS DE MI FORM
$p_n_id_menu = $_POST['p_n_id_menu'];
$fecha_hoy = date('d/m/Y');


$lista_formularios = fun_id_lista('LISTADO DE FORMULARIOS DDJJ');
$lista_origenes = fun_id_lista('LISTADO DE ORIGENES DDJJ');
$lista_objeto_hecho = fun_id_lista('LISTADO DE NROS INSCIPCION INGRESO DDJJ MENSUALES');
$lista_conceptos = fun_id_lista('LISTADO CONCEPTOS DDJJ MENSUALES');
$lista_tributos = fun_id_lista('LISTADO DE TRIBUTOS DE INGRESOS BRUTOS CONVENIO');
$lista_documentos = fun_id_lista('LISTADO DE TIPOS DE DOCUMENTO');
$lista_denominaciones = fun_id_lista('LISTA DENOMINACIONES');

#HTML PRINCIPAL
include('ingreso_ddjj_mensuales/html/principal.html');
?>

    <link rel="stylesheet" type="text/css" href="ingreso_ddjj_mensuales/css/estilos.css">
    <script type='text/javascript' src='ingreso_ddjj_mensuales/js/eventos.js?no_cache=<?=date('dmyhis')?>'></script>
    <script type='text/javascript' src='ingreso_ddjj_mensuales/js/grillas.js?no_cache=<?=date('dmyhis')?>'></script>
    <script>
        var filtros_no_nativos_ar = new Array();
        var filtros_arr_main = [];
        var prefixes_complete = [];
        filtros_no_nativos_ar['main_grid'] = new Array();
        var fecha_hoy = '<?=$fecha_hoy?>';
        let v_lista_formularios = '<?=$lista_formularios?>';
        let v_lista_origenes = '<?=$lista_origenes?>';
        let v_lista_objeto_hecho = '<?=$lista_objeto_hecho?>';
        let v_lista_conceptos = '<?=$lista_conceptos?>';
        let v_lista_tributos = '<?=$lista_tributos?>';
        
        let v_lista_lista_documentos = '<?=$lista_documentos?>';
        var vg_lista_denominaciones = '<?=$lista_denominaciones?>';
        var ajax_autocomplete = null;

        var proceso;
        var v_id_menu = '<?=$p_n_id_menu?>';
        var v_id_ddjj;
        var v_id_obligacion;
        var v_c_tipo_imponible;
        var v_n_secuencia_obl;
        var v_n_secuencia_pres;
        var v_n_remesa;
        var v_n_cabezal;
        var v_c_tributo;
        var v_n_cuit;
        var v_c_concepto;
        var v_c_tipo_form;
        var v_d_objeto_hecho;
        var v_f_presentacion;
        var v_id_contribuyente;
        var v_n_posicion_fiscal;
        var v_n_cuota;
        var v_celdas_vacias;

        var datos_main_grid = new GridParam({
                id_menu:v_id_menu,
                n_grid:0,
                n_orden: 1,
                m_autoquery:'N'
               
            });

        $(document).ready(function() {
            inicializarGrillas();
            inicializarLupas();
            init_eventos();
        });

    </script>

<?php
require_once(FRAMEWORK_DIR."footer.php");
?>