<?php
require_once(FRAMEWORK_DIR."header.php");

//PONER PARAMETROS DE MI FORM
$p_n_id_menu = $_POST['p_n_id_menu'];
$fecha_hoy = date('d/m/Y');

$lista_denominaciones = fun_id_lista('LISTA DENOMINACIONES');
$lista_objeto_hecho = fun_id_lista('LISTA OBJETOS HECHOS EMISION BOLETAS AGRUPADAS / CON JUICIO');
$lista_tributo = fun_id_lista('LISTADO DE TRIBUTOS DE INGRESOS DE BRUTOS');
$lista_concepto = fun_id_lista('LISTADO DE CONCEPTOS MENSUALES Y ANUALES');

#HTML PRINCIPAL
include('baja_de_ddjj_sr/html/principal.html');
include('baja_de_ddjj_sr/html/modal.html');
?>
<style>

</style>
    <script type='text/javascript' src='baja_de_ddjj_sr/js/eventos.js?no_cache=<?=date('dmyhis')?>'></script>
<!---    <script type='text/javascript' src='planes_fiscalizacion/js/funciones.js?no_cache=<?=date('dmyhis')?>'></script>-->
    <script type='text/javascript' src='baja_de_ddjj_sr/js/grillas.js?no_cache=<?=date('dmyhis')?>'></script>
    <script>
        var fecha_hoy = '<?=$fecha_hoy?>';
        var p_modo = '<?=$p_modo?>';
        
        let v_lista_lista_documentos = '<?=$lista_documentos?>';
        var vg_lista_denominaciones = '<?=$lista_denominaciones?>';
        var v_lista_objeto_hecho = '<?=$lista_objeto_hecho?>';
        var v_lista_tributo = '<?=$lista_tributo?>';
        var v_lista_concepto = '<?=$lista_concepto?>';
        
        var ajax_autocomplete = null;

        var datos_main_grid = new GridParam({
                id_menu:<?=$_POST['p_n_id_menu']?>,
                n_grid:0,
                n_orden: 0,
                m_autoquery:'N'
            });
  
        var datos_detalles_grid = new GridParam({
            id_menu:<?=$_POST['p_n_id_menu']?>,
            n_grid:1,
            n_orden: 1,
            m_autoquery:'N'
        });

        var proceso;
        var v_id_menu = '<?=$p_n_id_menu?>';
       

        $(document).ready(function() {

            inicializarGrillas();
            inicializa_eventos();

            inicializa_lupas();
        });

    </script>

<?php
require_once(FRAMEWORK_DIR."footer.php");
?>