function inicializarGrillas(){


    $("#main_grid").jqGrid({
        colNames:datos_main_grid.colNames(),
        colModel:datos_main_grid.colModel(),
        pager: $('#main_grid_pager'),
        postData:datos_main_grid.postData(),
        editurl: FUNCIONES_BASEPATH+"maestro_abm.php",
        shrinkToFit: false,
        autowidth: false,
        sortname:'n_cuit, f_certificado',
        sortorder:'asc',
        height:170,
        loadComplete:function(){
            filtros_no_nativos_ar['main_grid'] = filtros_arr_main;
        },
        onSelectRow: function(id) {
            $('#observacion').val($('#main_grid').getCell(id, 'd_observacion'));
            $('#padron_desde').val($('#main_grid').getCell(id, 'n_periodo_desde'));
        }
    }).navGrid('#main_grid_pager',
        {add:false, edit:false, del:false}, //options
        {},//edit,
        {
        },//alta
        {},//del
        {}//search
    );


    $("#detalles_grid").jqGrid({
        colNames:datos_detalles_grid.colNames(),
        colModel:datos_detalles_grid.colModel(),
        pager: $('#detalles_grid_pager'),
        postData:datos_detalles_grid.postData(),
        editurl: FUNCIONES_BASEPATH+"maestro_abm.php",
        sortname:'c_tributo',
        sortorder:'asc',
        autowidth: false,
        height:230,
        loadComplete:function(){
            $('#main').procOverlay({visible:false});

            if($('#detalles_grid').getGridParam('records') <= 0){
                $('#bt_informe_detalles_grid_pager').hide();
                $('#div_d_msg').hide();
                $('#id_contribuyente').hide();
            }else{
                var id = $("#detalles_grid").jqGrid('getDataIDs')[0];
                $("#detalles_grid").jqGrid('setSelection', id);
                $('#bt_informe_detalles_grid_pager').show();
                $('#div_d_msg').show();
                $('#id_contribuyente').show();
            }
        },
        onSelectRow: function(id) {
            $('#d_objeto_hecho_filtro').val($('#detalles_grid').getCell(id, 'd_objeto_hecho'));
            $('#d_denominacion_filtro').val($('#detalles_grid').getCell(id, 'd_denominacion'));
            $('#f_padron_desde').val($('#detalles_grid').getCell(id, 'f_certificado'));
            $('#f_padron_hasta').val($('#detalles_grid').getCell(id, 'f_validez'));
            $('#c_alicuota_filtro').val($('#detalles_grid').getCell(id, 'c_alicuota_sircreb'));
            $('#d_alicuota_filtro').val($('#detalles_grid').getCell(id, 'd_alicuota'));
            $('#c_tributo_filtro').val($('#detalles_grid').getCell(id, 'c_tributo'));
            $('#d_tributo_filtro').val($('#detalles_grid').getCell(id, 'd_tributo'));
            $('#n_cuit_filtro').val($('#detalles_grid').getCell(id, 'n_cuit')).mask('99-99999999-9');

            $('#d_msg').val('Último padrón generado: '+ $('#detalles_grid').getCell(id, 'ultimo_pad_generado')+'. En "Padron Desde", la fecha minima a ingresar debe ser 01 del mes siguiente.' );
            $('#id_contribuyente').val($('#detalles_grid').getCell(id, 'id_contribuyente'));
        }
    }).navGrid('#detalles_grid_pager',
        {add:true, edit:false, del:true}, //options
        {},//edit,
        {
            onInitializeForm: defaultInitForm(function(formid){
                inicializarEventosGrilla(formid);

                inicializarLupasGrilla(formid);
               

            }),
            
            beforeShowForm: defaultBeforeShowForm(function(formid){

                $('#tr_btn_imprimir').hide();

                if($('#n_cuit_filtro').val() != ''){
                    $('#n_cuit').val($('#n_cuit_filtro').val());
                    $('#d_denominacion').val($('#d_denominacion_filtro').val());
                    $('#id_contribuyente').val($('#id_contribuyente_filtro').val());
                    //$('#tipo_plan_lupa').hide();
                    $('#n_cuit').attr('readonly',true);
					$('#d_denominacion').attr('disabled',true);

                    $('#d_denominacion').attr('readonly',true);
					$('#n_cuit').attr('disabled',true);
                }
                if($('#c_tributo_filtro').val() != '' ){
                    $('#c_tributo').val($('#c_tributo_filtro').val());
                    $('#d_tributo').val($('#d_tributo_filtro').val());
                    $('#c_tributo').attr('readonly',true);
					$('#c_tributo').attr('disabled',true);
                    
                    $('#c_tributo_lupa').hide();

                    $('#d_tributo').attr('readonly',true);
					$('#d_tributo').attr('disabled',true);
                }
                if( $('#d_objeto_hecho_filtro').val() != ''){
                    $('#d_objeto_hecho').val($('#d_objeto_hecho_filtro').val());
                    $('#d_objeto_hecho').attr('readonly',true);
					$('#d_objeto_hecho').attr('disabled',true);
                    $('#d_objeto_hecho_lupa').hide();
                }
                if( $('#c_alicuota_sircreb').val() != ''){
                    $('#c_alicuota_sircreb').val($('#c_alicuota_filtro').val());
                    $('#d_alicuota').val($('#d_alicuota_filtro').val());
                    $('#c_alicuota_sircreb').attr('readonly',true);
					$('#c_alicuota_sircreb').attr('disabled',true);

                    $('#d_alicuota').attr('readonly',true);
					$('#d_alicuota').attr('disabled',true);

                    $('#c_alicuota_sircreb_lupa').hide();

                }
            }),
            closeAfterAdd: true,
            beforeSubmit: function(postdata, formid) {

                if(!valida_fechas(formid)){
                    mostrar_error('Padrón Hasta debe ser igual o posterior Padrón Desde: '+$('#f_certificado').val());
                    $('#f_validez').val(null);
                }

                var valido = $(formid).validationEngine('validate');

                setea_parametros('#detalles_grid',{':p_n_cuit':limpiar_formato_cuit($('#n_cuit_filtro').val()),
                    ':p_d_objeto_hecho':$('#d_objeto_hecho_filtro').val(),
                    ':p_c_tributo':$('#c_tributo_filtro').val()});

                return[valido,'Controle los datos ingresados.'];
            },
            afterComplete:function() {
                
                mostrar_cuadro('I', 'Informaci&oacute;n', 'Se ha dado de alta Correctamente');
               
            }
        },//alta
        {},//del
        {}//search
    );

}


