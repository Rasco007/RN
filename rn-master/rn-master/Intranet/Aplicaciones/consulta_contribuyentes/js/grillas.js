function crea_grillas_principales(){
	// Definición de datos de grillas
    var n_grid_domicilios = 0;
	var n_grid_telefonos = 1;
	var n_grid_datos_comp = 2;
	if($('#m_persona').val()=='J'){
		var n_grid_responsables = 3;
	}
	var n_grid_tributos = 4;
	var n_orden_tributos = 6;
	var n_grid_conceptos = 5;

	var datos_domicilio = new GridParam({
        id_menu: n_id_menu,
        n_grid: n_grid_domicilios,
        m_autoquery: 'S',
        param: {':id_contribuyente': $('#id_contribuyente').val()}
    });

    var datos_contacto_grid = new GridParam({
        id_menu: n_id_menu,
        n_grid: n_grid_telefonos,
        m_autoquery: 'S',
        param: {':id_contribuyente': $('#id_contribuyente').val()}
    });

    var datos_comp_grid = new GridParam({
        id_menu: n_id_menu,
        n_grid: n_grid_datos_comp,
        m_autoquery: 'S',
        param: {':id_contribuyente': $('#id_contribuyente').val()}
    });

    if($('#m_persona').val()=='J'){
	    var datos_responsables_grid = new GridParam({
	        id_menu: n_id_menu,
	        n_grid: n_grid_responsables,
	        m_autoquery: 'S',
	        param: {':id_contribuyente': $('#id_contribuyente').val()}
	    });
	}

    var datos_tributos_grid = new GridParam({
        id_menu: n_id_menu,
        n_grid: n_grid_tributos,
        n_orden: n_orden_tributos,
        m_autoquery: 'S',
        param: {':id_contribuyente': $('#id_contribuyente').val()}
    });

    var datos_conceptos_grid = new GridParam({
        id_menu: n_id_menu,
        n_grid: n_grid_conceptos,
        m_autoquery: 'N',
        param: {':id_contribuyente': $('#id_contribuyente').val(), ':d_objeto_hecho': null}
    });

    var datos_int_grid = new GridParam({
        id_menu: n_id_menu,
        n_grid: 21,
        m_autoquery: 'S',
        param: {':n_cuit': limpia_cuit($('#n_cuit',"#frm_busqueda").val())}
    });

    var datos_coprop_grid = new GridParam({
        id_menu: n_id_menu,
        n_grid: 22,
        m_autoquery: 'S',
        param: {':id_contribuyente': $('#id_contribuyente').val()}
    });

    var datos_asoc_exc_grid = new GridParam({
        id_menu: n_id_menu,
        n_grid: 24,
        m_autoquery: 'S',
        param: {':n_cuit': limpia_cuit($('#n_cuit',"#frm_busqueda").val())}
    });

	/************* grilla domicilio **********/
	$("#grid_datos_domicilio").jqGrid({
		colNames:datos_domicilio.colNames(),
		colModel:datos_domicilio.colModel(),
		height: 180,
		autowidth:false,
		pager: $('#grid_datos_domicilio_pager'),
		caption:"Domicilios:",
		editurl: FUNCIONES_BASEPATH+"maestro_abm_grid.php",
		postData: datos_domicilio.postData()
	}).navGrid('#grid_datos_domicilio_pager', {add:false, edit:false, del:false})
	.navButtonAdd('#grid_datos_domicilio_pager',{
        id:'btn_dom_hist',
        caption:"Consulta de Histórico",
        position:"last",
        title:"Consulta de Histórico",
        cursor:"pointer",
        onClickButton:function() {
            btn_dom_hist();
        }
    });
	/************* fin grilla domicilio **********/

	/************* grilla telefonos **********/
	$("#grid_datos_telefono").jqGrid({
		colNames:datos_contacto_grid.colNames(),
		colModel:datos_contacto_grid.colModel(),
		height: 180,
		autowidth:false,
		pager: $('#grid_datos_telefono_pager'),
		caption:"Contactos:",
		postData: datos_contacto_grid.postData(),
		editurl: FUNCIONES_BASEPATH+"maestro_abm_grid.php"
	}).navGrid('#grid_datos_telefono_pager', {add:false, edit:false, del:false})
	.navButtonAdd('#grid_datos_telefono_pager',{
        id:'btn_tel_hist',
        caption:"Consulta de Histórico",
        position:"last",
        title:"Consulta de Histórico",
        cursor:"pointer",
        onClickButton:function() {
            btn_tel_hist();
        }
    });
	/************* fin grilla telefonos **********/

	/************* grilla datos complementarios **********/
	$("#grid_datos_complementarios").jqGrid({
		colNames:datos_comp_grid.colNames(),
		colModel:datos_comp_grid.colModel(),
		autowidth: false,
		height: 180,
		pager: $('#grid_datos_complementarios_pager'),
		caption:"Datos Complementarios:",
		postData: datos_comp_grid.postData(),
		editurl: FUNCIONES_BASEPATH+"maestro_abm_grid.php"
	}).navGrid('#grid_datos_complementarios_pager', {add:false, edit:false, del:false});
	/************* fin grilla datos complementarios **********/

	/************* grilla responsables **********/
	if($('#m_persona').val()=='J'){
		$("#grid_datos_responsables").jqGrid({
			colNames:datos_responsables_grid.colNames(),
			colModel:datos_responsables_grid.colModel(),
			autowidth:false,
			height:180,
			pager: $('#grid_datos_responsables_pager'),
			caption:"Nómina de Reponsables o Componentes de la Entidad/UTE:" ,		
			postData:datos_responsables_grid.postData(),
			editurl: FUNCIONES_BASEPATH+"maestro_abm_grid.php"			
		}).navGrid('#grid_datos_responsables_pager', {add:false, edit:false, del:false});
	}
	/************* fin grilla responsables **********/

	/************* grilla tributos **********/
	$("#grid_datos_tributos").jqGrid({
		colNames:datos_tributos_grid.colNames(),
		colModel:datos_tributos_grid.colModel(),
		autowidth: false,
		height: 180,
		pager: $('#grid_datos_tributos_pager'),
		caption:"Tributos:",
		postData: datos_tributos_grid.postData(),
		editurl: FUNCIONES_BASEPATH+"maestro_abm.php",
		sortable: true,
		sortname: "c_tributo",
		sortorder: "asc",
		onSelectRow:function(rowid){
			setea_parametros('#grid_datos_conceptos', {
				':id_contribuyente': $('#id_contribuyente').val(),
				':d_objeto_hecho': $("#grid_datos_tributos").getCell(rowid, 'd_objeto_hecho')
			});

			$("#btn_gen_boleta").hide();
			$("#btn_actividades").attr('disabled',true);
			$("#btn_regimen").attr('disabled',true);
			$("#btn_responsables").attr('disabled',true);
			$("#btn_excepciones").attr('disabled',true);
			$("#btn_info_agentes").attr('disabled',true);

			v_c_tributo_select = $("#grid_datos_tributos").getCell(rowid, 'c_tributo');
			if (v_c_tributo_select == '10'){
				$("#btn_gen_boleta").show();
				$("#btn_actividades").attr('disabled',false);
				$("#btn_regimen").attr('disabled',false);
				$("#btn_responsables").attr('disabled',true);
			}
			if (v_c_tributo_select == '20'){
				$("#btn_actividades").attr('disabled',false);
				$("#btn_regimen").attr('disabled',false);
				$("#btn_responsables").attr('disabled',true);
			}
			if (v_c_tributo_select == '32'){
				$("#btn_actividades").attr('disabled',true);
				$("#btn_regimen").attr('disabled',false);
				$("#btn_responsables").attr('disabled',true);
			}
			if (v_c_tributo_select == '40' || v_c_tributo_select == '30' || v_c_tributo_select == '9'){
				$("#btn_actividades").attr('disabled',true);
				$("#btn_regimen").attr('disabled',false);
				$("#btn_responsables").attr('disabled',true);
			}
			if (v_c_tributo_select == '150' || v_c_tributo_select == '32'){
				$("#btn_regimen").attr('disabled',false);
			}
			if (v_c_tributo_select == '60' || v_c_tributo_select == '90'){
				$("#btn_actividades").attr('disabled',true);
				$("#btn_responsables").attr('disabled',false);
			}
			if (v_c_tributo_select == '30' || v_c_tributo_select == '40'){
				//ver si 40 tambien debe habilitar el boton
				$("#btn_info_agentes").attr('disabled',false);
				if(v_c_tributo_select == '40'){
					$(".anexo7").show();
					$(".anexos").hide();
					$("#n_anexo_principal").val('07');
					$("#n_anexo_principal").attr('disabled',true);
					// ver si #n_anexo_1 y #n_anexo_2 pueden tener otros valores o solo '07'
				}else{
					$("#n_anexo_principal").val('');
					$("#n_anexo_principal").attr('disabled',false);
					$(".anexo7").hide();
					$(".anexos").show();
				}
				$('.selectpicker').selectpicker('refresh');
			}
			if (v_c_tributo_select=="70"||v_c_tributo_select=="71"||v_c_tributo_select=="72"||
				v_c_tributo_select=="73"||v_c_tributo_select=="74"||v_c_tributo_select=="75"||
				v_c_tributo_select=="76"||v_c_tributo_select=="77"||v_c_tributo_select=="78"||
				v_c_tributo_select=="80"||v_c_tributo_select=="81"){

				$("#btn_planes").attr('disabled',false);
			}
		}
	}).navGrid('#grid_datos_tributos_pager', {add:false, edit:false, del:false})
	.navButtonAdd('#grid_datos_tributos_pager',{
        id:'btn_trib_hist',
        caption:"Consulta de Histórico",
        position:"last",
        title:"Consulta de Histórico",
        cursor:"pointer",
        onClickButton:function() {
            btn_trib_hist();
        }
    })
	.jqGrid('sortGrid', 'd_objeto_hecho', true, 'asc');
	//.jqGrid('sortGrid', 'c_tributo', true, 'desc');

    $("#bt_informe_grid_datos_tributos_pager div").html('<span class="glyphicon glyphicon-print"></span> Imprimir Tributos');
	/************* fin grilla tributos **********/

	/************* grilla conceptos **********/
	$("#grid_datos_conceptos").jqGrid({
		colNames:datos_conceptos_grid.colNames(),
		colModel:datos_conceptos_grid.colModel(),
		autowidth: false,
		height: 180,
		pager: $('#grid_datos_conceptos_pager'),
		caption:"Conceptos:",
		postData: datos_conceptos_grid.postData(),
		editurl: FUNCIONES_BASEPATH+"maestro_abm_grid.php"
	}).navGrid('#grid_datos_conceptos_pager', {add:false, edit:false, del:false});
	/************* fin grilla conceptos **********/

	/************* grilla datos integrnate **********/
	$("#grid_datos_integrante").jqGrid({
		colNames:datos_int_grid.colNames(),
		colModel:datos_int_grid.colModel(),
		autowidth: false,
		height: 180,
		pager: $('#grid_datos_integrante_pager'),
		caption:"Empresas que Integra el Contribuyente:",
		postData: datos_int_grid.postData(),
		editurl: FUNCIONES_BASEPATH+"maestro_abm_grid.php"
	}).navGrid('#grid_datos_integrante_pager', {add:false, edit:false, del:false});
	/************* fin grilla datos integrnate **********/

	/************* grilla datos co-propietario **********/
	$("#grid_datos_coprop").jqGrid({
		colNames:datos_coprop_grid.colNames(),
		colModel:datos_coprop_grid.colModel(),
		autowidth: false,
		height: 180,
		pager: $('#grid_datos_coprop_pager'),
		caption:"Objetos Donde el Contribuyente es Co-Propietario:",
		postData: datos_coprop_grid.postData(),
		editurl: FUNCIONES_BASEPATH+"maestro_abm_grid.php"
	}).navGrid('#grid_datos_coprop_pager', {add:false, edit:false, del:false})
	.navButtonAdd('#grid_datos_coprop_pager',{
        id:'btn_obj_contrib',
        caption:"Búsqueda de Objetos",
        position:"last",
        title:"Búsqueda de Objetos",
        cursor:"pointer",
        onClickButton:function() {
            btn_obj_contrib();
        }
    });
	/************* fin grilla datos co-propietario **********/

	/************* grilla datos asociados exencion **********/
	$("#grid_datos_asoc_exc").jqGrid({
		colNames:datos_asoc_exc_grid.colNames(),
		colModel:datos_asoc_exc_grid.colModel(),
		autowidth: false,
		height: 180,
		pager: $('#grid_datos_asoc_exc_pager'),
		caption:"Asociados Exención:",
		postData: datos_asoc_exc_grid.postData(),
		editurl: FUNCIONES_BASEPATH+"maestro_abm_grid.php"
	}).navGrid('#grid_datos_asoc_exc_pager', {add:false, edit:false, del:false});
	/************* fin grilla datos asociados exencion **********/
}

