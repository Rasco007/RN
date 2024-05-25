function calcular_totales(id_sesion){
    $.ajax({                     
        url: "emision_boletas_pago_agrupadas_con_juicio/php/funciones.php",                     
        type:"POST",                     
        dataType: "JSON",                     
        data:{ p_id_sesion: id_sesion,
                p_oper : 'getTotales'
        },                     
        success: function (res) {                         
            $('#tot_importe').val(res.TOT_IMPORTE || "");
            $('#tot_interes').val(res.TOT_INTERES || "");                                           
            $('#tot_actualiza').val(res.TOT_ACTUALIZADO || "");
        }                 
    });
}

function set_monto_tasa_980(){
    $.ajax({                     
        url: "emision_boletas_pago_agrupadas_con_juicio/php/funciones.php",                     
        type:"POST",                     
        dataType: "JSON",                     
        data:{ p_oper : 'getTasa980'},                     
        success: function (res) {                         
            v_monto_tasa_980 = res.MONTO_TASA_980;
        }                 
    });
}

function set_const_dias_futuro(){
    $.ajax({                     
        url: "emision_boletas_pago_agrupadas_con_juicio/php/funciones.php",                     
        type:"POST",                     
        dataType: "JSON",                     
        data:{ p_oper : 'getConstDiasF'},                     
        success: function (res) {                         
            v_dias_futuro = res.DIAS_FUTURO;
        }                 
    });
}

function checkeos_deuda(rows){

    rows.forEach((row) => {
        let c_concepto = $("#detalle_deuda_grid").getCell(row.id,'c_concepto');
        let checkbox = $("#detalle_deuda_grid").getCell(row.id,'checkbox');
        let pagar_ficticio = $("#detalle_deuda_grid").getCell(row.id,'i_pagar') || 0;
        let i_actual = $("#detalle_deuda_grid").getCell(row.id,'i_actual');
        let c_tributo = $("#c_tributo").val();
        let error_checkbox = $("#detalle_deuda_grid").getCell(row.id,'error_dj');

        if(c_concepto == 980){ 
            checkbox.checked= true;
            pagar_ficticio  = i_actual;
            selecciono_980  = 'S';    
        }
        if (pagar_ficticio > 0 || c_concepto == 980){
            checkbox.checked= true;
        
            if (c_concepto != 980){
                cant_marcadas = cant_marcadas + 1;
            }
        
        }else {
            checkbox.checked= false;
        }
        if ((c_tributo == 10 || c_tributo == 20) && error_checkbox.checked == true ){
            tiene_dj_error = 'S';
        }
    }); 
}

function disable_btns(){
    let tipo_oper = $("#tipo_oper").find(":selected").val();
    if (tipo_oper == 'J'){
     	 selecciono_980   = 'N';
         $('#btn_marcar_todas').prop('disabled',true);
    }else{
        $('#btn_marcar_todas').prop('disabled',false);
    }
    
    if (tipo_oper == 'J' ||  tipo_oper == 'D' || tipo_oper == 'F'){
        $('#expediente').show();
        $('#label_expediente').show();
        $('#expediente').prop('disabled',false);
     }else{
        $('#expediente').hide();
        $('#label_expediente').hide();
        $('#expediente').prop('disabled',true);
    }
    $("#pos_fiscal_desde").prop('disabled',true);
    $("#pos_fiscal_hasta").prop('disabled',true);
    $("#c_concepto").prop('disabled',true);
    //$("#tipo_oper").prop('disabled',true);
}

function alertas_deuda(rta){
    $.ajax({
        type:'POST',
        url: FUNCIONES_BASEPATH+'maestro_abm.php',
        data:{        
         "p_objeto_hecho":$("#d_objeto_hecho").val(),
         "p_tributo":$("#c_tributo").val(),
         "p_tipo_oper":$("#tipo_oper").find(":selected").val(),
         "id_menu":v_id_menu,
         "n_orden":2
        },
        dataType:'json',
        success: function( data ) {
            if(data.resultado == 'OK'){
                let mensaje = "";

                if( rta == 'OK-CQC'){
                    mostrar_cuadro('E', '** ATENCION ** ','Existen obligaciones en Concurso Quiebra.');
                }

                if( ($("#c_tributo").val() == 10 || $("#c_tributo").val() == 20) && tiene_dj_error == 'S'){
                    mensaje = 'Los anticipos marcados con un tilde en la columna central : ERROR DJ \n contienen posibles errores en la DDJJ.';
                }

                if(tiene_inspeccion == 'S'){
                    mensaje = mensaje + ' Las cuotas en AZUL se encuentran bajo inspección.';
                }

                if( mensaje != ""){
                    mostrar_cuadro('I', '** ATENCION ** ', mensaje);
                }
            }
            else{
                if(data.resultado == '** ATENCION ** \nExisten obligaciones en Gestión Judicial.'){
                    mostrar_cuadro('I', 'Información', data.resultado);
                    return;
                }
                mostrar_cuadro('E', 'Error', data.resultado);
                return;
            }
        }
    });        
}

