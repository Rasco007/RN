<?php
#==============================================================================
function VerifySignature($TOKEN,$SIGN)
{
    if (!file_exists(AFIP_PUBKEY)) {return "Error opening signer's public key ".AFIP_PUBKEY;}
    $pubkeyid = openssl_get_publickey(file_get_contents(AFIP_PUBKEY));
    $s = openssl_verify($TOKEN, $SIGN, $pubkeyid);
    if ($s == -1) {return "Error verifying signature";}
    if ($s == 0) {return "Invalid signature";}
    return "OK";
}
#==============================================================================
function ValidateToken($TOKEN)
{
    $tolerance=60; #tolerance in seconds
    $S="OK";
    if ($TOKEN->operation->login['service'] != AFIP_SERVICENAME)
    { $S=sprintf("Service name, expected: %s, Received: %s.", AFIP_SERVICENAME,
        $TOKEN->operation->login['service']); }
    $FROM=$TOKEN->id['gen_time']+0;
    $TO=$TOKEN->id['exp_time']+0;
    $NOW=date('U');
    if ( ($FROM-$tolerance) > $NOW )
    { $S=sprintf("gen_time is in the future, Now: %s, gen_time: %s.",
        date('c',$NOW), date('c',$FROM)); }
    if ( ($TO+$tolerance) < $NOW )
    { $S=sprintf("exp_time is in the past, Now: %s, exp_time: %s.",
        date('c',$NOW), date('c',$TO)); }
    return $S;
}
#==============================================================================
function CredentialsVerification()
{
    # Let's set session management characteristics, we'll accept session IDs thru
    # cookies only (browser must accept cookies), the cookie we'll be named with
    # AFIP_SERVICENAME and will expire after SessionTimeout seconds of inactivity.
    ini_set('session.use_only_cookies', 1);
    ini_set('session.cookie_lifetime', AFIP_TIMEOUT);
    ini_set('session.name', AFIP_SERVICENAME);
    session_start();
    # If we were POSTed new Token/Sign, then use these
    if ( isset($_POST['token']) && isset($_POST['sign']) )
    {	
		
        $SIGN=base64_decode($_POST['sign']);
        $TOKEN=base64_decode($_POST['token']);
        # Let's check signature
        $S=VerifySignature($TOKEN,$SIGN);
        if ($S !== "OK") {return $S;}
        # Let's check token
        $S=ValidateToken(simplexml_load_string($TOKEN));
        if ($S != "OK") { return $S; }
		$_SESSION['token_afip']=$TOKEN;
    }
    # If we couldn't get Token at this point, then this guy has not logged in
    if ( !isset($_SESSION['token_afip']) ) { die ("User is not logged in"); }
    # If we reached this point, we can consider this guy has valid credentials
    session_regenerate_id(true);
    return "OK";
}

function DisplayToken()
{
    $TOKEN=simplexml_load_string($_SESSION['token_afip']);

    printf ("<pre>");
    printf ("id\n");
    printf ("  Source         : %s\n", $TOKEN->id['src']);
    printf ("  Destination    : %s\n", $TOKEN->id['dst']);
    printf ("  Unique_id      : %s\n", $TOKEN->id['unique_id']);
    printf ("  Generation Time: %s\n", date('c', $TOKEN->id['gen_time']+0));
    printf ("  Expiration Time: %s\n", date('c', $TOKEN->id['exp_time']+0));
    printf ("operation\n");
    printf ("  Type : %s\n", $TOKEN->operation['type']);
    printf ("  Value: %s\n", $TOKEN->operation['value']);
    printf ("  login\n");
    printf ("    Service    : %s\n", $TOKEN->operation->login['service']);
    printf ("    Entity     : %s\n", $TOKEN->operation->login['entity']);
    printf ("    UID        : %s\n", $TOKEN->operation->login['uid']);
    printf ("    Auth.Method: %s\n", $TOKEN->operation->login['authmethod']);
    printf ("    Reg.Method : %s\n", $TOKEN->operation->login['regmethod']);
    printf ("    Relations\n");
    foreach ($TOKEN->operation->login->relations->relation as $REL)
    {
        printf ("      key=%s   reltype=%s\n",$REL['key'],$REL['reltype']);
    }
    printf ("</pre>");
	print_r($TOKEN->operation->login->relations->relation);
    return;
}

function getTokenInArray(){
    return simplexml_load_string($_SESSION['token_afip']);
}

function getCuitAfip(){
    $TOKEN = getTokenInArray();
    return (string)$TOKEN->operation->login['uid'];
}

function getTicketAfip(){
    $TOKEN = getTokenInArray();
    return (string)$TOKEN->id['unique_id'];
}

function getUserRelations(){
    $TOKEN = getTokenInArray();
    return $TOKEN->operation->login->relations->relation;
}

function getUserRelationsString(){
    $relaciones = getUserRelations();
	foreach($relaciones as $relacion){
		$arr [] = $relacion['key'];
	}
   $relaciones_string =  implode(",", $arr);
   if(CUITS_DESA != null){
	   $relaciones_string = $relaciones_string.','.CUITS_DESA;
   }
   return $relaciones_string;
}

