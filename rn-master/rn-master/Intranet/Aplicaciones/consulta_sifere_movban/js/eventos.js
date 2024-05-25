function inicializarEventos() {
    document.getElementById('grid_grilla_excel_mb').style.display="none";
    document.getElementById('grid_grilla_excel_art').style.display="none";

    $("#grid_modal").on('shown.bs.modal', function () {
        $(document).off('focusin.modal');
    });

    $('#grid_modal').on('hidden.bs.modal', function (e) {
        $('#fecha_acre_desde').val(null);
        $('#fecha_acre_hasta').val(null);
        $('#check_f_acred_mb').prop('checked',false);
        $('#check_f_acred_art').prop('checked',false);
    });

    $('#fecha_acre_desde').change(function () {
        if($('#fecha_acre_desde').val() && $('#fecha_acre_hasta').val()){
            if ($.datepicker.parseDate('dd/mm/yy', $('#fecha_acre_desde').val()) > $.datepicker.parseDate('dd/mm/yy', $('#fecha_acre_hasta').val())){
                mostrar_error('La fecha Acreditación Desde no puede ser mayor a la fecha Acreditación Hasta', 'E', true);
                $('#fecha_acre_desde').val(null);
                return;
            }
        }});

    $('#fecha_acre_hasta').change(function () {
        if($('#fecha_acre_desde').val() && $('#fecha_acre_hasta').val()){
            if ($.datepicker.parseDate('dd/mm/yy', $('#fecha_acre_hasta').val()) < $.datepicker.parseDate('dd/mm/yy', $('#fecha_acre_desde').val())){
                mostrar_error('La fecha Acreditación Desde no puede ser mayor a la fecha Acreditación Hasta', 'E', true);
                $('#fecha_acre_hasta').val(null);
                return;
            }
        }});

    const checkboxMB = document.getElementById('check_f_acred_mb');
    const checkboxART = document.getElementById('check_f_acred_art');
    //Solo un checkbox activado
    function toggleCheckbox(event) {
        if (event.target === checkboxMB && checkboxMB.checked) {
            checkboxART.checked = false;
        } else if (event.target === checkboxART && checkboxART.checked) {
            checkboxMB.checked = false;
        }
    }
    checkboxMB.addEventListener('click', toggleCheckbox);
    checkboxART.addEventListener('click', toggleCheckbox);

    ocultar_grillas();

    //Validamos que los input de importes sean solo numeros, puntos o comas.
    $('.numerico').keypress(function(tecla){
        if(tecla.charCode<48 || tecla.charCode>57){
            if(tecla.charCode !== 44 && tecla.charCode !== 46){
                return false;
            }
        }
    });

    // Validamos que los input de importes sean solo números.
    $('.numero_entero').keypress(function(tecla){
        if(tecla.charCode < 48 || tecla.charCode > 57){
            return false;
        }
    });

    //le damos el formato de importe con 2 decimales 0,00
    $(".mascara_importe").focusout(function () {
        $(this).val(formatea_number(mascara_numero(parse($(this).val()).toFixed(2), ',', -1, 2), ''));
        if($(this).val() == '0,00'){
            $(this).val(null);
        }
    }).css('text-align', 'right');

    $('.datepicker').datepicker({
        dateFormat:'dd/mm/yy',
        changeMonth:true,
        changeYear:true,
        dayNamesMin:['D', 'L', 'M', 'M', 'J', 'V', 'S'],
        monthNamesShort: ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'],
        monthNames: ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre']
    }).mask("99/99/9999");

    $('#btn_buscar').click(function(){
        limpiar_grillas();
        ocultar_grillas();
        buscar_datos_grilla_cabecera();
        bloquea_campos();
    });

    $('#btn_generar_lista').click(function(){
        $('#grid_modal').modal("show");
    });

    $('#btn_generar_grilla_excel').click(function(){

        filtros_no_nativos_ar = [];
        filtros_arr_main = [];
        if($('#id_archivo').val() !== ''){filtros_arr_main.push('Nro. Archivo: '+ $('#id_archivo').val());}
        if($('#c_tipo_registro').val() !== ''){filtros_arr_main.push('Tipo de Registro: '+ $('#c_tipo_registro').val());}
        if($('#n_total_debito').val() !== ''){filtros_arr_main.push('Total Débito: '+ ($('#n_total_debito').val()).replace(/\./g, '').replace(',', '.'));}
        if($('#f_proceso').val() !== ''){filtros_arr_main.push('F. Proceso: '+ $('#f_proceso').val());}
        if($('#f_acreditacion').val() !== ''){filtros_arr_main.push('F. Acreditación MB: '+ $('#f_acreditacion').val());}
        if($('#n_total_credito').val() !== ''){filtros_arr_main.push('Total Crédito: '+ ($('#n_total_credito').val()).replace(/\./g, '').replace(',', '.'));}
        if($('#c_organismo_recaudador').val() !== ''){filtros_arr_main.push('Organismo Recaudador: '+ $('#c_organismo_recaudador').val());}
        if($('#c_banco_administrador').val() !== ''){filtros_arr_main.push('Banco Administrador: '+ $('#c_banco_administrador').val());}
        if($('#n_cantidad_detalle').val() !== ''){filtros_arr_main.push('Cant. Registros Detalle: '+ $('#n_cantidad_detalle').val());}
        if($('#f_concil_art').val() !== ''){filtros_arr_main.push('F. Conciliación ART: '+ $('#f_concil_art').val());}
        if($('#fecha_acre_art').val() !== ''){filtros_arr_main.push('F. Acreditación ART: '+ $('#fecha_acre_art').val());}
        if($('#fecha_acre_desde').val() !== ''){filtros_arr_main.push('F. Acreditación (Desde): '+ $('#fecha_acre_desde').val());}
        if($('#fecha_acre_hasta').val() !== ''){filtros_arr_main.push('F. Acreditación (Hasta): '+ $('#fecha_acre_hasta').val());}

        filtros_no_nativos_ar['main_grid_grilla_excel_mb'] = filtros_arr_main;
        filtros_no_nativos_ar['main_grid_grilla_excel_art'] = filtros_arr_main;

        $('#main_grid_grilla_excel_mb').jqGrid('clearGridData');
        $('#main_grid_grilla_excel_art').jqGrid('clearGridData');

        if (!(document.getElementById('check_f_acred_mb').checked) && !(document.getElementById('check_f_acred_art').checked)){
            mostrar_cuadro('E', 'Error', 'Debe seleccionar una opción (Fecha Acred. MB) o (Fecha Acred. ART).',
                null,null,400);
            return;
        }else{

            if(document.getElementById('check_f_acred_mb').checked){
                setea_parametros('#main_grid_grilla_excel_mb',{
                    ':p_fecha_acre_desde':$('#fecha_acre_desde').val(),
                    ':p_fecha_acre_hasta':$('#fecha_acre_hasta').val()
                });

                document.getElementById('grid_grilla_excel_mb').style.display="block";
                document.getElementById('grid_grilla_excel_art').style.display="none";
            }

            if(document.getElementById('check_f_acred_art').checked){
                setea_parametros('#main_grid_grilla_excel_art',{
                    ':p_fecha_acre_desde':$('#fecha_acre_desde').val(),
                    ':p_fecha_acre_hasta':$('#fecha_acre_hasta').val()
                });

                document.getElementById('grid_grilla_excel_art').style.display="block";
                document.getElementById('grid_grilla_excel_mb').style.display="none";
            }

            $(window).resize();

        }
    });

    $('#btn_limpiar').click(function(){

        $('#id_archivo').val(null);
        $('#c_tipo_registro').val(null);
        $('#n_total_debito').val(null);
        $('#f_proceso').val(null);
        $('#f_acreditacion').val(null);
        $('#n_total_credito').val(null);
        $('#c_organismo_recaudador').val(null);
        $('#c_banco_administrador').val(null);
        $('#n_cantidad_detalle').val(null);
        $('#f_concil_art').val(null);
        $('#fecha_acre_art').val(null);
        $('#fecha_acre_desde').val(null);
        $('#fecha_acre_hasta').val(null);
        $('#check_f_acred_mb').prop("checked", false);
        $('#check_f_acred_art').prop("checked", false);
        $('#id_archivo').prop('disabled', false);
        $('#c_tipo_registro').prop('disabled', false);
        $('#n_total_debito').prop('disabled', false);
        $('#f_proceso').prop('disabled', false);
        $('#f_acreditacion').prop('disabled', false);
        $('#n_total_credito').prop('disabled', false);
        $('#c_organismo_recaudador').prop('disabled', false);
        $('#c_banco_administrador').prop('disabled', false);
        $('#n_cantidad_detalle').prop('disabled', false);
        $('#f_concil_art').prop('disabled', false);
        $('#fecha_acre_art').prop('disabled', false);
        $('#btn_buscar').prop('disabled', false);
        limpiar_grillas();
        ocultar_grillas();
    });

    $('#btn_volver, #close').click(function(){
        checkboxMB.checked = false;
        checkboxART.checked = false;
        document.getElementById('grid_grilla_excel_mb').style.display="none";
        document.getElementById('grid_grilla_excel_art').style.display="none";
        $('#grid_modal').modal('hide');
        $('#main_grid_grilla_excel_mb').jqGrid('clearGridData');
        $('#main_grid_grilla_excel_art').jqGrid('clearGridData');
    });

}

