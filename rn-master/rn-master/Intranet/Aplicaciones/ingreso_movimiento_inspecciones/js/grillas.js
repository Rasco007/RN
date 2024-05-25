function inicializarGrillas(){
   
    $("#grid_inspecciones").jqGrid({
        colNames:datos_cuit_inspecciones.colNames(),
        colModel:datos_cuit_inspecciones.colModel(),
        pager: $('#grid_inspecciones_pager'),
        caption:"Listado de Inspecciones:" ,
        postData:datos_cuit_inspecciones.postData(),
        editurl: FUNCIONES_BASEPATH+"maestro_abm.php",
       
        shrinkToFit: true,
        autowidth: false,
        height:120,
        beforeRequest: function(){
            //$('#add_grid_inspecciones').hide();
            //$('#edit_grid_inspecciones').hide();
           // $('#del_grid_inspecciones').hide();
        },
        onSelectRow: function(id) {
            n_expediente = $('#grid_inspecciones').getCell(id, 'n_expediente');
            n_cuit = $('#grid_inspecciones').getCell(id, 'n_cuit');
            n_documento = limpia_dni($("#nro_documento").val());

           // setea_parametros('#main_grid', {':p_id_evento': id_evento, ':p_id_inspeccion': id_inspeccion});
            setea_parametros('#main_grid',{':p_n_expediente':n_expediente, ':p_n_cuit' :n_cuit
             , ':p_n_documento' :n_documento});
            
        }
    }).navGrid('#grid_inspecciones_pager',
        {add:true, edit:true, del:true}, //options
        {},//edit,
        {},//alta
        {
        },//del
        {}//search
    );    



    $("#main_grid").jqGrid({
        colNames:datos_main_grid.colNames(),
        colModel:datos_main_grid.colModel(),
        pager: $('#main_grid_pager'),
        caption:"Movimientos de Inspección:" ,
        postData:datos_main_grid.postData(),
        editurl: FUNCIONES_BASEPATH+"maestro_abm.php",
        sortname:'n_movimiento',
        sortorder:'asc',
        shrinkToFit: true,
        autowidth: false,
        height:170,
        onSelectRow: function(id) {
            id_evento = $('#main_grid').getCell(id, 'id_evento');
            id_inspeccion = $('#main_grid').getCell(id, 'id_inspeccion');
            n_movimiento = $('#main_grid').getCell(id, 'n_movimiento');

            setea_parametros('#detalles_grid', {':p_id_evento': id_evento, ':p_id_inspeccion': id_inspeccion});

            if (p_modo == 'A' && id_evento != '1') {
                $('#edit_main_grid').hide();
                $('#del_main_grid').hide();
                $('#btn_editar_detalle_movimiento').hide();
                $('#btn_alta_grupo').hide();
                $('#btn_editar_grupo').hide();
                $('#btn_eliminar_grupo').hide();
            } else {
                if(p_modo != 'C'){
                    $('#edit_main_grid').show();
                    $('#del_main_grid').show();
                    $('#btn_editar_detalle_movimiento').show();
                    $('#btn_alta_grupo').show();
                    $('#btn_editar_grupo').show();
                    $('#btn_eliminar_grupo').show();
                }
            }
        }
    }).navGrid('#main_grid_pager',
        {add:true, edit:true, del:true}, //options
        {top:500,
            left: 0,
            width: 700,
            onInitializeForm: defaultInitForm(function(formid){
                inicializarEventosGrilla(formid,$('#id_inspeccion_i').val(),'EDIT');
                verificador_fecha(formid);
                $('.datepicker').datepicker("option", "changeYear", true);
                $('.datepicker').datepicker("option", "changeMonth", true);
                
                $('#id_evento_lupa').hide();

            }),
            beforeShowForm: defaultBeforeShowForm(function(formid){
               
            }),
            closeAfterEdit: true},//edit,
        {top:500,
            left: 0,
            width: 700,
            onInitializeForm: defaultInitForm(function(formid){
                id_inspeccioni = $('#id_inspeccion_i').val();
                inicializa_lupas_main_grid(formid);
                inicializarEventosGrilla(formid,id_inspeccioni, 'ALTA');
                verificador_fecha(formid);
                if(p_modo == 'A'){
                    $('#id_evento').val("1");
                    $('#d_evento').val("ASIGNACION DE LA INSPECCION");
                    $('#id_evento').attr('readonly', true);
                    $('#id_evento_lupa').hide();
                }
                $('.datepicker').datepicker("option", "changeYear", true);
                $('.datepicker').datepicker("option", "changeMonth", true);

            }),
            beforeShowForm: defaultBeforeShowForm(function(formid){
                
            }),
            closeAfterAdd: true},//alta
        {top:500,
            left: 0,
            width: 700,
            onInitializeForm: defaultInitForm(function(formid){
               
            }),
            beforeShowForm: defaultBeforeShowForm(function(formid){
                
            }),
            afterComplete:function() {
                $('#detalles_grid').trigger('reloadGrid');
            },
            closeAfterDelete: true
        },//del
        {}//search
    );

    $("#detalles_grid").jqGrid({
        colNames:datos_detalles_grid.colNames(),
        colModel:datos_detalles_grid.colModel(),
        pager: $('#detalles_grid_pager'),
        caption:"Datos del Movimiento" ,
        postData:datos_detalles_grid.postData(),
        editurl: FUNCIONES_BASEPATH+"maestro_abm.php",
        autowidth: true,
        height:150,
        rowNum: 50,
        shrinkToFit: true,
        gridview: false, 
        rowattr: function (rd) {
            if (rd.d_titulo == 'GRUPO'){
                return {'class': 'grupo'};
            }
            
        },
        onSelectRow: function(id) {
            n_secuencia = $('#detalles_grid').getCell(id, 'n_secuencia');

            if(id_evento == 1 && n_secuencia == 2){
                $('#btn_editar_detalle_movimiento').hide();
            }else{
                $('#btn_editar_detalle_movimiento').show();

            }
        },
        ondblClickRow:function(rowid){
            if ($('#detalles_grid').getCell(rowid, 'd_titulo') == 'GRUPO'){
                
                setea_parametros("#modal_detalle_grid",
                    {':p_id_inspeccion':id_inspeccion,
                    ':p_id_evento':id_evento,
                    ':p_n_movimiento':n_movimiento
                    },'S'
                );
                $('#modal_detalle_grid').clearGridData();
                $("#modal_detalle").modal('show');
                $(window).resize();
            }
            
        }
    }).navGrid('#detalles_grid_pager',
        {add:false, edit:false, del:false}, //options
         { 
        }, // edit options
        { 
        }, // add options
        { }, // del options
        {} // search options
        ).navButtonAdd('#detalles_grid_pager',
        {
            id: 'btn_editar_detalle_movimiento',
            title:"Editar",
            caption:"",
            position:"first",
            buttonicon: "glyphicon glyphicon-edit",
            cursor:"pointer",
            onClickButton:function() {
                if(!$("#detalles_grid").getGridParam('selrow')){
                    mostrar_error('Debe seleccionar una fila de la Tabla.');
                    return false;
                }else{
                    $('#p_oper').val('edit');
                    var id = $("#detalles_grid").getGridParam('selrow');

                    if ($('#detalles_grid').getCell(id,'d_titulo') == 'NOMBRE INSPECTOR') {
                        $('#lupa_d_valor').show();

                        $("#lupa_nro_inspector").attr("id","lupa_nombre_inspector");  
                        $("#lupa_d_valor").attr("id","lupa_nombre_inspector");  
                        inicializa_lupas_detalles_grid();

                    }else if ($('#detalles_grid').getCell(id,'d_titulo') == 'NRO INSPECTOR') {
                        $('#lupa_d_valor').show();

                        $("#lupa_nombre_inspector").attr("id","lupa_nro_inspector");  
                        $("#lupa_d_valor").attr("id","lupa_nro_inspector");  
                        inicializa_lupas_detalles_grid();
                    }else if($('#detalles_grid').getCell(id,'d_titulo') == 'SOLICITUD INFORMACIÓN'){
                        $('#lupa_d_valor').show();

                        $("#lupa_solicitud_info").attr("id","lupa_solicitud_info");  
                        $("#lupa_d_valor").attr("id","lupa_solicitud_info");  
                        inicializa_lupas_detalles_grid();

                    }else{
                        $("#lupa_nombre_inspector").attr("id","lupa_d_valor");  
                        $("#lupa_nro_inspector").attr("id","lupa_d_valor");  
                        $("#lupa_solicitud_info").attr("id","lupa_d_valor");  

                        $('#lupa_d_valor').hide();
                    }
                    clear_modal_inputs();
                    set_modal_inputs(id);

                   
                    $('#abm_modal').modal("show");

                }
            }
        });




    $('#modal_detalle_grid').jqGrid({
        colNames: datos_modal_grid.colNames(),
        colModel: datos_modal_grid.colModel(),
        cmTemplate: { autoResizable: true },
        pager: $('#modal_detalle_grid_pager'),
        autowidth:false,
        height:300,
        caption: "Grupos",
        postData:datos_modal_grid.postData(),
        editurl: FUNCIONES_BASEPATH + "maestro_abm.php",
        beforeRequest: function(){
            $('#bt_informe_modal_detalle_grid_pager').hide();
            $.ajax({
                type:'POST',
                url: 'ingreso_movimiento_inspecciones/php/datos_grilla_modal.php',
                data:{
                    "p_id_inspeccion":id_inspeccion,
                    "p_id_evento":id_evento,
                    "p_n_movimiento":n_movimiento,
                },
                dataType:'json',
                success: function( data ) {
                    if(data.resultado == 'OK'){

                            for(i=0; i< data.columnas.datos.length; i++) {
                            
                            $gr_grid = $('#modal_detalle_grid');
                            $gr_grid.jqGrid('setLabel', "d_valor"+(i+1), data.columnas.datos[i]['D_TITULO']);

                            
                            $("#modal_detalle_grid").showCol('d_valor'+(i+1));
                            $('#modal_detalle_grid').getGridParam("colModel")[i+1].formoptions.label = data.columnas.datos[i]['D_TITULO'];
                        }
                       

                    for ( let x=data.columnas.datos.length; x< 20; x++) {
                       
                            $("#modal_detalle_grid").hideCol('d_valor'+(x+1));
                        

                    } 

                    }
                    else{
                        mostrar_cuadro('E', 'Error', data.resultado);
                        $('#main').procOverlay({visible:false});
                        return;
                    }
                }
            });
        },
        onSelectRow: function(id) {
            n_fila = $('#modal_detalle_grid').getCell(id, 'n_fila');
        }
        
    }).navGrid('#modal_detalle_grid_pager',
        {add:false, edit:false, del:false},
        {},//edit,
        { },//alta
        { }//del
    
        ).navButtonAdd('#modal_detalle_grid_pager',
        {
            id: 'btn_eliminar_grupo',
            title:"Eliminar",
            caption:"",
            position:"first",
            buttonicon: "glyphicon glyphicon-trash",
            cursor:"pointer",
            onClickButton:function() {
                if(!$("#modal_detalle_grid").getGridParam('selrow')){
                    mostrar_error('Debe seleccionar una fila de la Tabla.');
                    return false;
                }else{
                    var id = $("#modal_detalle_grid").getGridParam('selrow');
                    mostrar_cuadro('C','Eliminar Grupo','Esto eliminará el grupo seleccionado <br>¿Desea continuar?',
                        function () {
                            var params = {
                                p_id_inspeccion: id_inspeccion, 
                                p_n_movimiento:n_movimiento, 
                                p_id_evento: id_evento, 
                                p_n_secuencia:  n_secuencia,
                                p_d_valor1:$('#modal_detalle_grid').getCell(id,'d_valor1'),
                                p_d_valor2:$('#modal_detalle_grid').getCell(id,'d_valor2'),
                                p_d_valor3:$('#modal_detalle_grid').getCell(id,'d_valor3'),
                                p_d_valor4:$('#modal_detalle_grid').getCell(id,'d_valor4'),
                                p_d_valor5:$('#modal_detalle_grid').getCell(id,'d_valor5'),
                                p_d_valor6: $('#modal_detalle_grid').getCell(id,'d_valor6'),
                                p_d_valor7: $('#modal_detalle_grid').getCell(id,'d_valor7'),
                                p_d_valor8: $('#modal_detalle_grid').getCell(id,'d_valor8'),
                                p_n_fila: n_fila,
                                id_menu: v_id_menu,
                                n_orden: 2,
                                p_oper: 'eliminar'
                            };
                            abm_datos_movimientos(params,'modal_detalle_grid', 'modal_evento_6');
                        });
                }
            }
        }).navButtonAdd('#modal_detalle_grid_pager',
        {
            id: 'btn_editar_grupo',
            title:"Editar",
            caption:"",
            position:"first",
            buttonicon: "glyphicon glyphicon-edit",
            cursor:"pointer",
            onClickButton:function() {
                if(!$("#modal_detalle_grid").getGridParam('selrow')){
                    mostrar_error('Debe seleccionar una fila de la Tabla.');
                    return false;
                }else{
                    $('#p_oper').val('editar');
                    var id = $("#modal_detalle_grid").getGridParam('selrow');
                    var id_aux = $("#detalles_grid").getGridParam('selrow');

                    clear_modal_inputs();
                    set_inputs_modal_detalle_grid(id_aux);

                    //set_modal_inputs(id);
               
                if (id_evento == 1) {
                    inicializa_lupas_modal_detalle_grid();
                    set_inputs_evento1(id);
                    $('#modal_evento_1').modal("show");
                } else if(id_evento == 6) {
                    inicializa_lupas_modal_detalle_grid();
                    set_inputs_evento6(id);
                    $('#modal_evento_6').modal("show");

                }

    
            }
        }}
        ).navButtonAdd('#modal_detalle_grid_pager',
        {
            id: 'btn_alta_grupo',
            title:"Alta",
            caption:"",
            position:"first",
            buttonicon: "glyphicon glyphicon-plus",
            cursor:"pointer",
            onClickButton:function() {
                $('#p_oper').val('alta');
                clear_modal_inputs();
                var id = $("#detalles_grid").getGridParam('selrow');
                set_inputs_modal_detalle_grid(id);
                if (id_evento == 1) {
                    inicializa_lupas_modal_detalle_grid();
                    $('#modal_evento_1').modal("show");
                } else if(id_evento == 6) {
                    $('#modal_evento_6').modal("show");

                }

    
            }
        }
        ).navButtonAdd("#modal_detalle_grid_pager", {
            caption: "Exportar",
            id: 'btn_exportar',
            buttonicon: "ui-icon-arrowthickstop-1-s",
            onClickButton: function () {
                console.log($("#id_contribuyente_form").val());
                post_to_url('ingreso_movimiento_inspecciones/php/genera_excel.php',
                {
                    "p_id_inspeccion":id_inspeccion,
                    "p_id_evento":id_evento,
                    "p_n_movimiento":n_movimiento,
                    'p_n_id_menu': 100055,
                    'n_grid':2
                    
                },
                'POST');
            },
            position: "last",
            title: "Exportar",
            cursor: "pointer"
        });

    
    
}

