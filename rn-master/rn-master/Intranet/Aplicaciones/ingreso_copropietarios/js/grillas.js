function init_grillas() {

    $("#ingreso_coprop_grid").jqGrid({
        colNames: datos_ingreso_coprop_grid.colNames(),
        colModel: datos_ingreso_coprop_grid.colModel(),
        pager: $('#ingreso_coprop_grid_pager'),
        postData: datos_ingreso_coprop_grid.postData(),
        caption: "Responsables del impuesto",
        editurl: FUNCIONES_BASEPATH+"maestro_abm_grid.php",
        autowidth: false,
        sortname: 'f_vig_desde',
        sortorder: 'desc',
        loadComplete: function (data) {
            $('#main').procOverlay({ visible: false });
            if($(this).getGridParam('postData').m_autoquery == 'S'){
                if($(this).jqGrid('getGridParam','records') === 0){
                    mostrar_error("No hay registros para los datos ingresados.");
                }
            }
        }
    }).navGrid('#ingreso_coprop_grid_pager',
        {add:false, edit:false, del:false}, //options
        {},//edit,
        {},//alta
        {}//del
    );

    if(p_modo != 'C'){
        $("#ingreso_coprop_grid").navButtonAdd('#ingreso_coprop_grid_pager',
            {
                id:'btn_edit_resp',
                caption:"Editar Responsables",
                position:"last",
                buttonicon: "",
                title:"Alta, Baja y Modificación de Responsables",
                cursor:"pointer",
                onClickButton:function() {
                    if (!$('#d_objeto_hecho').val() || $('#ingreso_coprop_grid').jqGrid('getGridParam','records') === 0) {
                        mostrar_validacion('Debe realizar una búsqueda.');
                        return false;
                    }else{
                        fun_cargar_tmp();
                    }
                }
            }
        );

        $("#tmp_coprop_grid").jqGrid({
            colNames: datos_tmp_coprop_grid.colNames(),
            colModel: datos_tmp_coprop_grid.colModel(),
            pager: $('#tmp_coprop_grid_pager'),
            postData: datos_tmp_coprop_grid.postData(),
            caption: "Responsables del impuesto",
            editurl: FUNCIONES_BASEPATH+"maestro_abm_grid.php",
            autowidth: false,
            sortname: 'f_vig_desde',
            sortorder: 'desc',
            loadComplete: function (data) {
                $('#main').procOverlay({ visible: false });
                if($(this).getGridParam('postData').m_autoquery == 'S'){
                    if($(this).jqGrid('getGridParam','records') === 0){
                        mostrar_error("No hay registros para los datos ingresados.");
                    }
                }
            }
        }).navGrid('#tmp_coprop_grid_pager',
            {add:true, edit:true, del:true}, //options
            {}, //edit options
            {
                width:600,
                onInitializeForm: defaultInitForm(function(formid) {
                    lupas_grilla(formid);
                    $('#n_cuit',formid).mask("99-99999999-9");
                    $('#n_documento',formid).mask("999999999");
                }),
                beforeSubmit: function(postdata, formid) {
                    var valido_participacion, valido_rango_f;
                    var msj = '';
                    valido_participacion = participacion_valida($("#p_participacion",formid).val());
                    if (!valido_participacion){
                        msj = 'El valor ingresado en el campo Participación no es válido.';
                    }
                    valido_rango_f = valida_rango_fechas(formid);
                    if(!valido_rango_f){
                        msj = 'La fecha hasta no puede ser anterior a la fecha desde';
                    }
                    return [valido_participacion && valido_rango_f, msj]
                },
                onclickSubmit: function(params, postdata) {
                    var ret = $(this).getGridParam('postData');
                    postdata.n_tabla_tipo_resp = 7;
                    postdata.n_tabla_tipo_doc = 1;
                    postdata.c_tributo = p_tributo;
                    postdata.d_objeto_hecho = $('#d_objeto_hecho','#frm_busqueda').val();
                    postdata.n_cuit = limpia_cuit(postdata.n_cuit);
                    postdata.n_sesion = p_n_sesion;
                    postdata.m_exento = 'N';
                    postdata = $.extend(postdata,eval('('+ret.param+')'));
                    return postdata;
                },
                beforeInitData: function(formid) {
                    if (!$('#d_objeto_hecho').val() || $('#tmp_coprop_grid').jqGrid('getGridParam','records') === 0) {
                        mostrar_validacion('Debe realizar una búsqueda.');
                        return false;
                    }
                },
                afterSubmit: function(response,postdata){
                    var res = $.parseJSON(response.responseText);
                    // Los otros errores estan contemplados, solo sale ese msj para el error de PK de código
                    if(res.resultado == "Se produjo un error al  realizar la operacion add"){
                        return[false,"Ya existe un registro para este Responsable."];
                    }else{
                        if(res.resultado != 'OK'){
                            return[false,res.resultado];
                        }else{
                            return[true,''];
                        }
                    }
                },
                closeAfterAdd: true
            }, //add options
            {
                onclickSubmit: function (param) { // En los delete manda todos los datos de la fila igual
                    var gridid = $(this).getGridParam('selrow');
                    // Datos de campos a incluir
                    var vcampo = $(this).getGridParam("colModel");
                    var ret = {};
                    // Asignar títulos
                    for (var j = 0; j < vcampo.length; j++) {
                        if(vcampo[j].editable){
                            if(vcampo[j].name == 'n_cuit'){
                                ret[vcampo[j].name] = limpia_cuit($(this).getCell(gridid, vcampo[j].name));
                            }
                            else ret[vcampo[j].name] = $(this).getCell(gridid, vcampo[j].name);
                        }
                    }
                    param = $(this).getGridParam('postData');
                    ret = $.extend(ret,param);
                    ret = $.extend(ret,eval('('+ret.param+')'));
                    return ret;
                }
            } //del options
        );
        $('#edit_tmp_coprop_grid').unbind();

        $("#tmp_coprop_grid").navButtonAdd('#ingreso_coprop_grid_pager',
            {
                id:'btn_update',
                caption:"",
                position:"first",
                buttonicon: "glyphicon glyphicon-edit",
                title:"Modificar",
                cursor:"pointer",
                onClickButton:function() {
                    var rowid = valida_seleccion_grilla("#tmp_coprop_grid");
                    if (rowid){
                        cargar_campos (rowid);
                        $('#modificacion_datos').modal("show");
                    }
                }
            }
        );
        $('#btn_update').hide();
        $('#edit_tmp_coprop_grid').click(function(){
            $('#btn_update').click();
        });

        $("#gview_tmp_coprop_grid > .ui-jqgrid-titlebar").hide();
    }
}

