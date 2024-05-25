<?php

//Iniciamos la sesión del usuario
session_start();
$_SESSION['entorno'] = 'INTRANET';

// Incluyo scripts de configuración de constantes de PATH
require '../Framework/Proyecto/Config/path-conf.php';
require '../Framework/Nucleo/Config/path-conf.php';

// Autoload (carga automáticamente archivos necesarios del sistema)
require CONFIG_FRAMEWORK . 'autoload.php';

/*
$p_user = $_GET['user'];
$p_pswd = $_GET['pswd'];

$query = "SELECT count(*) cantidad
          FROM 
            (select 
              case
                when spare4 is not null and password is not null then spare4 || ';' || password
                when spare4 is not null then spare4
                else password
              end password
            from sys.user$
            where type# = 1
             and NAME = :p_user
            ) v
          WHERE v.password = :p_pswd";
*/

$p_id_sesion = $_GET['id_sesion'];

$query = "SELECT c_usuario, D_PARAMETROS_REPORT from web_llamadas
          WHERE id_sesion = :id_sesion";

$db_query = new DB_Query($query);
$param = array(':id_sesion' => $p_id_sesion);
$row = $db_query->do_query($param);

if ($row[0] == null) {
    disconnect('Forbidden');
}else{

    $query = "SELECT 1 from usuarios
          WHERE c_usuario = :c_usuario";

    $db_query = new DB_Query($query);
    $param = array(':c_usuario' => $row[0]['C_USUARIO']);
    $validaUser = $db_query->do_query($param);

    if ($validaUser[0] == null) {
        disconnect('Forbidden');
    }


    //Guardamos los parámetros
    $parametros = $row[0]['D_PARAMETROS_REPORT'];
    foreach (explode('&', $parametros) as $value) {
        $param = explode('=', $value);
        $params_url[$param[0]] = $param[1];
    }

    //Borramos
    $query = " delete from web_llamadas 
                WHERE id_sesion = :id_sesion";

    $db_query->setQuery($query);
    $param = array(':id_sesion' => $p_id_sesion);
    $delete = $db_query->do_query($param);
    $db_query->db_commit();
}

/*Variables de sesión logueado.
    $_SESSION['id_rel_persona'] = $row['ID_REL_PERSONA'];
    $_SESSION['c_clave_encriptada'] = $row['C_CLAVE'];
    $_SESSION['clave_usuario'] = $_POST['log_pass'];
*/

$_SESSION['usuario'] = strtoupper($row[0]['C_USUARIO']);
$_SESSION['entorno_logeado'] = 'INTRANET';
$_SESSION['logeado'] = true;
$_SESSION['token'] = bin2hex(openssl_random_pseudo_bytes(64));
resetear_tiempo_sesion();

//Buscamos el PHP correspondiente al id_menu
$id_menu = $params_url['id_menu'];

$query = "  select d_url, d_parametros, m_framework from menu
            where id_menu = :p_id_menu and c_grupo_menu = 'INT'";

$db_query->setQuery($query);
$param = array(':p_id_menu' => $id_menu);
$row = $db_query->do_query($param);

$param_menu = array();
if ($row[0]['D_PARAMETROS']) {
    foreach (explode('&', $row[0]['D_PARAMETROS']) as $value) {
        $param = explode('=', $value);
        $param_menu[$param[0]] = $param[1];
    }
}
  
$param_menu['ruta'] = "[]";
/*    die("Location: ". INTRANET_BASEPATH . "Aplicaciones/".$row[0]['D_URL']);
*/

if ($row[0]['M_FRAMEWORK'] == 'N') {
    $v_entorno = INTRANET_BASEPATH;
} else {
    $v_entorno = FRAMEWORK_BASEPATH;
}

/*
    $_POST['p_n_id_menu']=$id_menu;
    header ("Location: ". $v_entorno . "Aplicaciones/".$row[0]['D_URL'].'?p_n_id_menu='.$id_menu);
    exit;
*/

?>
<script type="text/javascript" src="<?= RECURSOS_FRAMEWORK ?>Jquery/3.1.1/jquery-3.1.1.js"></script>

<div class='body'>
  <span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
  </span>
    <div class='base'>
        <span></span>
        <div class='face'></div>
    </div>
</div>
<div class='longfazers'>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
</div>
<div><h1>Ingresando. Por favor, Aguarde.</h1></div>


