<?php
require_once(FRAMEWORK_DIR."header.php");

$p_n_id_menu = $_POST['p_n_id_menu'];
$fecha_hoy = date('d/m/Y');
$p_modo = $_POST['p_modo'];
$p_n_cuit = $_POST['p_n_cuit'];


$lista_planes_pago = fun_id_lista('LISTADO PLANES DE PAGO FACP003');
$lista_denominaciones = fun_id_lista('LISTA DENOMINACIONES AFIP');
$lista_tipos_de_plan = fun_id_lista('LISTADO TIPOS DE PLANES DE PAGO');
$lista_documentos = fun_id_lista('LISTADO DE TIPOS DE DOCUMENTO');
$lista_tipos_imponibles = fun_id_lista('LISTADO DE TIPOS IMPONIBLES');
$lista_pc_cuit = fun_id_lista('LISTADO DE PC CUIT');
#HTML PRINCIPAL
include('consulta_padron_AFIP/html/principal.html');
include('consulta_padron_AFIP/html/modal.html');
?>
<style>

</style>
    <script type='text/javascript' src='consulta_padron_AFIP/js/eventos.js?no_cache=<?=date('dmyhis')?>'></script>
    <script type='text/javascript' src='consulta_padron_AFIP/js/grillas.js?no_cache=<?=date('dmyhis')?>'></script>
    <script type='text/javascript' src='consulta_padron_AFIP/js/funciones.js?no_cache=<?=date('dmyhis')?>'></script>
    <script>
        var fecha_hoy = '<?=$fecha_hoy?>';
        var p_modo = '<?=$p_modo?>';
        
        var v_lista_planes_pago = '<?=$lista_planes_pago?>';
        var vg_lista_denominaciones = '<?=$lista_denominaciones?>';
        var v_lista_tipos_de_plan = '<?=$lista_tipos_de_plan?>';
        var v_lista_documentos = '<?=$lista_documentos?>';
        var v_lista_tipos_imponibles = '<?=$lista_tipos_imponibles?>';
        var v_lista_pc_cuit = '<?=$lista_pc_cuit?>';

        var ajax_autocomplete = null;
        var p_m_autoquery = '<?=$p_m_autoquery?>';
        var v_no_carga_inicial_pph = false;

        var v_id_menu = '<?=$p_n_id_menu?>';

        var v_d_denominacion;
        var v_sexo_filtro;
        var v_d_casada_filtro;
        var v_d_materno_filtro;
        var v_f_primera;
        var v_n_primera;
        var v_f_segunda;
        var v_n_segunda;
        var v_f_tercera;
        var v_n_tercera;
        var v_f_nacimiento;
        var v_f_alta;
        var v_d_calle;
        var v_n_calle;
        var v_d_barrio;
        var v_d_manzana;
        var v_n_torre;
        var v_n_depto;
        var v_n_piso;
        var v_d_sec;
        var v_d_depend;
        var v_d_loc;
        var v_n_cp;
        var v_d_pcia;
        var v_n_ganancia;
        var v_n_iva;
        var v_d_autonomo;
        var v_d_empleador;
        var v_d_tipo_persona;
        var v_n_juridica;
        var v_d_emp_promovida;
        var v_d_gran_contr;
        var v_d_pasivo;
        var v_d_monotributo;
        var v_d_cat_monotributo;
        var v_n_act_monotributo;
        var v_d_cat_auto;
        var v_d_cat_autonomo;
        var v_f_cquieb;
        var v_d_cquieb;
        var v_f_fallecimiento;
        var v_d_sucesion;

        $(document).ready(function() {
            inicializa_lupas();
            inicializa_eventos();
        });

    </script>

<?php
require_once(FRAMEWORK_DIR."footer.php");
?>