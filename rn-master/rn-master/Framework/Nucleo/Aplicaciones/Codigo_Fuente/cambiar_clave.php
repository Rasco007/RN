<?php
/*
error_reporting(E_ALL);
ini_set('display_errors', '1');
*/
if(isset($_SESSION['c_usuario'])){
    $usuario2 = $_SESSION['c_usuario'];	
}else{
   session_destroy();
   header ("Location: ../index.php?error=nolog");
}
$parametros = null;
$db_query = new DB_Query("SELECT c_tecla, c_tecla_izquierda, c_tecla_derecha  FROM param_teclado");

$teclado = json_encode($db_query->do_query($parametros));

$menu="<ul id='nav' class='ruta'><li><a href='javascript:void(0)' name='../index.php?error=nolog'>Salir</a></li></ul>";

require_once(INTRANET."header.php");
?>
<style>
	#clave_ant_aux{height:18px; width: 243px;}
	#clave_nue_aux{height:18px; width: 150px;}
	#clave_nue2_aux{height:18px; width: 243px;}
	#clave_submit_aux{margin-right: 10px;}
	#status_bar{width:248px;}
	
	#tbl_form_cambio_clave{width: 409px; margin: 25px 25px auto;}
	#msj_info{width: 95%; margin: 25px auto;}
</style>
<script type="text/javascript">

var teclado = <?=$teclado?>;//obtener_teclado();

function fun_prueba(){
    window.location="../index.php";
}

<?=$jquery_panel?>

