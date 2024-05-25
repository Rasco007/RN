<?php
	require_once(INTRANET."header.php");
	$m_autoquery = $_POST['p_m_autoquery'];
?>

<table id='main_grid' class='scroll' cellpadding='0' cellspacing='0'><tr><td>&nbsp;</td></tr></table>
<div id='main_grid_pager' class='scroll' style='text-align:center;'></div><br />

<div id='ver_img' class="modal fade" tabindex="-1" role="dialog">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title">Visualizaci&oacute;n de Imagen</h4>
      </div>
      <div class="modal-body">
			<div id='contenedor_imagen_ampliada' style='height:auto;width:auto;'></div>
      </div>
      <div class="modal-footer">
        <button id='btn_salir_visualizacion' type="button" class="btn btn-default" data-dismiss="modal">Salir</button>
      </div>
    </div><!-- /.modal-content -->
  </div><!-- /.modal-dialog -->
</div><!-- /.modal -->

<div id='cargar_img' class="modal fade" tabindex="-1" role="dialog">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title">Carga de Imagen</h4>
      </div>
      <div class="modal-body">
			<div class='row'>
				<div class="form-group col-md-12">
						<div class="input-group">					  
							<input id="upload-file-info" type="text" class="form-control input" placeholder="Presione Elegir Imagen...">
							<span class="input-group-btn" style="font-size:inherit">    				  	
								<label class="btn btn-default btn-file">
									Elegir Imagen <input id='archivo' name='c_img_div' type="file" style="display: none;" onchange="$('#upload-file-info').val($(this).val())">
								</label>
							</span>					
						</div>	
				</div>  
			</div>
      </div>
      <div class="modal-footer">
        <button id='btn_cancelar_carga' type="button" class="btn btn-default" data-dismiss="modal">Cancelar</button>
        <button id='btn_cargar_img' type="button" class="btn btn-primary">Cargar Imagen</button>
      </div>
    </div><!-- /.modal-content -->
  </div><!-- /.modal-dialog -->
</div><!-- /.modal -->

<script type="text/javascript" src="<?=BASEPATH_ENTORNO.'Aplicaciones/abm_imagen/js/elementos.js'?>"></script>
<script type="text/javascript" src="<?=BASEPATH_ENTORNO.'Aplicaciones/abm_imagen/js/grillas.js'?>"></script>
<script type="text/javascript" src="<?=BASEPATH_ENTORNO.'Aplicaciones/abm_imagen/js/lupas.js'?>"></script>
<script type="text/javascript" src="<?=BASEPATH_ENTORNO.'Aplicaciones/abm_imagen/js/funciones.js'?>"></script>
<script type="text/javascript" src="<?=BASEPATH_ENTORNO.'Aplicaciones/abm_imagen/js/eventos.js'?>"></script>

<script type="text/javascript">

// definición de variables globales a todo aplicacion.php y los archivos de la carpeta /aplicacion/js/ que fueron incluidos

// definici?n de objeto de grillas
var datos_main_grid = new GridParam({id_menu:<?=$_POST['p_n_id_menu']?>,
										n_grid:0,
										m_autoquery:'<?=$m_autoquery?>'});

var p_n_id_menu = <?=$_POST['p_n_id_menu'];?>;

$(document).ready(function() {

	inicializarElementos(p_n_id_menu); // dialogs, buttons, tabs
	inicializarEventos(p_n_id_menu); // click, focusout, focusin, blur, datepicker (onClose), autocomplete, change
	inicializarGrillas(p_n_id_menu); // jqGrid
	alto_grilla_dinamico();
});

</script>
<?php
	require_once(INTRANET."footer.php");
?>