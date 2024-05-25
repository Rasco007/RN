function inicializarObjetoGrilla(v_n_id_menu){
	datos_grid_entes = new GridParam({id_menu:v_n_id_menu,
		n_grid:2,
		m_autoquery:'N'});
}

function setea_parametros_grid_extras(c_usuario, tipo_menu){
	if(tipo_menu == 'INT'){
		setea_parametros('#grid_entes_int',{'c_usuario':c_usuario});
	}else{
		setea_parametros('#grid_entes_ext',{'c_usuario':c_usuario});
	}
}

function inicializarGrillas(v_n_id_menu){

	$("#grid_entes_int").jqGrid({
            colNames:datos_grid_entes.colNames(),
            colModel:datos_grid_entes.colModel(),
            pager: $('#grid_entes_int_pager'),
            caption:"Entes Asignados" ,
            postData:datos_grid_entes.postData(),
            editurl: FUNCIONES_BASEPATH+"maestro_abm_grid.php",
            onSelectRow:function(){},
            autowidth:false,
            width:210,
            height: 155,
            shrinkToFit: true,
            rowNum:99999,
            rowList:99999,
            pgbuttons: false,
            pginput:false,
            recordpos:false
    }).navGrid('#grid_entes_int_pager',
        {add:true, edit:false, del:true},
        {}, //edit,
        {
            top:500,
            left: 0,
            width: 600,
            onInitializeForm: defaultInitForm(function(formid){
                // Definición lupa Entes
                $('#d_ente',formid).lupa_generica({
                    titulos:['ID','Descripcion'],
                    grid:[  {index:'c_ente',width:50},
                        {index:'d_ente',width:250}],
                    caption:'Entes',
                    sortname:'d_ente',
                    sortorder:'asc',
                    filtros:['#c_usuario'],
                    campos:{c_ente:'c_ente',d_ente:'d_ente'},
                    keyNav:true,
                    foco:"#d_label",
                    onClose:function(){
                        $("#c_organismo,#d_organismo",formid).val('');
                        if($('#c_ente',formid).val() == 'DPA'){
                            $("#d_organismo",formid).addClass('validate[required]');
                        }else{
                            $("#d_organismo",formid).removeClass('validate[required]');
                        }
                    }
                });
                //fin lupa Entes
                // Definición lupa Organismos
                $('#d_organismo',formid).lupa_generica({
                    titulos:['ID','Descripcion'],
                    grid:[  {index:'c_codigo',width:50},
                        {index:'d_descrip',width:250}],
                    caption:'Organismos',
                    sortname:'d_descrip',
                    sortorder:'asc',
                    filtros:['#c_ente'],
                    filtrosTitulos:['Ente'],
                    campos:{c_codigo:'c_organismo',d_descrip:'d_organismo'},
                    keyNav:true,
                    foco:"#d_label"
                });
                //fin lupa Organismos
                $("#f_vig_desde",formid).datepicker({ dateFormat: "dd/mm/yyyy"}).datepicker("setDate", "0");
            }),
            beforeShowForm: defaultBeforeShowForm(function(formid){
                $('#c_usuario').val(c_usuario);
                $(formid).validationEngine({
                    promptPosition:'inline'
                });
            }),
            afterSubmit: function(response,postdata){
                var res = $.parseJSON(response.responseText);
                if(res.resultado != 'OK'){
                    // Código de error por UK_ENTES_USUARIOS
                    if(res.ora.includes('ORA-00001')){
                        return[false,"No es posible insertar el ente - organismo seleccionados debido a que ya se encuentra parametrizado en el sistema."];
                    }else{
                        return[false,res.resultado];
                    }
                }else{
                    return[true,''];
                }
            },
            closeAfterAdd: true
        },  //add
        {   top:500  },  //del
        {}  //search
    );
    $("#grid_entes_ext").jqGrid({
        colNames:datos_grid_entes.colNames(),
        colModel:datos_grid_entes.colModel(),
        pager: $('#grid_entes_ext_pager'),
        caption:"Entes Asignados" ,
        postData:datos_grid_entes.postData(),
        editurl: FUNCIONES_BASEPATH+"maestro_abm_grid.php",
        onSelectRow:function(){},
        autowidth:false,
        width:210,
        height: 155,
        shrinkToFit: true,
        rowNum:99999,
        rowList:99999,
        pgbuttons: false,
        pginput:false,
        recordpos:false
    }).navGrid('#grid_entes_ext_pager',
        {add:true, edit:false, del:true},
        {},//edit,
        {
            top:500,
            left: 0,
            width: 600,
            onInitializeForm: defaultInitForm(function(formid){
                // Definición lupa Entes
                $('#d_ente',formid).lupa_generica({
                    titulos:['ID','Descripcion'],
                    grid:[	{index:'c_ente',width:50},
                        {index:'d_ente',width:250}],
                    caption:'Entes',
                    sortname:'d_ente',
                    sortorder:'asc',
                    filtros:['#c_usuario'],
                    campos:{c_ente:'c_ente',d_ente:'d_ente'},
                    keyNav:true,
                    foco:"#d_label",
                    onClose:function(){
                        $("#c_organismo,#d_organismo",formid).val('');
                        if($('#c_ente',formid).val() == 'DPA'){
                            $("#d_organismo",formid).addClass('validate[required]');
                        }else{
                            $("#d_organismo",formid).removeClass('validate[required]');
                        }
                    }
                });
				//fin lupa Entes
                // Definición lupa Organismos
                $('#d_organismo',formid).lupa_generica({
                    titulos:['ID','Descripcion'],
                    grid:[  {index:'c_codigo',width:50},
                        {index:'d_descrip',width:250}],
                    caption:'Organismos',
                    sortname:'d_descrip',
                    sortorder:'asc',
                    filtros:['#c_ente'],
                    filtrosTitulos:['Ente'],
                    campos:{c_codigo:'c_organismo',d_descrip:'d_organismo'},
                    keyNav:true,
                    foco:"#d_label"
                });
                //fin lupa Organismos
                $("#f_vig_desde",formid).datepicker({ dateFormat: "dd/mm/yyyy"}).datepicker("setDate", "0");
            }),
            beforeShowForm: defaultBeforeShowForm(function(formid){
                $('#c_usuario').val(c_usuario);
                $(formid).validationEngine({
                    promptPosition:'inline'
                });
            }),
            afterSubmit: function(response,postdata){
                var res = $.parseJSON(response.responseText);
                if(res.resultado != 'OK'){
                    // Código de error por UK_ENTES_USUARIOS
                    if(res.ora.includes('ORA-00001')){
                        return[false,"No es posible insertar el ente - organismo seleccionados debido a que ya se encuentra parametrizado en el sistema."];
                    }else{
                        return[false,res.resultado];
                    }
                }else{
                    return[true,''];
                }
            },
            closeAfterAdd: true
        },	//add
        {	top:500	},	//del
        {}	//search
    );
}