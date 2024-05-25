$(document).ready(function () {

    let v_n_dias_vto;
    let v_c_tipo_dias;
    let v_i_monto_fijo;
    let v_i_monto_fijo_desde;
    let v_i_monto_fijo_hasta;    
    let v_p_descuento_vto; 
    let v_p_descuento_notif;

    //Máscara
    $('#n_cuit').mask('99-99999999-9');
    var ajax_autocomplete = null;

    $(".input_fecha").datepicker({
        changeMonth:true,
        changeYear:true,
        dateFormat:'dd/mm/yy',
        currentText: 'Hoy',
        monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],        
        monthNamesShort: ['Ene','Feb','Mar','Abr', 'May','Jun','Jul','Ago','Sep', 'Oct','Nov','Dic'],
        dayNames: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
        dayNamesShort: ['Dom','Lun','Mar','Mié','Juv','Vie','Sáb'],
        dayNamesMin: ['Do','Lu','Ma','Mi','Ju','Vi','Sá']
    }).mask('99/99/9999').change(function () {
        if ($(this).val().length > 0 && $(this).val().length != 10){
            mostrar_error("El Formato de la Fecha ingresada no es válido.");
            $(this).val(null);
        }
    });

    $('#f_generacion').datepicker( "option", "maxDate", '0' );

    $(".input_fecha").datepicker("option","beforeShowDay",function(date){
        return noWeekendsOrHolidays(date,disabledDays);
    });

    $('#f_emision').datepicker("option","minDate",fecha_hoy);

    $('#f_generacion').change(function () {
        if ($.datepicker.parseDate('dd/mm/yy', $(this).val()) > $.datepicker.parseDate('dd/mm/yy', fecha_hoy)){
            mostrar_error("La fecha de generación ingresada no puede ser mayor a la fecha actual.");
            $(this).val(fecha_hoy);
        }
    });

    $("#lupa_obl").lupa_generica({
        id_lista: 10713,
        titulos:[ 'Concepto','Tributo', 'Pos. Fiscal', 'Objeto', 'C Tipo Imponible', 'C Tributo','Id Obligacion','id_obligacion_desc','orden'],
        grid:[
            {index:'d_concepto',width:130},
            {index:'d_descrip',width:260},
            {index:'n_posicion_fiscal',width:100},
            {index:'d_objeto_hecho',width:100},
            {index:'c_tipo_imponible',width:450, hidden:true},
            {index:'c_tributo',width:450, hidden:true},
            {index:'id_obligacion',width:450, hidden:true},
            {index:'id_obligacion_desc',width:450, hidden:true},
            {index:'orden',width:10, hidden:true}
            ],
        caption:'Lista de Obligaciones',
        sortname:'orden',
        sortorder:'desc',
        filtroNull:false,
        filtros: ['#id_contribuyente','#c_multa'],
        campos:{id_obligacion: 'id_obligacion',id_obligacion_desc:'id_obligacion_desc'},
        keyNav:true,
        onClose:function() {
            recuperarMultasValores();
        },
    });

    //Completamos Datos del Contribuyente
    $("#d_denominacion").autocomplete({
        source: function( request, response ) {

            if (ajax_autocomplete) ajax_autocomplete.abort();
            ajax_autocomplete =
                $.ajax({
                type:'POST',
                url: "liq_multa_art/autocomplete_contrib.php",
                data: {term: request.term},
                dataType: 'json',
                success: function( data ) {
                    ajax_autocomplete = null;
                    if(data) {
                        response(
                            $.map(data.data_contrib, function( item ) {
                                return {
                                    label: item.label,
                                    value: item.razon_social,
                                    cuit: item.cuit,
                                    id_contribuyente: item.id_contribuyente
                                }
                            })
                        );
                    }
                }
            });
        },
        minLength:1,
        select:function(event,ui){
            $("#d_denominacion").val(ui.item.value);
            $("#n_cuit").val(ui.item.cuit);
            $("#id_contribuyente").val(ui.item.id_contribuyente);
            return false;
        }
    });

    $('#n_cuit').change(function (){
        completarDenominacion();
    });

    $('#c_multa').on('changed.bs.select', function (e, clickedIndex, isSelected, previousValue) {
        //Limpiamos
        limpiar_campos_multa();

        console.log('2')

        if ($('#c_multa').val() != '') {
            recuperarMultasValores();
            $('#c_valor').selectpicker('val', '');
            let v_oblig = $('#c_multa').find(':selected').attr('data-oblig');
            if (v_oblig =='S'){
                $('#div_oblig').show();
            }else{
                $('#div_oblig').hide();
                $('#div_oblig input').val('');
            }
        }


    });

    $('#c_valor').on('changed.bs.select', function (e, clickedIndex, isSelected, previousValue) {
        //Si se limpia no se hace nada
        if ($('#c_valor').val() != ''){

            console.log('1')

            getDatosMulta();
        }
    });

    $('#id_inspeccion').on('changed.bs.select', function (e, clickedIndex, isSelected, previousValue) {
        //Si se limpia no se hace nada
        if ($('#id_inspeccion').val() != ''){
            getDatosContribFisca();
            $('#div_oblig').hide();
        }else{
            $('#div_oblig').show();
        }
    });

    $(".mascara_importe").each(function () {
        var events = $._data(this, 'events');
        // if (events && events['keydown']) return;
        $(this).keydown(function (event) {
            if ($(this).prop('readonly')) return;
            return controla_number(event, this, 2);
        });
    }).css('text-align', 'right');

    $('#i_multa').blur(function (){
        if(validarImporte()){     
            if (v_m_automatica == 'S'){
                calcularDescuento();
            }                   
            calcularTotal();
        }
    });

    $('#i_descuento_vto').blur(function (){
        calcularTotal();
    });

    $('#f_generacion').change(function ({}) {
        calcularVencimiento();
        recuperarMultasValores();
    });

    $('#btn_generar').click(function () {
        generarMulta();
    });
    
    $('#modal_emitir_boleta').on('hidden.bs.modal', function (e) {
        limpiar_formulario();
    });
});


