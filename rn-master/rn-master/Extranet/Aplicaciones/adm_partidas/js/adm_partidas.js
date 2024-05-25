var datos_main_grid = new GridParam({
    id_menu: v_id_menu,
    n_grid:0,
    n_orden:1,
    m_autoquery:v_m_autoquery,
    param:{':id_contribuyente':null,
        ':c_organismo':null,
        ':c_region':null,
        ':c_area':null,
        ':d_nomenclatura':null,
        ':n_partida':null,
        ':m_activa':null}
});

var datos_grid_hist_hect = new GridParam({
    id_menu: v_id_menu,
    n_grid:1,
    n_orden:4,
    m_autoquery:v_m_autoquery,
    param:{':n_partida':null}
});

var datos_grid_hist_act = new GridParam({
    id_menu: v_id_menu,
    n_grid:3,
    n_orden:4,
    m_autoquery:v_m_autoquery,
    param:{':n_partida':null}
});

var datos_grid_hist_resp = new GridParam({
    id_menu: v_id_menu,
    n_grid:2,
    n_orden:4,
    m_autoquery:v_m_autoquery,
    param:{':n_partida':null}
});

var auth_add;

if(v_m_dpa == 1){
    $("#btn_extincion").show();
    auth_add = true;
    if(auth_hist == 1){
        auth_hist = true;
    }else{
        auth_hist = false;
    }
}else{
    $("#btn_extincion").hide();
    auth_add = false;
}