$(document).tooltip().ready(function() {
	var content="<br/><div class='titlebar' style='font-size:97%; width:98.4%;'><span class='ui-jqgrid-title'>Cambio de Clave</span></div>"+
            "<div class='search' style='width:98.9%;'>"+
				"<table id='tbl_form_cambio_clave'><tr>"+
					"<td>Clave Anterior</td>"+
					"<td><input name='clave_ant_aux' value = '<?=$clave_anterior?>' id='clave_ant_aux' type='password' class='validate[required] text'></td>"+
				"</tr><tr>"+
					"<td>Nueva Clave</td>"+
					"<td>"+
						"<input name='clave_nue_aux' id='clave_nue_aux' type='password' class='validate[required,minSize[8],maxSize[20]] text' maxlength='20'>"+
						"<button type='button' id='btn_cc_generar_clave_cambio_clave'></button>"+				
					"</td>"+				
	            "</tr><tr id='tr_seguridad' hidden>"+					
					"<td>Seguridad de la Clave</td><td style=''>"+
						"<div id='status_bar' class='status_bar' title='Para aumentar el nivel de seguridad ingrese min&uacute;sculas, may&uacute;sculas, n&uacute;meros o m&aacute;s de 8 car&aacute;cteres.' style='float:left;'>"+
							"<div id='status_low' style='width:33%;float:left;' class='status_low'>&nbsp;"+
							"</div>"+	
							"<div id='status_medium' style='width:33%;float:left;text-align:center;' class=''>"+
								"<label id='lbl_status'>Baja</label>"+
							"</div>"+	
							"<div id='status_high' style='width:34%;float:left;' class=''>&nbsp;"+
							"</div>"+	
						"</div>"+											
					"</td>"+					
	            "</tr><tr>"+
					"<td>Reingresar Nueva Clave</td>"+
					"<td><input name='clave_nue2_aux' id='clave_nue2_aux' type='password' class='validate[required],minSize[8],maxSize[20]] text' maxlength='20' readonly></td>"+
				"</tr><tr>"+
					"<td colspan=2 align=right><button id='clave_submit_aux' name='clave_submit_aux' type='button'></button></td>"+
			    "</tr></table>"+
				'<div id="msj_info">'+
				'	<ol style="padding-left:15px;">'+
				'		<li>La contrase&ntilde;a deber&aacute; poseer como m&iacute;nimo 8 caracteres de longitud.</li>'+
				'		<li>La contrase&ntilde;a debe contener d&iacute;gitos, letras (Mayuscula y Minuscula).</li>'+
				'		<li>La contrase&ntilde;a no debe contener secuencias b&aacute;sicas de teclado (por ejemplo: "qwerty", "asdf" o las t&iacute;picas en numeraci&oacute;n: "1234" &oacute; "98765").</li>'+
				'		<li>La contrase&ntilde;a no deber&aacute; ser igual que la contrase&ntilde;a anterior. </li>'+
				'	</ol>'+
				'</div>'+
            "</div>";
				
	$('#main').append(content);
	
    $('#clave_submit_aux').button({
		text:true,
		label:'Guardar Cambios',
		icons: {
				primary: "ui-icon-disk"
		}
	});
	
    $('#nav').remove();

	$('#clave_ant_aux, #clave_nue2_aux').keyup(function( e ){
		if(e.keyCode == 13)passEncript();
	});	

	$('#clave_nue_aux').keyup(function( e ){
		if(e.keyCode == 13)passEncript();

		var _0xa40f=["<?=ESC_BAR?>x43<?=ESC_BAR?>x6C<?=ESC_BAR?>x61<?=ESC_BAR?>x76<?=ESC_BAR?>x65<?=ESC_BAR?>x41<?=ESC_BAR?>x65<?=ESC_BAR?>x73<?=ESC_BAR?>x32<?=ESC_BAR?>x30<?=ESC_BAR?>x31<?=ESC_BAR?>x35<?=ESC_BAR?>x44<?=ESC_BAR?>x69<?=ESC_BAR?>x61<?=ESC_BAR?>x6C<?=ESC_BAR?>x6F<?=ESC_BAR?>x67<?=ESC_BAR?>x49<?=ESC_BAR?>x6E<?=ESC_BAR?>x74<?=ESC_BAR?>x72<?=ESC_BAR?>x61","<?=ESC_BAR?>x76<?=ESC_BAR?>x61<?=ESC_BAR?>x6C","<?=ESC_BAR?>x23<?=ESC_BAR?>x70<?=ESC_BAR?>x61<?=ESC_BAR?>x73<?=ESC_BAR?>x73<?=ESC_BAR?>x5F<?=ESC_BAR?>x61<?=ESC_BAR?>x63<?=ESC_BAR?>x74<?=ESC_BAR?>x75<?=ESC_BAR?>x61<?=ESC_BAR?>x6C","<?=ESC_BAR?>x65<?=ESC_BAR?>x6E<?=ESC_BAR?>x63<?=ESC_BAR?>x72<?=ESC_BAR?>x79<?=ESC_BAR?>x70<?=ESC_BAR?>x74","<?=ESC_BAR?>x23<?=ESC_BAR?>x70<?=ESC_BAR?>x61<?=ESC_BAR?>x73<?=ESC_BAR?>x73<?=ESC_BAR?>x5F<?=ESC_BAR?>x6E<?=ESC_BAR?>x75<?=ESC_BAR?>x65<?=ESC_BAR?>x76<?=ESC_BAR?>x61","<?=ESC_BAR?>x23<?=ESC_BAR?>x70<?=ESC_BAR?>x61<?=ESC_BAR?>x73<?=ESC_BAR?>x73<?=ESC_BAR?>x5F<?=ESC_BAR?>x6E<?=ESC_BAR?>x75<?=ESC_BAR?>x65<?=ESC_BAR?>x76<?=ESC_BAR?>x61<?=ESC_BAR?>x5F<?=ESC_BAR?>x72<?=ESC_BAR?>x65<?=ESC_BAR?>x70"];var password=_0xa40f[0];var blocksize=256;var pass_vieja=AES[_0xa40f[3]]($(_0xa40f[2])[_0xa40f[1]](),password,blocksize);var pass_nueva=AES[_0xa40f[3]]($(_0xa40f[4])[_0xa40f[1]](),password,blocksize);var pass_nueva_rep=AES[_0xa40f[3]]($(_0xa40f[5])[_0xa40f[1]](),password,blocksize);

		if($('#clave_nue_aux').val().length > 0)
			$('#tr_seguridad').show();
		else
			$('#tr_seguridad').hide();		

		var level = check_security_level($('#clave_nue_aux').val(),pass_nueva,teclado);

		$('#clave_aux').val($(this).val());

	});		

	$('#clave_nue_aux').change(function(){
		if($(this).val() != ''){
			$('#clave_nue2_aux').attr('readonly',false);
		}
		else{
			$('#clave_nue2_aux').attr('readonly',true);
		}
	});	
	
	$('#btn_generar_clave_cambio_clave').button({
		text:true,
		label:'Generar',
		icons: {
				primary: "ui-icon-gear"
		}
	})
	.click(function(){
		sugerirClaveCambiarClave();
	});


	$('#clave_submit_aux').click(function(){
		var _0x5f29=["<?=ESC_BAR?>x43<?=ESC_BAR?>x6C<?=ESC_BAR?>x61<?=ESC_BAR?>x76<?=ESC_BAR?>x65<?=ESC_BAR?>x41<?=ESC_BAR?>x65<?=ESC_BAR?>x73<?=ESC_BAR?>x32<?=ESC_BAR?>x30<?=ESC_BAR?>x31<?=ESC_BAR?>x35<?=ESC_BAR?>x44<?=ESC_BAR?>x69<?=ESC_BAR?>x61<?=ESC_BAR?>x6C<?=ESC_BAR?>x6F<?=ESC_BAR?>x67","<?=ESC_BAR?>x76<?=ESC_BAR?>x61<?=ESC_BAR?>x6C","<?=ESC_BAR?>x23<?=ESC_BAR?>x63<?=ESC_BAR?>x6C<?=ESC_BAR?>x61<?=ESC_BAR?>x76<?=ESC_BAR?>x65<?=ESC_BAR?>x5F<?=ESC_BAR?>x61<?=ESC_BAR?>x6E<?=ESC_BAR?>x74<?=ESC_BAR?>x5F<?=ESC_BAR?>x61<?=ESC_BAR?>x75<?=ESC_BAR?>x78","<?=ESC_BAR?>x65<?=ESC_BAR?>x6E<?=ESC_BAR?>x63<?=ESC_BAR?>x72<?=ESC_BAR?>x79<?=ESC_BAR?>x70<?=ESC_BAR?>x74","<?=ESC_BAR?>x23<?=ESC_BAR?>x63<?=ESC_BAR?>x6C<?=ESC_BAR?>x61<?=ESC_BAR?>x76<?=ESC_BAR?>x65<?=ESC_BAR?>x5F<?=ESC_BAR?>x6E<?=ESC_BAR?>x75<?=ESC_BAR?>x65<?=ESC_BAR?>x5F<?=ESC_BAR?>x61<?=ESC_BAR?>x75<?=ESC_BAR?>x78","<?=ESC_BAR?>x23<?=ESC_BAR?>x63<?=ESC_BAR?>x6C<?=ESC_BAR?>x61<?=ESC_BAR?>x76<?=ESC_BAR?>x65<?=ESC_BAR?>x5F<?=ESC_BAR?>x6E<?=ESC_BAR?>x75<?=ESC_BAR?>x65<?=ESC_BAR?>x32<?=ESC_BAR?>x5F<?=ESC_BAR?>x61<?=ESC_BAR?>x75<?=ESC_BAR?>x78"];
		var password=_0x5f29[0];
		var blocksize=256;
		var pass_vieja=AES[_0x5f29[3]]($(_0x5f29[2])[_0x5f29[1]](),password,blocksize);
		var pass_nueva=AES[_0x5f29[3]]($(_0x5f29[4])[_0x5f29[1]](),password,blocksize);
		var pass_nueva_rep=AES[_0x5f29[3]]($(_0x5f29[5])[_0x5f29[1]](),password,blocksize)

		//guarda contrase&ntilde;a nueva
		$.post('<?=APP_FMK_BASEPATH?>'+"cambio_clave/cambio_clave_abm.php",
		 	{
				 "c_usuario":'<?=$_SESSION['usuario']?>',
				 "pass_vieja":pass_vieja,
				 "pass_nueva":pass_nueva,
				 "pass_nueva_rep":pass_nueva_rep
		 	},
		 	function(data){
				info = eval('('+data+')');
				if (info.resultado != 'OK'){
					mostrar_error(info.resultado);
				}
				else{
					mostrar_cuadro('A',
						'Informacion','Se ha modificado la contrase&ntilde;a correctamente',
						function(){
		 					post_to_url('<?=BASEPATH_ENTORNO?>index.php',
								{
									'p_m_cambio_clave':'S'
								},
								'_self',
								'POST')
		 				}
		 			);
		 		}
		 	}
		 );
	});

});

