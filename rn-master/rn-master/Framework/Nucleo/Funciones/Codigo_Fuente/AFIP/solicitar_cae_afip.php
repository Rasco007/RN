<?php

/*
 * @author Agustin M. Maglione
 * @email amaglione@tdi.com.ar
 * @create date 2020-04-27 15:22:22
 * @modify date 2020-05-05 15:22:22
 * @desc    
 *    Objetivo: Autorizar comprobante en AFIP y obtener CAE
 *    Parametros:    
 *           $n_lote -> Si es null recorro masivamente
 *           $n_secuencia  -> Si es null recorro masivamente

      Descripcion:
         1) Recupera datos para el Envio a AFIP
         2) Arma objeto data para enviar WS de AFIP (createNextVoucher)
         3) Ejecuta WS
               Si devuelve TRUE -> Loguea CAE y FECHA DE VTO DE CAE
               Si devuelve FALSE -> Logueo Error.]
 */

function log_error_afip($n_lote,$n_secuencia,$error){
   
   $query = new DB_Query("UPDATE LOG_COMPROBANTES_AFIP SET D_ERROR = :D_ERROR,
                                                           F_PROCESO = sysdate,
                                                           M_REENVIA = 'S'
                                     WHERE N_LOTE = :N_LOTE
                                     and N_SECUENCIA = :n_secuencia");

   $parametros = array(':n_lote' => $n_lote,
                     ':n_secuencia' => $n_secuencia,
                       ':d_error' => $error);

   $resultado = $query->do_query($parametros);
   $query->db_commit();

   return true;
}

function log_datos_afip($n_lote,$n_secuencia,$datos){
   
   $query = new DB_Query("UPDATE LOG_COMPROBANTES_AFIP SET AFIP_CAE = :afip_cae,
                                                           AFIP_CAE_FVTO = to_date(:afip_cae_fvto,'dd/mm/rrrr'),
                                                           AFIP_N_COMPROBANTE = :afip_n_comprobante,
                                                           F_PROCESO = sysdate,
                                                           M_REENVIA = 'N'
                                     WHERE N_LOTE = :N_LOTE
                                     and N_SECUENCIA = :n_secuencia");

   $parametros = array(':afip_cae' => $datos['CAE'],
                       ':afip_cae_fvto' => $datos['CAEFchVto'],
                       ':afip_n_comprobante' => $datos['N_COMPROBANTE_AFIP'],
                     ':n_lote' => $n_lote,
                     ':n_secuencia' => $n_secuencia);

   $resultado = $query->do_query($parametros);
   $query->db_commit();

   return true;
}

function log_error_prc_pos_exec($n_lote,$n_secuencia,$error){
   //echo 'ENTRO ACA   ';
   $query = new DB_Query("UPDATE LOG_COMPROBANTES_AFIP SET D_ERROR_PRC_POS_EXEC = :error
                                     WHERE N_LOTE = :N_LOTE
                                     and N_SECUENCIA = :n_secuencia");

   $parametros = array(
                     ':n_lote' => $n_lote,
                     ':n_secuencia' => $n_secuencia,
                     ':error' => $error);

   $resultado = $query->do_query($parametros);
   $query->db_commit();

   return true;
}

if(!isset($_POST['p_n_lote']) && !isset($_POST['p_n_secuencia'])){
   require_once "../../../Proyecto/Config/path-conf.php";
   require_once ROOT_DIR."Framework/Proyecto/Config/path-conf.php";
   require_once FUNCIONES_FRAMEWORK."encrypt_match.php";
   require_once FUNCIONES_FRAMEWORK."login.php";
}

include('WebServices/wsass.class.php');
include('WebServices/FacturaElectronica.php');

#recupero variables POST

$n_lote =$_POST['p_n_lote'];
$n_secuencia =$_POST['p_n_secuencia'];

$parametros = array(':n_lote' => $n_lote,
                     ':n_secuencia' => $n_secuencia);

#recupero datos para emitir Comprobante AFIP
$query = new DB_Query("select N_LOTE,
                           N_SECUENCIA,
                           T_COMPROBANTE,
                           N_COMPROBANTE,
                           AFIP_CBTETIPO,
                           AFIP_PTOVTA,
                           AFIP_N_COMPROBANTE,
                           AFIP_CONCEPTO,
                           AFIP_DOC_TIPO,
                           AFIP_DOC_NRO,
                           to_char(afip_cbtefch,'yyyymmdd') afip_cbtefch,
                           to_char(AFIP_FCHSERVDESDE,'yyyymmdd') AFIP_FCHSERVDESDE,
                           to_char(AFIP_FCHSERVHASTA,'yyyymmdd') AFIP_FCHSERVHASTA,
                           to_char(AFIP_FCHVTOPAGO,'yyyymmdd') AFIP_FCHVTOPAGO,
                           AFIP_IMPTOTAL,
                           AFIP_IMPTOTCONC,
                           AFIP_IMPNETO,
                           AFIP_IMPOPEX,
                           AFIP_IMPIVA,
                           AFIP_IMPTRIB,
                           AFIP_MONID,
                           AFIP_MONCOTIZ,
                           AFIP_CAE,
                           AFIP_CAEA,
                           F_PROGRAMADO,
                           F_PROCESO,
                           D_ERROR,
                           D_PROCEDURE_POS_EXEC
                     FROM LOG_COMPROBANTES_AFIP c
                     where f_proceso is null
                     and afip_cae is null
                     and n_lote = nvl(:n_lote,n_lote)
                     and n_Secuencia = nvl(:n_secuencia,n_secuencia)
                     and nvl(f_programado,trunc(sysdate)) <= trunc(sysdate)
                     ORDER BY AFIP_CBTETIPO, AFIP_PTOVTA, AFIP_CBTEFCH
                     ");

$data = $query->do_query($parametros);

if(count($data) === 0){
   $response -> resultado = "NOOK";
   $response -> info = 'No existe solicitudes sin procesar.';
   echo json_encode($response);
   die();
}

#inicio comunicacion de autenticacion para ws de Fact. Electronica
$wsass = new WSASS('wsfe');
$wsass->generar_TA(); # valida si ya tengo un TA generado o si hay que crearlo
 
#consigo ultimo comprobante emitido en AFIP
$FA = new FacturaElectronica();

foreach ($data as $key => $registro) {

   $n_lote = $registro['N_LOTE'];
   $n_secuencia = $registro['N_SECUENCIA'];

   $dataAfip = [];

   
   //echo 'Punto de Venta Nuevo: '.$registro['AFIP_PTOVTA'] . '<br>';

   if ($auxPuntoVenta == $registro['AFIP_PTOVTA'] && $response -> resultado == "NOOK"){
      //echo 'Error por errror previo <br>';
      $response-> info = 'No se proceso el registro ya que se obtuvo error en una secuencia anterior.';
      log_error_afip($n_lote,$n_secuencia,$response->info);
   }else{ 
      //echo 'Intenta procesar '.$n_lote . ' - '. $n_secuencia .' <br>'; 
      $response-> resultado = null;

      $dataAfip = array(
         'CantReg' => 1,
         'CbteTipo' => $registro['AFIP_CBTETIPO'],
         'PtoVta'  => $registro['AFIP_PTOVTA'],
         'FECAEDetRequest' => array(
            array( 
               'Concepto' 		=> $registro['AFIP_CONCEPTO'], // Concepto del Comprobante: (1)Productos, (2)Servicios, (3)Productos y Servicios    FeDetReq
               'DocTipo' 		=> $registro['AFIP_DOC_TIPO'], // Tipo de documento del comprador (ver tipos disponibles)   FeDetReq
               'DocNro' 		=> $registro['AFIP_DOC_NRO'], // Numero de documento del comprador     FeDetReq
               'CbteDesde' 	=> 1, // Numero de comprobante o numero del primer comprobante en caso de ser mas de uno   FeDetReq
               'CbteHasta' 	=> 1, // Numero de comprobante o numero del ultimo comprobante en caso de ser mas de uno   FeDetReq
               'CbteFch' 		=> $registro['AFIP_CBTEFCH'], // (Opcional) Fecha del comprobante (yyyymmdd) o fecha actual si es nulo   FeDetReq
               'ImpTotal' 		=> $registro['AFIP_IMPTOTAL'], // Importe total del comprobante   FeDetReq
               'ImpTotConc' 	=> $registro['AFIP_IMPTOTCONC'], // Importe neto no gravado   FeDetReq
               'ImpNeto' 		=> $registro['AFIP_IMPNETO'], // Importe neto gravado     FeDetReq
               'ImpOpEx' 		=> $registro['AFIP_IMPOPEX'], // Importe exento de IVA    FeDetReq
               'ImpIVA' 		=> $registro['AFIP_IMPIVA'], //Importe total de IVA      FeDetReq
               'ImpTrib' 		=> $registro['AFIP_IMPTRIB'], //Importe total de tributos  FeDetReq
               'FchServDesde' 	=> $registro['AFIP_FCHSERVDESDE'], // (Opcional) Fecha de inicio del servicio (yyyymmdd), obligatorio para Concepto 2 y 3   FeDetReq
               'FchServHasta' 	=> $registro['AFIP_FCHSERVHASTA'], // (Opcional) Fecha de fin del servicio (yyyymmdd), obligatorio para Concepto 2 y 3      FeDetReq
               'FchVtoPago' 	=>    $registro['AFIP_FCHVTOPAGO'], // (Opcional) Fecha de vencimiento del servicio (yyyymmdd), obligatorio para Concepto 2 y 3   FeDetReq  
               'MonId' 		=>       $registro['AFIP_MONID'], //Tipo de moneda usada en el comprobante (ver tipos disponibles)('PES' para pesos argentinos)   FeDetReq
               'MonCotiz' 		=>    $registro['AFIP_MONCOTIZ']
               ) // Cotización de la moneda usada (1 para pesos argentinos)  FeDetReq               
            )          
      );  
            
      #recupero datos para emitir Comprobante AFIP
      $query_asoc = new DB_Query("select afip_cbtefch,
                           afip_cbtetipo,
                           afip_ptovta,
                           afip_n_comprobante
                  FROM LOG_COMPROBANTES_AFIP_ASOC a
                  where a.n_lote = :n_lote                     
                  and a.n_secuencia = :n_secuencia
                  ORDER BY AFIP_CBTETIPO, AFIP_PTOVTA,AFIP_CBTEFCH
                  ");

      $param = array(':n_lote' => $n_lote,
                     ':n_secuencia' => $n_secuencia);

      $data_asoc = $query_asoc->do_query($param);
     
      foreach ($data_asoc as $key => $registro_det) {  
         $dataAfip['FECAEDetRequest'][0]['CbtesAsoc'][$key] = array(
                              'Tipo' => $registro_det['AFIP_CBTETIPO'],
                              'PtoVta' => $registro_det['AFIP_PTOVTA'],
                              'Nro' => $registro_det['AFIP_PTOVTA']
                           );
            
      }
    
      // crear factura
      try{
            $resultado = $FA->CreateNextVoucher($dataAfip,FALSE,TRUE);
            
         if ($resultado == false) {
            log_error_afip($n_lote, $n_secuencia,$FA->Msg);

            $response -> resultado = "NOOK";
            $response-> info = $FA->Msg;

         }else{
            
            $response->resultado = 'OK';
            $response->info = null;
            $response->cae = $resultado['CAE'];
            $response->f_vto_cae = $resultado['CAEFchVto'];
            $response->n_comprobante_afip = $resultado['N_COMPROBANTE_AFIP'];
            $response->ptoVta_comprobante_afip = $resultado['COMPROBANTE_AFIP_FORMAT'];

            log_datos_afip($n_lote, $n_secuencia,$resultado);

            /* Ejecuto procedimiento pos registracion en afip siempre y cuando este parametrixado */
            if ($registro['D_PROCEDURE_POS_EXEC'] != null){
               try{
                  $query = new DB_Query('BEGIN '. $registro['D_PROCEDURE_POS_EXEC'].'(:n_lote,:n_secuencia,:p_error,:p_error_ora);END;' );
                  
                  $parametros = array(':n_lote' => $n_lote,
                                    ':n_secuencia' => $n_secuencia,
                                    ':p_error' => null,
                                    ':p_error_ora' => null);

                  $resultado = $query->do_query($parametros);
                  
                  if($parametros[':p_error'] != null || $parametros[':p_error_ora'] != null){
                              
                        $query->db_rollback(); 
                        $response -> resultado_pos_exec = 'NOOK';
                        log_error_prc_pos_exec($n_lote,$n_secuencia,$parametros[':p_error']. $parametros[':p_error_ora']);
                  }
                  else{
                     $response -> resultado_pos_exec = 'OK';
                     $query->db_commit();
                  }

               }catch(Exc_EjecutarConsulta $error) {
               
                  $query->db_rollback();
                  log_error_prc_pos_exec($n_lote,$n_secuencia,$error->getMessage());
               }
            }
            
         }
      } catch (FacturaElectronica_Exception $e) {
         
            log_error_afip($n_lote,$n_secuencia,$e->getMessage());
         
            $response -> resultado = "NOOK";
            $response -> info = $e->getMessage();
         
      }
      
   }

   //echo 'Termino de procesar '.$n_lote . ' - '. $n_secuencia .' <br>'; 

   $auxPuntoVenta = $registro['AFIP_PTOVTA'];
   //echo 'Punto de Venta Auxiliar '.$auxPuntoVenta. ' <br>'; 
   echo json_encode($response);
   //echo '<br>';
   
   
}




?>