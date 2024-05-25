<?php
$m_autoquery = $_POST['p_m_autoquery'];

$c_usuario = $_SESSION['usuario'];

$query = "SELECT p.d_perfil
			FROM usuarios u, usuarios_perfiles up, perfiles p
			WHERE u.c_usuario= up.c_usuario AND
				up.id_perfil= p.id_perfil AND
				upper(u.c_usuario) = upper(:c_usuario) AND
				p.d_perfil in ('AUT_MODIF_USU_COMPLETO')";

$db_query = new DB_Query($query);
$params = array(":c_usuario" => $c_usuario);
$row_query = $db_query->do_query($params);

if(count($row_query) > 0){
    $usu = "COMPLETO";
    $clonar_usuario = "OK";
}else{
    $usu = "RESTRINGIDO";
    $clonar_usuario = "NOOK";
}

require_once(INTRANET."header.php");
include_once(APLICACIONES."adm_usuarios/tabs.php");
include_once(APLICACIONES."adm_usuarios/css/tabs.css");

$ruta_grillas = BASEPATH_ENTORNO.'Aplicaciones/adm_usuarios/js/grillas.js';
$ruta_funciones = BASEPATH_ENTORNO.'Aplicaciones/adm_usuarios/js/funciones.js';
?>
<div id='div_busqueda'></div>
<br/>
<table id='main_grid' class='scroll' cellpadding='0' cellspacing='0'>
    <tr>
        <td>&nbsp;</td>
    </tr>
</table>
<div id='main_grid_pager' class='scroll' style='text-align:center;'></div>
<br />
<div id='tabs' hidden>
    <ul>
        <li data-grid='grid_ext'>
            <a  href='#externo' > Datos de Usuarios Externos </a>
        </li>
        <li data-grid='grid_int'>
            <a  href='#interno' > Datos de Usuarios Internos </a>
        </li>
    </ul>
    <div id='externo' class="row"></div>
    <div id='interno' class="row"></div>
</div>
<br/>
<div id='mensaje' hidden>
    <u>
        <b>NOTA:</b>
    </u>
    Para poder ingresar a las Pesta&ntilde;as de Datos de Usuarios, por favor seleccione primero un usuario de la grilla superior. Solo se habilitar&aacute;n las pesta&ntilde;as correspondientes al usuario seleccionado.
</div>

<?=tabs_mode('INTERNO');?>
<?=tabs_mode('EXTERNO');?>
<script type="text/javascript">
    var v_n_id_menu	= <?=$_POST['p_n_id_menu']?>;
</script>
<script type="text/javascript" src="<?=$ruta_grillas?>"></script>
<script type="text/javascript" src="<?=$ruta_funciones?>"></script>

