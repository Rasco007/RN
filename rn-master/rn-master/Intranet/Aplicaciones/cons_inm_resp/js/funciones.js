function completarDenominacion(){
    let cuit_sin_guiones =limpia_cuit($('#n_cuit').val());
    $('#main').procOverlay({visible:true});
    $.ajax({
        url: "cons_inm_resp/php/autocomplete.php",
        type:"POST",
        data:{  p_oper:'getContribuyente',p_filtro: cuit_sin_guiones},
        success: function(response)
        {
            $('#main').procOverlay({visible:false});
            res = JSON.parse(response);
            if (res){
                $("#d_denominacion").val(res['DENOMINACION']);
                $("#id_contribuyente").val(res['ID_CONTRIBUYENTE']);
                $('#c_tipo_documento').val(res['C_TIPO_DOCUMENTO']);
                $('#d_tipo_documento').val(res['D_TIPO_DOCUMENTO']);
                $('#n_documento').val(res['N_DOCUMENTO']);
            }else{
                mostrar_cuadro('I', 'Atención', 'No se han encontrado registros para la consulta realizada.');
                $('#n_cuit').val(null);
                $("#d_denominacion").val(null);
                $("#id_contribuyente").val(null);
            }
        }
    });
}

function fun_ajax_documento(){
    $('#main').procOverlay({visible:true});
    $.ajax({
        url: 'cons_inm_resp/php/autocomplete.php',
        type:"POST",
        data:{
            "p_oper": "getContDoc",
            "c_tipo_documento":$("#c_tipo_documento").val(),
            "n_documento":$("#n_documento").val()
        },
        success: function(data){
            $('#main').procOverlay({visible:false});
            resp = JSON.parse(data);
            if(resp){
                $('#n_cuit').val(resp['N_CUIT']);
                $("#id_contribuyente").val(resp['ID_CONTRIBUYENTE']);
                $("#d_denominacion").val(resp['D_DENOMINACION']);
            }else{
                mostrar_cuadro('I', 'Atención', 'No se han encontrado registros para la consulta realizada.');
                $("#id_contribuyente").val(null);
                $("#n_cuit").val(null);
                $("#d_denominacion").val(null);
                $('#c_tipo_documento').val(null);
                $("#n_documento").val(null);
            }
        }
    });
}

function libreDeuda(objeto,id_resp_act,d_resp_act,cuit_resp_act){
    $.ajax({
        type:'POST',
        url: FUNCIONES_BASEPATH+'maestro_abm.php',
        data:{
            "p_d_nomenclatura":objeto,
            "p_id_resp_act":id_resp_act,
            "p_d_resp_act":d_resp_act,
            "p_cuit_resp_act":cuit_resp_act,
            "id_menu":10964,
            "n_orden":0
        },
        dataType:'json',
        success: function( data ) {
            if(data.resultado == 'OK'){
                llamar_report('CCTEL_020',
                    'p_n_sesion_libre|'+data.p_nsesion_libre,
                    'PDF');
            }
            else{
                mostrar_cuadro('E', 'Error', data.resultado);
                return;
            }
        }
    });
}

function modalInformes( postData, pager_id ){
    postDataInforme = postData;
    $('#dialog_tipo_informe_'+pager_id).modal('show');
    $('#dialog_tipo_informe_'+pager_id+' .bt_excel').hide();
    $('#dialog_tipo_informe_'+pager_id+' .bt_pdf').show();
    $('#dialog_tipo_informe_'+pager_id+' .genera_pdf').hide();
    $('#dialog_tipo_informe_'+pager_id+' .content_list_pdf').hide();
    $('#dialog_tipo_informe_'+pager_id+' .cancelar_pdf').hide();
    $('#dialog_tipo_informe_'+pager_id+' .add_comentario').hide();
    $('#dialog_tipo_informe_'+pager_id+' .orientacion').hide();
    $('#dialog_tipo_informe_'+pager_id+' .enlaces').hide();
    $('#dialog_tipo_informe_'+pager_id+' .lbl_orientacion').hide();
    $('#dialog_tipo_informe_'+pager_id+' .txt_comentario_informe').hide().val(null);
    $('#dialog_tipo_informe_'+pager_id+' .list_pdf').html('');
}

function config_modalInformes(tmp_pager_id, grid_id){
    $('#dialog_tipo_informe_'+tmp_pager_id+' .bt_excel').show();
    $('#dialog_tipo_informe_'+tmp_pager_id+' .bt_pdf').hide();
    $('#dialog_tipo_informe_'+tmp_pager_id+' .orientacion').show();
    $('#dialog_tipo_informe_'+tmp_pager_id+' .enlaces').show();
    $('#dialog_tipo_informe_'+tmp_pager_id+' .lbl_orientacion').show();
    $('#dialog_tipo_informe_'+tmp_pager_id+' .genera_pdf').show();
    $('#dialog_tipo_informe_'+tmp_pager_id+' .content_list_pdf').show();
    $('#dialog_tipo_informe_'+tmp_pager_id+' .cancelar_pdf').show();
    $('#dialog_tipo_informe_'+tmp_pager_id+' .add_comentario').show();

    var id_ar = new Array();

    var a = $("#"+grid_id).jqGrid("getGridParam", "colModel");

    var i = 0;
    var tipos_a_no_exportar = ['HTML'];
    $('#gview_'+grid_id+' [role=columnheader]').each(function(){
        console.log($(this)[0].id);
        if( $(this)[0].id.includes('_inf') && (!$(this).parents('.ui-search-toolbar').length)){
            if (!tipos_a_no_exportar.includes(a[i].frmwktype)){
                var v_id = $(this).attr('id').replace(grid_id+'_','');
                v_id = v_id.replace('jqgh_', ''); //nuevo de jqgrid
                if(a[i].formoptions != undefined){
                    var v_label = a[i].formoptions.label.replace('(*)','').replace(/<br>/g,' ').replace(/<br\/>/g,' ');
                    id_ar.push({id:v_id, label:v_label });
                }
            }
        }
        i++;
    });
    //console.log(id_ar);
    var mitad_lista = parseInt(id_ar.length/2);
    var html_list = '<div class="col-md-6"><ul class="list_pdf list-group">';
    for(i=0; i<id_ar.length; i++){
        //alert(id_ar[i]['id']);
        html_list += '<li class="list-group-item"><span class="badge">'+(i+1)+'</span><input id="chk_'+grid_id+'_'+id_ar[i]['id']+'" class="col_imprimir" columna="'+id_ar[i]['id']+'" type="checkbox" checked="checked" /><label for="chk_'+grid_id+'_'+id_ar[i]['id']+'">'+id_ar[i]['label']+'</label></li>';
        if((i+1) == mitad_lista){
            html_list += '</ul></div><div class="col-md-6"><ul class="list_pdf list-group">';
        }
    }
    html_list += '</ul></div>';
    $('#dialog_tipo_informe_'+tmp_pager_id+' .content_list_pdf').html(html_list);
}