function inicializarEventosGrilla(formid){
    $("#n_cuit").mask("99-99999999-9");


    $('#n_cuit').focusout(function(){
        if ($('#n_cuit').val() != ''){
            try{
                if( limpia_cuit($('#n_cuit').val()).length == 11 ){
                    $.ajax({
                        type:'POST',
                        url: "exclusiones_padron_SIRCREB/php/autocomplete.php",
                        data: {oper:'2',term: limpia_cuit($('#n_cuit').val())},
                        dataType: 'json',
                        success: function( data ) {
                            ajax_autocomplete = null;
                            if(data) {
                               
                                $("#d_denominacion").val(data.D_DENOMINACION);                            
                                $("#c_tributo").val(data.C_TRIBUTO);                            
                                $("#d_objeto_hecho").val(data.D_OBJETO_HECHO);                   
                                $("#padron_desde").val(data.F_CERTIFICADO);
                                $("#d_tributo").val(data.D_TRIBUTO);
                                $("#id_contribuyente").val(data.ID_CONTRIBUYENTE);
                                                   
                              }       
                        }
                    });
                }else{
                    $('#btn_limpiar').click();
                }
            }catch(err){
            }
        }
    });
}


function inicializarLupasGrilla(formid){
    $("#c_alicuota_sircreb_lupa", formid).lupa_generica({
        id_lista:v_lista_alicuotas,
        titulos:['Código','Descripción'],
        grid:[  {index:'c_codigo',width:100},
            {index:'d_descrip',width:465}],
        caption:'Listado de Alicuotas',
        sortname:'c_codigo',
        sortorder:'desc',
        searchInput: '#c_alicuota_sircreb',
        searchCode: true,
        exactField: 'c_codigo',
        campos:{c_codigo:'c_alicuota_sircreb',d_descrip:'d_alicuota'},
        keyNav:true

    });

    $("#c_tributo_lupa", formid).lupa_generica({
        id_lista:v_lista_tributos,
        titulos:['Codigo Tributo','Descripción Tributo'],
        grid:[{index:'c_codigo',width:100},
            {index:'d_descrip',width:465}],
        caption:'LISTADO DE TRIBUTOS',
        sortname:'c_codigo',
        sortorder:'asc',
        widthGrid:150,
        campos:{c_codigo:'c_tributo',d_descrip: 'd_tributo'},
        keyNav:true,
        searchInput: '#c_tributo',
        searchCode: true,
        exactField: 'c_codigo'
    });


    $("#d_objeto_hecho_lupa", formid).lupa_generica({
        id_lista:v_lista_objetos,
        titulos:['Nro. Inscripción','Tributo','Contribuyente','CUIT','ID Contrib.','Descrip. Tributo'],
        grid:[
            {index:'d_objeto_hecho',width:110},
            {index:'c_tributo',width:65},
            {index:'d_denominacion',width:290},
            {index:'n_cuit',width:100},
            {index:'id_contribuyente',width:10,hidden:true},
            {index:'d_tributo',width:10,hidden:true}
        ],
        caption:'Nros. de Inscripción',
        sortname:'d_objeto_hecho',
        sortorder:'asc',
        filtros:["#c_tributo",'#d_objeto_hecho','#d_denominacion'],
        filtrosTitulos:['Tributo','Nro. Inscripción','Denominación'],
        filtrosNulos:[true,true,true],
        campos:{n_cuit:'n_cuit',
            d_denominacion:'d_denominacion',
            c_tributo:'c_tributo',
            d_tributo:'d_tributo',
            d_objeto_hecho:'d_objeto_hecho'},
        keyNav:true
    });
}
