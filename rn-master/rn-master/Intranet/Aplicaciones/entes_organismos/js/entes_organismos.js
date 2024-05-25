var datos_main_grid = new GridParam({
    id_menu: v_id_menu,
    n_grid:0,
    m_autoquery:v_m_autoquery,
    param:{':c_ente':null,
        ':f_vig_desde':null,
        ':f_vig_hasta':null,
        ':m_alta_juridica':null,
        ':m_alta_fisica':null}
});

var datos_second_grid = new GridParam({
    id_menu: v_id_menu,
    n_grid:1,
    m_autoquery:v_m_autoquery,
    param:{':c_ente':null}
});

function set_fechas_min_max(formid){
    $("#f_vig_desde",formid).datepicker("option","onClose", function (selectedDate,obj) {
        $("#f_vig_hasta",formid).datepicker("option", "minDate", selectedDate);
    });
    
    $("#f_vig_hasta",formid).datepicker("option", "minDate", $("#f_vig_desde",formid).val());

    $("#f_vig_hasta",formid).datepicker("option","onClose", function (selectedDate,obj) {
        $("#f_vig_desde",formid).datepicker("option", "maxDate", selectedDate);
    });

    $("#f_vig_desde",formid).datepicker("option", "maxDate", $("#f_vig_hasta",formid).val());
}

function valida_fechas(formid){
    var f_desde = $("#f_vig_desde",formid).val();
    var f_hasta = $("#f_vig_hasta",formid).val();

    if(f_desde != "" && f_hasta != ""){
        return f_desde <= f_hasta;
    }else{
        return true;
    }
}

$(document).ready(function() {

    $("#btn_buscar").click(function(){
        if(valida_fechas("#frm_consulta")){
            $("input","#frm_consulta").attr('readonly',true);
            $(".datepicker, select, .btn_lupa","#frm_consulta").attr('disabled',true);
            setea_parametros('#main_grid',{
                ':c_ente': $("#c_ente_filtro").val(),
                ':f_vig_desde': $("#f_vig_desde").val(),
                ':f_vig_hasta': $("#f_vig_hasta").val(),
                ':m_alta_juridica': $("#m_pers_juridica").val(),
                ':m_alta_fisica': $("#m_pers_fisica").val()
            });
            $("#second_grid").jqGrid("clearGridData", true);
        }else{
            mostrar_validacion('La fecha de vigencia hasta no puede ser menor a la fecha de vigencia desde.');
        }
    });

    $("#btn_limpiar").click(function(){
        setea_parametros('#main_grid',{
            ':c_ente': null,
            ':f_vig_desde': null,
            ':f_vig_hasta': null,
            ':m_alta_juridica': null,
            ':m_alta_fisica': null
        });
        $("#second_grid").jqGrid('clearGridData');
        $("#frm_consulta").trigger('reset');
        $(".datepicker","#frm_consulta").val('');
        $(".datepicker","#frm_consulta").datepicker("option", "minDate", null);
        $(".datepicker","#frm_consulta").datepicker("option", "maxDate", null);
        $(".limpiar","#frm_consulta").attr('readonly',false);
        $(".datepicker, .selectpicker, .btn_lupa","#frm_consulta").attr('disabled',false);
        $(".selectpicker").selectpicker('refresh');
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

    set_fechas_min_max("#frm_consulta");

    $("#main_grid").jqGrid({
        colNames: datos_main_grid.colNames(),
        colModel: datos_main_grid.colModel(),
        pager: $('#main_grid_pager'),
        caption: "Entes",
        postData: datos_main_grid.postData(),
    	editurl: FUNCIONES_BASEPATH+"maestro_abm_grid.php",
        onSelectRow: function(id){
            var v_c_ente = $(this).getCell(id,'c_ente');
            setea_parametros('#second_grid',{
                ':c_ente': v_c_ente
            });
        },
        loadComplete: function(){
            setea_parametros('#second_grid',{
                ':c_ente': null
            });
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
                $("#tr_c_ente",formid).hide();
                $("#c_ente", formid).attr('readonly',true);

                set_fechas_min_max(formid);
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
            width: 600,
            beforeShowForm: defaultBeforeShowForm(function(formid){
                $(formid).validationEngine({promptPosition:'inline'});
            }),
            onInitializeForm: defaultInitForm(function(formid){
                set_fechas_min_max(formid);
            }),
            beforeSubmit: function(postdata, formid) {
                var valido = valida_fechas(formid);

                return [valido,'La fecha de vigencia hasta no puede ser menor a la fecha de vigencia desde.'];
            },
            afterSubmit: function(response,postdata){
                var res = $.parseJSON(response.responseText);
                // Los otros errores estan contemplados, solo sale ese msj para el error de PK de código
                if(res.resultado == "Se produjo un error al  realizar la operacion add"){
                    return[false,"El Código de Ente ingresado ya se encuentra en uso. Por favor ingrese otro."];
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
        caption: "Organismos" ,
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
                $("#c_ente, #c_organismo", formid).attr('readonly',true);
                $("#tr_c_ente, #tr_c_organismo",formid).hide();

                set_fechas_min_max(formid);
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
            width: 600,
            beforeShowForm: defaultBeforeShowForm(function(formid){
                $(formid).validationEngine({promptPosition:'inline'});
            }),
            onInitializeForm: defaultInitForm(function(formid){
                $("#c_ente", formid).attr('readonly',true);
                $("#c_ente", formid).val($("#main_grid").getCell($("#main_grid").jqGrid('getGridParam', 'selrow'),'c_ente'));
                $("#tr_c_ente",formid).hide();

                set_fechas_min_max(formid);
            }),
            beforeInitData: function(formid) {
                var id = jQuery('#main_grid').jqGrid('getGridParam', 'selrow');
                if (!id) {
                    mostrar_validacion('Debe seleccionar un registro de la grilla superior.');
                    return false;
                }    
            },
            beforeSubmit: function(postdata, formid) {
                var valido = valida_fechas(formid);

                return [valido,'La fecha de vigencia hasta no puede ser menor a la fecha de vigencia desde.'];
            },
            afterSubmit: function(response,postdata){
                var res = $.parseJSON(response.responseText);
                // Los otros errores estan contemplados, solo sale ese msj para el error de PK de código
                if(res.resultado == "Se produjo un error al  realizar la operacion add"){
                    return[false,"El Código de Organismo ingresado ya se encuentra en uso. Por favor ingrese otro."];
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
    
    $("#btn_lupa_ente").lupa_generica({
        id_lista:v_lista_entes,
        titulos:['Código','Descripcion'],
        grid:[  {index:'c_ente',width:100},
            {index:'d_ente',width:450}],
        caption:'Entes',
        sortname:'c_ente',
        sortorder:'asc',
        searchCode:true,
        searchInput: '#c_ente_filtro',
        exactField: 'c_ente',
        campos:{c_ente:'c_ente_filtro',d_ente:'d_ente_filtro'},
        keyNav:true,
        limpiarCod: true,
        foco:"#d_label"
    });
});