function verificador_fecha(formid){
    $('#fecha_evento',formid).datepicker("option",'maxDate',fecha_hoy).change(function () {
        if ($.datepicker.parseDate('dd/mm/yy', $('#fecha_evento').val()) > $.datepicker.parseDate('dd/mm/yy', fecha_hoy)){
            mostrar_error('La fecha ingresada no puede ser mayor a la actual', 'E', true);
            $('#fecha_evento').val(fecha_hoy);
            return;
        }});
}

 function set_inputs_evento1(id){
    $('#c_tributo').val($('#modal_detalle_grid').getCell(id,'d_valor1'));
    $('#nro_objeto_imponible').val($('#modal_detalle_grid').getCell(id,'d_valor2'));
    $('#posicion_desde').val($('#modal_detalle_grid').getCell(id,'d_valor3'));
    $('#cuota_desde').val($('#modal_detalle_grid').getCell(id,'d_valor4'));
    $('#posicion_hasta').val($('#modal_detalle_grid').getCell(id,'d_valor5'));
    $('#cuota_hasta').val($('#modal_detalle_grid').getCell(id,'d_valor6'));
    $('#tramite_desde').val($('#modal_detalle_grid').getCell(id,'d_valor7'));
    $('#tramite_hasta').val($('#modal_detalle_grid').getCell(id,'d_valor8'));
    $('#n_movimiento').val(n_movimiento);
 }

 function set_inputs_evento6(id){
    $('#f_fecha').val($('#modal_detalle_grid').getCell(id,'d_valor1'));
    $('#horas').val($('#modal_detalle_grid').getCell(id,'d_valor2'));
    $('#tarea_realizada').val($('#modal_detalle_grid').getCell(id,'d_valor3'));
    $('#n_movimiento').val(n_movimiento);
 }

