<!-- BEGIN GLOBAL MANDATORY STYLES -->
<!--<link type="text/css" href="http://fonts.googleapis.com/css?family=Open+Sans:400,300,600,700&subset=all" rel="stylesheet"/>-->
<link type="text/css" href="<?=RECURSOS_FRAMEWORK?>global/fonts/google-apis-fonts.css" rel="stylesheet"/>
<link type="text/css" href="<?=RECURSOS_FRAMEWORK?>global/plugins/font-awesome/css/font-awesome.min.css" rel="stylesheet"/>
<link type="text/css" href="<?=RECURSOS_FRAMEWORK?>global/plugins/simple-line-icons/simple-line-icons.min.css" rel="stylesheet"/>
<link type="text/css" href="<?=RECURSOS_FRAMEWORK?>global/plugins/bootstrap/css/bootstrap.min.css" rel="stylesheet"/>
<link type="text/css" href="<?=RECURSOS_FRAMEWORK?>global/plugins/bootstrap-select/css/bootstrap-select.min.css" rel="stylesheet"/>
<link type="text/css" href="<?=RECURSOS_FRAMEWORK?>global/plugins/bootstrap-datepicker/css/bootstrap-datepicker.min.css" rel="stylesheet"/>
<link type="text/css" href="<?=RECURSOS_FRAMEWORK?>global/css/plugins.min.css" rel="stylesheet"/>
<!-- END GLOBAL MANDATORY STYLES -->

<!-- BEGIN GLOBAL PLUGINS STYLES -->
<!-- RESPETAR ORDEN DESCENDENTE -->
<!-- NO REEMPLAZAR jquery-ui.css por jquery-ui.min.css NO SON EQUIVALENTES -->
<link type="text/css" href="<?=RECURSOS_FRAMEWORK?>JqueryUI/1.12.1/jquery-ui.css" rel="stylesheet"/>
<link type="text/css" href="<?=RECURSOS_FRAMEWORK?>JqGrid/5.3.0/css/trirand/ui.jqgrid-bootstrap.css?nocache=<?=rand(1, 100)?>" rel="stylesheet"/>
<link type="text/css" href="<?=RECURSOS_FRAMEWORK?>JqGrid/5.3.0/css/trirand/ui.jqgrid-bootstrap-ui.css?nocache=<?=rand(1, 100)?>" rel="stylesheet"/>
<link type="text/css" href="<?=RECURSOS_FRAMEWORK?>ValidationEngine/2.6.2/validationEngine.jquery.css?nocache=<?=rand(1, 100)?>" rel="stylesheet"/>
<link type="text/css" href="<?=RECURSOS_FRAMEWORK?>JqKeypad/jquery.keypad.css" rel="stylesheet"/>
<!-- END GLOBAL PLUGINS STYLES -->

<!-- BEGIN THEME LAYOUT STYLES -->
<link type="text/css" href="<?=RECURSOS_FRAMEWORK?>layouts/css/layout.min.css" rel="stylesheet"/>
<!-- END THEME LAYOUT STYLES -->

<!-- BEGIN FRMWK STYLES -->
<link type="text/css" href="<?=CSS_FRAMEWORK?>busquedas.css" rel="stylesheet"/>
<link type="text/css" href="<?=CSS_FRAMEWORK?>iconos.css" rel="stylesheet"/>
<link type="text/css" href="<?=APP_FMK_BASEPATH?>cambio_clave/css/estilo_cambio_clave.css" rel="stylesheet"/> 
<!-- END FRMWK STYLES -->

<!-- BEGIN FRMWK JS PLUGINS -->
<!-- The jQuery library is a prerequisite for all jqSuite products -->
<script type="text/javascript" src="<?=RECURSOS_FRAMEWORK?>Jquery/3.1.1/jquery-3.1.1.js"></script>
<script type="text/javascript" src="<?=RECURSOS_FRAMEWORK?>Jquery/migrate/jquery-migrate.min.js"></script>
<!-- NO REEMPLAZAR jquery-ui.js por jquery-ui.min.js NO SON EQUIVALENTES -->
<script type="text/javascript" src="<?=RECURSOS_FRAMEWORK?>JqueryUI/1.12.1/jquery-ui.js"></script>
<script type="text/javascript" src="<?=RECURSOS_FRAMEWORK?>JqGrid/5.3.0/js/trirand/jquery.jqGrid.min.js"></script>
<script type="text/javascript" src="<?=RECURSOS_FRAMEWORK?>JqGrid/5.3.0/js/trirand/i18n/grid.locale-es.js"></script>
<script type="text/javascript" src="<?=RECURSOS_FRAMEWORK?>JqGrid/5.3.0/js/bootstrap.min.js"></script>
<script type="text/javascript" src="<?=RECURSOS_FRAMEWORK?>JqGrid/5.3.0/js/context-menu.js"></script>
<!-- END FRMWK JS PLUGINS -->

<!-- BEGIN FRMWK JS SCRIPTS -->
<script type="text/javascript" src="<?=APP_FMK_BASEPATH?>cambio_clave/js/funciones_cambio_clave.js"></script>
<?php
	$GRID_CREATOR_PATH = JS_FRAMEWORK;
	if(file_exists(FRAMEWORK_PROYECTO_DIR."JS/grid_creator.js")) {
		$GRID_CREATOR_PATH = JS_FRAMEWORK_PROY;
	}
?>
<script type="text/javascript" src="<?=$GRID_CREATOR_PATH?>grid_creator.js"></script>
<!-- END FRMWK JS SCRIPTS -->

<script type="text/javascript">
	if($.fn.button.noConflict) {
		$.fn.btn = $.fn.button.noConflict();
	} 
</script>
