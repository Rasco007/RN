<?php
	require_once(INTRANET."header.php");

	checklogin();
	$m_autoquery = $_POST['p_m_autoquery'];
?>

<table id='grid_reportes' class='scroll' cellpadding='0' cellspacing='0'><tr><td>&nbsp;</td></tr></table>
<div id='grid_reportes_pager' class='scroll' style='text-align:center;'></div>
<script type="text/javascript">
	var datos_reportes_grid = new GridParam({
		id_menu:<?=$_POST['p_n_id_menu'] ?>, 
		n_grid:0,
		m_autoquery:'<?=$m_autoquery?>'
	});
	
	function lupas_reportes(formid){
		$('#d_imagen_izq',formid).lupa_generica({
			titulos:['Codigo de la Imagen','Descripcion'],
			grid:[{index:'c_codigo',width:125},
				  {index:'d_descrip',width:200}
				 ],
			caption:'Lista de Imagenes',
			sortname:'d_descrip',
			sortorder:'asc',
			filtros:['null'],
			campos:{c_codigo:'c_imagen_fir_izq',d_descrip:'d_imagen_izquierda'},
			keyNav:true			
		});
		
		$('#d_imagen_cen',formid).lupa_generica({
			titulos:['Codigo de la Imagen','Descripcion'],
			grid:[{index:'c_codigo',width:125},
				  {index:'d_descrip',width:200}
				 ],
			caption:'Lista de Imagenes',
			sortname:'d_descrip',
			sortorder:'asc',
			filtros:['null'],
			campos:{c_codigo:'c_imagen_fir_cen',d_descrip:'d_imagen_central'},
			keyNav:true			
		});
		
		$('#d_imagen_der',formid).lupa_generica({
			titulos:['Codigo de la Imagen','Descripcion'],
			grid:[{index:'c_codigo',width:125},
				  {index:'d_descrip',width:200}
				 ],
			caption:'Lista de Imagenes',
			sortname:'d_descrip',
			sortorder:'asc',
			filtros:['null'],
			campos:{c_codigo:'c_imagen_fir_der',d_descrip:'d_imagen_derecha'},
			keyNav:true
		});
		
		$('#d_tipo',formid).lupa_generica({
			titulos:['Código','Descripción'],
			grid:[{index:'c_codigo',width:125},
				  {index:'d_descrip',width:150}
				 ],
			caption:'Tipos de Impresión',
			sortname:'d_descrip',
			sortorder:'asc',
			filtros:['null'],
			campos:{c_codigo:'c_tipo',d_descrip:'d_tipo'},
			keyNav:true
		});
		
		$('#d_codificacion',formid).lupa_generica({
			titulos:['Código','Descripción'],
			grid:[{index:'c_codigo',width:125},
				  {index:'d_descrip',width:150}
				 ],
			caption:'Codificación',
			sortname:'d_descrip',
			sortorder:'asc',
			filtros:['null'],
			campos:{c_codigo:'c_tipo_codificacion',d_descrip:'d_codificacion'},
			keyNav:true
		});
	}

	$(document).ready(function() {
		
		$("#grid_reportes").jqGrid({
			colNames : datos_reportes_grid.colNames(),
			colModel : datos_reportes_grid.colModel(),
			pager : $('#grid_reportes_pager'),
			caption : "Reportes",
			postData : datos_reportes_grid.postData(),
			editurl: FUNCIONES_BASEPATH+"maestro_abm_grid.php"
		}).navGrid('#grid_reportes_pager', {add:true,edit:true,del:true}, 	
			{
				left: 300,
				width:850,
				onInitializeForm:defaultInitForm(function(formid){
					lupas_reportes(formid);
				}),
				beforeShowForm:defaultBeforeShowForm(function(formid) {
					$('#c_tipo_reporte',formid).attr('disabled', true);
					$('#c_tipo_reporte',formid).attr('readonly', true);
				})
			}, // edit options
			{
				left: 300,
				width:850,
				closeAfterAdd:true,	
				onInitializeForm:defaultInitForm(function(formid){
					lupas_reportes(formid);
				}),
				beforeShowForm:defaultBeforeShowForm(function(formid) {
					$('#c_tipo_reporte',formid).attr('disabled', false);
					$('#c_tipo_reporte',formid).attr('readonly', false);
					
					$('#c_tipo',formid).val('GEN');
					$('#d_tipo',formid).val('Genérico');
					$('#c_tipo_codificacion',formid).val('JASPER');
					$('#d_codificacion',formid).val('JASPER REPORTS');
				})
			}, //alta
			{}, //del
			{}//search
		);
		alto_grilla_dinamico();
	});
</script>

<?php
	require_once(INTRANET."footer.php");
?>
