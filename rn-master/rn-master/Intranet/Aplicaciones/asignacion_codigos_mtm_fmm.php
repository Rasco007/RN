<?php
require_once(INTRANET."header.php");
include('asignacion_codigos_mtm_fmm/html/main.html');
// $lista_instancias = fun_id_lista('LISTADO DE TIPO DE INSTANCIA');
// $lista_sec_ori = fun_id_lista('LISTADO SECTOR ORIGEN');
// $lista_mot_ori = fun_id_lista('LISTADO MOTIVO ORIGEN');
// $lista_tipo_documentos = fun_id_lista('LISTADO DE TIPOS DE DOCUMENTO');
$p_id_menu = $_POST['p_n_id_menu'];
$fecha_hoy = date('d/m/Y');
$lista_marcas = fun_id_lista('LISTADO TIPOS MARCAS AUTOS');

$p_c_fmcamod = $_POST['p_c_fmcamod'];

?>
    <script type="text/javascript" src="asignacion_codigos_mtm_fmm/js/eventos.js?no_cache=<?=date('dmyhis')?>"></script>
    <script type="text/javascript" src="asignacion_codigos_mtm_fmm/js/grillas.js?no_cache=<?=date('dmyhis')?>"></script>
    <script type="text/javascript" src="asignacion_codigos_mtm_fmm/js/funciones.js?no_cache=<?=date('dmyhis')?>"></script>
    <script type="text/javascript">
        
        var v_id_menu = '<?=$p_id_menu?>';
        var fecha_hoy = '<?=$fecha_hoy?>';
       
        var v_lista_marcas = '<?=$lista_marcas?>';

        var p_c_fmcamod = '<?=$p_c_fmcamod?>';

        $(document).ready(function() {
            init_eventos();
            init_grillas();
        });
        
    </script>

<?php
require_once(INTRANET."footer.php");
?><?php
