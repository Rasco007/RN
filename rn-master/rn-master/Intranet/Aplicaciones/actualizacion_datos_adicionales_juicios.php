<?php
require_once(INTRANET."header.php");
include('actualizacion_datos_adicionales_juicios/html/main.html');

$p_id_menu = $_POST['p_n_id_menu'];
$fecha_hoy = date('d/m/Y');
$lista_repre = fun_id_lista('LISTADO DE REPRESENTANTES');
$lista_patro = fun_id_lista('LISTADO DE PATROCINANTES');
?>

    <script type="text/javascript" src="actualizacion_datos_adicionales_juicios/js/eventos.js?no_cache=<?=date('dmyhis')?>"></script>

    <script type="text/javascript">
        var v_id_menu = '<?=$p_id_menu?>';
        var main_grid_datos;
        var fecha_hoy = '<?=$fecha_hoy?>';
        var v_lista_repre = '<?=$lista_repre?>';
        var v_lista_patro = '<?=$lista_patro?>';
       
        $(document).ready(function() {
            init_eventos();
        });
        
    </script>

<?php
require_once(INTRANET."footer.php");
?><?php
