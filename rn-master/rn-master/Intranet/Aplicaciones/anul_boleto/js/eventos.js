function init_eventos(){
    $('.numero').keypress(function (tecla) {
        return (tecla.charCode >= 48 && tecla.charCode <= 57);
    });

    $('#btn_continuar').click(function () {
        if (v_tributo == 60){
            if ($('#d_partida',"#frm_busqueda").val() || $('#d_nomenclatura',"#frm_busqueda").val()){
                getDatosFiltros();
            }else mostrar_error('Debe completar alguno de estos campos: Partida / Nomenclatura.');
        }else if (v_tributo == 90){
            if ($('#d_partida',"#frm_busqueda").val() || $('#d_nomenclatura',"#frm_busqueda").val()){
                if ($('#d_partida').val() && $('#d_verif_dom').val()){
                    check_digito_verificador($('#d_partida').val(), $('#d_verif_dom').val());
                }
                else if ($('#d_nomenclatura').val() && $('#d_verif_dom_ant').val()){
                    check_digito_verificador($('#d_nomenclatura').val(), $('#d_verif_dom_ant').val());
                }else mostrar_error('El campo Digito Verificador no puede quedar vacio.');
            }else mostrar_error('Debe completar alguno de estos campos: Dominio / Dominio Anterior.');
        }
    });

    $('#btn_limpiar').click(function () {
        limpiar_app();
    });

    $('#d_fecha_anul').datepicker({
        dateFormat:'dd/mm/yy',
        changeMonth:true,
        changeYear:true,
        maxDate: fecha_hoy,
        dayNamesMin:['D', 'L', 'M', 'M', 'J', 'V', 'S'],
        monthNamesShort: ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'],
        monthNames: ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre']
    }).mask("99/99/9999").change(function () {
        if ($(this).val() && $(this).val().length != 10){
            mostrar_validacion("El Formato de la Fecha ingresada no es válido.");
            $(this).val(null);
        }else if ($.datepicker.parseDate('dd/mm/yy', $(this).val()) < $.datepicker.parseDate('dd/mm/yy', $('#d_fecha').val())){
            $("#d_fecha_anul").datepicker("setDate" , $('#d_fecha').val());
        }else if ($.datepicker.parseDate('dd/mm/yy', $(this).val()) > $.datepicker.parseDate('dd/mm/yy', fecha_hoy)){
            $("#d_fecha_anul").datepicker("setDate" , fecha_hoy);
        }
    });

    $('#btn_anular').click(function () {
        if($('#d_fecha_anul').val() && $('#c_delegacion').val() && $('#d_delegacion').val()){
            // PROCEDIMIENTO QUE HACE UN UPDATE EN LA TABLA CORRESPONDIENTE
            mostrar_cuadro('C','Anular BCV','La anulación debe suceder cuando la operación existio y se deshizo la operación.<br>¿Desea continuar?',
                function () {anular_boleto();},null,400);
        }
        else{
            mostrar_error('Debe completar la Fecha de Anulación y Prov/Oficina.');
        }
    });

    $("#lupa_prov_oficina").lupa_generica({
        id_lista: 10874,
        titulos:['C&oacute;digo','Descripci&oacute;n'],
        grid:[{index:'c_dato',width:100},
            {index:'d_dato',width:350}],
        caption:'Delegaciones',
        sortname:'c_dato',
        sortorder:'asc',
        campos:{c_dato:'c_delegacion',d_dato:'d_delegacion'},
        filtros: [v_tributo, '#d_partida'],
        filtrosNulos: [false],
        searchCode:true,
        searchInput: '#c_delegacion',
        keyNav:true,
        exactField: 'c_dato'
    });
}

function init_eventos_inmo() {
    $("#lupa_partida").lupa_generica({
        id_lista: 10867,
        titulos: ['Partida', 'Nomenclatura'],
        grid: [{index: 'd_nomenclatura', width: 150},
            {index: 'd_nomenclatura_real', width: 150}],
        caption: 'Partidas',
        sortorder: 'asc',
        campos: {d_nomenclatura: 'd_partida', d_nomenclatura_real: 'd_nomenclatura'},
        filtros: ['#d_partida', '#d_nomenclatura'],
        filtrosNulos: [true, true],
        searchCode: true,
        keyNav: true
    });

    $("#lupa_nomenclatura").lupa_generica({
        id_lista: 10867,
        titulos: ['Partida', 'Nomenclatura'],
        grid: [{index: 'd_nomenclatura', width: 150},
            {index: 'd_nomenclatura_real', width: 150}],
        caption: 'Nomenclaturas',
        //sortname:'d_nomenclatura_real',
        sortorder: 'asc',
        campos: {d_nomenclatura_real: 'd_nomenclatura', d_nomenclatura: 'd_partida'},
        filtros: ['#d_partida', '#d_nomenclatura'],
        filtrosNulos: [true, true],
        searchCode: true,
        keyNav: true
    });
};

function init_eventos_auto() {
    $("#lupa_partida").lupa_generica({
        id_lista: 10858,
        titulos: ['Dominio', 'Dominio Anterior'],
        grid: [{index: 'd_patente', width: 150},
            {index: 'd_patente_vieja', width: 150}],
        caption: 'Dominios',
        //sortname:'d_nomenclatura',
        sortorder: 'asc',
        campos: {d_patente: 'd_partida'},
        filtros: ['#d_partida', v_tributo],
        filtrosNulos: [true, false],
        searchCode: true,
        keyNav: true
    });

    $("#lupa_nomenclatura").lupa_generica({
        id_lista: 10885,
        titulos: ['Dominio Anterior', 'Dominio'],
        grid: [{index: 'd_patente_vieja', width: 150},
            {index: 'd_patente', width: 150}],
        caption: 'Dominios',
        //sortname:'d_nomenclatura',
        sortorder: 'asc',
        campos: {d_patente_vieja: 'd_nomenclatura'},
        filtros: ['#d_nomenclatura'],
        filtrosNulos: [true],
        searchCode: true,
        keyNav: true
    });
}
