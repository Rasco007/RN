<?php
/*require_once('../../funciones/db_pager.php');
require_once('../../funciones/query_loader.php');
require_once('../../funciones/funciones.php');
checklogin();*/

/*require_once(FUNCIONES_FRAMEWORK."db_pager.php");
require_once(FUNCIONES_FRAMEWORK."query_loader.php");
require_once(FUNCIONES_FRAMEWORK.'funciones.php');*/

$tipo = $_POST['tipo'];


if($tipo == 'existe_contribuyente'){
	$cuit = str_replace('-','',$_POST['cuit']);
	$t_doc = $_POST['t_doc'];
	$n_doc = $_POST['n_doc'];
	
	if (($cuit!='') or (($t_doc!='') and ($n_doc!=''))){ 
	
		$db_query = new DB_Query("select fun_existe_contribuyente(:cuit,:t_doc,:n_doc) as existe from dual");
		$par = array(':cuit' => $cuit,':t_doc' => $t_doc,':n_doc' => $n_doc);
		$row_query = $db_query->do_query($par);
		
		//print_r($row_query);	
		//die();
			if ($row_query[0]['EXISTE']!= -1){
			
				$db_query = new DB_Query("select d_denominacion,
												 fun_formato_cuit(n_cuit) as n_cuit,
												 c_tipo_documento,
												 (select d_dato from siat.tablas_generales where n_tabla=1 and c_dato=c_tipo_documento) d_c_tipo_documento, 
												 fun_formato_numerico(n_documento,0) as n_documento
										from contribuyentes 
										where id_contribuyente=:id_contribuyente");
				$par = array(':id_contribuyente' => $row_query[0]['EXISTE']);
				$row_query2 = $db_query->do_query($par);
				
				//print_r($row_query2);	
				//die();
				
				$result['d_denominacion'] = $row_query2[0]['D_DENOMINACION'];
				$result['n_cuit'] = $row_query2[0]['N_CUIT'];
				$result['c_tipo_documento'] = $row_query2[0]['C_TIPO_DOCUMENTO'];
				$result['d_c_tipo_documento'] = $row_query2[0]['D_C_TIPO_DOCUMENTO'];
				$result['n_documento'] = $row_query2[0]['N_DOCUMENTO'];
				$result['id_contribuyente'] = $row_query[0]['EXISTE'];
				
			}else{

                if(($t_doc!='') and ($n_doc!='')){

                    $db_query = new DB_Query("select count(1) as V_CANT
                                              from contribuyentes
                                              where c_tipo_documento=:t_doc
                                              and n_documento=:n_doc");
                    $par = array(':t_doc' => $t_doc,':n_doc' => $n_doc);
                    $row_query = $db_query->do_query($par);
                    if ($row_query[0]['V_CANT']> 1){
                        $result['id_contribuyente'] = -2;
                    }else{
                        $result['id_contribuyente'] = -1;
                    }
			    }else{
                    $result['id_contribuyente'] = -1;
                }
            }
    }else{
			$result['id_contribuyente'] = -1;		
	}
		
}

if($tipo == 'existe_contribuyente_consult'){
	$id_contribuyente = $_POST['id_contribuyente'];

	$db_query = new DB_Query("select d_denominacion,
												 fun_formato_cuit(n_cuit) as n_cuit,
												 c_tipo_documento,
												 (select d_dato from siat.tablas_generales where n_tabla=1 and c_dato=c_tipo_documento) d_c_tipo_documento, 
												 fun_formato_numerico(n_documento,0) as n_documento
										from contribuyentes 
										where id_contribuyente=:id_contribuyente");
	$par = array(':id_contribuyente' => $id_contribuyente);
	$row_query2 = $db_query->do_query($par);
				
	//print_r($row_query2);	
	//die();
				
	$result['d_denominacion'] = $row_query2[0]['D_DENOMINACION'];
	$result['n_cuit'] = $row_query2[0]['N_CUIT'];
	$result['c_tipo_documento'] = $row_query2[0]['C_TIPO_DOCUMENTO'];
	$result['d_c_tipo_documento'] = $row_query2[0]['D_C_TIPO_DOCUMENTO'];
	$result['n_documento'] = $row_query2[0]['N_DOCUMENTO'];

		
}
 
if($tipo == 'genera_clave'){
	$db_query = new DB_Query("select pac_encripta.generar_contrasena(8) as clave from dual");
	$row_query2 = $db_query->do_query();				
	//print_r($row_query2);	
	//die();			
	$result['clave'] = $row_query2[0]['CLAVE'];		
}

if($tipo == 'existe_contribuyente_tmp'){
	$cuit = str_replace('-','',$_POST['cuit']);
	$t_doc = $_POST['t_doc'];
	$n_doc = $_POST['n_doc'];
	
	if (($cuit!='') or (($t_doc!='') and ($n_doc!=''))){ 
	
		$db_query = new DB_Query("select fun_existe_contribuyente_tmp(:cuit,:t_doc,:n_doc) as existe from dual");
		$par = array(':cuit' => $cuit,':t_doc' => $t_doc,':n_doc' => $n_doc);
		$row_query = $db_query->do_query($par);
		
		//print_r($row_query);	
		//die();
			if ($row_query[0]['EXISTE']!= -1){
			
				$db_query = new DB_Query("select d_denominacion,
												 fun_formato_cuit(n_cuit) as n_cuit,
												 c_tipo_documento,
												 (select d_dato from siat.tablas_generales where n_tabla=1 and c_dato=c_tipo_documento) d_c_tipo_documento, 
												 fun_formato_numerico(n_documento,0) as n_documento
										from tmp_contribuyentes
										where id_contribuyente=:id_contribuyente");
				$par = array(':id_contribuyente' => $row_query[0]['EXISTE']);
				$row_query2 = $db_query->do_query($par);
				
				//print_r($row_query2);	
				//die();
				
				$result['d_denominacion'] = $row_query2[0]['D_DENOMINACION'];
				$result['n_cuit'] = $row_query2[0]['N_CUIT'];
				$result['c_tipo_documento'] = $row_query2[0]['C_TIPO_DOCUMENTO'];
				$result['d_c_tipo_documento'] = $row_query2[0]['D_C_TIPO_DOCUMENTO'];
				$result['n_documento'] = $row_query2[0]['N_DOCUMENTO'];
				$result['id_contribuyente'] = $row_query[0]['EXISTE'];
				
			}
			else{
				$result['id_contribuyente'] = $row_query[0]['EXISTE'];		
			}
	}
	else{
			$result['id_contribuyente'] = -1;		
	}
		
}


if($tipo == 'nuevo_contribuyente'){
	$cuit = $_POST['n_cuit'];

	$db_query = new DB_Query("select id_contribuyente
							  from tmp_contribuyentes
							  where n_cuit=:n_cuit");
	$par = array(':n_cuit' => $cuit);
	$row_query = $db_query->do_query($par);
	$result['id_contribuyente_tmp'] = $row_query[0]['ID_CONTRIBUYENTE'];		
}


if($tipo == 'tiene_domi_fiscal'){
	$id_contribuyente = $_POST['id_contribuyente'];

	$db_query = new DB_Query("select count(*) as cantidad
							  from domicilios
							  where id_contribuyente=:id_contribuyente
							  and c_tipo_domicilio='1'
							  and f_vig_hasta is null");
	$par = array(':id_contribuyente' => $id_contribuyente);
	$row_query = $db_query->do_query($par);
	$result['resultado'] = $row_query[0]['CANTIDAD'];		
}

if($tipo == 'tiene_mail_telefono'){
	$id_contribuyente = $_POST['id_contribuyente'];

	$db_query = new DB_Query("select count(*) as cantidad
					        from contactos c
					        where exists (select * 
					                        from siat.tablas_generales t 
					                        where t.n_tabla=18 
					                        and t.c_dato=c.c_tipo_contacto 
					                        and t.c_dato in (select 'EMAIL' from dual union select c_dato from siat.tablas_generales p where p.n_tabla=18 and p.c_dato like 'TEL%')  )
					        and c.id_contribuyente=:id_contribuyente
					        and c.f_vig_hasta is null");
	$par = array(':id_contribuyente' => $id_contribuyente);
	$row_query = $db_query->do_query($par);
	$result['resultado'] = $row_query[0]['CANTIDAD'];		
}


if($tipo == 'datos_contribuyente'){
	$cuit = $_POST['n_cuit'];

	$db_query = new DB_Query("select  c.n_cuit, 
						        c.c_tipo_documento,
						        devuelve_descripcion_tb_grales (1,c.c_tipo_documento) as d_tipo_documento, 
						        c.n_documento, 
						        c.d_denominacion,
						        nvl((select d_nombre as descrip from calles c where c.id_calle=   nvl(d.id_calle,-1)),d.d_calle)as d_calle, 
						        d.n_numero, 
						        d.d_monoblock, 
						        d.d_piso, 
						        d.d_depto, 
						        d.d_puerta, 
						        d.d_oficina, 
						        d.d_manzana, 
						        d.c_localidad, 
						        (select d_descrip from localidades where c_localidad=d.c_localidad and c_provincia=d.c_provincia and c_departamento=d.c_departamento) as d_localidad, 
						        d.c_postal, 
						        d.c_departamento,
						        (select d_descrip from departamentos where  c_provincia=d.c_provincia and c_departamento=d.c_departamento) as d_departamento,  
						        d.c_provincia, 
						        devuelve_descripcion_tb_grales (16,d.c_provincia) as d_provincia, 
						        d.id_calle,
						        pf.c_sexo,
						        decode(pf.c_sexo,'F','FEMENINO','MASCULINO') as d_sexo
						from contribuyentes c, domicilios d, personas_fisicas pf
						where c.n_cuit=:n_cuit
						and d.id_contribuyente=c.id_contribuyente
						and pf.id_contribuyente= c.id_contribuyente
						and d.c_tipo_domicilio='1'");
	$par = array(':n_cuit' => $cuit);
	$row_query = $db_query->do_query($par);
	$result['c_tipo_documento'] = $row_query[0]['C_TIPO_DOCUMENTO'];		
	$result['d_tipo_documento'] = $row_query[0]['D_TIPO_DOCUMENTO'];		
	$result['n_documento'] = $row_query[0]['N_DOCUMENTO'];		
	$result['d_denominacion'] = $row_query[0]['D_DENOMINACION'];		
	$result['d_calle'] = $row_query[0]['D_CALLE'];		
	$result['n_numero'] = $row_query[0]['N_NUMERO'];		
	$result['d_monoblock'] = $row_query[0]['D_MONOBLOCK'];		
	$result['d_piso'] = $row_query[0]['D_PISO'];		
	$result['d_depto'] = $row_query[0]['D_DEPTO'];		
	$result['d_puerta'] = $row_query[0]['D_PUERTA'];		
	$result['d_oficina'] = $row_query[0]['D_OFICINA'];		
	$result['d_manzana'] = $row_query[0]['D_MANZANA'];		
	$result['c_localidad'] = $row_query[0]['C_LOCALIDAD'];		
	$result['d_localidad'] = $row_query[0]['D_LOCALIDAD'];		
	$result['c_postal'] = $row_query[0]['C_POSTAL'];		
	$result['c_departamento'] = $row_query[0]['C_DEPARTAMENTO'];		
	$result['d_departamento'] = $row_query[0]['D_DEPARTAMENTO'];		
	$result['c_provincia'] = $row_query[0]['C_PROVINCIA'];		
	$result['d_provincia'] = $row_query[0]['D_PROVINCIA'];			
	$result['id_calle'] = $row_query[0]['ID_CALLE'];		
	$result['c_sexo'] = $row_query[0]['C_SEXO'];		
	$result['d_sexo'] = $row_query[0]['D_SEXO'];		
}

if($tipo == 'tributos'){
	$c_tipo_imponible = $_POST['tipo_imponible'];
	$c_tributo = $_POST['tributo'];
	$db_query = new DB_Query("SELECT tg.d_dato as D_TIPO_IMPONIBLE, t.d_descrip as D_TRIBUTO  FROM tributos t INNER JOIN siat.tablas_generales tg ON T.C_TIPO_IMPONIBLE = TG.C_DATO WHERE t.c_tipo_imponible = :c_tipo_imponible AND t.c_tributo = :c_tributo AND TG.N_TABLA = 3");
	$parametros = array(':c_tipo_imponible' => $c_tipo_imponible,  ':c_tributo' => $c_tributo);
	$row_query = $db_query->do_query($parametros);
	
	$result['c_tipo_imponible'] = $row_query[0]['D_TIPO_IMPONIBLE'];
	$result['c_tributo'] = $row_query[0]['D_TRIBUTO'];
}

if($tipo == 'ult_liquidacion'){
	$p_obl = $_POST['obl'];
	$db_query = new DB_Query("SELECT MAX (LC.ID_LIQUIDACION) LIQ
          FROM LIQ_CAB LC, LIQ_DETALLE LD
         WHERE     LC.ID_LIQUIDACION = LD.ID_LIQUIDACION
           AND LD.ID_OBLIGACION = :P_ID_OBLIGACION
           AND LC.C_ESTADO = 'PROC'
           AND LC.C_TIPO IN ('I','IM','IL')");
	$parametros = array(':p_id_obligacion' => $p_obl);
	$row_query = $db_query->do_query($parametros);

	$result['liq']=$row_query[0]['LIQ'];
}

echo json_encode($result);

?>