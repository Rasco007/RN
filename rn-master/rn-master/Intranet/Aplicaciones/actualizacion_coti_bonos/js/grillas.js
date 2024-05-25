function init_grillas() {

    $("#bonos_grid").jqGrid({
        colNames: datos_bonos_grid.colNames(),
        colModel: datos_bonos_grid.colModel(),
        pager: $('#bonos_grid_pager'),
        postData: datos_bonos_grid.postData(),
        caption: "Actualización de Cotizaciones de Bonos",
        editurl: FUNCIONES_BASEPATH+"maestro_abm_grid.php",
        autowidth: false,
        height:500,
        sortname: 'c_bono',
        sortorder: 'asc',
    }).navGrid('#bonos_grid_pager',
        {add:false, edit:false, del:false}, //options
        {},//edit,
        {},//alta
        {}//del
    ).navButtonAdd('#bonos_grid_pager',
    {
        id:'btn_del_bono',
        caption:"",
        position:"first",
        buttonicon: "glyphicon glyphicon-trash",
        title:"Eliminar",
        cursor:"pointer",
        onClickButton:function() {
            var id = $("#bonos_grid").getGridParam('selrow');
            if (id) {
                mostrar_cuadro('C','Eliminar Bono','Esto eliminará el Bono seleccionado.<br>¿Desea continuar?',
                    function () {
                        var params = {
                            p_c_tipo_bono:$('#bonos_grid').getCell(id, 'c_bono'),
                            p_f_vig_desde:$('#bonos_grid').getCell(id, 'f_vig_desde'),
                            p_i_cotizacion:$('#bonos_grid').getCell(id, 'i_cotizacion'),
                            p_oper:'B'
                        };
                        abm_bonos(params);
                    });
            }else {
                mostrar_validacion('Debe seleccionar un Bono de la grilla.');
                return false;
            }
        }
    }).navButtonAdd('#bonos_grid_pager',
    {
        id:'btn_mod_bono',
        caption:"",
        position:"first",
        buttonicon: "glyphicon glyphicon-edit",
        title:"Modificar",
        cursor:"pointer",
        onClickButton:function() {
            var id = $("#bonos_grid").getGridParam('selrow');
            if (id) {
                $('#bono_title').text("Modificar Bono");
                $('#bono_oper').val('M');
                $('#c_bono_original').val($('#bonos_grid').getCell(id, 'c_bono'));
                $('#f_vig_desde_original').val($('#bonos_grid').getCell(id, 'f_vig_desde'));
                $('#bono_c_tipo').val($('#bonos_grid').getCell(id, 'c_bono'));
                $('#bono_d_tipo').val($('#bonos_grid').getCell(id, 'd_descripcion'));
                $('#bono_f_desde').val($('#bonos_grid').getCell(id, 'f_vig_desde'));
                $('#bono_f_hasta').val($('#bonos_grid').getCell(id, 'f_vig_hasta'));
                $('#bono_i_cotizacion').val($('#bonos_grid').getCell(id, 'i_cotizacion'));
                $('#bono_modal').modal("show");
            }else {
                mostrar_validacion('Debe seleccionar un Bono de la grilla.');
                return false;
            }
        }
    }).navButtonAdd('#bonos_grid_pager',
    {
        id:'btn_add_bono',
        caption:"",
        position:"first",
        buttonicon: "glyphicon glyphicon-plus",
        title:"Agregar",
        cursor:"pointer",
        onClickButton:function() {
            $('#bono_title').text("Agregar Bono");
            $('#bono_oper').val('A');
            $('#bono_c_tipo').val('');
            $('#bono_d_tipo').val('');
            $('#bono_f_desde').val('');
            $('#bono_f_hasta').val('');
            $('#bono_i_cotizacion').val('');
            $('#bono_modal').modal("show");
        }
    });

    
}

