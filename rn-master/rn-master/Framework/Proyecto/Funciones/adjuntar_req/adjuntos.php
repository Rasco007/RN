<div id="div_adjuntos" style="width: 100%">

    <table id="adjuntos_grid"></table>
    <div id="adjuntos_grid_pager"></div>

</div>

<script language="javascript">
    var nombre_grilla_adjuntos_extranet = '#adjuntos_grid';
    $(document).ready(function(){

    });

    function build_grid_adjuntos(p_id_solicitud , p_acciones, p_n_grid = 1, p_entorno = null){

        if (! Array.isArray(p_acciones))
            p_acciones = [];

        // let alreadyExists = $("#adjuntos_grid")[0].grid;

        // if(alreadyExists)
        //    return setea_parametros('#adjuntos_grid', {p_id_solicitud: p_id_solicitud});

        _crear_grilla(p_id_solicitud, p_n_grid, p_acciones, p_entorno);

        // el confirmUpload se setea con el id_solicitud con el que se crea la grilla
        // de esa manera cuando se llame se llama para la solicitud en si,
        // si recibe como parametro el id documento por si se queire confirmar algun doc en particuarl
        confirmUploads = function(p_id_documento){
            var id_sol = p_id_solicitud;

            params = {
                p_id_solicitud : id_sol,
                p_id_documento : p_id_documento
            };

            $('#main').procOverlay({visible:true});
            $.ajax({
                type:'POST',
                url: FUNCIONES_BASEPATH_PROY +'adjuntar_req/adjuntos_acciones.php?action=confirmUploads',
                data: params,
                dataType:'json',
                success: function( data ) {
                    $('#main').procOverlay({visible:false});
                    if(data.respuesta != 'OK'){
                        mostrar_cuadro('I', 'Información', data.advert);
                    }
                }
            });
        }

    }

    function _crear_grilla(p_id_solicitud, p_n_grid, p_acciones, p_entorno){
        let datos_adjuntos = new GridParam({id_menu: 42,
            n_grid: p_n_grid,
            m_autoquery:'S',
            param: (
                {
                    p_id_solicitud: p_id_solicitud,
                    p_entorno_visible : null
                })
            //param: ({':p_agrup':'SOLI_CLAVE',':id_tramite':null,':id_sello':null,':id_expediente':null})
        });

        // TODO: ver si se puede destruir la grilla antes
        $.jgrid.gridUnload("#adjuntos_grid");


        $("#adjuntos_grid").jqGrid({
            colNames:datos_adjuntos.colNames(),
            colModel:datos_adjuntos.colModel(),
            postData:datos_adjuntos.postData(),
            caption:"Adjuntos",
            editurl: FUNCIONES_BASEPATH_PROY+"maestro_abm_grid.php",
            pager: $('#adjuntos_grid_pager'),
            autowidth: false,
            height:250,
            gridview: false,
            sortname:'c_req_det, id_documento',
            sortorder:'desc',
            //shrinkToFit: true,
            afterInsertRow: function(rowid, rowData, rowelem ){
                _crear_acciones_row(rowid, rowData, p_id_solicitud, rowData.id_documento, p_acciones);
            },
            loadComplete: function(data){
                let  gridParentWidth = $('#gbox_adjuntos_grid').parent().parent().width();
                $('#adjuntos_grid').setGridWidth(gridParentWidth);

                $( this ).jqGrid().setGridHeight(28.6 * (+data.records + 2) );
            }
        }).navGrid('#adjuntos_grid_pager',
            {add:false, edit:false, del:false}, //options
            {}, // edit options
            {}, // add options
            {}, // del options
            {} // search options
        );
    }

    function _crear_acciones_row(p_rowid, p_rowData, p_id_solicitud, p_id_documento, p_acciones){
        //Traemos HTML Genérico
        var v_html_carga = '<? echo(preg_replace("/\r|\n/", null, file_get_contents('carga_req_column.php', true))); ?>';

        //Reemplazamos por el tipo de documento
        var v_html_carga = v_html_carga.replace(/p_c_tipo_doc/g, p_rowid);

        //Seteamos el HTML
        //$(`tr#${p_rowid} td div.div_adj_visualizar`).html(v_html_carga);

        //se agega la clase para poder luego identificar al padre de la row seleccionada
        //$(`#id_documento_${p_rowid}`).addClass('doc_id');

        // AM agregado para IE
        //Seteamos el HTML
        $('tr#'+p_rowid+' td div.div_adj_visualizar').html(v_html_carga);

        //se agega la clase para poder luego identificar al padre de la row seleccionada
        $('#id_documento_'+p_rowid).addClass('doc_id');
        /*se verifica si ya tiene adjunto asociado*/

        if(p_id_documento != null){
            // Si hay doc Adjunto:
            $('#d_file_adjunto_'+p_rowid).val(p_rowData.d_nombre_archivo);
            $('#id_documento_'+p_rowid).val(p_id_documento);
            botones_req_grid(true, p_rowid);
        }else{
            //console.log('entro en add');
            $("#form_adjuntar_"+p_rowid)[0].reset();
            $("#form_adjuntar_"+p_rowid+" input").val(null);
            $("#id_documento_"+p_rowid).val(null);
            botones_req_grid(false, p_rowid);
        }

        // ADJUNTAR

        //Cualquier click, activa el adjunto.
        $('#form_adjuntar_'+p_rowid+' #btn_file_adjunto_'+p_rowid+', #form_adjuntar_'+p_rowid+' #d_file_adjunto_'+p_rowid).click(function(){
            $("#file_adjunto_"+p_rowid).click();
        });

        //Evento: Cuando cambia el input de adjunto
        $('#file_adjunto_'+p_rowid).change(function () {
            //Ponemos el nombre en el input.
            $('#d_file_adjunto_'+p_rowid).val(this.value);
            levantarDocumento(p_id_solicitud, p_rowid, p_rowData);
        });

        //Visualizar
        $("#form_adjuntar_"+p_rowid+" #btn_file_View_"+p_rowid).click(function(){
            //mostrar_cuadro('','Visualizador de Documento','<embed src="soli_clave/servicios/upload_file_server.php?action=viewFile&p_id_documento='+$("#id_documento_"+p_c_tipo_doc).val()+'" width="960" height="540">','','', 990, 555);
            post_to_url(FUNCIONES_BASEPATH_PROY+'adjuntar_req/adjuntos_acciones.php?action=viewFile&p_id_documento='+p_rowData.id_documento,{"p_n_id_menu":42},'_blank','POST')
        });

        //Eliminar
        $("#form_adjuntar_"+p_rowid+" #btn_file_delete_"+p_rowid).click(function(){

            mostrar_cuadro('C', 'Eliminar Adjunto',
                'Esta a punto de eliminar el adjunto de la solicitud ¿Desea Continuar?',
                function(){
                    eliminarDocumento(p_rowData.id_documento, p_rowid);
                }
            )
        });

        //Info
        $("#btn_file_info_"+p_rowid).click(function(){
            var v_d_mensaje = '';

            if($("#n_max_mb_adjunto").val() != ''){
                v_d_mensaje = v_d_mensaje+'<p>El documento adjunto no puede superar los '+p_rowData.max_mb+'MB.</p>';
            }

            if($("#c_ext_admitidos").val() != ''){
                v_d_mensaje = v_d_mensaje+'<p>Solo se permiten documentos con las siguientes extensiones:</p><p style="margin-left: 20px;">';
                var array_1 = $('#adjuntos_grid').getCell(p_rowid,'ext').split("|");
                $.each(array_1, function(index, value){
                    v_d_mensaje = v_d_mensaje+'*.'+value+', ';
                });
                v_d_mensaje = v_d_mensaje.substring(0, (v_d_mensaje.length)-2)+'</p>';
            }

            if(v_d_mensaje != ''){
                v_d_mensaje = '<div style="overflow: hidden;"><div style="float: left;">'+v_d_mensaje+'</div></div>';
                mostrar_cuadro('I', 'Formato de Documento Adjunto', v_d_mensaje);
            }else{
                mostrar_cuadro('E', 'Formato de Documento Adjunto', 'No se pudo recuperar la información sobre formato admitido.');
            }
        });

        restringir_acciones(p_rowid, p_acciones);
    }

    function botones_req_grid(doc_adjunto, p_rowid){

        if (doc_adjunto === true){
            $(".div_btn_fileSearch_"+p_rowid).hide();
            $(".div_btn_info_"+p_rowid).hide();

            $(".div_btn_fileDelete_"+p_rowid).show();

            $(".div_btn_fileView_"+p_rowid).show();

            $("#d_file_adjunto_"+p_rowid).attr('disabled',true);

        }else{
            $(".div_btn_fileSearch_"+p_rowid).show();
            $(".div_btn_info_"+p_rowid).show();

            $(".div_btn_fileDelete_"+p_rowid).hide();

            $(".div_btn_fileView_"+p_rowid).hide();

            $("#d_file_adjunto_"+p_rowid).attr('disabled',false);

        }

    }

    function restringir_acciones(p_rowid, p_acciones) {
        // la menor chapuceada es eliminar los inputs que no viene por parametro
        // o sea que no se deben mostrar
        if(! p_acciones.includes('info'))
            $("#btn_file_info_"+p_rowid).remove();

        if(! p_acciones.includes('adjuntar')){
            $('#form_adjuntar_'+p_rowid+' #btn_file_adjunto_'+p_rowid).remove();
            $("#d_file_adjunto_"+p_rowid).attr('disabled',true);
        }

        if(! p_acciones.includes('eliminar'))
            $("#form_adjuntar_"+p_rowid+" #btn_file_delete_"+p_rowid).remove();

        if(! p_acciones.includes('desvalidar'))
            $("#form_adjuntar_"+p_rowid+" #btn_file_unvalidate_"+p_rowid).remove();
    }
    // todas las funcionalidades
    // ADJUNTAR, ELIMINAR, ACEPTACION y RECHAZO de documentos
    // pueden reescribirse en los casos particulares

    function levantarDocumento(p_id_solicitud, p_rowid, p_rowData){

        var file_data = $("#file_adjunto_"+p_rowid).prop('files')[0];
        var form_data = new FormData();

        form_data.append('file', file_data);
        form_data.append('p_id_solicitud_requisito', p_id_solicitud);
        form_data.append('p_c_tipo_param_req', p_rowData.C_TIPO);
        form_data.append('p_id_param_req', p_rowData.ID_PARAM_REQ);

        $('#main').procOverlay({visible:true});
        $.ajax({
            url: FUNCIONES_BASEPATH_PROY+'adjuntar_req/adjuntos_acciones.php?action=levantarTMP',
            dataType: 'text',
            cache: false,
            contentType: false,
            processData: false,
            data: form_data,
            type: 'post',
            success: function(res){
                $('#main').procOverlay({visible:false});
                var data = JSON.parse(res);
                if(data.respuesta == 'OK'){

                    if(data.d_estado != 'OK'){
                        mostrar_cuadro('I', 'Archivo Inválido.', data.d_estado);
                        $("#form_adjuntar_"+p_rowid)[0].reset();
                        $("#form_adjuntar_"+p_rowid+" input").val(null);
                        $("#id_documento_"+p_rowid).val(null);
                        $("#d_file_adjunto_"+p_rowid).attr('disabled',false);

                    }else{
                        $("#d_nombre_"+p_rowid).val(data.d_nombre);
                        $("#d_nombre_tmp_"+p_rowid).val(data.d_nombre_tmp);
                        $("#c_ext_file_"+p_rowid).val(data.c_ext_file);

                    }
                    $('#adjuntos_grid').trigger('reloadGrid');

                }else{
                    mostrar_cuadro('E', 'Error', data.advert, '');
                }
            }
        });
    }

    function eliminarDocumento(id_documento, p_rowid){

        let params = {p_id_documento: id_documento};

        $('#main').procOverlay({visible:true});
        $.ajax({
            type:'POST',
            url: FUNCIONES_BASEPATH_PROY+'adjuntar_req/adjuntos_acciones.php?action=deleteFile',
            data: params,
            dataType:'json',
            success: function( data ) {
                $('#main').procOverlay({visible:false});
                if(data.respuesta == 'OK'){
                    $("#form_adjuntar_"+p_rowid)[0].reset();
                    $("#form_adjuntar_"+p_rowid+" input").val(null);
                    $("#id_documento_"+p_rowid).val(null);

                }else{
                    mostrar_cuadro('E', 'Error', data.advert);
                }
                $('#adjuntos_grid').trigger('reloadGrid');
            }
        });
    }
</script>