///////////////////////////////////// GRILLAS TAB TRIBUTOS /////////////////////////////////////

function crea_grillas_act_jur(){
	$("#grid_datos_actividades_cm").jqGrid({
		colNames:datos_actividades_cm_grid.colNames(),
		colModel:datos_actividades_cm_grid.colModel(),
		autowidth: false,
		height: 180,
		pager: $('#grid_datos_actividades_cm_pager'),
		caption:"Actividades:",
		postData: datos_actividades_cm_grid.postData(),
		editurl: FUNCIONES_BASEPATH+"maestro_abm_grid.php"
	}).navGrid('#grid_datos_actividades_cm_pager',{add:false, edit:false, del:false})
	.navButtonAdd('#grid_datos_actividades_cm_pager',{
        id:'btn_act_hist',
        caption:"Consulta de Histórico",
        position:"last",
        title:"Consulta de Histórico",
        cursor:"pointer",
        onClickButton:function() {
            btn_act_hist();
        }
    });

	$("#grid_datos_jurisdicciones").jqGrid({
		colNames:datos_jurisdicciones_grid.colNames(),
		colModel:datos_jurisdicciones_grid.colModel(),
		autowidth: false,
		height: 180,
		pager: $('#grid_datos_jurisdicciones_pager'),
		caption:"Jurisdicciones:",
		postData: datos_jurisdicciones_grid.postData(),
		editurl: FUNCIONES_BASEPATH+"maestro_abm_grid.php"
	}).navGrid('#grid_datos_jurisdicciones_pager',{add:false, edit:false, del:false});
}

