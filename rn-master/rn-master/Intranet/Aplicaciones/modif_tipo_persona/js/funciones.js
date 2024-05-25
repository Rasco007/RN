function completarDenominacion(){
    let cuit_sin_guiones =limpia_cuit($('#n_cuit').val());
    $('#main').procOverlay({visible:true});
    $.ajax({
        url: "modif_tipo_persona/php/autocomplete.php",
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
                $('#m_persona').val(res['M_PERSONA']);
            }else{
                $('#n_cuit').val(null);
                $("#d_denominacion").val(null);
                $("#id_contribuyente").val(null);
                $('#m_persona').val(null);
            }
        }
    });
}

function fun_ajax_objeto_hecho(){
    $('#main').procOverlay({visible:true});
    $.ajax({
        url: 'modif_tipo_persona/php/autocomplete.php',
        type:"POST",
        data:{"p_oper":4,
            "c_tributo":$("#c_tributo").val(),
            "c_tipo_imponible":$("#c_tipo_imponible").val(),
            "contrib":$("#id_contribuyente").val(),
            "objeto_hecho":($("#d_objeto_hecho").val()).trim()},
        async:false,
        success: function(data){
            $('#main').procOverlay({visible:false});
            resp = JSON.parse(data);
            if(resp){
                $('#n_cuit').val(resp['N_CUIT']);
                $("#id_contribuyente").val(resp['ID_CONTRIBUYENTE']);
                $("#d_denominacion").val(resp['D_DENOMINACION']);
                $('#c_tipo_documento').val(resp['C_TIPO_DOCUMENTO']);
                $('#d_tipo_documento').val(resp['D_TIPO_DOCUMENTO']);
                $('#n_documento').val(resp['N_DOCUMENTO']);
                $('#m_persona').val(resp['M_PERSONA']);
            }else{
                mostrar_cuadro('I', 'Atención', 'No se han encontrado registros para la consulta realizada.');
                $("#n_cuit").val(null);
                $("#id_contribuyente").val(null);
                $("#d_denominacion").val(null);
                $("#d_objeto_hecho").val(null);
                $('#m_persona').val(null);
            }
        }
    });

}

function fun_ajax_documento(){
    $('#main').procOverlay({visible:true});
    $.ajax({
        url: 'modif_tipo_persona/php/autocomplete.php',
        type:"POST",
        data:{
            "p_oper": 5,
            "c_tipo_documento":$("#c_tipo_documento").val(),
            "n_documento":$("#n_documento").val()
        },
        async:true,
        success: function(data){
            resp = JSON.parse(data);
            if(resp){
                $('#n_cuit').val(resp['N_CUIT']);
                $("#id_contribuyente").val(resp['ID_CONTRIBUYENTE']);
                $("#d_denominacion").val(resp['D_DENOMINACION']);
                $('#m_persona').val(resp['M_PERSONA']);
            }else{
                mostrar_cuadro('I', 'Atención', 'No se han encontrado registros para la consulta realizada.');
                $("#id_contribuyente").val(null);
                $("#n_cuit").val(null);
                $("#d_denominacion").val(null);
                $('#c_tipo_documento').val(null);
                $("#n_documento").val(null);
                $('#m_persona').val(null);
            }
        }
    });
}

