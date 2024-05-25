<?php
require_once(FRAMEWORK_DIR."header.php");

//PONER PARAMETROS DE MI FORM
$p_n_id_menu = $_POST['p_n_id_menu'];

$cant_reg = $_POST['p_cant_reg'];
$secuencia = $_POST['p_secuencia'];
$d_denominacion = $_POST['p_d_denominacion'];
$p_estado = $_POST['p_estado'];
$linea = $_POST['p_linea'];



//$lista_trib = fun_id_lista('LISTADO DE TRIBUTOS INGRSO DE ARCHIVOS BANELCO');
//$lista_concepto = fun_id_lista('LISTA DE CONCEPTOS INGRESO DE ARCHIVO BANELCO');


#HTML PRINCIPAL
include('SIFERE_carga_archivo_MOVBAN/html/principal.html');
?>
    <script type='text/javascript' src='SIFERE_carga_archivo_MOVBAN/js/eventos.js?no_cache=<?=date('dmyhis')?>'></script>
    <script type='text/javascript' src='SIFERE_carga_archivo_MOVBAN/js/funciones.js?no_cache=<?=date('dmyhis')?>'></script>
    <script type='text/javascript' src='SIFERE_carga_archivo_MOVBAN/js/grillas.js?no_cache=<?=date('dmyhis')?>'></script>
    <script>

        var proceso;
        var v_id_menu = '<?=$p_n_id_menu?>';

        var datos_main_grid_rechazos = new GridParam({id_menu:v_id_menu,
            n_grid:0,
            m_autoquery:'N'});

        function actualizar_input(){
            $('#ruta_archivo_recibido').val( $('#path_arch_recibido').val() );
        }

        $(document).ready(function() {
            //inicializarLupas();
            inicializarEventos();
            inicializarGrillas();
        });


    </script>

<?php
require_once(FRAMEWORK_DIR."footer.php");
?>