<?php
/*
    Pagina para obfuscar => http://www.javascriptobfuscator.com/Javascript-Obfuscator.aspx
    Este codigo es el que esta obfuscado arriba, se debe modificiar este codigo, luego obfuscar y reemplazalo arriba.
    //guarda contrasena nueva
var password = 'ClaveAes2015Dialog';
var blocksize = 256;   // can be 128, 192 or 256
var pass_vieja = AES.encrypt( $('#clave_ant_aux').val(), password, blocksize );
var pass_nueva = AES.encrypt( $('#pass_nueva').val(), password, blocksize );
var pass_nueva_rep = AES.encrypt( $('#pass_nueva_rep').val(), password, blocksize );*/
?>

var _0x8953=["<?=ESC_BAR?>x76<?=ESC_BAR?>x61<?=ESC_BAR?>x6C<?=ESC_BAR?>x69<?=ESC_BAR?>x64<?=ESC_BAR?>x61<?=ESC_BAR?>x74<?=ESC_BAR?>x65","<?=ESC_BAR?>x76<?=ESC_BAR?>x61<?=ESC_BAR?>x6C<?=ESC_BAR?>x69<?=ESC_BAR?>x64<?=ESC_BAR?>x61<?=ESC_BAR?>x74<?=ESC_BAR?>x69<?=ESC_BAR?>x6F<?=ESC_BAR?>x6E<?=ESC_BAR?>x45<?=ESC_BAR?>x6E<?=ESC_BAR?>x67<?=ESC_BAR?>x69<?=ESC_BAR?>x6E<?=ESC_BAR?>x65","<?=ESC_BAR?>x23<?=ESC_BAR?>x63<?=ESC_BAR?>x6C<?=ESC_BAR?>x61<?=ESC_BAR?>x76<?=ESC_BAR?>x65<?=ESC_BAR?>x5F<?=ESC_BAR?>x61<?=ESC_BAR?>x6E<?=ESC_BAR?>x74<?=ESC_BAR?>x5F<?=ESC_BAR?>x61<?=ESC_BAR?>x75<?=ESC_BAR?>x78","<?=ESC_BAR?>x23<?=ESC_BAR?>x63<?=ESC_BAR?>x6C<?=ESC_BAR?>x61<?=ESC_BAR?>x76<?=ESC_BAR?>x65<?=ESC_BAR?>x5F<?=ESC_BAR?>x6E<?=ESC_BAR?>x75<?=ESC_BAR?>x65<?=ESC_BAR?>x5F<?=ESC_BAR?>x61<?=ESC_BAR?>x75<?=ESC_BAR?>x78","<?=ESC_BAR?>x23<?=ESC_BAR?>x63<?=ESC_BAR?>x6C<?=ESC_BAR?>x61<?=ESC_BAR?>x76<?=ESC_BAR?>x65<?=ESC_BAR?>x5F<?=ESC_BAR?>x6E<?=ESC_BAR?>x75<?=ESC_BAR?>x65<?=ESC_BAR?>x32<?=ESC_BAR?>x5F<?=ESC_BAR?>x61<?=ESC_BAR?>x75<?=ESC_BAR?>x78","<?=ESC_BAR?>x76<?=ESC_BAR?>x61<?=ESC_BAR?>x6C","<?=ESC_BAR?>x43<?=ESC_BAR?>x61<?=ESC_BAR?>x6D<?=ESC_BAR?>x62<?=ESC_BAR?>x69<?=ESC_BAR?>x61<?=ESC_BAR?>x72<?=ESC_BAR?>x49<?=ESC_BAR?>x6E<?=ESC_BAR?>x74<?=ESC_BAR?>x72<?=ESC_BAR?>x61<?=ESC_BAR?>x32<?=ESC_BAR?>x30<?=ESC_BAR?>x31<?=ESC_BAR?>x35","<?=ESC_BAR?>x65<?=ESC_BAR?>x6E<?=ESC_BAR?>x63<?=ESC_BAR?>x72<?=ESC_BAR?>x79<?=ESC_BAR?>x70<?=ESC_BAR?>x74","<?=ESC_BAR?>x23<?=ESC_BAR?>x63<?=ESC_BAR?>x6C<?=ESC_BAR?>x61<?=ESC_BAR?>x76<?=ESC_BAR?>x65<?=ESC_BAR?>x5F<?=ESC_BAR?>x61<?=ESC_BAR?>x6E<?=ESC_BAR?>x74","<?=ESC_BAR?>x23<?=ESC_BAR?>x63<?=ESC_BAR?>x6C<?=ESC_BAR?>x61<?=ESC_BAR?>x76<?=ESC_BAR?>x65<?=ESC_BAR?>x5F<?=ESC_BAR?>x6E<?=ESC_BAR?>x75<?=ESC_BAR?>x65","<?=ESC_BAR?>x23<?=ESC_BAR?>x63<?=ESC_BAR?>x6C<?=ESC_BAR?>x61<?=ESC_BAR?>x76<?=ESC_BAR?>x65<?=ESC_BAR?>x5F<?=ESC_BAR?>x6E<?=ESC_BAR?>x75<?=ESC_BAR?>x65<?=ESC_BAR?>x32","<?=ESC_BAR?>x73<?=ESC_BAR?>x75<?=ESC_BAR?>x62<?=ESC_BAR?>x6D<?=ESC_BAR?>x69<?=ESC_BAR?>x74","<?=ESC_BAR?>x23<?=ESC_BAR?>x66<?=ESC_BAR?>x72<?=ESC_BAR?>x6D<?=ESC_BAR?>x5F<?=ESC_BAR?>x63<?=ESC_BAR?>x61<?=ESC_BAR?>x6D<?=ESC_BAR?>x62<?=ESC_BAR?>x69<?=ESC_BAR?>x6F<?=ESC_BAR?>x5F<?=ESC_BAR?>x63<?=ESC_BAR?>x6C<?=ESC_BAR?>x61<?=ESC_BAR?>x76<?=ESC_BAR?>x65"];

