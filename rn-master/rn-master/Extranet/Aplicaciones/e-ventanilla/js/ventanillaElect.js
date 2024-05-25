let v_id_conversacion_sel;
let v_id_conversacion_sel_leido;

//variables de definicion de grillas
var datos_ventanilla_elect_notif_grid = new GridParam({
    id_menu: p_id_menu,
    n_grid: 0,
    m_autoquery: 'S',
    param: { ':p_id_contribuyente' : p_id_contribuyente}
});


var datos_ventanilla_elect_msj_grid = new GridParam({
    id_menu: p_id_menu,
    n_grid: 1,
    m_autoquery: 'S',
    param: {':p_id_contribuyente': p_id_contribuyente}
});


function configurarEditor(idDestino, idOrigen, modo) {
    if( modo =='visualizar' ) {
        tinymce.init({
            selector: '#'+idDestino,
            height: 250,
            language: "es_TDI",
            menubar: false,
            statusbar: false,
            toolbar: false,
            readonly : true,
            setup: function (ed) {
                ed.on('init', function(){
                    this.setContent( $('#'+idOrigen).val());
                });
            }
        });
    }
}


function leerMsj(rowid,p_tipo_msj){

    if (p_tipo_msj == 'MSJ'){
        var d_titulo_mensaje = $('#ventanilla_elect_msj_grid').getCell(rowid, 'd_referencia') ;
        var d_mensaje = $('#ventanilla_elect_msj_grid').getCell(rowid, 'd_mensaje') ;
        var id_grupo_adj = $('#ventanilla_elect_msj_grid').getCell(rowid, 'id_adjuntos_msj');

        v_id_conversacion_sel = $('#ventanilla_elect_msj_grid').getCell(rowid, 'id_conversacion') ;
        v_id_conversacion_sel_leido = $('#ventanilla_elect_msj_grid').getCell(rowid, 'f_leido') ;
    }

    if (p_tipo_msj == 'NOTIF'){
        var d_titulo_mensaje = $('#ventanilla_elect_notif_grid').getCell(rowid, 'd_referencia') ;
        var d_mensaje = $('#ventanilla_elect_notif_grid').getCell(rowid, 'd_mensaje') ;
        var id_grupo_adj = $('#ventanilla_elect_notif_grid').getCell(rowid, 'id_adjuntos_msj');

        v_id_conversacion_sel = $('#ventanilla_elect_notif_grid').getCell(rowid, 'id_conversacion') ;
        v_id_conversacion_sel_leido = $('#ventanilla_elect_notif_grid').getCell(rowid, 'f_leido') ;
    }

    $('#id_titulo').text(d_titulo_mensaje);
    $('#txt_mensaje_lectura_hide').val(d_mensaje);
    $('#id_adjuntos').val(id_grupo_adj);
    tinymce.get("txt_mensaje_lectura").setContent($('#txt_mensaje_lectura_hide').val());
    $('#modal_mensaje_vent').modal("show");
}

