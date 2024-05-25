function doSearch(){
	var mask=$("#search_lupa").val();

	$("#tabla_lupa").jqGrid('setGridParam',
		{url:globUrlAjaxWebservice+'scf_lupa_loader.php?status=lupa&cond='+mask})
		.trigger("reloadGrid");
}

(function() {

	$.fn.lupa_generica = function (_settings) {

		if(this.length == 0) return;
		var caller = this[0];

		// Parámetros por default
		var settings = jQuery.extend({
			zIndex:1001,
			grid:[{index:'codigo'},{index:'descripcion', width:200}],
			titulos:['Codigo','Descripcion'],
			caption:"Lista de Valores",
			height:400,
			width:700,
			widthGrid:630,
			heightGrid:200,
			sortname:'1',
			sortorder:'asc',
			campos:{caller:'codigo'},
			onClick:true,
			onKeydown:true,
			onClose:function() {},
			onSelectRow:function() {},
			keyNav:true,
			foco:caller,
			filtros:[],
			filtrosTitulos:[],
			filtroNull:false,
			filtrosNulos:[],
			filtroBuscar:null,
			allKeysOpen: true,
			mensajeRelacionado:[],
			// Campos de lupa_cod
			showGrid: true,
			searchCode: false,
			searchOnInitialize: false,
			searchInput: "#"+caller.id,
			exactField: 'c_codigo',
			notFoundDialog: true,
			limpiarCod: false,
			selectOnDelete: false
		}, _settings);

		settings.id_lista = settings.id_lista || $(caller).attr('data-id-lista');
		settings.id_dialog = $('#'+$(caller).attr('id')).parent().parent().parent().parent().attr('id') || _settings.id_dialog;

		var armar_filtros = function() {

			var arr_filtros = new Array();
			for(k=0; k<(settings.filtros).length; k++){
				if(settings.filtros[k] != null && settings.filtros[k][0] == '#'){
					if(!$(settings.filtros[k]).val()){
						if(!settings.filtroNull && !settings.filtrosNulos[k]){
							if(settings.mensajeRelacionado[k] != null || typeof(settings.mensajeRelacionado[k]) != 'undefined'){
								alert(settings.mensajeRelacionado[k]);
							}else{
								if(settings.filtrosTitulos[k] == null || typeof(settings.filtrosTitulos[k]) === 'undefined'){
									settings.filtrosTitulos[k]	= 'relacionado';
								}
								alert('Debe seleccionar el campo '+settings.filtrosTitulos[k]);
							}
							return false;
						}else{
							arr_filtros[k] = null;
						}
					}else{
						arr_filtros[k] = $(settings.filtros[k]).val();
					}
				}else{

					arr_filtros[k] = settings.filtros[k];
				}
			}
			return JSON.stringify(arr_filtros);
		};

		var lupa_action = function () {

			var filtros = armar_filtros();
			if(!filtros) return;

			$("#div_lupa").remove();

			$('body').append(
				"    <div id='div_lupa'>"+
				"        <div class='panel-body' id='show'>"+
				"            <table id='tabla_lupa' class='table table-hover'>"+
				"                <thead></thead>"+
				"                <tbody></tbody>"+
				"                <tfoot></tfoot>"+
				"            </table>"+
				"            <table id='pag_lupa' class='table table-hover'></table>"+
				"        </div>"+
				'		<div class="container col-md-12">'+
				'			<form class="form-inline" onSubmit="return false;">'+
				'  				<div class="form-group col-xs-8">'+
				'    				<input type="text" class="form-control" id="search_lupa" placeholder="Ingrese un texto para filtrar la búsqueda..." style="width:100%;">'+
				'  				</div>'+
				"   			<button type='button' name='btn_buscar_lupa' onClick=doSearch() id='btn_buscar_lupa' class='btn btn-primary'>Buscar</button>"+
				"			</form>"+
				"		</div>"+
				"</div>"
				);		

			$("#btn_buscar_lupa").button();


			$("#search_lupa").keyup(function(event){
				if(event.keyCode == 13){
					$("#btn_buscar_lupa").click();
				}
			});

			if(!settings.allKeysOpen || settings.filtroBuscar != null){
				if($(caller).val() != null){
					$("#search_lupa").val($(caller).val());
				}

				if(settings.filtroBuscar != null){
					$("#search_lupa").val($(settings.filtroBuscar).val());
				}
			}

			//CREO EL DIALOGO
			$("#div_lupa").dialog({
				bgiframe:true,
				modal:true,
				width:settings.width,
				height:settings.height,
				position: {my: "center", at: "center", of: "#"+settings.id_dialog},
				resizable: true,
				title: settings.caption,
				close: function(event, ui) {
					settings.onClose();
				}

			});

			$("#div_lupa").parent().css('z-index',settings.zIndex);

			//GENERO LAS COLUMNAS QUE TENDRA LA GRILLA
			var arr_colGrid = new Array();
			var indices = new Array();
			var j = 0;
			for (i=0; i<settings.grid.length; i++){
				arr_colGrid[i] = $.extend({
						name:settings.grid[i].index,
						index:settings.grid[i].index,
						hidden:false,
						width:100},
					settings.grid[i]);

				if(!settings.grid[i].hidden){
					indices[j] = settings.grid[i].index;
					j++;
				}
			}

			var campos = JSON.stringify(indices);

			var id_menu = settings.id_menu;

			//CREO LA GRILLA
			$("#tabla_lupa").jqGrid({
				url:globUrlAjaxWebservice+"scf_lupa_loader.php?status=lupa&cond="+$("#search_lupa").val(),
				postData:{'filtros':filtros,'tipo':settings.id_lista,'campos':campos, 'id_menu':id_menu},
				width: settings.widthGrid,
				height: settings.heightGrid,
				colNames: settings.titulos,
				colModel: arr_colGrid,
				sortname: settings.sortname,
        		export_data: false,
				sortorder: settings.sortorder,
				pager: '#pag_lupa',
				caption:settings.caption ,
				loadComplete : function(data) {
					if(settings.keyNav){
						var first = $("#tabla_lupa").getDataIDs()[0];
						$('#tabla_lupa').setSelection(first);
					}
				},
				onSelectRow: function(rowid) {
					if(!settings.keyNav){
						for (var ix in settings.campos)
						{
							var data = $("#tabla_lupa").getCell(rowid,ix);
							$('#'+settings.campos[ix]).val(data);
						}
						settings.onSelectRow();
						$("#div_lupa").dialog("close");
					}
				},
				ondblClickRow: function(rowid) {
					if(settings.keyNav){
						for (var ix in settings.campos)
						{
							var data = $("#tabla_lupa").getCell(rowid,ix);
							$('#'+settings.campos[ix]).val(data);
						}
						settings.onSelectRow();
						$("#div_lupa").dialog("close");
					}
				}
			}).jqGrid('navGrid','#pag_lupa',{});

			if(settings.keyNav){
				$("#tabla_lupa").bindKeys({
					"onEnter":function( rowid ) {
						for (var ix in settings.campos)
						{
							var data = $("#tabla_lupa").getCell(rowid,ix);
							$('#'+settings.campos[ix]).val(data);
						}

						settings.onSelectRow();
						$("#div_lupa").dialog("close");

					}
				});
			}
		};

		var cod_action = function() {
			if($(settings.searchInput).val()) {

				var indices = new Array();
				var j = 0;
				for (var i=0; i<settings.grid.length; i++){
					if(!settings.grid[i].hidden){
						indices[j] = settings.grid[i].index;
						j++;
					}
				}

				var filtros = armar_filtros();
				if(!filtros) return;
				var campos = JSON.stringify(indices);

				var id_menu = settings.id_menu;

				$.post(globUrlAjaxWebservice+"scf_lupa_loader.php?status=lupa_cod", {
					'filtros':filtros,
					'tipo':settings.id_lista,
					'campos':campos,
					'exacto':settings.exactField,
					'cond':$(settings.searchInput).val(),
					'id_menu':id_menu
				}, function(data) {
					if(data == null) {
						if(settings.notFoundDialog) mostrar_error('El código ingresado es inválido.');
						for (var ix in settings.campos) {
							$('#'+settings.campos[ix]+':not('+settings.searchInput+')').val('');
						}
						if(settings.limpiarCod) $(settings.searchInput).val('');
						settings.onClose();
					}else{
						for (var ix in settings.campos) {
							valor = data[ix.toUpperCase()];
							$('#'+settings.campos[ix]).val(valor);
						}
						settings.onSelectRow();
						settings.onClose();
					}
				},'json');
			}else {
				for (var ix in settings.campos) {
					$('#'+settings.campos[ix]).val('');
				}
				if(settings.selectOnDelete) settings.onSelectRow();
				settings.onClose();
			}
		};

		for(var i = 0; i < this.length; i++) {
			caller = this[i];
			if(settings.showGrid) {
				$(caller).unbind('click');
				$(caller).unbind('keydown');
				if(settings.onClick){
					$(caller).click(lupa_action);
				}else{
					$('#'+caller.id+'_lupa').unbind('click');
					$('#'+caller.id+'_lupa').click(lupa_action);
				}

				if(settings.onKeydown){
					$(caller).keydown(function(e){
						var code = callkeydownhandler(e);

						if(code == '46' || code == '8')  	   		 //evento en boton suprimir y backspace
						{
							for (var ix in settings.campos)
							{
								$('#'+settings.campos[ix]).next("input").focus();
							}
						}else

						if(code == '9'){
							$('#'+settings.campos[ix]).val('');
						}else{
							if(settings.allKeysOpen){
								lupa_action();
							}else{
								if(code == '32' || code == '13'){
									lupa_action();
								}
							}

						}

					});
				}
			}

			if(settings.searchCode) {
				$(settings.searchInput).unbind('change');
				$(settings.searchInput).change(cod_action);
			}
			if(settings.searchOnInitialize) {
				cod_action();
			}
		}
	};

})(jQuery);

function callkeydownhandler(evnt) {
	var ev = (evnt) ? evnt : event;
	var code =(ev.which) ? ev.which : event.keyCode;
	return code;
}


