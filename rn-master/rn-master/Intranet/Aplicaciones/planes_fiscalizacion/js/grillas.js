function inicializarGrillas(){
    $("#main_grid").jqGrid({
        colNames:datos_main_grid.colNames(),
        colModel:datos_main_grid.colModel(),
        pager: $('#main_grid_pager'),
        caption:"Planes de Fiscalización" ,
        postData:datos_main_grid.postData(),
        editurl: FUNCIONES_BASEPATH+"maestro_abm.php",
        autowidth: false,
        height:150,
        loadComplete:function(){
            //if($('#main_grid').getGridParam('postData').m_autoquery == 'S'){}
            if($(this).jqGrid('getGridParam','records') != 0){
                $('#add_main_grid').hide();
                $('#main_grid').jqGrid('setSelection', 1);
            }else{
                $('#add_main_grid').show();
            }
        },
        onSelectRow: function(id) {
            id_plan_fis = $('#main_grid').getCell(id, 'id_plan_fis');

            setea_parametros('#detalles_grid',{':p_id_plan_fis':id_plan_fis});
            
            $('#add_detalles_grid').show();
            $('#edit_detalles_grid').show();
            $('#del_detalles_grid').show();

            $('#c_codigo_plan').val(id_plan_fis);
            $('#c_codigo_plan').blur();

            calcular_horas_totales('calcular_horas_totales',id_plan_fis);

        }
    }).navGrid('#main_grid_pager',
        {add:true, edit:true, del:true}, //options
        {top:500,
            left: 0,
            width: 700,
            onInitializeForm: defaultInitForm(function(formid){
                inicializa_lupas_main_grid(formid);
                inicializarEventos(formid,id_plan_fis,null,'EDIT');
            }),
            afterSubmit: function(postdata, formid) {
                var valido = $(formid).validationEngine('validate');
                let d_descrip = $("#d_descrip").val();
                let c_tipo_plan = $("#c_tipo_plan").val();
                let anio = $("#anio").val();
                let n_cant_inspectores = $("#n_cant_inspectores").val();
                let n_horas = $("#n_horas").val();

                var res = $.parseJSON(postdata.responseText);
                // Los otros errores estan contemplados, solo sale ese msj para el error de PK de código
                if(res.resultado == "Se produjo un error al  realizar la operacion add"){
                    return[false,"Ya existe una parametrización para la Unidad y Fecha ingresada."];
                }else{
                    if(res.resultado != 'OK'){
                        return[false,res.resultado];
                    }else{
                        if(d_descrip == '' && c_tipo_plan == '' && anio == '' &&
                            n_cant_inspectores == '' &&
                            n_horas == '') {
                            // ESTE SETEA ES PARA CUANDO LOS FILTRO DE ARRIBA ESTAN VACIOS
                            setea_parametros('#main_grid',{':p_d_plan':null,
                                ':p_tipo_plan':$('#tipo_plan').val(),
                                ':p_n_anio': $('#n_anio').val(),
                                ':p_n_inspectores': $('#n_inspectores_est').val(),
                                ':p_n_horas_est': parse($('#n_horas_est').val())});

                        }else{
                            setea_parametros('#main_grid',{':p_d_plan':d_descrip,
                                ':p_tipo_plan':c_tipo_plan,
                                ':p_n_anio':anio,
                                ':p_n_inspectores':n_cant_inspectores,
                                ':p_n_horas_est':n_horas});
                        }
                        return[true,''];
                    }
                }





            },
            closeAfterEdit: true
        },//edit,
        { top:500,
            left: 0,
            width: 700,
            onInitializeForm: defaultInitForm(function(formid){
                inicializa_lupas_main_grid(formid);
                inicializarEventos(formid,id_plan_fis,null,'ALTA');
            }),
            beforeShowForm: defaultBeforeShowForm(function(formid){
                $('#tipo_plan').attr('readonly',true);
                if($('#c_tipo_plan').val() != '' && $('#d_tipo_plan').val() != ''){
                    $('#tipo_plan').val($('#c_tipo_plan').val());
                    $('#descrip_tipo_plan').val($('#d_tipo_plan').val());
                    $('#tipo_plan_lupa').hide();
                    $('#tipo_plan').attr('readonly',true);
					$('#tipo_plan').attr('disabled',true);
                }
                if($('#anio').val() != '' ){
                    $('#n_anio').val($('#anio').val());
                    $('#n_anio').attr('readonly',true);
					$('#n_anio').attr('disabled',true);
                }
                if( $('#n_cant_inspectores').val() != ''){
                    $('#n_inspectores_est').val($('#n_cant_inspectores').val());
                    $('#n_inspectores_est').attr('readonly',true);
					$('#n_inspectores_est').attr('disabled',true);
                }
                if( $('#n_horas').val() != ''){
                    $('#n_horas_est').val($('#n_horas').val());
                    $('#n_horas_est').attr('readonly',true);
					$('#n_horas_est').attr('disabled',true);
                }
            }),
            afterSubmit: function(response, postdata){
                var message = "";
                var json = eval('(' + response.responseText + ')');
                message = json.resultado;
                id = json.id;
                if (message == "" || message == "OK") {
                    var success = true;
                } else {
                    var success = false;
                }
                if(success){
                    $('#anio').val($('#n_anio').val());
                    $('#c_tipo_plan').val($('#tipo_plan').val());
                    $('#d_tipo_plan').val($('#descrip_tipo_plan').val());
                    $('#n_cant_inspectores').val($('#n_inspectores_est').val());
                    $('#n_horas').val($('#n_horas_est').val());
                    $('#btn_buscar').trigger('click');
                }
                return [success, message, ''];
            },
            closeAfterAdd: true,
            beforeSubmit: function(postdata, formid) {
                var valido = $(formid).validationEngine('validate');
                /*if(valido){
                    if($('#c_tipo_plan').val() == ''){
                        $('#c_tipo_plan').val($('#tipo_plan').val());

                    }
                    if($('#anio').val() == ''){
                        $('#anio').val($('#n_anio').val());

                    }
                    if($('#n_cant_inspectores').val() == ''){
                        $('#n_cant_inspectores').val($('#n_inspectores_est').val());

                    }
                    if($('#n_horas').val() == ''){
                        $('#n_horas').val($('#n_horas_est').val());

                    }
                    if($('#d_descrip').val() == ''){
                        $('#d_descrip').val( $('#d_plan').val());

                    }
                    //poner los valores de los filtros con lo que se cargó
                    //ver si habia algo cargado o no
                    
                    */

                setea_parametros('#main_grid',{':p_d_plan':null,
                    ':p_tipo_plan':$('#tipo_plan').val(),
                    ':p_n_anio': $('#n_anio').val(),
                    ':p_n_inspectores': $('#n_inspectores_est').val(),
                    ':p_n_horas_est': parse($('#n_horas_est').val())});

                return[valido,'Controle los datos ingresados.'];
            },
            afterComplete:function() {

                mostrar_cuadro('I', 'Informaci&oacute;n', 'Se ha dado de alta Correctamente');
            }
        },//alta
        {top:500,
            left: 0,
            width: 700,
            onInitializeForm: defaultInitForm(function(formid){
               
            }),
            beforeShowForm: defaultBeforeShowForm(function(formid){
            }),
            afterSubmit: function(response, postdata){
                var message = "";
                var json = eval('(' + response.responseText + ')');
                message = json.resultado;
                id = json.id;
                if (message == "" || message == "OK") {
                    var success = true;
                } else {
                    var success = false;
                }
                if(success){
                    $('#btn_limpiar').trigger('click');
                }
                return [success, message, ''];
            },
            closeAfterDelete: true},//del
        {}//search
    )

    $("#detalles_grid").jqGrid({
        colNames:datos_detalles_grid.colNames(),
        colModel:datos_detalles_grid.colModel(),
        pager: $('#detalles_grid_pager'),
        caption:"Programas del Plan de Fiscalización" ,
        postData:datos_detalles_grid.postData(),
        editurl: FUNCIONES_BASEPATH+"maestro_abm.php",
        autowidth: true,
        height:150,
        rowNum: 50,
        gridview: false, 
        onSelectRow: function(id) {
            n_programa_fis = $('#detalles_grid').getCell(id, 'n_programa_fis');
          
        }
    }).navGrid('#detalles_grid_pager',
        {add:true, edit:true, del:true}, //options
        { top:500,
            left: 0,
            width: 700,
            onInitializeForm: defaultInitForm(function(formid){
                inicializarEventos(formid,id_plan_fis,n_programa_fis,'EDIT');
            }),
            beforeShowForm: defaultBeforeShowForm(function(formid){
            }),
            closeAfterEdit: true,
            afterComplete:function() {
                calcular_horas_totales('calcular_horas_totales',id_plan_fis);
            }
        }, // edit options
        { top:500,
            left: 0,
            width: 700,
            onInitializeForm: defaultInitForm(function(formid){
                inicializarEventos(formid,id_plan_fis,n_programa_fis,'ALTA');
            }),
            beforeShowForm: defaultBeforeShowForm(function(formid){
            }),
            closeAfterAdd: true,
            afterComplete:function() {
                calcular_horas_totales('calcular_horas_totales',id_plan_fis);
            }
        }, // add options
        { top:500,
            left: 0,
            width: 700,
            onInitializeForm: defaultInitForm(function(formid){
            }),
            beforeShowForm: defaultBeforeShowForm(function(formid){
            }),
            closeAfterDelete: true,
            afterComplete:function() {
                calcular_horas_totales('calcular_horas_totales',id_plan_fis);
            }}, // del options
        {} // search options
    );
}