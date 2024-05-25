function fun_guarda_archivo(interfaz, id_elemento, n_elemento) {
    if(v_p_modo == 'P'){
        var p_f_acreditacion = null;
        var p_f_pago_trans = null;
    }
    if(v_p_modo == 'T'){
        var p_f_acreditacion = $('#f_acred').val();
        var p_f_pago_trans = $('#f_pago').val();
    }
    $('#main').procOverlay({ visible: true });
    $.ajax({
        type: 'POST',
        url: FUNCIONES_BASEPATH + 'maestro_abm.php',
        data: {
            'p_f_acreditacion': p_f_acreditacion,
            'p_f_pago_trans': p_f_pago_trans,
            'p_path': $('#d_imagen_diag').val(),
            'p_modo': v_p_modo,
            "id_menu": v_id_menu,
            'n_orden': 0
        },
        dataType: 'json',
        success: function (data) {
            if (data.resultado == 'OK') {
                procesar_archivo(interfaz, id_elemento, n_elemento);
            } else {
                mostrar_error(data.resultado);
            }
        }
    });
}

function procesar_archivo(interfaz, id_elemento, n_elemento){
    var d_path = $("#"+id_elemento).val() ;
    proceso = interfaz;
    if(d_path){
        $('#main').procOverlay({visible:true});
        $('#comentarios').val('');
        $('#comentarios').val('Leyendo archivo...');
        $.ajaxFileUpload({
            url:'incorporacion_mov_sucerp/php/levantar_archivo.php?nombre_proceso='+proceso+'&archivo='+n_elemento,
            //url:FUNCIONES_BASEPATH_PROY+'levantar_archivo_siat.php?nombre_proceso='+proceso+'&archivo='+n_elemento,
            secureuri:false,
            fileElementId:id_elemento,
            dataType:'json',
            success: function (data, status) {
                // Intenta evaluar el JSon de la respuesta. Si no lo logra, muestra el resultado como error.
                var resp = eval('('+data+')');
                if (resp.resultado === 'OK'){
                    $('#comentarios').val($('#comentarios').val()+'\n'+'Archivo cargado correctamente');
                    post_procesar_archivo(interfaz, resp.disco);
                } else {
                    mostrar_error('Error linea: 1');
                    $('#comentarios').val($('#comentarios').val()+'\n'+resp.resultado);
                    return;
                }
            },
            error: function (data, status, e) {
                mostrar_cuadro('E','Error','<p style="margin:0;" align="left">Error al subir el archivo<br /><b>Status:</b> '+ status
                    +'<br /><b>Error:</b> '+e+'</p>','','');
            }
        });
    }else{
        $('#main').procOverlay({visible:false});
        mostrar_cuadro('E','Error','Se debe ingresar un archivo para procesar.');
    }
}

