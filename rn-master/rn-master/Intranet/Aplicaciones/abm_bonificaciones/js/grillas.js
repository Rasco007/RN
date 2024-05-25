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
            $('#d_objeto_hecho,#n_digito').val(null);
            if ($('#c_tributo').val()){
                $('#d_objeto_hecho').attr('disabled',false);
                if($('#c_tributo').val() == 90){
                    $('#d_objeto_hecho, #n_digito').addClass('validate[required]');
                    $('#n_digito').attr('disabled',false);
                }else {
                    $('#d_objeto_hecho, #n_digito').removeClass('validate[required]');
                    $('#n_digito').attr('disabled',true);
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
        keyNav:true/*,
        onClose: function(){
            if (!$('#id_contribuyente').val() && $('#d_objeto_hecho').val()){
                fun_ajax_objeto_hecho();
            }
        }*/
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
            $('#bonificaciones_grid').jqGrid('clearGridData');
        },
        gridComplete: function() {
        },
        onSelectRow: function(id) {
            id_contrib = $('#main_grid').getCell(id, 'id_contribuyente');
            objeto_hecho = $('#main_grid').getCell(id, 'd_objeto_hecho');
            c_tipo_imponible = $('#main_grid').getCell(id, 'c_tipo_imponible');
            c_tributo = $('#main_grid').getCell(id, 'c_tributo');
            f_vig_desde_obj = $('#main_grid').getCell(id, 'f_vig_desde');

            $("#c_tipo_imponible").val(c_tipo_imponible);
            $("#d_tipo_imponible").val($('#main_grid').getCell(id, 'd_tipo_imp'));
            $("#c_tributo").val(c_tributo);
            $("#d_tributo").val($('#main_grid').getCell(id, 'd_tributo'));
            $("#d_objeto_hecho").val(objeto_hecho);

            getDatosAdicionales();

            setea_parametros('#bonificaciones_grid',{':p_id_contrib':id_contrib,
                ':p_c_timp':c_tipo_imponible,
                ':p_c_trib':c_tributo,
                ':p_objeto':objeto_hecho});

        }
    }).navGrid('#main_grid_pager',
        {add:false, edit:false, del:false}, //options
        {},//edit,
        {},//alta
        {}//del
    );

    $("#bonificaciones_grid").jqGrid({
        colNames:datos_bonificaciones_grid.colNames(),
        colModel:datos_bonificaciones_grid.colModel(),
        autowidth:false,
        height:160,
        pager: $('#bonificaciones_grid_pager'),
        caption:"Bonificaciones:" ,
        postData:datos_bonificaciones_grid.postData(),
        editurl: FUNCIONES_BASEPATH+"maestro_abm_grid.php",
        sortname:'pos_fisc_ord desc, n_cuota desc',
        sortorder:'',
        loadComplete:function(data){
            gridParentWidth = $('#gbox_bonificaciones_grid').parent().width();
            $('#bonificaciones_grid').setGridWidth(gridParentWidth);
        },
        onSelectRow: function(id) {
            if (modo != 'C'){
                if ($(this).getCell(id,'m_tipo_bonif') != 'MA' && $(this).getCell(id,'m_tipo_bonif') != '24'){
                    if (role_total == 'S'){
                        $('#btn_del_bonif, #btn_mod_bonif').show();
                    }else {
                        $('#btn_del_bonif, #btn_mod_bonif').hide();
                    }
                }else if ($(this).getCell(id,'m_tipo_bonif') == 'MA'){
                    $('#btn_del_bonif, #btn_mod_bonif').show();
                }else {
                    $('#btn_del_bonif, #btn_mod_bonif').hide();
                }
            }else {
                $('#btn_del_bonif, #btn_mod_bonif').hide();
            }
        }
    }).navGrid('#bonificaciones_grid_pager',
        {add:false, edit:false, del:false}, //options
        {}, //edit options
        {}, // add options
        {}, // del options
    );

    if (modo == 'X'){
        $('#bonificaciones_grid').navButtonAdd('#bonificaciones_grid_pager',
            {
                id:'btn_del_bonif',
                caption:"",
                position:"first",
                buttonicon: "glyphicon glyphicon-trash",
                title:"Eliminar",
                cursor:"pointer",
                onClickButton:function() {
                    var id = $("#bonificaciones_grid").getGridParam('selrow');
                    if (id) {
                        mostrar_cuadro('C','Eliminar Bonificación','Esto eliminará la Bonificación seleccionada.<br>¿Desea continuar?',
                            function () {
                                var params = {
                                    p_oper : 'D',
                                    p_id_bonif_obj:$('#bonificaciones_grid').getCell(id, 'id_bonif_obj'),
                                    p_m_tipo_bonif:$('#bonificaciones_grid').getCell(id, 'm_tipo_bonif')
                                };
                                abm_bonificacion(params);
                            });
                    }else {
                        mostrar_validacion('Debe seleccionar una Bonificación de la grilla.');
                        return false;
                    }
                }
            }).navButtonAdd('#bonificaciones_grid_pager',
            {
                id:'btn_mod_bonif',
                caption:"",
                position:"first",
                buttonicon: "glyphicon glyphicon-edit",
                title:"Modificar",
                cursor:"pointer",
                onClickButton:function() {
                    var id = $("#bonificaciones_grid").getGridParam('selrow');
                    if (id) {
                        $('#bonif_title').text("Modificar Bonificación");
                        $('#bonif_oper').val('M');
                        $('#bonif_id_bonif').val($('#bonificaciones_grid').getCell(id, 'id_bonif_obj'));
                        $('#bonif_pos_fiscal').val($('#bonificaciones_grid').getCell(id, 'n_posicion_fiscal'));
                        $('#bonif_cuota').val($('#bonificaciones_grid').getCell(id, 'n_cuota'));
                        $('#bonif_c_tipo').val($('#bonificaciones_grid').getCell(id, 'm_tipo_bonif'));
                        $('#bonif_d_tipo').val($('#bonificaciones_grid').getCell(id, 'd_tipo_bonificacion'));
                        $('#bonif_porcentaje').val($('#bonificaciones_grid').getCell(id, 'n_porc_bonificacion'));
                        $('#bonif_observacion').val($('#bonificaciones_grid').getCell(id, 'd_observacion'));
                        $('#bonif_modal').modal("show");
                    }else {
                        mostrar_validacion('Debe seleccionar una Bonificación de la grilla.');
                        return false;
                    }
                }
            }).navButtonAdd('#bonificaciones_grid_pager',
            {
                id:'btn_add_bonif',
                caption:"",
                position:"first",
                buttonicon: "glyphicon glyphicon-plus",
                title:"Agregar",
                cursor:"pointer",
                onClickButton:function() {
                    var id = $("#main_grid").getGridParam('selrow');
                    if (id) {
                        $('#bonif_title').text("Agregar Bonificación");
                        $('#bonif_oper').val('A');
                        $('#bonif_c_tipo').val('MA');
                        $('#bonif_d_tipo').val('MANUAL');
                        $('#bonif_modal').modal("show");
                    }else {
                        mostrar_validacion('Debe seleccionar un Objeto de la primer grilla.');
                        return false;
                    }
                }
            });
    }
}