function set_inputs_modal_detalle_grid(id){
    $('#n_secuencia').val($('#detalles_grid').getCell(id,'n_secuencia'));
    $('#id_inspeccion').val($('#detalles_grid').getCell(id,'id_inspeccion'));
    $('#id_evento').val($('#detalles_grid').getCell(id,'id_evento'));
    $('#n_movimiento').val(n_movimiento);
 
}
function set_modal_inputs(id){
    $('#d_titulo').val($('#detalles_grid').getCell(id,'d_titulo'));
    $('#d_valor').val($('#detalles_grid').getCell(id,'d_valor'));
    $('#n_secuencia').val($('#detalles_grid').getCell(id,'n_secuencia'));
    $('#id_inspeccion').val($('#detalles_grid').getCell(id,'id_inspeccion'));
    $('#id_evento').val($('#detalles_grid').getCell(id,'id_evento'));
 
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


function inicializa_lupas_detalles_grid(){
    
   
    $("#lupa_nombre_inspector").lupa_generica({
        id_lista:v_lista_inspectores,
        titulos:['Nro Inspector','Nombre Inspector'],
        grid:[  {index:'c_codigo',width:100},
            {index:'d_descrip',width:450}],
        caption:'LISTADO DE INSPECTORES',
        sortname:'c_codigo',
        sortorder:'asc',
        campos:{c_codigo:'',d_descrip: 'd_valor'},
        keyNav:true,
        searchInput: '#d_valor',
        searchCode: true
        
    });

    $("#lupa_nro_inspector").lupa_generica({
        id_lista:v_lista_inspectores,
        titulos:['Nro Inspector','Nombre Inspector'],
        grid:[  {index:'c_codigo',width:100},
            {index:'d_descrip',width:450}],
        caption:'LISTADO DE INSPECTORES',
        sortname:'c_codigo',
        sortorder:'asc',
        campos:{c_codigo:'d_valor',d_descrip: ''},
        keyNav:true,
        searchInput: '#d_valor',
        searchCode: true
        
    });

    $("#lupa_solicitud_info").lupa_generica({
        id_lista:v_lista_solicitud_info,
        titulos:['VALOR','VALOR'],
        grid:[  {index:'c_codigo',width:100, hidden:true},
            {index:'d_descrip',width:450}],
        caption:'LISTA SI - NO',
        sortname:'c_codigo',
        sortorder:'asc',
        campos:{c_codigo:'',d_descrip: 'd_valor'},
        keyNav:true,
        searchInput: '#d_valor',
        searchCode: true
        
    });
    
}

function inicializa_lupas_modal_detalle_grid(){
    $("#lupa_c_tributo").lupa_generica({
        id_lista:v_lista_tributos,
        titulos:['Codigo Tributo','Descrip Tributo'],
        grid:[  {index:'c_codigo',width:100},
            {index:'d_descrip',width:450}],
        caption:'LISTADO DE TRIBUTOS',
        sortname:'c_codigo',
        sortorder:'asc',
        campos:{c_codigo:'c_tributo',d_descrip: ''},
        keyNav:true,
        searchInput: '#c_tributo',
        searchCode: true
        
    });
}