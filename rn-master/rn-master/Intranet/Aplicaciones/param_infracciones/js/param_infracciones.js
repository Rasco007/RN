var datos_main_grid = new GridParam({
    id_menu: v_id_menu,
    n_grid:0,
    m_autoquery:v_m_autoquery,
    param:{':id_infraccion':null,
        ':f_vig_desde':null,
        ':f_vig_hasta':null,
        ':c_ente':null}
});

var datos_second_grid = new GridParam({
    id_menu: v_id_menu,
    n_grid:1,
    m_autoquery:v_m_autoquery,
    param:{':id_infraccion':null}
});

$(document).ready(function() {

    $("#btn_buscar").click(function(){
        deshabilita_campos(true);
        setea_parametros('#main_grid',{
            ':id_infraccion': $("#c_infraccion").val(),
            ':f_vig_desde': $("#f_vig_desde").val(),
            ':f_vig_hasta': $("#f_vig_hasta").val(),
            ':c_ente': $("#c_ente").val()
        });
    });

    $("#btn_limpiar").click(function(){
        $("#main_grid, #second_grid").jqGrid("clearGridData", true);
        $("#frm_consulta").trigger('reset');
        $(".datepicker","#frm_consulta").val('');
        $(".datepicker","#frm_consulta").datepicker("option", "minDate", null);
        $(".datepicker","#frm_consulta").datepicker("option", "maxDate", null);
        deshabilita_campos(false);
    });

    $(".datepicker").mask("99/99/9999");

    $('.datepicker').datepicker({
        dateFormat:'dd/mm/yy',
        changeMonth:true,
        changeYear:true,
        dayNamesMin:['D', 'L', 'M', 'M', 'J', 'V', 'S'],
        monthNamesShort: ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'],
        monthNames: ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre']
    });

    $('#c_infraccion').keypress(function (tecla) {
        return (tecla.charCode >= 48 && tecla.charCode <= 57);
    });

    $('#c_ente').keyup(function () {
        return ($(this).val().toUpperCase());
    });

    set_fechas_min_max("#frm_consulta");

    $("#main_grid").jqGrid({
        colNames: datos_main_grid.colNames(),
        colModel: datos_main_grid.colModel(),
        pager: $('#main_grid_pager'),
        caption: "Infracciones",
        postData: datos_main_grid.postData(),
    	editurl: FUNCIONES_BASEPATH+"maestro_abm_grid.php",
        onSelectRow: function(id){
            var v_id_infraccion = $(this).getCell(id,'id_infraccion');
            setea_parametros('#second_grid',{
                ':id_infraccion': v_id_infraccion
            });
        },
        loadComplete: function(){
            $("#second_grid").jqGrid("clearGridData", true);
        }
    }).navGrid('#main_grid_pager',
        {add:true, edit:true, del:true}, //options
        {
            top:500,
            left: 0,
            width: 600,
            beforeShowForm: defaultBeforeShowForm(function(formid){
                $(formid).validationEngine({promptPosition:'inline'});
            }),
            onInitializeForm: defaultInitForm(function(formid){
                $("#id_infraccion, #c_concepto_cc", formid).attr('readonly',true);
                $("#tr_id_infraccion ,#tr_c_concepto_cc",formid).hide();
                $("#tr_d_concepto_cc",formid).show();

                set_fechas_min_max(formid);

                inicializa_lupas_main_grid(formid);                
            }),
            beforeSubmit: function(postdata, formid) {
                var valido = valida_fechas(formid);

                return [valido,'La fecha de vigencia hasta no puede ser menor a la fecha de vigencia desde.'];
            },
            afterSubmit: function(response,postdata){
                var res = $.parseJSON(response.responseText);
                // Los otros errores estan contemplados, solo sale ese msj para el error de PK
                if(res.resultado == "Se produjo un error al  realizar la operacion add"){
                    return[false,"El Código de Infracción ingresado ya se encuentra en uso. Por favor ingrese otro."];
                }else{
                    if(res.resultado != 'OK'){
                        return[false,res.resultado];
                    }else{
                        return[true,''];
                    }
                }
            },
            closeAfterEdit: true
        }, //edit
        {
            top:500,
            left: 0,
            width: 600,
            beforeShowForm: defaultBeforeShowForm(function(formid){
                $(formid).validationEngine({promptPosition:'inline'});
            }),
            onInitializeForm: defaultInitForm(function(formid){
                $("#c_concepto_cc", formid).attr('readonly',true);
                $("#tr_c_concepto_cc",formid).hide();
                $("#tr_d_concepto_cc",formid).show();

                set_fechas_min_max(formid);

                inicializa_lupas_main_grid(formid);
            }),
            beforeSubmit: function(postdata, formid) {
                var valido = valida_fechas(formid);

                return [valido,'La fecha de vigencia hasta no puede ser menor a la fecha de vigencia desde.'];
            },
            afterSubmit: function(response,postdata){
                var res = $.parseJSON(response.responseText);
                // Los otros errores estan contemplados, solo sale ese msj para el error de PK
                if(res.resultado == "Se produjo un error al  realizar la operacion add"){
                    return[false,"El Código de Infracción ingresado ya se encuentra en uso. Por favor ingrese otro."];
                }else{
                    if(res.resultado != 'OK'){
                        return[false,res.resultado];
                    }else{
                        return[true,''];
                    }
                }
            },
            closeAfterAdd: true
        }, //add
        {} //del
    );

    $("#second_grid").jqGrid({
        colNames: datos_second_grid.colNames(),
        colModel: datos_second_grid.colModel(),
        pager: $('#second_grid_pager'),
        caption: "Multas" ,
        postData: datos_second_grid.postData(),
        editurl: FUNCIONES_BASEPATH+"maestro_abm_grid.php",
    }).navGrid('#second_grid_pager',
        {add:true, edit:true, del:true}, //options
        {
            top:500,
            left: 0,
            width: 600,
            beforeShowForm: defaultBeforeShowForm(function(formid){
                $(formid).validationEngine({promptPosition:'inline'});
            }),
            onInitializeForm: defaultInitForm(function(formid){
                $("#id_multa, #id_infraccion, #c_concepto, #c_regimen", formid).attr('readonly',true);
                $("#tr_id_multa, #tr_id_infraccion, #tr_c_concepto, #tr_c_regimen, #tr_c_tributo",formid).hide();
                $("#tr_d_concepto, #tr_d_regimen",formid).show();

                set_fechas_min_max(formid);

                inicializa_lupas_second_grid(formid);

                if($("#i_monto_fijo").val() != ""){
                    $("#i_monto_fijo_desde, #i_monto_fijo_hasta, #p_monto_fijo, #p_monto_fijo_desde, #p_monto_fijo_hasta").val('');
                    $("#i_monto_fijo_desde, #i_monto_fijo_hasta, #p_monto_fijo, #p_monto_fijo_desde, #p_monto_fijo_hasta").attr('disabled',true);
                }
                if($("#i_monto_fijo_desde").val() != "" || $("#i_monto_fijo_hasta").val() != ""){
                    $("#i_monto_fijo, #p_monto_fijo, #p_monto_fijo_desde, #p_monto_fijo_hasta").val('');
                    $("#i_monto_fijo, #p_monto_fijo, #p_monto_fijo_desde, #p_monto_fijo_hasta").attr('disabled',true);
                }
                bloquear_importes();

                if($("#p_monto_fijo").val() != ""){
                    $("#p_monto_fijo_desde, #p_monto_fijo_hasta, #i_monto_fijo, #i_monto_fijo_desde, #i_monto_fijo_hasta").val('');
                    $("#p_monto_fijo_desde, #p_monto_fijo_hasta, #i_monto_fijo, #i_monto_fijo_desde, #i_monto_fijo_hasta").attr('disabled',true);
                }
                if($("#p_monto_fijo_desde").val() != "" || $("#p_monto_fijo_hasta").val() != ""){
                    $("#p_monto_fijo, #i_monto_fijo, #i_monto_fijo_desde, #i_monto_fijo_hasta").val('');
                    $("#p_monto_fijo, #i_monto_fijo, #i_monto_fijo_desde, #i_monto_fijo_hasta").attr('disabled',true);
                }
                bloquear_porcentajes();

                solicitar_dias_dto_vto();
            }),
            beforeSubmit: function(postdata, formid) {
                var valido1, valido2, valido3, validation;
                var msj;
                valido1 = valida_fechas(formid);
                if(!valido1){
                    msj = 'La fecha de vigencia hasta no puede ser menor a la fecha de vigencia desde.';
                }
                valido2 = compara_desde_hasta($("#i_monto_fijo_desde").val(),$("#i_monto_fijo_hasta").val());
                if(!valido2){
                    msj = 'El campo importe desde no puede ser mayor al campo importe hasta.';
                }
                valido3 = compara_desde_hasta($("#p_monto_fijo_desde").val(),$("#p_monto_fijo_hasta").val());
                if(!valido3){
                    msj = 'El campo porcentaje desde no puede ser mayor al campo porcentaje hasta.';
                }
                validation = $(formid).validationEngine('validate');
                if(!validation){
                    msj = 'Controle los datos ingresados.';
                }

                return [valido1 && valido2 && valido3 && validation, msj];
            },
            closeAfterEdit: true
        }, //edit
        {
            top:500,
            left: 0,
            width: 600,
            beforeShowForm: defaultBeforeShowForm(function(formid){
                $(formid).validationEngine({promptPosition:'inline'});
            }),
            onInitializeForm: defaultInitForm(function(formid){
                $("#id_infraccion", formid).val($("#main_grid").getCell($("#main_grid").jqGrid('getGridParam', 'selrow'),'id_infraccion'));
                $("#id_infraccion, #id_multa, #c_concepto, #c_regimen", formid).attr('readonly',true);
                $("#tr_infraccion, #tr_c_concepto, #tr_c_regimen, #tr_c_tributo",formid).hide();
                $("#tr_d_concepto, #tr_d_regimen",formid).show();

                /*$.post("param_infracciones/php/obtener_codigo_multa.php",{},
                    function(data){
                        if(data != null){
                            $("#id_multa",formid).val(data.id_multa);
                        }
                    },"json");*/

                set_fechas_min_max(formid);

                inicializa_lupas_second_grid(formid);

                bloquear_importes();

                bloquear_porcentajes();

                solicitar_dias_dto_vto();
            }),
            beforeInitData: function(formid) {
                var id = jQuery('#main_grid').jqGrid('getGridParam', 'selrow');
                if (!id) {
                    mostrar_cuadro('V','Atención','Debe seleccionar un registro de la grilla superior.');
                    return false;
                }    
            },
            beforeSubmit: function(postdata, formid) {
                var valido1, valido2, valido3, validation;
                var msj;
                valido1 = valida_fechas(formid);
                if(!valido1){
                    msj = 'La fecha de vigencia hasta no puede ser menor a la fecha de vigencia desde.';
                }
                valido2 = compara_desde_hasta($("#i_monto_fijo_desde").val(),$("#i_monto_fijo_hasta").val());
                if(!valido2){
                    msj = 'El campo importe desde no puede ser mayor al campo importe hasta.';
                }
                valido3 = compara_desde_hasta($("#p_monto_fijo_desde").val(),$("#p_monto_fijo_hasta").val());
                if(!valido3){
                    msj = 'El campo porcentaje desde no puede ser mayor al campo porcentaje hasta.';
                }
                validation = $(formid).validationEngine('validate');
                if(!validation){
                    msj = 'Controle los datos ingresados.';
                }

                return [valido1 && valido2 && valido3 && validation, msj];
            },
            closeAfterAdd: true
        }, //add
        {} //del
    );
    
    inicializa_lupas();

});