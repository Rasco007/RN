// MPampín
// Búsquedas con grillas

(function() {
	$.fn.busquedaGrilla = function(settings) {

		// Funciona para el primer elemento que trae
		var caller = this[0];
		var randomnumber = Math.floor(Math.random() * 1001);
		var filtro_id = 'busq_grid_filtro'+randomnumber;
		var grid_id = 'busq_grid_tb'+randomnumber;
		var pager_id = 'busq_grid_tb_pg'+randomnumber;
		
		// Parámetros por default
		settings = jQuery.extend({
			zIndex : 950,
			id_menu : null,
			n_grid : null,
			width : 850,
			height : 500,
			caption : "Búsqueda",
			campo_id : null,
			onSelectRow : null
		}, settings);
		
		$(caller).html("<div id='"+filtro_id+"'></div>"+
					   "<table id='"+grid_id+"' class='scroll' cellpadding='0' cellspacing='0'></table>"+
        			   "<div id='"+pager_id+"' class='scroll' style='text-align: center;'></div>");
		
		$(caller).css('zIndex',settings.zIndex);
		$(caller).dialog({
			width:settings.width,
			height:settings.height,
			title:'Buscar',
			modal:true,
			buttons:{
				'Cancelar':function() {$(this).dialog('close');},
				'Aceptar':function() {
					var rowid = $("#"+grid_id).getGridParam('selrow');
	    			var data = $("#"+grid_id).getCell(rowid,settings.campo_id);
	    			settings.onSelectRow(data);
	    			$(this).dialog('close');
				}
			}
		});
		
		$("#"+filtro_id).crearBusquedaMasiva({
			p_n_id_menu:settings.id_menu,
			p_n_grid:settings.n_grid,
			afecta_grid:[grid_id],
			adv:'S'
		});
				
		var datos_grid = new GridParam({id_menu:settings.id_menu,
										n_grid:settings.n_grid,
										m_autoquery:'N'});										  
		
		$("#"+grid_id).jqGrid({
			colNames:datos_grid.colNames(),
			colModel:datos_grid.colModel(),
			pager: $("#"+pager_id),
			caption:settings.caption,
			postData:datos_grid.postData(),
			ondblClickRow: function(rowid) { 
    			var data = $(this).getCell(rowid,settings.campo_id);
    			settings.onSelectRow(data);
    			$(caller).dialog('close');
    		}
		}).navGrid("#"+pager_id,{refresh:true});
	};
})(jQuery);