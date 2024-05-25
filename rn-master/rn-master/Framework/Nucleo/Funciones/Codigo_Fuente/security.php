<?php
//<editor-folder desc='******	FUNCIONES DE SEGURIDAD	******'>

function es_ajax_aplicacion(){
    // Para determinar si es un ajax se mira el encabezado buscando por xmlhttprequest. Como esto puede ser modificado por
    // el tamper data y así se evita el control de ajax permitidos se considera como un ajax cualquier llamada a un php
    // cuya carpeta padre no sea Aplicaciones. Así cuando se llama a subcarpetas de Aplicaciones se verifica el ajax_permitidos por mas
    // de que se modifique la cabecera.

    // Armo un array con la ruta
    $v=explode('/', $_SERVER['PHP_SELF']);
    $carpeta = $v[count($v)-2];

    // Miro si dentro de la ruta está la carpeta módulos
    $key = array_search('Aplicaciones',$v);

    // Si no esta la carpeta Aplicaciones entonces se está llamando a otro lado y no se necesita verificar el ajax.
    if(!$key){
        return false;
    }

    if (
        (isset($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest')
        ||
        ($carpeta != 'Aplicaciones')
    )
    {
        return true;
    }
    else
    {
        return false;
    }
}

function checkAjax() {

    // Vemos si es un Ajax.
    if ( es_ajax_aplicacion() == false )
    {
        return;
    }

    // Hacemos la consulta en Ajax_Permitidos
    $db_query = new DB_Query("SELECT D_PATH, m_framework,id_menu
			FROM MENU_AJAX_PERMITIDOS left join menu using (id_menu)
			WHERE id_menu = :id_menu
				or id_menu is null");

    // En las subidas del archivo puede no venir la cabecera, a si que tomamos el post.
    if (isset($_SERVER['HTTP_X_ID_MENU'])){
        $param = array(':id_menu' => $_SERVER['HTTP_X_ID_MENU']);
    }else{
        $param = array(':id_menu' => $_REQUEST['p_n_id_menu']);
    }

    $rows = $db_query->do_query($param);

    if(!count($rows)) {
        disconnect('Forbidden');
    }

    foreach ($rows as $dir) {
        // se cambio porque en el caso de retornar un array con S y sin S genera un error -> GUSTAVO
        if ($dir['M_FRAMEWORK'] == 'S') {
            $aplicaciones_direccion = APLICACIONES_FRAMEWORK;
        }else if ($dir['ID_MENU'] == ''){
            $aplicaciones_direccion = APLICACIONES_FRAMEWORK;
        }else{
            $aplicaciones_direccion = APLICACIONES;
        }

        try {
            $directorio = str_replace('/',DIRECTORY_SEPARATOR,$aplicaciones_direccion . $dir['D_PATH']);
            $directorio = str_replace('\\',DIRECTORY_SEPARATOR,$aplicaciones_direccion . $dir['D_PATH']);

            $Iterator = new RecursiveIteratorIterator(new RecursiveDirectoryIterator($directorio));

            foreach ($Iterator as $file => $object) {

                $file = str_replace('/',DIRECTORY_SEPARATOR,$file);
                $file = str_replace('\\',DIRECTORY_SEPARATOR,$file);

                $llamada = $aplicaciones_direccion.$dir['D_PATH'].DIRECTORY_SEPARATOR.FILENAME;

                $llamada = str_replace('/',DIRECTORY_SEPARATOR,$llamada);
                $llamada = str_replace('\\',DIRECTORY_SEPARATOR,$llamada);
                //echo $file.' - '.$llamada.'<br>';
                if ($file == $llamada) {
                    return; // Si lo encontró, cortamos.
                }
            }
        } catch (Exception $e) {
            null;
        }
    }

    disconnect('Forbidden');
}

function checkLoginRequired($p_n_id_menu){
    $db_query = new DB_Query();

    $params = array(':id_menu' => $p_n_id_menu);
    $db_query->setQuery("	select count(*) CANTIDAD 
							from  menu
							where id_menu IN ( SELECT *
												FROM TABLE (
															CAST ( EXPLODE ('|',:id_menu) AS listtable)
															) 
											 )
							and m_requiere_login = 'S'");

    $row_query = $db_query->do_query($params);

    if($row_query[0]['CANTIDAD'] > 0 ){
        return true;
    }else{
        return false;
    }
}

function disconnect($tipo_disconnect)
{
    //session_destroy();
	$user_logged = $_SESSION['entorno_logeado'];
	limpiarSesionLogeada();
    if ($tipo_disconnect == 'NoLog'){
        $header_error = 'HTTP/1.1 401 NoLog';
    }else if ($tipo_disconnect == 'Timeout'){
        $header_error = 'HTTP/1.1 408 Timeout';
    }else if ($tipo_disconnect == 'Forbidden'){
        $header_error = 'HTTP/1.1 403 Forbidden';
    }else if ($tipo_disconnect == 'Token') {
        $header_error = 'HTTP/1.1 401 Token';
    }else if ($tipo_disconnect == 'NotAcceptable') {
        $header_error = 'HTTP/1.1 406 NotAcceptable';
    }
    else{
        $header_error = 'HTTP/1.1 404 Not found';
    }
	
    if((isset($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest')||$_SESSION['entorno'] == 'WEBSERVICE'){
        header($header_error);
        exit;
    }else{
        if (defined('BASEPATH_ENTORNO')) {
            //header("Location: ". BASEPATH_ENTORNO ."index.php?error=" . $tipo_disconnect);
            $ruta = BASEPATH_ENTORNO . "index.php?error=" . $tipo_disconnect;

        }else{
			//header("Location: ". INTRANET_BASEPATH ."index.php?error=" . $tipo_disconnect);
            $ruta = INTRANET_BASEPATH . "index.php?error=" . $tipo_disconnect;
			
			if ($user_logged == 'EXTRANET'){
				$ruta = EXTRANET_BASEPATH . "index.php?error=" . $tipo_disconnect;
			}
            
        }

        header ("Location: ". $ruta);
        exit;
    }
}

function limpiarSesionLogeada(){
	unset($_SESSION['usuario']);
	unset($_SESSION['clave_usuario']);
	unset($_SESSION['id_rel_persona']);
	unset($_SESSION['verif_notificar']);
	unset($_SESSION['logeado']);
	unset($_SESSION['entorno_logeado']);
	unset($_SESSION['token']);
	unset($_SESSION['c_clave_encriptada']);
	unset($_SESSION['timeout']);
}

function check_token(){

    // Miramos el Token.
    if (
        ($_SERVER['HTTP_IDSESSION'] != $_SESSION['token'] || !isset($_SERVER['HTTP_IDSESSION']) )
        &&
        isset($_SERVER['HTTP_X_ID_MENU'])

    ){
        disconnect("Token");
    }
}


function resetear_tiempo_sesion() {
    $_SESSION['timeout'] = time();
}

function verificar_cambio_clave(){
    // Verificamos cambio de clave.
    $db_query = new DB_Query();
    $db_query->setQuery("
							SELECT c_clave as c_clave 
							FROM usuarios u 
							WHERE u.c_usuario = :c_usuario");
    $param = array(':c_usuario' => $_SESSION['usuario']);
    $row = $db_query->do_query($param);

    // Se verifica si la contraseña es la misma que la almacenada al logearse.
    if(isset($_SESSION['c_clave_encriptada']) && $_SESSION['c_clave_encriptada'] != $row[0]['C_CLAVE'] ){

        // Si son distintas y es un Ajax, se retorna un string que es recibido por el $.ajaxComplete declarado
        // en el template, el cual ejecuta un mostrar_cuadro que al precionar aceptar redirecciona al index.
        if(es_ajax_aplicacion()){
            echo json_encode("CLAVE_MODIFICADA");
            die();
        }else{
            header("Location: ../index.php?error=cambio_clave");
            return;
        }
    }
}

function checklogin($p_n_id_menu = null) {

    //Tomamos el PHP al que se hace referencia.
    $v=explode('/', $_SERVER['PHP_SELF']);
    $pagina=$v[count($v)-1];

    // No controlamos el index porque todavia no esta logeado
    if($pagina == 'index.php'|| $pagina == 'cambio_clave_abm.php' || $pagina == 'ajax_cambio_clave.php'|| $pagina == 'principal.php'|| $pagina == 'reporte.php')
    {
        return;
    }

      
    //die($pagina.' - '.$p_n_id_menu);
    // Verificamos que no haya sido cambiada la clave del usuario. Si es así lo deslogeamos.
    //verificar_cambio_clave();

    // Esto evita que se ejecute el checklogin más de una vez
    static $checkeado = false;
    // Si hay que verificar login.
    if(!$checkeado) {
        $v_id_menu_detectado = false;
        // Si la función no fue invocada para un menú en particular, tomamos de lo que vino por post.
        if ($p_n_id_menu == null){

            // Tomamos el id_menu del encabezado de la llamada, sino lo enviado por post.
            if (isset($_SERVER['HTTP_X_ID_MENU']) || isset($_REQUEST['p_n_id_menu'])) {

                if (isset($_SERVER['HTTP_X_ID_MENU'])) {
                    $v_n_id_menu = $_SERVER['HTTP_X_ID_MENU'];
                } else {
                    $v_n_id_menu = $_REQUEST['p_n_id_menu'];
                }

            }
            else{

                // Si no el id_menu, miramos el referer.
                $v=explode('/', $_SERVER['HTTP_REFERER']);
                $php_referer = end ($v);

                $php_referer =  substr($php_referer,0,nvl(strpos($php_referer,'?'),strlen($php_referer)));

                if ($php_referer == 'index.php'){
                    if($_SESSION['entorno'] =='EXTRANET'){
                        $v_n_id_menu = '1';
                    }else{
                        $v_n_id_menu = '0';
                    }

                }elseif ($php_referer != ''){

                    // Como un php puede ser llamado desde muchos menús, hacemos una concatenación de los IDs
                    $db_query = new DB_Query("	select listagg(id_menu, '|') within group (order by id_menu) as id_menu 
												from menu where upper(d_url) = UPPER(:archivo_php)");

                    $param = array(':archivo_php' =>$php_referer );
                    $row_query = $db_query->do_query($param);
                    $v_n_id_menu = $row_query[0]['ID_MENU'];
                    $v_id_menu_detectado = true;

                }
                else{
                    disconnect('Forbidden');
                }
            }
        }
        else{
            $v_n_id_menu = $p_n_id_menu;
        }

        // Si no encontramos ningún ID menu, rechazamos
        if ($v_n_id_menu == '' || (!is_numeric($v_n_id_menu) && $v_id_menu_detectado == false)){
            disconnect('Forbidden');
        }

        // Si tenemos un ID menu nos aseguramos que sea alguno del que está en el sistema.
        // Así evitamos que nos manden cualquier número.
        $db_query = new DB_Query("	select count(*) cantidad 
									from menu where id_menu IN (SELECT *
																FROM TABLE (
																			CAST ( EXPLODE ('|',:id_menu) AS listtable)
																			) 
											 					)
								");

        $param = array(':id_menu' =>$v_n_id_menu );
        $row_query = $db_query->do_query($param);
        $v_cant_menu = $row_query[0]['CANTIDAD'];

        // Si mandaron un ID menú inexistente rechazamos
        if ($v_cant_menu == 0){
            disconnect('Forbidden');
        }

        // Incluimos el check_post para filtrar los parametros en base a lo configurado en el menú.
        include('check_post.php');

        if(checkLoginRequired($v_n_id_menu)) {

            if(!$_SESSION['logeado']) {
                disconnect('NoLog');
            }

            if((time() - $_SESSION['timeout']) > TIMEOUT){  //SI PASAN MAS DE X seg TIMEOUT!!
                disconnect('Timeout');
            }

            check_token();

            //$_SESSION['timeout'] = time();  No hace falta porque está en el frmk_default.php

            // Si es un ajax se mira en ajax permitidos, para verificar que el id_menu usado tiene permiso para acceder al archivo php.
            if (es_ajax_aplicacion() == true)
            {
                checkAjax();
            }

            // Tanto para ajax como para post, debemos verificar que el id_menu utilizado está asociado a un perfil que posea el usuario.
            $v_usuario=$_SESSION['usuario'];

            $db_query->setQuery("SELECT COUNT (1) AS num 
						 FROM menu m 
		  			WHERE m.id_menu IN ( SELECT *
													FROM TABLE (
																CAST ( EXPLODE ('|',:v_n_id_menu) AS listtable)
																) 
											   )
							   AND m_filtrar_param = 'S'");
            $param = array(
                ':v_n_id_menu' => $v_n_id_menu
            );

            $row = $db_query->do_query($param);
            $cant = $row[0]['NUM'];

            if ($cant > 0){

                // Tanto para ajax como para post, debemos verificar que el id_menu utilizado está asociado a un perfil que posea el usuario.
                /*$db_query->setQuery("SELECT COUNT (1) AS num
						 FROM menu_perfiles mp,
							  usuarios_perfiles UP,
							  menu m
						WHERE up.c_usuario = UPPER ( :v_usuario)
							  AND mp.id_perfil = UP.id_perfil
							  AND mp.id_menu = m.id_menu
							  AND m.id_menu IN ( SELECT *
                        							FROM TABLE (
                                								CAST ( EXPLODE ('|',:v_n_id_menu) AS listtable)
                                								)
                                		 	   )");

                $param = array(
                    ':v_usuario' => $v_usuario,
                    ':v_n_id_menu' => $v_n_id_menu
                );

                $row = $db_query->do_query($param);
                $cantidad = $row[0]['NUM'];*/

                if (check_perfil($v_usuario,$v_n_id_menu) == 0){
                    disconnect('Forbidden');
                }
            }
        }
        $checkeado = true;
    }
}

function check_perfil($p_user,$p_n_id_menu){

    // Tanto para ajax como para post, debemos verificar que el id_menu utilizado está asociado a un perfil que posea el usuario.
    $db_query= new DB_Query(("SELECT COUNT (1) AS num
						 FROM menu_perfiles mp,
							  usuarios_perfiles UP,
							  menu m
						WHERE up.c_usuario = UPPER ( :v_usuario)
							  AND mp.id_perfil = UP.id_perfil
							  AND mp.id_menu = m.id_menu
							  AND m.id_menu IN ( SELECT *
                        							FROM TABLE (
                                								CAST ( EXPLODE ('|',:v_n_id_menu) AS listtable)
                                								)
                                		 	   )"));

    $param = array(
        ':v_usuario' => $p_user,
        ':v_n_id_menu' => $p_n_id_menu
    );

    $row = $db_query->do_query($param);
    $cantidad = $row[0]['NUM'];

    return $cantidad;

}
function fun_info_usuario(){
    $browser=array("IE","OPERA","MOZILLA","NETSCAPE","FIREFOX","SAFARI","CHROME");
    $browser_codigo=array("IE","O","M","N","F","S","C");
    $os=array("WIN","MAC","LINUX");
    # definimos unos valores por defecto para el navegador y el sistema operativo
    $info['browser'] = "OTRO";
    $info['os'] = "OTRO";
    # buscamos el navegador con su sistema operativo
    $i=0;
    foreach($browser as $parent){
        $s = strpos(strtoupper($_SERVER['HTTP_USER_AGENT']), $parent);
        $f = $s + strlen($parent);
        $version = substr($_SERVER['HTTP_USER_AGENT'], $f, 15);
        $version = preg_replace('/[^0-9,.]/','',$version);
        if ($s)
        {
            $info['browser'] = $browser_codigo[$i];
            $info['version'] = $version;
        }
        $i++;
    }
    # obtenemos el sistema operativo
    foreach($os as $val){
        if (strpos(strtoupper($_SERVER['HTTP_USER_AGENT']),$val)!==false)
            $info['os'] = $val;
    }
    //IP del usuario
    $info['ip'] = $_SERVER['REMOTE_ADDR'];
    $info['descripcion'] = $_SERVER['HTTP_USER_AGENT'];
    # devolvemos el array de valores
    return $info;
}

function  insert_info_usuario($info, $db_query = null){

    if(!$db_query) $db_query = new DB_Query();

    $sql = "INSERT INTO LOGIN_ACCESOS (
				C_USUARIO,
				F_ACCESO,           
				F_SALIDA,          
 				IP_ORIGEN,            
				C_NAVEGADOR,          
				N_TABLA_NAVEGADOR, 
				D_VERSION_NAVEGADOR,
				D_SISTEMA_OPERATIVO,
				D_NOMBRE_EQUIPO,
				D_GEOLOCALIZACION,
				D_MAC,
				IP_LOCAL,
				ID_SESSION_PHP
			)VALUES( 
				:c_usuario,
				sysdate, 
				null,
				:ip,
				:browser,
				914,
				:version,
				:user_agent,
				:d_nombre_equipo,
				:d_geolocalizacion,
				:d_mac,
				:ip_local,
				:id_session_php
			)";

    $db_query->setQuery($sql);
    $param = array(
        ':c_usuario' => $_SESSION['usuario'],
        ':ip' => $info['ip'],
        ':browser' => $info['browser'],
        ':version' => $info['version'],
        ':user_agent' => $_SERVER['HTTP_USER_AGENT'],
        ':d_nombre_equipo' => gethostbyaddr($_SERVER['REMOTE_ADDR']),
        ':d_geolocalizacion' => $info['d_geolocalizacion'],
        ':d_mac' => get_mac($info['d_ip_local']),
        ':ip_local' => $info['d_ip_local'],
        ':id_session_php' => session_id()
    );
    $vaRow = $db_query->do_query($param);
    $db_query->db_commit();
}

function setLogout($db_query = null){

    if(!$db_query) $db_query = new DB_Query();

    $sql = "UPDATE 
				LOGIN_ACCESOS 
			SET 
				F_SALIDA = sysdate 
			WHERE 
				C_USUARIO = :c_usuario 
				AND F_ACCESO =  (SELECT MAX(F_ACCESO) FROM LOGIN_ACCESOS WHERE C_USUARIO = :c_usuario)";
    $db_query->setQuery($sql);
    $param = array(':c_usuario' => $_SESSION['usuario']);
    $vaRow = $db_query->do_query($param);
    $db_query->db_commit();
}

function get_mac( $ip = null ){
    $ipAddress = ($ip==null) ? $_SERVER['REMOTE_ADDR']:$ip;
    $macAddr=false;

    #run the external command, break output into lines
    $arp=`arp -a $ipAddress`;
    $lines=explode("\n", $arp);

    #look for the output line describing our IP address
    foreach($lines as $line)
    {
        $cols=preg_split('/\s+/', trim($line));
        if ($cols[0]==$ipAddress)
        {
            $macAddr=$cols[1];
        }
    }
    return($macAddr);
}

//</editor-folder desc='******	FUNCIONES DE SEGURIDAD	******'>