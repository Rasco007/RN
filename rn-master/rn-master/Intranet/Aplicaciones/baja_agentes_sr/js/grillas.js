function inicializarGrillas(){
    $('#f_fecha').datepicker("option",'minDate',fecha_hoy).change(function () {         
        if ($.datepicker.parseDate('dd/mm/yy', $('#f_fecha').val()) > $.datepicker.parseDate('dd/mm/yy', fecha_hoy)){             
            mostrar_error('La fecha ingresada no puede ser mayor a la actual', 'E', true);             
            $('#f_fecha').val(fecha_hoy);             
            return;         
        }});
    $(".datepicker").datepicker({
        dateFormat:'dd/mm/yy',
        changeMonth:false,
        changeYear:false,
        dayNamesMin:['D', 'L', 'M', 'M', 'J', 'V', 'S'],
        monthNamesShort: ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'],
        monthNames: ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre']});

        
    $("#main_grid").jqGrid({
        colNames:datos_main_grid.colNames(),
        colModel:datos_main_grid.colModel(),
        pager: $('#main_grid_pager'),
        caption:"DDJJ:" ,
        postData:datos_main_grid.postData(),
        editurl: FUNCIONES_BASEPATH+"maestro_abm.php",
       // sortname:'c_renglon',
        //sortorder:'asc',
        shrinkToFit: true,
        autowidth: false,
        height:50,
        
        onSelectRow: function(id) {
            c_tipo_form = $('#main_grid').getCell(id, 'c_tipo_form');
            id_ddjj = $('#main_grid').getCell(id, 'id_ddjj');
            
             
            setea_parametros('#detalles_grid',{':p_id_ddjj':id_ddjj,
             ':p_c_tipo_form':c_tipo_form});

        }
    }).navGrid('#main_grid_pager',
        {add:false, edit:false, del:true}, //options
        {},//edit,
        {},//alta
        {top:500,
            left: 0,
            width: 700,
            onInitializeForm: defaultInitForm(function(formid){
               
            }),
            beforeShowForm: defaultBeforeShowForm(function(formid){
                
            }),
            closeAfterDelete: true},//del
        {}//search
    )

   
    $("#detalles_grid").jqGrid({
        colNames:datos_detalles_grid.colNames(),
        colModel:datos_detalles_grid.colModel(),
        pager: $('#detalles_grid_pager'),
        caption:"Programas del Plan de Fiscalización" ,
        postData:datos_detalles_grid.postData(),
        editurl: FUNCIONES_BASEPATH+"maestro_abm.php",
        autowidth: true,
        height:150,
        rowNum: 50,
        sortname:'c_renglon',
        sortorder:'asc',
        shrinkToFit: true,
        gridview: false, 
        onSelectRow: function(id) {
           
        }
    }).navGrid('#detalles_grid_pager',
        {add:false, edit:false, del:false}, //options
        {}, // edit options
        {}, // add options
        {}, // del options
        {} // search options
    );
    
    
}

function verificador_fecha(formid){
    $('#fecha_evento',formid).datepicker("option",'maxDate',fecha_hoy).change(function () {
        if ($.datepicker.parseDate('dd/mm/yy', $('#fecha_evento').val()) > $.datepicker.parseDate('dd/mm/yy', fecha_hoy)){
            mostrar_error('La fecha ingresada no puede ser mayor a la actual', 'E', true);
            $('#fecha_evento').val(fecha_hoy);
            return;
        }});
}




function clear_modal_inputs(){
    $('#c_tributo').val("");

    $('#d_titulo').val("");
    $('#d_valor').val("");
    $('#d_titulo').val("");
    $('#n_secuencia').val("");
    $('#id_inspeccion').val("");
    $('#id_evento').val("");
    $('#f_fecha').val("");
    $('#horas').val("");
    $('#tarea_realizada').val("");
    $('#nro_objeto_imponible').val("");
    $('#posicion_desde').val("");
    $('#cuota_desde').val("");
    $('#posicion_hasta').val("");
    $('#cuota_hasta').val("");
    $('#tramite_desde').val("");
    $('#tramite_hasta').val("");

    
}



function inicializa_lupas_main_grid(formid){

    $("#id_evento_lupa",formid).lupa_generica({
        id_lista:v_lista_eventos,
        titulos:['Id Evento','Descrip Evento'],
        grid:[  {index:'c_codigo',width:100},
            {index:'d_descrip',width:450}],
        caption:'LISTADO DE EVENTOS DE MOVIMIENTOS',
        sortname:'c_codigo',
        sortorder:'asc',
        campos:{c_codigo:'id_evento',d_descrip: 'd_evento'},
        keyNav:true,
        searchInput: '#id_evento',
        searchCode: true
        
    });
    

   
}



