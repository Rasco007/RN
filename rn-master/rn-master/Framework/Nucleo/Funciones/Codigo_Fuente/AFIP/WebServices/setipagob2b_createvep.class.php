<?php
class VEP_Exception extends Exception {}

class VEP {

    const LOG_XMLS = true;                     		# Para poder debuggear

    /***********************************************************************************
                                            VARIABLES
     ************************************************************************************/
    //Path de trabajo
    private $path  = VEP_BASEPATH; //Path del directorio RAIZ

    //Variables para el manejo de errores
    public $error = '';
    public $ObsCode = '';
    public $ObsMsg = '';
    public $Code = '';
    public $Msg = '';

    private $client; //Cliente SOAP

    private $TA; //Objeto que va a contener el xml de TA

    /***********************************************************************************
                                            CONSTRUCTOR
     ************************************************************************************/
    public function __construct(){

        //Se deshabilita la caché WSDL que suele estar activada en php.ini
        ini_set ("soap.wsdl_cache_enabled", "0");
        ini_set ('soap.wsdl_cache_ttl', "0");

        // validar archivos necesarios
        if (!file_exists(VEP_BASEPATH.WSDL)) $this->error .= "No se pudo abrir el descriptor del WS setipagob2b_createvep ".VEP_BASEPATH.WSDL;

        if(!empty($this->error)) {
            throw new VEP_Exception('Clase VEP. Faltan archivos necesarios para el funcionamiento: '.VEP_BASEPATH.WSDL);
        }

        $this->client = new SoapClient($this->path.WSDL, array(
                'soap_version' => SOAP_1_2,
                'location'     => URL_WSN,
                'exceptions'   => 0,
                'trace'        => 1)
        );
    }

    /************************************************************************************
     *                          FUNCIÓN CONVIERTE UN XML A UN ARRAY
     ***********************************************************************************/
    private function xml2array($xml)
    {
        $json = json_encode( simplexml_load_string($xml));
        return json_decode($json, TRUE);
    }

    /************************************************************************************
     *            FUNCIÓN QUE CREA CARGA EL TICKET DE ACCESO EN XML
     * Si hay algun problema devuelve false
     ***********************************************************************************/
    public function openTA(){
        $this->TA = simplexml_load_file($this->path.TA);
        return $this->TA == false ? false : true;
    }

    /************************************************************************************
     *                    FUNCION QUE DEVUELVE EL ESTADO DEL WS AFIP
     ***********************************************************************************/
    public function dummy()
    {
        $results = $this->client->dummy();

        $error_ws = $this->_checkErrors($results, 'dummy');

        return $this->client->__getLastResponse();

    }

    /************************************************************************************
     *                          FUNCION QUE CREA EL VEP
     ***********************************************************************************/
    public function createVEP($p_entidad_pago, $p_transactionId, $p_formulario, $p_cod_tipo_pago,$p_contribuyente_CUIT, $p_concepto, $p_subconcepto,$p_periodo_fiscal,$p_importe_total,$p_impuesto, $p_importe, $p_f_pago, $p_descrip_pago, $p_f_expiracion, $n_cuit_pagador, $v_descrip_concepto)
    {
        $results = $this->client->createVEP
        (
            array
            (
                'token' => $this->TA->credentials->token,
                'sign' => $this->TA->credentials->sign,
                'entidadDePago' =>$p_entidad_pago,
                'vep' => array
                (
                    'ownerCuit' =>  CUIT_ORG_VEP,
                    'ownerTransactionId' => $p_transactionId,
                    'nroFormulario' => $p_formulario,
                    'codTipoPago' => $p_cod_tipo_pago,
                    'contribuyenteCUIT' => $p_contribuyente_CUIT,
                    'usuarioCUIT' => $n_cuit_pagador,
                    'fechaExpiracion' => $p_f_expiracion,
                    'concepto'=>$p_concepto,
                    'subConcepto'=>$p_subconcepto,
                    'conceptoDesc'=> $v_descrip_concepto,
                    'subConceptoDesc' => $v_descrip_concepto,
                    'periodoFiscal'=> $p_periodo_fiscal,//201807,
                    'anticipoCuota' => 1,
                    'importe'=>$p_importe_total,
                    'Detalles' => array
                    (
                        array //Numero de Identificacion
                        (
                            'campo' => "4",
                            'campoTipo' => "C",
                            'contenido' => $p_transactionId
                        ),
                        array // Esto es la descripción del pago (nombre de la tasa)
                        (
                            'campo' => "5",
                            'campoTipo' => "C",
                            'contenido' => $p_descrip_pago
                        ),
                        array //Esto es la fecha de pago
                        (
                            'campo' => "6",
                            'campoTipo' => "C",
                            'contenido' => $p_f_pago
                        )
                    ),
                    'Obligaciones' => array
                    (
                        array
                        (
                            'impuesto' => $p_impuesto,
                            'importe' => $p_importe
                        )
                    )

                )

            )
        );

        $error_ws = $this->_checkErrors($results, 'createVEP');

        return $error_ws == false ? $results->createVEPReturn : false;
    }