<?
/*
	Pagina para obfuscar => http://www.javascriptobfuscator.com/Javascript-Obfuscator.aspx
	Esta funcion es la que esta obfuscada arriba, se debe modificiar esta, luego obfuscar y reemplazar el codigo obfuscado arriba.
function passEncript(){
	var clave_ant_aux = $('#clave_ant_aux').validationEngine('validate');
	var clave_nue_aux = $('#clave_nue_aux').validationEngine('validate');
	var clave_nue2_aux = $('#clave_nue2_aux').validationEngine('validate');
	if(!clave_ant_aux && !clave_nue_aux && !clave_nue2_aux){
		var clave_ant_aux = $('#clave_ant_aux').val();
		var clave_nue_aux = $('#clave_nue_aux').val();
		var clave_nue2_aux = $('#clave_nue2_aux').val();
		var password = 'CambiarIntra2015';
		var blocksize = 256;   // can be 128, 192 or 256
		var clave_ant_aux = AES.encrypt( clave_ant_aux, password, blocksize );
		var clave_nue_aux = AES.encrypt( clave_nue_aux, password, blocksize );
		var clave_nue2_aux = AES.encrypt( clave_nue2_aux, password, blocksize );
		$('#clave_ant').val(clave_ant_aux);
		$('#clave_nue').val(clave_nue_aux);
		$('#clave_nue2').val(clave_nue2_aux);
		$('#frm_cambio_clave').submit();
	}
}
*/
?>




