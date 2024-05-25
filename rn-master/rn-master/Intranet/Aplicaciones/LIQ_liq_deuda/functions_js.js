$(".mascara_numero").each(function () {
    var events = $._data(this, 'events');
    if (events && events['keydown']) return;
    $(this).keydown(function (event) {
        if ($(this).prop('readonly')) return;
        return controla_number(event, this, 999);
    });
}).css('text-align', 'right');

function buscar_contribuyente(){
    if($("#n_cuit").val() != ''){
        $.ajax({
            url: 'auto_ABM/devuelve_deno.php',
            type:"POST",
            data:{"n_cuit":limpia_cuit($("#n_cuit").val())},
            async:false,
            success: function(data){
                ret = eval('('+data+')');
                if(ret != null){
                    if(ret.CUIT_FICTICIO != 'TRUE'){
						$("#d_denominacion").val(ret.D_DENOMINACION);
						$("#id_contribuyente").val(ret.ID_CONTRIBUYENTE);
						$("#n_cuit").val(ret.N_CUIT);
						$("#d_tipo_doc").val(ret.D_TIPO_DOCUMENTO);
						$("#c_tipo_documento").val(ret.C_TIPO_DOCUMENTO);
						$("#n_documento").val(ret.N_DOCUMENTO);
					}else{
						mostrar_cuadro('I','Advertencia','Contribuyente Inválido.');
						$("#d_denominacion").val(null);
						$("#id_contribuyente").val(null);
						$('#n_cuit').val(null);
						$('#n_documento').val(null);
						$('#d_tipo_doc').val(null);
					}	
                }else{
                    $("#d_denominacion").val(null);
                    $("#id_contribuyente").val(null);
                    $('#n_cuit').val(null);
                    $('#n_documento').val(null);
                    $('#d_tipo_doc').val(null);
                    alert('Contribuyente no Encontrado');
                }
//Si cambia el contribuyente limpio los valores
            }
        });
    }
}/* FUNCION QUE RECUPERA DATOS DEL CONTRIBUYENTE */

function fun_formato_numerico(clase,cant_decimal) {
    /*if(clase.val().indexOf(',') != -1 && parse(clase.val()) <= 999){
     //clase.val(limpia_numero(clase.val()));
     clase.val(prepara_number(clase));
     }*/

    if(cant_decimal == null || cant_decimal == ''){
        cant_decimal = 2;
    }
    clase.val(parseFloat(clase.val()).toFixed(cant_decimal));
    prepara_number(clase);
    var v_i_monto = clase.val();
    var v_count = v_i_monto.indexOf(',')+1;
    if (v_count == 0){
        v_count = v_i_monto.length;
        v_i_monto = rpad(v_i_monto.substr(v_count),cant_decimal,'0');
        clase.val(clase.val().substr(0,v_count) + ',' + v_i_monto);
    }else{
        v_i_monto = rpad(v_i_monto.substr(v_count),cant_decimal,'0');
        clase.val(clase.val().substr(0,v_count) + v_i_monto);
    }
}/* AGREGA MASCARA DE NUMERO */

function lpad (str, max, cont) {
    str = str.toString();
    return str.length < max ? lpad(cont + str, max, cont) : str;
}

function rpad (str, max, cont) {
    str = str.toString();
    return str.length < max ? lpad(str + cont, max, cont) : str;
}

function nvl(value1,value2){
    if (value1 == null || value1 == '')
        return value2;
    return value1;
}

function convert_date(date){
    var parts = date.split("/");
    return new Date(parts[2], parts[1] - 1, parts[0]);
}/* CONVIERTE A FORMATO DATE */

function limpia_cuit(cuit){
    var result;
    result=cuit.replace('-','');
    result=result.replace('-','');
    return result;
}/* QUITA LA MASCARA DE CUIT */

function limpia_numero(number){
//var rango;
//if(parse(number) <= 999){/*el valor es menor/mayor a 1000*/
    /*    rango = 'Me';
     }else{
     rango = 'Ma';
     }
     var longh = number.indexOf(',');

     var mascara = 'N';
     if(rango == 'Ma' && number.indexOf('.') != -1){
     mascara = 'S';
     }
     if(rango == 'Me' && number.indexOf(',') != -1){
     mascara = 'S';
     }

     if(mascara == 'S'){*/
    var result;
    result=number.replace(/\./g, '');
    result=result.replace(',','.');
    return result;
    /*}else{
     return number;
     }*/
}/* QUITA LA MASCARA DE NUMERO */

function post_to_principal(){
    var ruta = '[{\"id_menu\":\"0\",\"titulo\":\"Men\\u00fa principal\",\"d_url\":\"principal.php\",\"parametros\":\"[]\"}]';
    post_to_url("principal.php",{ruta:ruta},"","post");
}/* REDIRECCIONAMIENTO A MENU PRINCIPAL */

function post_to_recall(p_c_url,p_n_id_menu,p_m_autoquery,p_others_params){

    if((/*p_c_url != '' ||*/ p_c_url != null) && (/*p_n_id_menu != '' ||*/ p_n_id_menu != null)){
        if(p_m_autoquery == '' || p_m_autoquery == null){
            p_m_autoquery='N';
        }
        var ruta = '[{\"id_menu\":\"0\",\"titulo\":\"Men\\u00fa principal\",\"d_url\":\"principal.php\",\"parametros\":\"[]\"}]';
        var v_params = {p_m_autoquery:p_m_autoquery,ruta:ruta,p_n_id_menu:p_n_id_menu};

        for (var pos in p_others_params){
            v_params[pos] = p_others_params[pos];
        }

        post_to_url(p_c_url,v_params,"","post");
    }else{
        mostrar_cuadro(
            'E',
            'Error en Redirección',
            'Se genero un error al realizar la redirección, no todas las variables han sido asignadas.<br>¿Desea ir al menú principal?',
            function(){post_to_principal();},
            function(){null;}
        );
    }

}/* REDIRECCIONAMIENTO AL ITEM ACTUAL */