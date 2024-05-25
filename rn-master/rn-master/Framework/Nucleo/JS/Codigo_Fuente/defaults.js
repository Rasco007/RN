;(function($){
    
    // DEFAULTS: para las grillas
    $.extend($.jgrid.defaults, {
        url: FUNCIONES_BASEPATH+'grid_sql.php',
        datatype: "json",
        autowidth: true,
        height: 180,
        mtype:'POST',
        searchName: null,
        altRows: true,
        export_data: true,
        rowNum:50,
        rowList:[50,100,500,1000],
        shrinkToFit: false,
        loadtext: '<img src="'+IMAGENES_FRAMEWORK+'loading.gif" width="40" alt="loading"/><p>Cargando...</p>',
        viewrecords: true,
        styleUI: 'Bootstrap',
        colMenu: true,
        responsive: true,
        originalColNames: [],
        originalColModel: [],
        sortname:"",
        sortable:false,
		scroll:0,
		multiSort: true,		  
		searchToolbarDisplay: true,
        editurl: FUNCIONES_BASEPATH+'maestro_abm.php',
        width: $('#main').parent().width(),
        loadError: function(xhr,textStatus,err) {
            if(err == 'Timeout'||err == 'NoLog'||err == 'Forbidden'||err=='Token') {
                window.location = BASEPATH_ENTORNO+'index.php?error='+err;
            }else{
                var mensaje;
                if (xhr.responseText != ''){
                    mensaje = xhr.responseText;
                }else {
                    mensaje = 'Se ha producido el siguiente error: '+ err;
                }
                if(err != '' && err != null && err != 'null' && err != 'OK' && err != 'ok')
                    mostrar_error(mensaje);
            }
        },
        onInitGrid: defaultInitGrid()
    });
	
     // DEFAULTS: para los botones Search
    $.jgrid.regional['es'] = $.jgrid.regional['es'] || {};
    $.extend($.jgrid.regional['es'], {

            colmenu : {
                sortasc : "Orden Ascendente",
                sortdesc : "Orden Descendente",
                columns : "Columnas",
                filter : "Filtros",
                grouping : "Agrupar por",
                ungrouping : "Desagrupar",
                searchTitle : "Traer registros con valor:",
                freeze : "Congelar",
                unfreeze : "Descongelar",
                reorder : "Mueva para reordenar"
        }
    });
    
    // DEFAULTS: para los botones Search
    $.jgrid.regional['es'].search = $.jgrid.regional['es'].search || {};

    $.extend($.jgrid.regional['es'].search, {
        caption: "Búsqueda...",
        Find: "Buscar",
        Reset: "Limpiar",
        odata: [{ oper:'IGU', text:"Igual a"},
                    { oper:'LIKE', text:"Contiene"},
                    { oper:'LIKSTART', text:"Empiece por"},
                    { oper:'LIKEND', text:"Termina por"},
                    { oper:'MAYIGU', text:"Mayor o Igual"},
                    { oper:'MENIGU', text:"Menor o Igual"},
                    { oper:'nu', text:"No Informado"}],
        groupOps: [ { op: "AND", text: "todo" },    { op: "OR",  text: "cualquier" }    ],
        operandTitle : "Click para seleccionar la operación de búsqueda.",
        resetTitle : "Resetear valor de Búsqueda",
        url: FUNCIONES_BASEPATH+'/busqueda_sql.php',
        operands : { "eq" :"==", "ne":"!","lt":"<"
                    ,"le":"<=","gt":">","ge":">=","bw":"^"
                    ,"bn":"!^","in":"=","ni":"!=","ew":"|"
                    ,"en":"!@","cn":"~","nc":"!~","nu":"#"
                    ,"nn":"!#", "bt":"...",
                    //Aca arrancan los propios
                    "IGU":"==", "LIKSTART":"^","LIKEND":"|"
                    ,"MENIGU":"<=","MAYIGU":">=","LIKE":"%"
                    }
	
    });
	
    // DEFAULTS: para los navigators
    $.extend($.jgrid.regional['es'].nav, {
        refresh:true,
        search:false,
        edit:false,
        add:false,
        del:false
    });
	
    // DEFAULTS: para los botones Add
    $.jgrid.regional['es'].add = $.jgrid.regional['es'].add || {};
    $.extend($.jgrid.regional['es'].add, {
        bYes : "Yes", 
        bNo : "No",
        bExit : "Cancel",
        top:100,
        left:150,
        width:580,
		drag:true,
		closeOnEscape:true,
        reloadAfterSubmit:true,
        closeAfterAdd:true,
        beforeShowForm: defaultBeforeShowForm(),
        onInitializeForm: defaultInitForm(),
		savekey: [true, 13], //Para que se guarde al apretar enter en input del formulario add/edit de la grilla
        beforeSubmit: function(postdata, formid) {
            var valido = $(formid).validationEngine('validate');
            return[valido,'Controle los datos ingresados.'];
        },
        onClose: function() {
            $("body").validationEngine('hideAll');
            return true;
        },
        onclickSubmit: function (param) { // Para evitar fallos en filas sin refresh
            ret = $(this).getGridParam('postData');
            ret = $.extend(ret,eval('('+ret.param+')'));
            return ret;
        },

        afterSubmit:evaluaABM
    });
	
    // DEFAULTS: para los botones Edit
    $.jgrid.regional['es'].edit = $.jgrid.regional['es'].edit || {};
    $.extend($.jgrid.regional['es'].edit, {
        top:100,
        left:150,
        width:580,
        drag:true,
		closeOnEscape:true,
        reloadAfterSubmit:true,
        closeAfterEdit:true,
        beforeShowForm: defaultBeforeShowForm(),
        onInitializeForm: defaultInitForm(),
		savekey: [true, 13], //Para que se guarde al apretar enter en input del formulario add/edit de la grilla
        beforeSubmit: function(postdata, formid) {
            var valido = $(formid).validationEngine('validate');
            return[valido,'Controle los datos ingresados.'];
        },
        onClose: function() {
            $("body").validationEngine('hideAll');
            return true;
        },
        onclickSubmit: function (param) { // Para evitar fallos en filas sin refresh
            ret = $(this).getGridParam('postData');
            ret = $.extend(ret,eval('('+ret.param+')'));
            return ret;
        },
        afterSubmit:evaluaABM
    });
	
    // DEFAULTS: para los botones Delete
    $.jgrid.regional['es'].del = $.jgrid.regional['es'].del || {};
    $.extend($.jgrid.regional['es'].del, {
        top:400,
        left:150,
        width:580,
        drag:true,
		closeOnEscape:true,
        reloadAfterSubmit:true,
        onClose: function() {
            $("body").validationEngine('hideAll');
            return true;
        },
        onInitializeForm: defaultInitForm(),
        afterSubmit:evaluaABM,
        onclickSubmit: function (param) { // En los delete manda todos los datos de la fila igual
			
            var gridid = $(this).getGridParam('selrow');
			
            // Datos de campos a incluir
            var vcampo = $(this).getGridParam("colModel");
			
            var ret = {};
            // Asignar títulos
            for (var j = 0; j < vcampo.length; j++) {
                if(vcampo[j].editable)
                    ret[vcampo[j].name] = $(this).getCell(gridid, vcampo[j].name);
            }
            param = $(this).getGridParam('postData');


            ret = $.extend(ret,param);
            ret = $.extend(ret,eval('('+ret.param+')'));


            return ret;


        }

    });
	
	var orgViewModal = $.jgrid.viewModal;
	$.extend($.jgrid,{
		viewModal: function (selector, options) {
			var top_off = left_off = 100;

			if (selector.indexOf("#alertmod") !== -1){
				top_off = 150;
				left_off = 170;
			}
			
			var grid_pos = $(options.gbox).offset();
			//if (grid_pos.top)$(selector).css('top', (grid_pos.top)+'px');
            //if (grid_pos.left)$(selector).css('left', (left_off + grid_pos.left)+'px');
			if (grid_pos.top)$(selector).css('top', ($(window).scrollTop() + 60)+'px'); // 60 es para esquivar la barra superior
			if (grid_pos.left)$(selector).css('left', ($('#main').position().left - 9) + 'px'); // 9 es para esquivar la barra lateral
			return orgViewModal.call (this, selector, options);
		}
	});
	
    // fn to handle filtering and button-toggling
    var toggleAjax = function(settings) {
        if (!settings.url.match("/autocomplete|ajax_busqueda|grid_sql|grid_fields_sql|lupa_generica_cod|lupa") &&
            $("#main").length > 0 ){
            //$("#main").barraProceso({visible:true});
			$('#main').procOverlay({visible:true});
        }
    };


    // DEFAULTS: para los Ajax
    $.ajaxSetup({
        'error':function(xhr, textStatus, err) {
            //$("#main").barraProceso({visible:false});
			$('#main').procOverlay({visible:false});
            if(err == 'abort') return;
            if(err == 'Timeout'||err == 'NoLog'||err == 'Forbidden'||err =='Token') {
                window.location = BASEPATH_ENTORNO+'index.php?error='+err;
            }else{

                var mensaje;

                if (xhr.responseText != ''){
                    mensaje = xhr.responseText;
                }else {

                    mensaje = 'Se ha producido el siguiente error: '+ err;
                }


                if(err != '' && err != null && err != 'null' && err != 'OK' && err != 'ok')
                    alert(mensaje);
            }

        },beforeSend: function(xhr,settings){
            toggleAjax(settings);
        }
    });

    $(document).ajaxStop(function () {
        if($("#main").length > 0){
            //$("#main").barraProceso({visible:false});
			$('#main').procOverlay({visible:false});
        }
    });

	//Para que se abra el menú lateral al apretar F2
	$(document).bind("keydown", function (event) {
		if (event.keyCode == 113) { //F2 keyCode
			$(".page-header-inner .menu-toggler.sidebar-toggler").click();
			$(".page-sidebar-menu.page-header-fixed > li:eq(1) > a").focus();
		}
	});

    /** DEFAULTS: para los autocomplete
     *

     * Se define el autocomplete poniendo como opciones
     * { ...,
     *   oper: 1,
     *   map: function(item) { ... Función para mapear cada item devuelto por el ajax ...},
     *   ... }
     */
    $.extend($.ui.autocomplete.prototype.options, {
        request: null,
        map: function() {
            console.log('El autocomplete no tiene definida una función "map".');
        },

        url: "../Aplicaciones/ajax_genericos/autocomplete.php",
        source: function(request, response) {
            if (this.options.request) this.options.request.abort();


            var fn_success = $.proxy(function(json) {
                if(json){
                    for (var ix in json) break; // Saco el subelemento
                    response( $.map(json[ix], this.options.map));
                }

            }, this);

            this.options.request = $.ajax({
                type:'POST',
                url: this.options.url,
                data: {term: request.term,
                    oper:this.options.oper},
                dataType: 'json',
                success: fn_success
            });
        }
    });

})(jQuery);

