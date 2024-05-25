<?php

    $id_contribuyente = ($_REQUEST['id_contribuyente']);
    $c_tipo_imponible = ($_REQUEST['c_tipo_imponible']);
    $obj_hecho = ($_REQUEST['obj_hecho']);
    $c_tributo = ($_REQUEST['c_tributo']);
    $c_concepto = ($_REQUEST['c_concepto']);
    $periodo = ($_REQUEST['periodo']);
    $periodo_hasta = ($_REQUEST['periodo_hasta']);


    $procedure = "PAC_OBLIGACIONES.buscar_oblig(:p_id_contribuyente, 
                                            :p_c_tipo_imponible, 
                                            :p_obj_hecho, 
                                            :p_c_tributo, 
                                            :p_c_concepto,
                                            :p_periodo,
                                            :p_periodo_hasta)";
    $parametros = array(':p_id_contribuyente' => $id_contribuyente,
                        ':p_c_tipo_imponible' => $c_tipo_imponible,
                        ':p_obj_hecho' => $obj_hecho,
                        ':p_c_tributo' => $c_tributo,
                        ':p_c_concepto' => $c_concepto,
                        ':p_periodo' => $periodo,
                        ':p_periodo_hasta' => $periodo_hasta);

    $data = getArrayResult($procedure, $parametros);
    $row_query = $data->datos;

    $data->datos[0] = 'OK';

    echo json_encode($data->datos);

?>