(function() {
    
	/* EJEMPLO LLAMADA

    $("#div_busqueda").crearBusquedaMasiva({
		p_n_id_menu:<?=$_POST['p_n_id_menu'];?>,
		afecta_grid:['main_grid'],
		adv:'S',
		p_n_grid:0,
		titulo:'Busqueda de Filtros',
		opciones: [
					{icono: "glyphicon glyphicon-briefcase", id: "opcion1", contenido: "<p>Contenido Opcion 1</p>"}, 
					{icono: "fa fa-binoculars", id: "opcion2", contenido: "<p>Contenido Opcion 2</p>"}
				  ]
	});
    */

    $.fn.crearBusquedaMasiva = function (settings) {
		
        var caller = this[0]; // Funciona para el primer elemento que trae
        $(caller).addClass('div_busq');
        // Parámetros por default
        settings = jQuery.extend({
            p_n_id_menu:0,
            p_n_grid:1,
            afecta_grid:[],
            afecta_url:[FUNCIONES_BASEPATH+'busqueda_sql.php',FUNCIONES_BASEPATH+'busqueda_sql.php'],
            borra:[],
            adv:'N',
            titulo:'Criterios de b&uacute;squeda'
        }, settings);

        var div = $(".div_crear_busqueda_masiva",caller)[0];
		
		var afecta;

        afecta = settings.afecta_grid[0];
		var data_filtros = cargarFiltros(afecta, settings.p_n_id_menu, settings.p_n_grid);
		
        if((data_filtros.cant_filtros < 1) && (typeof settings.opciones === 'undefined')){
			$(caller).hide();
			return;
		}
		
		var PREFIJO_ID_CONTENEDOR = "contenido";
		var PREFIJO_ID_FILTRO = "filtro";
		
		/***	INICIO ARMADO DE OPCIONES PROPIAS DE LA APLICACION	***/
		var pestanias = "";
		var contenido_pestanias = "";
		
		$.each(settings.opciones, function(indice, pestania) {

			var id = pestania.id;
			var icono = pestania.icono;
			var contenido = pestania.contenido;
			
			if (opcionTieneCampoObligatorios(id, icono, contenido)){
				var id_contenedor_div = PREFIJO_ID_CONTENEDOR+"_"+afecta+"_"+id;
				pestanias += "<li><a href='#"+id_contenedor_div+"'><i class='"+icono+"'></i></a></li>";
				contenido_pestanias += "<div id='"+id_contenedor_div+"'>"+contenido+"</div>";
			}
		});
		/***	FIN ARMADO DE OPCIONES PROPIAS DE LA APLICACION	***/
		var id_filtro_div = PREFIJO_ID_CONTENEDOR+"_"+afecta+"_"+PREFIJO_ID_FILTRO;
		
		var busqueda = "<div class='panel-primary' id='search_tabs_"+afecta+"'>"+
							"<ul style='list-style-type:none;background: #fcfcfc;'>";
		
		if (data_filtros.cant_filtros > 0){
			busqueda += "<li title='Mostrar filtros'>"+
							"<a href='#"+id_filtro_div+"'><i class='glyphicon glyphicon-filter'></i></a>"+
						"</li>";
		}
		
		busqueda += pestanias+"</ul>";
		
		if (data_filtros.cant_filtros > 0){
			busqueda += "<div id='"+id_filtro_div+"' class='frm-dynamic-search'>"+
							"<div class='frm-search-wrapper'>"+
								"<div>"+
									"<form id='frm_search_"+afecta+"' method='post' action='javascript:void(0);' class='frm_search_form'  style='display: block;'>"+
										"<div id='search_filters_"+afecta+"' style='width: 90%;margin: 0 auto;'></div>"+
										"<div id='src_submit_div_"+afecta+"' style='margin-left:79%;height: 30px;' class='seacrh_form_submit'>"+
											"<button  name='src_submit' id='src_submit_"+afecta+"' class=\"ui-button ui-corner-all ui-widget buscar-dinamico\">"+
												"<i class='fa fa-binoculars'></i><span class='ui-button-icon-space'></span> <span id='texto_limpiar_dinamico' >Buscar</span>"+
											"</button>"+
											"<button  name='btn_borrar' id='btn_borrar_"+afecta+"' class=\"ui-button ui-corner-all ui-widget limpiar-dinamico\">"+
												"<span id='glyphicon_limpiar_dinamico' class='glyphicon glyphicon-trash'> </span> <span id='texto_limpiar_dinamico' >Limpiar</span>"+
											"</button>"+
										"</div>"+
									"</form>"+
								"</div>"+
							"</div>"+
						"</div>";
		}
		
		busqueda += contenido_pestanias+"</div>";
		
        $(caller).append(busqueda);
		
		$("#search_tabs_"+afecta).tabs({
										collapsible: true, 
										active: false,
										activate: function(event, ui) {
											if (ui.newPanel.length > 0 && (ui.newPanel[0].id == id_filtro_div))
												$('[aria-controls="' + id_filtro_div+'"]').prop('title', 'Ocultar filtros');
											else
												$('[aria-controls="' + id_filtro_div+'"]').prop('title', 'Mostrar filtros');
										}
									});
		
		agregarFiltros(afecta, data_filtros);
		$('#btn_borrar_'+afecta).click(function(){
			$('#search_filters_'+afecta+' .clase_valor_'+afecta+' :input').val('');
			for (i=0;i< settings.afecta_grid.length;i++){

                var param = $("#"+settings.afecta_grid[i]).getGridParam('postData');
                $.extend(param,{m_autoquery:'S',adv:'N',cond:null});

                $("#"+ settings.afecta_grid[i]).setGridParam({postData:param, url:settings.afecta_url[i]});//.trigger("reloadGrid");
            }
            for (i=0;i< settings.borra.length;i++){
                $("#"+ settings.borra[i]).setGridParam({url:"empty.php"}).setCaption("&nbsp;");//.trigger("reloadGrid");
            }
            $("#"+ settings.afecta_grid[i])[0].clearToolbar();
        });
		
		$('#src_submit_'+afecta).click(function(){
			if ($('#frm_search_'+afecta).validationEngine('validate')){
				
                var cond = JSON.stringify($('#frm_search_'+afecta).serializeObject());
				
                for(i=0;i< settings.afecta_grid.length;i++) {
                    var param = $("#"+settings.afecta_grid[i]).getGridParam('postData');
                    $.extend(param,{m_autoquery:'S',adv:'S',cond:cond});
                    $("#"+ settings.afecta_grid[i]).setGridParam({postData: param, url:settings.afecta_url[i]}).trigger("reloadGrid");
                }
                for (i=0;i< settings.borra.length;i++){
                    $(settings.borra[i]).setGridParam({url:"empty.php"}).setCaption("&nbsp;").trigger("reloadGrid");
                }
				
            }
        });
    };

})(jQuery);