function post_procesar_archivo(p_tipo_archivo, p_n_id_disco){
    $('#comentarios').val(null);
    if(v_p_modo == 'P'){
        var p_f_acreditacion = null;
        var p_f_pago_trans = null;
    }
    if(v_p_modo == 'T'){
        var p_f_acreditacion = $('#f_acred').val();
        var p_f_pago_trans = $('#f_pago').val();
    }
    $('#main').procOverlay({visible:true});
    switch(p_tipo_archivo)
    {
        case 'MOVIMIENTOS_SUCERP':
            $.ajax({
                type: "POST",
                url: "interfaces/procesar_archivo_interfaz.php",
                data: {
                    "p_tipo_archivo": p_tipo_archivo,
                    "p_modo":v_p_modo,
                    "p_n_id_disco":p_n_id_disco,
                    "p_path": $('#d_imagen_diag').val(),
                    "p_f_acreditacion": p_f_acreditacion,
                    "p_f_pago_trans": p_f_pago_trans,
                },
                dataType: "json",
                success: function (resp) {
                    $('#main').procOverlay({visible:false});
                    if(resp.resultado !== 'OK'){
                        if(resp.p_hay_errores != null){
                            if(resp.p_hay_errores == "SI"){
                                /*setea_parametros('#rechazos_grid',{'p_nombre_disco':resp.p_nombre_disco});
                                mostrar_mensaje_modal('E','Error','Hay errores en la interface, no se puede procesar el disco, Verifique.', function(){fun_ver_grilla_errores();});*/
                                setea_parametros('#errores_grid',{':p_n_id_disco':p_n_id_disco});
                                mostrar_cuadro('E','Error', 'Error al procesar la Interfaz.');
                                $('#md5_calculado').val(resp.p_CHKSUM_MD5_INFO);
                                $('#md5_informado').val(resp.p_CHKSUM_MD5_INFO);
                                $('#envio').val(resp.p_nro_envio);
                                $('#leidos').val(resp.p_cant_reg_leidos);
                                $('#informados').val(resp.p_cant_reg_inf);
                                $('#c1').val(resp.p_reg_c1);
                                $('#c2').val(resp.p_reg_c2);
                                $('#c3').val(resp.p_reg_c3);
                                $('#c4').val(resp.p_reg_c4);
                                $('#c5').val(resp.p_reg_c5);
                                $('#c6').val(resp.p_reg_c6);
                                $('#c7').val(resp.p_reg_c7);
                                $('#c8').val(resp.p_reg_c8);
                                $('#otros').val(resp.p_reg_otros);
                                $('#comentarios').val(resp.p_txt_resultado);
                                $('#btn_erronea').attr('disabled', false);
                            }
                        }
                    }else{
                        if(resp.p_hay_errores != null) {
                            if (resp.p_hay_errores == "NO") {
                                mostrar_mensaje_modal('I', 'Interfaz Procesada.', 'Archivo Cargado correctamente!');
                                $('#comentarios').val('Proceso finalizado correctamente.');
                                $('#md5_calculado').val(resp.p_CHKSUM_MD5_CALC);
                                $('#md5_informado').val(resp.p_CHKSUM_MD5_INFO);
                                $('#envio').val(resp.p_nro_envio);
                                $('#leidos').val(resp.p_cant_reg_leidos);
                                $('#informados').val(resp.p_cant_reg_inf);
                                $('#c1').val(resp.p_reg_c1);
                                $('#c2').val(resp.p_reg_c2);
                                $('#c3').val(resp.p_reg_c3);
                                $('#c4').val(resp.p_reg_c4);
                                $('#c5').val(resp.p_reg_c5);
                                $('#c6').val(resp.p_reg_c6);
                                $('#c7').val(resp.p_reg_c7);
                                $('#c8').val(resp.p_reg_c8);
                                $('#otros').val(resp.p_reg_otros);
                            }
                        }
                    }
                },
                error: function (data, status, e) {
                    mostrar_cuadro('E','Error','Error al procesar el archivo'+ status +'<br /><b>Error:</b> '+e+'</p>','','');
                }
            });
            break;
        default:
            $('#main').procOverlay({visible:false});
            mostrar_cuadro('E','Error', 'La Interfaz no está preparada para recibir el proceso.');
            break;
    }
    $('#comentarios').scrollTop($('#comentarios')[0].scrollHeight);//mueve scroll hasta el final
}

function fun_procesar(nro_envio){
    $('#main').procOverlay({ visible: true });
    $.ajax({
        type: 'POST',
        url: FUNCIONES_BASEPATH + 'maestro_abm.php',
        data: {
            'p_nro_envio': nro_envio,
            "id_menu": v_id_menu,
            'n_orden': 1
        },
        dataType: 'json',
        success: function (data) {
            if (data.resultado == 'OK') {
                $('#comentarios').val(data.p_txt_resultado);
                mostrar_cuadro('I','Información','Proceso finalizado --> OK');
            } else {
                $('#comentarios').val(data.p_txt_resultado);
                mostrar_error(data.resultado);
            }
        }
    });
}

function semanadelanio(fecha){
    let consta  =  [2,1,7,6,5,4,3]; 

    if (fecha.match(/\//)){
        fecha   =  fecha.replace(/\//g,"-",fecha);
    };

    fecha  =  fecha.split("-");

    let dia    =  eval(fecha[0]);
    let mes    =  eval(fecha[1]);
    let ano       =  eval(fecha[2]);   
    if (mes!=0) {
        mes--;
    };

    let dia_pri   =  new Date(ano,0,1); 
    dia_pri   =  dia_pri.getDay();
    dia_pri   =  eval(consta[dia_pri]);
    let tiempo0   =  new Date(ano,0,dia_pri);
    dia       =  (dia+dia_pri);
    let tiempo1   =  new Date(ano,mes,dia);
    let lapso     =  (tiempo1 - tiempo0)
    let semanas   =  Math.floor(lapso/1000/60/60/24/7);

    if (dia_pri == 1) {
        semanas++;
    };

    if (semanas == 0) {
        semanas=52;
        ano--;
    };

    if (ano < 10) {
        ano = '0'+ano;
    };

    return `${ano}${semanas}`;
};