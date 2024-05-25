<?php


class clienteBCAfip
{

    private $response;
    private $endpoint = "http://10.1.2.129:8085/hlfproxy/api/v1/query/padfedchannel/padfedcc?waitForEventSeconds=100&verbose=true";

    /**
     * clienteBCAfip constructor.
     */
    public function __construct(){
    }


    function getContribuyentesNuevos(){

        $fecha = date('Y-m-j');
        $nuevafecha = strtotime ( '-1 day' , strtotime ( $fecha ) ) ;
        $ayer = date ( 'j/m/Y' , $nuevafecha );

        $db_query = new DB_Query("SELECT SIAT.PKG_CONTRIBUYENTES_BC.CONTRIBUYENTES_NUEVOS(".$ayer.") as contribuyentes FROM dual");
        $row_query = $db_query->do_query();

        $result = json_decode($row_query[0]['CONTRIBUYENTES']);

        return $result->contribuyentes;

    }

    public function guardarContribuyente($contribuyente){

        if(!empty($contribuyente->getDomicilios()->getIdnomenclaafip())) {

            $param_prc = array(
                'p_n_cuit' => $contribuyente->getCuit(),
                'p_f_actualiz' => $contribuyente->getFechaactualizacion(),
                'p_d_denominacion' => $contribuyente->getDenominacion(),
                'p_m_persona' => $contribuyente->getTipopersona(),
                'p_c_tipo_documento' => $contribuyente->getTipodocumento(),
                'p_n_documento' => $contribuyente->getDocumento(),
                'p_c_sexo' => $contribuyente->getSexo(),
                ':p_f_nacimiento' => $contribuyente->getFechanacimiento(),
                ':p_impuesto' => $contribuyente->getImpuestos()->getImpuesto(),
                ':p_impuesto_estado' => $contribuyente->getImpuestos()->getEstado(),
                ':p_id_nomencla_afip' => $contribuyente->getDomicilios()->getIdnomenclaafip(),
                ':p_result' => null
            );

            //print_r($param_prc);exit();

            $sql = "begin 			  
                        siat.pkg_contribuyentes_bc.alta_contribuyente_fisico(
                                            :p_n_cuit, 
                                            :p_f_actualiz, 
                                            :p_d_denominacion, 
                                            :p_m_persona, 
                                            :p_c_tipo_documento, 
                                            :p_n_documento, 
                                            :p_c_sexo, 
                                            :p_f_nacimiento,
                                            :p_impuesto,
                                            :p_impuesto_estado,
                                            :p_id_nomencla_afip,
                                            :p_result);
                    end;";

            $db_procedure = new DB_Procedure($sql);

            $null = null;

            $result = $db_procedure->execute_query($param_prc, $null, FALSE);

            // echo($param_prc[':p_result']);exit();

            if ($result->resultado == 'OK') {

                $altaDom = $this->guardarDomicilio($contribuyente->getDomicilios(), $param_prc[':p_result']);

                if ($altaDom->resultado == 'OK') {
                    $db_procedure->db_commit();
                    $result = "OK";
                } else {
                    $db_procedure->db_rollback();
                    $result = "Error al guardar domicilio del contribuyente " . $contribuyente->getCuit() . ": " . $param_prc[':p_result'];
                }

            } else {

                $result = "Error al guardar el contribuyente " . $contribuyente->getCuit() . ": " . $param_prc[':p_result'];

            }

        }else{

            $result = "El domicilio del contribuyente " . $contribuyente->getCuit() . " no cuenta con codigo de nomenclador de AFIP.";

        }

        return $result;

    }

    private function guardarDomicilio($domicilio, $idcontribuyente){

        $param_prc = array(
            'p_tipo_afip' => $domicilio->getTipoafip(),
            'p_id_nomencla_afip' => $domicilio->getIdnomenclaafip(),
            'p_d_calle' => $domicilio->getCalle(),
            'p_n_numero' => $domicilio->getNumero(),
            'p_tipo_datoadic' => $domicilio->getTipodatoadic(),
            'p_dato_adic' => $domicilio->getDatoadic(),
            'p_c_post_afip' => $domicilio->getPostafip(),
            'p_id_contribuyente' => $idcontribuyente,
            ':p_f_vig_desde'=> $domicilio->getFechadesde(),
            ':p_result' => null
        );

        //print_r($param_prc);exit();

        $sql = "begin 			  
                    siat.pkg_contribuyentes_bc.alta_domicilio_fiscal( 
                                                        :p_tipo_afip,
                                                        :p_id_nomencla_afip,
                                                        :p_d_calle,
                                                        :p_n_numero,
                                                        :p_tipo_datoadic,
                                                        :p_dato_adic,
                                                        :p_c_post_afip,
                                                        :p_id_contribuyente,
                                                        :p_f_vig_desde,
                                                        :p_result);
                end;";

        $db_procedure = new DB_Procedure($sql);

        $null=null;

        $result = $db_procedure->execute_query($param_prc,$null,FALSE);

        return $result;

    }


    public function getPersona($cuit){

        $data = json_encode(array('function' => 'getPersona', "args" => array($cuit)));

        $ch = curl_init();
        curl_setopt($ch,CURLOPT_URL, $this->endpoint);
        curl_setopt($ch,CURLOPT_CUSTOMREQUEST, "POST");
        curl_setopt($ch,CURLOPT_POSTFIELDS, $data);
        curl_setopt($ch,CURLOPT_HTTPHEADER, array('Content-Type:application/json'));
        curl_setopt($ch,CURLOPT_RETURNTRANSFER,1);

        $response  = curl_exec($ch);
        $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        curl_close($ch);

        //echo $httpCode;exit();

        $this->response = (Object)json_decode($response);

    }

    function getCcResponse(){
        return (Object)json_decode($this->response->ccResponse);
    }


    function altaContribuyentesNuevos(){

        $this->getPersona();

    }

}