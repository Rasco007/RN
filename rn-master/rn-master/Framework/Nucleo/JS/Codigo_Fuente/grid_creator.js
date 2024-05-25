// MPampin
// Creador de grillas parametrizadas en la base de datos

function GridParam(_settings) { //_id_menu, _n_grid, _m_autoquery, _extra_param, _n_orden) {
	
    var settings = $.extend({
        m_autoquery:'S',
        param:{},
        fields_sql:FUNCIONES_BASEPATH+'grid_fields_sql.php',
        grid_childs_id:{},
		keyNavigation: true,
		altoGrillaDinamico: false
    },_settings);
	
    var obj_CamposGrilla = this;
	
    var campos = new Array();
	
    this.id_menu = settings.id_menu;
    this.n_grid = settings.n_grid;
    this.m_autoquery = settings.m_autoquery;
    this.extra_param = settings.param;
    this.n_orden = settings.n_orden;
    this.grid_childs_id = settings.grid_childs_id;
    this.keyNavigation = settings.keyNavigation;
    this.altoGrillaDinamico = settings.altoGrillaDinamico;
	
    var param_ajax = this.extra_param;
    $.extend(param_ajax,{'id_menu':this.id_menu,'n_grid':this.n_grid});
	
    $.ajax(settings.fields_sql,{
        async:false,
        dataType: 'json',
        type:'POST',
        success: function(data, textStatus, jqXHR) {
            for(var i=0; i<data.length; i++) {
                campos[data[i].N_COLUMN] = new GridField(data[i]);
            }
        },
        error:function(xhr, textStatus, err) {
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
        },
        data: param_ajax
    });
	
    this.colNames = function () {
        cols = new Array();
        for(i=0; i<campos.length; i++) {
            cols[campos[i].getIndex()] = campos[i].getTitle();
        }
        return cols;
    };
	
    this.colModel = function() {
		
		cols = new Array();
		
        for(var i=0; i<campos.length; i++) {
			
            var campo = campos[i];
			
            var clase = "validate[";
            clase += campo.getRowValue('M_OBLIGATORIO') == 'S' ? 'required,' : '';
            clase += campo.getRowValue('D_VALIDA_DATO') + ',';
            clase += campo.getRowValue('D_VALIDACION') + '] FormElement ';
            clase += campo.getRowValue('D_CLASE');
			
            var o_editoptions = $.extend({
                'class':clase,
                 size:50
            }, eval('({'+campo.getRowValue('D_EDITOPTIONS')+'})') || {});
			
            if(campo.getRowValue('M_READONLY') == 'S') {
                $.extend(o_editoptions,{readonly:'readonly'});
            }
			
            if(campo.getRowValue('N_ID_LISTA')) {
                clase += ' lupa_input';
                $.extend(o_editoptions, {
                    'class':clase,
                    'data-id-lista': campo.getRowValue('N_ID_LISTA')
                });
            }
			
            var o_colOptions = {
                name:campo.getRowValue('D_COLUMN_NAME') ,
                index:campo.getRowValue('D_COLUMN_NAME'),
                frmwktype:campo.getRowValue('C_TIPO_DATO'),
                width:100,
                align:'left',
                searchoptions: { sopt: ["LIKE","IGU","LIKSTART","LIKEND","MENIGU","MAYIGU","nu"] } ,
                hidden: campo.getRowValue('M_VISIBLE') == 'S' ? false : true,
                hidedlg: campo.getRowValue('M_VISIBLE_DLG') == 'S' ? false : true,
                editable: campo.getRowValue('M_EDITABLE') == 'S' ? true : false,
                editrules:{
                    //required: (campo.getRowValue('M_OBLIGATORIO') == 'S' )? true : false,
                    edithidden: (campo.getRowValue('M_EDITABLE') == 'S'
                                    && campo.getRowValue('M_VISIBLE') == 'S' )? true : false
                },

                coloptions : {
                    sorting: true,
                    columns: campo.getRowValue('M_COLUMNS') == 'S' ? true : false,
                    filtering: false,
                    seraching: false,
                    //grouping: campo.getRowValue('M_GROUPING') == 'S' ? true : false,
                    grouping: false,
                    freeze : campo.getRowValue('M_FREEZE') == 'S' ? true : false
                },
                editoptions: o_editoptions
            };
			
            var descripcion;
            if(campo.getRowValue('M_OBLIGATORIO') == 'S') {
                descripcion = campo.getTitle() + ' (*)';
            }else{
                descripcion = campo.getTitle();
            }
			
            if(campo.getRowValue('N_ID_LISTA')) {
                $.extend(o_colOptions,{
                    formoptions:{label:descripcion,elmprefix:'<div class="div_lup"><button type="button" tabindex="-1" class="btn btn-primary glyphicon glyphicon-search lupa_button" data-input-id="'+campo.getRowValue('D_COLUMN_NAME')+'" id="'+campo.getRowValue('D_COLUMN_NAME')+'_lupa">'+
                    '</button></div>'}
                });
            }else{
                $.extend(o_colOptions,{
                    formoptions:{label:descripcion,elmsuffix:' ' + campo.getRowValue('MASCARA')}
                });
            }
			
            if(campo.getRowValue('D_CLASE') == 'datepicker'){
               $.extend(o_colOptions,{                    
                    searchoptions:{
                            sopt: ["IGU","MENIGU","MAYIGU","nu"],
                            dataInit: function (element) {
                               $(element).datepicker({
                                    autoclose: true,
                                    format: 'dd/mm/yyyy',
                                    dateFormat:'dd/mm/yy',
                                    changeMonth:false,
                                    changeYear:false,
									onClose: function () {
										$(this).focus();
									},
                                    dayNamesMin:['D', 'L', 'M', 'M', 'J', 'V', 'S'],
                                    monthNamesShort: ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'],
                                    monthNames: ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre']
                                }).blur(function(){
									formatearFecha($(this));
								}).keypress(function(e) {
                                    if(e.which == 13) {
                                        formatearFecha($(this));
                                    }
								}).mask('99/99/99ZZ', {translation: {'Z': {pattern: /[0-9]/, optional: true}}})
								.css('text-align','center').attr("placeholder", "DD/MM/AAAA");
                           }
                    } 
                });
            }
			
            if(campo.getRowValue('D_CLASE') == 'mascara_importe'){
               $.extend(o_colOptions,{                    
                    searchoptions:{
						sopt: ["LIKE","IGU","LIKSTART","LIKEND","MENIGU","MAYIGU","nu"],
						dataInit: function (element) {
							$(element).keydown(function (event) {
								controla_number(event, this, 2);
							});

							$(element).focus(function(){
								$(element).val(",00");
								$(element).get(0).setSelectionRange(0,0);
							})
						}
                    } 
                });
            }
            cols[campo.getIndex()] = $.extend(o_colOptions,eval('({'+campos[i].getRowValue('D_EXTRA_PARAM_DEFAULT')+'})') || {});
        }
        return cols;
    };
	
    this.postData = function() {
        return {
            id_menu:this.id_menu,
            n_grid:this.n_grid,
            m_autoquery:this.m_autoquery,
            n_orden:this.n_orden,
            grid_childs_id:this.grid_childs_id,
            keyNavigation:this.keyNavigation,
            altoGrillaDinamico:this.altoGrillaDinamico,
            param_init:JSON.stringify(this.extra_param),
            param:JSON.stringify(this.extra_param)};
    };
}

