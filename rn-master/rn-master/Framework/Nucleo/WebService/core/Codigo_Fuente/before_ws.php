<?php
namespace auth\Silex;
session_start();

require_once '../../Framework/Proyecto/Config/path-conf.php';
require_once '../../Framework/Nucleo/Config/path-conf.php';

require_once WEBSERVICE_FRAMEWORK.'/vendor/autoload.php';

use Silex\Application as SilexApplication;
use Symfony\Component\HttpKernel\Exception\AccessDeniedHttpException;
use Symfony\Component\HttpKernel\Exception\UnauthorizedHttpException;
use Symfony\Component\HttpKernel\Exception\NotAcceptableHttpException;
use Symfony\Component\HttpFoundation\Request;
use oci_Logon as logon;
use DB_Query as DB_query;
use DB_Procedure as DB_proc;



class Application extends SilexApplication{

    public function __construct(array $values = []){

        parent::__construct($values);

        $this->before(function (Request $request) {

            //conexion a la bd
            $_SESSION['entorno'] = 'WEBSERVICE';

            $logon  = new logon();
            $login = $logon->oci_Logon();

            if ($login == false){
                throw new AccessDeniedHttpException();
            }

            /*** validar si viene con token *****/
            $this->check_webservice($request);
        });

    }

    private function validateToken($token){
        $db_query = new DB_Query("SELECT pac_webservice.fun_valida_token(:p_token) AS RESULT FROM DUAL");
        $param_query = array(':p_token' => $token);

        $single = array_shift($db_query->do_query($param_query));

        return $single['RESULT'];
    }

    private function validateUser($user, $pass){
        $msg = '';
        $ret = new \stdClass();
        $parametros = array(':p_usuario' => $user,
                            ':p_clave' => $pass,
                            ':p_mensaje' => $msg,
                            ':p_error' => NULL,
                            ':p_error_ora' => NULL);

        $db_procedure = new DB_proc('BEGIN 
            pac_webservice.prc_valida_usuario (:p_usuario, :p_clave, :p_mensaje, :p_error, :p_error_ora);
            END;');

        $response = $db_procedure->execute_query($parametros);

        if($response->resultado == 'OK'){
             if($parametros[':p_mensaje'] == 'OK'){
                $ret->status = 1;
                $ret->msg = $parametros[':p_mensaje'];
            }
            else{
                $ret->status = 0;
                $ret->msg = $parametros[':p_mensaje'];
            }
        }
        else{
            $ret->status = 0;
            $ret->msg = $parametros[':p_mensaje'];
        }

        return $ret;

    }

    private function getNewTokenForUser($user){
        $token = '';
        $ret = new \stdClass();
        $parametros = array(':p_usuario' => $user,
                            ':p_token' => $token,
                            ':p_error' => NULL,
                            ':p_error_ora' => NULL);

        $db_procedure = new DB_proc('BEGIN 
            pac_webservice.prc_gen_token (:p_usuario, :p_token, :p_error, :p_error_ora);
            END;');

        $response = $db_procedure->execute_query($parametros);

        if($response->resultado == 'OK'){
            return $parametros[':p_token'];
        }
        else{
            return 'NOOK';
        }
    }

    private function check_webservice($request){
        $token = $request->headers->get('X-Token');
        $user   = $request->headers->get('X-USER-APP');
        $pass   = $request->headers->get('X-PASS-APP');
        $menu   = $request->headers->get('X-Menu');

        if($token){
            $valid_token = $this->validateToken($token);
        }else{
            /**** si no viene token validar usuario y contraseña ****/
            $user_val = $this->validateUser($user, $pass);
            /*** si valida usuario y contraseña generar un token y devolver token ***/
            if($user_val->status==1){
                $valid_token = $this->getNewTokenForUser($user);
            }
            else{
                /**** devuelve un json con error **/
                throw new AccessDeniedHttpException();
            }
        }

        if($valid_token == 'NOOK'){
            /*** devuelve un json con error ***/
            throw new AccessDeniedHttpException();
        }
        else{
            if(isset($menu)){
                $query = "SELECT D_TITULO, D_URL, D_ARCH_MANUAL,M_FRAMEWORK
                          FROM MENU
                          WHERE ID_MENU = :p_id_menu";
                $db_query = new DB_Query($query);
                $var = array(':p_id_menu' => $menu);
                $row = $db_query->do_query($var);
                $title = $row[0]['D_TITULO'];              
                $request->attributes->set('X-Title', $title);
            }

            $request->attributes->set('X-Token', $valid_token);
        }

        $url = $request->getUri();
        $v=explode('/', $url);
        $webservice = $v[count($v)-2];

        $param = $v[count($v)-1];

        $json_param = json_decode(decodeurl($param));

        if($json_param->id_menu != '' && $json_param->id_menu != $menu){
            throw new NotAcceptableHttpException();
        }

        $db_query = new DB_Query("	select listagg(id_menu, '|') within group (order by id_menu) as id_menu
												from menu where upper(d_url) = UPPER(:webservice)");

        $param = array(':webservice' =>$webservice );
        $row_query = $db_query->do_query($param);
        $v_n_id_menu_webservice = $row_query[0]['ID_MENU'];

        if ($v_n_id_menu_webservice == ''){
            throw new NotAcceptableHttpException();
        }

        if (check_perfil($user,$v_n_id_menu_webservice) == '0'){
            throw new NotAcceptableHttpException();
        }

    }
    
}
