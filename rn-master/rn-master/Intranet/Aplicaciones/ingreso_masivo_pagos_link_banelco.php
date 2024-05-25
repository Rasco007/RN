<?php
require_once(FRAMEWORK_DIR."header.php");

$lista_entidades = fun_id_lista('LISTA DE ENTIDADES');
$fecha_hoy = date('d/m/Y');

include('ingreso_masivo_pagos_link_banelco/HTML/principal.html');

?>
<script type='text/javascript' src='ingreso_masivo_pagos_link_banelco/JS/eventos.js?no_cache=<?=date('dmyhis')?>'></script>
<script type='text/javascript' src='ingreso_masivo_pagos_link_banelco/JS/funciones.js?no_cache=<?=date('dmyhis')?>'></script>

<script>
    function actualizar_input(){
        $('#ruta_archivo_recibido').val( $('#path_arch_recibido').val() );
        $('#ruta_archivo_salida').val( $('#path_arch_salida').val() );
    }

    var v_lista_entidades = '<?=$lista_entidades?>';
    var fecha_hoy = '<?=$fecha_hoy?>';

     $(document).ready(function() {
        inicializarLupas();
        inicializarEventos();
        
        $('#examinar_recibido').click(function(){
                $('#path_arch_recibido').click();
        });
        $('#path_arch_recibido').change(function(){
                $('#ruta_archivo_recibido').val( $('#path_arch_recibido').val() );
        });
    });

    var proceso;
</script>

<?php
require_once(FRAMEWORK_DIR."footer.php");
?>