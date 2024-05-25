<?php
require_once(FRAMEWORK_DIR."header.php");

//PONER PARAMETROS DE MI FORM
$p_n_id_menu = $_POST['p_n_id_menu'];
$fecha_hoy = date('d/m/Y');
//$p_modo = $_POST['p_modo'];

$n_cuit = $_POST['p_n_cuit'];
$d_denominacion = $_POST['p_d_denominacion'];
$sexo_filtro = $_POST['p_sexo_filtro'];
$d_calle = $_POST['p_d_calle'];
$f_alta = $_POST['p_f_alta'];
$f_nac = $_POST['p_f_nac'];


$lista_fechas_novedad = fun_id_lista('LISTA FECHAS NOVEDAD AFIP002H');

#HTML PRINCIPAL
include('AFIP002H/html/principal.html');
include('AFIP002H/html/modal.html');
?>
    <link rel="stylesheet" type="text/css" href="AFIP002H/css/styles.css?no_cache=<?=date('dmyhis')?>'" />

<script type='text/javascript' src='AFIP002H/js/grillas.js?no_cache=<?=date('dmyhis')?>'></script>

    <script type='text/javascript' src='AFIP002H/js/eventos.js?no_cache=<?=date('dmyhis')?>'></script>
    <script>
        var fecha_hoy = '<?=$fecha_hoy?>';
        var v_n_cuit = '<?=$n_cuit?>';
        var v_d_denominacion = '<?=$d_denominacion?>';
        var v_sexo_filtro = '<?=$sexo_filtro?>';
        var v_d_calle = '<?=$d_calle?>';
        var v_f_alta = '<?=$f_alta?>';
        var v_f_nac = '<?=$f_nac?>';
        
        
        
        var v_lista_fechas_novedad = '<?=$lista_fechas_novedad?>';
      
        
        var ajax_autocomplete = null;
        var filtros_no_nativos_ar = new Array();
        var filtros_arr_main = [];
        var v_no_carga_inicial_pph = false;

        var v_id_menu = '<?=$p_n_id_menu?>';
        filtros_no_nativos_ar['main_grid'] = new Array();


        var datos_main_grid = new GridParam({
                id_menu:'<?=$p_n_id_menu?>',//tratar de traer el menu de alguna forma
                n_grid:0,
                n_orden: 0,
                m_autoquery:'S',
                param: {':p_n_cuit':v_n_cuit}
            });

        $(document).ready(function() {
            //inicializa_lupas();
            inicializarGrillas();
            inicializa_eventos();
        });

    </script>

<?php
require_once(FRAMEWORK_DIR."footer.php");
?>