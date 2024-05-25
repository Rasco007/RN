function inicializarGrillas(){
    $("#lupa_c_tipo_documento").lupa_generica({
        id_lista:v_lista_tdoc,
        titulos:['C&oacute;digo','Descripci&oacute;n'],
        grid:[{index:'c_codigo',width:100},
            {index:'d_descrip',width:250}],
        caption:'Tipo de Documento',
        sortname:'d_descrip',
        sortorder:'asc',
        filtros:[],
        searchInput: '#c_tipo_documento',
        searchCode: true,
        limpiarCod: true,
        campos:{c_codigo:'c_tipo_documento',d_descrip:'d_tipo_documento'},
        keyNav:true,
        onClose: function(){
            $('#n_documento').val(null);
        }
    });

    $("#lupa_c_tipo_imponible").lupa_generica({
        id_lista:v_lista_timp,
        titulos:['Cód. Tipo Imponible','Tipo Imponible'],
        grid:[{index:'c_codigo',width:150},
            {index:'d_descrip',width:400}],
        caption:'Lista de Tipos Imponibles',
        sortname:'d_descrip',
        sortorder:'asc',
        filtros:['O','#id_contribuyente'],
        filtroNull:true,
        campos:{c_codigo:'c_tipo_imponible',d_descrip:'d_tipo_imponible'},
        keyNav:true,
        searchInput: '#c_tipo_imponible',
        searchCode: true,
        onClose: function(){
            $('#c_tributo').val(null).blur();
            if ($('#c_tipo_imponible').val()){
                $('#c_tributo').addClass('validate[required]');
            }else {
                $('#c_tributo').removeClass('validate[required]');
            }
        }
    });

    $("#lupa_c_tributo").lupa_generica({
        id_lista:v_lista_trib,
        titulos:['Cód. Tributo','Tributo'],
        grid:[  {index:'c_codigo',width:100},
            {index:'d_descrip',width:250}],
        caption:'Lista de Tributos',
        sortname:'d_descrip',
        sortorder:'asc',
        filtros:['#c_tipo_imponible'],
        filtrosNulos:[true],
        filtrosTitulos:['Tipo Imponible'],
        campos:{c_codigo:'c_tributo',d_descrip: 'd_tributo'},
        keyNav:true,
        searchInput: '#c_tributo',
        searchCode: true,
        limpiarCod: true,
        onClose: function(){
            //$('#d_objeto_hecho,#n_digito').val(null);
            if ($('#c_tributo').val()){
                $('#d_objeto_hecho').attr('disabled',false);
                if (modo ==  'X') {
                    if($('#c_tributo').val() == 90){
                        $('#d_objeto_hecho, #n_digito').addClass('validate[required]');
                        $('#n_digito').attr('disabled',false);
                    }else {
                        $('#d_objeto_hecho, #n_digito').removeClass('validate[required]');
                        $('#n_digito').attr('disabled',true);
                    }
                }
            } else {
                $('#d_objeto_hecho, #n_digito').attr('disabled',true).removeClass('validate[required]');
            }
        }
    });

    $("#lupa_d_objeto_hecho").lupa_generica({
        id_lista:v_lista_obj,
        titulos:['Descripción Objeto-Hecho'],
        grid:[{index:'d_objeto_hecho',width:250}],
        caption:'Lista de Objetos - Hechos',
        sortname:'d_objeto_hecho',  
        sortorder:'asc',
        filtros:['#c_tipo_imponible','#c_tributo','#d_objeto_hecho','#id_contribuyente'],
        filtrosNulos:[true,false,true,false],
        filtrosTitulos:['Tipo Imponible','Tributo', 'CUIT Contribuyente'],
        campos:{d_objeto_hecho:'d_objeto_hecho'},
        keyNav:true
    });

    $("#main_grid").jqGrid({
        colNames:datos_main_grid.colNames(),
        colModel:datos_main_grid.colModel(),
        pager: $('#main_grid_pager'),
        caption:"Tipo Imponible y Objetos:" ,
        postData:datos_main_grid.postData(),
        editurl: FUNCIONES_BASEPATH+"maestro_abm.php",
        sortname:'f_vig_desde',
        autowidth: false,
        height:160,
        sortorder:'desc',
        loadComplete:function(data){
            if($('#main_grid').getGridParam('postData').m_autoquery == 'S'){
                if($(this).jqGrid('getGridParam','records') == 0){
                    mostrar_cuadro('I', 'Atención', 'No se han encontrado registros para la consulta realizada.');
                }
            }
            id_contrib = null;
            objeto_hecho = null;
            c_tipo_imponible = null;
            c_tributo = null;
            f_vig_desde_obj = null;
            $('#frm_datos_inmo,#frm_datos_auto,#datos_panel').hide();
            $('#exenciones_grid').jqGrid('clearGridData');
        },
        gridComplete: function() {
        },
        onSelectRow: function(id) {
            id_contrib = $('#main_grid').getCell(id, 'id_contribuyente');
            objeto_hecho = $('#main_grid').getCell(id, 'd_objeto_hecho');
            c_tipo_imponible = $('#main_grid').getCell(id, 'c_tipo_imponible');
            c_tributo = $('#main_grid').getCell(id, 'c_tributo');
            f_vig_desde_obj = $('#main_grid').getCell(id, 'f_vig_desde');
            f_vig_hasta_obj = $('#main_grid').getCell(id, 'f_vig_hasta');
            f_cese_prov_obj = $('#main_grid').getCell(id, 'f_cese_provisorio');

            $("#c_tipo_imponible").val(c_tipo_imponible);
            $("#d_tipo_imponible").val($('#main_grid').getCell(id, 'd_tipo_imp'));
            $("#c_tributo").val(c_tributo);
            $("#d_tributo").val($('#main_grid').getCell(id, 'd_tributo'));
            $("#d_objeto_hecho").val(objeto_hecho);

            $("#n_cuit").val($('#main_grid').getCell(id, 'n_cuit'));
            $("#d_denominacion").val($('#main_grid').getCell(id, 'd_denominacion'));

            getDatosAdicionales();
            setea_parametros('#exenciones_grid',{':p_id_contrib':id_contrib,
                ':p_c_timp':c_tipo_imponible,
                ':p_c_trib':c_tributo,
                ':p_objeto':objeto_hecho,
                ':p_modo': modo,
                ':p_f_vig_desde':f_vig_desde_obj,
                ':p_f_vig_hasta':f_vig_hasta_obj});
        }
    }).navGrid('#main_grid_pager',
        {add:false, edit:false, del:false}, //options
        {},//edit,
        {},//alta
        {}//del
    );

    $("#exenciones_grid").jqGrid({
        colNames:datos_exenciones_grid.colNames(),
        colModel:datos_exenciones_grid.colModel(),
        autowidth:false,
        height:160,
        pager: $('#exenciones_grid_pager'),
        caption:"Exenciones:" ,
        postData:datos_exenciones_grid.postData(),
        editurl: FUNCIONES_BASEPATH+"maestro_abm_grid.php",
        sortname:'f_vig_desde',
        sortorder:'desc',
        loadComplete:function(data){
            gridParentWidth = $('#gbox_exenciones_grid').parent().width();
            $('#exenciones_grid').setGridWidth(gridParentWidth);
        },
        onSelectRow: function(id) {
            if (c_tributo == 90 && parse($(this).getCell(id,'p_exencion')) == 100){
                $('#btn_cert_aut').attr('disabled',false);
            }else {
                $('#btn_cert_aut').attr('disabled',true);
            }
            if ($(this).getCell(id,'c_rdf_resolucion')){
                $('#btn_imp_resu').attr('disabled',false);
            }else {
                $('#btn_imp_resu').attr('disabled',true);
            }
        }
    }).navGrid('#exenciones_grid_pager',
        {add:false, edit:false, del:false}, //options
        {}, //edit options
        {}, // add options
        {}, // del options
    );

    if (modo == 'X'){
        $('#exenciones_grid').navButtonAdd('#exenciones_grid_pager',
            {
                id:'btn_del_exen',
                caption:"",
                position:"first",
                buttonicon: "glyphicon glyphicon-trash",
                title:"Eliminar",
                cursor:"pointer",
                onClickButton:function() {
                    var id = $("#exenciones_grid").getGridParam('selrow');
                    if (id) {
                        mostrar_cuadro('C','Eliminar Exención','Esto eliminará la Exención seleccionada.<br>¿Desea continuar?',
                            function () {
                                var params = {                                
                                    p_id_exencion_obj:$('#exenciones_grid').getCell(id, 'id_exencion_obj'),
                                    p_c_exencion:$('#exenciones_grid').getCell(id, 'c_exencion'),
                                    p_d_dictamen:$('#exenciones_grid').getCell(id, 'd_dictamen'),
                                    p_d_resolucion:$('#exenciones_grid').getCell(id, 'd_resolucion'),
                                    p_p_exencion:$('#exenciones_grid').getCell(id, 'p_exencion'),
                                    p_p_exencion_tasa:$('#exenciones_grid').getCell(id, 'p_exencion_tasa'),
                                    p_f_vig_desde:$('#exenciones_grid').getCell(id, 'f_vig_desde'),
                                    p_f_vig_hasta:$('#exenciones_grid').getCell(id, 'f_vig_hasta'),
                                    p_c_delegacion:$('#exenciones_grid').getCell(id, 'c_delegacion'),
                                    p_d_disc_vinculo:$('#exenciones_grid').getCell(id, 'd_disc_vinculo'),
                                    p_d_disc_expe_por:$('#exenciones_grid').getCell(id, 'd_disc_expe_por'),
                                    p_d_expediente:$('#exenciones_grid').getCell(id, 'd_expediente'),
                                    p_n_disc_cuit:limpia_cuit($('#exenciones_grid').getCell(id, 'n_disc_cuit')),
                                    p_disc_id_contrib:$('#exenciones_grid').getCell(id, 'disc_id_contrib'),
                                    p_oper:'D',
                                    p_primera:'N',
                                };
                                abm_exencion(params);
                            });
                    }else {
                        mostrar_validacion('Debe seleccionar una Exención de la grilla.');
                        return false;
                    }
                }
            }).navButtonAdd('#exenciones_grid_pager',
            {
                id:'btn_mod_exen',
                caption:"",
                position:"first",
                buttonicon: "glyphicon glyphicon-edit",
                title:"Modificar",
                cursor:"pointer",
                onClickButton:function() {
                    var id = $("#exenciones_grid").getGridParam('selrow');
                    if (id) {
                        $('#exen_title').text("Modificar Exención");
                        $('#exen_oper').val('M');
                        $('#exen_id_exen').val($('#exenciones_grid').getCell(id, 'id_exencion_obj'));
                        $('#exen_c_exen').val($('#exenciones_grid').getCell(id, 'c_exencion'));
                        $('#exen_d_exen').val($('#exenciones_grid').getCell(id, 'd_exencion'));
                        $('#exen_c_rdf_res').val($('#exenciones_grid').getCell(id, 'c_rdf_resolucion'))
                        $('#exen_dictamen').val($('#exenciones_grid').getCell(id, 'd_dictamen'));
                        $('#exen_resolucion').val($('#exenciones_grid').getCell(id, 'd_resolucion'));
                        $('#exen_tributo').val($('#exenciones_grid').getCell(id, 'p_exencion'));
                        $('#exen_tasa').val($('#exenciones_grid').getCell(id, 'p_exencion_tasa'));
                        $('#exen_f_desde').val($('#exenciones_grid').getCell(id, 'f_vig_desde'));
                        $('#exen_f_hasta').val($('#exenciones_grid').getCell(id, 'f_vig_hasta'));
                        $('#exen_c_prov').val($('#exenciones_grid').getCell(id, 'c_delegacion'));
                        $('#exen_d_prov').val($('#exenciones_grid').getCell(id, 'd_dato'));
                        $('#disc_vinc').val($('#exenciones_grid').getCell(id, 'd_disc_vinculo'));
                        $('#disc_exp').val($('#exenciones_grid').getCell(id, 'd_disc_expe_por'));
                        $('#exen_d_exp').val($('#exenciones_grid').getCell(id, 'd_expediente'));
                        $('#disc_cuit').val($('#exenciones_grid').getCell(id, 'n_disc_cuit'));
                        $('#disc_id_contribuyente').val($('#exenciones_grid').getCell(id, 'disc_id_contrib'));
                    $('#exen_modal').modal("show");
                    }else {
                        mostrar_validacion('Debe seleccionar una Exención de la grilla.');
                        return false;
                    }
                }
            }).navButtonAdd('#exenciones_grid_pager',
            {
                id:'btn_add_exen',
                caption:"",
                position:"first",
                buttonicon: "glyphicon glyphicon-plus",
                title:"Agregar",
                cursor:"pointer",
                onClickButton:function() {
                    var id = $("#main_grid").getGridParam('selrow');
                    if (id) {
                        $('#exen_title').text("Agregar Exención");
                        $('#exen_oper').val('A');
                        $('#exen_modal').modal("show");
                    }else {
                        mostrar_validacion('Debe seleccionar un Objeto de la primer grilla.');
                        return false;
                    }
                }
            });
    }
}