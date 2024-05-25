<?php
	$p_oper = $_POST['p_oper'];

	if ($p_oper === 'conceptos'){
		$c_tributo = $_POST['c_tributo'];
		$d_objeto_hecho = $_POST['d_objeto_hecho'];
		
		$db_query = new DB_Query(
			"SELECT cc.c_concepto_mov , cc.c_tipo_movi , o.n_posicion_fiscal, o.n_cuota_anticipo
			FROM CUENTA_CORRIENTE cc, OBLIGACIONES o WHERE o.id_obligacion = cc.id_obligacion
			AND o.c_tributo = :c_tributo AND o.d_objeto_hecho = :d_objeto_hecho AND cc.c_concepto_mov NOT IN (
				SELECT gcd.c_concepto_detalle FROM GRUPOS_COMPENSACIONES_DET gcd, GRUPOS_COMPENSACIONES gc 
				WHERE gc.c_grupo = gcd.c_grupo AND gc.c_tributo = :c_tributo AND gcd.c_concepto_detalle = cc.c_concepto_mov 
				 AND gcd.c_tipo_mov  = cc.c_tipo_movi
			) AND ROWNUM < 2 
			GROUP BY cc.c_concepto_mov , cc.c_tipo_movi, o.n_posicion_fiscal, o.n_cuota_anticipo");

		$par = array(':c_tributo' => $c_tributo, ':d_objeto_hecho' => $d_objeto_hecho);
		$row_query = $db_query->do_query($par);
		
		$concepto = $row_query[0]['C_CONCEPTO_MOV'];
		$tip_mov = $row_query[0]['C_TIPO_MOVI'];
		$posicion = $row_query[0]['N_POSICION_FISCAL'];
		$cuota = $row_query[0]['N_CUOTA_ANTICIPO'];

		if (isset($concepto)) {
			$resultado->resultado = 'El tipo de movimiento ' . $tip_mov . ' y concepto ' . $concepto . ' utilizado en ' . 
				$posicion . '-' . $cuota . '  no esta conteplado en los grupos de compensación.';
		} else {
			$resultado->resultado = 'OK';
		}

		echo json_encode($resultado);
	}
	
	if ($p_oper === 'dblClick'){
		$lote = $_POST['lote'];
		$secuencia = $_POST['secuencia'];
		
		$db_procedure = new DB_Procedure(
			"begin
				update tmp_cred_compensaciones set n_importe = saldo where n_lote = :lote and n_secuencia = :secuencia;
				update tmp_cred_compensaciones set n_importe = 0 where n_lote = :lote and n_secuencia != :secuencia;
			end;");
		$par = array(':lote' => $lote, ':secuencia' => $secuencia);
		$result = $db_procedure->execute_query($par);

		if($result->resultado != 'OK') {
			$response-> resultado = 'Error durante la actualización del registro.';
			$response-> oracle = $result->resultado;
			$db_procedure->db_rollback();
		}else {
			$response-> resultado = 'OK';
			$db_procedure->db_commit();
		}

		echo json_encode($response);
	}
	
	if ($p_oper === 'credSelect'){
		$lote = $_POST['lote'];
        $c_tributo = $_POST['c_tributo'];

        console.log('credSelect');
        console.log($c_tributo);
		
		$db_query = new DB_Query(
			"SELECT count(1) cant FROM tmp_cred_compensaciones WHERE n_lote = :lote AND n_importe != 0"
		);

		$par = array(':lote' => $lote);
		$row_query = $db_query->do_query($par);
		
		$cant = $row_query[0]['CANT'];
		
		if($cant == 0) {
			$response->resultado = 'Debe seleccionar un crédito.';
		} else {
			unset($db_query);
			unset($par);
			unset($row_query);
			
			$db_query = new DB_Query(
				"SELECT id_obligacion, n_secuencia FROM tmp_cred_compensaciones WHERE n_lote = :lote AND n_importe != 0"
			);

			$par = array(':lote' => $lote);
			$row_query = $db_query->do_query($par);
			
			$id_obligacion = $row_query[0]['ID_OBLIGACION'];
			$n_secuencia = $row_query[0]['N_SECUENCIA'];
			
			unset($db_query);
			unset($par);
			unset($row_query);
			
			$db_query = new DB_Query(
				"SELECT nvl(min(n_secuencia),0) min_sec FROM tmp_cred_compensaciones WHERE n_lote = :lote AND id_obligacion = :id_obligacion"
			);

			$par = array(':lote' => $lote, ':id_obligacion' => $id_obligacion);
			$row_query = $db_query->do_query($par);
			
			$min_sec = $row_query[0]['MIN_SEC'];
			
			unset($db_query);
			unset($par);
			unset($row_query);



            if($n_secuencia > $min_sec   AND ($c_tributo == 10 or $c_tributo == 20 or $c_tributo == 30  or $c_tributo == 40 or $c_tributo == 32 or $c_tributo == 33)) {
                $response->resultado = 'Debe seleccionar el primer concepto de la obligaciÃ³n de crÃ©dito.';
            } else {
                $db_query = new DB_Query(
                    "SELECT n_secuencia, f_movimiento, c_interes, f_vto_pago, fun_formato_numerico(n_importe,2) n_importe, n_sec_obl, id_obligacion, c_concepto, m_genera_interes
					FROM tmp_cred_compensaciones WHERE n_lote = :lote AND n_importe != 0"
                );

                $par = array(':lote' => $lote);
                $row_query = $db_query->do_query($par);

                $response->resultado = 'OK';
                $response->n_secuencia = $row_query[0]['N_SECUENCIA'];
                $response->f_movimiento = $row_query[0]['F_MOVIMIENTO'];
                $response->c_interes = $row_query[0]['C_INTERES'];
                $response->f_vto_pago = $row_query[0]['F_VTO_PAGO'];
                $response->n_importe = $row_query[0]['N_IMPORTE'];
                $response->id_obligacion = $row_query[0]['ID_OBLIGACION'];
                $response->n_sec_obl = $row_query[0]['N_SEC_OBL'];
                $response->c_concepto = $row_query[0]['C_CONCEPTO'];
                $response->m_genera_interes = $row_query[0]['M_GENERA_INTERES'];
            }
			

		}

		echo json_encode($response);
	}
	
	if ($p_oper === 'dblClickDeb'){
		$lote = $_POST['lote'];
		$secuencia = $_POST['secuencia'];
		
		$db_procedure = new DB_Procedure(
			"begin
				update tmp_deb_compensaciones set n_importe = least(saldo, cred_actu) where n_lote = :lote and n_secuencia = :secuencia;
				update tmp_deb_compensaciones set n_importe = 0 where n_lote = :lote and n_secuencia != :secuencia;
			end;");
		$par = array(':lote' => $lote, ':secuencia' => $secuencia);
		$result = $db_procedure->execute_query($par);

		if($result->resultado != 'OK') {
			$response-> resultado = 'Error durante la actualización del registro.';
			$response-> oracle = $result->resultado;
			$db_procedure->db_rollback();
		}else {
			$response-> resultado = 'OK';
			$db_procedure->db_commit();
		}

		echo json_encode($response);
	}
	
	if ($p_oper === 'debSelect'){
		$lote = $_POST['lote'];
		
		$db_query = new DB_Query(
			"SELECT count(1) cant FROM tmp_deb_compensaciones WHERE n_lote = :lote AND n_importe != 0"
		);

		$par = array(':lote' => $lote);
		$row_query = $db_query->do_query($par);
		
		$cant = $row_query[0]['CANT'];
		
		if($cant == 0) {
			$response->resultado = 'Debe seleccionar un débito.';
		} else {
			unset($db_query);
			unset($par);
			unset($row_query);
			
			$db_query = new DB_Query(
				"SELECT nvl(i_reduccion53,0) i_reduccion53, n_importe, fun_formato_numerico(saldo,2) saldo, 
				(select i_saldo from obligaciones o where o.id_obligacion = t.id_obligacion) saldo_obl,
				siat.fun_calculo_saldo_fecha_iibb(t.id_obligacion,t.f_vto_descuento53) v_saldo,
				fun_formato_numerico(siat.fun_calculo_saldo_fecha_iibb(t.id_obligacion,t.f_vto_descuento53),2) v_saldo_form,
				fun_formato_numerico(nvl(i_reduccion53,0),2) i_reduccion53_form
				FROM tmp_deb_compensaciones t WHERE n_lote = :lote AND n_importe != 0"
			);

			$par = array(':lote' => $lote);
			$row_query = $db_query->do_query($par);
			
			$i_reduccion53 = $row_query[0]['I_REDUCCION53'];
			$i_reduccion53_form = $row_query[0]['I_REDUCCION53_FORM'];
			$n_importe = $row_query[0]['N_IMPORTE'];
			$saldo = $row_query[0]['SALDO'];
			$saldo_obl = $row_query[0]['SALDO_OBL'];
			$v_saldo = $row_query[0]['V_SALDO'];
			$v_saldo_form = $row_query[0]['V_SALDO_FORM'];
			
			if ($i_reduccion53 > 0) {
				$saldo_calc = $v_saldo + $n_importe + $i_reduccion53;

				$saldo_obl = $saldo_obl + $n_importe + $i_reduccion53;

				if ($saldo_calc  < 0 or $saldo_obl < 0) {
					$response->resultado = 'PREGUNTAR';
					$response->mensaje = 
						'Desea continuar el proceso sín aplicar reducción?<br>'.
						'  Saldo Cta Cte: '.$v_saldo_form.'<br>'.
						'  Descuento posible sobre la multa: '.$saldo.'<br>'.
						'  Importe que debería compensar para acceder al descuento: '.$i_reduccion53_form.'<br>'.
						'Si acepta, se compensará un monto menor por lo tanto no se podrá aplicar el descuento sobre la multa.';
				}
			}
			
			unset($db_query);
			unset($par);
			unset($row_query);
			
			if($response->resultado == 'PREGUNTAR') {
                null;

			} else {
                $response->resultado = 'OK';
            }

				$db_query = new DB_Query(
					"SELECT n_secuencia, f_movimiento, fun_formato_numerico(n_importe,2) n_importe, id_obligacion, c_concepto, cred_actu
					FROM tmp_deb_compensaciones WHERE n_lote = :lote AND n_importe != 0"
				);

				$par = array(':lote' => $lote);
				$row_query = $db_query->do_query($par);


				$response->n_secuencia = $row_query[0]['N_SECUENCIA'];
				$response->f_movimiento = $row_query[0]['F_MOVIMIENTO'];
				$response->n_importe = $row_query[0]['N_IMPORTE'];
				$response->id_obligacion = $row_query[0]['ID_OBLIGACION'];
				$response->c_concepto = $row_query[0]['C_CONCEPTO'];
				$response->cred_actu = $row_query[0]['CRED_ACTU'];
			}


		echo json_encode($response);
	}

	if ($p_oper === 'contribuyentes'){
		$c_tipo_imponible = $_POST['c_tipo_imponible'];
		$c_tributo = $_POST['c_tributo'];
		$d_objeto_hecho = $_POST['d_objeto_hecho'];

		$db_query = new DB_Query(
			"SELECT count(1) as total
			from contribuyentes c, contribuyentes_tributos ct
			where c.id_contribuyente = ct.id_contribuyente
			and ct.c_tipo_imponible = nvl(:c_tipo_imponible,ct.c_tipo_imponible)
			and ct.c_tributo = :c_tributo
			and ct.d_objeto_hecho = :d_objeto_hecho");

		$par = array(':d_objeto_hecho' => $d_objeto_hecho, ':c_tributo' => $c_tributo, ':c_tipo_imponible' => $c_tipo_imponible);
		$row_query = $db_query->do_query($par);

		$respuesta->TOTAL = $row_query[0]['TOTAL'];

		echo json_encode($respuesta);
	}




if ($p_oper === 'comprueba_conts'){
    $db_query = new DB_Query(
        "SELECT (SELECT o.id_contribuyente  FROM tmp_cred_compensaciones tmp_cred, obligaciones o WHERE     tmp_cred.id_obligacion = o.id_obligacion AND n_lote = :p_n_lote_cred   AND n_importe != 0) cont_cred,
                (SELECT o.d_objeto_hecho    FROM tmp_cred_compensaciones tmp_cred, obligaciones o WHERE     tmp_cred.id_obligacion = o.id_obligacion AND n_lote = :p_n_lote_cred   AND n_importe != 0) obj_cred,
                (SELECT o.c_tributo          FROM tmp_cred_compensaciones tmp_cred, obligaciones o WHERE     tmp_cred.id_obligacion = o.id_obligacion AND n_lote = :p_n_lote_cred   AND n_importe != 0) trib_cred,
                (SELECT o.id_contribuyente  FROM tmp_deb_compensaciones tmp_deb, obligaciones o   WHERE     tmp_deb.id_obligacion = o.id_obligacion  AND n_lote = :p_n_lote_deb    AND n_importe != 0) cont_deb,
                (SELECT o.d_objeto_hecho    FROM tmp_deb_compensaciones tmp_deb, obligaciones o   WHERE     tmp_deb.id_obligacion = o.id_obligacion  AND n_lote = :p_n_lote_deb    AND n_importe != 0) obj_deb,
                (SELECT o.c_tributo    FROM tmp_deb_compensaciones tmp_deb, obligaciones o   WHERE     tmp_deb.id_obligacion = o.id_obligacion  AND n_lote = :p_n_lote_deb    AND n_importe != 0) trib_deb from dual");

    $par = array(':p_n_lote_cred' => $_POST['p_n_lote_cred'], ':p_n_lote_deb' => $_POST['p_n_lote_deb']);
    $row_query = $db_query->do_query($par);

    echo json_encode($row_query[0]);
}
?>