function createUser($cuit){
    $param_prc = array(
        ':p_c_usuario' => $cuit,
        ':p_error'=>null,
        ':p_error_ora' => null
    );

    $sql = "begin 			  
                PAC_AUTH_AFIP.PRC_CREA_USUARIO_EXTERNO(:p_c_usuario,:p_error,:p_error_ora);
            end;";

    $db_procedure = new DB_Procedure($sql);

    $null=null;

    $result = $db_procedure->execute_query($param_prc,$null,FALSE);

    if($result->resultado == 'OK') {
        $res = true;
        $db_procedure->db_commit();
    }elseif ($param_prc[':p_error'] != null) {
        $res = $param_prc[':p_error'];
        $db_procedure->db_rollback();
    }

    return $res;
}

function loginUserInfo($cuit_opera){
    $minutes_to_add = 10;
    $fecha = new DateTime();
    $timestamp = $fecha->getTimestamp();
    $fecha_caduca = $fecha->add(new DateInterval('PT' . $minutes_to_add . 'M'));
    $timestamp_caduca = $fecha_caduca->getTimestamp();
	
    $param_prc = array(
        'p_c_usuario' => getCuitAfip(),
        'p_c_usuario_oper' => $cuit_opera,
        'p_timestamp' => $timestamp,
        'p_timestamp_caduca' => $timestamp_caduca,
        'p_ticket_afip' => getTicketAfip(),
        'p_session_id' => $_SESSION['token'],
        'p_cuits_rel' => getUserRelationsString(),
        ':p_error'=> null,
        ':p_error_ora' => null
    );

  
    $sql = "begin 			  
                PAC_AUTH_AFIP.PRC_INSERTA_LOGIN(:p_c_usuario,
                :p_c_usuario_oper,
                :p_timestamp ,
                :p_timestamp_caduca,
                :p_ticket_afip ,
                :p_session_id ,
                :p_cuits_rel,
                :p_error ,
                :p_error_ora );
            end;";

    $db_procedure = new DB_Procedure($sql);

    $null=null;

    $result = $db_procedure->execute_query($param_prc,$null,FALSE);
	
	

    if($result->resultado == 'OK') {
        $res = 'OK';
        $db_procedure->db_commit();
    }elseif ($param_prc[':p_error'] != null) {
        $res = $param_prc[':p_error_ora'];
        $db_procedure->db_rollback();
    }

    return $res;
}

function loadUserAfip(){
    $res = new stdClass();
    $res->error = null;
    $res->resultado = 'OK';
	
	$cuit_opera = $_POST['n_cuit_opera'];
	
    #Creo usuario -> Esta funcion crea unicamente la primera que se conecta el usuario
    if(!createUser($cuit_opera)){
		
        $res->error = 'Error al crear el usuario. Por favor, vuelva a intentarlo mas tarde.';
        $res->resultado = 'ERROR';
        return $res;
    }

    #Busco datos del usuario
    $db_query = new DB_Query();
    $query = "  SELECT id_rel_persona,
						c_clave
				FROM usuarios u
				WHERE upper(c_usuario) = upper(:c_usuario)
				AND f_baja is null
			";

    $us = $cuit_opera;
    $param_user = array(
        ':c_usuario' => $us
    );

    $db_query->setQuery($query);
    try{
        $rows = $db_query->do_query($param_user);
        $row = $rows[0];
    }catch(Exception $e) {
        echo($e->getMessage());
        $res->error = 'Error al intentar conectarse a la Base de Datos.<br /> Por favor, vuelva a intentarlo m&aacute;s tarde.';
        $res->resultado = 'ERROR';
        return $res;
    }

    //Asignamos las variables de sesión obtenidos de la consulta.
    $_SESSION['id_rel_persona'] = $row['ID_REL_PERSONA'];
    $_SESSION['c_clave_encriptada'] = $row['C_CLAVE'];

    $info = fun_info_usuario();//obtiene datos de usuario
    $info['d_geolocalizacion'] = $_POST['d_geolocalizacion'];

    $d_ip_local = $_POST['d_ip_local'];
    
    $password = 'ClaveIP2017';
    $blocksize = 256;  // can be 128, 192 or 256
    $info['d_ip_local'] = AES::decrypt( $d_ip_local, $password, $blocksize );

    // Seteamos usuario, contraseña, timeout y entorno.
    $_SESSION['usuario'] = $cuit_opera;
    $_SESSION['clave_usuario'] = $row['C_CLAVE'];
    $_SESSION['entorno'] = 'EXTRANET';
    
    insert_info_usuario($info, $db_query);//guarda datos usuario: navegador, ip, etc

    $_SESSION['entorno_logeado'] = 'EXTRANET';
    $_SESSION['logeado'] = true;
    $_SESSION['token'] = bin2hex(openssl_random_pseudo_bytes(64));

	
    #Insertamos el login del Usuario
	
	$result = loginUserInfo($cuit_opera);
    if($result != 'OK'){	
			
        $res->error = $result;
        $res->resultado = 'ERROR';
        return $res;
    }

	
    $res->resultado = 'OK';
    return $res;

}

?>
