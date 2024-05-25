<?php
require_once WEBSERVICE_FRAMEWORK.'core/check_post.php';

function ejecutar_curl($url,$param){

    $param = seguridad_ws($param);
    $ch = curl_init();
    
    curl_setopt($ch, CURLOPT_URL, $url.codeurl(json_encode($param)));
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_TIMEOUT, 100);
    curl_setopt($ch, CURLOPT_HTTPHEADER, array(
        'X-USER-APP: '.$_SESSION['usuario_'.$param['id_menu']],
        'X-Token: '.$_SESSION['token_'.$param['id_menu']],
        'X-Menu: '. $param['id_menu']
    ));
    curl_setopt($ch, CURLOPT_POST, false);
    curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
    $jsonData = curl_exec($ch);

    $err     = curl_errno($ch);
    $errmsg  = curl_error($ch) ;
    $header  = curl_getinfo($ch);
    $objData = json_decode($jsonData);

    if (isset($objData->code) && $objData->code =='NOOK'){
        disconnect($objData->cons);
    }else{
        return $jsonData;
    }
    
}

function codeurl($nocode){
    $nocode = str_replace("/", "¬", $nocode);
    $nocode = str_replace("\\", "*", $nocode);
    $coded = urlencode($nocode);
    return $coded;
}

function decodeurl($coded){
    $uncoded = urldecode($coded);
    $uncoded = str_replace("¬", '/', $uncoded);
    $uncoded = str_replace("*", "\\", $uncoded);
    return $uncoded;
}
?>