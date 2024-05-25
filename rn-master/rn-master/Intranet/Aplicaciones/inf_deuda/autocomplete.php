<?php

$filtro = $_REQUEST['term'];
$oper = $_REQUEST['oper'];
$id_contribuyente = $_POST['contrib'];
$c_tributo = $_POST['c_tributo'];
$c_tipo_imponible = $_POST['c_tipo_imponible'];

if($oper == 1){

    $db_query = new DB_Query("SELECT D_DENOMINACION as denominacion,fun_formato_cuit(n_cuit) as cuit,id_contribuyente ".
			     "FROM CONTRIBUYENTES WHERE ".
			          "SUBSTR(FUN_TRANSFORMAR_CADENA(D_DENOMINACION),1,200) LIKE FUN_TRANSFORMAR_CADENA('%'||:filtro||'%') ".
			     "order by SUBSTR(FUN_TRANSFORMAR_CADENA(D_DENOMINACION),1,200) ".
			     "fetch next 20 rows only");
    $par = array(':filtro' => $filtro);
    $row_query = $db_query->do_query($par);

    for ($i=0; $i < count($row_query); $i++)
    {
        $options[$i]['label'] = $row_query[$i]['DENOMINACION'].' - '.$row_query[$i]['CUIT'];
        $options[$i]['razon_social'] = $row_query[$i]['DENOMINACION'];
        $options[$i]['cuit'] = $row_query[$i]['CUIT'];
        $options[$i]['id_contribuyente'] = $row_query[$i]['ID_CONTRIBUYENTE'];
    }
}

