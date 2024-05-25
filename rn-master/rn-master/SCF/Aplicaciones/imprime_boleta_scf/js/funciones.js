function fun_puebla_tabla_deuda(datos){
    var posicion = 0;
    $.each(datos, function(){
        $( '#table_body' ).append(
            '<tr>'+
            '<td data-title="Nro. Boleta" style="text-align: right;">'+datos[posicion]['id_boleta']+'</td>'+
            '<td data-title="Partida" style="text-align: right;">'+datos[posicion]['n_partida']+'</td>'+
            '<td data-title="Nomenclatura" style="text-align: left;">'+datos[posicion]['d_nomenclatura']+'</td>'+
            '<td data-title="Regante / Parcela" style="text-align: left;">'+datos[posicion]['n_regante']+'</td>'+
            '<td data-title="F. 1er. Vto." style="text-align: center;">'+datos[posicion]['f_vto_1']+'</td>'+
            '<td data-title="Importe 1er. Vto." style="text-align: right;">'+redondear(parse(datos[posicion]['i_vto_1']),2)+'</td>'+
            '<td data-title="F. 2do. Vto." style="text-align: center;">'+datos[posicion]['f_vto_2']+'</td>'+
            '<td data-title="Importe 2do. Vto." style="text-align: right;">'+redondear(parse(datos[posicion]['i_vto_2']),2)+'</td>'+
            '<td data-title="Botón Imprimir" style="text-align: center;">'+datos[posicion]['btn_imprimir']+'</td>'+
            '</tr>'
		);
		posicion = posicion + 1;
	});
}

function imprimir_boleta_individual(id_boleta){
    $('#main').procOverlay({visible:true});
    $.ajax({
        url: "imprime_boleta_scf/operaciones.php",
        type:"POST",
        dataType:"json",
        data:{
            p_id_menu: v_id_menu,
            p_oper:'boleta_individual',
            p_id_boleta: id_boleta
        },
        success: function(res){
            $('#main').procOverlay({visible:false});
            if (res.resultado == 'OK'){
                v_id_sesion = res.id_sesion;
                v_n_orden = res.n_orden;
                v_id_boleta = res.id_boleta;
                v_nro_envio = res.nro_envio;
                fun_imprimir_reporte(v_id_sesion, v_n_orden, v_id_boleta, v_nro_envio);
            }else{
                if(res.m_imprimir == 'NO'){
                    $("#msj_boleta").html(res.btn_imprimir);
                }else{
                    $("#msj_boleta").html(res.error);
                }
            }
            $("#div_main").show();
        }
    });
}

function imprimir_boleta_grilla(id_contrib){
    $('#main').procOverlay({visible:true});
    $.ajax({
        url: "imprime_boleta_scf/operaciones.php",
        type:"POST",
        dataType:"json",
        data:{
            p_id_menu: v_id_menu,
            p_oper:'boleta_grilla',
            p_id_contrib: id_contrib
        },
        success: function(res){
            $('#main').procOverlay({visible:false});
            if (res.resultado == 'OK'){
                fun_puebla_tabla_deuda(res.grid);
                $("#div_detalle").show();
            }else{
                $("#msj_boleta").html(res.error);
                $("#div_main").show();
            }
        }
    });
}

function fun_imprimir_reporte(id_sesion,n_orden,id_boleta,nro_envio){
    $('#main').procOverlay({visible:true});
    $.ajax({
        url: "imprime_boleta_scf/operaciones.php",
        type:"POST",
        dataType:"json",
        data:{
            p_id_menu: v_id_menu,
            p_oper:'update_descarga',
            p_id_boleta: id_boleta,
            p_nro_envio: nro_envio
        },
        success: function(res){
            $('#main').procOverlay({visible:false});
            llamar_report_ws(v_id_menu,'BOLETA_CANON', 
                'c_usuario|' +
                '&id_sesion|' +id_sesion+
                '&n_orden_desde|' +n_orden+
                '&n_orden_hasta|' +n_orden+
                '&m_todas|' +'N'+
                '&m_todas_sin_mail|' +'N'+
                '&c_organismo|' +
                '&c_region|' +
                '&c_area|',
                'PDF');
        }
    });
}