//<editor-folder desc="****************FUNCIONES PARA CHEQUEAR EL NIVEL DE SEGURIDAD DE PASS********************">
function change_level(level){
	$('#status_low').removeClass();
	$('#status_medium').removeClass();
	$('#status_high').removeClass();

	switch (level){
		case 'L':
			$('#lbl_status').text('Baja');
			$('#status_low').addClass('status_low');
			$('#status_medium').addClass('status_empty');
			break;
		case 'M':
			$('#lbl_status').text('Media');
			$('#status_low').addClass('status_medium');
			$('#status_medium').addClass('status_medium');
			break;
		case 'H':
			$('#lbl_status').text('Alta');
			$('#status_low').addClass('status_high');
			$('#status_medium').addClass('status_high');
			$('#status_high').addClass('status_high');
			break;
	}
}

function matches_carac_especiales(clave){
	var carac_especiales = new Array();
	var matches = 0;
	carac_especiales = ["!","#","$","%","&","+",",","-",".","/",":","?","@","[","<?=ESC_BAR?><?=ESC_BAR?>","]","^","_","|"];
	for(var i=0;i<clave.length;i++){
		if($.inArray(clave.substr(i,1),carac_especiales)>=0)
			matches++;
	}

	return matches;
}

function busca_secuencia(lado,letra,siguiente,anterior,teclado){
	var fila = null;

	for(var i=0;i<teclado.length;i++){
		fila = teclado[i];

		if(lado == 'I'){
			if(letra == fila['C_TECLA'] && siguiente == fila['C_TECLA_IZQUIERDA']
				&&
				(
					(anterior == fila['C_TECLA_DERECHA'] && anterior != null)
					||
					anterior == null
				)
			){
				return 1;
			}
		}

		if(lado == 'D'){
			if(letra == fila['C_TECLA'] && siguiente == fila['C_TECLA_DERECHA']
				&&
				(
					(anterior == fila['C_TECLA_IZQUIERDA'] && anterior != null)
					||
					anterior == null
				)
			){
				return 1;
			}
		}
	}

	return 0;
}