<style>
    body {
        background-color: #156690;
        overflow: hidden;
    }

    h1 {
        position: absolute;
        font-family: 'Open Sans';
        font-weight: 600;
        font-size: 12px;
        text-transform: uppercase;
        left: 42%;
        top: 58%;
    }

    .body {
        position: absolute;
        top: 50%;
        margin-left: -50px;
        left: 50%;
        animation: speeder .4s linear infinite;
    }

    .body > span {
        height: 5px;
        width: 35px;
        background: #000;
        position: absolute;
        top: -19px;
        left: 60px;
        border-radius: 2px 10px 1px 0;
    }

    .base span {
        position: absolute;
        width: 0;
        height: 0;
        border-top: 6px solid transparent;
        border-right: 100px solid #000;
        border-bottom: 6px solid transparent;
    }

    .base span:before {
        content: "";
        height: 22px;
        width: 22px;
        border-radius: 50%;
        background: #000;
        position: absolute;
        right: -110px;
        top: -16px;
    }

    .base span:after {
        content: "";
        position: absolute;
        width: 0;
        height: 0;
        border-top: 0 solid transparent;
        border-right: 55px solid #000;
        border-bottom: 16px solid transparent;
        top: -16px;
        right: -98px;
    }

    .face {
        position: absolute;
        height: 12px;
        width: 20px;
        background: #000;
        border-radius: 20px 20px 0 0;
        transform: rotate(-40deg);
        right: -125px;
        top: -15px;
    }

    .face:after {
        content: "";
        height: 12px;
        width: 12px;
        background: #000;
        right: 4px;
        top: 7px;
        position: absolute;
        transform: rotate(40deg);
        transform-origin: 50% 50%;
        border-radius: 0 0 0 2px;
    }

    .body > span > span:nth-child(1),
    .body > span > span:nth-child(2),
    .body > span > span:nth-child(3),
    .body > span > span:nth-child(4) {
        width: 30px;
        height: 1px;
        background: #000;
        position: absolute;
        animation: fazer1 .2s linear infinite;
    }

    .body > span > span:nth-child(2) {
        top: 3px;
        animation: fazer2 .4s linear infinite;
    }

    .body > span > span:nth-child(3) {
        top: 1px;
        animation: fazer3 .4s linear infinite;
        animation-delay: -1s;
    }

    .body > span > span:nth-child(4) {
        top: 4px;
        animation: fazer4 1s linear infinite;
        animation-delay: -1s;
    }

    @keyframes fazer1 {
        0% {
            left: 0;
        }
        100% {
            left: -80px;
            opacity: 0;
        }
    }

    @keyframes fazer2 {
        0% {
            left: 0;
        }
        100% {
            left: -100px;
            opacity: 0;
        }
    }

    @keyframes fazer3 {
        0% {
            left: 0;
        }
        100% {
            left: -50px;
            opacity: 0;
        }
    }

    @keyframes fazer4 {
        0% {
            left: 0;
        }
        100% {
            left: -150px;
            opacity: 0;
        }
    }

    @keyframes speeder {
        0% {
            transform: translate(2px, 1px) rotate(0deg);
        }
        10% {
            transform: translate(-1px, -3px) rotate(-1deg);
        }
        20% {
            transform: translate(-2px, 0px) rotate(1deg);
        }
        30% {
            transform: translate(1px, 2px) rotate(0deg);
        }
        40% {
            transform: translate(1px, -1px) rotate(1deg);
        }
        50% {
            transform: translate(-1px, 3px) rotate(-1deg);
        }
        60% {
            transform: translate(-1px, 1px) rotate(0deg);
        }
        70% {
            transform: translate(3px, 1px) rotate(-1deg);
        }
        80% {
            transform: translate(-2px, -1px) rotate(1deg);
        }
        90% {
            transform: translate(2px, 1px) rotate(0deg);
        }
        100% {
            transform: translate(1px, -2px) rotate(-1deg);
        }
    }

    .longfazers {
        position: absolute;
        width: 100%;
        height: 100%;
    }

    .longfazers span {
        position: absolute;
        height: 2px;
        width: 20%;
        background: #000;
    }

    .longfazers span:nth-child(1) {
        top: 20%;
        animation: lf .6s linear infinite;
        animation-delay: -5s;
    }

    .longfazers span:nth-child(2) {
        top: 40%;
        animation: lf2 .8s linear infinite;
        animation-delay: -1s;
    }

    .longfazers span:nth-child(3) {
        top: 60%;
        animation: lf3 .6s linear infinite;
    }

    .longfazers span:nth-child(4) {
        top: 80%;
        animation: lf4 .5s linear infinite;
        animation-delay: -3s;
    }

    @keyframes lf {
        0% {
            left: 200%;
        }
        100% {
            left: -200%;
            opacity: 0;
        }
    }

    @keyframes lf2 {
        0% {
            left: 200%;
        }
        100% {
            left: -200%;
            opacity: 0;
        }
    }

    @keyframes lf3 {
        0% {
            left: 200%;
        }
        100% {
            left: -100%;
            opacity: 0;
        }
    }

    @keyframes lf4 {
        0% {
            left: 200%;
        }
        100% {
            left: -100%;
            opacity: 0;
        }
    }
</style>
<script>

    $(document).ready(function () {

        var params = JSON.parse('<?=json_encode($param_menu)?>');
        params.p_n_id_menu = <?=$id_menu?>;

        method = "post";
        // Si no se pasa como parámetro, el método será post.

        var form = document.createElement("form");
        form.setAttribute("method", method);
        form.setAttribute("action", '<?=$v_entorno . "Aplicaciones/" . $row[0]['D_URL']?>');

        for (var key in params) {
            var hiddenField = document.createElement("input");
            hiddenField.setAttribute("type", "hidden");
            hiddenField.setAttribute("name", key);
            hiddenField.setAttribute("value", params[key]); 
            form.appendChild(hiddenField);
        }

        document.body.appendChild(form);
        // Ver si es necesario...
        form.submit();
    });
</script>