function cargarFiltros(afecta, id_menu, id_grilla){
	var filtros = {};
	$.ajax({
		url: FUNCIONES_BASEPATH+'ajax_busqueda.php',
		type: 'POST',
		async: false,
		data: {
			"oper": "CARGA_COMPLETA",
			"id_menu": id_menu,
			"id_grilla": id_grilla,
			"nombre_grilla": afecta
		},
		success: function(data) {
			var ret = eval('(' + data + ')');
			
			if (ret != null) {
				filtros = ret;
			} else {
				mostrar_cuadro('E', 'Error', 'Error al cargar filtros.');
			}
		}
	});
	
	return filtros;
}

function agregarFiltros(afecta, data_filtros){
	if(data_filtros.cant_filtros > 0){
		var contenedor = '#search_filters_'+afecta;

		armarTablaFiltros(contenedor, data_filtros.filas, data_filtros.cols, afecta);
		var html = "<input type='hidden' id='"+afecta+"_num_filtros' name='num_filtros' value='"+data_filtros.cant_filtros+"'>"+
					"<input type='hidden' id='"+afecta+"_nombre_grilla_filtros' name='nombre_grilla_filtros' value='"+afecta+"'>";
					
		$(contenedor).append(html);
		
		$.each(data_filtros.filtros, function(idx, filtro){
			
			var pos = '#'+afecta+'_'+filtro.fil+'_'+filtro.col;
			agregarCampoHTML(pos, filtro);
			agregarOperadorHTML(afecta, pos, filtro);
			var div_filtro_valores = "div_campo_valor_"+afecta+"_"+filtro.id;
			agregarCamposValores(afecta, div_filtro_valores, filtro.id, filtro.label, filtro.campo_valor.elementos, pos);
		});
	}
}

function agregarCamposValores(afecta, div_filtro_valores, id_filtro, filtro, elementos, pos){
	$(pos).append("<div id = '"+div_filtro_valores+"' class= 'clase_valor_"+afecta+"' style='display: inline-block;width: 57%;'>");
	var estilos = obtenerEstilosSegunOperador(afecta, id_filtro);
	$.each(elementos, function(idx_elem, elem){
		agregarElementoHTML(filtro, '#'+div_filtro_valores, elem, estilos);
	});
	
	$(pos).append("</div>");
}

function armarTablaFiltros(contenedor, filas, cols, afecta){
	var html = "";
	var width = Math.floor(12/cols);
	
	for (var i = 0; i < filas; i++) {
		html += "<div class='row'>";
		
		for (var j = 0; j < cols; j++) {
			var pos = i+'_'+j;
			html += "<div class='col-xs-"+width+"' id='"+afecta+'_'+pos+"' style='text-align: left;'>&nbsp;</div>";
		}
		
		html += "</div>";
	}
	
	$(contenedor).html(html);
}

