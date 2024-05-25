function inicializarGrillas(){

    $("#main_grid").jqGrid({
        colNames: datos_main_grid.colNames(),
        colModel: datos_main_grid.colModel(),
        pager: $('#main_grid_pager'),
        caption: "Mensajes Electrónicos" ,
        postData: datos_main_grid.postData(),
        editurl: FUNCIONES_BASEPATH+"maestro_abm_grid.php",
        shrinkToFit: true,
        onSelectRow: function (rowid) {
            var f_autorizacion = $('#main_grid').getCell(rowid, 'f_autorizacion') ;
            var f_envio_msj = $('#main_grid').getCell(rowid, 'f_envio_msj') ;
            var f_leido = $('#main_grid').getCell(rowid, 'f_leido') ;
            var f_anulacion = $('#main_grid').getCell(rowid, 'f_anulacion') ;

            if (f_autorizacion != ""){
                $('#btn_editar_msj, #btn_borrar_msj, #btn_autorizar_msj').hide();
                $('#btn_enviar_msj, #btn_anular_msj').show();
            }else{
                $('#btn_editar_msj, #btn_borrar_msj, #btn_autorizar_msj').show();
                $('#btn_enviar_msj, #btn_anular_msj').hide();
            }

            if (f_envio_msj != "" ){
                $('#btn_enviar_msj').hide();
            }

            if (f_leido != '' || f_anulacion != '' ){
                $('#btn_anular_msj').hide();
                $('#btn_enviar_msj').hide();
            }

        },
        loadComplete: function () {
            gridParentWidth = $('#gbox_main_grid').parent().parent().width();
            $('#main_grid').setGridWidth(gridParentWidth);
        },
        ondblClickRow: function (rowid) {

            var d_titulo_mensaje = $('#main_grid').getCell(rowid, 'd_referencia') ;
            var d_mensaje = $('#main_grid').getCell(rowid, 'd_mensaje') ;
            let id_sol_req = $('#main_grid').getCell(rowid, 'id_adjuntos_msj') ;

            v_id_conversacion_sel = $('#main_grid').getCell(rowid, 'id_conversacion') ;
            v_id_conversacion_sel_leido = $('#main_grid').getCell(rowid, 'f_leido') ;

            $('#id_titulo').text(d_titulo_mensaje);
            $('#txt_mensaje_lectura_hide').val(d_mensaje);
            $('#id_sol_req_cons').val(id_sol_req);

            //var v_id_conv_msj = $('#ventanilla_elect_notif_grid').getCell(rowid, 'id_conversacion');
            //var v_n_sec_msj = $('id_titulo#ventanilla_elect_notif_grid').getCell(rowid, 'n_sec_msj');

            //var id_sol = $('#msj_conversacion_grid').getCell(rowid, 'id_solicitud_requisito');
            //var id_grupo_adj = $('#msj_conversacion_grid').getCell(rowid, 'id_grupo_adjuntos');

            //Buscamos el msj seleccionado
            $.ajax({
                type:'POST',
                url: "e-ventanilla/funciones.php",
                data: {p_oper:'getMensaje',id_conversacion: v_id_conversacion_sel},
                dataType: 'json',
                success: function( data ) {
                    if(data) {
                        tinymce.get("txt_mensaje_lectura").setContent(data['p_d_mensaje']);
                    }
                }
            });

            $('#modal_mensaje_vent').modal("show");
        }
    }).navGrid('#main_grid_pager',
        {add:false, edit:false, del:false}, //options
        {}, //edit
        {}, //add
        {} //del
    );
}