function crea_grillas_com_act(){
	$("#grid_datos_comercios").jqGrid({
		colNames:datos_comercios_grid.colNames(),
		colModel:datos_comercios_grid.colModel(),
		autowidth: false,
		height: 180,
		pager: $('#grid_datos_comercios_pager'),
		caption:"Comercios:",
		postData: datos_comercios_grid.postData(),
		editurl: FUNCIONES_BASEPATH+"maestro_abm_grid.php"
	}).navGrid('#grid_datos_comercios_pager',{add:false, edit:false, del:false})
	.navButtonAdd('#grid_datos_comercios_pager',{
        id:'btn_est_hist',
        caption:"Consulta de Histórico",
        position:"last",
        title:"Consulta de Histórico",
        cursor:"pointer",
        onClickButton:function() {
            btn_est_hist();
        }
    });

	$("#grid_datos_actividades_ibd").jqGrid({
		colNames:datos_actividades_idb_grid.colNames(),
		colModel:datos_actividades_idb_grid.colModel(),
		autowidth: false,
		height: 180,
		pager: $('#grid_datos_actividades_ibd_pager'),
		caption:"Actividades:",
		postData: datos_actividades_idb_grid.postData(),
		editurl: FUNCIONES_BASEPATH+"maestro_abm_grid.php"
	}).navGrid('#grid_datos_actividades_ibd_pager',{add:false, edit:false, del:false})
	.navButtonAdd('#grid_datos_actividades_ibd_pager',{
        id:'btn_act_hist',
        caption:"Consulta de Histórico",
        position:"last",
        title:"Consulta de Histórico",
        cursor:"pointer",
        onClickButton:function() {
            btn_act_hist();
        }
    });

	$("#grid_datos_unidades").jqGrid({
        colNames:datos_uni_grid.colNames(),
        colModel:datos_uni_grid.colModel(),
        pager: $('#grid_datos_unidades_pager'),
        caption:"Unidades:" ,
        postData:datos_uni_grid.postData(),
        editurl: FUNCIONES_BASEPATH+"maestro_abm_grid.php",
        sortname:'c_actividad,f_vig_desde',
        autowidth: false,
        height:160,
        sortorder:'desc'
    }).navGrid('#grid_datos_unidades_pager',{add:false, edit:false, del:false})
    .navButtonAdd('#grid_datos_unidades_pager',{
        id:'btn_unidades_hist',
        caption:"Consulta de Histórico",
        position:"last",
        title:"Consulta de Histórico",
        cursor:"pointer",
        onClickButton:function() {
            btn_unidades_hist();
        }
    });
}