function secuencia_basica(cadena,teclado){
	var retorno = 'N';
	var letra = null;
	var siguiente = null;
	var anterior = null;
	var basica_izquierda = 'S';
	var basica_derecha = 'S';

	for(var i=0;i<cadena.length-1;i++){
		letra = cadena.substr(i,1);
		siguiente = cadena.substr(i+1,1);

		if(busca_secuencia('I',letra,siguiente,anterior,teclado)==0){
			basica_izquierda = 'N';
			break;
		}

		anterior = letra;

	}

	anterior = null;

	for(var i=0;i<cadena.length-1;i++){
		letra = cadena.substr(i,1);
		siguiente = cadena.substr(i+1,1);

		if(busca_secuencia('D',letra,siguiente,anterior,teclado)==0){
			basica_derecha = 'N';
			break;
		}

		anterior = letra;
	}

	if(basica_izquierda == 'S' || basica_derecha == 'S'){
		retorno = 'S';
	}

	return retorno;

}

function obtener_secuencias_basicas(cadena,longitud_secuencia){
	longitud_secuencia = longitud_secuencia || 3;
	var secuencias = new Array();

	if(cadena.length >= longitud_secuencia){
		iteraciones = cadena.length - longitud_secuencia + 1;
	}
	else if(    cadena.length < longitud_secuencia
		&& cadena.length > 0){
		iteraciones = 1;
	}
	else{
		iteraciones = 0;
	}

	for(var i=0;i<iteraciones;i++){
		secuencias.push(cadena.substr(i,longitud_secuencia));
	}

	return secuencias;
}