function setear_ids(){
    $(".checkbox").each((index, box) => {
        box.setAttribute('id', 'checkbox_' + box.closest('tr').id);
        let id_row = box.closest('tr').id;
        let sel = $('#detalle_deuda_grid').getCell(id_row,'sel');
        if(sel == 'S'){
            box.setAttribute('checked', true);
        }
    });

    $(".i_pagar").each((index, input) => {
        input.setAttribute('id', 'i_pagar_' + input.closest('tr').id);
    });
}

function getCheckboxNumber(checkboxId) {
    const match = checkboxId.match(/\d+/);
    return match ? parseInt(match[0]) : null;
  }

function setear_evento_checkboxes(){
    $('.checkbox').change(function(id){
        let checkbox = id.currentTarget;
        let id_row = getCheckboxNumber(checkbox.id);
        let concepto = $('#detalle_deuda_grid').getCell(id_row,'c_concepto');
        let i_pagar_ficticio = $('#i_pagar_' + id_row);
        let i_actual_formato_num = $('#detalle_deuda_grid').getCell(id_row,'i_actual_formato_num');
        let tipo_oper = $("#tipo_oper").find(":selected").val();
        let linea = $('#detalle_deuda_grid').getCell(id_row,'linea');

            if (concepto == 980 && tipo_oper != 'T' && tipo_oper != 'V' && tipo_oper != 'B'){ 

                checkbox.checked = true;
                mostrar_cuadro('E', '** ATENCION ** ','No puede desmarcar la tasa de liquidación!!');
                return;           
            }
            if (concepto == 980 ){
                selecciono_980 = checkbox.checked ? 'S' : 'N';
            }	

            if (!checkbox.checked &&  (cant_marcadas > 0 || concepto == 980)){
            
                if (cant_marcadas > 0 && concepto != 980){
                    cant_marcadas -= 1;
                } 
                
                i_pagar_ficticio.val(null);

                if (cuota_parcial == linea){
                    distribuir = 'N';  
                    cuota_parcial = 0;
                }

                if (cuota_parcial > 0 && cuota_parcial > linea){ 
                    distribuir = 'S';
                }
            
            }

            if (checkbox.checked){            
                if(concepto != 980){                                
                    if(tipo_oper == 'J' && cant_marcadas > 0){
                        
                        checkbox.checked = false;
                        mostrar_cuadro('E', '** ATENCION ** ','Solo puede seleccionar un solo Juicio!!!');
                        return;
                    
                    }else{                        
                        cant_marcadas += 1;                   
                    }
                    
                } 
            
                i_pagar_ficticio.val(i_actual_formato_num);
                if (cuota_parcial > 0){
                    
                    if (cuota_parcial < linea){
                        distribuir = 'S';
                    }                    
                }
            }
            actualizar_total_y_restante();
    });
}