function GridField(_row) {
    var row = _row;
	
    this.getTitle = function() {
        return row.D_COLUMN_TITLE;
    };
	
    this.getIndex = function() {
        return row.N_COLUMN;
    };
	
    this.getRowValue = function (campo) {
        return row[campo] === null ? '' : row[campo];
    };
}

// DEPRECATED API DE BROWSER PARA JQUERY 3.1.1
(function() {
    var matched, browser;
	
	// Use of jQuery.browser is frowned upon.
	// More details: http://api.jquery.com/jQuery.browser
	// jQuery.uaMatch maintained for back-compat
    jQuery.uaMatch = function(ua) {
        ua = ua.toLowerCase();
		
        var match = /(chrome)[ \/]([\w.]+)/.exec(ua) ||
            /(webkit)[ \/]([\w.]+)/.exec(ua) ||
            /(opera)(?:.*version|)[ \/]([\w.]+)/.exec(ua) ||
            /(msie) ([\w.]+)/.exec( ua ) ||
            ua.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(ua) ||
            [];
		
        return {
            browser: match[1] || "",
            version: match[2] || "0"
        };
    };
	
    matched = jQuery.uaMatch( navigator.userAgent );
    browser = {};
	
    if (matched.browser) {
        browser[matched.browser] = true;
        browser.version = matched.version;
        if(matched.browser!='msie'){
            browser.msie = null;
        };
    }

	// Chrome is Webkit, but Webkit is also Safari.
    if (browser.chrome) {
        browser.webkit = true;
    } else if (browser.webkit) {
        browser.safari = true;
    }
	
    jQuery.browser = browser;
})();