<?php
require_once(FUNCIONES_FRAMEWORK_PROY."TDIExcel.php");

$db_query = new DB_Query();

$p_id_grupo = $_POST['p_id_grupo'];
$p_c_archivo = $_POST['p_c_archivo'];

$parametres = array(':p_id_grupo' => $p_id_grupo);

if($p_c_archivo == 1) {
 $filename = 'solo_contribuyentes';

 $sql = "SELECT  (tmpj.CUIT), (tmpj.DENOMINACION_CONTRIB), (fun_formato_numerico(tmpj.DEUDA_VENCIDA)), 
                 (tmpj.INSPECCIONES_ABIERTAS), (tmpj.JUICIOS_ESTADO_INICIADO), (tmpj.M_VA_JUICIO) 
         FROM tmp_para_juicios tmpj
         WHERE tmpj.id_grupo = :p_id_grupo";

 $titulos = array(0 => array('Cuit' => 'descrip'),
     1 => array('Contribuyente' => 'descrip'),
     2 => array('Deuda Total' => 'number'),
     3 => array('Cantidad de Inspecciones Abiertas' => 'descrip'),
     4 => array('Juicio Iniciado' => 'descrip'),
     5 => array('Incluir en Juicio?' => 'descrip'));
}

if($p_c_archivo == 2) {
 $filename = 'contribuyentes_objetos';

 $sql = "SELECT  (tmpj.CUIT), (tmpj.DENOMINACION_CONTRIB), (tmpj.OBJETO_HECHO), (fun_formato_numerico(tmpj.DEUDA_VENCIDA)), 
                 (tmpj.SIAT_CUIT_RESPPAGO), (tmpj.DENOM_RESPPAGO), (tmpj.FIGURA_RESP_PAGO), tmpj.INSPECCIONES_ABIERTAS, 
                 (tmpj.JUICIOS_ESTADO_INICIADO), (tmpj.M_VA_JUICIO) 
         FROM tmp_para_juicios tmpj
         WHERE tmpj.id_grupo = :p_id_grupo";

 $titulos = array(0 => array('Cuit' => 'descrip'),
     1 => array('Contribuyente' => 'descrip'),
     2 => array('Objeto' => 'descrip'),
     3 => array('Deuda Total' => 'number'),
     4 => array('Cuit de Responsable de Pago' => 'descrip'),
     5 => array('Denominación Responsable de Pago' => 'descrip'),
     6 => array('Figura del Responsable de Pago' => 'descrip'),
     7 => array('Cantidad de Inspecciones Abiertas' => 'descrip'),
     8 => array('Juicio Iniciado' => 'descrip'),
     9 => array('Incluir en Juicio?' => 'descrip'));
}

if($p_c_archivo == 3) {
 $filename = 'registros_no_cumplen_rpi';

 $sql = "SELECT  (tmpj.CUIT), (tmpj.DENOMINACION_CONTRIB), (tmpj.TRIBUTO), (tmpj.OBJETO_HECHO), (fun_formato_numerico(tmpj.DEUDA_VENCIDA)), 
                 (tmpj.SIAT_CUIT_RESPPAGO), (tmpj.DENOM_RESPPAGO), (tmpj.FIGURA_RESP_PAGO), (tmpj.COMPARA_RESP_PAGO), (tmpj.COMPARACION_FECHAS),
                 (tmpj.CANT_RESP_SIAT), (tmpj.CANT_RESP_RPI), (tmpj.PROPIETARIOS_SIAT), (tmpj.PROPIETARIOS_RPI), (tmpj.PATRON_RESPPAGO), 
                 (tmpj.RESPPAGO_SIMILAR_RPI), (tmpj.INSPECCIONES_ABIERTAS), (tmpj.JUICIOS_ESTADO_INICIADO), (tmpj.M_VA_JUICIO) 
         FROM tmp_para_juicios tmpj
         WHERE tmpj.id_grupo = :p_id_grupo";

 $titulos = array(0 => array('Cuit' => 'descrip'),
     1 => array('Contribuyente' => 'descrip'),
     2 => array('Tributo' => 'descrip'),
     3 => array('Objeto' => 'descrip'),
     4 => array('Deuda Total' => 'number'),
     5 => array('Cuit de Responsable de Pago' => 'descrip'),
     6 => array('Denominación Responsable de Pago' => 'descrip'),
     7 => array('Figura del Responsable de Pago' => 'descrip'),
     8 => array('Compara Responsable de Pago' => 'descrip'),
     9 => array('Comparación de Fechas' => 'descrip'),
     10 => array('Cantidad de Responsables SIAT' => 'descrip'),
     11 => array('Cantidad de Responsables RPI' => 'descrip'),
     12 => array('Propietarios SIAT' => 'descrip'),
     13 => array('Propietarios RPI' => 'descrip'),
     14 => array('Patrón Responsable de Pago' => 'descrip'),
     15 => array('Responsable de Pago Similar RPI' => 'descrip'),
     16 => array('Cantidad de Inspecciones Abiertas' => 'descrip'),
     17 => array('Juicio Iniciado' => 'descrip'),
     18 => array('Incluir en Juicio?' => 'descrip'));
}

$excel = new TDIExcelXLSX($filename);

$excel->downloadExcel($sql,$parametres,$titulos);

?>
