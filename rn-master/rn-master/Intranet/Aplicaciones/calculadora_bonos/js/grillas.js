function init_grillas(){

    datos_grid_calcula_bonos = new GridParam({
        id_menu: v_id_menu,
        n_grid: 0,
        n_orden: 0,
    });

    $.ajax({
        type:'POST',
        url: FUNCIONES_BASEPATH+'maestro_abm.php',
        data:{ 
         "user":null,        
         "id_menu":v_id_menu,
         "n_orden":1
        },
        dataType:'json',
        success: function( data ) {
            if(data.resultado == 'OK'){
                crea_grilla_bonos();
            }
            else{
                mostrar_cuadro('E', 'Error', data.resultado);
                return;
            }
        }
    }); 

    function crea_grilla_bonos(){
        $("#grid_calcula_bonos").jqGrid({
        colNames: datos_grid_calcula_bonos.colNames(),
        colModel: datos_grid_calcula_bonos.colModel(),
        pager: $('#grid_calcula_bonos_pager'),
        postData: datos_grid_calcula_bonos.postData(),
        editurl: FUNCIONES_BASEPATH+"maestro_abm.php",
        shrinkToFit: true,
        height: 180,    
        gridComplete: function() {
            let i_total = $('#grid_calcula_bonos').getCell(1,'suma_total');
            if(i_total){
                $("#i_total").val(i_total);
                
                let a_pagar = $("#i_pagar").val();
                a_pagar = a_pagar.split('.').join('');
                a_pagar = a_pagar.split(',').join('.');

                let total = $("#i_total").val();
                total = total.split('.').join('');
                total = total.split(',').join('.');

                let saldo_final = a_pagar - total;
                $("#saldo").val(formatear_numero(saldo_final,2));
                
                if(a_pagar != 0 && total != 0){
                    $('#btn_imprimir').prop('disabled',false);
                }

                $('#i_pagar').val(formatea_number(mascara_numero(parse($('#i_pagar').val()).toFixed(2), ',', -1, 2), ''));
                }
        },       
            loadComplete: function(){
                $('#i_total_wrapper').show();
            }
        })
        .navGrid('#grid_calcula_bonos_pager',
        {add:true, edit:true, del:true},
        {
            top:500,
            left: 0,
            width: 700,
            onInitializeForm: defaultInitForm(function(formid){
                inicializa_lupas_main_grid(formid);
            }),
            closeAfterEdit: true
        }, //edit
        {
            top:500,
            left: 0,
            width: 700,
            onInitializeForm: defaultInitForm(function(formid){
                inicializa_lupas_main_grid(formid);
            }),
            closeAfterAdd: true
        }, //add
        {} //del
    );
    }

    function inicializa_lupas_main_grid(formid){

        $("#p_c_bono_lupa",formid).lupa_generica({
            id_lista:v_lista_bonos,
            titulos:['Cod. Especie','Especie','Cotizacion'],
            grid:[  {index:'p_c_bono',width:100},
                {index:'p_d_dato',width:200},
                {index:'p_i_cotizacion',width:100}],
            caption:'Lista de Especies',
            sortname:'p_d_dato',
            sortorder:'asc',
            filtros:['#f_vencimiento'],
            searchInput: '#p_c_bono',
            searchCode: true,
            campos:{p_c_bono:'p_c_bono',p_d_dato: 'p_d_dato',p_i_cotizacion:'p_i_cotizacion'},
            keyNav:true
        });
    }
}