<?php
#HEADER DEL FRMWK
require_once(INTRANET."header.php");
#HTML PRINCIPAL
include('actualizacion_de_fecha_de_presentacion_CYQ/html/main.html');
$p_n_id_menu = $_POST['p_n_id_menu'];
$fecha_hoy = date('d/m/Y');
?>
<script type="text/javascript" src="actualizacion_de_fecha_de_presentacion_CYQ/js/eventos.js?no_cache=<?=date('dmyhis')?>"></script>
<script type="text/javascript" src="actualizacion_de_fecha_de_presentacion_CYQ/js/grilla.js?no_cache=<?=date('dmyhis')?>"></script>
<script type="text/javascript" src="actualizacion_de_fecha_de_presentacion_CYQ/js/funciones.js?no_cache=<?=date('dmyhis')?>"></script>
<script type='text/javascript'>
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
    var v_id_menu = '<?=$p_n_id_menu?>';
    
    var main_grid = new GridParam({
            id_menu:v_id_menu,
            n_grid:1,
            m_autoquery:'N'
        });
    
        $(document).ready(function() {
        initGrillas();
        init_eventos();
    });
</script>


<?php
require_once(FRAMEWORK_DIR."footer.php");
?>