    /************************************************************************************
    *                    FUNCION TRAE LOS DATOS DEL VEP POR NUMERO DE VEP
     ***********************************************************************************/
    public function findMyVEPByNroVEP($p_nroVEP)
    {
        $results = $this->client->findMyVEPByNroVEP
            (
                array
                (
                    'token' => $this->TA->credentials->token,
                    'sign' => $this->TA->credentials->sign,
                    'owner' => CUIT_ORG_VEP,
                    'nroVep' => $p_nroVEP
                )
            );

        $error_ws = $this->_checkErrors($results, 'findMyVEPByNroVEP');

        return $error_ws == false ? $results : false;//Devuelvo el array completo
    }

    /************************************************************************************
     *                    FUNCION TRAE LOS DATOS DEL VEP POR TRANSACTION ID
     ***********************************************************************************/
    public function findMyVEPByTransactionId($p_ownerTransactionId)
    {
        $results = $this->client->findMyVEPByTransactionId
            (
                array
                (
                    'token' => $this->TA->credentials->token,
                    'sign' => $this->TA->credentials->sign,
                    'owner' => CUIT_ORG_VEP,
                    'ownerTransactionId' => $p_ownerTransactionId
                )
            );

        $error_ws = $this->_checkErrors($results, 'findMyVEPByTransactionId');

        return $error_ws == false ? $results->findMyVEPByTransactionIdResult->CPVEP : false;
    }

    /************************************************************************************
     *            FUNCIÓN QUE CHECKEA LOS ERRORES EN LA OPERACION DEL WS
     * si encuentra algun error lanza una exception
     * si encuentra un error no fatal, loguea lo que paso en $this->error
     ***********************************************************************************/

    private function _checkErrors($results, $method){

        if (self::LOG_XMLS) {
            file_put_contents($this->path."XML_llamadas/request-".$method.".xml", $this->client->__getLastRequest());
            file_put_contents($this->path."XML_llamadas/response-".$method.".xml", $this->client->__getLastResponse());
        }

        if (is_soap_fault($results)) {
            throw new VEP_Exception('Clase VEP. Error en el Web Service: ' . $results->faultcode.' - '.$results->faultstring);
        }

        if ($method == 'dummy') {return;}

        $XXX=$method.'Result';
        if ($results->$XXX->Errors->Err->Code != 0) {
            $this->error = "Method=$method errcode=".$results->$XXX->Errors->Err->Code." errmsg=".$results->$XXX->Errors->Err->Msg;
        }

        $this->Code = $results->$XXX->Errors->Err->Code;
        $this->Msg = $results->$XXX->Errors->Err->Msg;
        //fin asigna error a variable

        return $results->$XXX->Errors->Err->Code != 0 ? true : false;
    }

}



?>
