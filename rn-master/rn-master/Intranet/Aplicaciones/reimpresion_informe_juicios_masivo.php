<?php
require_once(FRAMEWORK_DIR."header.php");

$fecha_hoy = date('d/m/Y');
$p_n_id_menu = $_POST['p_n_id_menu'];
$p_id_workflow_log = $_POST['p_id_workflow_log'];
$p_c_tarea = $_POST['p_c_tarea'];
$p_id_grupo = $_POST['p_id_grupo'];
$p_n_seleccion = $_POST['p_n_seleccion'];

include('reimpresion_informe_juicios_masivo/html/principal.html');

?>
<script type='text/javascript' src='reimpresion_informe_juicios_masivo/js/eventos.js?no_cache=<?=date('dmyhis')?>'></script>
<script type='text/javascript' src='reimpresion_informe_juicios_masivo/js/funciones.js?no_cache=<?=date('dmyhis')?>'></script>
<script type='text/javascript' src='reimpresion_informe_juicios_masivo/js/grillas.js?no_cache=<?=date('dmyhis')?>'></script>
<script type='text/javascript' src='workflow_general/js/funciones.js?no_cache=<?=date('dmyhis')?>'></script>

<script>
    var v_id_menu = '<?=$p_n_id_menu?>';
    var v_lista_boletas = '<?=fun_id_lista('LISTADO DE BOLETAS REIMPR JUICIOS')?>';
    var v_lista_denominaciones = '<?=fun_id_lista('LISTA DENOMINACIONES REIMPR JUICIOS')?>';
    var v_lista_expedientes = '<?=fun_id_lista('LISTADO EXPEDIENTES REIMPR JUICIOS')?>';

    var ajax_autocomplete;

    var fecha_hoy = '<?=$fecha_hoy?>';
    var resultado_cargado = false;
    
    var v_chk_crear_pdf = 'N';
    var v_fecha_envio;
    var v_id_contribuyente;
    var v_f_confirmacion;
    var v_n_cuit;
    var v_d_denominacion;
    var v_expediente;
    var v_masivo = 'N';

    var p_id_workflow_log = '<?=$p_id_workflow_log ?>';
    var p_c_tarea = '<?=$p_c_tarea ?>';
    var p_id_grupo = '<?=$p_id_grupo ?>';
    var p_n_seleccion = '<?=$p_n_seleccion ?>';

    var resultado_generacion_grid = new GridParam({
        id_menu: v_id_menu,
        n_grid:0,
        n_orden:0,
        m_autoquery:'N',
        param:{}
    });

    $(document).ready(function() {
        //Borrar tabla tmp
        $.ajax({
            type:'POST',
            url: FUNCIONES_BASEPATH+'maestro_abm.php',
            data:{      
             
             "id_menu":v_id_menu,
             "n_orden":2
            },
            dataType:'json',
            success: function( data ) {
                if(data.resultado == 'OK'){
                  
                }
                else{
                    mostrar_cuadro('E', 'Error', data.resultado);
                    return;
                }
            }
        }); 
        
        inicializarEventos();
        inicializarGrillas();
    });
</script>

<?php
require_once(FRAMEWORK_DIR."footer.php");
?>