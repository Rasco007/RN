<?php
#HEADER DEL FRMWK
require_once(INTRANET."header.php");
#HTML PRINCIPAL
include('distribucion_fecha_de_acreditacion/html/main.html');
$p_id_menu = $_POST['p_n_id_menu'];
$fecha_hoy = date('d/m/Y');
?>
<script type='text/javascript' src='distribucion_fecha_de_acreditacion/js/eventos.js?no_cache=<?=date('dmyhis')?>'></script>
<script type='text/javascript' src='distribucion_fecha_de_acreditacion/js/funciones.js?no_cache=<?=date('dmyhis')?>'></script>
<script type='text/javascript' src='distribucion_fecha_de_acreditacion/js/grilla.js?no_cache=<?=date('dmyhis')?>'></script>

<script>
    var seleccionados = [];
    var estadosSeleccionado = [];
    var p_id_menu = '<?=$p_id_menu?>';
    var fecha_hoy='<?=$fecha_hoy?>';
    var p_archivo='BAN';
    var p_archivo_aux='BAN';
    var p_filtro='-1-2-3-4-';
    var p_f_desde='01/01/2010';
    var p_f_hasta='<?=$fecha_hoy?>';
    var p_id_archivo=20824;
    var archivo_id;
    var p_sel='-';
    var p_suma_percibido=0;
    var p_sum_t_total_importe_pesos=0;
    var p_sum_t_importe_contracargo=0;
    var p_sum_t_importe_devolucion=0;
    var p_sum_t_importe_neto=0;
    var p_sum_t_importe_comision=0;
    var p_sum_t_importe_impuesto=0;
    var id_sumas=[];
    var textoGrilla="DETALLE DE ARCHIVO: BANELCO";
    var p_id_sesion;

    function selectCheck(id_row,id){
        
        let numberFound = false;
        let check = $('#check_select_'+p_archivo+id_row).is(':checked')?'S':'N';
        
        
        let length=seleccionados.length;

        if(check == 'S'){
        
        
        p_sel=p_sel+id+'-';
        $("#p_sel").val(p_sel);
        seleccionar_archivo(id,p_archivo);
        
            
        }
        else{

            deseleccionar_archivo(id,p_archivo);

            estadosSeleccionado = estadosSeleccionado.filter((item)=>item !=c_estado);

            p_sel=p_sel.replace("-"+id,'');



            }

                return id;
    }

    var main_grid = new GridParam({
        id_menu:p_id_menu,
        n_grid:0,
        // n_orden:0,
        m_autoquery:'S',
        param:{'p_tipo_archivo':p_archivo,
                'p_filtro':p_filtro,
                'p_f_desde':p_f_desde,
                'p_f_hasta':p_f_hasta
                }
    });

    var main_grid_ban = new GridParam({
        id_menu:p_id_menu,
        n_grid:3,
        // n_orden:0,
        m_autoquery:'S  ',
        param:{
                'p_filtro':p_filtro,
                'p_f_desde':p_f_desde,
                'p_f_hasta':p_f_hasta,
                'p_id_sesion':$("#id_sesion").val(),
                }
    });

    var main_grid_intbk = new GridParam({
        id_menu:p_id_menu,
        n_grid:4,
        // n_orden:0,
        m_autoquery:'N',
        param:{
                'p_filtro':p_filtro,
                'p_f_desde':p_f_desde,
                'p_f_hasta':p_f_hasta,
                'p_id_sesion':$("#id_sesion").val(),
                }
    });

    var main_grid_epago = new GridParam({
        id_menu:p_id_menu,
        n_grid:5,
        // n_orden:0,
        m_autoquery:'N',
        param:{
                'p_filtro':p_filtro,
                'p_f_desde':p_f_desde,
                'p_f_hasta':p_f_hasta,
                'p_id_sesion':$("#id_sesion").val(),
                }
    });

    var detalle_grid = new GridParam({
        id_menu:p_id_menu,
        n_grid:1,
        // n_orden:0,
        m_autoquery:'S',
        param:{'p_archivo':p_archivo,
                'p_id_archivo':p_id_archivo}
    });
    var suma_grid = new GridParam({
        id_menu:p_id_menu,
        n_grid:2,
        // n_orden:0,
        m_autoquery:'S',
        param:{'p_filtro':p_filtro,
                'p_tipo_archivo':p_archivo,
                'p_sel': true,
                'p_f_desde':p_f_desde,
                'p_f_hasta':p_f_hasta,
                'p_suma_percibido':p_suma_percibido,
                'P_SUM_T_TOTAL_IMPORTE_PESOS':p_sum_t_total_importe_pesos,
                'P_SUM_T_IMPORTE_CONTRACARGO':p_sum_t_importe_contracargo,
                'P_SUM_T_IMPORTE_DEVOLUCION':p_sum_t_importe_devolucion,
                'P_SUM_T_IMPORTE_NETO':p_sum_t_importe_neto,
                'P_SUM_T_IMPORTE_COMISION':p_sum_t_importe_comision,
                'P_SUM_T_IMPORTE_IMPUESTO':p_sum_t_importe_impuesto            
            
            }
    });

     $(document).ready(function() {
        obtener_id_sesion();
        init_grillas();
        init_eventos();

    });
    
</script>
<?php
require_once(FRAMEWORK_DIR."footer.php");
?>
