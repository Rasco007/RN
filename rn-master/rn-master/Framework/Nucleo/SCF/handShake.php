<?php

$user = USER;
$pass = md5(PASS);
$id_menu = ID_MENU;

$headers = array(
    'X-USER-APP: '.$user,
    'X-PASS-APP: '.$pass
);
$token_error = new stdClass();
$ch = curl_init();

curl_setopt($ch, CURLOPT_URL, WEBSERVICE_URL);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_TIMEOUT, 100);
curl_setopt($ch, CURLOPT_HTTPHEADER, array(
    'X-USER-APP: '.$user,
    'X-PASS-APP: '.$pass,
    'X-Menu: '. $id_menu
));
curl_setopt($ch, CURLOPT_POST, false);
curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);

$jsonData = json_decode(curl_exec($ch));
$err     = curl_errno($ch);
$errmsg  = curl_error($ch) ;
$header  = curl_getinfo($ch);

//die($err.'   '.$errmsg);

//die('json data -> '.print_r($jsonData));
if(isset($jsonData->code)){
    if ($jsonData->code =='NOOK'){
        $token_error->code=$jsonData->code;
        $token_error->msg=$jsonData->msg;
        $token_error->cons=$jsonData->cons;
    }else{
        $token_error->code = 'OK';
        $_SESSION['token_'.ID_MENU] = $jsonData->token;
        $_SESSION['usuario_'.ID_MENU] = $user;
    }
}
else{
    $token_error->code = 'OK';
    $_SESSION['token_'.ID_MENU] = $jsonData->token;
    $_SESSION['usuario_'.ID_MENU] = $user;
    $title = $jsonData->title;
}

