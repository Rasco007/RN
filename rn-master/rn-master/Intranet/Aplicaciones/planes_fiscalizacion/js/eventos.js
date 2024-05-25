function inicializarEventos(formid,id_plan_fis,n_programa_fis,oper) {   
    let p_tipo_consulta = formid[0].id;
    let p_id_plan_fis = id_plan_fis;

    switch (p_tipo_consulta) {
        case "FrmGrid_main_grid":
            if(oper == 'ALTA'){
            
                $.ajax({
                    type: "POST",
                    url: "planes_fiscalizacion/php/datos.php",
                    data: {
                        "p_tipo_consulta":p_tipo_consulta
            
                    },
                    dataType: "json",
                    success: function (resp) {
                        $('#main').procOverlay({visible:false});
                        
                        $("#id_plan_fis").val(resp.ID_PLAN);
            
            
                        
                    },
                    error: function (data, status, e) {
                        mostrar_cuadro('E','Error','No se puede ingresar un registro'+ status +'<br /><b>Error:</b> '+e+'</p>','','');
                    }
                });
            }else if(oper == 'EDIT'){
                $.ajax({
                    type: "POST",
                    url: "planes_fiscalizacion/php/datos.php",
                    data: {
                        "p_tipo_consulta":p_tipo_consulta
            
                    },
                    dataType: "json",
                    success: function (resp) {
                        $('#main').procOverlay({visible:false});
                        if(resp){
            
                            $("#id_plan_fis").val(p_id_plan_fis);
                            let horas_est = formatoMiles($("#n_horas_est").val());
                            $("#n_horas_est").val(horas_est);
            
                        }
                    },
                    error: function (data, status, e) {
                        mostrar_cuadro('E','Error','No se puede ingresar un registro'+ status +'<br /><b>Error:</b> '+e+'</p>','','');
                    }
                });
            }

           
            break;
            case "FrmGrid_detalles_grid":
                if(oper == 'ALTA'){
                    $.ajax({
                        type: "POST",
                        url: "planes_fiscalizacion/php/datos.php",
                        data: {
                            "p_tipo_consulta":p_tipo_consulta,
                            "p_id_plan_fis":p_id_plan_fis
                
                        },
                        dataType: "json",
                        success: function (resp) {
                            $('#main').procOverlay({visible:false});
                            if(resp){
                                $('#id_plan_fis').attr("readonly","readonly");
                                $('#n_programa_fis').attr("readonly","readonly");

                               $("#id_plan_fis").val(p_id_plan_fis);
                               if (resp.PROGRAM_NEXTVAL == null) {

                                $("#n_programa_fis").val(1);

                               }else{
                                $("#n_programa_fis").val(resp.PROGRAM_NEXTVAL);

                               }
                
                            }
                        },
                        error: function (data, status, e) {
                            mostrar_cuadro('E','Error','Error al procesar el archivo'+ status +'<br /><b>Error:</b> '+e+'</p>','','');
                        }
                    });
                }else if(oper == 'EDIT'){
                    $.ajax({
                        type: "POST",
                        url: "planes_fiscalizacion/php/datos.php",
                        data: {
                            "p_tipo_consulta":p_tipo_consulta,
                            "p_id_plan_fis":p_id_plan_fis
                
                        },
                        dataType: "json",
                        success: function (resp) {
                            $('#main').procOverlay({visible:false});
                            if(resp){
                                $('#id_plan_fis').attr("readonly","readonly");
                                $('#n_programa_fis').attr("readonly","readonly");
                                
                               $("#id_plan_fis").val(p_id_plan_fis);
                               $("#n_programa_fis").val(n_programa_fis);
                               let rec = formatoMiles($("#i_recaudacion_esp").val());
                               $("#i_recaudacion_esp").val(rec);
    
                               let horas_est = formatoMiles($("#n_horas_est").val());
                               $("#n_horas_est").val(horas_est);
                
                            }
                        },
                        error: function (data, status, e) {
                            mostrar_cuadro('E','Error','Error al procesar el archivo'+ status +'<br /><b>Error:</b> '+e+'</p>','','');
                        }
                    });
                }
               
                break;
        default:
            break;
    }
    

    const formatoMiles = (number) => {
        const exp = /(\d)(?=(\d{3})+(?!\d))/g;
        const rep = '$1.';
        return number.toString().replace(exp,rep);
      }
    const formatoAño = (number) => {
        const exp = /(\d)(?=(\d{3})+(?!\d))/g;
        const rep = '$1.';
        let arr = number.toString().split('.');
        arr[0] = arr[0].replace(exp,rep);
        return arr[1] ? arr.join('.'): arr[0];
      }






    
}


