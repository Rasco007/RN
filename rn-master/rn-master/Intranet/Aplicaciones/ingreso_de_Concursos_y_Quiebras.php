<?php
require_once(FRAMEWORK_DIR."header.php");

//PONER PARAMETROS DE MI FORM
$p_n_id_menu = $_POST['p_n_id_menu'];
$fecha_hoy = date('d/m/Y');


$lista_formularios = fun_id_lista('LISTADO DE FORMULARIOS DDJJ');
$lista_origenes = fun_id_lista('LISTADO DE ORIGENES DDJJ');
$lista_objeto_hecho = fun_id_lista('LISTADO DE OBJETOS DDJJ MENSUALES');
$lista_conceptos = fun_id_lista('LISTADO CONCEPTOS DDJJ MENSUALES');
$lista_tributos = fun_id_lista('LISTADO DE TRIBUTOS DE INGRESOS BRUTOS CONVENIO');
$lista_documentos = fun_id_lista('LISTADO DE TIPOS DE DOCUMENTO');
$lista_denominaciones = fun_id_lista('LISTA DENOMINACIONES');

#HTML PRINCIPAL
include('ingreso_de_concursos_y_quiebras/html/principal.html');
?>
<style>

</style>
<link rel="stylesheet" type="text/css" href="ingreso_de_concursos_y_quiebras/css/estilos.css">

    <script type='text/javascript' src='ingreso_de_concursos_y_quiebras/js/eventos.js?no_cache=<?=date('dmyhis')?>'></script>
    <script type='text/javascript' src='ingreso_de_concursos_y_quiebras/js/grillas.js?no_cache=<?=date('dmyhis')?>'></script>
    <script>
        var fecha_hoy = '<?=$fecha_hoy?>';
        var v_id_menu = '<?=$p_id_menu?>';
        var proceso;
        var v_id_ddjj;
        var marcar_todas_seleccionado = false;

        let v_lista_formularios = '<?=$lista_formularios?>';
        let v_lista_origenes = '<?=$lista_origenes?>';
        let v_lista_objeto_hecho = '<?=$lista_objeto_hecho?>';
        let v_lista_conceptos = '<?=$lista_conceptos?>';
        let v_lista_tributos = '<?=$lista_tributos?>';
        
        let v_lista_lista_documentos = '<?=$lista_documentos?>';
        var vg_lista_denominaciones = '<?=$lista_denominaciones?>';
        var ajax_autocomplete = null;

        var datos_main_grid = new GridParam({
                id_menu:100132,
                n_grid:0,
                n_orden: 0,
                m_autoquery:'N'    
            });

        var datos_detalles_grid = new GridParam({
            id_menu:100132,
            n_grid:1,
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