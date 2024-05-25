async function init_eventos(){
    $('#lupa_d_objeto_hecho').hide();
    $("#div_inscripciones_grid").hide();
    $("#div_comercios").hide();
    $("#div_actividades").hide();
    $("#div_jurisdicciones").hide();
    $("#n_cuit").mask("99-99999999-9");
    $('#lupa_d_denominacion').hide();
    $('#f_vig_hasta').attr('disabled', true);

    await obtener_constantes();

    $(".datepicker").datepicker({
        changeMonth:true,
        changeYear:true,
        dateFormat:'dd/mm/yy',
        currentText: 'Hoy',
        monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
        monthNamesShort: ['Ene','Feb','Mar','Abr', 'May','Jun','Jul','Ago','Sep', 'Oct','Nov','Dic'],
        dayNames: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
        dayNamesShort: ['Dom','Lun','Mar','Mié','Juv','Vie','Sáb'],
        dayNamesMin: ['Do','Lu','Ma','Mi','Ju','Vi','Sá'],

        
    }).mask('99/99/9999').change(function () {
        if ($(this).val().length > 0 && $(this).val().length != 10){
            mostrar_error("El Formato de la Fecha ingresada no es válido.");
            $(this).val("");
        }
    });

    $('.numerico').on('input', function() {
        let inputValue = $(this).val();
    
        inputValue = inputValue.replace(/\D/g, '');
    
        $(this).val(inputValue);
      });

    $('#f_vig_hasta').change(function(){
        var id = $("#inscripciones_grid").getGridParam('selrow');
        if (id) {
            let desde = to_date($('#inscripciones_grid').getCell(id, 'f_vig_desde'));
            if((to_date($(this).val()) < desde) || (to_date($(this).val()) > to_date(fecha_hoy))){
                mostrar_error('Debe estar comprendido en un rango de ' + $('#inscripciones_grid').getCell(id, 'f_vig_desde') + ' a ' + fecha_hoy);
                $(this).val("");
            } 
        }else{
            $(this).val("");
        }
    });

    $('#btn_verificar').click(function(){
        var id = $("#inscripciones_grid").getGridParam('selrow');
        if (id) {
            baja(id);
        }else {
            mostrar_validacion('Debe seleccionar una Inscripción de la grilla.');
            return false;
        }
    });

    $('#btn_limpiar').click(function(){
        limpiar();
    });

    $('#btn_imprimir').click(function(){
        imprimir();
    });

    $('#btn_buscar').click(function(){
        if(param_n_cuit  && param_c_tributo){
            $('#n_cuit').val(param_n_cuit);
            $('#c_tributo').val(param_c_tributo);
        }

        if($('#n_cuit').val() || ($('#c_tributo').val() && $('#d_objeto_hecho').val())){
            buscar();
        }else{
            mostrar_error('Debe ingresar Nro de Cuit o (Tributo y Objeto/Hecho)');
        }
    });

    $('#d_objeto_hecho').on('keydown focusout', function (event) {
        if (event.type === 'keydown' && $(this).val().length >= 2) {
            $('#lupa_d_objeto_hecho').show().css('display', 'table-cell');
            $('#mascara_lupa_d_objeto_hecho').hide();
        } else if (event.type === 'keydown') {
            $('#lupa_d_objeto_hecho').hide();
            $('#mascara_lupa_d_objeto_hecho').show().css('display', 'table-cell');
        } else if (event.type === 'focusout' && $(this).val().length <= 2) {
            $('#lupa_d_objeto_hecho').hide();
            $('#mascara_lupa_d_objeto_hecho').show().css('display', 'table-cell');
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

    $("#n_cuit").on('input', function() {
        if($("#n_cuit").val().length > 10){
            var n_cuit = $(this).val().trim();
            $(this).val(n_cuit);
            $(this).mask("99-99999999-9");
        }
    });

    $('#n_cuit').focusout(function(){
        if ($('#n_cuit').val() !== ''){
            if( limpia_cuit($('#n_cuit').val()).length === 11 ){
                autocompleta_contrib_por_cuit();
            }else{
                $('#id_contribuyente').val(null);
                $('#n_cuit').val(null);
                $('#d_denominacion').val(null);
                $('#c_tipo_documento').val(null);
                $('#d_tipo_documento').val(null);
                $('#n_documento').val(null);
            }
        }
    });
}





