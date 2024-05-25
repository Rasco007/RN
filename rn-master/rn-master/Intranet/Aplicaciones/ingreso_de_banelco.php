<?php
#HEADER DEL FRMWK
require_once(INTRANET."header.php");

$p_id_menu = $_POST['p_n_id_menu'];

#HTML PRINCIPAL
include('ingreso_de_banelco/html/main.html');

?>
<script type='text/javascript' src='ingreso_de_banelco/js/eventos.js?no_cache=<?=date('dmyhis')?>'></script>
<script type='text/javascript' src='ingreso_de_banelco/js/funciones.js?no_cache=<?=date('dmyhis')?>'></script>
<script type='text/javascript' src='ingreso_de_banelco/js/grillas.js?no_cache=<?=date('dmyhis')?>'></script>
<script>
    var p_id_menu = '<?=$p_id_menu?>';

    var main_grid = new GridParam({
            id_menu:p_id_menu,
            n_grid:0,
            n_orden:0,
            m_autoquery:'S',
            param:{}
        })


function actualizar_input(){
            $('#ruta_archivo_recibido').val( $('#path_arch_recibido').val() );
        }


    $(document).ready(function(){

        init_grillas();

        init_eventos();

        $('#path_arch_recibido').change(function(){
                $('#ruta_archivo_recibido').val( $('#path_arch_recibido').val() );
            });
        $('#examinar_recibido').click(function(){
                $('#path_arch_recibido').click();
            });
    });

    
</script>
<?php
require_once(FRAMEWORK_DIR."footer.php");
?>