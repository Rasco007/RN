<?php

$id_obligacion = $_POST['id_obligacion'];
$f_actualizacion = $_POST['f_actualizacion'];

if(isset($_POST['id_obligacion']) && isset($_POST['f_actualizacion'])){
    $db_query = new DB_Query("
    SELECT
    	fun_formato_numerico(case
    		when fun_calculo_interes_obl_C(:id_obligacion) < 0 then
    			abs(fun_calculo_interes_obl_C(:id_obligacion))
    		else 0
		end) i_f_pago,
		fun_formato_numerico(case
			when -1 * fun_calculo_interes_obl_C(:id_obligacion, null, 'T') < 0 then 0
			else -1 * fun_calculo_interes_obl_C(:id_obligacion, null, 'T')
		end) i_total,
		fun_formato_numerico(case
			when fun_Calculo_interes_obl_c(:id_obligacion, :f_actualizacion,'I') < 0 then
				abs(fun_Calculo_interes_obl_c(:id_obligacion, :f_actualizacion,'I'))
			else 0
		end) i_f_actualizacion,
		fun_formato_numerico(case
			when -1 * fun_Calculo_interes_obl_c(:id_obligacion, :f_actualizacion, 'T') < 0 then 0
			else -1 * fun_Calculo_interes_obl_c(:id_obligacion, :f_actualizacion, 'T')
		end) i_total_actualizado
	from dual");

    $param = array(':id_obligacion' => $id_obligacion,
    			':f_actualizacion' => $f_actualizacion);
    $row_query = $db_query->do_query($param);

    $result->resultado = 'OK';
    $result->i_f_pago = $row_query[0]['I_F_PAGO'];
    $result->i_total = $row_query[0]['I_TOTAL'];
    $result->i_f_actualizacion = $row_query[0]['I_F_ACTUALIZACION'];
    $result->i_total_actualizado = $row_query[0]['I_TOTAL_ACTUALIZADO'];

}else{
    $result->resultado = 'NOOK';
    $result->error = 'Se produjo un error al realizar la consulta, intente nuevamente.';
}

echo json_encode($result);

?>