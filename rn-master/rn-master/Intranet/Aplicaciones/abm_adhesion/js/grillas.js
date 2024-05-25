function inicializarGrillas(){
    $("#main_grid").jqGrid({
        colNames: datos_main_grid.colNames(),
        colModel: datos_main_grid.colModel(),
        pager: $('#main_grid_pager'),
        caption: "Adhesión a Débito Directo",
        postData: datos_main_grid.postData(),
        editurl: FUNCIONES_BASEPATH+"maestro_abm.php",
        autowidth: false,
        height: 350,
        sortname:"c_medio_pago, c_tributo, d_objeto_hecho,d_tipo_alta",
        sortorder:'desc',
        loadComplete:function(){
            if($('#main_grid').getGridParam('postData').m_autoquery == 'S'){
                
                if($(this).jqGrid('getGridParam','records') == 0 && v_carga_grilla_manual){
                    mostrar_cuadro('I', 'Atención', 'No se han encontrado registros para la consulta realizada.');
                    $('#btn_limpiar').click();
                    v_carga_grilla_manual = false;
                }
                v_carga_grilla_manual = false;
            }
            $('#detalles_grid').jqGrid('clearGridData');
        },
        gridComplete: function() {
        },
        onSelectRow: function(id) {
            if (id) {
                var count = $('#main_grid').getCell(id, 'validacion');
                if(count == 0){
                    $("#edit_main_grid").removeClass('ui-state-disabled');
                }else{
                    $("#edit_main_grid").addClass('ui-state-disabled');
                }
            }
        }
    }).navGrid('#main_grid_pager',
        {add: true, edit: true, del: true}, //options
        {
            top:500,
            left: 0,
            width: 700,
            onInitializeForm: defaultInitForm(function(formid){
                inicializa_lupas_main_grid(formid);
                init_eventos_main_grid(formid);

                set_buscar_click();
               
            }),
            beforeShowForm: defaultBeforeShowForm(function(formid){
                
                $('#d_medio_pago_lupa').hide();
                $('#d_tributo_lupa').hide();
                $('#d_objeto_hecho_lupa').hide();

                $('#tr_c_medio_pago').show();
                $('#tr_d_medio_pago').show();
                $('#c_tributo').attr('disabled', true);
                $('#d_tributo').attr('disabled', true);
                $('#d_objeto_hecho').attr('disabled', true);
                $('#c_medio_pago').attr('disabled', true);
                $('#d_medio_pago').attr('disabled', true);
                if ($('#n_cant_envios').val() != 0) {
                    $('#f_vig_desde').attr('disabled', true);
                } else {
                    $('#f_vig_desde').attr('disabled', false);
                }
                $('#n_cuit').attr('disabled', true);
                $('#desc_denom').attr('disabled', true);
                $("#desc_denom_lupa",formid).prop('disabled',true);
                $("#desc_denom_cbu_lupa",formid).prop('disabled',true);
                
                $("#pData, #nData").hide();
                                
            }),
            beforeSubmit: function(postdata, formid) {     
                    
                var valido = valida_fechas(formid);
                return [valido,'La fecha de vigencia hasta no puede ser menor a la fecha de vigencia desde.'];
            },
            closeAfterEdit: true
        }, //edit
        {
            top:500,
            left: 0,
            width: 700,
            onInitializeForm: defaultInitForm(function(formid){
                inicializa_lupas_main_grid(formid);
                init_eventos_main_grid(formid);
                
                set_buscar_click();

            }),
            beforeShowForm: defaultBeforeShowForm(function(formid){                    
                $('#f_vig_desde').val(fecha_hoy);             

                //$('#btn_buscar').off("click");
                $('#tr_c_medio_pago').show();
                $('#tr_d_medio_pago').show();
                $("#desc_denom_lupa",formid).prop('disabled',true);
                $("#desc_denom_cbu_lupa",formid).prop('disabled',true);

                    if($('#n_cuit_filtro').val()){
                        $('#n_cuit').val($('#n_cuit_filtro').val());
                        //$('#d_objeto_hecho_lupa',formid).prop('disabled',false);
                    }
                    if($('#desc_denom_filtro').val()){
                        $('#desc_denom').val($('#desc_denom_filtro').val());
                    }
                    if($('#c_tributo_filtro').val()){
                        $('#c_tributo').val($('#c_tributo_filtro').val());
                        $('#c_tributo').blur();
                    }
                    if($('#d_objeto_hecho_filtro').val()){
                        $('#d_objeto_hecho').val($('#d_objeto_hecho_filtro').val());
                        $('#id_contribuyente').val(v_id_contribuyente_backup);
                        
                    }
                    if($('#id_contribuyente_filtro').val()){
                        $('#id_contribuyente').val($('#id_contribuyente_filtro').val());
                    }                  
            
            }),
            beforeSubmit: function(postdata, formid) {
              

                //se valida las altas
                     
                    
                var valido = valida_fechas(formid);

                
                return [valido,'La fecha de vigencia hasta no puede ser menor a la fecha de vigencia desde.'];
            },
            afterSubmit:function(response, postdata) {
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
                    $('#n_cuit_filtro').val($('#n_cuit').val());
                    $('#desc_denom_filtro').val($('#desc_denom').val());
                    $('#c_tributo_filtro').val($('#c_tributo').val());
                    $('#d_objeto_hecho_filtro').val($('#d_objeto_hecho').val());
                    
                    v_id_contribuyente_backup = $('#id_contribuyente').val();
                    if($('#c_medio_pago').val() && $('#n_cuit').val() && $('#desc_denom').val() && $('#c_tributo').val() && $('#d_objeto_hecho').val()
                        && $('#f_vig_desde').val() && $('#c_cbu').val() && $('#n_cuit_cbu').val() && $('#desc_denom_cbu').val() && $('#c_producto').val()){

                            setea_parametros('#main_grid',{
                                ':p_id_contribuyente':$('#id_contribuyente').val(),
                                ':p_c_tributo':$('#c_tributo_filtro').val(),
                                ':p_d_objeto_hecho':$('#d_objeto_hecho_filtro').val(),
                            });

                            $('#n_cuit_filtro').attr('disabled',true);
                            $('#d_objeto_hecho_filtro').attr('disabled',true);
                            $('#c_tributo_filtro').attr('disabled',true);
                            $('#desc_denom_filtro').attr('disabled',true);
                            $('#lupa_d_objeto_hecho_filtro').hide();
                    }                   
                }
                return [success, message, ''];
            },
            closeAfterAdd: true
        }, //add
        {} //del
    ).navButtonAdd('#main_grid_pager',
        {
            caption: "Contrato",
            buttonicon:"",
            position:"left",
            title:"Contrato",
            cursor:"pointer",
            onClickButton:function () {
                var id = $("#main_grid").getGridParam('selrow');
                var f_vig_hasta = $("#main_grid").getCell(id,"f_vig_hasta");

                if (id) {
                    if(f_vig_hasta === ''){
                        var id_contribuyente = $("#main_grid").getCell(id,"id_contribuyente");
                        var c_tributo = $("#main_grid").getCell(id,"c_tributo");
                        var d_objeto_hecho = $("#main_grid").getCell(id,"d_objeto_hecho");
                        var c_medio_pago = $("#main_grid").getCell(id,"c_medio_pago");
                        var f_vig_desde = $("#main_grid").getCell(id,"f_vig_desde");
                        llamar_report('DEBITO001','PID_CONTRIBUYENTE|'+id_contribuyente+
                            '&PC_TRIBUTO|'+c_tributo+'&PD_OBJETO_HECHO|'+d_objeto_hecho+
                            '&PC_MEDIO_PAGO|'+c_medio_pago+'&PF_VIG_DESDE|'+f_vig_desde,'PDF');
                    }else{
                        mostrar_error('No es posible emitir el Contrato si tiene Desistimiento.');
                        return false;
                    }

                }else {
                    mostrar_error('Debe seleccionar una Fila de la grilla.');
                    return false;
                }
            }
    }).navButtonAdd('#main_grid_pager',
    {
        caption: "Desistimiento",
        buttonicon:"",
        position:"left",
        title:"Desistimiento",
        cursor:"pointer",
        onClickButton:function () {
            var id = $("#main_grid").getGridParam('selrow');
            var f_vig_hasta = $("#main_grid").getCell(id,"f_vig_hasta");

            if (id) {
                if(f_vig_hasta){
                    var id_contribuyente = $("#main_grid").getCell(id,"id_contribuyente");
                    var c_tributo = $("#main_grid").getCell(id,"c_tributo");
                    var d_objeto_hecho = $("#main_grid").getCell(id,"d_objeto_hecho");
                    var c_medio_pago = $("#main_grid").getCell(id,"c_medio_pago");
                    var f_vig_desde = $("#main_grid").getCell(id,"f_vig_desde");
                    llamar_report('DEBITO002','PID_CONTRIBUYENTE|'+id_contribuyente+
                        '&PC_TRIBUTO|'+c_tributo+'&PD_OBJETO_HECHO|'+d_objeto_hecho+
                        '&PC_MEDIO_PAGO|'+c_medio_pago+'&PF_VIG_DESDE|'+f_vig_desde,'PDF');
                }else{
                    mostrar_error('Debe ingresar la fecha de baja.');
                    return false;
                }
            }else {
                mostrar_error('Debe seleccionar una Fila de la grilla.');
                return false;
            }
        }
    }).navButtonAdd('#main_grid_pager',
        {
            id:"btn_completar",
            caption: "Completar Mail/Teléfonos",
            buttonicon:"",
            position:"right",
            title:"Completar Mail/Teléfonos",
            cursor:"pointer",
            onClickButton:function () {
                var id = $("#main_grid").getGridParam('selrow');
                var f_vig_hasta = $("#main_grid").getCell(id,"f_vig_hasta");

                if (id) {
                    if(f_vig_hasta==''){
                        var id_contribuyente = $("#main_grid").getCell(id,"id_contribuyente");
                    var telefono_1 = $("#main_grid").getCell(id,"telefono_1");
                    var telefono_2 = $("#main_grid").getCell(id,"telefono_2");
                    var telefono_3 = $("#main_grid").getCell(id,"telefono_3");
                    var email_1 = $("#main_grid").getCell(id,"email_1");
                    var email_2 = $("#main_grid").getCell(id,"email_2");

                    $('#id_contribuyente').val(id_contribuyente)
                    $('#telefono_1').val(telefono_1)
                    $('#telefono_2').val(telefono_2)
                    $('#telefono_3').val(telefono_3)
                    $('#email_1').val(email_1)
                    $('#email_2').val(email_2)

                    $('#mail_tel_modal').modal("show");

                    }
                    else{
                        $('#btn_completar').prop('disabled', true);
                        mostrar_error('No debe tener F. hasta.');
                    return false;
                    }
                    
                }else {
                    mostrar_error('Debe seleccionar una Fila de la grilla.');
                    return false;
                }

            }
        });

        $("#consulta_grid").jqGrid({
            colNames: datos_main_grid.colNames(),
            colModel: datos_main_grid.colModel(),
            pager: $('#consulta_grid_pager'),
            caption: "Consulta Débito Directo",
            postData: datos_main_grid.postData(),
            editurl: FUNCIONES_BASEPATH+"maestro_abm.php",
            autowidth: false,
            height: 350,
            sortname:"c_medio_pago, c_tributo, d_objeto_hecho, id_contribuyente",
            loadComplete:function(){
                if($('#consulta_grid').getGridParam('postData').m_autoquery == 'S'){
                    if($(this).jqGrid('getGridParam','records') == 0){
                        mostrar_cuadro('I', 'Atención', 'No se han encontrado registros para la consulta realizada.');
                        $('#btn_limpiar').click();
                    }
                }
                $('#detalles_grid').jqGrid('clearGridData');
            },
            gridComplete: function() {
            },
            onSelectRow: function(id) {
            }
        }).navGrid('#consulta_grid_pager',
            {add: false, edit: false, del: false}, //options
        ).navButtonAdd('#consulta_grid_pager',
        {
            caption: "Contrato",
            buttonicon:"",
            position:"left",
            title:"Contrato",
            cursor:"pointer",
            onClickButton:function () {
                var id = $("#consulta_grid").getGridParam('selrow');
                var f_vig_hasta = $("#consulta_grid").getCell(id,"f_vig_hasta");

                if (id) {
                    if(f_vig_hasta === ''){
                        var id_contribuyente = $("#consulta_grid").getCell(id,"id_contribuyente");
                        var c_tributo = $("#consulta_grid").getCell(id,"c_tributo");
                        var d_objeto_hecho = $("#consulta_grid").getCell(id,"d_objeto_hecho");
                        var c_medio_pago = $("#consulta_grid").getCell(id,"c_medio_pago");
                        var f_vig_desde = $("#consulta_grid").getCell(id,"f_vig_desde");
                        llamar_report('DEBITO001','PID_CONTRIBUYENTE|'+id_contribuyente+
                            '&PC_TRIBUTO|'+c_tributo+'&PD_OBJETO_HECHO|'+d_objeto_hecho+
                            '&PC_MEDIO_PAGO|'+c_medio_pago+'&PF_VIG_DESDE|'+f_vig_desde,'PDF');
                    }else{
                        mostrar_error('No es posible emitir el Contrato si tiene Desistimiento.');
                        return false;
                    }

                }else {
                    mostrar_error('Debe seleccionar una Fila de la grilla.');
                    return false;
                }
            }
    }).navButtonAdd('#consulta_grid_pager',
    {
        caption: "Desistimiento",
        buttonicon:"",
        position:"left",
        title:"Desistimiento",
        cursor:"pointer",
        onClickButton:function () {
            var id = $("#consulta_grid").getGridParam('selrow');
            var f_vig_hasta = $("#consulta_grid").getCell(id,"f_vig_hasta");

            if (id) {
                if(f_vig_hasta){
                    var id_contribuyente = $("#consulta_grid").getCell(id,"id_contribuyente");
                    var c_tributo = $("#consulta_grid").getCell(id,"c_tributo");
                    var d_objeto_hecho = $("#consulta_grid").getCell(id,"d_objeto_hecho");
                    var c_medio_pago = $("#consulta_grid").getCell(id,"c_medio_pago");
                    var f_vig_desde = $("#consulta_grid").getCell(id,"f_vig_desde");
                    llamar_report('DEBITO002','PID_CONTRIBUYENTE|'+id_contribuyente+
                        '&PC_TRIBUTO|'+c_tributo+'&PD_OBJETO_HECHO|'+d_objeto_hecho+
                        '&PC_MEDIO_PAGO|'+c_medio_pago+'&PF_VIG_DESDE|'+f_vig_desde,'PDF');
                }else{
                    mostrar_error('Debe ingresar la fecha de baja.');
                    return false;
                }
            }else {
                mostrar_error('Debe seleccionar una Fila de la grilla.');
                return false;
            }
        }
    });
    



}