if ($oper == 2){

    $db_query = new DB_Query("SELECT DISTINCT d_objeto_hecho as objeto_hecho,
                                    fun_formato_cuit(n_cuit) as cuit,
                                    C.d_denominacion as denominacion,
                                    CT.id_contribuyente,
                                    CT.F_VIG_DESDE,
                                    ct.f_vig_hasta,
									c_tipo_documento,
									(SELECT 
										d_dato 
									from 
										tablas_generales tg
									where 
										tg.n_tabla = c.n_tabla_tipo_doc
										AND tg.c_dato = c.c_tipo_documento) as d_tipo_documento,
									n_documento
                         FROM
							CONTRIBUYENTES_TRIBUTOS CT, CONTRIBUYENTES C, tributos t
                         WHERE
							UPPER(d_objeto_hecho) LIKE UPPER('%'||:filtro||'%')
							 --AND CT.F_VIG_HASTA IS NULL
							 AND C.ID_CONTRIBUYENTE = NVL(:id_contribuyente,c.id_contribuyente)
							 AND CT.C_TRIBUTO = NVL(:c_tributo,CT.C_TRIBUTO)
							 AND CT.C_TIPO_IMPONIBLE = NVL(:c_tipo_imponible,CT.C_TIPO_IMPONIBLE)
							 AND CT.ID_CONTRIBUYENTE = C.ID_CONTRIBUYENTE
							 and t.c_tipo_imponible = ct.c_tipo_imponible and t.c_tributo = ct.c_tributo
							 AND ROWNUM <= 20
							 ORDER BY d_objeto_hecho, f_vig_hasta desc");

$par = array(':filtro' => $filtro,':id_contribuyente' => $id_contribuyente,':c_tipo_imponible' => $c_tipo_imponible,':c_tributo' => $c_tributo);
$row_query = $db_query->do_query($par);

//print_r($row_query);

for ($i=0; $i < count($row_query); $i++)
	{
		if ($row_query[$i]['F_VIG_HASTA'] != null )
        {
            $hasta = $row_query[$i]['F_VIG_HASTA'];
        }else
        {
            $hasta = 'Actualidad';
        }
		$options['data_obj'][] = array(
        		'objeto_hecho' => $row_query[$i]['OBJETO_HECHO'],
        		'razon_social'    => $row_query[$i]['DENOMINACION'],
				'cuit'   		=> $row_query[$i]['CUIT'],
				'id_contribuyente'	=> $row_query[$i]['ID_CONTRIBUYENTE'],
                'f_vig_desde' => $row_query[$i]['F_VIG_DESDE'],
                'f_vig_hasta' => $hasta,
                'c_tipo_documento' => $row_query[$i]['C_TIPO_DOCUMENTO'],
                'd_c_tipo_documento' => $row_query[$i]['D_TIPO_DOCUMENTO'],
                'n_documento' => $row_query[$i]['N_DOCUMENTO']
    		); 

	}

}	

if ($oper == 3){

$db_query = new DB_Query("SELECT DISTINCT d_objeto_hecho as objeto_hecho,
                                    fun_formato_cuit(n_cuit) as cuit,
                                    C.d_denominacion as denominacion,
                                    CT.id_contribuyente
                         FROM CONTRIBUYENTES_TRIBUTOS CT, CONTRIBUYENTES C, tributos t
                         WHERE UPPER(d_objeto_hecho) = UPPER(NVL(:filtro, d_objeto_hecho))
						-- AND CT.F_VIG_HASTA IS NULL
						 AND C.ID_CONTRIBUYENTE = NVL(:id_contribuyente,c.id_contribuyente)
						 AND CT.C_TRIBUTO = NVL(:c_tributo,CT.C_TRIBUTO)
						 AND CT.C_TIPO_IMPONIBLE = NVL(:c_tipo_imponible,CT.C_TIPO_IMPONIBLE)
                         AND CT.ID_CONTRIBUYENTE = C.ID_CONTRIBUYENTE
						 and t.c_tipo_imponible = ct.c_tipo_imponible and t.c_tributo = ct.c_tributo 
                         AND ROWNUM <= 20");
						 
$par = array(':filtro' => $filtro,':id_contribuyente' => $id_contribuyente,':c_tipo_imponible' => $c_tipo_imponible,':c_tributo' => $c_tributo);
$row_query = $db_query->do_query($par);

//print_r($row_query);

for ($i=0; $i < count($row_query); $i++)
	{
		
		$options['data_obj'][] = array(
        		'objeto_hecho' => $row_query[$i]['OBJETO_HECHO'],
        		'razon_social'    => $row_query[$i]['DENOMINACION'],
				'cuit'   		=> $row_query[$i]['CUIT'],
				'id_contribuyente'	=> $row_query[$i]['ID_CONTRIBUYENTE']
    		); 
	
	}

}

if ($oper == 4){

    $db_query = new DB_Query("SELECT ct.d_objeto_hecho, C.D_DENOMINACION, C.N_CUIT, c.id_contribuyente,count(d_objeto_hecho) over () cantidad
FROM contribuyentes_tributos ct inner join CONTRIBUYENTES C
    on ct.id_contribuyente = c.id_contribuyente
inner join tributos t
    on t.c_tipo_imponible = ct.c_tipo_imponible and T.C_TRIBUTO = ct.c_tributo
where
     ct.c_tributo = nvl(:c_tributo,ct.c_tributo) and
     ct.C_TIPO_IMPONIBLE = nvl(:c_tipo_imponible, ct.c_tipo_imponible)  and
     ct.id_contribuyente = nvl(:id_contribuyente,ct.id_contribuyente) and
     ct.D_OBJETO_HECHO = :d_objeto_hecho");

    $par = array(':filtro' => $filtro,':id_contribuyente' => $id_contribuyente,':c_tipo_imponible' => $c_tipo_imponible,':c_tributo' => $c_tributo,':d_objeto_hecho' => $filtro);
    $row_query = $db_query->do_query($par);

//print_r($row_query);

    for ($i=0; $i < count($row_query); $i++)
    {

        $options['data_obj'][] = array(
            'objeto_hecho' => $row_query[$i]['D_OBJETO_HECHO'],
            'razon_social'    => $row_query[$i]['D_DENOMINACION'],
            'cuit'   		=> $row_query[$i]['N_CUIT'],
            'id_contribuyente'	=> $row_query[$i]['ID_CONTRIBUYENTE'],
            'cantidad' => $row_query[$i]['CANTIDAD']
        );
    }
}


echo json_encode($options);

?>