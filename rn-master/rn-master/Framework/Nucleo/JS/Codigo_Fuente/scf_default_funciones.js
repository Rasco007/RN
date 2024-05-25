/*** DEFAULT JQGRID SETTINGS */
;(function($){

    $.extend(true, $.jgrid.icons, {
        glyphIcon: {
            //common: "",
            pager: {
                common: "glyphicon",
                first: "glyphicon-fast-backward",
                prev: "glyphicon-backward",
                next: "glyphicon-forward",
                last: "glyphicon-fast-forward"
            },
            sort: {
                common: "glyphicon",        // common: "",
                asc: "glyphicon-triangle-top",      // asc: "fa-sort-amount-asc",
                desc: "glyphicon-triangle-bottom"   // desc: "fa-sort-amount-desc"
            },
            gridMinimize: {
                common: "glyphicon",
                visible: "glyphicon-chevron-up",
                hidden: "glyphicon-chevron-down"
            },
            nav: {
                common: "glyphicon",
                edit: "glyphicon-pencil",
                add: "glyphicon-plus",
                del: "glyphicon-trash",
                search: "glyphicon-search",
                refresh: "glyphicon-refresh",
                view: "glyphicon-open-file",
                save: "glyphicon-save",
                cancel: "glyphicon-ban-circle",
                newbutton: "glyphicon-link"
            },
            actions: {
                common: "glyphicon",
                edit: "glyphicon-pencil",
                del: "glyphicon-trash",
                save: "glyphicon-save",
                cancel: "glyphicon-ban-circle"
            },
            form: {
                common: "glyphicon",
                close: "glyphicon-remove-sign",
                prev: "glyphicon-chevron-left",
                next: "glyphicon-chevron-right",
                save: "glyphicon-floppy-saved",
                undo: "glyphicon-share-alt",
                del: "glyphicon-trash",
                cancel: "glyphicon-ban-circle",
                resizableLtr: "glyphicon-resize-full"
            },
            search: {
                common: "glyphicon",
                search: "glyphicon-search",
                reset: "glyphicon-share-alt",
                query: "glyphicon-comment"
            },
            subgrid: {
                common: "glyphicon",
                plus: "glyphicon-plus",
                minus: "glyphicon-minus",
                openLtr: "glyphicon-triangle-right",
                openRtl: "glyphicon-triangle-left"
            },
            grouping: {
                common: "glyphicon",
                plus: "glyphicon-plus",
                minus: "glyphicon-minus"
            },
            treeGrid: {
                common: "glyphicon",
                minus: "glyphicon-minus",
                leaf: "glyphicon-record",
                plusLtr: "glyphicon-triangle-right",
                plusRtl: "glyphicon-triangle-left"
            }
        }
    });

    $.extend($.jgrid.defaults, {
        datatype: "json",
        autowidth: true,
        height: 180,
        mtype:'POST',
        altRows: true,
        export_data: true,
        rowNum:50,
        rowList:[50,100,500,9999999],
        shrinkToFit: true,
        guiStyle: "bootstrap",
        iconSet: "glyphIcon",
        loadtext: '<img class="img_loading" src="../Framework/Imagenes/loading.gif" alt=""/> Cargando...',
        viewrecords: true,
        sortname:1,
        url: globUrlAjaxWebservice+'scf_grid_loader.php?status=data',
        editurl: globUrlAjaxWebservice+"scf_grid_loader.php?status=form",
        loadError: function(xhr,textStatus,err) {
            var mensaje;

            if (xhr.responseText !=''){
                mensaje = xhr.responseText;
            }else {
                mensaje = 'Se ha producido el siguiente error: '+ err;
            }

            if(err != '' && err != null && err != 'null' && err != 'OK' && err != 'ok')
                mostrar_error(mensaje);
        },
        onInitGrid: function() {
            if($(this).getGridParam('export_data')) {
                var pager_id = $(this).getGridParam('pager');
                var tmp_pager_id = pager_id.replace('#','');
                var grid_id = $(this).getGridParam('id');
                var title = $('#gview_'+grid_id+' .ui-jqgrid-title').text();
                var urlexcel = globUrlAjaxWebservice+'scf_export_loader.php?status=excel';
                var urlpdf = globUrlAjaxWebservice+'scf_export_loader.php?status=pdf';
                $('body').append('<div id="dialog_tipo_informe_'+tmp_pager_id+'" class="dialog_tipo_informe">'+
                    '<button onclick="config_pdf(\''+tmp_pager_id+'\', \''+grid_id+'\')" class="bt_pdf" type="button"></button>'+
                    '<div class="clear-fix"></div>'+
                    '<label class="lbl_orientacion">Orientaci&oacute;n: </label>'+
                    '<select class="orientacion">'+
                    '<option value="V">Vertical</option>'+
                    '<option value="H">Horizontal</option>'+
                    '</select>'+
                    '<span class="enlaces" style="margin-left:10px;">'+
                    '<a class="enlace_azul" href="javascript:select_pdf(\''+tmp_pager_id+'\', true)">Seleccionar</a> o '+
                    '<a class="enlace_azul" href="javascript:select_pdf(\''+tmp_pager_id+'\', false)">Deseleccionar</a> todos.'+
                    '</span>'+
                    '<div class="container-fluid"><div class="content_list_pdf row"></div></div>'+
                    '<div class="clear-fix"></div>'+
                    '<textarea class="txt_comentario_informe"></textarea>'+
                    '<div class="clear-fix"></div>'+
                    '<div class="container-fluid"><div class="row">' +
                        '<button onclick="genera_pdf(\''+tmp_pager_id+'\', \''+title+'\',\''+urlpdf+'\')" class="genera_pdf bt_dialog_informe btn btn-default" type="button"><span class="glyphicon glyphicon-file"></span>Imprimir PDF</button>'+
                        '<button onclick="genera_excel(\''+tmp_pager_id+'\', \''+title+'\',\''+urlexcel+'\')" class="bt_excel bt_dialog_informe btn btn-default" type="button"><span class="glyphicon glyphicon-list-alt"></span>Generar Excel</button>'+
                        '<button onclick="cancelar_pdf(\''+tmp_pager_id+'\')" class="cancelar_pdf bt_dialog_informe btn btn-default" type="button"><span class="glyphicon glyphicon-remove"></span>Cancelar</button>'+
                        '<button onclick="add_comentario(\''+tmp_pager_id+'\')" class="add_comentario bt_dialog_informe btn btn-default" type="button"><span class="glyphicon glyphicon-comment"></span>Comentario</button>'+
                    '</div></div>'+
                    '</div>');

                $('#dialog_tipo_informe_'+tmp_pager_id).dialog({
                    title:'Seleccionar Tipo Informe',
                    width:550,
                    height:'auto',
                    modal: true,
                    autoOpen: false
                });

                var grid = this;
                $(pager_id).one("DOMNodeInserted",
                    '.navtable',
                    {'grid':grid,'pager_id':pager_id},function(evt){
                        $(evt.data.grid).navButtonAdd(evt.data.pager_id, {
                            caption: '',
                            id:'bt_informe_'+(evt.data.pager_id).replace('#',''),
                            title: 'Imprimir Excel o PDF',
                            buttonicon: 'glyphicon-print',
                            onClickButton: function(){
                                var cant_registros =  $(this).jqGrid('getGridParam', 'records');
                                var id_grid = $(this).jqGrid('getGridParam', 'id');
                                if(cant_registros <= 0){
                                    mostrar_cuadro('E','Error', 'La grilla no posee registros para generar el informe.');
                                }else{

                                    var tmp_posDataInforme = $(this).getGridParam('postData');
                                    tmp_posDataInforme.id_grid = id_grid;

                                    openDialogInformes( tmp_posDataInforme, tmp_pager_id );
                                    config_pdf(tmp_pager_id,id_grid);
                                }
                            },
                            position:"last"
                        });
                    });

            }
        }
    });

    // DEFAULTS: para los navigators
    $.extend($.jgrid.nav, {
        refresh:    true,
        search:     false,
        edit:       false,
        add:        false,
        del:        false
    });

    // DEFAULTS: para los botones Add
    $.jgrid.add = $.jgrid.add || {};
    $.extend($.jgrid.add, {
        width:570,
        drag:true,
        reloadAfterSubmit:true,
        closeAfterAdd:true,
        closeAfterEdit:true,
        beforeShowForm: defaultBeforeShowForm(),
        onInitializeForm: defaultInitForm(),
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
            return false;
            //return ret;
        },
        afterSubmit:evaluaABM
    });



    // DEFAULTS: para los botones Edit
    $.jgrid.edit = $.jgrid.edit || {};
    $.extend($.jgrid.edit, {
        width:570,
        drag:true,
        reloadAfterSubmit:true,
        closeAfterEdit:true,
        closeAfterAdd:true,
        beforeShowForm: defaultBeforeShowForm(),
        onInitializeForm: defaultInitForm(),
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
    $.jgrid.del = $.jgrid.del || {};
    $.extend($.jgrid.del, {
        width:570,
        drag:true,
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

    // DEFAULTS: para los botones Search
    $.jgrid.search = $.jgrid.search || {};
    $.extend($.jgrid.search, {});

    // DEFAULTS: para los Ajax
    $.ajaxSetup({
        'error':function(xhr, textStatus, err) {
            var mensaje;

            if (xhr.responseText != ''){
                mensaje = xhr.responseText;
            }else {
                mensaje = 'Se ha producido el siguiente error: '+ err;
            }

            if(err != '' && err != null && err != 'null' && err != 'OK' && err != 'ok')
                alert(mensaje);
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

        ext_func(formid);

    };

}

$(document).on("DOMNodeInserted",function(evt){

    $(".datepicker", evt.target).datepicker({
            dateFormat:'dd/mm/yy',
            changeMonth:false,
            changeYear:false,
            dayNamesMin:['D', 'L', 'M', 'M', 'J', 'V', 'S'],
            monthNamesShort: ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'],
            monthNames: ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre']})
       // .blur(function(){
         //   alert('hola');
          //  formatearFecha($(this));
       // })
		//.mask('99/99/99ZZ', {translation: {'Z': {pattern: /[0-9]/, optional: true}}})
        .css('text-align','center');


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
            return controla_number(event, this, 2);
        });
    }).css('text-align','right');


    $(".mascara_numero", evt.target).each(function() {
        var events = $._data(this,'events');
        if(events && events['keydown']) return;

        $(this).keydown(function (event) {
            return controla_number(event, this, 999);
        });
    }).css('text-align','right');


    $(".mascara_entero", evt.target).each(function() {
        var events = $._data(this,'events');
        if(events && events['keydown']) return;

        $(this).keydown(function (event) {
            return controla_number(event, this, 0);
        });
    }).css('text-align','right');

    $(".mayusculas", evt.target).each(function() {
        var events = $._data(this,'events');
        if(events && events['keyup']) return;

        $(this).keyup(function(){
            $(this).val( $(this).val().toUpperCase() );
        }).css("text-transform","uppercase");
    });

});

$.extend($.ui.autocomplete.prototype.options, {
    request: null,
    minLength:3,
    map: function() {
        console.log('El autocomplete no tiene definida una función "map".');
    },
    url: "../modulos/ajax_genericos/autocomplete.php",
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

function create_grid(selector, grid, type){
    switch(type){
        case 'SQL':
            addColumnHeaders(grid.header, selector);
            addContentBody(grid.rows, selector);
            break;
        case 'MENU':
            addColumnHeaders(grid.header, selector);
            addContentBody(grid.rows, selector);
            break;
        case 'JQGRID':
            create_jqgrid(grid, selector);
            break;
        default: alert('Tipo de grilla erroneo');
    }

    //addPager();
}

function addColumnHeaders(row, selector){
    row = JSON.stringify(row);
    var columnSet = '<tr>';
    try {
        $.each($.parseJSON(row), function (key, val) {
            columnSet = columnSet + '<th id="'+key+'">' + val.COLUMN_VALUE + '</th>';
        });
        columnSet = columnSet + '</tr>';
        $(selector+' thead').html(columnSet);
    }
    catch(err){
        alert(err.message);
    }
}

function addContentBody(rows, selector){
    var content = '';
    try {
        $.each(rows, function(indArr, valArr){
            content = content + '<tr id="row_'+valArr.id+'">';
            $.each(valArr.cell, function( index, value ){
                content = content + '<td id="indexCol_'+index+'">' + value + '</td>';
            });
            content = content + '</tr>';
        });
        $(selector+' tbody').html(content);
    }
    catch(err){
        alert(err.message);
    }
}

function create_jqgrid(_settings){

    var settings = $.extend({
        autoquery: 'S',
        param:{},
        fields_sql: globUrlAjaxWebservice+'scf_grid_loader.php'
    },_settings);

    this.id_menu    =   settings.id_menu;
    this.n_grid     =   settings.n_grid;
    this.autoquery  =   settings.autoquery;
    this.extra_param =  settings.param;
    this.n_orden =      settings.n_orden;
    var param_ajax = this.extra_param;
    $.extend(param_ajax,{'id_menu':this.id_menu,'n_grid':this.n_grid});
    var grid = {};
    var headers = {};
    var rows = {};

    var obj_CamposGrilla = this;
    var campos = new Array();
    
    $.ajax(settings.fields_sql,{
        async:      false,
        dataType:   'json',
        type:       'POST',
        success: function(data) {
            grid = data.grid;
            headers = JSON.stringify(grid.header);
            rows = JSON.stringify(grid.rows);
        },
        error:function(xhr, textStatus, err) {
            var mensaje;

            if (xhr.responseText != ''){
                mensaje = xhr.responseText;
            }else {
                mensaje = 'Se ha producido el siguiente error cargando los datos de la grilla: '+ err;
            }

            if(err != '' && err != null && err != 'null' && err != 'OK' && err != 'ok')
                alert(mensaje);
        },
        data: param_ajax
    });

    this.colNames = function () {
        var cols = new Array();
        $.each($.parseJSON(headers), function (key, val) {
            cols[key] = getVal(val.COLUMN_VALUE);
        });
        return cols;
    };

    this.colModel = function() {
        var colMod = new Array();

        $.each($.parseJSON(headers), function (key, val) {
            var clase = "validate[";
            clase += (getVal(val.M_OBLIGATORIO) == 'S') ? 'required,' : '';
            clase += (val.D_VALIDA_DATO == null) ? '' : val.D_VALIDA_DATO+',';
            clase += getVal(val.D_VALIDACION);
            clase += '] FormElement ';
            clase += getVal(val.D_CLASE);

            var o_editoptions = $.extend({
                'class':clase,
                size:50
            }, eval('({'+getVal(val.D_EDITOPTIONS)+'})') || {});


            if(getVal(val.M_READONLY) == 'S') {
                $.extend(o_editoptions,{readonly:'readonly'});
            }

            if(getVal(val.N_ID_LISTA)){
                clase += ' lupa_input';
                $.extend(o_editoptions, {
                    'class':clase,
                    'data-id-lista': getVal(val.N_ID_LISTA)
                });
            }

            var o_colOptions = {
                name:           getVal(val.D_COLUMN_NAME),
                index:          getVal(val.D_COLUMN_NAME),
                width:          100,
                align:'         left',
                hidden:         (getVal(val.M_VISIBLE) == 'S') ? false : true,
                editable:       (getVal(val.M_EDITABLE) == 'S') ? true : false,
                editoptions:    o_editoptions
            };

            var descripcion = (getVal(val.M_OBLIGATORIO) == 'S')? getVal(val.COLUMN_VALUE) + ' (*)' : getVal(val.COLUMN_VALUE);

            if(getVal(val.N_ID_LISTA)){
                $.extend(o_colOptions,{
                    formoptions:{
                        label:descripcion,
                        elmsuffix: '<button type="button" tabindex="-1" class="btn btn-default btn-lupa lupa_button" data-input-id="'+getVal(val.D_COLUMN_NAME)+'" id="'+getVal(val.D_COLUMN_NAME)+'_lupa">'+
                    '<span title="Lista de valores" class="glyphicon glyphicon-search"  aria-hidden="true" width="50px"></span>'+
                    '</button>'
                    }
                });
            }
            else{
                $.extend(o_colOptions,{
                    formoptions:{label:descripcion,elmsuffix:''}
                });
            }
            colMod[key] = $.extend(o_colOptions, eval('({'+ getVal(val.D_EXTRA_PARAM_DEFAULT) +'})') || {});

        });

        return colMod;
    };

    this.postData = function() {
        return {
            id_menu:    this.id_menu,
            n_grid:     this.n_grid,
            autoquery:  this.m_autoquery,
            n_orden:    this.n_orden,
            param:      JSON.stringify(this.extra_param)};
    };

}

function getVal(str){
    return (str === null)? '' : str;
}

function llamar_report_ws(id_menu,c_tipo_reporte, param, c_impresion){
    if(c_impresion == null || c_impresion == 'undefined' || c_impresion == ''){
        c_impresion = 'PDF';
    }

    if(param == null || param == 'undefined'){
        param = '';
    }

    $.post(
        globUrlAjaxWebservice+"llamar_report_ws.php",
        {
            "c_tipo_report":c_tipo_reporte,
            "parametros":param,
            "server_name": window.location.hostname,
            'c_impresion':c_impresion,
            'id_menu':id_menu
        },
        function(data_rep){
            var ret = eval('('+data_rep+')');

            if (ret.formats.length <= 1 ) {
                window.open(
                    FUNCIONES_BASEPATH+'reporte.php?id_sesion='+ret.id_session+'&c_impresion='+c_impresion+'&format='+ret.formats[0],
                    "",
                    "scrollbars=yes, menubar=no,resizable=no,directories=no,location=no"
                );
            } else {
                var html = "<center>";
                for(i=0;i<ret.formats.length;i++){
                    if(i == 0){
                        html = html + "<input type='radio' name='formats_jasper' value='"+ret.formats[i]+"' checked='checked'> "+ret.formats[i];
                    } else {
                        html = html + "<input type='radio' name='formats_jasper' value='"+ret.formats[i]+"'> "+ret.formats[i];
                    }
                }
                html = html + "</center>";
                try{
                    $('#popup_jasper').dialog( "destroy" );
                    document.getElementById("popup_jasper").innerHTML = html;
                } catch(err) {
                    document.getElementById("popup_jasper").innerHTML = html;
                }

                $("#popup_jasper").dialog({
                    autoOpen: false,
                    modal:false,
                    width: 275,
                    height:125,
                    title: 'Elija el formato del reporte: ',
                    buttons: {
                        "Imprimir": function() {
                            window.open(
                                FUNCIONES_BASEPATH+'reporte.php?id_sesion='+ret.id_session+
                                '&c_impresion='+c_impresion+'&format='+$('input[name=formats_jasper]:checked').val(),
                                "",
                                "scrollbars=yes, menubar=no,resizable=no,directories=no,location=no"
                            );
                            $( this ).dialog( "close" );
                        },
                        'Cancelar': function() {
                            $( this ).dialog( "close" );
                        }
                    }
                });

                $("#popup_jasper").dialog('open');
            }
        }
    );
}


// DEPRECATED API DE BROWSER PARA JQUERY 3.1.1
(function() {

    var matched, browser;

// Use of jQuery.browser is frowned upon.
// More details: http://api.jquery.com/jQuery.browser
// jQuery.uaMatch maintained for back-compat
    jQuery.uaMatch = function( ua ) {
        ua = ua.toLowerCase();

        var match = /(chrome)[ \/]([\w.]+)/.exec( ua ) ||
            /(webkit)[ \/]([\w.]+)/.exec( ua ) ||
            /(opera)(?:.*version|)[ \/]([\w.]+)/.exec( ua ) ||
            /(msie) ([\w.]+)/.exec( ua ) ||
            ua.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec( ua ) ||
            [];

        return {
            browser: match[ 1 ] || "",
            version: match[ 2 ] || "0"
        };
    };

    matched = jQuery.uaMatch( navigator.userAgent );
    browser = {};

    if ( matched.browser ) {
        browser[ matched.browser ] = true;
        browser.version = matched.version;
        if(matched.browser!='msie'){
            browser.msie = null;
        };
    }

// Chrome is Webkit, but Webkit is also Safari.
    if ( browser.chrome ) {
        browser.webkit = true;
    } else if ( browser.webkit ) {
        browser.safari = true;
    }

    jQuery.browser = browser;
})();

//<editor-folder desc='/* funciones de impresion en dialog de scf */'>
function genera_pdf_scf(){
    
}
//</editor-folder>