function crea_grilla_responsables_trib(){
	$("#grid_datos_responsables_trib").jqGrid({
		colNames:datos_responsables_trib_grid.colNames(),
		colModel:datos_responsables_trib_grid.colModel(),
		autowidth: false,
		height: 180,
		pager: $('#grid_datos_responsables_trib_pager'),
		caption:"Otros Responsables del Objeto:",
		postData: datos_responsables_trib_grid.postData(),
		editurl: FUNCIONES_BASEPATH+"maestro_abm_grid.php"
	}).navGrid('#grid_datos_responsables_trib_pager',{add:false, edit:false, del:false});
}
///////////////////////////////////// GRILLAS TAB TRIBUTOS /////////////////////////////////////

function crea_grilla_obj_contrib(){
	$("#grid_datos_objetos_contrib").jqGrid({
		colNames:datos_obj_contrib_grid.colNames(),
		colModel:datos_obj_contrib_grid.colModel(),
		autowidth: false,
		height: 180,
		pager: $('#grid_datos_objetos_contrib_pager'),
		caption:"Objetos del Contribuyente:",
		postData: datos_obj_contrib_grid.postData(),
		editurl: FUNCIONES_BASEPATH+"maestro_abm_grid.php"
	}).navGrid('#grid_datos_objetos_contrib_pager',{add:false, edit:false, del:false});
	$("#bt_informe_grid_datos_objetos_contrib_pager div").html('<span class="glyphicon glyphicon-print"></span> Imprimir Objetos');
}