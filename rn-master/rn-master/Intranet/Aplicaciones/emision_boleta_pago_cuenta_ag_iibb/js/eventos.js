function init_eventos(){
    $('#lupa_d_objeto_hecho').hide();
    $('#lupa_d_denominacion').hide();

    $('#objeto').on('keydown focusout', function (event) {
        if(!$('#n_cuit').val()){
            if (event.type === 'keydown' && $(this).val().length >= 2) {
                $('#lupa_d_objeto_hecho').show().css('display', 'table-cell');
                $('#mascara_lupa_obj_hecho').hide();
            } else if (event.type === 'keydown') {
                $('#lupa_d_objeto_hecho').hide();
                $('#mascara_lupa_obj_hecho').show().css('display', 'table-cell');
            } else if (event.type === 'focusout' && $(this).val().length <= 2) {
                $('#lupa_d_objeto_hecho').hide();
                $('#mascara_lupa_obj_hecho').show().css('display', 'table-cell');
            }
        }
    });

    $('#d_denominacion').on('keydown focusout', function (event) {
        if (event.type === 'keydown' && $(this).val().length >= 4) {
            $('#lupa_d_denominacion').show().css('display', 'table-cell');
            $('#mascara_lupa_d_denominacion').hide();
        } else if (event.type === 'keydown') {
            $('#lupa_d_denominacion').hide();
            $('#mascara_lupa_d_denominacion').show().css('display', 'table-cell');
        } else if (event.type === 'focusout' && $(this).val().length <= 4) {
            $('#lupa_d_denominacion').hide();
            $('#mascara_lupa_d_denominacion').show().css('display', 'table-cell'); 
        }
    });

    $("#f_inicio").attr('readonly',true);


    $("#div_detalle").hide();

    $(".mascara_importe").keydown(function(event){
        return controla_number(event, this,2);
    });

    $("#n_cuit").mask("99-99999999-9");

    $('#f_inicio').datepicker('setDate',null);

    $("#btn_consultar").click(function(){
        if(($('#n_cuit').val() && $('#c_tributo').val()) || ($('#objeto').val() && $('#c_tributo').val()) || ($('#n_cuit').val() && $('#objeto').val()) || $('#n_cuit').val()){
            
            $.ajax({
                type:'POST',
                url: FUNCIONES_BASEPATH+'maestro_abm.php',
                data:{     
                 "p_n_cuit":limpia_cuit($("#n_cuit").val()),
                 "p_c_tributo":$("#c_tributo").val(),
                 "p_c_objeto":$("#objeto").val(),
                 "id_menu":11012,
                 "n_orden":0
                },
                dataType:'json',
                success: function( data ) {
                    if(data.resultado == 'OK'){
                        $("#n_cuit").attr('disabled',true);
                        $("#objeto").attr('disabled',true);
                        $("#d_denominacion").attr('readonly',true);
                        $("#f_inicio").attr('readonly',true);
                        $("#c_tributo").attr('readonly',true);
                        /////////////
                     $("#n_cuit").val(data.p_n_cuit_salida);
                     $("#id_contribuyente").val(data.p_id_contribuyente);
                     $("#d_denominacion").val(data.p_d_denominacion);
                     $("#f_inicio").val(data.p_f_inicio);
                     $("#c_tributo").val(data.p_c_tributo_salida);
                     $('#objeto').val(data.p_d_objeto_hecho_salida);
                     //DATOS TRAIDOS
                     $("#c_concepto").val(data.p_c_concepto);
                     $("#d_concepto").val(data.p_d_concepto);
                     $("#n_posicion_fiscal").val(data.p_n_pos_fiscal);
                     $('#n_cuota_anticipo').val(data.p_n_cuota_anticipo);
                     //
                      if(data.p_c_concepto || data.p_n_pos_fiscal || data.p_n_cuota_anticipo){
                        $("#div_detalle").show();
                      }

                      if(data.p_c_tributo_salida == 30){
                        $("#d_tributo").val('AG RETENCION IIBB');
                      }
                      if(data.p_c_tributo_salida == 32){
                        $("#d_tributo").val('AG  RECAUDACION SELLOS');
                      }
                      if(data.p_c_tributo_salida == 40){
                        $("#d_tributo").val('AG PERCEPCION IIBB');
                      }

                    }
                    else{
                        mostrar_cuadro('E', 'Error', data.resultado);
                        return;
                    }
                }
            });
            return;
        }
        mostrar_cuadro('I','Atención','Debe completar los campos: CUIT o Objeto y Tributo, o CUIT y Objeto.');
        return;
    });

    $("#btn_generar_boleta").click(function(){
        if($("#pago_cta").val()){
            let n_importe = $("#pago_cta").val();
            n_importe = n_importe.split('.').join('');
            n_importe = n_importe.split(',').join('.');
            $.ajax({
                type:'POST',
                url: FUNCIONES_BASEPATH+'maestro_abm.php',
                data:{      
                 "p_importe":n_importe,
                 "p_id_contribuyente":$("#id_contribuyente").val(),
                 "p_c_tributo":$("#c_tributo").val(),
                 "p_d_tributo":$("#d_tributo").val(),
                 "p_c_concepto":$("#c_concepto").val(),
                 "p_n_posicion_fiscal":$("#n_posicion_fiscal").val(),
                 "p_n_cuota_anticipo":$('#n_cuota_anticipo').val(),
                 "p_d_objeto_hecho":$('#objeto').val(),
                 "id_menu":11012,
                 "n_orden":3
                },
                dataType:'json',
                success: function( data ) {
                    if(data.resultado == 'OK'){
                        id_session = data.p_id_session;
                        mostrar_cuadro('I', 'Boleta generada', 'Se ha generado la boleta de pago satisfactoriamente');
                    }
                    else{
                        mostrar_cuadro('E', 'Error', data.resultado);
                        return;
                    }
                }
            }); 
        }
         else{
            mostrar_cuadro('I', 'Atención', 'Debe ingresar un importe');
                    return;
         }
    });

    $('#btn_imprimir_boleta').click(function(){
        if(id_session){
            llamar_report('RECAL012_IIBB',
                        'p_id_sesion|' + id_session,
                        'PDF');
                        id_session = null;
        }
        else{
            mostrar_cuadro('I', 'Atención', 'Debe generar primero una boleta de pago');
                    return;
        }
    });

    $('#btn_limpiar').click(function(){
        $("#n_cuit").attr('disabled',false);
        $("#objeto").attr('disabled',false);
        $("#d_denominacion").attr('readonly',false);
        $("#c_tributo").attr('readonly',false);
        //DATOS PERSONALES
        $("#n_cuit").val(null);
        $('#n_cuit_lupa_obj').val(null);
        $("#d_denominacion").val(null);
        $("#id_contribuyente").val(null);
        $("#c_tributo").val(null);
        $("#d_tributo").val(null);
        $("#objeto").val(null);
        $("#f_inicio").val(null);
        //DETALLE
        $("#c_concepto").val(null);
        $("#d_concepto").val(null);
        $("#n_posicion_fiscal").val(null);
        $("#n_cuota_anticipo").val(null);
        $("#pago_cta").val(null);
        //hide div detalle
        $("#div_detalle").hide();

        $('#lupa_d_objeto_hecho').hide();
        $('#mascara_lupa_obj_hecho').show().css('display', 'table-cell');
    });


    $('#n_cuit').change(function(){
        let n_cuit = $('#n_cuit').val()
        if(n_cuit[2] != '-'){
            $('#n_cuit_lupa_obj').val(n_cuit);
        } else{
            $('#n_cuit_lupa_obj').val(n_cuit.replace(/-/g, ''))
        }

        if($('#n_cuit').val()){
            $('#lupa_d_objeto_hecho').show().css('display', 'table-cell');
            $('#mascara_lupa_obj_hecho').hide();
        } else{
            $('#lupa_d_objeto_hecho').hide();
            $('#mascara_lupa_obj_hecho').show().css('display', 'table-cell');
        }
    });

    $('#n_cuit').focusout(function(){
        if ($('#n_cuit').val() != ''){
            try{
                if( limpia_cuit($('#n_cuit').val()).length == 11 ){
                    $.ajax({
                        url: 'ajax_genericos/autocomplete.php',
                        type:"POST",
                        data:{oper:3,term:limpia_cuit($("#n_cuit").val())},
                        async:true,
                        dataType: 'json',
                        success: function(data){
                            if(data){
                                data = data.data_raz[0];
                                $("#d_denominacion").val(data.razon_social);
                                $("#id_contribuyente").val(data.id_contribuyente);
                            }else{
                                $("#d_denominacion").val(null);
                                $("#id_contribuyente").val(null);
                            }
                        }
                    });
                }else{
                    $('#btn_limpiar').click();
                }
            }catch(err){
            }
        }
    });

    $("#lupa_c_tributo").lupa_generica({
        id_lista:v_lista_trib,
        titulos:['Cód. Tributo','Tributo'],
        grid:[  {index:'c_codigo',width:100},
            {index:'d_descrip',width:250}],
        caption:'Lista de Tributos',
        sortname:'d_descrip',
        sortorder:'asc',
        filtros:[''],
        campos:{c_codigo:'c_tributo',d_descrip: 'd_tributo'},
        keyNav:true,
        searchInput: '#c_tributo',
        searchCode: true,
        limpiarCod: true,
        onClose: function(){
        }
    });

    $("#lupa_c_concepto").lupa_generica({
        id_lista:v_lista_concep,
        titulos:['Cód. Concepto','Concepto'],
        grid:[  {index:'c_codigo',width:100},
            {index:'d_descrip',width:250}],
        caption:'Lista de Conceptos',
        sortname:'d_descrip',
        sortorder:'asc',
        filtros:['#c_tributo'],
        filtrosNulos:[false],
        filtrosTitulos:['Tipo Tributo'],
        campos:{c_codigo:'c_concepto',d_descrip:'d_concepto'},
        keyNav:true,
        searchInput: '#c_concepto',
        searchCode: true,
        limpiarCod: true,
        onClose: function(){
        }
    });

    $("#lupa_d_denominacion").lupa_generica({
        id_lista:v_lista_denominacion,
        titulos:[ 'ID Contribuyente', 'CUIT', 'Denominación', 'Cod. Tipo Documento', 'Tipo Documento', 'Nro. Documento', 'F. Alta'],
        grid:[
            {index:'id_contribuyente',width:450, hidden: true},
            {index:'n_cuit',width:100},
            {index:'d_denominacion',width:450},
            {index:'c_tipo_documento',width:100, hidden: true},
            {index:'d_tipo_documento',width:150},
            {index:'n_documento',width:100},
            {index:'f_alta',width:100, hidden: true}
        ],
        caption:'Contribuyentes',
        sortname:'d_denominacion',
        sortorder:'asc',
        filtros:['#d_denominacion'],
        filtrosNulos:[true],
        campos:{
            n_cuit: 'n_cuit',
            d_denominacion:'d_denominacion',
        },
        keyNav:true,
        draggable:true,
        onClose: function(){
            $('#n_cuit_lupa_obj').val(limpia_cuit($('#n_cuit').val()));
            $("#n_cuit").mask("99-99999999-9");
            
            if($('#n_cuit').val()){
                $('#lupa_d_objeto_hecho').show().css('display', 'table-cell');
                $('#mascara_lupa_obj_hecho').hide();
            } else{
                $('#lupa_d_objeto_hecho').hide();
                $('#mascara_lupa_obj_hecho').show().css('display', 'table-cell');
            }
        }
    });


    $("#lupa_d_objeto_hecho").lupa_generica({
        id_lista:v_lista_objeto_hecho,
        titulos:['Objeto / Hecho', 'ID Contribuyente', 'CUIT', 'Contribuyente'],
        grid:[
            {index:'d_objeto_hecho',width:200},
            {index:'id_contribuyente',width:450, hidden: true},
            {index:'n_cuit',width:100},
            {index:'d_denominacion',width:450}
        ],
        caption:'Nros. de Hecho u Objeto',
        sortname:'d_objeto_hecho',
        sortorder:'asc',
        filtros:['#c_tributo','#objeto', id_contribuyente, '#n_cuit_lupa_obj'],
        filtrosNulos:[true, true, true, true],
        campos:{
            d_objeto_hecho: 'objeto',
            d_denominacion:'d_denominacion',
            n_cuit:'n_cuit'
        },
        keyNav:true,
        draggable:true,
        onClose: function(){
            $("#n_cuit").mask("99-99999999-9");
        }
    });

}

function validarLetras(input) {
	let valor = input.value;
	valor = valor.replace(/[^a-zA-Z\s]/g, '');
	input.value = valor;
}