function calcular_horas_totales(p_tipo_consulta,p_id_plan_fis){
    $.ajax({                     
        url: "planes_fiscalizacion/php/datos.php",                     
        type:"POST",                     
        dataType: "JSON",                     
        data:{ "p_tipo_consulta" :p_tipo_consulta,
        "p_id_plan_fis":p_id_plan_fis
    },                     
        success: function (res) {                         
            $('#tot_horas_est').val(res.TOT_HORAS || 0);
        }                 
    });
}

function initEventos(){
    
    $('#add_detalles_grid').hide();
    $('#edit_detalles_grid').hide();
    $('#del_detalles_grid').hide();

    $('#mascara_lupa_plan_fis').hide();
    $('#mascara_lupa_c_tipo_plan').hide();


    $('#btn_buscar').click(function(){
        let d_descrip = $("#d_descrip").val();
        let c_tipo_plan = $("#c_tipo_plan").val();
        let anio = $("#anio").val();
        let n_cant_inspectores = $("#n_cant_inspectores").val();
        let n_horas = $("#n_horas").val();
        
        if(d_descrip == '' && c_tipo_plan == '' && anio == '' && 
        n_cant_inspectores == '' &&
        n_horas == ''){
            mostrar_cuadro('E','Error','Se debe ingresar al menos un dato');

        }else{
            $('#c_codigo_plan').attr('disabled', true);
            $('#d_descrip').attr('disabled', true);
            $('#c_tipo_plan').attr('disabled', true);
            $('#d_tipo_plan').attr('disabled', true);
            $('#anio').attr('disabled', true);
            $('#n_cant_inspectores').attr('disabled', true);
            $('#n_horas').attr('disabled', true);
            $('#btn_buscar').attr('disabled', true);
            $('#mascara_lupa_plan_fis').show().css('display', 'table-cell');
            $('#lupa_plan_fis').hide();
            $('#mascara_lupa_c_tipo_plan').show().css('display', 'table-cell');
            $('#lupa_c_tipo_plan').hide();
            filtros_no_nativos = [];
            filtros_arr_main = [];


            if($('#c_codigo_plan').val() != ''){
                filtros_arr_main.push('Plan de Fiscalización: '+ $('#c_codigo_plan').val() +' - '+$('#d_descrip').val());
            }
            if($('#c_tipo_plan').val() != ''){
                filtros_arr_main.push('Tipo de Plan: '+ $('#c_tipo_plan').val() +' - '+$('#d_tipo_plan').val());
            }
            if($('#anio').val() != ''){
                filtros_arr_main.push('Año: '+ $('#anio').val());
            }
            if($('#n_cant_inspectores').val() != ''){
                filtros_arr_main.push('Cantidad de Inspectores: '+ $('#n_cant_inspectores').val());
            }
            if($('#n_horas').val() != ''){
                filtros_arr_main.push('Cantidad de Horas: '+ $('#n_horas').val());
            }
            filtros_no_nativos_ar['main_grid'] = filtros_arr_main;
            filtros_no_nativos_ar['detalles_grid'] = filtros_arr_main;

            setea_parametros('#main_grid',{':p_d_plan':d_descrip,
            ':p_tipo_plan':c_tipo_plan,
            ':p_n_anio':anio,
            ':p_n_inspectores':n_cant_inspectores,
            ':p_n_horas_est':n_horas});
        }
        
          
    
    });
    
    $('#btn_limpiar').click(function(){
        $('#anio').val(null);
        $('#d_plan').val(null);
        $('#d_descrip').val(null);
        $('#c_tipo_plan').val(null);
        $('#d_tipo_plan').val(null);
        $('#n_cant_inspectores').val(null);
        $('#n_horas').val(null);
        $('#c_codigo_plan').val(null);

        $('#c_codigo_plan').attr('disabled', false);
        $('#d_descrip').attr('disabled', false);
        $('#c_tipo_plan').attr('disabled', false);
        $('#d_tipo_plan').attr('disabled', false);
        $('#anio').attr('disabled', false);
        $('#n_cant_inspectores').attr('disabled', false);
        $('#n_horas').attr('disabled', false);
        $('#btn_buscar').attr('disabled', false);
        $('#lupa_plan_fis').show().css('display', 'table-cell');
        $('#mascara_lupa_plan_fis').hide();
        $('#lupa_c_tipo_plan').show().css('display', 'table-cell');
        $('#mascara_lupa_c_tipo_plan').hide();

        $('#main_grid').clearGridData();
        setea_parametros('#main_grid',{':p_d_plan':null,
        ':p_tipo_plan':null,
        ':p_n_anio':null,
        ':p_n_inspectores':null,
        ':p_n_horas_est':null});

        $('#detalles_grid').clearGridData();
        setea_parametros('#detalles_grid',{':p_id_plan_fis':null});

        id_plan_fis = null;
        n_programa_fis = null;
        $('#tot_horas_est').val(null);

        $('#add_detalles_grid').hide();
        $('#edit_detalles_grid').hide();
        $('#del_detalles_grid').hide();

        
        
        
        

    });
}
function inicializarLupas(){
    $("#lupa_c_tipo_plan").lupa_generica({
        id_lista:v_lista_tipo_plan,
        titulos:['Tipo Plan','Descripción Plan'],
        grid:[  {index:'c_codigo',width:130},
            {index:'d_descrip',width:419}],
        caption:'LISTADO DE TIPOS DE PLANES',
        sortname:'c_codigo',
        sortorder:'asc',
        campos:{c_codigo:'c_tipo_plan',d_descrip: 'd_tipo_plan'},
        keyNav:true,
        limpiarCod: true,
        searchInput: '#c_tipo_plan',
        searchCode: true
    });

    $("#lupa_plan_fis").lupa_generica({
        id_lista:v_lista_plan_fis,
        titulos:['Código Plan', 'Año', 'Descripción Plan'],
        grid:[  {index:'c_codigo',width:130},
            {index:'n_anio',width:100},
            {index:'d_descrip',width:419}],
        caption:'LISTADO DE PLANES DE FISCALIZACION',
        sortname:'n_anio',
        sortorder:'asc',
        campos:{c_codigo:'c_codigo_plan',d_descrip: 'd_descrip', n_anio: 'anio'},
        keyNav:true,
        searchInput: '#c_codigo_plan',
        limpiarCod: true,
        searchCode: true
    });
}

function inicializa_lupas_main_grid(formid){

    $("#tipo_plan", formid).lupa_generica({
        id_lista:v_lista_tipo_plan,
        titulos:['Tipo Plan','Descripción Plan'],
        grid:[  {index:'c_codigo',width:130},
            {index:'d_descrip',width:419}],
        caption:'LISTADO DE TIPOS DE PLANES',
        sortname:'c_codigo',
        sortorder:'asc',
        campos:{c_codigo:'tipo_plan',d_descrip: 'descrip_tipo_plan'},
        keyNav:true,
        limpiarCod: true,
        searchInput: '#tipo_plan',
        searchCode: true
    });

   

   
}