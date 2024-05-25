<?php
#HEADER DEL FRMWK
require_once(INTRANET."header.php");
#HTML PRINCIPAL
include('actualizacion_de_datos_adicionales_CYQ/html/main.html');

$p_n_id_menu = $_POST['p_n_id_menu'];
$fecha_hoy = date('d/m/Y');
?>
<script type="text/javascript" src="actualizacion_de_datos_adicionales_CYQ/js/eventos.js?no_cache=<?=date('dmyhis')?>"></script>
<script type="text/javascript" src="actualizacion_de_datos_adicionales_CYQ/js/grilla.js?no_cache=<?=date('dmyhis')?>"></script>
<script type="text/javascript" src="actualizacion_de_datos_adicionales_CYQ/js/funciones.js?no_cache=<?=date('dmyhis')?>"></script>
<script type="text/javascript" src="actualizacion_de_datos_adicionales_CYQ/js/lupas.js?no_cache=<?=date('dmyhis')?>"></script>
<script type="text/javascript">
    var v_id_menu = '<?=$p_n_id_menu?>';
    var v_lista_provincias='<?=fun_id_lista('LISTADO DE PROVINCIAS')?>';
    var v_lista_deptos='<?=fun_id_lista('LISTADO DE DEPARTAMENTOS')?>';
    var v_lista_localidades='<?=fun_id_lista('LISTADO DE LOCALIDADES')?>';
    var p_d_provincia;
    var p_c_provincia;
    var p_d_departamento;
    var p_c_departamento;
    var p_c_localidad;
    var p_d_localidad;
    var p_c_expediente_adm;
    var esValido=false;
    var p_n_cuit_cq=null;
    var p_d_denominacion_cq=null;
    var p_c_instancia=null;
    var p_d_instancia=null;
    var main_grid = new GridParam({
            id_menu:v_id_menu,
            n_grid:0,
            n_orden:5,
            m_autoquery:'S',
            param:{
                ':p_c_expediente_adm':null,
                ':p_d_departamento':null,
                ':p_d_localidad':null,
                ':p_d_provincia':null
            }
        });
        var observaciones_grid = new GridParam({
            id_menu:v_id_menu ,
            n_grid:1,
            n_orden:6,
            m_autoquery:'N',
            param:{
                'p_c_expediente_adm':null
            }
        });
    
    $(document).ready(function() {
        initGrillas();
        init_eventos();
        inicializarLupas();
    });

</script>
<?php
require_once(FRAMEWORK_DIR."footer.php");
?>