<?php

function cargar_liquidacion($id_inspeccion)
{
    //RECUPERA LA LIQUIDACION ASOCIADA. Si no existe la crea.
    $params = [
        ':p_id_inspeccion' => $id_inspeccion,
        ':n_instancia' => null,
        ':n_orden' => null,
        ':p_error' => null,
        ':p_error_ora' => null
    ];

    $sql = "begin
                PAC_INSPECCIONES.PRC_OBTENER_LIQUIDACION_IIBB(
                    :p_id_inspeccion, 
                    :n_instancia,
                    :n_orden,
                    :p_error, 
                    :p_error_ora
                 );
            end;";

    $db_procedure = new DB_Procedure($sql);

    //Hay que armar una variable y pasarle al execute_query una variable con null sino pincha cuando quiere hacer el oci_bind_by_name
    $null = null;
    try {
        $result = $db_procedure->execute_query($params, $null);
    } catch (Exception $e) {
        die($e);
    };



    if ($result->resultado != 'OK') {
        //Se graba el error en la tabla ERRORES
        $error = $result->resultado;
       /* $detailed_error = $error . ' - ' . $params[':p_error_ora'];

        $db_query = new DB_Query("INSERT INTO ERRORES (D_PROCESO, D_DESCRIP, F_CORRIDA) VALUES('PAC_INSPECCIONES.PRC_OBTENER_LIQUIDACION (IIBB)', :error, SYSDATE)");
        $parametros = array(':error' => $detailed_error, ':n_operacion' => $id_inspeccion);

        $row_query = $db_query->do_query($parametros);
        $db_query->db_commit();*/
        RETURN ['error' => $error];
    }

    return ['n_instancia' => $params[':n_instancia'], 'n_orden' => $params[':n_orden']];
}

function get_datos_liquidacion($p_n_instancia, $p_n_orden)
{

    $sql = "select  con.id_contribuyente,
                    fun_formato_cuit(con.n_cuit) n_cuit,
                    con.d_denominacion,
                    insp.n_expediente ||'/'||n_anio_expediente d_expediente,
                    ins.f_vto    
            FROM instancias ins
            inner join contribuyentes con on ins.id_contribuyente = con.id_contribuyente
            inner join inspecciones insp on ins.id_inspeccion = insp.id_inspeccion
            WHERE 
                n_instancia = :p_n_instancia and n_orden = :p_n_orden
    ";

    $db_query = new DB_Query($sql);
    $par = array(':p_n_instancia' => $p_n_instancia, ':p_n_orden' => $p_n_orden);
    $results = $db_query->do_query($par);

    if (!empty ($results)) {
        $result['n_cuit'] = $results[0]['N_CUIT'];
        $result['d_denominacion'] = $results[0]['D_DENOMINACION'];
        $result['d_expediente'] = $results[0]['D_EXPEDIENTE'];
        $result['f_actualizac'] = $results[0]['F_VTO'];
        $result['count'] = 1;
        return $result;
    }
    return ['count' => 0];

}