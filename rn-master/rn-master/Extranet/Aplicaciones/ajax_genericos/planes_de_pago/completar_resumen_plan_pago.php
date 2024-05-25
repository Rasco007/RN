<?php
$c_tipo_plan_pago = htmlentities($_POST['c_tipo_plan_pago']);
$n_plan_pago= htmlentities($_POST['n_plan_pago']);

$parametros = array(':c_tipo_plan_pago'=>$c_tipo_plan_pago,':n_plan_pago'=>$n_plan_pago);


//traigo datos de saldo pendiente.
$db_query = new DB_Query("select fun_formato_numerico(sum(abs(case
                        when fun_calculo_saldo(ppc.id_obligacion,null) <= 0 then fun_calculo_saldo(ppc.id_obligacion,null)
                        else 0
                    end))) as saldo_formated,
                    sum(abs(case
                        when fun_calculo_saldo(ppc.id_obligacion,null) <= 0 then fun_calculo_saldo(ppc.id_obligacion,null)
                        else 0
                    end)) as saldo_num
					from planes_de_pago_cuotas ppc
					where c_tipo_plan_pago = :c_tipo_plan_pago
					and n_plan_pago = :n_plan_pago ");

												
$row_query = $db_query->do_query($parametros);
$result->saldo_pend = $row_query[0]['SALDO_FORMATED'];
$result->saldo_pend_num = $row_query[0]['SALDO_NUM'];

//traigo datos de Deuda Total Incluida.
/*$db_query = new DB_Query("select sum (nvl(ppd.i_historico,0) + nvl(ppd.i_multa,0) + nvl(ppd.i_interes,0)) deuda_tot_inclu
						from planes_de_pago pp, planes_de_pago_detalle ppd
						where ppd.c_tipo_plan_pago = :c_tipo_plan_pago
						and ppd.n_plan_pago = :n_plan_pago
						and pp.c_tipo_plan_pago = ppd.c_tipo_plan_pago
						and pp.n_plan_pago = ppd.n_plan_pago
						and ppd.m_desasociado is null");
	
$row_query = $db_query->do_query($parametros);				

$result->i_deuda_tot_inclu=$row_query[0]['DEUDA_TOT_INCLU'];

*/



