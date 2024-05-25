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

    $("#lupa_c_tributo").lupa_generica({
        id_lista:v_lista_trib,
        titulos:['Cód. Tributo','Tributo'],
        grid:[  {index:'c_codigo',width:100},
            {index:'d_descrip',width:250}],
        caption:'Lista de Tributos',
        sortname:'d_descrip',
        sortorder:'asc',
        filtros:['1'],
        filtrosNulos:[false],
        filtrosTitulos:['Tipo Imponible'],
        campos:{c_codigo:'c_tributo',d_descrip: 'd_tributo'},
        keyNav:true,
        searchInput: '#c_tributo',
        searchCode: true,
        limpiarCod: true,
        onClose: function(){
            $('#d_objeto_hecho').val(null);
            if ($('#c_tributo').val()){
                if (parse($('#c_tributo').val()) == 10) {
                    $('#d_objeto_hecho').attr('disabled',false);
                    $('#d_objeto_hecho').addClass('validate[required]');
                }else{
                    mostrar_cuadro('I', 'Atención', 'Solo para Tributo 10.');
                    $('#c_tributo,#d_tributo').val(null);
                }
            } else {
                $('#d_objeto_hecho').attr('disabled',true).removeClass('validate[required]');
            }
        }
    });


    $("#main_grid").jqGrid({
        colNames:datos_main_grid.colNames(),
        colModel:datos_main_grid.colModel(),
        pager: $('#main_grid_pager'),
        caption:"Detalle de Autorizaciones:" ,
        postData:datos_main_grid.postData(),
        editurl: FUNCIONES_BASEPATH+"maestro_abm.php",
        autowidth: false,
        sortname: 'c_tributo, pos_fisc_ord desc, n_cuota_anticipo desc',
        sortorder:'',
        loadComplete:function(data){
            if($('#main_grid').getGridParam('postData').m_autoquery == 'S'){
                if($(this).jqGrid('getGridParam','records') == 0){
                    mostrar_cuadro('I', 'Atención', 'No se han encontrado registros para la consulta realizada.');
                }else{
                    $('#c_tributo,#d_objeto_hecho').attr('disabled',true);
                    $('#btn_limpiar').attr('disabled',false);
                    $('#lupa_c_tributo').hide();
                    jQuery("#main_grid").setSelection($('#main_grid tbody tr')[1]['id'], true);
                }
            }
            id_contrib = null;
            objeto_hecho = null;
            c_tipo_imponible = null;
            c_tributo = null;
        },
        onSelectRow: function(id) {
            id_contrib = $('#main_grid').getCell(id, 'id_contribuyente');
            objeto_hecho = $('#main_grid').getCell(id, 'd_objeto_hecho');
            c_tipo_imponible = $('#main_grid').getCell(id, 'c_tipo_imponible');
            c_tributo = $('#main_grid').getCell(id, 'c_tributo');
            $('#id_contribuyente').val(id_contrib);
            $('#n_cuit').val($('#main_grid').getCell(id, 'cuit_cont'));
            $('#d_denominacion').val($('#main_grid').getCell(id, 'deno_cont'));
            $('#c_tipo_documento').val($('#main_grid').getCell(id, 'c_doc_cont'));
            $('#d_tipo_documento').val($('#main_grid').getCell(id, 'd_doc_cont'));
            $('#n_documento').val($('#main_grid').getCell(id, 'doc_cont'));
            $('#c_tributo').val(c_tributo);
            $('#d_tributo').val($('#main_grid').getCell(id, 'd_tributo'));
            $('#d_objeto_hecho').val(objeto_hecho);
            $('#f_cese_prov').val($('#main_grid').getCell(id, 'f_cese_provisorio'));
            if (parse($('#main_grid').getCell(id, 'pos_fisc_ord')) >= 200500 &&
            $('#main_grid').getCell(id, 'c_tipo_bon')) {
                $('#btn_reconf_bon').attr('disabled',false);
            }else{
                $('#btn_reconf_bon').attr('disabled',true);
            }
        },
        ondblClickRow: function(id){
            post_to_url('detalle_cuenta_corr.php',{'p_f_actualizacion':null,'p_n_id_menu':10854,'n_cuit':$('#main_grid').getCell(id, 'cuit_cont'),'id_obligacion':$('#main_grid').getCell(id, 'id_obligacion'),'n_pos_fiscal': null,'n_cuota':null},'_blank','POST');
        }
    }).navGrid('#main_grid_pager',
        {add:false, edit:false, del:false}, //options
        {},//edit,
        {},//alta
        {}//del
    );

    $('#jqgh_main_grid_f_vto_pres,#jqgh_main_grid_f_vto_pago').attr('style','font-weight: bold;color: brown;');
    $('#jqgh_main_grid_f_presentacion,#jqgh_main_grid_id_ddjj,#jqgh_main_grid_m_erronea').attr('style','font-weight: bold;color: magenta;');

    if (modo == 'X'){
        $('#main_grid').navButtonAdd('#main_grid_pager',
        {
            id:'btn_del_bon',
            caption:"",
            position:"first",
            buttonicon: "glyphicon glyphicon-trash",
            title:"Eliminar",
            cursor:"pointer",
            onClickButton:function() {
                var id = $("#main_grid").getGridParam('selrow');
                if (id) {
                    if ($('#main_grid').getCell(id, 'c_tipo_bon')) {
                        mostrar_cuadro('C','Eliminar Bonificación','Esto eliminará la Bonificación aplicada a la Obligación selacionada.<br>¿Desea continuar?',
                        function () {
                            var params = {};
                            tipo_bonif(params);
                        });
                    }else{
                        mostrar_validacion('La Obligación seleccionada no posee una Bonificación.');
                        return false;
                    }
                }else {
                    mostrar_validacion('Debe seleccionar una Obligación de la grilla.');
                    return false;
                }
            }
        }).navButtonAdd('#main_grid_pager',
            {
                id:'btn_mod_bon',
                caption:"",
                position:"first",
                buttonicon: "glyphicon glyphicon-edit",
                title:"Modificar",
                cursor:"pointer",
                onClickButton:function() {
                    var id = $("#main_grid").getGridParam('selrow');
                    if (id) {
                        if (parse($('#main_grid').getCell(id, 'pos_fisc_ord')) >= 200500 &&
                            !$('#main_grid').getCell(id, 'id_ddjj') &&
                            !$('#main_grid').getCell(id, 'c_tipo_bon')) {
                                mostrar_validacion('No corresponde.');
                                return false;
                        }else {
                            let grid_c_bon = $('#main_grid').getCell(id, 'c_tipo_bon');
                            let grid_d_bon = $('#main_grid').getCell(id, 'd_tipo_bon');
                            if (parse(grid_c_bon) != 0) {
                                $('#c_bonif_tipo').val(grid_c_bon);
                                $('#d_bonif_tipo').val(grid_d_bon);
                            }
                            $('#modal_bonif').modal("show");
                        }
                    }else {
                        mostrar_validacion('Debe seleccionar una Obligación de la grilla.');
                        return false;
                    }
                }
            });
    }

    $("#lupa_bonif_tipo").lupa_generica({
        id_lista:v_lista_bonif,
        titulos:['C&oacute;digo','Descripci&oacute;n'],
        grid:[{index:'c_codigo',width:100},
        {index:'d_descrip',width:250}],
        caption:'Tipos de Bonificaciones',
        sortname:'c_codigo',
        sortorder:'asc',
        filtros:['#filtro_bonif'],
        filtroNull:true,
        searchInput: '#c_bonif_tipo',
        searchCode: true,
        limpiarCod: true,
        campos:{c_codigo:'c_bonif_tipo',d_descrip:'d_bonif_tipo'},
        keyNav:true
    });
}