function defaultInitForm(_ext_func) {
    var ext_func = typeof(_ext_func) === 'undefined' ? function() {null;} : _ext_func;
    return function(formid) {
        ext_func(formid);
    };
}

function defaultBeforeShowForm(_ext_func){
    var ext_func = typeof(_ext_func) === 'undefined' ? function() {null;} : _ext_func;
    return function(formid){
        $(formid).validationEngine({
            promptPosition:'inline',
            validationEventTrigger: ''  // No hace validación en linea
        });
		var grid_id = $(this).getGridParam('id');
        $("#FrmGrid_"+grid_id).css("height", "auto");
		ext_func(formid);
    };
}

function defaultInitGrid(_ext_func){
    var ext_func = typeof(_ext_func) === 'undefined' ? function() {null;} : _ext_func;
    return function(){
        var grid_id = $(this).getGridParam('id');
            $('#'+grid_id).jqGrid('resizeGrid');

            $('#'+grid_id).on('reloadGrid',function(id) {
                    var postdata = $('#'+grid_id).getGridParam('postData');
                    limpiar_grillas_hijas(postdata.grid_childs_id);
            });
            
            $('#'+grid_id).on('jqGridGridComplete',function(e, rowid) {
                    arma_context_menu(this, {});
            });
            
            var colModel = $('#'+grid_id).getGridParam('colModel');
            var colNames = $('#'+grid_id).getGridParam('colNames');

            jQuery("#main_grid").setGridParam({originalColModel:colModel, originalColNames:colNames});

            if($(this).getGridParam('export_data')) {

                var pager_id = $(this).getGridParam('pager');
                var tmp_pager_id = pager_id.replace('#','');
                var grid_id = $(this).getGridParam('id');
                
                var title = $('#gview_'+grid_id+' .ui-jqgrid-title').text();
				
				$('#main').append('<div class="modal fade dialog_tipo_informe" tabindex="-1" role="dialog" id="dialog_tipo_informe_'+tmp_pager_id+'">'+
					'<div class="modal-dialog modal-lg" role="document">'+
					'<div class="modal-content col-xs-12">'+
					'<div class="modal-header">'+
					'<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>'+
					'<h4 class="modal-title">Exportar datos</h4>'+
					'</div>'+
					'<div class="modal-body">'+
					'<button onclick="config_pdf(\''+tmp_pager_id+'\', \''+grid_id+'\')" class="bt_pdf" type="button"></button>'+
					'<div class="clear-fix"></div>'+
					' <label class="lbl_orientacion">Orientaci&oacute;n: </label>'+
					'<select class="orientacion">'+
					'<option value="V">Vertical</option>'+
					'<option value="H">Horizontal</option>'+
					'</select>'+
					'<span class="enlaces" style="margin-left:10px;">'+
					'<a class="enlace_azul" href="javascript:select_pdf(\''+tmp_pager_id+'\', true)">Seleccionar</a> o '+
					'<a class="enlace_azul" href="javascript:select_pdf(\''+tmp_pager_id+'\', false)">Deseleccionar</a> todos.'+
					'</span>'+
					'<div class="content_list_pdf" style="overflow:auto; padding-top:1%;"></div>'+
					'<div class="clear-fix"></div>'+
					'<textarea class="txt_comentario_informe" maxlength="1400"></textarea>'+
					'<div class="clear-fix"></div>'+
					'<div id="div_export_buttons">'+
					'<button title="Generar PDF" onclick="genera_pdf(\''+tmp_pager_id+'\', \''+title+'\')" class="genera_pdf bt_dialog_informe" style="" type="button"><span class="fa fa-file-pdf-o"></span></button>'+
					'<button title="Generar Excel" onclick="genera_excel_xlsx_grid(\''+grid_id+'\', \''+tmp_pager_id+'\', \''+title+'\')" class="bt_excel_xlsx bt_dialog_informe" type="button"><span class="fa fa-file-excel-o"></span></button>'+
					'<button title="Agregar Comentario" onclick="add_comentario(\''+tmp_pager_id+'\')" class="add_comentario bt_dialog_informe" type="button"><span class="fa fa-commenting-o"></span></button>'+
					'<button title="Cancelar" onclick="cancelar_pdf(\''+tmp_pager_id+'\')" class="cancelar_pdf bt_dialog_informe" type="button"><span class="glyphicon glyphicon-remove"></span></button>'+
					'</div>'+
					'</div>'+
					'</div>'+
					'</div>'+
					'</div>');
				
                $('#dialog_tipo_informe_'+tmp_pager_id+' .bt_excel_xlsx').button({
                    // label: 'Generar Excel',
                    // icons : { primary : 'ui-icon-document' }
                });

                $('#dialog_tipo_informe_'+tmp_pager_id+' .bt_pdf').button({
                    // label: 'Configurar PDF',
                    // icons : { primary : 'ui-icon-gear' },
                });


                $('#dialog_tipo_informe_'+tmp_pager_id+' .genera_pdf').button({
                    // label: 'Imprimir PDF',
                    // icons : { primary : 'ui-icon-print' },
                });

                $('#dialog_tipo_informe_'+tmp_pager_id+' .add_comentario').button({
                    // label: 'Comentario',
                    // icons : { primary : 'ui-icon-comment' },
                });

                $('#dialog_tipo_informe_'+tmp_pager_id+' .cancelar_pdf').button({
                    // label: 'Cancelar',
                    // icons : { primary : 'ui-icon-close' },
                });

                var grid = this;
                $(pager_id).one("DOMNodeInserted",'.navtable',
                    {'grid':grid,'pager_id':pager_id},function(evt){
                        $(evt.data.grid).navButtonAdd(evt.data.pager_id, {
                            caption: ' ',
                            id:'bt_informe_'+(evt.data.pager_id).replace('#',''),
                            title: 'Imprimir Excel o PDF',
                            buttonicon: 'glyphicon-print',
                            onClickButton: function(){
                                var cant_registros =  $(this).jqGrid('getGridParam', 'records');
                                var id_grid = $(this).jqGrid('getGridParam', 'id');
                                // if(cant_registros <= 0){
                                    // mostrar_cuadro('E','Error', 'La grilla no posee registros para generar el informe.');
                                // }else{

                                    var tmp_posDataInforme = $(this).getGridParam('postData');
                                    tmp_posDataInforme.id_grid = id_grid;


                                    openDialogInformes( tmp_posDataInforme, tmp_pager_id );
                                    config_pdf(tmp_pager_id,id_grid);
                                // }
                            },
                            position:"last"
                        });
                    });

            }
            
            if($(this).getGridParam('searchToolbarDisplay')){
                var grid = this;
                var grid_id = $(this).getGridParam('id');
                $(this).jqGrid('filterToolbar', { stringResult : true, 
                                                  searchOperators: true,
                                                  afterSearch: function () {
                                                        $("#"+ grid_id).setGridParam({url:FUNCIONES_BASEPATH+'busqueda_sql.php'}).trigger("reloadGrid");
                                                    }
                                                });
				
                var pager_id = $(this).getGridParam('pager');
                var tmp_pager_id = pager_id.replace('#','');
                var filter_toolbar = '#gbox_'+grid_id+' .ui-search-toolbar';
                $(filter_toolbar).hide();
				
                $(pager_id).one("DOMNodeInserted",'.navtable',
                        {'grid':grid,'pager_id':pager_id},function(evt){
                            $(evt.data.grid).navButtonAdd(evt.data.pager_id, {
                                caption: ' ',
                                id:'bt_display_filter_toolbar_'+(evt.data.pager_id).replace('#',''),
                                title: 'Mostrar barra de búsqueda',
                                buttonicon: 'glyphicon-eye-open',
                                onClickButton: function(){
                                    var id_grid = $(this).jqGrid('getGridParam', 'id');
                                    var title = '';
                                    var rm_class = '';
                                    var add_class = '';
                                    var filter_toolbar = '#gbox_'+id_grid+' .ui-search-toolbar';
                                    if ($(filter_toolbar).is(":visible")){
                                        $(filter_toolbar).hide();
                                        title = 'Mostrar barra de búsqueda';
                                        rm_class = 'glyphicon-eye-close';
                                        add_class = 'glyphicon-eye-open';
                                        $("#"+ id_grid)[0].clearToolbar();
                                    } else {
                                        $(filter_toolbar).show();
                                        title = 'Ocultar barra de búsqueda';
                                        rm_class = 'glyphicon-eye-open';
                                        add_class = 'glyphicon-eye-close';
                                    }
									
                                    $('#bt_display_filter_toolbar_'+(evt.data.pager_id).replace('#','')).prop('title', title);
                                    $('#bt_display_filter_toolbar_'+(evt.data.pager_id).replace('#','')+' span').removeClass(rm_class);
                                    $('#bt_display_filter_toolbar_'+(evt.data.pager_id).replace('#','')+' span').addClass(add_class);
                                },
                                position:"last"
                            });
                        });
            }
            //context menu
            var grid_id = $(this).getGridParam('id');
			
            $('#main').append('<div class="contextMenu row" id="contextMenu'+grid_id+'" style="display:none;">'+
                                '<ul>'+
                                    '<li id="add">'+
                                    '</li>'+
                                    '<li id="edit">'+
                                    '</li>'+      
                                    '<li id="del">'+
                                    '</li>'+                
                                '</ul>'+
                            '</div>');
            
            $(this).contextMenu('contextMenu'+grid_id, {
                menuStyle :{
                    width : "150px"
                },
                bindings: {
                    'edit': function (t) {
                        $('#edit_'+grid_id).click();
                    },
                    'add': function (t) {
                        $('#add_'+grid_id).click();
                    },
                    'del': function (t) {
                        $('#del_'+grid_id).click();
                    }
                },
                onContextMenu: function (event, menu) {
                    var rowId = $(event.target).parent("tr").attr("id")
                    var grid = $("#"+grid_id);
                    grid.setSelection(rowId);
                    return true;
                }
            });
            
			ext_func();
			
			// Para apretar enter estando parado en un elemento de un bloque de filtros estáticos y que quiero que me realice la busqueda en la grilla
			$("form").submit(function(e){
				if ( $('button.enter_search').length > 0 ){
					e.preventDefault();
				}
			});
			
			// Para poder moverse con las flechas del teclado por la grilla
			arrowPostData = $(this).getGridParam('postData');
			if (arrowPostData.keyNavigation){
				$("#" + grid_id).jqGrid('bindKeys');
			}
			
			// Para el Alto de Grilla Dinámico
			arrowPostData = $(this).getGridParam('postData');
			if (arrowPostData.altoGrillaDinamico){
				$('.ui-jqgrid-bdiv').height(function(index, height){
					return window.innerHeight - $(this).offset().top - 90;
				});
				
				$('.auto_height').on('shown.bs.collapse', function() {
					$('.ui-jqgrid-bdiv').height(function(index, height){
						return window.innerHeight - $(this).offset().top - 90;
					});
				});
				
				$('.auto_height').on('hidden.bs.collapse', function (e) {
					$('.ui-jqgrid-bdiv').height(function(index, height){
						return window.innerHeight - $(this).offset().top - 90;
					});
				});
				
				//Solo se ejecutará esto si existe un div de filtros dinámicos
				$("#search_tabs_" + grid_id).bind('tabsactivate', function (e, ui) {
					$('.ui-jqgrid-bdiv').height(function(index, height){
						return window.innerHeight - $(this).offset().top - 90;
					});
				});
			}
    };
}

