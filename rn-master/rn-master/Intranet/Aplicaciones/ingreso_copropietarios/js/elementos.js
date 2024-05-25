function init_elementos(){

    $('.datepicker').datepicker({
        dateFormat:'dd/mm/yy',
        changeMonth:true,
        changeYear:true,
        dayNamesMin:['D', 'L', 'M', 'M', 'J', 'V', 'S'],
        monthNamesShort: ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'],
        monthNames: ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre']
    }).mask("99/99/9999").change(function () {
        if ($(this).val().length != 10){
            mostrar_error("El formato de la fecha ingresada no es válido.");
            $(this).val(null);
        }
    });

    // LUPAS FRM BUSQUEDA
    $("#lupa_inmuebles").lupa_generica({
        id_lista: v_lista_inmuebles,
        titulos:['C&oacute;digo','Partida', 'Recibo', 'Nomenclatura'],
        grid:[  {index:'id_inmueble',width:100},
            {index:'d_nomenclatura',width:100},
            {index:'n_recibo',width:100},
            {index:'d_nomenclatura_real',width:100}
        ],
        caption:'Lista de Inmuebles',
        campos:{d_nomenclatura:'d_objeto_hecho',d_nomenclatura_real: 'd_nomenclatura'},
        filtros:['#d_objeto_hecho', '#c_tributo'],
        filtrosNulos:[true, false],
        filtrosTitulos:['Objeto Hecho', 'Tributo'],
        keyNav:true,
        searchInput: '#d_objeto_hecho',
        searchCode: true,
        exactField: 'd_nomenclatura',
    });

    $("#lupa_automotor").lupa_generica({
        id_lista: v_lista_automotor,
        titulos:['Dominio','Dominio Anterior'],
        grid:[  {index:'d_patente',width:100},
            {index:'d_patente_vieja',width:170}],
        caption:'Lista de Dominios',
        campos:{d_patente:'d_objeto_hecho'},
        filtros:['#d_objeto_hecho', '#c_tributo'],
        filtrosNulos:[true, false],
        filtrosTitulos:['Objeto Hecho', 'Tributo'],
        keyNav:true/*,
        exactField: 'd_patente',
        searchInput: '#d_objeto_hecho',
        searchCode: true,*/
    });

    $("#lupa_nomenclatura").lupa_generica({
        id_lista: v_lista_nomenclaturas,
        titulos:['C&oacute;digo', 'Nomenclatura','Partida'],
        grid:[ {index:'id_inmueble',width:100},
            {index:'d_nomenclatura_real',width:100},
            {index:'d_nomenclatura',width:170}],
        caption:'Lista de Inmuebles',
        campos:{d_nomenclatura_real:'d_nomenclatura', d_nomenclatura:'d_objeto_hecho'},
        filtros:['#d_nomenclatura', '#c_tributo'],
        filtrosNulos:[true, false],
        filtrosTitulos:['Nomenclatura', 'Tributo'],
        keyNav:true,
        exactField: 'd_nomenclatura_real',
        searchInput: '#d_nomenclatura',
        searchCode: false
    });

    $("#lupa_dominio_ant").lupa_generica({
        id_lista: v_lista_dominio_anterior,
        titulos:['Dominio','Dominio Anterior'],
        grid:[  {index:'d_patente',width:100},
            {index:'d_patente_vieja',width:170}],
        caption:'Lista de Dominios',
        campos:{d_patente_vieja: 'd_patente_vieja'},
        filtrosNulos:[true, false],
        filtros:['#d_patente_vieja', '#c_tributo'],
        filtrosTitulos:['Dominio Anterior', 'Tributo'],
        keyNav:true/*,
        exactField: 'd_patente_vieja',
        searchInput: '#d_patente_vieja',
        searchCode: true,*/
    });
    // FIN LUPAS FRM BUSQUEDA

    //LUPAS MODAL EDICION
    lupas_modal();
}