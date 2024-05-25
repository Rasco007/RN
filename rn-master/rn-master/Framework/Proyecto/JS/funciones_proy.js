function funProy(){
	alert("Mensaje funciones_proy.js");
}

function limpia_cuit(cuit){
    var result;
    result=cuit.replace('-','');
    result=result.replace('-','');
    return result;
}

function formatear_numero(numero, decimales){
    formater = new Intl.NumberFormat('de-DE', {minimumFractionDigits: decimales,maximumFractionDigits: decimales});
    return(formater.format(numero));
}


function config_pdf(tmp_pager_id, grid_id){
    $('#dialog_tipo_informe_'+tmp_pager_id+' .bt_excel').show();
    $('#dialog_tipo_informe_'+tmp_pager_id+' .bt_pdf').hide();
    $('#dialog_tipo_informe_'+tmp_pager_id+' .orientacion').show();
    $('#dialog_tipo_informe_'+tmp_pager_id+' .enlaces').show();
    $('#dialog_tipo_informe_'+tmp_pager_id+' .lbl_orientacion').show();
    $('#dialog_tipo_informe_'+tmp_pager_id+' .genera_pdf').show();
    $('#dialog_tipo_informe_'+tmp_pager_id+' .content_list_pdf').show();
    $('#dialog_tipo_informe_'+tmp_pager_id+' .cancelar_pdf').show();
    $('#dialog_tipo_informe_'+tmp_pager_id+' .add_comentario').show();

    var id_ar = new Array();

    var a = $("#"+grid_id).jqGrid("getGridParam", "colModel");

    var i = 0;
    var tipos_a_no_exportar = ['HTML'];

    $('#gview_'+grid_id+' [role=columnheader]').each(function(){
        if( $(this).is(':visible') && (!$(this).parents('.ui-search-toolbar').length) && (!$(this).parents('.frozen-div').length)  ){
            if (!tipos_a_no_exportar.includes(a[i].frmwktype)){
                var v_id = $(this).attr('id').replace(grid_id+'_','');
                v_id = v_id.replace('jqgh_', ''); //nuevo de jqgrid
                if(a[i].formoptions != undefined){
                    var v_label = a[i].formoptions.label.replace('(*)','').replace(/<br>/g,' ').replace(/<br\/>/g,' ');
                    id_ar.push({id:v_id, label:v_label });
                }
            }
        }
        i++;
    });

    //console.log(id_ar);
    var mitad_lista = parseInt(id_ar.length/2);
    var html_list = '<div class="col-md-6"><ul class="list_pdf list-group">';
    for(i=0; i<id_ar.length; i++){
        //alert(id_ar[i]['id']);
        html_list += '<li class="list-group-item"><span class="badge">'+(i+1)+'</span><input id="chk_'+grid_id+'_'+id_ar[i]['id']+'" class="col_imprimir" columna="'+id_ar[i]['id']+'" type="checkbox" checked="checked" /><label for="chk_'+grid_id+'_'+id_ar[i]['id']+'">'+id_ar[i]['label']+'</label></li>';
        if((i+1) == mitad_lista){
            html_list += '</ul></div><div class="col-md-6"><ul class="list_pdf list-group">';
        }
    }
    html_list += '</ul></div>';
    $('#dialog_tipo_informe_'+tmp_pager_id+' .content_list_pdf').html(html_list);
}
/* Para tener en cuenta si utilizamos notificaciones 
function carga_toast_option(){
   return toastr.options = {
        "closeButton": true,
        "debug": false,
        "newestOnTop": false,
        "progressBar": true,
        "positionClass": "toast-top-full-width",
        "preventDuplicates": false,
        "onclick": null,
        "showDuration": "1500",
        "hideDuration": "1000",
        "timeOut": "8000",
        "extendedTimeOut": "2000",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut"
      }
}*/

//redefinicion de la funcion newMenu para que los menus del SIAT se abran en una nueva pestaña
function newMenu(idMenu){    
    var target = '';    
    var url = $('#id_li_'+idMenu+' a.nav-link').attr("data-url");
    var param = JSON.parse($('#id_li_'+idMenu+' a.nav-link').attr("data-param"));
    param.p_n_id_menu = idMenu;
    if(url.search('SESSIONID') > 0 || url.search('#') > 0){
        valida_timeout().done(function(result){
                target = '_blank';
                post_to_url(url, param, target, 'POST');
            }).fail(function () {
                console.log('Timeout');
            }
        );
        
    }else{
        post_to_url(url, param, target, 'POST');
    }   
    
}


function addLeadingZeros (n, length)
{
    var str = (n > 0 ? n : -n) + "";
    var zeros = "";
    for (var i = length - str.length; i > 0; i--)
        zeros += "0";
    zeros += str;
    return n >= 0 ? zeros : "-" + zeros;
}

function valida_timeout(){
    return $.ajax({
        type: "POST",
        url: FUNCIONES_BASEPATH_PROY + "dummy.php",
        dataType: "json"        
    });
}

