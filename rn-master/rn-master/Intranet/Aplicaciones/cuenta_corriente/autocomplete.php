<?php
/*require_once('../../funciones/db_pager.php');
require_once('../../funciones/query_loader.php');
require_once('../../funciones/funciones.php');
checklogin();*/
/*require_once(FUNCIONES_FRAMEWORK."db_pager.php");
require_once(FUNCIONES_FRAMEWORK."query_loader.php");
require_once(FUNCIONES_FRAMEWORK.'funciones.php');*/

$filtro = $_POST['term'];
$oper = $_POST['oper'];
$id_contribuyente = $_POST['contrib'];
$c_tributo = $_POST['c_tributo'];
$c_tipo_imponible = $_POST['c_tipo_imponible'];
$c_tipo_objeto = $_POST['c_tipo_objeto'];


// No se utiliza porque es muy deficiente en la busqueda
if ($oper == 0){

$db_query = new DB_Query("SELECT DISTINCT O.D_OBJETO as OBJETO_HECHO FROM OBJETOS O WHERE
                          SUBSTR(FUN_TRANSFORMAR_CADENA(O.D_OBJETO),1,200) LIKE
                          FUN_TRANSFORMAR_CADENA('%'||:filtro||'%')
                          order by SUBSTR(FUN_TRANSFORMAR_CADENA(O.D_OBJETO),1,200)
						  fetch next 5 rows only");
						 
$par = array(':filtro' => $filtro,':c_tipo_objeto' => $c_tipo_objeto);
$row_query = $db_query->do_query($par);

//print_r($row_query);

for ($i=0; $i < count($row_query); $i++)
	{
		
		$options['data_obj_2'][] = array(
        		'objeto_hecho' => $row_query[$i]['OBJETO_HECHO']
    		); 
	
	}

}

if($oper == 1){
										
$db_query = new DB_Query("SELECT D_DENOMINACION as denominacion,fun_formato_cuit(n_cuit) as cuit,id_contribuyente FROM CONTRIBUYENTES WHERE 
								SUBSTR(FUN_TRANSFORMAR_CADENA(D_DENOMINACION),1,200) LIKE FUN_TRANSFORMAR_CADENA('%'||:filtro||'%')
								and rownum <= 5 order by SUBSTR(FUN_TRANSFORMAR_CADENA(D_DENOMINACION),1,200)");
										
$par = array(':filtro' => $filtro);
$row_query = $db_query->do_query($par);

//print_r($row_query);

for ($i=0; $i < count($row_query); $i++)
	{
		
		$options['data_raz'][] = array(        		
			'razon_social'    => $row_query[$i]['DENOMINACION'],
			'cuit'   		=> $row_query[$i]['CUIT'],
			'id_contribuyente'	=> $row_query[$i]['ID_CONTRIBUYENTE']
		); 
		
	}

}

if ($oper == 2){

$db_query = new DB_Query("SELECT DISTINCT d_objeto_hecho as objeto_hecho
                          FROM CONTRIBUYENTES_TRIBUTOS CT
                          WHERE UPPER(d_objeto_hecho) LIKE UPPER('%'||:filtro||'%')
						  AND CT.C_TIPO_IMPONIBLE = nvl(:c_tipo_imponible,CT.C_TIPO_IMPONIBLE)
                          AND CT.c_tributo = :c_tributo
                          AND ROWNUM <= 5");
						 
$par = array(':filtro' => $filtro,':c_tipo_imponible' => $c_tipo_imponible,':c_tributo' => $c_tributo);
$row_query = $db_query->do_query($par);

//print_r($row_query);

for ($i=0; $i < count($row_query); $i++)
	{
		
		$options['data_obj'][] = array(
        		'objeto_hecho' => $row_query[$i]['OBJETO_HECHO'],
    		); 
	
	}

}	

if ($oper == 3){

$db_query = new DB_Query("SELECT DISTINCT d_objeto_hecho as objeto_hecho,
                                    fun_formato_cuit(n_cuit) as cuit,
                                    C.d_denominacion as denominacion,
                                    CT.id_contribuyente,
									t.c_tipo_objeto as TIPO
                         FROM CONTRIBUYENTES_TRIBUTOS CT, CONTRIBUYENTES C, tributos t
                         WHERE UPPER(d_objeto_hecho) = UPPER(:filtro)
						 AND CT.F_VIG_HASTA IS NULL
						 AND C.ID_CONTRIBUYENTE = NVL(:id_contribuyente,c.id_contribuyente)
						 AND CT.C_TRIBUTO = NVL(:c_tributo,CT.C_TRIBUTO)
						 AND CT.C_TIPO_IMPONIBLE = NVL(:c_tipo_imponible,CT.C_TIPO_IMPONIBLE)
                         AND CT.ID_CONTRIBUYENTE = C.ID_CONTRIBUYENTE
						 and t.c_tipo_imponible = ct.c_tipo_imponible and t.c_tributo = ct.c_tributo 
						 and upper(nvl(:c_tipo_objeto,t.c_tipo_objeto)) = upper(t.c_tipo_objeto)
                         AND ROWNUM <= 5");
						 
$par = array(':filtro' => $filtro,':id_contribuyente' => $id_contribuyente,':c_tipo_imponible' => $c_tipo_imponible,':c_tributo' => $c_tributo,':c_tipo_objeto' => $c_tipo_objeto);
$row_query = $db_query->do_query($par);

//print_r($row_query);

for ($i=0; $i < count($row_query); $i++)
	{
		
		$options['data_obj'][] = array(
        		'objeto_hecho' => $row_query[$i]['OBJETO_HECHO'],
        		'razon_social'    => $row_query[$i]['DENOMINACION'],
				'cuit'   		=> $row_query[$i]['CUIT'],
				'id_contribuyente'	=> $row_query[$i]['ID_CONTRIBUYENTE'],
				'c_tipo_objeto' => $row_query[$i]['TIPO']
    		); 
	
	}

}	


echo json_encode($options);

?>