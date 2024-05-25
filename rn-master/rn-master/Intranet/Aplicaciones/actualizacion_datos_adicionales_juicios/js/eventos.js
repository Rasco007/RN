function init_eventos(){
    $('.datepicker').datepicker({
        dateFormat:'dd/mm/yy',
        changeMonth:true,
        changeYear:true,
        dayNamesMin:['D', 'L', 'M', 'M', 'J', 'V', 'S'],
        monthNamesShort: ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'],
        monthNames: ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre']
    }).mask("99/99/9999");

    $('#mascara_lupa_representante').hide();
    $('#mascara_lupa_patrocinante').hide();
    $('#btn_update').attr('disabled',true);

    $('#lupa_representante').lupa_generica({
        titulos:['CUIT','Representante','Teléfono','E-mail'],
        grid:[{index:'N_CUIT',width:100},
            {index:'D_DENOMINACION',width:300},
            {index:'N_TELEFONO',width:165},
            {index:'D_MAIL',width:300}],
        caption:'Lista de Representantes Fiscales',
        filtros:['#cuit_repres_fiscal'],
        filtrosNulos:[true],
        campos:{N_CUIT:'cuit_repres_fiscal', D_DENOMINACION:'deno_repres_fiscal',N_TELEFONO:'tel', D_MAIL:'mail'},
        id_lista:v_lista_repre,
        keyNav:true,
        searchInput: '#cuit_repres_fiscal',
        searchCode: false,
        width:1000,
        exactField: 'N_CUIT',
        onClose: function(){
        }
    });

    $('#lupa_patrocinante').lupa_generica({
        titulos:['CUIT','Representante','Teléfono','E-mail'],
        grid:[{index:'N_CUIT',width:100},
            {index:'D_DENOMINACION',width:300},
            {index:'N_TELEFONO',width:165},
            {index:'D_MAIL',width:300}],
        caption:'Lista de Patrocinantes',
        filtros:['#cuit_patrocinante'],
        filtrosNulos:[true],
        campos:{N_CUIT:'cuit_patrocinante', D_DENOMINACION:'deno_patrocinante'},
        id_lista:v_lista_patro,
        keyNav:true,
        searchInput: '#cuit_patrocinante',
        searchCode: false,
        width:1000,
        exactField: 'N_CUIT',
        onClose: function(){
        }
    });

    $("#btn_consultar").click(function(){

        if($("#boleta_deuda").val() == ''){
            mostrar_cuadro('E', 'Error', 'Debe ingresar una Boleta de Deuda');
            return;
        }

        $.ajax({
            type:'POST',
            url: FUNCIONES_BASEPATH+'maestro_abm.php',
            data:{      
             "p_id_boleta_deuda":$("#boleta_deuda").val(),
             "id_menu":v_id_menu,
             "n_orden":0
            },
            dataType:'json',
            success: function( data ) {
                if(data.resultado === 'OK'){
                    $("#d_denominacion").val(data.p_d_contribuyente);
                    $("#c_expediente_judicial").val(data.p_c_expediente_jud);
                    $("#c_expediente_adm").val(data.p_c_expediente_adm);
                    $("#cuit_repres_fiscal").val(data.p_n_cuit_representante_fiscal).blur();
                    $("#deno_repres_fiscal").val(data.p_d_denominacion_repre_fiscal);
                    $("#cuit_patrocinante").val(data.p_n_cuit_patrocinante).blur();
                    $("#deno_patrocinante").val(data.p_d_patrocinante);
                    $("#juzgado").val(data.p_d_juzgado);
                    $("#circunscripcion").val(data.p_d_circunscripcion);
                    $("#f_embargo").val(data.p_f_embargo);
                    $("#f_subasta").val(data.p_f_subasta);
                    $("#mail").val(data.p_email);
                    $("#tel").val(data.p_telefono);
                    $("#f_resolucion").val(data.p_f_resolucion);
                    $("#resolucion").val(data.p_d_resolucion);
                    $("#observaciones_anulacion").val(data.p_d_observ);

                    $('#btn_update').attr('disabled',false);
                    $('#btn_consultar').attr('disabled',true);
                    $('#boleta_deuda').attr('disabled',true);
                }
                else{
                    mostrar_cuadro('E', 'Error', data.resultado);
                }
            }
        });
    });

    $("#btn_update").click(function(){
        $.ajax({
            type:'POST',
            url: FUNCIONES_BASEPATH+'maestro_abm.php',
            data:{      
             "p_c_expediente_adm":limpia_expediente_adm($("#c_expediente_adm").val()),
             "p_id_boleta_deuda":$("#boleta_deuda").val(),
             "p_f_resolucion":$("#f_resolucion").val(),
             "p_d_resolucion":$("#resolucion").val(),
             "p_d_observ":$("#observaciones_anulacion").val(),
             "p_f_subasta":$("#f_subasta").val(),
             "p_n_cuit_patrocinante":$("#cuit_patrocinante").val(),
             "p_d_juzgado":$("#juzgado").val(),
             "p_d_circunscripcion":$("#circunscripcion").val(),
             "p_n_cuit_representante_fiscal":$("#cuit_repres_fiscal").val(),
             "p_c_expediente_jud":$("#c_expediente_judicial").val(),
             "p_f_embargo":$("#f_embargo").val(),
             "id_menu":v_id_menu,
             "n_orden":1
            },
            dataType:'json',
            success: function( data ) {
                if(data.resultado == 'OK'){
                    mostrar_cuadro('S', data.resultado,'Se ha registrado el alta/modificación');
                    $('#btn_limpiar').click();
                    return;
                }
                else{
                    mostrar_cuadro('E', 'Error', data.resultado);
                    return;
                }
            }
        }); 
    });

    $("#btn_limpiar").click(function(){
        $("#boleta_deuda").val('');
        $("#d_denominacion").val('');
        $("#c_expediente_judicial").val('');
        $("#c_expediente_adm").val('');
        $("#cuit_repres_fiscal").val('');
        $("#deno_repres_fiscal").val('');
        $("#cuit_patrocinante").val('');
        $("#deno_patrocinante").val('');
        $("#juzgado").val('');
        $("#circunscripcion").val('');
        $("#f_embargo").val('');
        $("#f_subasta").val('');
        $("#mail").val('');
        $("#tel").val('');
        $("#f_resolucion").val('');
        $("#resolucion").val('');
        $("#observaciones_anulacion").val('');

        $('#btn_update').attr('disabled',true);
        $('#btn_consultar').attr('disabled',false);
        $('#boleta_deuda').attr('disabled',false);

    });
}

function limpia_expediente_adm(c_expediente_adm){
    var result;
    result=c_expediente_adm.replace(/-/g,'');
    return result;
}/* QUITA LA MASCARA */