/*Nueva funcion de mensajes
    tipo : (I -> Información
            V -> Validacion
            C o Q -> Pregunta
            E -> Error
            S -> Success
            Default -> nada)
    titutlo : titulo del modal
    descripcion: mensaje
    fun_acepta: funcion a ejecutar al tocar el boton "OK". Debe escribir function(){ aca codigo a ejecutar }
    fun_cancela: funcion a ejecutar al tocar el boton "CANCELAR". Debe escribir function(){ aca codigo a ejecutar }
    tituloOtroBoton: descripcion del otro boton
    fun_otro_boton: funcion a ejecutar al tocar el boton "OTROBOTON". Debe escribir function(){ aca codigo a ejecutar }
    w: ancho definido en PX del dialogo 
*/
function mostrar_mensaje_modal(tipo,titulo,descripcion,fun_acepta,fun_cancela,tituloOtroBoton,fun_otro_boton,w){
    var icon;
    var type;
    var columnClass;

    switch (tipo) {
        case 'I': //información
            icon= 'glyphicon glyphicon-info-sign';
            type='blue';
            break;
        case 'V': //validación
            icon= 'glyphicon glyphicon-exclamation-sign';
            type='orange';
            break;
        case 'C': //Pregunta
        case 'Q': //Question
            icon='glyphicon glyphicon-question-sign';
            type='blue';
            break;       
        case 'E': //Error
            icon= 'glyphicon glyphicon-ban-circle';
            type='red';
            break;
        case 'S': // confirmación (Success)
            icon= 'glyphicon glyphicon-ok-circle';
            type='green';
            break;
        default:
            icon='';
            type='';
            break;
    }
    
    switch (true){
        case (w > 800):
            columnClass= 'xlarge';
            break;
        case (w > 600 && w <= 800) :
            columnClass= 'large';
            break;
        case (w <= 600 && w > 300):
            columnClass= 'medium';
            break;
        default:
            columnClass= 'small';
            break;
    }

    var botones = {
        ACEPTAR: function(){
        }
    }

    if (fun_acepta != null && fun_acepta != ''){
        //agrego botones
        $.extend(
			botones, 
			{ 
				ACEPTAR: function(){
					if (typeof(fun_acepta) === "function"){
						fun_acepta();
					}
				}
			}
		);
    }

    if(fun_cancela != null && fun_cancela != ''){
        $.extend(
			botones, 
			{ 
				CANCELAR: function(){
					if (typeof(fun_cancela) === "function"){
						fun_cancela();
					}
				}
			}
		);
    }

    if(fun_otro_boton != null && fun_otro_boton != ''){
        $.extend(botones, { OtroBoton: {
                                text:tituloOtroBoton,
                                action: fun_otro_boton
        }});
    }

    var JQalert = $.confirm({
        title: titulo,
        icon: icon,
        content: descripcion,
        type: type,
        columnClass:columnClass,
        theme:'modern',
        typeAnimated: true,
        backgroundDismiss: true,
        backgroundDismissAnimation: 'shake',
        escapeKey:true,
        useBootstrap:true,
        buttons: botones        
    });

}

function llamar_report_firma(c_tipo_reporte, param, c_impresion, filtros = null, p_nombre_export = null){
	if(c_impresion == null || c_impresion == 'undefined' || c_impresion == ''){
		c_impresion = 'PDF';
	}
	
	if(param == null || param == 'undefined'){
		param = '';
	}
	
	$.post(
		FUNCIONES_BASEPATH+"llamar_report.php",
		{
			"c_tipo_report":c_tipo_reporte,
			"parametros":param,
			"server_name": window.location.hostname,
			'c_impresion':c_impresion,
            'filtros': filtros
		},
		function(data_rep){
			var ret = eval('('+data_rep+')');
			var d_name_export = 'document';
			if(p_nombre_export != null){
				d_name_export = p_nombre_export;
			}
			else{
				if (ret.d_nombre_export != null){
					d_name_export = ret.d_nombre_export;
				}
			}
			
			if (ret.formats.length <= 1 ) {
				window.open(
					FUNCIONES_BASEPATH+'reporte_firma.php?id_sesion='+ret.id_session+'&c_impresion='+c_impresion+'&format=PDF&name='
					+d_name_export+'.pdf',
					"",
					"scrollbars=yes, menubar=no,resizable=no,directories=no,location=no"
				);
			}
		}
	);
}

function llamar_report_file(c_tipo_reporte, param, c_impresion, filtros = null, p_nombre_export = null){
    if(c_impresion == null || c_impresion == 'undefined' || c_impresion == ''){
        c_impresion = 'PDF';
    }
    if(param == null || param == 'undefined'){
        param = '';
    }
    $.post(
        FUNCIONES_BASEPATH+"llamar_report.php",
        {
            "c_tipo_report":c_tipo_reporte,
            "parametros":param,
            "server_name": window.location.hostname,
            'c_impresion':c_impresion,
            'filtros': filtros
        },
        function(data_rep){
            var ret = eval('('+data_rep+')');
            var d_name_export = 'document';
            if(p_nombre_export != null){
                d_name_export = p_nombre_export;
            }
            else{
                if (ret.d_nombre_export != null){
                    d_name_export = ret.d_nombre_export;
                }
            }

            window.open(
                FUNCIONES_BASEPATH_PROY+'reporte_file.php?id_sesion='+ret.id_session+'&c_impresion='+c_impresion+'&format=PDF&name='
                +d_name_export+'.pdf',
                "_blank",
                "scrollbars=yes, menubar=no,resizable=no,directories=no,location=no"
            );
        }
    );
}