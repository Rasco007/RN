//AM
//Lupa generica
//Usa la sintaxis del jQuery: $(input).lupa_generica(opciones)

function doSearch(){
	var mask=$("#search_lupa").val();

	$("#tabla_lupa").jqGrid('setGridParam',
		{url:FUNCIONES_BASEPATH+'lupa_generica.php?cond='+mask})
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
			width:680,
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

        //Parche Provisorio AM - Ver la forma de no clavar los parente para obtener el elemento a partir del cual
        //se posiciona el dialogo de la lupa. Se hizo una solucion basica y provisoria poniendo el main.

        settings.id_dialog = "main";//$('#'+$(caller).attr('id')).parent().parent().parent().parent().attr('id');

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

			if($('#div_lupa').hasClass('in') && document.getElementById('div_lupa')){
				$('#div_lupa').removeClass('in');
                return;
            }
			
			$("#div_lupa").remove();
			
            var lupa_width = settings.width;
            var modal_properties = getModalProperties(lupa_width);

            $('body').append(
                '<div class="modal fade in" tabindex="-1" role="dialog" id="div_lupa" style="display: block; padding-right: 17px;" aria-hidden="false">'+
                '    <div class="modal-dialog '+modal_properties.bs_class+'" style="'+modal_properties.style+'" role="document">'+
                '    <div class="modal-content col-xs-12" style="padding-left: 0px;padding-right: 0px;">'+
				'    <div class="modal-header project_title">'+
				'	<h4 class="modal-title">'+settings.caption+
                '    <button type="button" class="close" data-dismiss="modal" aria-label="Close">'+
                '    <span aria-hidden="true">×</span></button></h4>'+
                '</div>'+
                '<div class="modal-body">'+
                '    <div style="margin-bottom: 1%;">'+
                //'    	<div class="panel-body" style="padding-top: 0px;padding-bottom: 0px;">'+
                '    		<div class="row">'+
                '    			<div style="margin-top:2%;" class="form-group col-md-12">'+
                '					<div class="input-group">'+
                '					  <input id="search_lupa" type="text" class="form-control input" placeholder="Ingrese un valor a buscar...">'+
                '					  <span class="input-group-btn" style="font-size:inherit">'+
                '    				  	<button type="button" name="btn_buscar_lupa" id="btn_buscar_lupa" class="btn" onclick="doSearch()">Filtrar resultados</button>'+
                '				      </span>'+
                '					</div>'+
                '				</div>'+

                '			</div>'+
                //'    	</div>'+
                '	</div>'+
                '   <table id="tabla_lupa" class="scroll" cellpadding="0" cellspacing="0"></table>'+
                '   <div id="pag_lupa"></div>'+
                '</div>'+
                '    <div class="modal-footer">'+
                '    <button type="button" class="btn-sm btn-success" id="btn_sel_lupa" style="margin-right: 2px;">'+
                '    <span class="glyphicon glyphicon-ok" aria-hidden="true"></span> Seleccionar valor'+
                '</button>'+
                '<button type="button" class="btn-sm btn-danger" id="btn_can_lupa">'+
                '    <span class="glyphicon glyphicon-remove" aria-hidden="true"></span> Cancelar'+
                '    </button>'+
                '    </div>'+
                '    </div>'+
                '    </div>'+
                '    </div>'
            );
			
			$("#div_lupa").modal("show");
			/*
			var ultima_tecla;
			$("#search_lupa").keyup(function(event){
				if(event.keyCode == 13){
					if(ultima_tecla != 13){
						$("#btn_buscar_lupa").click();
					}else{
						var id_selected = $("#tabla_lupa").getDataIDs()[0];
						$('#tabla_lupa #' + id_selected).dblclick();
					}
				}
                
				ultima_tecla = event.keyCode; //Guardo la última tecla por si ya se encontre el registro deseado con la última búsqueda
			});
			*/
			
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
			/*$("#div_lupa").dialog({
				bgiframe:true,
				modal:true,
				width:settings.width,
				height:settings.height,
				position: {my: "center", at: "center", of: window}, //MJ Posicion dialog
				resizable: true,
				close: function(event, ui) {
					settings.onClose();
				},
				dialogClass: 'fixed-dialog'

			});

			$("#div_lupa").parent().css('z-index',settings.zIndex);*/

			//GENERO LAS COLUMNAS QUE TENDRA LA GRILLA
			var arr_colGrid = new Array();
			var indices = new Array();
			var j = 0;
			for (i=0; i<settings.grid.length; i++){
				arr_colGrid[i] = $.extend({
						name:settings.grid[i].index,
						index:settings.grid[i].index,
						hidden:false,
		                coloptions : {
		                    sorting: false,
		                    columns: false,
		                    filtering: false,
		                    seraching: false,
		                    grouping: false,
		                    freeze : false
		                },
						width:100},
					settings.grid[i]);

				if(!settings.grid[i].hidden){
					indices[j] = settings.grid[i].index;
					j++;
				}
			}

			var campos = JSON.stringify(indices);
			var lupa_first_load = true;
			
			//CREO LA GRILLA
            $("#tabla_lupa").jqGrid({
                url:FUNCIONES_BASEPATH+'lupa_generica.php?cond='+$("#search_lupa").val(),
                postData:{'filtros':filtros,'tipo':settings.id_lista,'campos':campos},
                autowidth:false,
                width: 530,
                height: settings.heightGrid,
                colNames: settings.titulos,
                colModel: arr_colGrid,
                colMenu: false,
                export_data:false,
                searchToolbarDisplay:false,
                sortname: settings.sortname,
                sortorder: settings.sortorder,
                pager: '#pag_lupa',
                rowList: [],
                caption:'' ,
                loadComplete : function(data) {
                    if(settings.keyNav){
                        var first = $("#tabla_lupa").getDataIDs()[0];
                        $('#tabla_lupa').setSelection(first);
                    }
					
                    $("#search_lupa").focus();
					
					if(settings.keyNav && (!lupa_first_load)){
						var lupa_num_records = $("#tabla_lupa").jqGrid('getGridParam', 'records');
						if (lupa_num_records > 0){
							$("#tabla_lupa tbody tr#0").click();
						}
					}
					
					lupa_first_load = false;
                },
                onSelectRow: function(rowid) {
                    if(!settings.keyNav){
                        for (var ix in settings.campos)
                        {
                            var data = $("#tabla_lupa").getCell(rowid,ix);
                            $('#'+settings.campos[ix]).val(data);
                        }
                        settings.onSelectRow();
                        settings.onClose();
                        $("#div_lupa").modal("hide");
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
                        settings.onClose();
                        $("#div_lupa").modal("hide");
                    }
                }
            }).jqGrid('navGrid','#pag_lupa',{});

			if(settings.keyNav){
				$("#tabla_lupa").bindKeys({
					/*
					"onEnter":function( rowid ) {
						for (var ix in settings.campos)
						{
							var data = $("#tabla_lupa").getCell(rowid,ix);
							$('#'+settings.campos[ix]).val(data);
						}

						settings.onSelectRow();
						$("#div_lupa").dialog("close");
                        
						var elem_on_focus = $(':focus');
						
						var remove_focus = true;
						if (elem_on_focus.length > 0){
							elem_on_focus = $(':focus')[0];
							
							if ($(elem_on_focus).is( "input" )){
								
								var form_input_on_focus = elem_on_focus.form;
								if ($(form_input_on_focus).hasClass('frm_search_form')){
									remove_focus = false;
								}
							}
						}
						
						if (remove_focus){
							//Para que no se vuelva a abrir el dialog de la lupa una vez se cierra
							$(':focus').blur();
						}
						
					}
					*/
					"onEnter":function( rowid ) {
                        for (var ix in settings.campos)
                        {
                            var data = $("#tabla_lupa").getCell(rowid,ix);
                            $('#'+settings.campos[ix]).val(data);
                        }

                        settings.onSelectRow();
                        settings.onClose();
                        $("#div_lupa").modal("hide");
						
						var elem_on_focus = $(':focus');
						
						var remove_focus = true;
						if (elem_on_focus.length > 0){
							elem_on_focus = $(':focus')[0];
							
							if ($(elem_on_focus).is( "input" )){
								
								var form_input_on_focus = elem_on_focus.form;
								if ($(form_input_on_focus).hasClass('frm_search_form')){
									remove_focus = false;
								}
							}
						}
						
						if (remove_focus){
							//Para que no se vuelva a abrir el dialog de la lupa una vez se cierra
							$(':focus').blur();
						}

                    }
				});
				
				$('#div_lupa').bind('keydown', function(e){
					if(!$("#input_pag_lupa > input").is(':focus')){
						if ((e.keyCode != 38) && (e.keyCode != 40)){
							$('#search_lupa').focus();
						}
					}
				});
				
				$('#div_lupa').keyup(function(e) {
					if(!$("#input_pag_lupa > input").is(':focus')){
						if ((e.which == 38) || (e.which == 40)){
							$('#tabla_lupa').focus();
						}
					}
				});
			}
			
            $('#btn_sel_lupa').click(function(){
                var rowid = $('#tabla_lupa').getGridParam('selrow');
                for (var ix in settings.campos)
                {
                    var data = $("#tabla_lupa").getCell(rowid,ix);
                    $('#'+settings.campos[ix]).val(data);
                }

                settings.onSelectRow();
                settings.onClose();
                $("#div_lupa").modal("hide");
            });

            $('#btn_can_lupa').click(function(){
                $("#div_lupa").modal("hide");
            });
			
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

				$.post(FUNCIONES_BASEPATH+'lupa.php', {
					'filtros':filtros,
					'tipo':settings.id_lista,
					'campos':campos,
					'exacto':settings.exactField,
					'cond':$(settings.searchInput).val()
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

						if(code == '46' || code == '8') //Evento en boton suprimir y backspace
						{
							for (var ix in settings.campos)
							{
								$('#'+settings.campos[ix]).next("input").focus();
							}
						}else

						if(code == '9'){ //tab
							$('#'+settings.campos[ix]).val('');
						}else{
							if ((code != '13') && (code != '27')){ // MJ; 13 (enter) para que funcione el enter en los inputs y que se guarde el formulario, 27 (esc) para que no se cierre el dialogo y se abra una lupa
								if(settings.allKeysOpen){
									lupa_action();
								}else{
									if(code == '32' || code == '13'){ // No va a entrar al codigo 13, pero lo dejo por si se elimina la opción de "enter en input guardar"
										lupa_action();
									}
								}
							}
						}
					});
				}
			}

			if(settings.searchCode) {
				$(settings.searchInput).unbind('change');
				$(settings.searchInput).blur(cod_action);
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

function getModalProperties(modal_width){
    var modal_properties = {
        bs_class: '',
        style: ''
    };

    if (isNaN(modal_width)){

        var modal_width_percentage = new RegExp('^[0-9]{1,}%$');
        var modal_width_px = new RegExp('^[0-9]{1,}px$');

        if (modal_width_percentage.test(modal_width)){
            modal_properties.style = 'width:'+modal_width;
        } else if(modal_width_px.test(modal_width)){
            modal_width = modal_width.replace("px", "");
        }
    }

    modal_properties.bs_class = getModalClassByWidth(modal_width);

    return modal_properties;
}

function getModalClassByWidth(w){
    var MIN_LARGE_MODAL_WIDTH = 750;
    var MAX_SMALL_MODAL_WIDTH = 450;

    var modal_class = 'modal-md';

    if (!isNaN(w)){
        if (w >= MIN_LARGE_MODAL_WIDTH){
            modal_class = 'modal-lg';
        } else if (w < MAX_SMALL_MODAL_WIDTH){
            modal_class = 'modal-sm';
        }
    }

    return modal_class;
}