function agregarCampoHTML(contenedor, filtro){
	var span_filter_obl = '';
	if (filtro.obligatorio == 'S'){
		span_filter_obl = '<span> (*)</span>';
	}
	
	var html = '<input id="'+filtro.nombre_grilla+'_campo_'+filtro.id+'" name="'+filtro.nombre_grilla+'_campo_'+filtro.id+'" type="hidden" value="'+filtro.id_filtro+'">';
	html += '<label id="'+filtro.nombre_grilla+'_d_campo_'+filtro.id+'" style="height:20px;width: 23%;text-align:right;">'+filtro.label+span_filter_obl+'</label>';

	$(contenedor).append(html);
}

function agregarOperadorHTML(afecta, contenedor, filtro){
	var elemento = filtro.operadores.elementos[0];
	var campo_valor = filtro.campo_valor.elementos[0];
	
	var funcionCambio = "cambiarCampoValorAsociado('"+filtro.id_filtro+"','"+afecta+"','"+filtro.label+"','"+filtro.id+"',this.value,'"+campo_valor.tipo_dato+"')";
	var clases = obtenerClasesSegunTipoDato(elemento.tipo_dato);
	var html = "";
	var div_campo_operador = "div_campo_operador_"+afecta+"_"+filtro.id;
	$(contenedor).append("<div id = '"+div_campo_operador+"' style='display: inline-block;width:18%;margin-left: 1%;'>");

	if (!soloIgual(elemento.opciones)){
		html = obtenerHTMLOPERADOR(elemento, funcionCambio, clases);
	} else {
		html = obtenerHTMLHIDDEN(elemento, clases, elemento.opciones[0].codigo);
	}
	
	$("#"+div_campo_operador).append(html);
	$(contenedor).append("</div>");
	return html;
}

function soloIgual(opciones){
	var COD_OP_IGUAL = "IGU";
	return ((opciones.length == 1) && (opciones[0].codigo == COD_OP_IGUAL));
}

function agregarElementoHTML(campo, contenedor, elemento, estilos){
	var html = "";
	var COD_LUPA = "LUPA";
	var COD_INPUT = "INPUT";
	var COD_INPUT_LUPA = "INPUT_LUPA";
	var COD_HIDDEN = "HIDDEN";
	
	var clases = obtenerClasesSegunTipoDato(elemento.tipo_dato, elemento.obligatorio);
	switch(elemento.tipo) {
		case COD_INPUT:
			estilos = "margin-left:1%;height:20px;" + estilos;
			html = obtenerHTMLINPUT(elemento, clases, estilos);
			$(contenedor).append(html);
			
			if (elemento.tipo_dato == 'DATE') agregarDatePicker(elemento.id, contenedor);
			break;
		case COD_INPUT_LUPA:
			estilos = "margin-left:1%;height:20px;" + estilos;
			html = obtenerHTMLINPUT(elemento, null, estilos);
			$(contenedor).append(html);
			
			if (elemento.tipo_dato == 'DATE') agregarDatePicker(elemento.id, contenedor);
			break;
		case COD_HIDDEN:
			html = obtenerHTMLHIDDEN(elemento, clases, "");
			$(contenedor).append(html);
			break;
		case COD_LUPA:
			estilos = "margin-left: 1%;margin-top: 0px;height: 20px;width: 35px !important;padding: 0px;" + estilos;
			html = obtenerHTMLLUPA(elemento, clases, estilos);
			$(contenedor).append(html);
			agregarLupa(elemento, campo, contenedor);
			break;
	}
	
	return html;
}

function agregarLupa(elemento, campo, contenedor){
	var filtros_param = [];

	if (elemento.filtros_lista != null){
		filtros_param = elemento.filtros_lista;
	}
	
	$(contenedor+' #'+elemento.id).button({
			icons: {primary: 'ui-icon-search'},
			text: true
	}).lupa_generica({
			id_lista:elemento.id_lista,
			titulos:['C&oacute;digo', 'Descripci&oacute;n'],
			grid:[{index:'c_codigo', width:200},
				  {index:'d_descrip', width:400}],
			caption:campo+':',
			sortname:'d_descrip',
			filtros: filtros_param,
			sortorder:'asc',
			campos:{c_codigo: elemento.c_lupa_id, d_descrip: elemento.d_lupa_id},
			keyNav:true,
			onClose: function () {
				$("#"+elemento.d_lupa_id).focus();
				return true;
			}
	});
	
	$(' #'+elemento.d_lupa_id).click(function(){
		$(contenedor+' #'+elemento.id).click();
	 });
	 
}

