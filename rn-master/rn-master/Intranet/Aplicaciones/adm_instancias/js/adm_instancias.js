var datos_main_grid = new GridParam({
    id_menu: v_id_menu,
    n_grid:0,
    m_autoquery:v_m_autoquery,
    param:{':id_contribuyente':null,
        ':n_expediente':null,
        ':n_anio_expediente':null,
        ':id_inspeccion':null}
});

var datos_second_grid = new GridParam({
    id_menu: v_id_menu,
    n_grid:1,
    n_orden:0,
    m_autoquery:v_m_autoquery,
    param:{':id_inspeccion':null}
});

var datos_allanamiento_grid = new GridParam({
    id_menu: v_id_menu,
    n_grid:2,
    m_autoquery:v_m_autoquery,
    param:{':p_n_instancia':null,
        ':p_n_orden':null}
});

var ajax_autocomplete = null;

$(document).ready(function() {

    $("#btn_buscar").click(function(){
        if($("#frm_consulta").validationEngine('validate')){
            $("input","#frm_consulta").attr('readonly',true);
            setea_parametros('#main_grid',{
                ':id_contribuyente': $("#id_contribuyente").val(),
                ':n_expediente': $("#n_expediente").val(),
                ':n_anio_expediente': $("#n_anio_expediente").val(),
                ':id_inspeccion': $("#n_inspeccion").val(),
            });
            $("#second_grid").jqGrid("clearGridData", true);
            $("#div_grillas").show();
            $('#btn_agregar_instancia').hide();

            $(window).resize(); // Acomoda las grillas para que se vean bien
        }
    });

    $("#btn_limpiar").click(function(){
        $("#frm_consulta").validationEngine('hideAll');
        $("#div_grillas").hide();
        $("#main_grid, #second_grid").jqGrid("clearGridData", true);
        $(".limpiar").val('');
        $("input","#frm_consulta").attr('readonly',false);
    });

    $('#n_anio_expediente').mask('9999');
    $('#n_cuit').mask('99-99999999-9');

    completa_cuit_deno();

    $("#btn_allanamiento").click(function(){
        $('#btn_allanamiento').hide();
        comenzar_allanamiento();
    });

    $("#confirmar_allanamiento").click(function(){
        confirmar_allanamiento();
    });

    $('#c_origen').change(function(){
        if ($('#c_origen').val()==='OFICIO') {
            id = $('#second_grid').getGridParam('selrow');

            $.ajax({
                type:'POST',
                url: FUNCIONES_BASEPATH+'maestro_abm.php',
                data:{
                    "p_n_instancia":$("#second_grid").getCell(id,'n_instancia'),
                    "p_n_orden":$("#second_grid").getCell(id,'n_orden_post'),
                    "id_menu":10758,
                    "n_orden":3
                },
                dataType:'json',
                success: function( data ) {
                    if(data.resultado == 'OK'){

                    }
                    else{
                        mostrar_cuadro('E', 'Notif. de Oficio', data.resultado);
                        return;
                    }
                }
            });
        }
    });

    /*$("#btn_imprimir_f109").click(function(){
        imprimir_f109();
    });*/

    $("#main_grid").jqGrid({
        colNames: datos_main_grid.colNames(),
        colModel: datos_main_grid.colModel(),
        pager: $('#main_grid_pager'),
        caption: "Fiscalizaciones",
        postData: datos_main_grid.postData(),
    	editurl: FUNCIONES_BASEPATH+"maestro_abm_grid.php",
        sortname:'d_estado, id_inspeccion',
        sortorder:'desc',
        onSelectRow: function(id){
            var v_id_inspeccion = $(this).getCell(id,'id_inspeccion');
            setea_parametros('#second_grid',{
                ':id_inspeccion': v_id_inspeccion
            });

            $('#p_id_inspeccion').val(v_id_inspeccion);

            if ($(this).getCell(id,'d_estado') === 'CERRADA'){
                $('#btn_agregar_instancia').hide();
            }else {
                $('#btn_agregar_instancia').show();
            }

        },
        loadComplete: function(){
            $("#second_grid").jqGrid("clearGridData", true);
        }
    }).navGrid('#main_grid_pager',
        {add:false, edit:false, del:false}, //options
        {}, //edit
        {}, //add
        {} //del
    );

    $("#second_grid").jqGrid({
        colNames: datos_second_grid.colNames(),
        colModel: datos_second_grid.colModel(),
        pager: $('#second_grid_pager'),
        caption: "Instancias" ,
        postData: datos_second_grid.postData(),
        sortname: 'n_orden_post',
        editurl: FUNCIONES_BASEPATH+"maestro_abm.php",
        onSelectRow: function(id){
            if ($(this).getCell(id,'c_instancia') === '066'){
                $('#btn_imprimir_f109').show();
            }else {
                $('#btn_imprimir_f109').hide();
            }

            if (!$(this).getCell(id,'f_confirmacion') &&
                ($(this).getCell(id,'c_instancia') === '030' ||
                    $(this).getCell(id,'c_instancia') === '051' ||
                    $(this).getCell(id,'c_instancia') === '092')){
                $('#btn_allanamiento').show()
            }else {
                $('#btn_allanamiento').hide()
            }
        },
        ondblClickRow: function (id) {
            if ($(this).getCell(id,'c_instancia') === '066') {
                consultar_f109(id);
            }
        },
        loadComplete: function () {
            $('#btn_consultar_f109').hide();
        }
    }).navGrid('#second_grid_pager',
        {add:false, edit:false, del:false}, //options
        {}, //edit
        {}, //add
        {} //del
    ).navButtonAdd('#second_grid_pager',{
        id:'btn_imprimir_f109',
        buttonicon: "",
        caption:"<b>Imprimir F109</b>",
        position:"last",
        title:"Imprimir F109",
        cursor:"pointer",
        onClickButton:function() {
            imprimir_f109();
        }
    }).navButtonAdd('#second_grid_pager',{
        id: 'btn_agregar_instancia',
        caption: "",
        position: "first",
        buttonicon: "glyphicon glyphicon-plus",
        title: "Incorpora Instancia",
        cursor: "pointer",
        onClickButton: function () {

            $('#p_c_instancia').val(null);
            $('#p_f_instancia').val(null);
            $('#p_observaciones').val(null);
            $('#p_d_instancia').val(null);
            $('#modal_instancia').modal('show');

        }}
    );
    
    $("#allanamiento_grid").jqGrid({
        colNames: datos_allanamiento_grid.colNames(),
        colModel: datos_allanamiento_grid.colModel(),
        pager: $('#allanamiento_grid_pager'),
        postData: datos_allanamiento_grid.postData(),
        editurl: FUNCIONES_BASEPATH+"maestro_abm_grid.php",
        autowidth:false,
        sortname:'n_cuota_anticipo',
        sortorder:'asc',
        loadComplete: function () {
            gridParentWidth = $('#gbox_allanamiento_grid').parent().parent().width();
            $('#allanamiento_grid').setGridWidth(gridParentWidth);

            let v_checks = 0;
            $('.checkbox_instancias').each(function(){
                if(!$(this).is(':checked')){
                    v_checks += 1;
                }
            });

            if (v_checks > 0){
                $('#check_select_all').prop('checked', false);
            }else {
                $('#check_select_all').prop('checked', true);
            }
        }
    }).navGrid('#allanamiento_grid_pager',
        {add:false, edit:false, del:false}, //options
        {}, //edit
        {}, //add
        {} //del
    );

    $('#allanamiento_grid_checkbox').unbind();
    $('#check_select_all').click(function () {
        if($('#allanamiento_grid').getGridParam('reccount') > 0){
            $('.checkbox_instancias').prop('checked', true);
            _agregar_quitar_instancia(null);
        }
    });
});