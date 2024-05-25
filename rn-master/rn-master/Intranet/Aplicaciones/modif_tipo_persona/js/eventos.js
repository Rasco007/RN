function inicializarEventos() {
    $('#n_cuit').mask('99-99999999-9');
    $("#n_documento").mask("999999999");
    $('.numero').keypress(function (tecla) {
        return (tecla.charCode >= 48 && tecla.charCode <= 57);
    });
    //Completamos Datos del Contribuyente
    $('#n_cuit').change(function (){
        if ($('#n_cuit').val() && $('#n_cuit').val().length == 13){
            completarDenominacion();
        }else{
            $("#d_denominacion").val(null);
            $("#n_cuit").val(null);
            $("#id_contribuyente").val(null);
        }
    });

    $('#n_documento').change(function () {
        if (!$('#id_contribuyente').val() && $('#c_tipo_documento').val() && $('#n_documento').val()){
            fun_ajax_documento();
        }
    });

    $('#d_objeto_hecho').change(function () {
       if (!$('#id_contribuyente').val()){
           fun_ajax_objeto_hecho();
       }
    });

    $("#d_denominacion").autocomplete({
        source: function( request, response ) {

            if (ajax_autocomplete) ajax_autocomplete.abort();
            ajax_autocomplete =
                $.ajax({
                    type:'POST',
                    url: "modif_tipo_persona/php/autocomplete.php",
                    data: {p_oper:'getAutocomplete',p_filtro: request.term},
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
                                        id_contribuyente: item.id_contribuyente,
                                        c_tipo_documento: item.c_tipo_documento,
                                        d_tipo_documento: item.d_tipo_documento,
                                        n_documento: item.n_documento,
                                        m_persona: item.m_persona
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
            $('#c_tipo_documento').val(ui.item.c_tipo_documento);
            $('#d_tipo_documento').val(ui.item.d_tipo_documento);
            $('#n_documento').val(ui.item.n_documento);
            $('#m_persona').val(ui.item.m_persona);
            return false;
        }
    });

    $(".fecha").datepicker({
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

    $('#btn_buscar').click(function () {
        if (!$('#id_contribuyente').val()){
            if (!$('#c_tipo_documento').val() || !$('#n_documento').val()){
                if (!$('#d_objeto_hecho').val()) {
                  mostrar_cuadro('V', 'Atención', 'Debe ingresar al menos uno de los siguientes filtros:<br>-CUIT<br>-Tipo y Nro. de Documento<br>-Tipo Imponible, Tributo y Objeto/Hecho',null,null,400);
                  return;
                }
            }
        }
        id_contrib = $('#id_contribuyente').val();
        tipo_persona = $('#m_persona').val();
        get_datos();
    });
   
    $('#btn_limpiar').click(function(){
        $('#frm_consulta :input').val(null).attr("disabled",false);
        $('#frm_consulta .btn_lupa').show();
        $('#d_objeto_hecho').attr('readonly',true);
        $('#seccion_pf, #seccion_pj, #gbox_integrantes_grid, #gbox_integrantestmp_grid, #btn_modif_tp, #btn_grabar, #div_btngrabar_pj, #btn_constancia').hide();
        $('#frm_per_fisica :input, #frm_datos_per_juridica :input').val(null);
        $('#c_sexo').selectpicker('val','M');
        $('#integrantes_grid, #integrantestmp_grid').jqGrid('clearGridData');
        $('#btn_buscar').attr("disabled",false);
        id_contrib = null;
        tipo_persona = null;
    });

    $('#btn_modif_tp').click(function () {
        if (tipo_persona == 'F'){
            $('#seccion_pf, #gbox_integrantes_grid').hide();
            $('#seccion_pj, #gbox_integrantestmp_grid').show();
            $('#frm_datos_per_juridica :input').val(null).attr("disabled",false);
            $('#frm_datos_per_juridica .btn_lupa').show();
            setea_parametros('#integrantestmp_grid',{':id_contribuyente':id_contrib});
        }else if (tipo_persona == 'J'){
            $('#seccion_pj, #gbox_integrantes_grid, #gbox_integrantestmp_grid, #div_btngrabar_pj').hide();
            $('#frm_per_fisica :input').val(null).attr("disabled",false);
            $('#c_sexo').selectpicker('val','M');
            $('#frm_per_fisica .btn_lupa').show();
            $('#seccion_pf').show();
        }
        $('#btn_modif_tp').hide();
        $('#btn_grabar').show();
    });

    $('#btn_grabar').click(function () {
        if (tipo_persona == 'J'){
            cambiar_a_pfisica();
        }else if (tipo_persona == 'F') {
            cambiar_a_pjuridica('add');
        }
    });

    $('#btn_grabar_pj').click(function () {
        cambiar_a_pjuridica('edit');
    });

    $('#btn_constancia').click(function () {
        if (id_contrib) {
            llamar_report('CONTL_002', 'p_id_contribuyente|' + id_contrib,'&p_tributo|'+null, 'PDF');
        }
    })
}