function get_datos() {
    $('#main').procOverlay({visible:true});
    $.ajax({
        url: "modif_tipo_persona/php/autocomplete.php",
        type:"POST",
        data:{p_oper:'getDatos',p_filtro: tipo_persona,p_id_contribuyente: id_contrib},
        success: function(response)
        {
            $('#main').procOverlay({visible:false});
            resp = JSON.parse(response);
            if (resp){
                $('#frm_consulta :input').attr("disabled",true);
                $('#frm_consulta .btn_lupa').hide();
                $('#btn_constancia').show();
                if (tipo_persona == 'F'){
                    $('#c_nacionalidad').val(resp['C_NACIONALIDAD']);
                    $('#d_tipo_nacionalidad').val(resp['D_NACIONALIDAD']);
                    $('#c_estado_civil').val(resp['C_ESTADO_CIVIL']);
                    $('#d_tipo_estado_civil').val(resp['D_ESTADO_CIVIL']);
                    $('#c_sexo').selectpicker('val',resp['C_SEXO']);
                    $('#f_nacimiento').val(resp['F_NACIMIENTO']);
                    $('#seccion_pj, #gbox_integrantes_grid, #gbox_integrantestmp_grid, #div_btngrabar_pj').hide();
                    $('#frm_per_fisica :input').attr('disabled',true);
                    $('#frm_per_fisica .btn_lupa').hide();
                    $('#seccion_pf, #btn_modif_tp').show();
                } else if (tipo_persona == 'J'){
                    $('#c_tipo_empresa').val(resp['C_TIPO_EMPRESA']);
                    $('#d_tipo_empresa').val(resp['D_TIPO_EMPRESA']);
                    $('#c_forma_juridica').val(resp['C_FORMA_JURIDICA']);
                    $('#d_tipo_forma_juridica').val(resp['D_FORMA_JURIDICA']);
                    $('#n_sucursales').val(resp['N_SUCURSALES']);
                    $('#n_duracion_anios').val(resp['N_DURACION_ANIOS']);
                    $('#n_inscripcion_igj').val(resp['N_INSCRIPCION_IGJ']);
                    $('#f_inscripcion_igj').val(resp['F_INSCRIPCION_IGJ']);
                    $('#f_contrato_social').val(resp['F_CONTRATO_SOCIAL']);
                    $('#seccion_pf, #gbox_integrantestmp_grid').hide();
                    $('#seccion_pj, #btn_modif_tp, #div_btngrabar_pj, #gbox_integrantes_grid').show();
                    setea_parametros('#integrantes_grid',{':id_contribuyente':id_contrib});
                }
                $('#btn_buscar').attr("disabled",true);
            }else{
                mostrar_error("No se han encontrado datos asociados al contribuyente.")
            }
        }
    });
}

function lupas_per_juridica(formid,tmp){
    $('#d_tipo_documento',formid).lupa_generica({
        titulos:['C&oacute;digo','Descripci&oacute;n'],
        grid:[{index:'c_dato',width:100},
            {index:'d_dato',width:350}],
        caption:'Tipos de Documento',
        sortname:'c_dato',
        sortorder:'asc',
        campos:{c_dato:'FrmGrid_integrantes'+tmp+'_grid #c_tipo_documento',d_dato:'FrmGrid_integrantes'+tmp+'_grid #d_tipo_documento'},
        keyNav:true,
        exactField: 'c_dato'
    });

    $('#d_tipo_responsable',formid).lupa_generica({
        titulos:['C&oacute;digo','Descripci&oacute;n'],
        grid:[{index:'c_codigo',width:100},
            {index:'d_descrip',width:350}],
        caption:'Tipo de Responsable',
        sortname:'d_descrip',
        sortorder:'asc',
        campos:{c_codigo:'c_tipo_responsable',d_descrip:'d_tipo_responsable'},
        keyNav:true,
        onClose:function(){
            if ($("#c_tipo_responsable",formid).val() == '3' && $("#n_cuit",formid).val() != ""){
                $("#c_tipo_documento",formid).val('0');
                $("#d_tipo_documento",formid).val('CUIT');
                $("#n_documento",formid).val(limpia_cuit($("#n_cuit",formid).val()));
            }
        }
    });

    $('#d_cargo',formid).lupa_generica({
        titulos:['C&oacute;digo','Descripci&oacute;n'],
        grid:[{index:'c_codigo',width:100},
            {index:'d_descrip',width:350}],
        caption:'Cargo',
        sortname:'d_descrip',
        sortorder:'asc',
        campos:{c_codigo:'c_cargo',d_descrip:'d_cargo'},
        keyNav:true
    });

    $('#d_caracter_firma',formid).lupa_generica({
        titulos:['C&oacute;digo','Descripci&oacute;n'],
        grid:[{index:'c_codigo',width:100},
            {index:'d_descrip',width:350}],
        caption:'Tipo de Caracter de Firma',
        sortname:'d_descrip',
        sortorder:'asc',
        campos:{c_codigo:'c_caracter_firma',d_descrip:'d_caracter_firma'},
        keyNav:true
    });
}

