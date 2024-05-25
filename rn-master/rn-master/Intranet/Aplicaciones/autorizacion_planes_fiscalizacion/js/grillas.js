function inicializarGrillas(){

    $("#lupa_d_plan").lupa_generica({
        id_lista:v_lista_planes_fisca,
        titulos:['Año','Plan de Fiscalización'],
        grid:[{index:'n_anio',width:70},
            {index:'d_plan',width:495}],
        caption:'Planes de Fiscalización',
        campos:{n_anio: 'anio', d_plan: 'd_plan'},
        keyNav:true
    });

    $("#main_grid").jqGrid({
        colNames:datos_main_grid.colNames(),
        colModel:datos_main_grid.colModel(),
        pager: $('#main_grid_pager'),
        caption:"Plan de Fiscalización" ,
        postData:datos_main_grid.postData(),
        editurl: FUNCIONES_BASEPATH+"maestro_abm.php",
        sortname:'n_anio,d_plan',
        sortorder:'asc',
        shrinkToFit: true,
        autowidth: false,
        height:100,
        onSelectRow: function(id) {
            id_plan_fis = $('#main_grid').getCell(id, 'id_plan_fis');
            d_plan = $('#main_grid').getCell(id, 'd_plan');
            n_anio = $('#main_grid').getCell(id, 'n_anio');
            d_observac = $('#main_grid').getCell(id, 'd_observac');
            f_aprobacion = $('#main_grid').getCell(id, 'f_aprobacion');
            n_inspectores_est = $('#main_grid').getCell(id, 'n_inspectores_est');
            n_horas_est = $('#main_grid').getCell(id, 'n_horas_est');

            $('#d_plan').val(d_plan);
            $('#anio').val(n_anio);
            $('#d_observac').val(d_observac);
            $('#f_de_aprobacion').val(f_aprobacion);
            $('#n_horas_est').val(n_horas_est);
            $('#n_inspectores_est').val(n_inspectores_est);

            filtros_no_nativos = [];
            filtros_arr_main = [];

            if(id_plan_fis !== ''){
                filtros_arr_main.push('ID Plan: '+ id_plan_fis);
            }
            if(d_plan !== ''){
                filtros_arr_main.push('Descripción Plan: '+ d_plan);
            }
            if(n_anio !== ''){
                filtros_arr_main.push('Año: '+ n_anio);
            }
            if(d_observac !== ''){
                filtros_arr_main.push('Observación: '+ d_observac);
            }
            if(f_aprobacion !== ''){
                filtros_arr_main.push('F. Aprobación: '+ f_aprobacion);
            }
            if(n_inspectores_est !== ''){
                filtros_arr_main.push('Total de Inspectores Estimados: '+ n_inspectores_est);
            }
            if(n_horas_est !== ''){
                filtros_arr_main.push('Total de Horas Estimadas: '+ n_horas_est);
            }

            filtros_no_nativos_ar['detalles_grid'] = filtros_arr_main;

            setea_parametros('#detalles_grid',{':p_id_plan_fis':id_plan_fis});
            calcular_horas_totales('calcular_horas_totales',id_plan_fis);

            $('#refresh_main_grid').click(function(){
                $('#anio').val(null);
                $('#d_plan').val(null);
                $('#d_observac').val(null);
                $('#tot_horas_est').val(null);
                $('#detalles_grid').clearGridData();
                $('#gridWrapperDetalle').hide();
                $('#div-totales').hide();
            });

            $('#gridWrapperDetalle').show();
            $('#div-totales').show();
            $(window).resize();

        }
    }).navGrid('#main_grid_pager',
        {add:false, edit:false, del:false}, //options
        {top:500,
            left: 0,
            width: 700,
            onInitializeForm: defaultInitForm(function(formid){
                inicializarEventosGrilla(formid,id_plan_fis,null,'EDIT');
            }),
            beforeShowForm: defaultBeforeShowForm(function(formid){
            }),
            closeAfterEdit: true
        },//edit,
        { 
        },//alta
        {},//del
        {}//search
    ).navButtonAdd('#main_grid_pager',
    {
        title:"Editar",
        caption:"APROBAR PLAN",
        position:"first",
        id: "btn_aprobar_plan",
        buttonicon: "glyphicon",
        cursor:"pointer",
        onClickButton:function() {
            if(!$("#main_grid").getGridParam('selrow')){
                mostrar_error('Debe seleccionar una fila de la Tabla.');
                return false;
            }else{
                $('#p_oper').val('edit');
                var id = $("#main_grid").getGridParam('selrow');
                habilitarDatepicker();

                clear_modal_inputs();
                set_modal_inputs(id);

               
                $('#abm_modal').modal("show");

            }
        }
    });

    $("#detalles_grid").jqGrid({
        colNames:datos_detalles_grid.colNames(),
        colModel:datos_detalles_grid.colModel(),
        pager: $('#detalles_grid_pager'),
        caption:"Programas del Plan de Fiscalización" ,
        postData:datos_detalles_grid.postData(),
        editurl: FUNCIONES_BASEPATH+"maestro_abm.php",
        autowidth: false,
        height:180,
        rowNum: 50,
        shrinkToFit: true,
        gridview: false,
        loadComplete:function(){
        },
        onSelectRow: function(id) {
        }
    }).navGrid('#detalles_grid_pager',
        {add:false, edit:false, del:false}, //options
        { 
        }, // edit options
        {
        }, // add options
        { }, // del options
        {} // search options
    );



function habilitarDatepicker(){
    $('#f_aprobacion').datepicker("option",'maxDate',fecha_hoy).change(function () {

        if ($.datepicker.parseDate('dd/mm/yy', $('#f_aprobacion').val()) > $.datepicker.parseDate('dd/mm/yy', fecha_hoy)){
            mostrar_error('La fecha ingresada no puede ser mayor a la actual', 'E', true);
            $('#f_aprobacion').val(fecha_hoy);
            return;
        }});
    
        $(".datepicker").datepicker({
            dateFormat:'dd/mm/yy',
            changeMonth:false,
            changeYear:false,
            dayNamesMin:['D', 'L', 'M', 'M', 'J', 'V', 'S'],
            monthNamesShort: ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'],
            monthNames: ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre']}).mask("99/99/9999");
}

    function set_modal_inputs(id){
        $('#d_plan').val($('#main_grid').getCell(id,'d_plan'));
        $('#d_observac').val($('#main_grid').getCell(id,'d_observac'));
        $('#n_anio').val($('#main_grid').getCell(id,'n_anio'));
        $('#id_plan_fis').val($('#main_grid').getCell(id,'id_plan_fis'));
        $('#f_aprobacion').val($('#main_grid').getCell(id,'f_aprobacion'));
        $('#n_inspectores_est').val($('#main_grid').getCell(id,'n_inspectores_est'));
        $('#n_horas_est').val($('#main_grid').getCell(id,'n_horas_est'));
     
    }
    
    function clear_modal_inputs(){
        $('#d_plan').val("");
    
        $('#d_observac').val("");
        $('#n_anio').val("");
        $('#id_plan_fis').val("");
        $('#f_aprobacion').val("");
        $('#n_inspectores_est').val("");
        $('#n_horas_est').val("");
    
    }
    
}