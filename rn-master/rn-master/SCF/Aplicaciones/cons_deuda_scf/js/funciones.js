function sumarTotales(obj,all) {
    let suma_c = 0;
    let suma_i = 0;
    let suma_s = 0;
    if (!all){
        let posicion = obj.id.split('_')[1];
        if (obj.checked){
            suma_c = parse($("#table_total_c").text(),2)+parse($("#c_"+posicion).text(),2);
            suma_i = parse($("#table_total_i").text(),2)+parse($("#i_"+posicion).text(),2);
            suma_s = parse($("#table_total_s").text(),2)+parse($("#s_"+posicion).text(),2);
        }else {
            suma_c = parse($("#table_total_c").text(),2)-parse($("#c_"+posicion).text(),2);
            suma_i = parse($("#table_total_i").text(),2)-parse($("#i_"+posicion).text(),2);
            suma_s = parse($("#table_total_s").text(),2)-parse($("#s_"+posicion).text(),2);
        }
        $("#table_total_c").text(redondear(suma_c,2));
        $("#table_total_i").text(redondear(suma_i,2));
        $("#table_total_s").text(redondear(suma_s,2));
    }else{
        let posicion = 0;
        if (obj.checked){
            $('#table_body :input:checkbox').prop('checked',true).each(function () {
                suma_c += parse($("#c_"+posicion).text(),2);
                suma_i += parse($("#i_"+posicion).text(),2);
                suma_s += parse($("#s_"+posicion).text(),2);
                posicion += 1;
            });
            $("#table_total_c").text(redondear(suma_c,2));
            $("#table_total_i").text(redondear(suma_i,2));
            $("#table_total_s").text(redondear(suma_s,2));
        }else {
            $('#table_body :input:checkbox').prop('checked',false);
            $("#table_total_c, #table_total_i, #table_total_s").text(0);
        }
    }
} 

function check_all() {
    $('#chkbox_all').click();
}

function recuperaDeuda() {
   
    $('#main').procOverlay({visible:true});
    var n_cuit = $('#n_cuit').val().replace(/-/gi,'');  
    var fecha_act = $('#f_actualizacion').val();
    var d_objeto = $('#d_objeto_hecho').val();
    $.ajax({
        url: "cons_deuda_scf/autocomplete.php",
        type:"POST",
        dataType:"json",
        data:{  p_oper:'getDeuda',
			p_id_menu: v_id_menu,
			p_d_objeto_hecho: d_objeto,
			p_n_cuit: n_cuit,
			p_f_actualizacion:fecha_act,
			p_c_tributo: v_tributo,
            p_token:$("#c_captcha").val()
		},
        success: function(res)
        {
            $('#table_body').empty();
            $('#main').procOverlay({visible:false});
			            
            if (res.resultado == 'OK'){ 
                if (res.mensaje != null){
                    mostrar_mensaje('Información',res.mensaje,null,'601','300');
                }
                $('#frm_consulta :input').attr('disabled',true);
                $('#f_actualizacion').attr('disabled',false);
                $('#btn_limpiar').attr('disabled',false);
                $( "#c_captcha, #img_captcha" ).remove();
                $('label[for=c_captcha]').remove();          
                $('#btn_buscar').hide();
                $('#btn_limpiar').show();
                $('#f_actualizacion').val(res.data[0]['FECHADEACTUALIZACION']);
                id_sesion = res.data[0]['IDSESSION'];
                fun_puebla_tabla_deuda(res.data);                
                $('#emitir_boleta').show();
                $('#div_detalle').show();
            }else {
                mostrar_cuadro('V','Consulta de Deuda',res.error,function () {
                    $('#frm_consulta')[0].reset();
                });
            }
        }
    });
}

function fun_puebla_tabla_deuda(datos){
    var posicion = 0;
    $.each(datos, function(){
        $( '#table_body' ).append(            
            '<tr>'+
            '<td data-title="Descripción Concepto">'+datos[posicion]['CONCEPTODESCRIPCION']+'</td>'+
            '<td data-title="Periodo">'+datos[posicion]['PERIODO']+'</td>'+
            '<td data-title="Fecha Vencimiento" style="text-align: center;">'+datos[posicion]['FECHADEVENCIMIENTO']+'</td>'+
            '<td data-title="Capital" id="c_'+posicion+'" style="text-align: right;">'+redondear(parse(datos[posicion]['CAPITAL']),2)+'</td>'+
            '<td data-title="Interes" id="i_'+posicion+'" style="text-align: right;">'+redondear(parse(datos[posicion]['INTERES']),2)+'</td>'+
            '<td data-title="Saldo" id="s_'+posicion+'" style="text-align: right;">'+redondear(parse(datos[posicion]['CAPITALACTUALIZADO']),2)+'</td>'+
            '<td data-title="Seleccionar" style="text-align: center;">'+'<input type="checkbox" onclick="sumarTotales(this)" value="'+datos[posicion]['LINEA']+'" id="chkbox_'+posicion+'">'+'</td>'+
            '</tr>'
		);
		posicion = posicion + 1;
	});
	
	$( '#table_body' ).append(
		'<tr>'+
		'<td colspan="3" data-title="" style="text-align: right;"><b>Totales Seleccionados</b></td>'+
		'<td data-title="Total Capital" class="totalizador" id="table_total_c" style="text-align: right;">0</td>'+
		'<td data-title="Total Interes" class="totalizador" id="table_total_i" style="text-align: right;">0</td>'+
		'<td data-title="Total Saldo" class="totalizador" id="table_total_s" style="text-align: right;">0</td>'+
		'<td data-title="Seleccionar Todo" id="select_all" style="text-align: right;"><input type="checkbox" id="chkbox_mobile" onclick="check_all()" style="margin: 0"></td>'+
		'</tr>'
	);
}

function pagar_boleta(id_boleta){
    post_to_url('https://appagencia.rionegro.gov.ar/ipe/InicioTramiteIPESCFController.do', {
        'boleta': id_boleta
    }, '_blank');
}