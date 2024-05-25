function ver_img(c_codigo){
	$('#main').procOverlay({visible:true});

    $.post("abm_imagen/abm_imagen_body.php",{"c_codigo":c_codigo},
        function(data){
			$('#main').procOverlay({visible:false});
            if(data != null){
                if(data.resultado == 'OK'){
                    $("#contenedor_imagen_ampliada #img_contenedor").remove();
					var time = new Date().getTime();
                    $("#contenedor_imagen_ampliada").html('<img id="img_contenedor" ' +
                        'style=" max-width: 500px;' +
                        'max-height: 500px; ' +
                        'margin-left:auto;' +
                        'margin-right:auto;' +
                        'display: block;' +
                        '" src="'+BASEPATH_ENTORNO+'/archivos_tmp/'+data.nombre_archivo+'?v='+time+'">');
					$('#ver_img').modal("show");
                }else{

                    $("#contenedor_imagen_ampliada #img_contenedor").remove();
                }
            }
        },"json");
}

function carga_imagen(c_codigo){
    $("#cargar_img").data('codigo',c_codigo);
	$("#cargar_img").modal('show');
}

function fun_guarda_archivo(oper,archivo,c_codigo){
		$('#main').procOverlay({visible:true});
        $.ajaxFileUpload({
        url:'abm_imagen/blob_abm.php?c_codigo='+c_codigo+
        '&oper='+'add',
        secureuri:false,
        fileElementId:'archivo',
        dataType: 'json',
        success: function (data, status) {
			$('#main').procOverlay({visible:false});
			data = eval('('+data+')');
			if(data.resultado != 'OK'){
                mostrar_error(data.resultado);
            }else{
                mostrar_cuadro('I','Información','Carga de imagen exitosa');
            }
        
			$('#cargar_img').modal('hide');
			$("#main_grid").jqGrid("clearGridData", true);
			$('#main_grid').trigger('reloadGrid');
		
		},

        error: function (data, status, e) {
			$('#main').procOverlay({visible:false});
            mostrar_cuadro('E','Error','<p style="margin:0;" align="left">Error al subir el archivo<br /><b>Status:</b> '+ status
                +'<br /><b>Error:</b> '+e+'</p>');
			
			$('#cargar_img').modal('hide');
			$("#main_grid").jqGrid("clearGridData", true);
			$('#main_grid').trigger('reloadGrid');
		}
		
    });
}

function cambiar_img(c_codigo){
    $("#cargar_img").data('codigo',c_codigo);
	$("#cargar_img").modal('show');
}
