function inicializarLupas() {
    $("#lupa_entidad").lupa_generica({
        id_lista:v_lista_entidades,
        titulos:['Descripción','Banco'],
        grid:[  {index:'d_descrip',width:450},
            {index:'banco',width:100}],
        caption:'Entidades',
        sortname:'banco',
        sortorder:'asc',
        searchInput: '#banco',
        searchCode: true,
        campos:{banco: 'c_banco',d_descrip: 'd_descrip_banco'},
        keyNav:true
    });
}

function procesar_archivo(interfaz, id_elemento, n_elemento){
    var d_path = $("#"+id_elemento).val() ;
    
    proceso = interfaz;
    if(d_path){
        $('#main').procOverlay({visible:true});
        
        $.ajaxFileUpload({
            url:FUNCIONES_BASEPATH_PROY+'levantar_archivo_siat.php?nombre_proceso='+proceso+'&archivo='+n_elemento,
            secureuri:false,
            fileElementId:id_elemento,
            dataType:'json',
            success: function (data, status) {
                // Intenta evaluar el JSon de la respuesta. Si no lo logra, muestra el resultado como error.
                var data = eval('('+data+')');
                if(data.resultado != 'OK'){
                    mostrar_error(data.resultado);
                    return;
                }
                post_procesar_archivo(interfaz, data.disco);
            },
            error: function (data, status, e) {
                mostrar_cuadro('E','Error','<p style="margin:0;" align="left">Error al subir el archivo<br /><b>Status:</b> '+ status
                    +'<br /><b>Error:</b> '+e+'</p>','','');
            }
        });
    }else{
        $('#main').procOverlay({visible:false});
        mostrar_cuadro('E','Error','Se debe ingresar un archivo para procesar.');
    }
}

function post_procesar_archivo(p_tipo_archivo, p_n_id_disco){

    $('#main').procOverlay({visible:true});

    switch(p_tipo_archivo)
    {
        case 'LEVANTAR_PAGOS_BANELCO':
            $.ajax({
                type: "POST",
                url: "interfaces/procesar_archivo_interfaz.php",
                data: {
                    "p_tipo_archivo":p_tipo_archivo,
                    "p_n_id_disco":p_n_id_disco,
                    "p_f_remesa": $('#f_remesa').val(),
                    "p_t_interfaz": $('#c_banco').val(),
                    
                },
                dataType: "json",
                success: function (resp) {
                    $('#main').procOverlay({visible:false});
                    if(resp.resultado === 'OK'){
                        $('#d_estado').val('ARCHIVO PROCESADO CORRECTAMENTE.');
                        $('#d_pagos_tot').val(resp.p_d_pagos_tot);
                        $('#d_pagos_ok').val(resp.p_d_pagos_ok);
                        $('#d_pagos_err').val(resp.p_d_pagos_err);
                        mostrar_cuadro('I', 'Informacion' ,'ARCHIVO PROCESADO CORRECTAMENTE.');
                    }else{
                        mostrar_cuadro('E','Error', resp.resultado);
                        $('#d_estado').val(resp.p_d_estado);
                        $('#d_pagos_tot').val(resp.p_d_pagos_tot);
                        $('#d_pagos_ok').val(resp.p_d_pagos_ok);
                        $('#d_pagos_err').val(resp.p_d_pagos_err);
                    }
                },
                error: function (data, status, e) {
                    mostrar_cuadro('E','Error','Error al procesar el archivo'+ status +'<br /><b>Error:</b> '+e+'</p>','','');
                }
            });
            break;

        case 'LEVANTAR_PAGOS_LINK':
            $.ajax({
                type: "POST",
                url: "interfaces/procesar_archivo_interfaz.php",
                data: {
                    "p_tipo_archivo":p_tipo_archivo,
                    "p_n_id_disco":p_n_id_disco,
                    "p_f_remesa": $('#f_remesa').val(),
                    "p_t_interfaz": $('#c_banco').val(),
                    
                },
                dataType: "json",
                success: function (resp) {
                    $('#main').procOverlay({visible:false});
                    if(resp.resultado === 'OK'){
                        $('#d_estado').val('ARCHIVO PROCESADO CORRECTAMENTE.');
                        $('#d_pagos_tot').val(resp.p_d_pagos_tot);
                        $('#d_pagos_ok').val(resp.p_d_pagos_ok);
                        $('#d_pagos_err').val(resp.p_d_pagos_err);
                        mostrar_cuadro('I', 'Informacion' ,'ARCHIVO PROCESADO CORRECTAMENTE.');
                    }else{
                        mostrar_cuadro('E','Error', resp.resultado);
                        $('#d_estado').val(resp.p_d_estado);
                        $('#d_pagos_tot').val(resp.p_d_pagos_tot);
                        $('#d_pagos_ok').val(resp.p_d_pagos_ok);
                        $('#d_pagos_err').val(resp.p_d_pagos_err);
                    }
                    },
                error: function (data, status, e) {
                    mostrar_cuadro('E','Error','Error al procesar el archivo'+ status +'<br /><b>Error:</b> '+e+'</p>','','');
                }
            });
            break;

        default:
            $('#main').procOverlay({visible:false});
            mostrar_cuadro('E','Error', 'La Interfaz no está preparada para recibir el proceso.');
            break;
    }
}