$(document).ready(function() {

    $("#btn_buscar").click(function(){
        deshabilita_campos(true);
        v_d_nomenclatura = fun_devuelve_nomenclatura("#frm_consulta");
        setea_parametros('#main_grid',{
            ':id_contribuyente': $("#id_contribuyente").val(),
            ':c_organismo': $("#c_organismo").val(),
            ':c_region': $("#c_region").val(),
            ':c_area': $("#c_area").val(),
            ':d_nomenclatura': v_d_nomenclatura,
            ':n_partida': $("#n_partida").val(),
            ':m_activa': $("#m_rel_activa").val()
        });
    });

    $("#btn_limpiar").click(function(){
        v_d_nomenclatura = null;
        setea_parametros('#main_grid',{
            ':id_contribuyente':null,
            ':c_organismo':null,
            ':c_region':null,
            ':c_area':null,
            ':d_nomenclatura':null,
            ':n_partida':null,
            ':m_activa':null
        });
        $("#frm_consulta").trigger('reset');
        $(".limpiar","#frm_consulta").val('');
        deshabilita_campos(false);
        $(".selectpicker").selectpicker('refresh');
    });

    $("#main_grid").jqGrid({
        colNames: datos_main_grid.colNames(),
        colModel: datos_main_grid.colModel(),
        pager: $('#main_grid_pager'),
        caption: "Partidas",
        postData: datos_main_grid.postData(),
        editurl: FUNCIONES_BASEPATH+"maestro_abm.php",
        n_orden: 1,
		gridview: true,
		rowattr: function (row) {
			if (row.m_activa === "N") {
				return {"class": "partidaInactiva"};
			}
		},
        onSelectRow:function(rowid){
            if($("#main_grid").getCell(rowid,'f_baja') == "" && auth_hist == 1){
                $("#edit_grid_hist_hectareas, #edit_grid_hist_actividades, #edit_grid_hist_responsables").show();
            }else{
                $("#edit_grid_hist_hectareas, #edit_grid_hist_actividades, #edit_grid_hist_responsables").hide();
            }
        }
    }).navGrid('#main_grid_pager',
        {edit:false, add:auth_add, del:false},
        {}, //edit
        {
            beforeShowForm: defaultBeforeShowForm(function(formid){
                $(formid).validationEngine({promptPosition:'inline'});
            }),
            onInitializeForm: defaultInitForm(function(formid){
                $("#tr_n_cuit, #tr_d_denominacion, #tr_n_hectareas, #tr_d_actividad,"+
                    "#tr_f_inscripcion, #tr_f_baja, #tr_d_organismo_primer_g, #tr_d_organismo_segundo_g,"+
                    "#tr_n_cuit_resp, #tr_d_denominacion_resp, #tr_n_regante").hide();

                $("#d_nomenclatura_real",formid).lupa_generica({
                    id_lista:v_lista_nomenclaturas,
                    grid:[  {index:'id_inmueble',width:200,hidden:true},
                        {index:'d_nomenclatura_real',width:200},
                        {index:'d_nomenclatura',width:200}],
                    titulos:['ID Inmueble','Nomenclatura','Partida'],
                    caption:'Nomenclaturas',
                    sortname:'id_inmueble',
                    sortorder:'asc',
                    exactField: 'id_inmueble',
                    campos:{id_inmueble:'id_inmueble',d_nomenclatura_real:'d_nomenclatura_real',d_nomenclatura:'n_partida'},
                    keyNav:true,
                    foco:"#d_label"
                });

                $("#d_region",formid).lupa_generica({
                    id_lista:v_lista_regiones_consorcio,
                    titulos:['Código','Descripción'],
                    grid:[  {index:'c_region',width:100},
                        {index:'d_dato',width:450}],
                    caption:'Regiones',
                    sortname:'c_region',
                    sortorder:'asc',
                    exactField: 'c_region',
                    filtros:['#c_organismo'],
                    filtrosTitulos:['Consorcio'],
                    filtroNull:true,
                    campos:{c_region:'c_region',d_dato:'d_region'},
                    keyNav:true,
                    foco:"#d_label",
                    onClose:function(){
                        $("#c_area,#d_area").val("");
                    }
                });

                $("#d_area",formid).lupa_generica({
                    id_lista:v_lista_areas_consorcio,
                    titulos:['Código','Descripción'],
                    grid:[  {index:'c_area',width:100},
                        {index:'d_dato',width:450}],
                    caption:'Áreas',
                    sortname:'c_area',
                    sortorder:'asc',
                    exactField: 'c_area',
                    filtros:['#c_organismo','#c_region'],
                    filtrosTitulos:['Consorcio','Región'],
                    filtrosNulos:[true,false],
                    campos:{c_area:'c_area',d_dato:'d_area'},
                    keyNav:true,
                    foco:"#d_label"
                });
            }),
            closeAfterAdd:true
        }, //add
        {} //del
    );

    $("#grid_hist_hectareas").jqGrid({
        colNames: datos_grid_hist_hect.colNames(),
        colModel: datos_grid_hist_hect.colModel(),
        postData: datos_grid_hist_hect.postData(),
        pager: $('#grid_hist_hectareas_pager'),
        editurl: FUNCIONES_BASEPATH+"maestro_abm.php",
        sortname: 'f_vig_desde',
        sortorder: 'desc',
        autowidth:false
    }).navGrid('#grid_hist_hectareas_pager', {add:false, edit:false, del:false});

    $("#grid_hist_actividades").jqGrid({
        colNames: datos_grid_hist_act.colNames(),
        colModel: datos_grid_hist_act.colModel(),
        postData: datos_grid_hist_act.postData(),
        pager: $('#grid_hist_actividades_pager'),
        editurl: FUNCIONES_BASEPATH+"maestro_abm.php",
        sortname: 'f_vig_desde',
        sortorder: 'desc',
        autowidth:false
    }).navGrid('#grid_hist_actividades_pager', {add:false, edit:false, del:false});

    $("#grid_hist_responsables").jqGrid({
        colNames: datos_grid_hist_resp.colNames(),
        colModel: datos_grid_hist_resp.colModel(),
        postData: datos_grid_hist_resp.postData(),
        pager: $('#grid_hist_responsables_pager'),
        editurl: FUNCIONES_BASEPATH+"maestro_abm.php",
        sortname: 'f_vig_desde',
        sortorder: 'desc',
        autowidth:false
    }).navGrid('#grid_hist_responsables_pager', {add:false, edit:false, del:false});

    if(auth_hist){
        $("#grid_hist_hectareas").navButtonAdd("#grid_hist_hectareas_pager",{
            id:'edit_grid_hist_hectareas',
            buttonicon:"glyphicon-edit",
            caption:" ",
            title:"Modificar la fila seleccionada",
            position: "first",
            onClickButton:function() {
                var rowid = valida_seleccion_grilla("#grid_hist_hectareas");
                if(rowid){
                    $("#n_partida","#frm_modificacion_h_hect").val($("#grid_hist_hectareas").getCell(rowid,'n_partida'));
                    $("#f_vig_desde","#frm_modificacion_h_hect").val($("#grid_hist_hectareas").getCell(rowid,'f_vig_desde'));
                    $("#f_vig_hasta","#frm_modificacion_h_hect").val($("#grid_hist_hectareas").getCell(rowid,'f_vig_hasta'));
                    $("#n_hectareas","#frm_modificacion_h_hect").val($("#grid_hist_hectareas").getCell(rowid,'n_hectareas'));

                    $("#modificacion_h_hect").modal('show');
                }
            }
        });

        $("#grid_hist_actividades").navButtonAdd("#grid_hist_actividades_pager",{
            id:'edit_grid_hist_actividades',
            buttonicon:"glyphicon-edit",
            caption:" ",
            title:"Modificar la fila seleccionada",
            position: "first",
            onClickButton:function() {
                var rowid = valida_seleccion_grilla("#grid_hist_actividades");
                if(rowid){
                    inicializa_lupa_actividad("#frm_modificacion_h_act","_h");

                    $("#n_partida","#frm_modificacion_h_act").val($("#grid_hist_actividades").getCell(rowid,'n_partida'));
                    $("#f_vig_desde","#frm_modificacion_h_act").val($("#grid_hist_actividades").getCell(rowid,'f_vig_desde'));
                    $("#f_vig_hasta","#frm_modificacion_h_act").val($("#grid_hist_actividades").getCell(rowid,'f_vig_hasta'));
                    $("#c_actividad_h","#frm_modificacion_h_act").val($("#grid_hist_actividades").getCell(rowid,'c_actividad'));
                    $("#d_actividad_h","#frm_modificacion_h_act").val($("#grid_hist_actividades").getCell(rowid,'d_actividad'));

                    $("#modificacion_h_act").modal('show');
                }
            }
        });

        $("#grid_hist_responsables").navButtonAdd("#grid_hist_responsables_pager",{
            id:'edit_grid_hist_responsables',
            buttonicon:"glyphicon-edit",
            caption:" ",
            title:"Modificar la fila seleccionada",
            position: "first",
            onClickButton:function() {
                var rowid = valida_seleccion_grilla("#grid_hist_responsables");
                if(rowid){
                    autocompletecuitdenominacion("#frm_modificacion_h_resp");

                    $("#n_partida","#frm_modificacion_h_resp").val($("#grid_hist_responsables").getCell(rowid,'n_partida'));
                    $("#f_vig_desde","#frm_modificacion_h_resp").val($("#grid_hist_responsables").getCell(rowid,'f_vig_desde'));
                    $("#f_vig_hasta","#frm_modificacion_h_resp").val($("#grid_hist_responsables").getCell(rowid,'f_vig_hasta'));
                    $("#n_cuit","#frm_modificacion_h_resp").val($("#grid_hist_responsables").getCell(rowid,'n_cuit'));
                    $("#d_denominacion","#frm_modificacion_h_resp").val($("#grid_hist_responsables").getCell(rowid,'d_denominacion'));
                    $("#id_contribuyente","#frm_modificacion_h_resp").val($("#grid_hist_responsables").getCell(rowid,'id_contribuyente'));

                    $("#modificacion_h_resp").modal('show');
                }
            }
        });
    }
    
    inicializa_lupas();

    inicializa_botones();

    autocompletecuitdenominacion("#frm_consulta");

    eventos_modals();
});