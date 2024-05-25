<?php

$oper = $_POST['p_oper'];
$filtro = $_POST['p_filtro'];
$p_c_organismo = $_POST['p_c_organismo'];

if ($oper === 'getContribuyente'){
    $db_query = new DB_Query("
    SELECT id_contribuyente,
            fun_formato_cuit (n_cuit) as cuit, 
            d_denominacion as denominacion
    from contribuyentes c
    where n_cuit = :filtro
    and exists (select 1 from v_partidas_riego pr
        where pr.id_contribuyente = c.id_contribuyente
        and (c_organismo_segundo_g = nvl(:c_organismo,c_organismo_segundo_g)
            OR
            c_organismo_primer_g = nvl(:c_organismo,c_organismo_primer_g)))");

    $par = array(':filtro' => $filtro, ':c_organismo' => $p_c_organismo);
    $row_query = $db_query->do_query($par);

    echo json_encode($row_query[0]);
}

if ($oper === 'getAutocomplete'){
    $db_query = new DB_Query("
    SELECT  id_contribuyente,
            fun_formato_cuit (n_cuit) as cuit, 
            d_denominacion as denominacion
    from contribuyentes c
    where substr (fun_transformar_cadena (d_denominacion), 1, 200) like fun_transformar_cadena ('%' || :filtro || '%')
    and exists (select 1 from v_partidas_riego pr
        where pr.id_contribuyente = c.id_contribuyente
        and (c_organismo_segundo_g = nvl(:c_organismo,c_organismo_segundo_g)
            OR
            c_organismo_primer_g = nvl(:c_organismo,c_organismo_primer_g)))
    and rownum <= 5");

    $par = array(':filtro' => $filtro, ':c_organismo' => $p_c_organismo);
    $row_query = $db_query->do_query($par);

    for ($i=0; $i < count($row_query); $i++)
    {
        $options['data_contrib'][] = array(
            'label' => $row_query[$i]['CUIT'].' - '.$row_query[$i]['DENOMINACION'],
            'razon_social' => $row_query[$i]['DENOMINACION'],
            'cuit' => $row_query[$i]['CUIT'],
            'id_contribuyente' => $row_query[$i]['ID_CONTRIBUYENTE']
        );
    }

    echo json_encode($options);
}

if ($oper === 'getDatos'){
    $p_id_contribuyente = $_POST['p_id_contribuyente'];
    $p_n_partida = $_POST['p_n_partida'];
    $p_d_nomenclatura = $_POST['p_d_nomenclatura'];
    $p_n_regante = $_POST['p_n_regante'];

    $db_query = new DB_Query("
    SELECT
        c_organismo_primer_g, d_organismo_primer_g,
        c_region, d_region,
        c_area, d_area,
        pr.n_partida objeto,
        n_regante,
        id_contribuyente,
        (select fun_formato_cuit (n_cuit) from contribuyentes where id_contribuyente = pr.id_contribuyente) n_cuit,
        (select d_denominacion from contribuyentes where id_contribuyente=pr.id_contribuyente) d_denominacion,
        explode_nuevo('-',siat.fun_nomenclatura_catastro(pr.d_nomenclatura_real),1) departamento,
        explode_nuevo('-',siat.fun_nomenclatura_catastro(pr.d_nomenclatura_real),2) circunscripcion,
        explode_nuevo('-',siat.fun_nomenclatura_catastro(pr.d_nomenclatura_real),3) seccion,
        explode_nuevo('-',siat.fun_nomenclatura_catastro(pr.d_nomenclatura_real),4) u_caracteristica,
        explode_nuevo('-',siat.fun_nomenclatura_catastro(pr.d_nomenclatura_real),5) parcela,
        explode_nuevo('-',siat.fun_nomenclatura_catastro(pr.d_nomenclatura_real),6) u_funcional
    from V_PARTIDAS_RIEGO pr
    where (c_organismo_segundo_g = nvl(:c_organismo,c_organismo_segundo_g)
        OR
        c_organismo_primer_g = nvl(:c_organismo,c_organismo_primer_g))
    and id_contribuyente = nvl(:p_id_contribuyente,id_contribuyente)
    and pr.n_partida = nvl(:p_n_partida, pr.n_partida)
    and siat.fun_nomenclatura_catastro(pr.d_nomenclatura_real) = nvl(:p_d_nomenclatura, siat.fun_nomenclatura_catastro(pr.d_nomenclatura_real))
    and nvl(pr.n_regante, -1) = nvl(nvl(:p_n_regante,pr.n_regante), -1)
    and pr.m_activa = 'S'");


    $param_query = array(
        ':c_organismo' => $p_c_organismo,
        ':p_id_contribuyente' => $p_id_contribuyente,
        ':p_n_partida' => $p_n_partida,
        ':p_d_nomenclatura' => $p_d_nomenclatura,
        ':p_n_regante' => $p_n_regante
    );
    $row_query = $db_query->do_query($param_query);

    if (count($row_query) == 1){
        $result->c_organismo_primer_g = $row_query[0]['C_ORGANISMO_PRIMER_G'];
        $result->d_organismo_primer_g = $row_query[0]['D_ORGANISMO_PRIMER_G'];
        $result->c_region = $row_query[0]['C_REGION'];
        $result->d_region = $row_query[0]['D_REGION'];
        $result->c_area = $row_query[0]['C_AREA'];
        $result->d_area = $row_query[0]['D_AREA'];
        $result->objeto = $row_query[0]['OBJETO'];
        $result->regante = $row_query[0]['N_REGANTE'];
        $result->id_contribuyente = $row_query[0]['ID_CONTRIBUYENTE'];
        $result->n_cuit = $row_query[0]['N_CUIT'];
        $result->d_denominacion = $row_query[0]['D_DENOMINACION'];
        $result->departamento = $row_query[0]['DEPARTAMENTO'];
        $result->circunscripcion = $row_query[0]['CIRCUNSCRIPCION'];
        $result->seccion = $row_query[0]['SECCION'];
        $result->u_caracteristica = $row_query[0]['U_CARACTERISTICA'];
        $result->parcela = $row_query[0]['PARCELA'];
        $result->u_funcional = $row_query[0]['U_FUNCIONAL'];
        $result->n_regante = $row_query[0]['N_REGANTE'];
        $result->resultado = 'OK';
    }else{
        $result->resultado = 'NOOK';
        $result->error = 'La partida / nomenclatura seleccionada no existe, no pertenece a su consorcio o no se encuentra vigente para el tributo.';
    }

    echo json_encode($result);
}

if ($oper === 'getCreditos'){
    $p_id_contribuyente = $_POST['p_id_contribuyente'];
    $p_n_partida = $_POST['p_n_partida'];
    $p_c_tipo_concepto = $_POST['p_c_tipo_concepto'];
    $p_f_credito = $_POST['p_f_credito'];

    $db_query = new DB_Query(
		"SELECT
			v.id_nota_cred,
			round(v.saldo + (v.saldo * v.coeficiente), 2) i_credito
		from (
			select r.id_nota_cred, Fun_Calculo_Saldo_Conc(o.id_obligacion, NULL, o.c_concepto) saldo,
				(select Pak_Compensacion.fun_calculo_coeficiente(c.f_movimiento, :p_f_credito, 20)
			from cuenta_corriente c where id_obligacion = r.id_nota_cred and n_secuencia_obl = 1) coeficiente
			from TMP_NOTA_CRED_CDR r, obligaciones o where r.id_nota_cred = o.id_obligacion and id_contribuyente = :id_contribuyente
			and d_objeto_hecho = :n_partida and (r.c_tipo_concepto = :c_tipo_concepto or r.c_tipo_concepto = 0)
			and Fun_Calculo_Saldo_Conc(o.id_obligacion, NULL, o.c_concepto) > 0
		) v"
	);

    $param_query = array(
        ':id_contribuyente' => $p_id_contribuyente,
        ':n_partida' => $p_n_partida,
        ':c_tipo_concepto' => $p_c_tipo_concepto,
        ':p_f_credito' => $p_f_credito
    );
	
    $row_query = $db_query->do_query($param_query);

    if (count($row_query) == 1){
        $result->id_nota_cred = $row_query[0]['ID_NOTA_CRED'];
        $result->i_credito = $row_query[0]['I_CREDITO'];		
        $result->n_cant = 1;
        $result->resultado = 'OK';
    }else{
		if (count($row_query) == 0){
			$result->n_cant = 0;
			$result->resultado = 'OK';
		}else{
			$result->n_cant = 2;
			$result->resultado = 'OK';
		}
    }

    echo json_encode($result);
}

if ($oper === 'getDeuda'){
    $p_id_contribuyente = $_POST['p_id_contribuyente'];
    $p_n_partida = $_POST['p_n_partida'];
    $p_c_tipo_concepto = $_POST['p_c_tipo_concepto'];
    $p_f_credito = $_POST['p_f_credito'];

    $db_query = new DB_Query(
        "SELECT
            CASE 
            when exists(
                SELECT 1
                FROM consorcios_conceptos c, cuenta_corriente cta, obligaciones o
                WHERE c.c_organismo = nvl(:p_c_consorcio,c.c_organismo)
                    and c.c_concepto = cta.c_concepto_mov
                    and cta.id_obligacion = o.id_obligacion
                    and c.c_concepto<380
                    and 1 = (
                        case when :p_c_tipo_concepto = 0 then 1
                        when :p_c_tipo_concepto = 1 and c.c_concepto in (360,365) then 1
                        when :p_c_tipo_concepto = 2 and c.c_concepto in (350,355) then 1
                        else 0 end
                    )
                    and o.c_tipo_imponible = '16'
                    and o.c_tributo = 160
                    and o.id_contribuyente = :p_id_contribuyente
                    and o.d_objeto_hecho = to_char(:p_n_partida)
                group by o.id_obligacion, o.n_secuencia_obl, o.id_contribuyente, o.d_objeto_hecho, o.n_posicion_fiscal, o.n_cuota_anticipo, o.f_vto_pago, cta.c_concepto_mov
                having sum(i_movimiento) + fun_calculo_interes_obl_c(o.id_obligacion, :p_f_credito,'I',1,cta.c_concepto_mov) < 0) then
                'DEUDA'
            else
                'NODEUDA'
            END M_DEUDA
        FROM DUAL"
    );

    $param_query = array(
        ':p_c_consorcio' => $p_c_organismo,
        ':p_id_contribuyente' => $p_id_contribuyente,
        ':p_n_partida' => $p_n_partida,
        ':p_c_tipo_concepto' => $p_c_tipo_concepto,
        ':p_f_credito' => $p_f_credito
    );
    
    $row_query = $db_query->do_query($param_query);

    $result->m_deuda = $row_query[0]['M_DEUDA'];

    echo json_encode($result);
}

?>