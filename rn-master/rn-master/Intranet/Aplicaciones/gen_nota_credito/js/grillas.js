function inicializarGrillas(){
    var lastSel;

    $("#main_grid").jqGrid({
        colNames: datos_main_grid.colNames(),
        colModel: datos_main_grid.colModel(),
        postData: datos_main_grid.postData(),
        pager: $('#main_grid_pager'),
        caption: "Obligaciones con Saldo a Favor",
        editurl: FUNCIONES_BASEPATH+"maestro_abm_grid.php",
        sortname: 'n_pos_fiscal desc, n_cuota',
        sortorder: 'desc',
        datatype:'json',
        onSelectRow: function(id){
            $('#main_grid #' + id + '_i_a_aplicar').focus();
        },
        ondblClickRow: function(id){
            // Para poner la máscara de importe al input de la grilla
            $('#gbox_main_grid').on('DOMNodeInserted', 'input.mascara_importe', function () {
                
                if (!$(this).hasClass("ya_tiene_mascara_importe")){
                    $(this).addClass("ya_tiene_mascara_importe");
                    
                    $(this).keydown(function(e){
                        if( (e.keyCode != 17) && (e.keyCode != 67) ) {
                            controla_number(e, this, 2);
                        }
                    });
                }
            });

            if(id && id!==lastSel){
                $('#main_grid').restoreRow(lastSel);
                lastSel=id;
            }
            $('#main_grid').editRow(id, {keys:true, focusField: 1,
                oneditfunc: function(){
                    $('#'+id+'_i_saldo').css("text-align", "right");
                    $('#'+id+'_i_a_aplicar').css("text-align", "right");
                    $('#main_grid tr').find('input#'+ id +'_i_a_aplicar').val($("#main_grid").getCell(id,'i_saldo'));
                },
                beforeSaveRow: function () {
                    var msj = '';
                    var valido1 = $('#'+id+'_i_a_aplicar').validationEngine('validate');

                    var v_i_saldo = parse($("#main_grid").getCell(id,'i_saldo'));
                    var v_i_a_aplicar = parse($('#main_grid tr').find('input#'+ id +'_i_a_aplicar').val());
                    var valido2 = true;

                    if(v_i_a_aplicar!=''){
                        if(v_i_saldo < v_i_a_aplicar){
                            valido2 = false;
                            msj = 'El campo importe a aplicar debe ser menor o igual al campo saldo.';
                        }
                        if(v_i_a_aplicar <= 0){
                            msj = 'El campo importe a aplicar debe ser mayor a cero.';
                        }
                    }
                    if(msj){
                        mostrar_error(msj);
                        $('#main_grid').restoreRow(id);
                    }
                    return [valido1 && valido2];
                },
                successfunc:function(data){
                    var res = JSON.parse(data.responseText);
                    if(res.resultado != 'OK'){
                        mostrar_error(res.resultado);
                    }else{
                        $('#main_grid').trigger('reloadGrid');
                    }
                    return true;
                },
                extraparam: {"id_menu": 10858, "n_grid": 0,
                            "n_secuencia": $("#main_grid").getCell(id,'n_secuencia'),
                            "n_pos_fiscal": $("#main_grid").getCell(id,'n_pos_fiscal'),
                            "n_cuota": $("#main_grid").getCell(id,'n_cuota'),
                            "c_concepto": $("#main_grid").getCell(id,'c_concepto'),
                            "f_movimiento": $("#main_grid").getCell(id,'f_movimiento'),
                            "id_obligacion": $("#main_grid").getCell(id,'id_obligacion'),
                            "id_sesion": $("#main_grid").getCell(id,'id_sesion')}
            });

            $('#main_grid #' + id + '_i_a_aplicar').focus();
        }
    }).navGrid('#main_grid_pager', {add:false,edit:true,del:false}, //options
        {
            top:200,
            left: 0,
            width: 600,
            beforeShowForm: defaultBeforeShowForm(function(formid){
                $(formid).validationEngine({promptPosition:'inline'});

                $("#TblGrid_main_grid").append(
                '<tr rowpos="1" class="FormData" id="tr_i_saldo">'+
                    '<td class="CaptionTD">'+
                        '<label for="i_saldo">Saldo (*)</label>'+
                    '</td>'+
                    '<td class="DataTD">&nbsp;'+
                        '<input type="text" class="validate[required,custom[validaImporte],maxSize[22]] FormElement mascara_importe form-control"'+
                            'size="50" readonly="readonly" id="i_saldo" name="i_saldo"'+
                            'rowid="'+$("#main_grid").getGridParam("selrow")+'" role="textbox" style="text-align: right;"'+
                            'value="'+$("#main_grid").getCell($("#main_grid").getGridParam("selrow"),"i_saldo")+'">'+
                    '</td>'+
                '</tr>');
            }),
            onInitializeForm: defaultInitForm(function(formid){
                $("#i_a_aplicar",formid).val($("#main_grid").getCell($("#main_grid").getGridParam("selrow"),"i_saldo"));
                $("#tr_id_sesion, #tr_c_concepto, #tr_d_concepto, #tr_f_movimiento,"
                    +"#tr_id_obligacion, #tr_n_cuota, #tr_n_pos_fiscal",formid).hide();
                $("#id_sesion, #c_concepto, #d_concepto, #f_movimiento,"
                    +"#id_obligacion, #n_cuota, #n_pos_fiscal",formid).attr('disabled',true)
            }),
            beforeSubmit: function(postdata, formid) {
                var msj = '';
                var valido1 = $(formid).validationEngine('validate');

                var v_i_saldo = parse($("#i_saldo",formid).val());
                var v_i_a_aplicar = parse($("#i_a_aplicar",formid).val());
                var valido2 = true;

                if(v_i_a_aplicar!=''){
                    if(v_i_saldo < v_i_a_aplicar){
                        valido2 = false;
                        msj = 'El campo importe a aplicar debe ser menor al campo saldo.';
                    }
                }
                if(v_i_a_aplicar <= 0){
                    msj = 'El campo importe a aplicar debe ser mayor a cero.';
                }
                return [valido1 && valido2, msj];
            },
            onclickSubmit: function(params, postdata) {
                var ret = $(this).getGridParam('postData');
                var id = $("#main_grid").getGridParam("selrow");
                postdata.n_secuencia = $("#main_grid").getCell(id,'n_secuencia');
                postdata.id_obligacion = $("#main_grid").getCell(id,'id_obligacion');
                postdata.id_sesion = $("#main_grid").getCell(id,'id_sesion');
                postdata = $.extend(postdata,eval('('+ret.param+')'));
                return postdata;
            },
            closeAfterEdit:true
        }, //edit
        {}, //add
        {} //del
    );
}