var datepicker = $.fn.datepicker.noConflict(); // return $.fn.datepicker to previously assigned value
$.fn.bootstrapDP = datepicker;                 // give $().bootstrapDP the bootstrap-datepicker functionality

// Setea eventos para elementos que serán creados en el futuro
$(document).on("DOMNodeInserted",function(evt){
    
    $(".datepicker", evt.target).datepicker({
        dateFormat:'dd/mm/yy',
        changeMonth:false,
        changeYear:false,
        dayNamesMin:['D', 'L', 'M', 'M', 'J', 'V', 'S'],
        monthNamesShort: ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'],
        monthNames: ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre']})
        .blur(function(){
            formatearFecha($(this));
        }).mask('99/99/99ZZ', {translation: {'Z': {pattern: /[0-9]/, optional: true}}})
        .css('text-align','center').attr("placeholder", "(DD/MM/AAAA)");
	
    $(".lupa_button", evt.target).each(function() {
        var events = $._data(this,'events');
        if(events && events['click']) return;
		
        $(this).click(function () {
            $("#"+$(this).attr('data-input-id')).click();
        });
    });
	
    $(".mascara_importe", evt.target).each(function() {
        var events = $._data(this,'events');
        if(events && events['keydown']) return;

        $(this).keydown(function (event) {
            if($(this).prop('readonly')) return;
            return controla_number(event, this, 2);
        });
    }).css('text-align','right');
	
    $(".mascara_numero", evt.target).each(function() {
        var events = $._data(this,'events');
        if(events && events['keydown']) return;
		
        $(this).keydown(function (event) {
            if($(this).prop('readonly')) return;
            return controla_number(event, this, 999);
        });
    }).css('text-align','right');
	
    $(".mascara_entero", evt.target).each(function() {
        var events = $._data(this,'events');
        if(events && events['keydown']) return;

        $(this).keydown(function (event) {
            if($(this).prop('readonly')) return;
            return controla_number(event, this, 0);
        });
    }).css('text-align','right');
	
	cargar_mascaras_frmwk(evt);
	
	//Titulos filtros estaticos

    var target_f_estatico = $('button.btn_filtros_estaticos').attr('data-target');

    $('button.btn_filtros_estaticos').hover(function(){ 
        if($(target_f_estatico).hasClass("in")){
            $('button.btn_filtros_estaticos').attr('title', 'Ocultar filtros');
        }else{
            $('button.btn_filtros_estaticos').attr('title', 'Mostrar filtros');
        }
    });
});

// Setea mascaras del frmwk para los elementos que se cargan en primera instancia
$(window).on("load", function (evt) {
	cargar_mascaras_frmwk(evt);
});

function cargar_mascaras_frmwk(evt){
	$(".mayusculas", evt.target).each(function() {
        var events = $._data(this,'events');
        if(events && events['keyup']) return;
        $(this).keyup(function(event){
            if($(this).prop('readonly')) return;
            $(this).val( $(this).val().toUpperCase() );            
        }).css("text-transform","uppercase")
          .keypress(function(event){
            forceKeyPressUppercase(event)
        });
    });
	
    // Clase para transformar texto a Minuscula
    $(".minusculas", evt.target).each(function() {
        var events = $._data(this,'events');
        if(events && events['keyup']) return;
        $(this).keyup(function(){
            if($(this).prop('readonly')) return;


            $(this).val( $(this).val().toLowerCase() );

        }).css("text-transform","lowercase");
    });
	
    $('.solo_entero', evt.target).keydown(function(evt){
        // Permite: backspace, delete, tab, escape, enter
        if ($.inArray(evt.keyCode, [46, 8, 9, 27, 13]) !== -1 ||
            // Permite: Ctrl+A, Command+A
            (evt.keyCode === 65 && (evt.ctrlKey === true || evt.metaKey === true)) ||
            // Permite: Ctrl+c, Command+c
            (evt.keyCode === 67 && (evt.ctrlKey === true || evt.metaKey === true)) ||
			// Permite: Ctrl+x, Command+x
            (evt.keyCode === 88 && (evt.ctrlKey === true || evt.metaKey === true)) ||
			// Permite: Ctrl+v, Command+v
            (evt.keyCode === 86 && (evt.ctrlKey === true || evt.metaKey === true)) ||
			// Permite: home, end, left, right, down, up
            (evt.keyCode >= 35 && evt.keyCode <= 40)) {
                // Permite que suceda el evento
                return;
        }
        
        // Se asegura que sea un numero y frena el evento de tecleo
        if ((evt.shiftKey || (evt.keyCode < 48 || evt.keyCode > 57)) && (evt.keyCode < 96 || evt.keyCode > 105)) {
            evt.preventDefault();
        }
    });
	
	$('.input_telefono', evt.target).keydown(function(evt){
        // Permite: backspace, delete, tab, escape, enter, space, - (board), - (numeric), (, )
        if ($.inArray(evt.keyCode, [46, 8, 9, 27, 13, 32, 109, 179, 56, 57]) !== -1 ||
            // Permite: Ctrl+A, Command+A
            (evt.keyCode === 65 && (evt.ctrlKey === true || evt.metaKey === true)) ||
			// Permite: Ctrl+c, Command+c
            (evt.keyCode === 67 && (evt.ctrlKey === true || evt.metaKey === true)) ||
			// Permite: Ctrl+x, Command+x
            (evt.keyCode === 88 && (evt.ctrlKey === true || evt.metaKey === true)) ||
			// Permite: Ctrl+v, Command+v
            (evt.keyCode === 86 && (evt.ctrlKey === true || evt.metaKey === true)) ||
            // Permite: home, end, left, right, down, up
            (evt.keyCode >= 35 && evt.keyCode <= 40)) {
                // Permite que suceda el evento
                return;
        }
        
        // Se asegura que sea un numero y frena el evento de tecleo
        if ((evt.shiftKey || (evt.keyCode < 48 || evt.keyCode > 57)) && (evt.keyCode < 96 || evt.keyCode > 105)) {
            evt.preventDefault();
        }
    });
	
    $('.entero_4_digitos', evt.target).keydown(function(evt){
            // Permite: backspace, delete, tab, escape, enter
        if ($.inArray(evt.keyCode, [46, 8, 9, 27, 13]) !== -1 ||
            // Permite: Ctrl+A, Command+A
            (evt.keyCode === 65 && (evt.ctrlKey === true || evt.metaKey === true)) ||
             // Permite: Ctrl+c, Command+c
            (evt.keyCode === 67 && (evt.ctrlKey === true || evt.metaKey === true)) ||
			// Permite: Ctrl+x, Command+x
            (evt.keyCode === 88 && (evt.ctrlKey === true || evt.metaKey === true)) ||
			// Permite: Ctrl+v, Command+v
            (evt.keyCode === 86 && (evt.ctrlKey === true || evt.metaKey === true)) ||
			// Permite: home, end, left, right, down, up
            (evt.keyCode >= 35 && evt.keyCode <= 40)) {
                // Permite que suceda el evento
                return;
        }
		
        // Se asegura que sea un numero y frena el evento de tecleo
        if ((evt.shiftKey || (evt.keyCode < 48 || evt.keyCode > 57)) && (evt.keyCode < 96 || evt.keyCode > 105)) {
            evt.preventDefault();
        }
		
        // Si es del largo 4, frena el evento de tecleo (salvo que esté "selected" el texto)
        if(this.value.length == 4){
            var startPos = this.selectionStart;
            var endPos = this.selectionEnd;
            var doc = document.selection;
            if(doc && doc.createRange().text.length != 0){
                return;
            }else if (!doc && this.value.substring(startPos,endPos).length != 0){
                return;
            }
            evt.preventDefault();
        }
    });
}

function limpiar_grillas_hijas(grid_childs){    
    $.each(grid_childs, function( grid_child_name, grid_child_id ) {
        var child_postdata = $(grid_child_id).getGridParam('postData');
        
        var child_param = eval('(' +child_postdata.param+ ')');
        var child_init_param = eval('(' +child_postdata.param_init+ ')');
        var new_child_param = {};
        
        $.each(child_param, function(key, value){ new_child_param[key] = null; });
        $.extend(new_child_param, child_init_param);
        setea_parametros(grid_child_id, new_child_param, child_postdata.m_autoquery);
        limpiar_grillas_hijas(child_postdata.grid_childs_id);
    });
}

// FUNCIONES EDICION EN LINEA

function defaultOnEditFunc(_ext_func){
	var ext_func = typeof(_ext_func) === 'undefined' ? function() {null;} : _ext_func;
	return function(id){
		$(".editable").addClass("input-sm");
		var shift = false;
		$(".editable:not([disabled])").last().keydown(function(presionada){
							
			if(presionada.keyCode == 16){
				shift = true;
			}else if(presionada.keyCode == 9 && !shift){
				var sig = id;
				sig++;
				var enter = jQuery.Event("keydown");
				enter.which = 13; 
				enter.keyCode = 13;
				$(this).trigger(enter);
				presionada.preventDefault();
				
			}
		});


		$(".editable:not([disabled])").keyup(function(presionada){
							
			if(presionada.keyCode == 16){
				shift = false;
			}
		});

$(".mayusculas").each(function() {
	var events = $._data(this,'events');
	if(events && events['keyup']) return;
	$(this).keyup(function(){
		if($(this).prop('readonly')) return;
		$(this).val( $(this).val().toUpperCase() );
	}).css("text-transform","uppercase");

});

 $(".datepicker:not([readonly])").datepicker({
	dateFormat:'dd/mm/yy',
	changeMonth:false,
	changeYear:false,
	dayNamesMin:['D', 'L', 'M', 'M', 'J', 'V', 'S'],
	monthNamesShort: ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'],
	monthNames: ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre']})
	.blur(function(){
		formatearFecha($(this));
	}).mask('99/99/99ZZ', {translation: {'Z': {pattern: /[0-9]/, optional: true}}})
	.css('text-align','center').attr("placeholder", "(DD/MM/AAAA)");

$(".lupa_button").each(function() {
	var events = $._data(this,'events');
	if(events && events['click']) return;

	$(this).click(function () {
		$("#"+$(this).attr('data-input-id')).click();
	});
});

$(".mascara_importe").each(function() {
	var events = $._data(this,'events');
	if(events && events['keydown']) return;

	$(this).keydown(function (event) {
		if($(this).prop('readonly')) return;
		return controla_number(event, this, 2);
	});

}).css('text-align','right');

$(".mascara_numero").each(function() {
	var events = $._data(this,'events');
	if(events && events['keydown']) return;

	$(this).keydown(function (event) {
		if($(this).prop('readonly')) return;
		return controla_number(event, this, 999);
	});

}).css('text-align','right');

$(".mascara_entero").each(function() {
	var events = $._data(this,'events');
	if(events && events['keydown']) return;

	$(this).keydown(function (event) {
		if($(this).prop('readonly')) return;
		return controla_number(event, this, 0);
	});

}).css('text-align','right');

	   
		ext_func(id);

	};
}

function defaultSuccesFunc(id, _ext_func){
	var ext_func = typeof(_ext_func) === 'undefined' ? function() {return true;} : _ext_func;
	return function(response){
	var resp = eval('('+response.responseText+')');
		if(resp.resultado != "OK"){
			mostrar_cuadro('E','Error', resp.resultado);
			return false;
		 }else{
			var sig = id;
				sig++;
			$("#"+sig).click();
			ext_func();
				 return true;
		 }

	}
}

function defaultBeforeSaveRow(_ext_func) {      
	var ext_func = typeof(_ext_func) === 'undefined' ? function() {return true;} : _ext_func;
	
	return function(id){            
		$("[id*=0_]").attr('data-prompt-position', "bottomRight");
		var invalido = false;                   
		$(".editable").each(function(){
			$(this).validationEngine("validate");
			invalido = invalido || $(this).validationEngine("validate");
			});
		if(invalido)
			return false;
		else
			return ext_func(id); //debe devolver true si desa guardar los datos o false si no se desea enviar
	}
}

//FIN FUNCIONES EDICION EN LINEA

/* JC: Modifica el comportamiento del cursor, manteniendo la posición actual y evitando ir hasta el final de una string */
function forceKeyPressUppercase(e)
{
	var charInput = e.keyCode;
	if((charInput >= 97) && (charInput <= 122)) { // lowercase
	if(!e.ctrlKey && !e.metaKey && !e.altKey) { // no modifier key
		var newChar = charInput - 32;
		var start = e.target.selectionStart;
		var end = e.target.selectionEnd;
		e.target.value = e.target.value.substring(0, start) + String.fromCharCode(newChar) + e.target.value.substring(end);
		e.target.setSelectionRange(start+1, start+1);
		e.preventDefault();
	}
	}
}
