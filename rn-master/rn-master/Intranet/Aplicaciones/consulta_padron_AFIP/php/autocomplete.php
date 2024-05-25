<?php 

$filtro = $_POST['term'];
$oper = $_POST['oper'];

if($oper == 2){
    $procedure = "PAC_CONTRIBUYENTES_AFIP.AUTOCOMPLETE_AFIP002(:p_n_cuit)";
    $parametros = array(':p_n_cuit'=>$filtro);         
    $data = getArrayResult($procedure, $parametros);     
    echo json_encode($data->datos[0]);

}

if($oper == 'cod_afip'){

    $c_cod = ($_REQUEST['p_c_cod']);
    $procedure = "PAC_CONTRIBUYENTES_AFIP.buscar_codigo_act_afip(:p_c_cod)";
    $parametros = array(':p_c_cod' => $c_cod);
    $data = getArrayResult($procedure, $parametros);

    echo json_encode($data->datos[0]);
}

if($oper == 'cod_siat'){

    $c_cod = ($_REQUEST['p_c_cod']);
    $procedure = "PAC_CONTRIBUYENTES_AFIP.buscar_codigo_act_siat(:p_c_cod)";
    $parametros = array(':p_c_cod' => $c_cod);
    $data = getArrayResult($procedure, $parametros);

    echo json_encode($data->datos[0]);
}


?>