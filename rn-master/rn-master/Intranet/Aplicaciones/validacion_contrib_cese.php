<?php
#HEADER DEL FRMWK
require_once(INTRANET."header.php");
$p_id_menu = $_POST['p_n_id_menu'];
$p_n_cuit = $_POST['p_n_cuit'];
$p_c_tributo = $_POST['p_c_tributo'];
$p_f_cese = $_POST['p_f_cese'];
#HTML PRINCIPAL
include('validacion_contrib_cese/html/main.html');
include('validacion_contrib_cese/html/modals.html');

$fecha_hoy = date('d/m/Y');
$lista_tributos = fun_id_lista('LISTA TRIBUTOS VALIDACION CONTRIB CESE');
$lista_contribuyentes = fun_id_lista('LISTA DENOM VALIDACION CONTRIB CESE');
$lista_tbl_gen = fun_id_lista('LISTA TABLAS GENERALES PARAMETROS');
$lista_timp = fun_id_lista('TABLAS GENERALES');
$lista_obj= fun_id_lista('LISTA OBJ HECHO VALDACION CONTRIB CESE');


?>
<script type='text/javascript' src='validacion_contrib_cese/js/eventos.js?no_cache=<?=date('dmyhis')?>'></script>
<script type='text/javascript' src='validacion_contrib_cese/js/funciones.js?no_cache=<?=date('dmyhis')?>'></script>
<script type='text/javascript' src='validacion_contrib_cese/js/grillas.js?no_cache=<?=date('dmyhis')?>'></script>
<script>

    var v_id_menu = '<?=$p_id_menu?>';
    var fecha_hoy = '<?=$fecha_hoy?>';
    var v_lista_tributos = '<?=$lista_tributos?>';
    var v_lista_contribuyentes = '<?=$lista_contribuyentes?>';
    var v_lista_tbl_gen = '<?=$lista_tbl_gen?>';
    var v_lista_timp = '<?=$lista_timp?>';
    var vg_lista_objetos = '<?=$lista_obj?>';
    var sesion;
    var param_n_cuit = '<?=$p_n_cuit?>'
    var param_c_tributo = '<?=$p_c_tributo?>'
    var param_f_cese = '<?=$p_f_cese?>'

    var filtros_no_nativos_ar = [];
    var filtros_arr_inscripciones = [];
    var filtros_arr_comercios = [];
    var filtros_arr_actividades = [];
    var filtros_arr_jurisdicciones = [];
    var filtros_arr_errores = [];

     var g_inmueble;
     var g_provincia;
     var g_ibd;
     var g_ibcm;
     var g_plan;
     var g_ap;
     var g_ar;
     var g_sec_ibd;
     var g_sec_cm;
     var g_sec_ap;
     var g_sec_ar;
     var g_jur_neuquen;
     var g_ute;
     var g_dep_cm;
     var g_loc_cm;

     var datos_inscripciones_grid = new GridParam({
            id_menu: v_id_menu,
            n_grid:0,
            m_autoquery:'N',
            param:{':p_n_cuit':null, ':p_c_tributo':null, ':p_d_objeto_hecho':null, ':p_f_vig_desde':null}
        });

    var datos_comercios_grid = new GridParam({
        id_menu: v_id_menu,
        n_grid:1,
        m_autoquery:'N',
        param:{':p_id_contribuyente':null, ':p_c_tributo':null, ':p_d_objeto_hecho':null}
    });

    var datos_actividades_grid = new GridParam({
        id_menu: v_id_menu,
        n_grid:2,
        m_autoquery:'N',
        param:{':p_id_contribuyente':null, ':p_c_tributo':null, ':p_d_objeto_hecho':null}
    });

    var datos_jurisdicciones_grid = new GridParam({
        id_menu: v_id_menu,
        n_grid:3,
        m_autoquery:'N',
        param:{':p_id_contribuyente':null, ':p_c_tributo':null, ':p_d_objeto_hecho':null}
    });

    var datos_errores_grid = new GridParam({
            id_menu: v_id_menu,
            n_grid:4,
            m_autoquery:'N',
            param:{':p_n_sesion':null}
        });


    $(document).ready(function(){
        init_grillas();
        init_eventos();
    });

    
</script>

<?php
require_once(FRAMEWORK_DIR."footer.php");
?>