<script type="text/javascript">
    //Accion de los botones reset
    function reset_user(user){
        $.post(	"adm_usuarios/abm_usuarios.php",
            {
                "oper":'reset',
                "c_usuario": user
            },
            function(data){
                info = eval('('+data+')');
                if(info.resultado == 'OK'){
                    /*llamar_report(
                        'CAMBIO_CLAVE',
                        'p_c_usuario|'+info.parametros[':c_usuario']+'&p_clave|'+info.pass,
                        'PDF'
                    );*/
					mostrar_cuadro('','Reinicio','Se efectuó correctamente el reinicio de clave de usuario. Recibirá un email con su nueva contraseña.');
                }else{
                    mostrar_cuadro('E','ERROR',info.resultado);
                }
            }
        );
    }

    function modificar_form_clone(tipo){
        switch(tipo){
            case 'INTERNO':
            case 'AMBOS':
                $('#d_denominacion_clone').attr('readonly',false);
                $('#d_denominacion_clone').val('');
                break;
            case 'EXTERNO':
                $('#d_denominacion_clone').attr('readonly',true);
                $('#d_denominacion_clone').val('');
                break;
        }
    }

    function establecerDenominacion(){
        var tipo = $("#c_tipo_usuario").val();
        var wrapper_id = "#td_d_denominacion_data";
        var data = "<input type='text' class='validate[required] FormElement ui-widget-content ui-corner-all' size='50' style='text-align:left;margin-left: 1%;' id='d_denominacion_clone' name='d_denominacion_clone' role='textbox'>";
        var data_error = "<div class='d_denominacion_cloneformError parentFormFrmGrid_main_grid formError inline' style='opacity: 0.87; position: relative; top: 0px; left: 0px; margin-top: 0px;'></div>";

        if (tipo == 'EXTERNO'){
            data = "<input type='text' class='validate[required] FormElement ui-widget-content ui-corner-all' size='50' style='text-align:left;width: 82% !important;margin-left: 1%;' id='d_denominacion_clone' name='d_denominacion_clone' role='textbox'>"+
                "<button id='lupa_d_denominacion_clone' type='button'>"+
                "<i class='ui-icon ui-icon-search'></i>"+
                "</button>";
        }

        $(wrapper_id).html(data+data_error);

        if (tipo == 'EXTERNO'){
            $('#lupa_d_denominacion_clone').lupa_generica({
                id_lista: '<?=fun_id_lista('LISTADO DE PERSONAS PARA USUARIOS');?>',
                titulos:['Nro. Documento','ID','Denominaci&oacute;n'],
                grid:[{index:'c_codigo',width:150},
                    {index:'c_dato',width:150},
                    {index:'d_dato',width:250}],
                caption:'Listado de Denominaci&oacute;n',
                sortname:'d_dato',
                sortorder:'asc',
                filtros:['null'],
                campos:{c_codigo:'codigo_clone',c_dato:'id_rel_persona_clone',d_dato:'d_denominacion_clone'},
                keyNav:true,
                foco:"#d_label"
            });
        }
    }

    // definición de objeto de grillas
    var datos_main_grid = new GridParam({id_menu:<?=$_POST['p_n_id_menu']?>,
        n_grid:0,
        m_autoquery:'<?=$m_autoquery?>',
        grid_childs_id:{
            'grid_menues_int':'#grid_menues_int',
            'grid_menues_ext':'#grid_menues_ext'
        }});

    var datos_grid_int = new GridParam({id_menu:<?=$_POST['p_n_id_menu']?>,
        n_grid:1,
        m_autoquery:'N'});

    var datos_grid_ext = new GridParam({id_menu:<?=$_POST['p_n_id_menu']?>,
        n_grid:1,
        m_autoquery:'N'});

    var c_usuario;
    var tipo_menu;
    var adm_usuarios_grid_0;
    var adm_usuarios_grid_1;
    var adm_usuarios_grid_2;
    var adm_usuarios_grid_3;
    var adm_usuarios_grid_4;
    var adm_usuarios_grid_5;
    var adm_usuarios_grid_6;
    var adm_usuarios_grid_7;
    var adm_usuarios_grid_8;
    var adm_usuarios_grid_9;

    $(document).ready(function() {

        inicializarObjetoGrilla(v_n_id_menu);

        $('#clone_div').show();
        $('#tabs').show();
        $('#mensaje').show();

        $('#externo').append('<?=tabs_mode('EXTERNO');?>');
        $('#interno').append('<?=tabs_mode('INTERNO');?>');

        //Guardamos si el usuario es EXTRANET o INTRANET
        var usuario = '<?=$usu?>';

        /***********************************************************************************************
         Comienzo Clonacion
         ***********************************************************************************************/
        var clonacion_html = "<div>"+
            "<div>"+
            "<table cellspacing='0' cellpadding='0' border='0' class='EditTable' style='width: 50%;'>"+
            "<tbody>"+
            "<tr >"+
            "<td class='CaptionTD' style='width: 20%;'><label>Usuario a Clonar:</label></td>"+
            "<td class='DataTD'>&nbsp;"+
            "<input type='hidden' id='clone_user'>"+
            "<input type='text' class='FormElement ui-widget-content ui-corner-all' id='d_usuario_clonar' style='width: 84% !important;'readonly=''>"+
            "<button type='button' id='lupa_clone_user' style='margin-left: 5px;'>"+
            "<i class='ui-icon ui-icon-search'></i>"+
            "</button>"+
            "</td>"+
            "<td>"+
            "<input type='hidden' name='id_rel_persona2' id='id_rel_persona2'  class='validate[required] text'/>"+
            "<input type='hidden' name='c_tipo_usuario' id='c_tipo_usuario'  class='validate[required] text'/>"+
            "</td>"+
            "</tr>"+
            "</tbody>"+
            "</table>"+
            "</div>"+
            "<div>"+
            "<form style='width:auto;position:relative;height:auto;' onsubmit='return false;' class='FormGrid' id='Frm_clone_user' name='Frm_clone_user' hidden>"+
            "</br>"+
            "<table cellspacing='0' cellpadding='0' border='0' class='EditTable' id='table_clone_user1' style='width: 100%;'>"+
            "<tbody>"+
            "<tr style='display:none' id='FormError'>"+
            "<td colspan='2' class='ui-state-error'></td>"+
            "</tr>"+
            "<tr class='tinfo' style='display:none'>"+
            "<td colspan='2' class='topinfo'></td>"+
            "</tr>"+
            "<tr rowpos='1' style='display:none' id='tr_id_rel_persona_clone'>"+
            "<td class='CaptionTD'>Id Contribuyente</td>"+
            "<td class='DataTD'>&nbsp;"+
            "<input type='text' class='validate[custom[onlyIntNumber],] FormElement ui-widget-content ui-corner-all' size='50' style='text-align:right' id='id_rel_persona_clone' name='id_rel_persona_clone' role='textbox'>"+
            "</td>"+
            "</tr>"+
            "<tr rowpos='2' id='tr_c_usuario_clone'>"+
            "<td class='CaptionTD'><label>Usuario(*)</label></td>"+
            "<td class='DataTD'>&nbsp;"+
            "<input type='text' class='validate[required] FormElement ui-widget-content ui-corner-all mayusculas' size='50' style='text-align:left;' id='c_usuario_clone' name='c_usuario_clone' role='textbox'>"+
            "<div class='c_usuario_cloneformError parentFormFrmGrid_main_grid formError inline' style='opacity: 0.87; position: relative; top: 0px; left: 0px; margin-top: 0px;'></div>"+
            "</td>"+
            "<td class='CaptionTD' style='width:105px;'><label>Fecha de Baja</label></td>"+
            "<td class='DataTD'>&nbsp;"+
            "<input id='f_baja_clone' class='validate[custom[validaFecha],] FormElement datepicker2 ui-widget-content ui-corner-all ' type='text' size='50' style='text-align:center' name='f_baja_clone' role='textbox'>"+
            "</td>"+
            "</tr>"+
            "<tr rowpos='3' id='tr_d_denominacion_clone'>"+
            "<td class='CaptionTD'><label>Denominaci&oacute;n(*)</label></td>"+
            "<td class='DataTD' id='td_d_denominacion_data'>&nbsp;"+
            "<input type='text' class='validate[required] FormElement ui-widget-content ui-corner-all' size='50' style='text-align:left' id='d_denominacion_clone' name='d_denominacion_clone' role='textbox'>"+
            "<div class='d_denominacion_cloneformError parentFormFrmGrid_main_grid formError inline' style='opacity: 0.87; position: relative; top: 0px; left: 0px; margin-top: 0px;'></div>"+
            "</td>"+

            "<td class='CaptionTD'><label>F. Caducidad Clave</label></td>"+
            "<td class='DataTD'>&nbsp;"+
            "<input id='f_caducidad_clave_clone' class='validate[required,custom[validaFecha]] FormElement datepicker2 ui-widget-content ui-corner-all' type='text' size='50' style='text-align:center' readonly='readonly' name='f_caducidad_clave' role='textbox'>"+
            "</td>"+
            "</tr>"+
            "<tr rowpos='4' id='tr_d_mail_clone'>"+
            "<td class='CaptionTD'><label>Mail</label></td>"+
            "<td class='DataTD'>&nbsp;"+
            "<input type='text' class='validate[custom[email],] FormElement ui-widget-content ui-corner-all' size='50' id='d_mail_clone' name='d_mail_clone' role='textbox'>"+
            "</td>"+

            "<td class='CaptionTD'><label>Sello</label></td>"+
            "<td class='DataTD'>&nbsp;"+
            "<input type='text' class='validate[,] FormElement ui-widget-content ui-corner-all' size='50' style='text-align:left' id='d_sello_clone' name='d_sello_clone' role='textbox'>"+
            "</td>"+
            "</tr>"+
            "<tr rowpos='5' >"+
            "<td colspan='4' style='text-align:center;' class='DataTD'><br>"+
            "<button id='btn_clonar_usuario' type='button'></button>"+
            "</td>"+
            "</tr>"+
            "<tr style='display:none'>"+
            "<td class='CaptionTD'></td>"+
            "<td class='DataTD' colspan='1'>"+
            "<input type='text' value='_empty' name='main_grid_id' id='id_g' class='FormElement'>"+
            "</td>"+
            "</tr>"+
            "</tbody>"+
            "</table>"+
            "</form>"+
            "</div>"+
            "</div>";

        // Creamos la busqueda
        $("#div_busqueda").crearBusquedaMasiva({
            p_n_id_menu:<?=$_POST['p_n_id_menu'];?>,
            afecta_grid:['main_grid'],
            afecta_url:['adm_usuarios/adm_usuarios_sql.php?tipo='+usuario+'&p_m_autoquery='+'N'],
            adv:'S',
            p_n_grid:0,
            titulo:'Busqueda de Usuarios',
            opciones: [
                {icono: "glyphicon glyphicon-user", id: "clonacion_usuario", contenido: clonacion_html}
            ]
        });

        $('#lupa_clone_user').lupa_generica({
            id_lista: '<?=fun_id_lista('LISTA DE USUARIOS');?>',
            titulos:['Usuario','Denominaci&oacute;n', 'Tipo Usuario', 'ID Persona'],
            grid:[{index:'c_codigo',width:200},
                {index:'d_descrip',width:400},
                {index:'c_tipo_usuario',hidden: true},
                {index:'id_rel_persona',hidden:true}],
            caption:'Lista de Usuarios',
            sortname:'c_codigo',
            sortorder:'asc',
            campos:{c_codigo:'clone_user',d_descrip:'d_usuario_clonar',c_tipo_usuario:'c_tipo_usuario', id_rel_persona:'id_rel_persona2'},
            onClose: function(){
                if($("#d_usuario_clonar").val() != ''){
                    establecerDenominacion();
                    $("#Frm_clone_user").show();
                } else {
                    $("#Frm_clone_user").hide();
                }
            }
        });

        $('#btn_clonar_usuario').button({
            text:true,
            label:'Clonar'
        });

        $('#btn_clonar_usuario').click(function(){
            if($('#Frm_clone_user').validationEngine('validate')){
                $.post(
                    'adm_usuarios/clonar_usuario_sql.php',
                    {
                        'user':$('#clone_user').val(),
                        'id_rel_persona':$('#id_rel_persona2').val(),
                        'user_clone':$("#c_usuario_clone").val(),
                        'id_rel_persona_clone':$('#id_rel_persona_clone').val(),
                        'd_denominacion':$("#d_denominacion_clone").val(),
                        'f_caducidad_clave':$('#f_caducidad_clave_clone').val(),
                        'd_mail':$('#d_mail_clone').val(),
                        'd_sello':$('#d_sello_clone').val(),
                        'f_baja':$('#f_baja_clone').val(),
                        'c_tipo_usuario':$('#c_tipo_usuario').val(),
                        'm_log':'N'
                    },
                    function(data) {
                        info = eval('('+data+')');
                        if(info.resultado != "OK"){
                            mostrar_cuadro('E', 'ERROR', 'Error al clonar el usuario, por favor intentelo mas tarde.</br></br></br>Motivos: '+info.resultado, function(){}, function(){}, 400, 200);
                        }else{
                            mostrar_cuadro('', 'AVISO', 'El usuario ha sido clonado con exito. Recibirá un email con su nueva contraseña.');

                            /*llamar_report(
                                'CAMBIO_CLAVE',
                                'p_c_usuario|'+info.parametros[':c_usuario']+'&p_clave|'+info.parametros[':c_clave'],
                                'PDF'
                            );*/
                            $("#main_grid").trigger("reloadGrid");

                            $('#clone_user').val('');
                            $("#c_usuario_clone").val('');
                            $("#d_denominacion_clone").val('');
                            $('#f_caducidad_clave_clone').val('');
                            $('#d_mail_clone').val('');
                            $('#d_sello_clone').val('');
                            $('#f_baja_clone').val('');
                            $('#id_rel_persona2').val('');
                            $('#id_rel_persona_clone').val('');
                            $('#c_tipo_usuario').val('');

                            $('#d_usuario_clonar').val('');
                            $('#clone_user').val('');

                            $("#Frm_clone_user").hide();
                        }
                    }
                );
            }
        });

        $('.datepicker2').datepicker({
            dateFormat:'dd/mm/yy',
            changeMonth:false,
            changeYear:false,
            dayNamesMin:['D', 'L', 'M', 'M', 'J', 'V', 'S'],
            monthNamesShort: ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'],
            monthNames: ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre']
        });

        $("#f_caducidad_clave_clone").datepicker("option", "minDate", new Date());
        $("#f_caducidad_clave_clone").datepicker("option", "maxDate", new Date());
        $("#f_caducidad_clave_clone").datepicker("setDate", new Date());
        $("#f_baja_clone").datepicker("option", "minDate", new Date());

        $('#btn_clonar').button({
            text:true,
            label:'Clonar Usuario'
        });

        $('#btn_clean').button({
            text:true,
            label:'Limpiar'
        });

        $('#clone_user').attr('readonly',true);

        $('#btn_clean').click(function(){
            $('#clone_user').val('');
        });

        /* **********************************************************************************************
        Fin Clonacion
        ***********************************************************************************************/

        /* *************************************************Definición de grilla 0**********************************************
         ***************************************************		Principal		 ******************************************** */

        var id_rel_persona;

        $("#main_grid").jqGrid({
            url:"adm_usuarios/adm_usuarios_sql.php?tipo="+usuario+"&p_m_autoquery="+'<?=$m_autoquery?>',
            colNames:datos_main_grid.colNames(),
            colModel:datos_main_grid.colModel(),
            pager: $('#main_grid_pager'),
            caption:"Administraci&oacute;n de Usuarios" ,
            postData:datos_main_grid.postData(),
            editurl: "adm_usuarios/abm_usuarios.php",
            sortname: 'c_usuario',
            sortorder: 'asc',
            onSelectRow:function(id){
                $( "#tabs" ).tabs( "option", "active", false );
                $(window).resize();
                c_usuario = $('#main_grid').getCell(id,"c_usuario");
                id_rel_persona = $('#main_grid').getCell(id,"id_rel_persona");
                var tipo_usuario = $('#main_grid').getCell(id,"d_tipo");

                $('#clone_user').val(c_usuario);
                $('#id_rel_persona2').val(id_rel_persona);
                modificar_form_clone(tipo_usuario);

                switch(tipo_usuario){
                    case 'INTERNO':
                        setea_parametros('#grid_menues_int',{'c_usuario':c_usuario, 'c_tipo_perfil': 'INT', 'c_tipo_autorizacion':'MENU'});
                        setea_parametros('#grid_permisos_int',{'c_usuario':c_usuario, 'c_tipo_perfil': 'INT', 'c_tipo_autorizacion':'PERMISO'});
                        setea_parametros_grid_extras(c_usuario, 'INT');
                        $('#edit_main_grid').show();
                        $( "#tabs" ).tabs( "option", "active", 1 );
                        $("#tabs").tabs( "disable" );
                        $("#tabs").tabs( "enable" , 1);
                        break;
                    case 'EXTERNO':
                        setea_parametros('#grid_menues_ext',{'c_usuario':c_usuario, 'c_tipo_perfil': 'EXT', 'c_tipo_autorizacion':'MENU'});
                        setea_parametros('#grid_permisos_ext',{'c_usuario':c_usuario, 'c_tipo_perfil': 'EXT', 'c_tipo_autorizacion':'PERMISO'});
                        setea_parametros_grid_extras(c_usuario, 'EXT');
                        $('#edit_main_grid').show();
                        $( "#tabs" ).tabs( "option", "active", 0 );
                        $("#tabs").tabs( "disable" );
                        $("#tabs").tabs( "enable" , 0);
                        break;
                    case 'AMBOS':
                        setea_parametros('#grid_menues_int',{'c_usuario':c_usuario, 'c_tipo_perfil': 'INT', 'c_tipo_autorizacion':'MENU'});
                        setea_parametros('#grid_permisos_int',{'c_usuario':c_usuario, 'c_tipo_perfil': 'INT', 'c_tipo_autorizacion':'PERMISO'});
                        setea_parametros_grid_extras(c_usuario, 'INT');
                        setea_parametros('#grid_menues_ext',{'c_usuario':c_usuario, 'c_tipo_perfil': 'EXT', 'c_tipo_autorizacion':'MENU'});
                        setea_parametros('#grid_permisos_ext',{'c_usuario':c_usuario, 'c_tipo_perfil': 'EXT', 'c_tipo_autorizacion':'PERMISO'});
                        setea_parametros_grid_extras(c_usuario, 'EXT');

                        $('#edit_main_grid').hide();
                        $( "#tabs" ).tabs( "option", "active", 0 );
                        $("#tabs").tabs( "disable" );
                        $("#tabs").tabs( "enable" , 0);

                        if(usuario == 'COMPLETO'){
                            $('#edit_main_grid').show();
                            $("#tabs").tabs( "enable" , 1);
                        }
                        break;
                }
            },
            loadComplete: function(data) {
                $( "#tabs" ).tabs( "option", "active", false );
                $("#tabs").tabs( "disable" );
                $('#clone_user').val('');
                $('#id_rel_persona2').val('');
            },
        }).navGrid('#main_grid_pager',
            {add:true, edit:true, del:false},
            {
                top:100,
                left: 400,
                width: 600,
                onInitializeForm: defaultInitForm(function(formid){
                    // Definición lupa personas Externas
                    $('#codigo',formid).lupa_generica({
                        titulos:['Documento','ID','Descripcion'],
                        grid:[	{index:'codigo',width:150},
                            {index:'c_dato',width:150},
                            {index:'d_dato',width:250}],
                        caption:'Lista de Personas',
                        sortname:'d_dato',
                        sortorder:'asc',
                        filtros:['null'],
                        campos:{codigo:'codigo',c_dato:'id_rel_persona',d_dato:'d_denominacion'},
                        keyNav:true,
                        foco:"#d_label",
                        onClose: function(){
                            if($( "#d_tipo" ).val() == 'EXTERNO' && $('#c_usuario').val() == ''){
                                $('#c_usuario').val($('#codigo').val());
                            }
                        }
                    });

                    $( "#d_tipo" ).change(function() {
                        cambioTipoUsuario();
                    });

                }),
                beforeShowForm: defaultBeforeShowForm(function(formid){
                    $("#nData").hide();
                    $("#pData").hide();
                    camposFormTipo();

                    $('#codigo').attr('disabled',true);
                    $('#codigo_lupa').hide();

                    $("#f_caducidad_clave",formid).datepicker("option", "minDate", null);
                    $("#f_caducidad_clave",formid).datepicker("option", "maxDate", null);
                    $("#f_caducidad_clave",formid).attr('readonly',false);
                    $("#f_baja",formid).datepicker("option", "minDate", new Date());
                    $("#tr_d_tipo").hide();
                    $('#c_usuario').attr('readonly',true);
                })

            },//edit,
            {
                top:100,
                left: 400,
                width: 600,
                onInitializeForm: defaultInitForm(function(formid){
                    // Definición lupa persona externa
                    $('#codigo',formid).lupa_generica({
                        titulos:['Documento','ID','Descripcion'],
                        grid:[	{index:'codigo',width:150},
                            {index:'c_dato',width:150},
                            {index:'d_dato',width:250}],
                        caption:'Lista de Personas',
                        sortname:'d_dato',
                        sortorder:'asc',
                        filtros:['null'],
                        campos:{codigo:'codigo',c_dato:'id_rel_persona',d_dato:'d_denominacion'},
                        keyNav:true,
                        foco:"#d_label",
                        onClose: function(){
                            if($( "#d_tipo" ).val() == 'EXTERNO' && $('#c_usuario').val() == ''){
                                $('#c_usuario').val($('#codigo').val());
                            }
                        }
                    });

                    $( "#d_tipo" ).change(function() {
                        cambioTipoUsuario();
                    });
                }),
                beforeShowForm: defaultBeforeShowForm(function(formid){
                    $('#codigo_lupa').show();
                    $('#codigo').attr('disabled',false);

                    if(usuario == 'RESTRINGIDO'){
                        $('#d_denominacion').attr('readonly',true);
                        $('#d_denominacion').val('');
                        $('#tr_codigo').show();
                        $('#codigo').val('');
                        $('#tr_d_tipo').hide();
                    }else{
                        $('#tr_d_tipo').show();
                        cambioTipoUsuario();
                    }

                    $("#f_caducidad_clave",formid).datepicker("option", "minDate", new Date());
                    $("#f_caducidad_clave",formid).datepicker("option", "maxDate", new Date());
                    $("#f_caducidad_clave",formid).datepicker("setDate", new Date());
                    $("#f_caducidad_clave",formid).attr('readonly',true);
                    $("#f_baja",formid).datepicker("option", "minDate", new Date());
                    $('#c_usuario').attr('readonly',false);
                }),
                closeAfterAdd: true,
                afterSubmit: function(response,postdata){
                    var res = $.parseJSON(response.responseText);
                    if(res.resultado != "OK"){
                        return[false,res.resultado];
                    }else{
                        if(res.pass != ''){
                            // llamamos al report

                            /*llamar_report(
                                'CAMBIO_CLAVE',
                                'p_c_usuario|'+res.parametros[':c_usuario']+'&p_clave|'+res.pass,
                                'PDF'
                            );*/
							mostrar_cuadro('','Alta de Usuario','Se efectuó correctamente el proceso de alta de usuario. Recibirá un email con su nueva contraseña.');

                        }
                        return[true,'']
                    }
                }
            },//add,
            {
                top:100,
                left: 400
            },//del
            {}//search
        );


        $("#grid_menues_int").jqGrid({
            colNames:datos_grid_int.colNames(),
            colModel:datos_grid_int.colModel(),
            pager: $('#grid_menues_int_pager'),
            caption:"Perfiles Asignados" ,
            postData:datos_grid_int.postData(),
            editurl: FUNCIONES_BASEPATH+"maestro_abm_grid.php",
            onSelectRow:function(){},
            autowidth:false,
            width:210,
            height: 155,
            shrinkToFit: true,
            rowNum:99999,
            rowList:99999,
            pgbuttons: false,
            pginput:false,
            recordpos:false
        }).navGrid('#grid_menues_int_pager',
            {add:true, edit:false, del:true},
            {},	//edit,
            {
                top:500,
                left: 0,
                width: 600,
                onInitializeForm: defaultInitForm(function(formid){
                    // Definición lupa Perfil
                    $('#d_perfil',formid).lupa_generica({
                        titulos:['ID','Descripcion'],
                        grid:[	{index:'id_perfil',width:150},
                            {index:'d_perfil',width:150}],
                        caption:'Perfiles / Autorizaciones',
                        sortname:'d_perfil',
                        sortorder:'asc',
                        filtros:['INT','MENU'],
                        campos:{id_perfil:'id_perfil',d_perfil:'d_perfil'},
                        keyNav:true,
                        foco:"#d_label"
                    });
                    //fin lupa tipo Perfil
                }),
                beforeShowForm: defaultBeforeShowForm(function(formid){
                    $('#c_usuario').val(c_usuario);
                    $(formid).validationEngine({
                        promptPosition:'inline'
                    });
                }),
                closeAfterAdd: true
            },	//add
            {	top:500	},	//del
            {}	//search
        );
        $("#grid_permisos_int").jqGrid({
            colNames:datos_grid_int.colNames(),
            colModel:datos_grid_int.colModel(),
            pager: $('#grid_permisos_int_pager'),
            caption:"Autorizaciones Asignadas" ,
            postData:datos_grid_int.postData(),
            editurl: FUNCIONES_BASEPATH+"maestro_abm_grid.php",
            onSelectRow:function(){},
            autowidth:false,
            width:210,
            height: 155,
            shrinkToFit: true,
            rowNum:99999,
            rowList:99999,
            pgbuttons: false,
            pginput:false,
            recordpos:false
        }).navGrid('#grid_permisos_int_pager',
            {add:true, edit:false, del:true},
            {}, //edit,
            {
                top:500,
                left: 0,
                width: 600,
                onInitializeForm: defaultInitForm(function(formid){
                    // Definición lupa Perfil
                    $('#d_perfil',formid).lupa_generica({
                        titulos:['ID','Descripcion'],
                        grid:[  {index:'id_perfil',width:150},
                            {index:'d_perfil',width:150}],
                        caption:'Perfiles / Autorizaciones',
                        sortname:'d_perfil',
                        sortorder:'asc',
                        filtros:['INT','PERMISO'],
                        campos:{id_perfil:'id_perfil',d_perfil:'d_perfil'},
                        keyNav:true,
                        foco:"#d_label"
                    });
                    //fin lupa tipo Perfil
                }),
                beforeShowForm: defaultBeforeShowForm(function(formid){
                    $('#c_usuario').val(c_usuario);
                    $(formid).validationEngine({
                        promptPosition:'inline'
                    });
                }),
                closeAfterAdd: true
            },  //add
            {   top:500  },  //del
            {}  //search
        );
        $("#grid_menues_ext").jqGrid({
            colNames:datos_grid_ext.colNames(),
            colModel:datos_grid_ext.colModel(),
            pager: $('#grid_menues_ext_pager'),
            caption:"Perfiles Asignados" ,
            postData:datos_grid_ext.postData(),
            editurl: FUNCIONES_BASEPATH+"maestro_abm_grid.php",
            onSelectRow:function(){},
            autowidth:false,
            width:210,
            height: 155,
            shrinkToFit: true,
            rowNum:99999,
            rowList:99999,
            pgbuttons: false,
            pginput:false,
            recordpos:false
        }).navGrid('#grid_menues_ext_pager',
            {add:true, edit:false, del:true},
            {},//edit,
            {
                top:500,
                left: 0,
                width: 600,
                onInitializeForm: defaultInitForm(function(formid){
                    // Definición lupa Perfil
                    $('#d_perfil',formid).lupa_generica({
                        titulos:['ID','Descripcion'],
                        grid:[	{index:'id_perfil',width:150},
                            {index:'d_perfil',width:150}],
                        caption:'Perfiles / Autorizaciones',
                        sortname:'d_perfil',
                        sortorder:'asc',
                        filtros:['EXT','MENU'],
                        campos:{id_perfil:'id_perfil',d_perfil:'d_perfil'},
                        keyNav:true,
                        foco:"#d_label"
                    });
                    //fin lupa tipo Perfil
                }),
                beforeShowForm: defaultBeforeShowForm(function(formid){
                    $('#c_usuario').val(c_usuario);
                    $(formid).validationEngine({
                        promptPosition:'inline'
                    });
                }),
                closeAfterAdd: true
            },	//add
            {	top:500	},	//del
            {}	//search
        );
        $("#grid_permisos_ext").jqGrid({
            colNames:datos_grid_ext.colNames(),
            colModel:datos_grid_ext.colModel(),
            pager: $('#grid_permisos_ext_pager'),
            caption:"Autorizaciones Asignadas" ,
            postData:datos_grid_ext.postData(),
            editurl: FUNCIONES_BASEPATH+"maestro_abm_grid.php",
            onSelectRow:function(){},
            autowidth:false,
            width:210,
            height: 155,
            shrinkToFit: true,
            rowNum:99999,
            rowList:99999,
            pgbuttons: false,
            pginput:false,
            recordpos:false
        }).navGrid('#grid_permisos_ext_pager',
            {add:true, edit:false, del:true},
            {},//edit,
            {
                top:500,
                left: 0,
                width: 600,
                onInitializeForm: defaultInitForm(function(formid){
                    // Definición lupa Perfil
                    $('#d_perfil',formid).lupa_generica({
                        titulos:['ID','Descripcion'],
                        grid:[  {index:'id_perfil',width:150},
                            {index:'d_perfil',width:150}],
                        caption:'Perfiles / Autorizaciones',
                        sortname:'d_perfil',
                        sortorder:'asc',
                        filtros:['EXT','PERMISO'],
                        campos:{id_perfil:'id_perfil',d_perfil:'d_perfil'},
                        keyNav:true,
                        foco:"#d_label"
                    });
                    //fin lupa tipo Perfil
                }),
                beforeShowForm: defaultBeforeShowForm(function(formid){
                    $('#c_usuario').val(c_usuario);
                    $(formid).validationEngine({
                        promptPosition:'inline'
                    });
                }),
                closeAfterAdd: true
            },  //add
            {   top:500 },  //del
            {}  //search
        );

        inicializarGrillas(v_n_id_menu);

        /* Seteamos el comportamiento de los tabs */
        $("#tabs").tabs({
            show: { effect: "fadeIn", duration: 250 },
            collapsible: true,
            active: false
        });

        //Solucion para que las grillas sean responsivas
        $("#ui-id-2").hover(function(){
            $(window).resize();
        });
        $("#ui-id-3").hover(function(){
            $(window).resize();
        });

    });

    function cambioTipoUsuario(){
        if($( "#d_tipo" ).val() == 'EXTERNO'){
            $('#d_denominacion').attr('readonly',true);
            $('#d_denominacion').val('');
            $('#tr_codigo').show();
            $('#codigo').val('');
        }else{
            $('#d_denominacion').attr('readonly',false);
            $('#d_denominacion').val('');
            $('#tr_codigo').hide();
            $('#codigo').val('');
        }
    }

    function camposFormTipo(){
        if($( "#d_tipo" ).val() == 'EXTERNO'){
            $('#d_denominacion').attr('readonly',true);
            $('#tr_codigo').show();
        }else{
            $('#d_denominacion').attr('readonly',false);
            $('#tr_codigo').hide();
        }
    }
</script>

<?php
require_once(INTRANET."footer.php");
?>