$(document).ready(function () {

    if (p_msj_bloqueantes > 0 ){
        $("[id^=id_li_]").remove();
        $('.msj_bloqueante_alert').show();
    }

    configurarEditor('txt_mensaje_lectura', 'txt_mensaje_lectura_hide', 'visualizar');

    $('#modal_mensaje_vent').on('shown.bs.modal', function () {
        if (v_id_conversacion_sel_leido === ''){
            $.ajax({
                type:'POST',
                url: FUNCIONES_BASEPATH + 'maestro_abm.php',
                async:false,
                data:{
                    "p_id_conversacion":v_id_conversacion_sel,
                    "id_menu":p_id_menu,
                    "n_orden":0
                },
                dataType:'json',
                success: function( data ) {
                    if(data.resultado == 'OK'){
                        /*if (data.p_cant_bloq == 0){
                            location.reload();
                        }*/
                        return;
                    }else{
                        mostrar_cuadro('E', 'Error al leer el mensaje', data.resultado);
                    }
                }
            });
        }

        let id_adjuntos = $('#id_adjuntos').val();
        build_grid_adjuntos(id_adjuntos, [],1);
    })

    $('#btn_cerrar_msj').click(function(){
       tinymce.get("txt_mensaje_lectura").setContent('');
        $('#txt_mensaje_lectura').val('');
        $('#txt_mensaje_lectura_hide').val('');

        if (v_id_conversacion_sel_leido === ''){
            $('#ventanilla_elect_notif_grid').trigger('reloadGrid');
            $('#ventanilla_elect_msj_grid').trigger('reloadGrid');
        }

        if (p_msj_bloqueantes> 0 ){
            $('#main').procOverlay({
                visible: true
            });

            //Verificando mensajes bloqueantes
            $.ajax({
                type:'POST',
                url: 'e-ventanilla/dao_ventanilla_elect.php',
                async:false,
                data:{
                    "p_oper":'get_msj_bloqueantes',
                },
                dataType:'json',
                success: function( data ) {
                    if(data.resultado == 'OK'){
                         if (data.msj_bloq == 0){
                             mostrar_cuadro('I',
                                 'NOTIFICACIONES LEIDAS',
                                 'No existen mensajes sin leer o notificar. Los servicios ya fueron habilitados para operar.',
                                 function(){
                                     location.reload();
                                 },null,400);
                         }
                        $('#main').procOverlay({
                            visible: false
                        });
                    }
                }
            });
        }
    });

    /************************************************DEFINICION DE GRILLAS**********************************************************************/

    //Grilla de NOTIFICACIONES
    $("#ventanilla_elect_notif_grid").jqGrid({
        colNames: datos_ventanilla_elect_notif_grid.colNames(),
        colModel: datos_ventanilla_elect_notif_grid.colModel(),
        postData: datos_ventanilla_elect_notif_grid.postData(),
        pager: $('#ventanilla_elect_notif_grid_pager'),
        caption: "Bandeja de Mensajes - Notificaciones",
        /*sortname:'n_orden asc, f_orden',
        sortorder:'desc',*/
       // grouping:true,
        autowidth: false,
        editurl: FUNCIONES_BASEPATH + "maestro_abm_grid.php",
        loadComplete:function() {
            var rowData = $("#ventanilla_elect_notif_grid").getDataIDs();
            var ids = $('#ventanilla_elect_notif_grid').jqGrid('getDataIDs');
            var v_cont = 0;
            for (var i = 0; i < rowData.length; i++)
            {
                var v_estado_conv = ($('#ventanilla_elect_notif_grid').getCell(ids[i],'c_estado_msj'));
                if (v_estado_conv == 'N'){
                    v_cont = v_cont +1;
                }
            }
            $('#cant_notif').text(' ('+v_cont+')');

            var gridParentNotif = $('#gbox_ventanilla_elect_notif_grid').parent().parent().width();
            $('#ventanilla_elect_notif_grid').setGridWidth(gridParentNotif);

        },
        ondblClickRow: function (rowid) {
            leerMsj(rowid,'NOTIF');
        }
    })
    .navGrid('#ventanilla_elect_notif_grid_pager', {add: false, edit: false, del: false}, //options
        {}, //edit
        {}, //alta
        {}, //del
        {} //search
    );


    //Grilla de NOTIFICACIONES
    $("#ventanilla_elect_msj_grid").jqGrid({
        colNames: datos_ventanilla_elect_msj_grid.colNames(),
        colModel: datos_ventanilla_elect_msj_grid.colModel(),
        postData: datos_ventanilla_elect_msj_grid.postData(),
        pager: $('#ventanilla_elect_msj_grid_pager'),
        caption: "Bandeja de Mensajes - Mensajes",
        /*sortname:'n_orden asc, f_orden',
        sortorder:'desc',*/
        // grouping:true,
        autowidth: false,
        editurl: FUNCIONES_BASEPATH + "maestro_abm_grid.php",
        loadComplete:function() {

            var rowData = $("#ventanilla_elect_msj_grid").getDataIDs();
            var ids = $('#ventanilla_elect_msj_grid').jqGrid('getDataIDs');
            var v_cont = 0;
            for (var i = 0; i < rowData.length; i++)
            {
                var v_estado_conv = ($('#ventanilla_elect_msj_grid').getCell(ids[i],'c_estado_msj'));
                if (v_estado_conv == 'N'){
                    v_cont = v_cont +1;
                }
            }
            $('#cant_msj').text(' ('+v_cont+')');

            var gridParentNotif = $('#gbox_ventanilla_elect_msj_grid').parent().parent().width();
            $('#ventanilla_elect_msj_grid').setGridWidth(gridParentNotif);
        },
        ondblClickRow: function (rowid) {
            leerMsj(rowid,'MSJ');
        }
    })
        .navGrid('#ventanilla_elect_msj_grid_pager', {add: false, edit: false, del: false}, //options
            {}, //edit
            {}, //alta
            {}, //del
            {} //search
        );

    $('#tabs a').on('click', function (e) {
        e.preventDefault();
        $(this).tab('show');
        if (grid = $('.ui-jqgrid-btable:visible')) {
             grid.each(function(index) {
                 gridId = $(this).attr('id');
                 gridParentWidth = $('#gbox_' + gridId).parent().parent().width();
                 $('#' + gridId).setGridWidth(gridParentWidth);
             });
        }
    });

    if(p_c_tipo_msj == 'MSJ'){
        $('#tab_msj').click();
    }else if(p_c_tipo_msj == 'NOTIF'){
        $('#tab_notif').click();
    }
});
