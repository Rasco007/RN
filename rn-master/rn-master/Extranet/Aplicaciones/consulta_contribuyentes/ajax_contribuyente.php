<?php
$tipo = $_POST['tipo'];

if($tipo == 'existe_contribuyente_consult'){
	$id_contribuyente = htmlentities($_POST['id_contribuyente']);

	$db_query = new DB_Query("select d_denominacion,
												 fun_formato_cuit(n_cuit) as n_cuit,
												 c_tipo_documento,
												 (select d_dato from tablas_generales where n_tabla=1 and c_dato=c_tipo_documento) d_c_tipo_documento, 
												 fun_formato_numerico(n_documento,0) as n_documento
										from contribuyentes 
										where id_contribuyente=:id_contribuyente");
	$par = array(':id_contribuyente' => $id_contribuyente);
	$row_query2 = $db_query->do_query($par);
				
	$result['d_denominacion'] = $row_query2[0]['D_DENOMINACION'];
	$result['n_cuit'] = $row_query2[0]['N_CUIT'];
	$result['c_tipo_documento'] = $row_query2[0]['C_TIPO_DOCUMENTO'];
	$result['d_c_tipo_documento'] = $row_query2[0]['D_C_TIPO_DOCUMENTO'];
	$result['n_documento'] = $row_query2[0]['N_DOCUMENTO'];
}
 
if($tipo == 'tiene_dom_fiscal'){
	$id_contribuyente = $_POST['id_contribuyente'];

	$db_query = new DB_Query(
	"SELECT count(1) as cantidad
		from domicilios
		where id_contribuyente = :id_contribuyente
			and c_tipo_domicilio='1'
			and f_vig_hasta is null");

	$par = array(':id_contribuyente' => $id_contribuyente);
	$row_query = $db_query->do_query($par);
	$result['resultado'] = $row_query[0]['CANTIDAD'];		
}

if($tipo == 'tiene_responsable'){
	$id_contribuyente = $_POST['id_contribuyente'];

	$db_query = new DB_Query(
	"SELECT count(1) as cantidad
		from integrantes
		where id_contribuyente=:id_contribuyente");

	$par = array(':id_contribuyente' => $id_contribuyente);
	$row_query = $db_query->do_query($par);
	$result['resultado'] = $row_query[0]['CANTIDAD'];		
}

if($tipo == 'datos_contribuyente'){
	$cuit = htmlentities($_POST['n_cuit']);

	$db_query = new DB_Query(
		"SELECT  c.n_cuit, 
	        c.c_tipo_documento,
	        (select d_dato from tablas_generales where n_tabla=1 and c_dato = c.c_tipo_documento) as d_tipo_documento, 
	        c.n_documento, 
	        c.d_denominacion,
	        pf.c_sexo
		from contribuyentes c, personas_fisicas pf
		where c.n_cuit=:n_cuit
		and pf.id_contribuyente= c.id_contribuyente");
	$par = array(':n_cuit' => $cuit);
	$row_query = $db_query->do_query($par);
	$result['c_tipo_documento'] = $row_query[0]['C_TIPO_DOCUMENTO'];		
	$result['d_tipo_documento'] = $row_query[0]['D_TIPO_DOCUMENTO'];		
	$result['n_documento'] = $row_query[0]['N_DOCUMENTO'];		
	$result['d_denominacion'] = $row_query[0]['D_DENOMINACION'];		
	$result['c_sexo'] = $row_query[0]['C_SEXO'];		
}

if($tipo == 'tipo_d_valor'){
	$query_valores = $_POST['d_dato1'];

	if($query_valores != ""){
		$db_query = new DB_Query($query_valores);

		$row_query = $db_query->do_query();

		$result->campo = "<select name='d_valor' id='d_valor' title='Seleccione' class='validate[required,,maxSize[100]] FormElement form-control'>";

		for ($i=0; $i < count($row_query); $i++){
			$result->campo .= '<option value="'.$row_query[$i]['C2'].'">'.$row_query[$i]['C2'].'</option>';
	    }

	    $result->campo .= "</select>";

	}else{
		$result->campo = '<input type="text" class="validate[required,,maxSize[100]] FormElement form-control" size="50" id="d_valor" name="d_valor" rowid="_empty" role="textbox">';
	}
}

if($tipo == 'datos_regimen'){
	$oper = $_POST['oper'];

	if($oper == 'descripcion'){
		$c_regimen = $_POST['c_regimen'];
		$c_tipo_actividad = $_POST['c_tipo_actividad'];

		$db_query = new DB_Query(
			"SELECT
				(select d_dato from tablas_generales
				where n_tabla=11
				and c_dato=:c_regimen) d_regimen,
				(select d_dato from tablas_generales
				where n_tabla=40
				and c_dato=:c_tipo_actividad) d_tipo_actividad
			FROM dual");

		$par = array(':c_regimen' => $c_regimen,
					':c_tipo_actividad' => $c_tipo_actividad);
		$row_query = $db_query->do_query($par);
	}else{
		$id_contribuyente = $_POST['p_id_contribuyente'];
		$c_tipo_imponible = $_POST['p_tipo_imponible'];
		$objeto = $_POST['p_objeto'];

		$db_query = new DB_Query(
		"SELECT
			c_regimen,
			(select d_dato from tablas_generales
			where n_tabla=11
			and c_dato=rib.c_regimen) d_regimen,
			c_tipo_actividad,
			(select d_dato from tablas_generales
			where n_tabla=40
			and c_dato=rib.c_tipo_actividad) d_tipo_actividad,
			c_categoria,
			f_vig_desde,
			f_vig_hasta
		FROM regimenes_ib rib
		where id_contribuyente = :id_contribuyente
		and c_tipo_imponible = :c_tipo_imponible
		and d_objeto_hecho = :d_objeto_hecho
		and f_vig_hasta is null");

		$par = array(':id_contribuyente' => $id_contribuyente,
					':c_tipo_imponible' => $c_tipo_imponible,
					':d_objeto_hecho' => $objeto);
		$row_query = $db_query->do_query($par);

		$result['c_regimen'] = $row_query[0]['C_REGIMEN'];
		$result['c_tipo_actividad'] = $row_query[0]['C_TIPO_ACTIVIDAD'];
		$result['c_categoria'] = $row_query[0]['C_CATEGORIA'];
		$result['f_vig_desde'] = $row_query[0]['F_VIG_DESDE'];
		$result['f_vig_hasta'] = $row_query[0]['F_VIG_HASTA'];
	}
	
	$result['d_regimen'] = $row_query[0]['D_REGIMEN'];	
	$result['d_tipo_actividad'] = $row_query[0]['D_TIPO_ACTIVIDAD'];
}

if($tipo == 'datos_agente'){
	$id_contribuyente = $_POST['p_id_contribuyente'];
	$c_tipo_imponible = $_POST['p_tipo_imponible'];
	$c_tributo = $_POST['p_tributo'];
	$objeto = $_POST['p_objeto'];

	$db_query = new DB_Query(
	"SELECT
	    codorganismo,
	    (select d_dato from tablas_generales
	    where n_tabla=256
	    and c_dato= ia.codorganismo) d_organismo,
	    denominacion,
	    act_desarrolla,
	    act_retiene,
	    anexo_ppal,
	    anexo_1,
	    anexo_2,
	    contacto_operativo,
	    contacto_administrativo
	from informacion_agentes ia
	where id_contribuyente = :id_contribuyente
	and c_tipo_imponible = :c_tipo_imponible
	and c_tributo = :c_tributo
	and d_objeto_hecho = :d_objeto_hecho");
	
	$par = array(':id_contribuyente' => $id_contribuyente,
				':c_tipo_imponible' => $c_tipo_imponible,
				':c_tributo' => $c_tributo,
				':d_objeto_hecho' => $objeto);
	$row_query = $db_query->do_query($par);

	$result['codorganismo'] = $row_query[0]['CODORGANISMO'];
	$result['d_organismo'] = $row_query[0]['D_ORGANISMO'];
	$result['denominacion'] = $row_query[0]['DENOMINACION'];
	$result['act_desarrolla'] = $row_query[0]['ACT_DESARROLLA'];
	$result['act_retiene'] = $row_query[0]['ACT_RETIENE'];
	$result['anexo_ppal'] = $row_query[0]['ANEXO_PPAL'];
	$result['anexo_1'] = $row_query[0]['ANEXO_1'];
	$result['anexo_2'] = $row_query[0]['ANEXO_2'];
	$result['contacto_operativo'] = $row_query[0]['CONTACTO_OPERATIVO'];
	$result['contacto_administrativo'] = $row_query[0]['CONTACTO_ADMINISTRATIVO'];
}

if($tipo == 'permite_vs'){
	$m_persona = $_POST['m_persona'];
	$id_contribuyente = $_POST['id_contribuyente'];
	$c_tributo = $_POST['c_tributo'];

	$db_query = new DB_Query(
	"SELECT 
		case PAC_CONTRIBUYENTES.permite_vs(:m_persona, :id_contribuyente, :c_tributo)
			when 1 then 'SI'
			else 'NO'
		end permite_vs
	from dual");

	$par = array(':m_persona' => $m_persona,
				':id_contribuyente' => $id_contribuyente,
				':c_tributo' => $c_tributo);
	$row_query = $db_query->do_query($par);

	$result['permite_vs'] = $row_query[0]['PERMITE_VS'];
}

echo json_encode($result);

?>