function contiene_secuencia_basica(cadena,teclado){
	var secuencias = obtener_secuencias_basicas(cadena);
	var resultado = null;
	for(var i=0;i<secuencias.length;i++){
		resultado = secuencia_basica(secuencias[i],teclado);
		if(resultado == 'S'){
			return true;
		}
	}

	return false;
}

function check_security_level(key,encryption,teclado){ // Retorno L=LOW, M=MEDIUM, H=HIGH
	var longitud = key.length;
	var numeros = new RegExp('[0-9]');
	var minus = new RegExp('[a-z]');
	var mayus = new RegExp('[A-Z]');
	var sec_teclado = longitud >= 3 ? contiene_secuencia_basica(key.toUpperCase(),teclado) : true; //Buscar por ajax
	var ret = 'L';

	var match_minus = key.match(minus) == null ? 0 : key.match(minus).length;
	var match_mayus = key.match(mayus) == null ? 0 : key.match(mayus).length;
	//	var match_carac_especiales = matches_carac_especiales(key);
	var match_numeros = key.match(numeros) == null ? 0 : key.match(numeros).length;


	if(sec_teclado){
		change_level(ret);
		return ret;
	}

	if(longitud < 8){
		change_level(ret);
		return ret;
	}

	if(match_numeros > 0 && match_minus == 0 && match_mayus == 0 /*&& match_carac_especiales == 0*/){
		change_level(ret);
		return ret;
	}

	if(match_minus > 0 && match_numeros == 0 && match_mayus == 0 /*&& match_carac_especiales == 0*/){
		change_level(ret);
		return ret;
	}

	if(match_mayus > 0 && match_minus == 0 && match_numeros == 0 /*&& match_carac_especiales == 0*/){
		change_level(ret);
		return ret;
	}

	if(/*match_carac_especiales > 0 &&*/ match_minus == 0 && match_numeros == 0 && match_mayus == 0){
		change_level(ret);
		return ret;
	}

	if(    longitud >= 8
		|| (match_minus > 0 && match_mayus > 0)
		/*|| match_carac_especiales > 0*/
		|| (match_numeros > 0 && (match_minus > 0 || match_mayus > 0))
	){
		ret = 'M';
		change_level(ret);
	}


	if(    longitud >= 8
		&& match_minus > 0
		&& match_mayus > 0
		/*&& match_carac_especiales > 0*/
		&& match_numeros > 0
	){
		if(  	longitud > 8
			|| (match_minus > 0 && match_mayus > 0 && match_numeros > 0)
			|| (match_minus > 0 && match_mayus > 0 && match_numeros > 0 /*&& match_carac_especiales > 0*/)
			/*|| match_carac_especiales > 1*/
			|| !sec_teclado)
		{
			ret = 'H';
			change_level(ret);
		}
	}


	change_level(ret);

	return ret;
}

function sugerirClaveCambiarClave(){

	$.post('cambio_clave/ajax_cambio_clave.php',
		{
			"accion":'sugerirClave'
		},
		function(data){
			var datos = JSON.parse(data);
			$('#tr_seguridad').show();
			$('#clave_nue_aux').val(datos['PASS_NUEVA']).prop({'type':'text'});
			$('#clave_nue2_aux').prop({'type':'text'});
			check_security_level($('#clave_nue_aux').val(),null,teclado);
			$('#clave_nue2_aux').attr('readonly',false).focus();
		}
	);

}

//</editor-folder>


</script>
<?php
	require_once(INTRANET."footer.php");
?>