function completa_integrantes(n_cuit,formid) {
    if (n_cuit) {
        $.post("modif_tipo_persona/php/autocomplete.php", {
            "p_oper": "datos_contribuyente",
            "n_cuit": n_cuit
        }, function(data) {
            ret = JSON.parse(data);
            if (ret){
                $('#d_denominacion',formid).val(ret['D_DENOMINACION']);
                $('#c_tipo_documento',formid).val(ret['C_TIPO_DOCUMENTO']);
                $('#d_tipo_documento',formid).val(ret['D_TIPO_DOCUMENTO']);
                $('#n_documento',formid).val(ret['N_DOCUMENTO']);
                $('#c_sexo',formid).val(ret['C_SEXO']);
            }
        });
    }else {
        $('#d_denominacion',formid).val(null);
        $('#c_tipo_documento',formid).val(null);
        $('#d_tipo_documento',formid).val(null);
        $('#n_documento',formid).val(null);
        $('#c_sexo',formid).val(null);
    }
}

function cambiar_a_pfisica(){
    if ($('#frm_per_fisica').validationEngine('validate')){
        $('#main').procOverlay({visible:true});
        $.ajax({
            type:'POST',
            url: FUNCIONES_BASEPATH+'maestro_abm.php',
            data:{
                "p_id_contribuyente":id_contrib,
                "p_c_nacionalidad":$('#c_nacionalidad').val(),
                "p_c_estado_civil":$('#c_estado_civil').val(),
                "p_c_sexo":$('#c_sexo').val(),
                "p_f_nacimiento":$('#f_nacimiento').val(),
                "id_menu":v_id_menu,
                "n_orden":0
            },
            dataType:'json',
            success: function( data ) {
                if(data.resultado == 'OK'){
                    mostrar_confirmacion('La operación se realizó con éxito.');
                    $('#btn_limpiar').click();
                }
                else{
                    mostrar_cuadro('E', 'Error', data.resultado);
                    return;
                }
            }
        });
    }
}

function cambiar_a_pjuridica(oper){
    if ($('#frm_datos_per_juridica').validationEngine('validate')) {
        $('#main').procOverlay({visible:true});
        $.ajax({
            type:'POST',
            url: FUNCIONES_BASEPATH+'maestro_abm.php',
            data:{
                "p_oper":oper,
                "p_id_contribuyente":id_contrib,
                "p_c_tipo_empresa":$('#c_tipo_empresa').val(),
                "p_c_forma_juridica":$('#c_forma_juridica').val(),
                "p_n_sucursales":$('#n_sucursales').val(),
                "p_n_duracion_anios":$('#n_duracion_anios').val(),
                "p_n_inscripcion_igj":$('#n_inscripcion_igj').val(),
                "p_f_inscripcion_igj":$('#f_inscripcion_igj').val(),
                "p_f_contrato_social":$('#f_contrato_social').val(),
                "id_menu":v_id_menu,
                "n_orden":1
            },
            dataType:'json',
            success: function( data ) {
                if(data.resultado == 'OK'){
                    mostrar_confirmacion('La operación se realizó con éxito.');
                    $('#btn_buscar').click();
                }
                else{
                    mostrar_cuadro('E', 'Error', data.resultado);
                    return;
                }
            }
        });
    }
}