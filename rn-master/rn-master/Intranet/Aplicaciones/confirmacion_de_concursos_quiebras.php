<?php
#HEADER DEL FRMWK
require_once(INTRANET."header.php");
#HTML PRINCIPAL
include('confirmacion_de_concursos_quiebras/html/main.html');

$fecha_hoy = date('d/m/Y');
$p_n_id_menu = $_POST['p_n_id_menu'];
?>
<script type="text/javascript" src="confirmacion_de_concursos_quiebras/js/eventos.js?no_cache=<?=date('dmyhis')?>"></script>
<script type="text/javascript" src="confirmacion_de_concursos_quiebras/js/grillas.js?no_cache=<?=date('dmyhis')?>"></script>
<script type="text/javascript" src="confirmacion_de_concursos_quiebras/js/funciones.js?no_cache=<?=date('dmyhis')?>"></script>
<script type='text/javascript'>
    var v_id_menu = '<?=$p_n_id_menu?>';
    var p_id_obligacion;
    var p_n_cuit;
    var p_n_documento;
    var p_c_tipo_documento; 
    var p_c_instancia;
    var p_n_instancia;
    var p_c_expediente;
    var p_id_contribuyente;
    var p_p_cont;
    var p_c_motivo_origen;
    var p_c_origen;
    var p_motivo_origen;
    var p_d_denominacion;
    var p_desc_denom;
    var p_d_instancia;
    var p_sector_origen;
    var p_c_sector_origen;
    var p_f_vto;
    var p_f_origen;
    var p_f_resolucion;
    var p_d_resolucion; 
    var p_d_observ;
    var p_c_dato;
    var p_d_dato;
    var p_n_orden;
    var p_aux_f_vto;
    var p_f_confirmacion;
    var p_objeto;
    var p_posicion;
    var p_cuota;
    var p_concepto;
    var p_adeudado;
    var p_respuesta;
    var p_actual;
    var p_concurso='';
    var p_quiebra='';
    var p_intimacion='';
    var p_pfp='';
    var p_n_tabla='';
    var p_int_inmob=''; 
    
    
    var main_grid = new GridParam({
            id_menu:v_id_menu,
            n_grid:1,
            m_autoquery:'N'
        });
    

        var grid_diferencia = new GridParam({
            id_menu:v_id_menu,
            n_grid:2,
            m_autoquery:'S'
        });


        $(document).ready(function() {
        eliminar_Datos_tmp();
        initGrillas();
        init_eventos();
        
    });
</script>


<?php
require_once(FRAMEWORK_DIR."footer.php");
?>