function obtenerClasesSegunTipoDato(tipo_dato, obligatorio){
	var clases = "";
	if (obligatorio == 'S') clases = "validate[required]";
	switch (tipo_dato){
		case "DATE":
			if (obligatorio == 'S') clases = "validate[required,custom[validaFecha]] ";
			clases += " validate[custom[validaFecha]] datepicker";
		break;
		case "LUPA":
			clases = "frm_button ui-button ui-widget ui-state-default ui-corner-all ui-button-text-icon jb_lupa";
		break;
		case "INT":
		case "NUM":
			clases = "validate[custom[onlyIntNumber]]";
			if (obligatorio == 'S') clases = "validate[required,custom[onlyIntNumber]]";
		break;
	}
	
	return clases;
}

function obtenerHTMLLUPA(elemento, clases, estilos){
	var html = "<button type='button' id='"+elemento.id+"' name='"+elemento.name+"' class='"+clases+"' style='"+estilos+"'></button>";
	return html;
}

function obtenerHTMLHIDDEN(elemento, clases, valor){
	var html = "<input type='hidden' id='"+elemento.id+"' name='"+elemento.name+"' class='"+clases+"' value='"+valor+"' >";
	return html;
}

function obtenerHTMLINPUT(elemento, clases, estilos){
	var readonly = (elemento.readonly == 'S')?'readonly':'';
	var html = "<input type='text' id='"+elemento.id+"' name='"+elemento.name+"' class='"+clases+"' style='"+estilos+"' "+readonly+">";
	return html;
}

function obtenerHTMLOPERADOR(elemento, funcionCambio, clases){
	var html = "<select class='"+clases+"' id='"+elemento.id+"' name='"+elemento.name+"' onchange="+funcionCambio+" style='width:100%;height:20px;'>";
	$.each(elemento.opciones, function(idx, opcion){
		html += '<option value="'+opcion.codigo+'">'+opcion.valor+'</option>';
	});
	html += "</select>";
	return html;
}

function cambiarCampoValorAsociado(id_filtro, afecta, campo, id, valor, tipo_dato){
	var COD_OPER = "CARGA_CAMPO_VALOR";
	
	$.ajax({
		url: FUNCIONES_BASEPATH+'ajax_busqueda.php',
		type: 'POST',
		async: true,
		data: {
			"oper": COD_OPER,
			"id": id,
			"id_filtro": id_filtro,
			"cod_operador": valor,
			"nombre_grilla": afecta
		},
		success: function(data) {
			var ret = eval('(' + data + ')');
			
			if (ret != null) {
				$("#div_campo_valor_"+afecta+"_"+id).html("");
				var estilos = obtenerEstilosSegunOperador(afecta, id);
				
				$.each(ret.elementos, function(idx_elem, elem){
					var contenedor = "#div_campo_valor_"+afecta+"_"+id;
					agregarElementoHTML(campo, contenedor, elem, estilos);
					if (elem.tipo_dato == 'DATE') agregarDatePicker(elem.id, contenedor);
				});
				
				$("#div_campo_operador_"+afecta+"_"+id+" #operador_"+id).focus();
			} else {
				mostrar_cuadro('E', 'Error', 'Error al cargar filtros.');
			}
		}
	});

}

function agregarDatePicker(elem, contenedor){
	$(contenedor+" #"+elem).datepicker({
		dateFormat:'dd/mm/yy',
		changeMonth:true,
		changeYear:true,
		dayNamesMin:['D', 'L', 'M', 'M', 'J', 'V', 'S'],
		monthNamesShort:['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'],
		onClose: function () {
			$(this).focus();
		}
	});
	$("#"+elem).css('padding-left', 0);
	$("#"+elem).css('text-align', 'center');
}

function obtenerEstilosSegunOperador(afecta, id){
	var estilos = "width:85%;";
	var op = $("#div_campo_operador_"+afecta+"_"+id+" #"+afecta+"_operador_"+id+" option:selected").val();
	if (op == "RANGO" || op == "BETWEEN") estilos = "width:42%;";
	return estilos;
}

/*
AdvBusqueda.prototype.adv = null;
AdvBusqueda.prototype.getAdv = function() { // Singleton
    if(AdvBusqueda.prototype.adv == null)
        AdvBusqueda.prototype.adv = new AdvBusqueda();

    return AdvBusqueda.prototype.adv;
};
*/

$.fn.serializeObject = function()
{
    var o = {};
    var a = this.serializeArray();
    $.each(a, function() {
        if (o[this.name]) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value);
        } else {
            o[this.name] = this.value;
        }
    });
    return o;
};

function opcionTieneCampoObligatorios(id, icono, contenido){
	return ((id != "") && (icono != "") && (contenido != ""));
}