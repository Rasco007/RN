function init_eventos(){

    $('#periodo_desde').mask("9999/99");
    $('#periodo_hasta').mask("9999/99");
    $("#n_cuit").mask("99-99999999-9");
    $("#n_documento").mask("999999999");
    $('#lupa_d_denominacion').hide();

    $('.numerico').on('input', function() {
        let inputValue = $(this).val();
    
        inputValue = inputValue.replace(/\D/g, '');
    
        $(this).val(inputValue);
      });

    $('.periodo').on('focusout', function() {
        if($(this).val()){
            validar_periodo($(this));
        }
    });

    $('#btn_revalidar').click(function(){
        revalidar();
    });

    $('#btn_limpiar').click(function(){
        limpiar();
    });

    $("#lupa_c_tributo").lupa_generica({
        id_lista:v_lista_tributos,
        titulos:['Cód. Tributo','Descripción', 'Cód. Tipo Imponible'],
        grid:[  {index:'c_codigo',width:200},
            {index:'d_descrip', width:350}, {index:'c_tipo_imponible',width:250, hidden:true}],
        caption:'Lista de Tributos',
        sortname:'c_codigo',
        sortorder:'asc',
        campos:{c_codigo:'c_tributo',d_descrip: 'd_tributo', c_tipo_imponible:'c_tipo_imponible'},
        keyNav:true,
        searchInput: '#c_tributo',
        searchCode: true,
        limpiarCod: true,
    });

    $("#lupa_d_denominacion").lupa_generica({
		id_lista:v_lista_contribuyentes,
		titulos:['Id Contribuyente', 'Apellido y Nombre / Raz&oacute;n Social','Objeto Hecho','CUIT', 'Cód. Tipo Documento','Tipo de Documento', 'Nro. Documento', 'Tipo Imponible'],
		grid:[{index:'id_contribuyente',width:100, hidden:true}, {index:'d_denominacion',width:250}, {index:'d_objeto_hecho',width:170},{index:'n_cuit',width:100},{index:'c_tipo_documento',width:100,hidden:true}, {index:'d_tipo_documento',width:160}, {index:'n_documento',width:160}, {index:'c_tipo_imponible',width:130}],
		caption:'Lista de Contribuyentes',
		sortname:'d_denominacion',
		sortorder:'asc',
		filtros:['#c_tributo','#d_denominacion', '#c_tipo_documento', '#n_documento', '#d_objeto_hecho', '#c_tipo_imponible'],
		filtrosTitulos:['Tributo', 'Denominación', 'Tipo de Documento', 'Nro. Documento', 'Objeto hecho', 'Tipo Imponible'],
		filtrosNulos:[false, true, true, true, true, true],
		campos:{id_contribuyente:'id_contribuyente',d_objeto_hecho:'d_objeto_hecho', n_cuit: 'n_cuit', d_denominacion:'d_denominacion', c_tipo_documento:'c_tipo_documento', d_tipo_documento:'d_tipo_documento', n_documento: 'n_documento', c_tipo_imponible: 'c_tipo_imponible'},
		keyNav:true,
		draggable:true,
        onClose:function(){
            $("#n_cuit").mask("99-99999999-9");
         }
	});

    $('#d_denominacion').keyup(function () {
		if ($('#d_denominacion').val().length >= 5){
			$('#lupa_d_denominacion').show().css('display', 'table-cell');
			$('#mascara_lupa_d_denominacion').hide();
		} else {
			$('#lupa_d_denominacion').hide();
			$('#mascara_lupa_d_denominacion').show().css('display', 'table-cell');
		}
	});

    $("#lupa_c_tipo_documento").lupa_generica({
        id_lista:v_lista_tbl_gen,
        titulos:['Cód Documento','Documento', 'N Tabla'],
        grid:[  {index:'c_codigo',width:200},
            {index:'d_descrip', width:350}, {index:'n_tabla',width:250, hidden:true}],
        caption:'Lista de Documentos',
        sortname:'c_codigo',
        sortorder:'asc',
        filtros:['TIPDOC'],
        campos:{c_codigo:'c_tipo_documento',d_descrip: 'd_tipo_documento', n_tabla:'n_tabla_doc'},
        keyNav:true,
        searchInput: '#c_tipo_documento',
        searchCode: true,
        onClose:function(){
           busqueda2();
        }
    });

    /*$('#n_documento').focusout(function(){
        busqueda2(); 
    });*/

    $('#d_objeto_hecho').focusout(function(){
        busqueda1(); 
    });

    $('#n_cuit').focusout(function(){
        busqueda3(); 
    });

}


