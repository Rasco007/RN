<?php
$m_autoquery = $_POST['p_m_autoquery'];
require_once(FRAMEWORK_DIR."header.php");


if ($_POST['p_c_interfaz'] == 'PEAJE'){
    
    $query = "select C_DATO,D_DATO 
                from siat.tablas_generales 
                where n_tabla = 331 
                and c_dato = 'PEAJE'";

    $db_query ->setQuery($query);
    $param = array();
    $interfaz = $db_query->do_query($param);

    $db_query->setQuery("select C_DATO,D_DATO 
                    from siat.tablas_generales 
                    where n_tabla = 344 
                    and c_dato = '1'");
    
    $peaje = $db_query->do_query($param);

    $html_camara = '<div class="form-group col-md-4 col-md-offset-2">
                        <label for="c_peaje">Peaje:</label>
                        <div id="div_c_peaje" class="input-group" style="width: 100% !important;">
                            <input name="c_peaje" id="c_peaje" value="'.$peaje[0]['C_DATO'].'" type="text" class="form-control input-sm input-cod-short validate[required]" readonly> 
                            <input name="d_peaje" id="d_peaje"  value="'.$peaje[0]['D_DATO'].'"  type="text" class="form-control input-sm input-desc-long validate[required]" readonly > 
                        </div>                       
                    </div>
                    <div class="form-group col-md-4">
                        <label for="n_carril">Carril:</label>
                        <div class="input-group" id="div_n_carril">
                            <input name="n_carril" id="n_carril" type="text" class="form-control input-sm validate[required]" >   
                        </div>
                    </div>
                    ';
}


?>

    <div class='titlebar'>
        <span class="ui-jqgrid-title">Interfaces</span>
    </div>
    <div id="div_search" class="search panel-body" hidden>
        <form id='frm_levantar_interfaz'>
            <div class='row'>
                <!--<div class="form-group col-md-2"></div>-->
                <div class="form-group col-md-4 col-md-offset-2">
                    <label for="d_tipo_interfaz">Tipo de Interfaz:</label>
                        <input name="tipo_interfaz"  id="tipo_interfaz" type="hidden" value="<?=$interfaz[0]['C_DATO']?>">
                        <input name='d_tipo_interfaz' id='d_tipo_interfaz' type='text' class="form-control input-sm validate[required]" value="<?=$interfaz[0]['D_DATO']?>" readonly>
                </div>
                <div class="form-group col-md-4">
                    <label for="ruta_archivo">Archivo de Datos:</label>
                    <div class="input-group" id="div_input_archivo">
                        <input type='file' id='path_arch_datos' name='d_path_arch_datos' style='display:none' onchange='actualizar_input()'>
                        <input name='ruta_archivo' id='ruta_archivo' type='text' class="form-control input-sm validate[required]" readonly>
                        <span class="input-group-btn " id="div_span_archivo">
                        <button class="btn-sm btn-default" type="button" id='examinar'><span class="glyphicon glyphicon-upload" aria-hidden="true"></span></button>
                    </span>
                    </div>
                </div>
                <div class="form-group col-md-2"></div>
            </div>
            <div class='row'>
                <?=$html_camara?>
            </div>
            <div class='row'>
                <div class="form-group col-md-2"></div>
                <div class="form-group col-md-8">
                    <label for="comentarios">Estado del Proceso:</label>
                    <textarea id='comentarios' name='comentarios' rows='9' class="form-control" readonly='readonly' style='font-family: tahoma,verdana;font-size: 12px; background: #FFF'></textarea>
                </div>
                <div class="form-group col-md-2"></div>
            </div>

            <div class='row text-center' style = 'margin-top:10px;'>
                <button type='button' id='btn_proc_datos' class="ui-button ui-corner-all ui-widget">Procesar Archivo de Datos</button>
                <button type='button' id='btn_cancelar_datos' class="ui-button ui-corner-all ui-widget">Cancelar</button>
                <button type='button' id='btn_errores' class="ui-button ui-corner-all ui-widget" style="display: none;">Ver Detalles</button>
            </div>

        </form>
    </div>

    <div class="modal fade" id="errores_modal" tabindex="-1" role="dialog" aria-labelledby="errores_title" aria-hidden="true" data-backdrop="false" style="z-index: 960; top:50px ;">
        <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                    <h5 class="modal-title" id="errores_title"></h5>
                </div>
                <div class="modal-body">
                    <div id='errores_div' style='width:850px;'>
                        <table id='errores_grid' class='scroll' cellpadding='0' cellspacing='0'></table>
                        <div id='errores_grid_pager' class='scroll' style='text-align: center;'></div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" id="btn_aceptar_errores" class="btn btn-primary" data-dismiss="modal">Aceptar</button>
                </div>
            </div>
        </div>
    </div>

    <script type="text/javascript">
        var proceso;

        //obtengo datos de grilla
        var datos_main_grid = new GridParam({id_menu:<?=$_POST['p_n_id_menu']?>,
            n_grid:0,
            m_autoquery:'N'});

        function actualizar_input(){
            $('#ruta_archivo').val( $('#path_arch_datos').val() );
        }

        function procesar_archivo(interfaz, id_elemento, n_elemento){
            var d_path = $("#"+id_elemento).val() ;
            
            proceso = interfaz;

            if(d_path){
                $('#main').procOverlay({visible:true});
                $('#comentarios').val('');
                $('#comentarios').val('Leyendo archivo...');
                $.ajaxFileUpload({
                    url:FUNCIONES_BASEPATH_PROY+'levantar_archivo.php?nombre_proceso='+proceso+'&archivo='+n_elemento+'&n_carril='+$('#n_carril').val(),
                    secureuri:false,
                    fileElementId:id_elemento,
                    dataType:'json',
                    success: function (data, status) {
                        
                        // Intenta evaluar el JSon de la respuesta. Si no lo logra, muestra el resultado como error.
                        
                            var data = eval('('+data+')');
                            
                            if(data.resultado != 'OK'){
                                mostrar_error(data.resultado);
                                $('#comentarios').val($('#comentarios').val()+'\n'+data.resultado);
                                return;
                            }
                            $('#comentarios').val($('#comentarios').val()+'\n'+'Archivo cargado correctamente');
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

            $('#comentarios').val($('#comentarios').val()+'\n'+'Procesando archivo');
            $('#main').procOverlay({visible:true});

            switch(p_tipo_archivo)
            {

                case 'PEAJE':                 
                    $.ajax({
                        type: "POST",
                        url: "interfaces/procesar_archivo_interfaz.php",
                        data: {
                            "p_tipo_archivo":p_tipo_archivo,
                            "p_n_id_disco":p_n_id_disco,
                            "p_c_peaje": $('#c_peaje').val(),
                            "p_n_carril": $('#n_carril').val()
                        },
                        dataType: "json",
                        success: function (resp) {
                        
                            $('#main').procOverlay({visible:false});
                            if(resp.resultado == 'OK'){
                                $('#btn_proc_datos').hide();
                                $('#ruta_archivo, #examinar').attr('disabled',true);
                                $('#btn_cancelar_datos').text('Aceptar');
                                setea_parametros('#errores_grid',{'n_id_disco':p_n_id_disco});
                                if(resp.mostrar_grilla_error =='SI'){                                    
                                    $('#btn_errores').show();
                                }else{
                                    $('#btn_errores').hide();
                                }
                                mostrar_mensaje_modal('I','Resultado de Procesamiento de Interfaz '+p_tipo_archivo,'Se procesaron:<b> '+resp.aceptadas+'</b> boletas correctamente, por un monto de <b>$'+resp.monto_acep + '</b> y se grabaron '+resp.erroneas+' erroneas.', '','','Ver Errores',function(){fun_ver_errores();},500,250);
                                $('#comentarios').val($('#comentarios').val()+'\n'+'Proceso finalizado correctamente.');
                                $('#comentarios').val($('#comentarios').val()+'\n'+'Cantidad de Registros Correctos: '+resp.aceptadas);
                                $('#comentarios').val($('#comentarios').val()+'\n'+'Monto total de los Registros Correctos: $'+resp.monto_acep);
                                $('#comentarios').val($('#comentarios').val()+'\n'+'Cantidad de Registros con Errores: '+resp.erroneas);

                            }else{
                                resp.resultado = resp.resultado.replace('<br \/>#','');
                                mostrar_cuadro('E','Errores en la Interfaz '+ p_tipo_archivo, resp.resultado);
                                $('#comentarios').val($('#comentarios').val()+'\n'+'Error al procesar la Interfaz '+ p_tipo_archivo +', durante la operación: '+resp.resultado);
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
            $('#comentarios').scrollTop($('#comentarios')[0].scrollHeight);//mueve scroll hasta el final
        }

        function fun_ver_errores(){
            let aux = $('#path_arch_datos').val().split("\\");
            $('#errores_title').text("Detalle de Registros Erróneos - "+aux[2]);
            $('#errores_modal').modal('show');
        }

        $(document).ready(function() {

            $('#ruta_archivo, #examinar').click(function(){
                $('#path_arch_datos').click();
            });

            $('#path_arch_datos').change(function(){
                $('#ruta_archivo').val( $('#path_arch_datos').val() );
            });

            $("#btn_errores").click(function(){
                fun_ver_errores();
            });
            
            $('#btn_cancelar_datos').click(function () {
                $('#div_input_archivo :input').val(null);
                $('#ruta_archivo, #examinar').attr('disabled',false);
                $('#comentarios').val('');
                $('#btn_cancelar_datos').text('Cancelar');
                $('#btn_proc_datos').show();
                $('#btn_errores').hide();
            });

            $('#btn_proc_datos').click(function(){
                var valido = $('#frm_levantar_interfaz').validationEngine('validate');  // will return true or false
                if(valido) {
                    $('#main').procOverlay({visible: true});
                    procesar_archivo($('#tipo_interfaz').val(), 'path_arch_datos', 'd_path_arch_datos');
                }
            });

            $("#errores_grid").jqGrid({//inicializo grilla
                colNames:datos_main_grid.colNames(),
                colModel:datos_main_grid.colModel(),
                pager: $("#errores_grid_pager"),
                //caption:"Detalles del Proceso",
                sortname:"n_linea",
                postData:datos_main_grid.postData()
            }).navGrid('#errores_grid_pager', {add : false,edit : false,del : false},
                {}, // edit options
                {}, //alta
                {}, //del
                {}//search
            );

            $('#div_search').show();

            $('#errores_modal').on('shown.bs.modal', function (e) {
                $('#datepicker-div').hide();
                let gridParentWidth = $('#gbox_errores_grid').parent().parent().width();
                $('#errores_grid').setGridWidth(gridParentWidth);
            });
        });
    </script>

<?php
require_once(FRAMEWORK_DIR."footer.php");
?>