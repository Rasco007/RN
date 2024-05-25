<?php
// Me fijo que esté logueado
if(!isset($_SESSION['usuario'])) {
    session_destroy();
	header ("Location: ../index.php?error=NoLog");
	exit;
}
if((time() - $_SESSION['timeout']) > TIMEOUT){  //SI PASAN EL TIMEOUT SE DELOGUEA
    session_destroy();
	header ("Location: ../index.php?error=Timeout");
	exit;
}
check_token();
$plugins_module = 'BOOTSTRAP';  // UI o BOOTSTRAP
require_once(EXTRANET."header.php");

?>

<!-- BEGIN PORTLET-->
<div class="portlet light">
   
</div>
<!-- END PORTLET-->

<?php
    require_once(EXTRANET."footer.php");
?>

<script>
	$(document).ready(function() {
		$('.menu-toggler.sidebar-toggler').click();

		/*//Ventanilla Electrónica. Necesitamos el footer con el JS de Frmwk y los elementos del documento.
        if (<?=$cant_msj?> > 0 ){
            $('#cantidad_msj').css("background-color","#B21B00");
        }

        if (<?=$cant_notif?> > 0 ){
            $('#cantidad_notif').css("background-color","#B21B00");
            $("[id^=id_li_]").remove();
            mostrar_mensaje_modal('E','ALERTA','' +
                'Existen notificaciones electrónicas pendientes. ' +
                'Para continuar operando con nuestro sistema debes leerlas y notificarte. ',null,null,null,null,350);
        }*/

	});
</script>