//traigo datos de periodicidad y clasificacion
$db_query = new DB_Query("select tpp.c_clasificacion clasificacion,tg.d_dato periodicidad,tpp.d_reporte_caducidad
					from tipos_planes_de_pago tpp,tablas_generales tg
					where c_tipo_plan_pago = :c_tipo_plan_pago
					and tg.n_tabla= tpp.n_tabla_period
    				and tg.c_dato= tpp.c_periodicidad");

												
$row_query = $db_query->do_query($parametros);
$clasificacion= $row_query[0]['CLASIFICACION'];
$result->periodicidad=$row_query[0]['PERIODICIDAD'];
$result->d_reporte_cad=$row_query[0]['D_REPORTE_CADUCIDAD'];


 


//datos sin descuento sobre capital,interes,multa
$db_query = new DB_Query("select sum (nvl(i_historico,0) + nvl(i_capital_descontado,0)) cap_sin_desc,sum(nvl(ppd.i_interes,0) + nvl(ppd.i_interes_descontado,0)) int_sin_desc,sum(nvl(ppd.i_multa,0) + nvl(ppd.i_multa_descontado,0)) mul_sin_desc
						from planes_de_pago_detalle ppd
						where ppd.c_tipo_plan_pago = :c_tipo_plan_pago
						and ppd.n_plan_pago = :n_plan_pago");
	
$row_query = $db_query->do_query($parametros);				

$result->i_capital_sin_desc=$row_query[0]['CAP_SIN_DESC'];
$result->i_intereses_sin_desc = $row_query[0]['INT_SIN_DESC'];
$result->i_multa_sin_desc = $row_query[0]['MUL_SIN_DESC'];


$db_query = new DB_Query("select sum (nvl(i_historico,0) + nvl(i_capital_descontado,0)) multa_sin_desc,sum (nvl(i_capital_descontado,0)) i_multa_desc,sum (nvl(i_historico,0)) i_multa_ori
						from planes_de_pago_detalle ppd
						where ppd.c_tipo_plan_pago = :c_tipo_plan_pago
						and ppd.n_plan_pago = :n_plan_pago
						and ppd.c_concepto_mov between 910 and  950");
	
$row_query = $db_query->do_query($parametros);

$i_multa_sin_desc=$row_query[0]['MULTA_SIN_DESC'];
$i_desc_multa = $row_query[0]['I_MULTA_DESC'];
$i_multa_original=$row_query[0]['I_MULTA_ORI'];



//datos de descuento sobre capital,interes,multa
$db_query = new DB_Query("select sum (nvl(i_capital_descontado,0)) I_CAPITAL_DESC,sum(nvl(ppd.i_interes_descontado,0)) I_INTERES_DESC,sum(nvl(ppd.i_multa_descontado,0)) I_MULTA_DESC
						from planes_de_pago_detalle ppd
						where ppd.c_tipo_plan_pago = :c_tipo_plan_pago
						and ppd.n_plan_pago = :n_plan_pago");
	
$row_query = $db_query->do_query($parametros);				

$result->i_capital_desc=$row_query[0]['I_CAPITAL_DESC'];
$result->i_intereses_desc = $row_query[0]['I_INTERES_DESC'];
$result->i_multa_desc = $row_query[0]['I_MULTA_DESC'];

//datos de capital,interes,multa y deuda actualizada
$db_query = new DB_Query("select sum (nvl(i_historico,0)) i_capital_ori,sum(nvl(ppd.i_interes,0)) i_interes_ori,sum(nvl(ppd.i_multa,0)) i_multa_ori
						from planes_de_pago_detalle ppd
						where ppd.c_tipo_plan_pago = :c_tipo_plan_pago
						and ppd.n_plan_pago = :n_plan_pago");

$row_query = $db_query->do_query($parametros);

$i_capital_ori=$row_query[0]['I_CAPITAL_ORI'];
$i_intereses_ori = $row_query[0]['I_INTERES_ORI'];
$i_multa_ori = $row_query[0]['I_MULTA_ORI'];

//Ajusto multa para que quede exlcuida fuera de capital y se contabilice como multa.

//Montos de deuda
$result->i_capital_sin_desc=$result->i_capital_sin_desc - $i_multa_sin_desc;
$result->i_multa_sin_desc =$result->i_multa_sin_desc +  $i_multa_sin_desc;
//Montos de descuentos
$result->i_capital_desc= $result->i_capital_desc - $i_desc_multa;
$result->i_multa_desc = $result->i_multa_desc + $i_desc_multa;
//Montos actualizados
$i_capital_ori=$i_capital_ori - $i_multa_original;
$i_multa_ori = $i_multa_ori + $i_multa_original;

//cantidad de cuotas impagas(solo para la liquidacion)
$db_query = new DB_Query("select count(*) cuotas_impagas
						from planes_De_pago_cuotas ppc,obligaciones o
						where ppc.c_tipo_plan_pago = :c_tipo_plan_pago
						and ppc.n_plan_pago = :n_plan_pago
						and ppc.id_obligacion= o.id_obligacion 
						and (o.i_saldo + devuelve_tolerancia (null)) < 0");

$row_query = $db_query->do_query($parametros);	
$result->cuotas_impagas=$row_query[0]['CUOTAS_IMPAGAS']; 

$db_query = new DB_Query("select 'S' liq_vigente
						from planes_De_pago pp
						where pp.c_tipo_plan_pago = :c_tipo_plan_pago
						and pp.n_plan_pago = :n_plan_pago
						and (pp.f_liquidacion is not null and f_liquidacion >= trunc(sysdate))");

$row_query = $db_query->do_query($parametros);	
$result->liq_vigente=$row_query[0]['LIQ_VIGENTE']; 

//Defino si el plan esta en estado proyecto
$db_query = new DB_Query("select 'S' proyecto
						from planes_De_pago pp
						where pp.c_tipo_plan_pago = :c_tipo_plan_pago
						and pp.n_plan_pago = :n_plan_pago
						and (pp.f_efectivacion is null and f_caducidad is null)");

$row_query = $db_query->do_query($parametros);	
$result->proyecto=$row_query[0]['PROYECTO']; 

//Defino si el plan ya esta caducado
$db_query = new DB_Query("select 'S' caduco
						from planes_de_pago pp,tablas_generales tg
						where pp.c_tipo_plan_pago = :c_tipo_plan_pago
						and pp.n_plan_pago = :n_plan_pago
						and tg.n_tabla=pp.n_tabla_tipo_cad
						and tg.c_dato=pp.c_caducidad
						and tg.d_dato2='CADUCIDAD'
						and f_caducidad is not null");

$row_query = $db_query->do_query($parametros);	
$result->caduco=$row_query[0]['CADUCO']; 


//traigo datos en gral.

$db_query = new DB_Query("select 
	pp.c_tipo_imponible_origen c_tipo_imponible,
	(select initcap(d_dato) 
		from tablas_generales tg
		where  tg.n_tabla=pp.n_tabla_tipo_imp and 
			tg.c_dato=pp.c_tipo_imponible_origen) d_tipo_imponible,
	pp.c_tributo_origen c_tributo,
	(select initcap(d_descrip) 
		from tributos t where  t.c_tipo_imponible=pp.c_tipo_imponible_origen and 
		t.c_tributo=pp.c_tributo_origen) d_tributo,
	pp.d_domicilio d_domicilio,	
    pp.d_telefono telefono,
    pp.d_mail mail,    
    pp.n_cuotas n_cuotas,
    pp.c_caducidad c_caducidad,
    (select d_dato from tablas_generales where n_tabla=pp.n_tabla_tipo_cad and c_dato=pp.c_caducidad)d_caducidad,
    pp.f_caducidad f_caducidad,
    (select d_dato from tablas_generales where n_tabla=pp.n_tabla_calculo and c_dato=c_tipo_calculo)d_calculo,
    pp.f_efectivacion f_efectivo,
    pp.c_usuario_efec c_usuario_efect,
    pp.f_emision f_emision,
    pp.i_actualizado i_total_deuda,
    pp.i_intereses i_intereses,
    pp.i_total i_total,
    pp.n_coef_impago n_coef_impago,
    pp.n_coef_cuotas n_coef_cuotas,
    (select d_dato from tablas_generales where n_tabla=385 and c_dato=fun_situacion_plan (pp.n_plan_pago, pp.c_tipo_plan_pago)) situacion,
    pp.f_emision_real f_alta,
    pp.c_usuarioalt c_usuarioalt,
    pp.d_observaciones observaciones,
	pp.f_marca_caducidad f_marca_caducidad,
 	pp.f_liquidacion f_liquidacion
	from planes_de_pago pp 
	where c_tipo_plan_pago = :c_tipo_plan_pago and n_plan_pago = :n_plan_pago");
	

 
$row_query = $db_query->do_query($parametros);



// Cargo los valores hasta el momento a $result =  Array();

$result->f_marca_caducidad = $row_query[0]['F_MARCA_CADUCIDAD'];
$result->c_tipo_imponible = $row_query[0]['C_TIPO_IMPONIBLE'];
$result->d_tipo_imponible = $row_query[0]['D_TIPO_IMPONIBLE'];
$result->c_tributo = $row_query[0]['C_TRIBUTO'];
$result->d_tributo = $row_query[0]['D_TRIBUTO'];
$result->d_domicilio = $row_query[0]['D_DOMICILIO'];
$result->d_telefono = $row_query[0]['TELEFONO'];
$result->d_mail = $row_query[0]['MAIL'];
$result->n_cuotas = $row_query[0]['N_CUOTAS'];
$result->c_caducidad = $row_query[0]['C_CADUCIDAD'];
$result->d_caducidad = $row_query[0]['D_CADUCIDAD'];
$result->f_caducidad = $row_query[0]['F_CADUCIDAD'];
$result->f_liquidacion = $row_query[0]['F_LIQUIDACION'];
$result->d_calculo = $row_query[0]['D_CALCULO'];
$result->f_efectivo = $row_query[0]['F_EFECTIVO'];
$result->c_usuario_efect = $row_query[0]['C_USUARIO_EFECT'];
$result->f_emision = $row_query[0]['F_EMISION'];
$result->i_capital_ori = $i_capital_ori;
$result->i_multa_ori=$i_multa_ori;
$result->i_intereses_ori=$i_intereses_ori;
$result->i_total_deuda=$row_query[0]['I_TOTAL_DEUDA'];
$result->i_intereses = $row_query[0]['I_INTERESES'];
$result->i_total = $row_query[0]['I_TOTAL'];
$result->n_coef_impago = $row_query[0]['N_COEF_IMPAGO'];    
$result->n_coef_cuotas = $row_query[0]['N_COEF_CUOTAS'];  
$result->situacion = $row_query[0]['SITUACION'];
$result->f_alta = $row_query[0]['F_ALTA']; 
$result->c_usuarioalt = $row_query[0]['C_USUARIOALT']; 
$result->observaciones = $row_query[0]['OBSERVACIONES'];
$result->total_pase_legal = 0;

/*** preguntar si es caducidad de pase a legales si es pase a legales sumar los saldos actualizados de PL **/
$tipo = $result->c_caducidad;
if($tipo == '18' || $tipo == '24' || $tipo == '25' || $tipo == 'PASE_LEGAL'){
	$db_qu = new DB_Query("SELECT FUN_FORMATO_NUMERICO(SUM(ABS(FUN_CALCULO_INTERES_OBL_C(LOL.ID_OBLIG_LEGAL, SYSDATE, 'T'))), 2) AS SALDO_ACTUALIZADO
							FROM PLANES_DE_PAGO PP, LIQ_OBLIGACIONES_LEGALES LOL, OBLIGACIONES OBL
								   WHERE  PP.ID_LIQUIDACION=LOL.ID_LIQ_CAB AND
										  LOL.ID_OBLIG_ORIGINAL=OBL.ID_OBLIGACION AND
										  PP.C_TIPO_PLAN_PAGO=:c_tipo_plan_pago AND
										  PP.N_PLAN_PAGO=:n_plan_pago AND
										  PP.C_CADUCIDAD IN ('18', '24', '25', 'PASE_LEGAL')");
	$row_pase= array_shift($db_qu->do_query($parametros));
	$result->total_pase_legal = $row_pase['SALDO_ACTUALIZADO'];
}


if($clasificacion == 'M'){
	$db_query = new DB_Query("select nvl(pp.i_actualizado,0)-nvl(sum(nvl(pd.i_detalle_multa,0)),0)-(nvl(pp.i_actualizado-pp.i_capital,0)) i_capital_mora,
						 nvl(sum(nvl(pd.i_detalle_multa,0)),0) i_multa_mora,
						 nvl(pp.i_actualizado-pp.i_capital,0) i_interes_mora
						
						from planes_de_pago pp, planes_de_pago_cuotas pd
						
						where pp.c_tipo_plan_pago = :c_tipo_plan_pago
							and pp.n_plan_pago = :n_plan_pago
							and pd.c_tipo_plan_pago = pp.c_tipo_plan_pago
							and pd.n_plan_pago = pp.n_plan_pago
						group by pp.i_actualizado, pp.i_capital");
						
	$row_query = $db_query->do_query($parametros);
	$i_capital_mora = $row_query[0]['I_CAPITAL_MORA'];
	$i_multa_mora = $row_query[0]['I_MULTA_MORA'];
	$i_intereses_mora = $row_query[0]['I_INTERES_MORA'];
	$i_total_mora = $i_capital_mora + $i_multa_mora + $i_intereses_mora;
	
	//COMPLETO LOS PORCENTAJES
			//Porc Capital
			if ($i_capital_ori = 0) 
				$porc_capital= 0;
			else		
				$porc_capital = 100 - round(($i_capital_mora*100)/$i_capital_ori,2);
			
			
			//Porc Multa
			if ($i_multa_ori = 0) 
				$porc_multa= 0;
			else		
				$porc_multa = 100 - round(($i_multa_mora*100)/$i_multa_ori,2);
			
			
			//Porc Interes
			if ($i_intereses_ori = 0) 
				$porc_interes= 0;
			else		
				$porc_interes = 100 - round(($i_intereses_mora*100)/$i_intereses_ori,2);
			

	}
else{
	$i_capital_mora = 0;
	$i_multa_mora = 0;
	$i_intereses_mora = 0;
	$i_total_mora = 0;
	$porc_capital = 0;
	$porc_multa = 0;
	$porc_interes = 0;
	
}

//$result =  Array();

$result->i_capital_mora= $i_capital_mora;
$result->i_multa_mora=$i_multa_mora; 
$result->i_intereses_mora=$i_intereses_mora;
$result->i_total_deuda_mora=$i_total_mora;
$result->porc_capital = $porc_capital;
$result->porc_multa = $porc_multa;
$result->porc_interes = $porc_interes;


echo json_encode($result);

?>