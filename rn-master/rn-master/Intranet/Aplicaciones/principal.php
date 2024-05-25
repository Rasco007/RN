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
require_once(INTRANET."header.php");
?>

<!-- BEGIN PORTLET-->
<div class="portlet light">

</div>
<!-- END PORTLET-->


<?php
require_once(INTRANET."footer.php");
?>
<script>
	$(document).ready(function() {
		$('.menu-toggler.sidebar-toggler').click();
	});
</script>