function actualizar_total_y_restante(){
    $('#tot_pagar').val('0,00');
    let v_cant = 0;
    $('.checkbox:checkbox:checked').each((index, checkbox) => {
        v_cant += 1;
        let id_row = getCheckboxNumber(checkbox.id);
        let total = $('#tot_pagar').val().replace(/\./g, '').replace(',', '.');
        let i_pagar_ficticio = $('#i_pagar_' + id_row).val().replace(/\./g, '').replace(',', '.');

        total = Number(total) + Number(i_pagar_ficticio); 
        $('#tot_pagar').val(total.toLocaleString('es-AR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }));
    });
    cant_marcadas = v_cant;
    let total_final = $('#tot_pagar').val().replace(/\./g, '').replace(',', '.');
    let dinero_pagar = $('#dinero_pagar').val().replace(/\./g, '').replace(',', '.');
    let rest = dinero_pagar - total_final
    $('#restante').val(rest.toLocaleString('es-AR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }));
    color_imp_restante();
}

function color_imp_restante(){
    let restante = $('#restante').val().replace(/\./g, '').replace(',', '.');
    if (Number(restante) >= 0){
        $('#restante').removeClass('restante_zero');
        $('#restante').removeClass('restante_menor');
        $('#restante').addClass('restante_mayor');
    }else if (Number(restante) < 0){
        $('#restante').removeClass('restante_mayor');
        $('#restante').removeClass('restante_zero');
        $('#restante').addClass('restante_menor');
    }
}

function validar_dinero_pagar(input){
    let para_pagar = input.val().replace(/\./g, '').replace(',', '.');
        if(para_pagar == null ){
            input.val('0,00');
            para_pagar = 0;
        }

        if(para_pagar > v_monto_tasa_980  && para_pagar != $('#tot_pagar').val().replace(/\./g, '').replace(',', '.') ){ 
            distribuir = 'S';
        }

        if(para_pagar < 0  ){
            para_pagar = para_pagar * -1 
            input.val(para_pagar);
        }

        if(para_pagar == 0 ){
        
            if(cuota_parcial != 0 ){
                distribuir = 'S';
            }else{
                distribuir = 'N';
            }
        }
}

function evento_dinero_para_pagar(){
    $('#dinero_pagar').mask('000.000.000.000.000,00', {reverse: true});

    $('#dinero_pagar').focusout(function(){
        validar_dinero_pagar($(this));
      });
}

function distribuir_dinero(){
    let para_pagar = $('#dinero_pagar').val().replace(/\./g, '').replace(',', '.') || 0;
    let v_tasa_980;
    let v_corregir;
    let v_saldo;
    let v_cant;
    let v_distribuir;

    if(selecciono_980 == 'S'){
 	    v_tasa_980 = v_monto_tasa_980;
    }else{
 	    v_tasa_980 = 0;
    }
 
    if ((para_pagar <  v_tasa_980 + 1) && cuota_parcial == 0){
        mostrar_cuadro('I', 'Advertencia', 'Debe ingresar un importe mayor que '+ v_tasa_980+'$\n en el campo --> DINERO PARA PAGAR');
        return;
    }

    if(cuota_parcial != 0 && para_pagar == 0){
        v_corregir = 100000;
    }else{
        v_corregir = 0;
    }

    v_saldo = (para_pagar - v_tasa_980 ) + v_corregir;

    cuota_parcial  = 0; 
    v_cant = 0;

    $(".checkbox").each((index, checkbox) => {
        let id_row = getCheckboxNumber(checkbox.id);
        let c_concepto = $('#detalle_deuda_grid').getCell(id_row,'c_concepto');
        let i_pagar_ficticio = $('#i_pagar_' + id_row);
        let i_actual = $('#detalle_deuda_grid').getCell(id_row,'i_actual');
        let i_actual_formato_num = $('#detalle_deuda_grid').getCell(id_row,'i_actual_formato_num');
        let linea = $('#detalle_deuda_grid').getCell(id_row,'linea');
        let n_posicion_fiscal = $('#detalle_deuda_grid').getCell(id_row,'n_posicion_fiscal');

        if ((n_posicion_fiscal != null) && c_concepto != 980){
            v_distribuir = true;
            if (cant_marcadas > 0){
                if (checkbox.checked == false){
                    i_pagar_ficticio.val(null);
                    v_distribuir = false;
                }
            }
            if (v_distribuir){
                if (v_saldo <= 0 ){
                
                    if (checkbox.checked == true){
                        v_cant = v_cant - 1;         
                        checkbox.checked = false;
                        //$(checkbox).change();
                    }
                    i_pagar_ficticio.val(null);
                }else{	
                    if (i_actual <= v_saldo){
                        i_pagar_ficticio.val(i_actual_formato_num);
                        v_saldo = v_saldo - i_actual;
                    }else{
                        i_pagar_ficticio.val(v_saldo.toLocaleString('es-AR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }));
                        v_saldo = 0;
                        cuota_parcial = linea;
                    }
                
                    if(checkbox.checked  == false){
                        v_cant = v_cant + 1;         
                        checkbox.checked = true;
                        //$(checkbox).change();
                    }

                }
            }
        }
    });
    cant_marcadas = cant_marcadas + v_cant;
    distribuir = 'N';
    actualizar_total_y_restante();
}

function validar_fechas(modif_f_venc, modif_f_actualiza){
    let tipo_oper = $("#tipo_oper").find(":selected").val();

    if (modif_f_actualiza == ""){
       return ' La fecha de actualizacion no puede quedar vacia.'; 
    }

    if (modif_f_venc == ""){
       return ' La fecha de vencimiento no puede quedar vacia.'; 
    }

    if (to_date(modif_f_venc)  <  to_date(fecha_hoy)){
        return ' La fecha de vencimiento debe ser mayor a la fecha actual !';
    }
   
    if (tipo_oper != 'J' && tipo_oper != 'T' && tipo_oper != 'B' && tipo_oper != 'D' && tipo_oper !='F' && tipo_oper != 'V'){
        if (modif_f_actualiza != modif_f_venc){
            $('#modif_f_actualiza').val(modif_f_venc);

            //return 'Para este tipo de operacion la fecha de actualización '+ 
              //   'debe coincidir con la fecha de vencimiento.';
              
        }
  
    }else{
        if (to_date(modif_f_venc) < to_date(modif_f_actualiza) ){
            return 'La fecha de actualización no puede superar la de vencimiento !';
        }
    }
    let fecha_fut = fecha_hoy_mas_dias_futuros();
    if (to_date(modif_f_venc) > to_date(fecha_fut) && tipo_oper != 'F' ){

     return 'No puede generar una Boleta por más de '+ v_dias_futuro +' días';

    }

    if ( to_date(modif_f_venc) > to_date(fecha_hoy)  &&  tipo_oper  == 'F' ){

    return 'No puede emitir con fecha posterior, para el tipo de liquidacion Fondo Lanero.';

    }
   return 'OK';
}

async function grabar_e_imprimir(pagar){
    actualizar_total_y_restante();
    let total_pagar = $('#tot_pagar').val().replace(/\./g, '').replace(',', '.');
 
    let rta = await guardar_selec_y_act(total_pagar, false);
        if (rta != 'OK'){
            mostrar_cuadro('E', 'Error', rta);
            $('#main').procOverlay({visible:false});
            return;
        }else{
            if (v_emite_agrupada == 'S'){
                $.ajax({
                    type:'POST',
                    url: FUNCIONES_BASEPATH+'maestro_abm.php',
                    data:{     
                    "p_id_sesion":id_sesion,
                    "p_f_venc":$("#f_vencimiento").val(),
                    "p_d_expediente":$("#expediente").val(),
                    "id_menu":v_id_menu,
                    "n_orden":4
                    },
                    dataType:'json',
                    beforeSend: function(xhr, settings){},
                    global: false,
                    complete:function(xhr, settings){},
                    success: function( data ) {
                        if(data.resultado == 'OK'){
                            if (data.p_rta == 'OK'){
                                imprimir_report(data.p_id_sesion_impresion);
                                if(pagar){
                                    pagar_boleta(data.p_id_sesion_impresion);
                                }else{
                                    $('#main').procOverlay({visible:false});
                                }
                            }else{
                                mostrar_cuadro('E', 'Error', data.p_rta);
                                $('#main').procOverlay({visible:false});
                                return;
                            }
                        }else{
                            mostrar_cuadro('E', 'Error', data.resultado);
                            $('#main').procOverlay({visible:false});
                            return;
                        }
                    }
                });    
            }else{
                mostrar_cuadro('E', 'Error', 'NO SE PUEDE IMPRIMIR BOLETAS PUNTUALES!--> VARIABLES.EMITE_AGRUPADA="N"');
                $('#main').procOverlay({visible:false});
                return;
            }
        }
}

function lpad(str, length, padChar) {
    str = String(str); 
    while (str.length < length) {
      str = padChar + str;
    }
    return str;
  }

async function guardar_selec_y_act(p_monto, p_actualiza){

    return new Promise(async (resolve, reject) => {
        let total_pagar = $('#tot_pagar').val().replace(/\./g, '').replace(',', '.');
        let v_sel          =  '';
        let v_cant         = 0;
        let v_oblig        = 0;
        let v_cuotas       = 0.00;
        let v_inter        = 0.00;
        let v_actua        = 0.00;
        let v_pagar        = 0.00;
        let v_factu = null;

        if (cant_marcadas  > 0){   

            $(".checkbox").each((index, checkbox) => {
                let id_row = getCheckboxNumber(checkbox.id);
                let i_pagar_ficticio = $('#i_pagar_' + id_row).val().replace(/\./g, '').replace(',', '.');
                let i_actual = $('#detalle_deuda_grid').getCell(id_row,'i_actual');
                let linea = $('#detalle_deuda_grid').getCell(id_row,'linea');
                let i_vencimiento_1 = $('#detalle_deuda_grid').getCell(id_row,'i_vencimiento_1').replace(/\./g, '').replace(',', '.');
                let i_interes = $('#detalle_deuda_grid').getCell(id_row,'i_interes').replace(/\./g, '').replace(',', '.');
                let id_obligacion = $('#detalle_deuda_grid').getCell(id_row,'id_obligacion');
        
                if (checkbox.checked == true){ 

                    v_sel          = v_sel + '$' + lpad(linea,4,'0');
                    v_cant         = v_cant   + 1;
                    v_oblig        = v_oblig  + Number(id_obligacion);
                    v_cuotas       = v_cuotas + Number(i_vencimiento_1);
                    v_inter        = v_inter  + Number(i_interes);
                    v_actua        = v_actua  + Number(i_actual);
                    v_pagar        = v_pagar  + Number(i_pagar_ficticio);

                    if (v_cant > 950){
                        resolve('ERROR \n Demasiadas obligaciones seleccionadas!!:' + v_cant);
                    }
                }
            });

            v_sel = v_sel + '$';
            let v_pagar_formato = v_pagar.toLocaleString('es-AR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).replace(/\./g, '').replace(',', '.')
            if( v_pagar_formato != total_pagar){
                resolve('ERROR-DIF-PAGAR  \n'+ v_pagar + '-' + total_pagar.toLocaleString('es-AR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }));  
            }
        }
        if (p_actualiza){
            v_factu = $('#modif_f_actualiza').val();
        }else{
            v_factu = null;
        }
        $.ajax({
            type:'POST',
            url: FUNCIONES_BASEPATH+'maestro_abm.php',
            data:{     
            "p_id_sesion":id_sesion,
            "p_sel": v_sel,
            "p_cant": v_cant,
            "p_oblig": v_oblig,
            "p_cuotas": v_cuotas.toLocaleString('es-AR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).replace(/\./g, '').replace(',', '.'),
            "p_inter": v_inter.toLocaleString('es-AR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).replace(/\./g, '').replace(',', '.'),
            "p_actua": v_actua.toLocaleString('es-AR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).replace(/\./g, '').replace(',', '.'),        
            "p_pagar": v_pagar.toLocaleString('es-AR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).replace(/\./g, '').replace(',', '.'),                               
            "p_factu": v_factu,           
            "p_f_venc": $('#modif_f_vencimiento').val(), 
            "p_monto": p_monto,
            "id_menu":v_id_menu,
            "n_orden":3
            },
            dataType:'json',
            beforeSend: function(xhr, settings){},
            global: false,
            complete:function(xhr, settings){},
            success: function( data ) {
                if(data.resultado == 'OK'){
                    if(data.p_factu){
                        $('#f_actualiza').val(data.p_factu);
                        $('#modif_f_actualiza').val(data.p_factu);
                    }
                    if(data.p_f_venc){
                        $('#f_vencimiento').val(data.p_f_venc);
                        $('#modif_f_vencimiento').val(data.p_f_venc);
                    }
                    resolve(data.p_rta);
                }else{
                    resolve(data.resultado);
                }
            },
            error: function(jqXHR, textStatus, errorThrown) {
                reject(errorThrown);
            }
        });
    });  
}

function imprimir_report(id_sesion_impresion){
    let params = 'p_id_sesion|'+ id_sesion_impresion;
    llamar_report('RECAL036', params, 'PDF');
    $('#deuda_modal').modal("hide");
}

function emitir_y_pagar(pagar){
    $('#modif_f_vencimiento').val($('#f_vencimiento').val());
    $('#modif_f_actualiza').val($('#f_actualiza').val());
    if (cant_marcadas == 0){
        $('#main').procOverlay({visible:false});
        mostrar_cuadro('E', 'Error', 'Debe seleccionar las cuotas a emitir!');
        return;      
    }
    if(distribuir == 'S'){

        distribuir_dinero();

        $('#main').procOverlay({visible:false});
        mostrar_cuadro('I', 'Advertencia', 'Se CORRIGIERON los montos a pagar de algunas \n cuotas, de acuerdo al dinero disponible y \n las cuotas seleccionadas.' +
        '\n Controle los montos y pulse EMITIR para \n imprimir la boleta.');
        return;
        
    }
    let restante = $('#restante').val().replace(/\./g, '').replace(',', '.');
    let para_pagar = $('#dinero_pagar').val().replace(/\./g, '').replace(',', '.');
    if(restante < 0 && para_pagar !=  0){

        mostrar_cuadro('Q', 'Pedir Confirmación', 'El dinero ingresado para pagar es menor al \n monto total de la boleta, desea continuar?',
        function () {
            grabar_e_imprimir(pagar);
        },
        function () {
        });
    }else{
        grabar_e_imprimir(pagar);
    }
}

function pagar_boleta(id_sesion_impresion){
    $.ajax({
        type:'POST',
        url: FUNCIONES_BASEPATH+'maestro_abm.php',
        data:{      
         "p_id_sesion_impresion": id_sesion_impresion,
         "id_menu":v_id_menu,
         "n_orden":5
        },
        dataType:'json',
        beforeSend: function(xhr, settings){},
        global: false,
        success: function( data ) {
            if(data.resultado == 'OK'){
                window.open(data.p_url);
            }
            else{
                mostrar_cuadro('E', 'Error', data.resultado);
                return;
            }
        }
    }); 
}

function to_date(fecha){
    var dateParts = fecha.split("/");
    var day = parseInt(dateParts[0], 10);
    var month = parseInt(dateParts[1], 10) - 1; 
    var year = parseInt(dateParts[2], 10);
    var resultDate = new Date(year, month, day);
    return resultDate;
}

function fecha_hoy_mas_dias_futuros(){

    var dateParts = fecha_hoy.split("/");
    var day_hoy = parseInt(dateParts[0], 10);
    var month_hoy = parseInt(dateParts[1], 10) - 1; 
    var year_hoy = parseInt(dateParts[2], 10);
    var inputDate = new Date(year_hoy, month_hoy, day_hoy);
    var resultDate = new Date(inputDate.getTime() + (v_dias_futuro * 24 * 60 * 60 * 1000));

    var day = resultDate.getDate().toString().padStart(2, "0");
    var month = (resultDate.getMonth() + 1).toString().padStart(2, "0");
    var year = resultDate.getFullYear().toString();
    var formattedDate = day + "/" + month + "/" + year;
    return formattedDate;
}

function valida_rta(rta, tipo_oper, modif_f_actualiza, modif_f_venc) {
    if (rta != 'OK'){
        $('#modif_f_vencimiento').val($('#f_vencimiento').val());
        $('#modif_f_actualiza').val($('#f_actualiza').val());
        mostrar_cuadro('E', 'Error', rta);
        return;
    }
    if (tipo_oper  != 'J' && tipo_oper  != 'T' && tipo_oper  != 'B' && tipo_oper  != 'D' && tipo_oper  != 'F' && tipo_oper  != 'V'){
        if (modif_f_actualiza != modif_f_venc){
            $('#modif_f_vencimiento').val($('#modif_f_actualiza').val());
        }
    }
    $('#f_vencimiento').val($('#modif_f_vencimiento').val());
    $('#f_actualiza').val($('#modif_f_actualiza').val());
    $('#modif_f_modal').modal("hide");
}

async function modificar_fechas(){
    let modif_f_venc = $('#modif_f_vencimiento').val();
    let modif_f_actualiza = $('#modif_f_actualiza').val();
    let f_venc = $('#f_vencimiento').val();
    let f_actualiza = $('#f_actualiza').val();
    let para_pagar = $('#dinero_pagar').val().replace(/\./g, '').replace(',', '.') || 0;
    let tipo_oper = $("#tipo_oper").find(":selected").val();

    if (f_actualiza != modif_f_actualiza || f_venc != modif_f_venc){
        let rta = validar_fechas(modif_f_venc, modif_f_actualiza);
        
        if(rta != 'OK'){
            mostrar_cuadro('E', 'Error', rta);
            $('#main').procOverlay({visible:false});
            return;
        }
        actualizar_total_y_restante();
        if (cant_marcadas == 0){
            let rta_2 = await guardar_selec_y_act(0, true);
            valida_rta(rta_2, tipo_oper, modif_f_actualiza, modif_f_venc);
        }else{
            let rta_3 = await guardar_selec_y_act(para_pagar, true);
            valida_rta(rta_3, tipo_oper, modif_f_actualiza, modif_f_venc);
        }                
    }
    else{
        $('#modif_f_modal').modal("hide");
    }
    $( ".datepicker" ).datepicker( "option", "changeMonth", false );
    $( ".datepicker" ).datepicker( "option", "changeYear", false );
    $("#detalle_deuda_grid").trigger('reloadGrid');
    $('#main').procOverlay({visible:false});
}