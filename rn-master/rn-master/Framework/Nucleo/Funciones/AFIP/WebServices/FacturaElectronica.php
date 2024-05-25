<?php
/**
 * SDK for AFIP Electronic Billing (wsfe1)
 * 
 * @link http://www.afip.gob.ar/fe/documentos/manual_desarrollador_COMPG_v2_10.pdf WS Specification
 *
 * @author  Afip SDK
 * @package Afip
 * @version 0.7
 **/

include('../db_query.php');

class FacturaElectronica_Exception extends Exception {}

class FacturaElectronica {

    const LOG_XMLS = true;                          # Para poder debuggear

    /***********************************************************************************
                                            VARIABLES
     ************************************************************************************/
    //Path de trabajo
    private $path  = AFIP_ROOT_DIR; //Path del directorio RAIZ
    private $cuit = AFIP_CUIT;
    //Variables para el manejo de errores
    public $error = '';
    public $ObsCode = '';
    public $ObsMsg = '';
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
        if (!file_exists($this->path.FA_WSDL)) $this->error .= "No se pudo abrir el descriptor del WS wsfe ".$this->path.FA_WSDL;

        if(!empty($this->error)) {
            throw new FacturaElectronica_Exception('Clase FA. Faltan archivos necesarios para el funcionamiento: '.$this->path.FA_WSDL);
        }

        $this->client = new SoapClient($this->path.FA_WSDL, array(
                'soap_version' => SOAP_1_2,
                'location'     => URL_FA, // PARAMETRIZAR EN PATH CONF
                'exceptions'   => 0,
                'trace'        => 1)
        );
       // echo('OK');
    }

    //function defination to convert array to xml
    public function array_to_xml($array, &$xml_user_info) {
            foreach($array as $key => $value) {
                if(is_array($value)) {
                    if(!is_numeric($key)){
                        $subnode = $xml_user_info->addChild("$key");
                        $this->array_to_xml($value, $subnode);
                    }else{
                        $subnode = $xml_user_info->addChild("item$key");
                        $this->array_to_xml($value, $subnode);
                    }
                }else {
                    $xml_user_info->addChild("$key",htmlspecialchars("$value"));
                }
            }
    }

    public function CreateVoucher($data, $return_response = FALSE,$puntual = TRUE)
    {

        //armo array de datos de AUTH
        $req = array(
            'FeCAEReq' => array(
                'FeCabReq' => array(
                    'CantReg'   => $data['CantReg'],
                    'PtoVta'    => $data['PtoVta'],
                    'CbteTipo'  => $data['CbteTipo']
                    ),
                'FeDetReq' => array( 
                    'FECAEDetRequest' => &$data['FECAEDetRequest']
                )
            )
        );

        if (isset($data['CbtesAsoc'])) 
            $data['CbtesAsoc'] = array('CbteAsoc' => $data['CbtesAsoc']);

        //recupero datos de credenciales del TA
        $param = array_replace($this->openTA(), $req);

        unset($data['CantReg']);
        unset($data['PtoVta']);
        unset($data['CbteTipo']);

        $results = $this->client->FECAESolicitar($param);

        $error_ws = $this->_checkErrors($results, 'FECAESolicitar',$puntual);

        if ($return_response === false) {
            return $error_ws == false ? array('CAE' => $results->FECAESolicitarResult->FeDetResp->FECAEDetResponse->CAE,
                                               'CAEFchVto' => $this->FormatDate($results->FECAESolicitarResult->FeDetResp->FECAEDetResponse->CAEFchVto)
                                        ) : false;
        }else{
            return $results;
        }
        

    }

    public function GetLastVoucher($sales_point, $type)
    {
        $req = array(
            'PtoVta'    => $sales_point,
            'CbteTipo'  => $type
            );

        //recupero datos de credenciales del TA
        $data = array_replace($this->openTA(), $req);
        $results = $this->client->FECompUltimoAutorizado($data);

        $error_ws = $this->_checkErrors($results, 'FECompUltimoAutorizado');

        return $error_ws == false ? $results->FECompUltimoAutorizadoResult->CbteNro : false;
    }

    public function CreateNextVoucher($data, $return_response = FALSE)
    {
        if (count($data['FECAEDetRequest']) > 1){
            throw new FacturaElectronica_Exception('La funcion CreateNextVoucher puede utilizarse unicamente para pedidos puntuales');
        }

        $last_voucher = $this->GetLastVoucher($data['PtoVta'], $data['CbteTipo']);
        
        $voucher_number = $last_voucher+1;

        $data['FECAEDetRequest'][0]['CbteDesde'] = $voucher_number;
        $data['FECAEDetRequest'][0]['CbteHasta'] = $voucher_number;

        $res                    = $this->CreateVoucher($data, $return_response,TRUE);
        if ($res){
            $res['N_COMPROBANTE_AFIP'] = $voucher_number;
            $res['COMPROBANTE_AFIP_FORMAT']  = str_pad($data['PtoVta'],4,'0',STR_PAD_LEFT)  . str_pad($voucher_number,8,'0',STR_PAD_LEFT);
        }
        

        return $res;
    }

    public function GetVoucherTypes()
    {
        //recupero datos de credenciales del TA
        return $this->client->FEParamGetTiposCbte($this->openTA());
    }

    public function GetDocumentoTypes()
    {
        //recupero datos de credenciales del TA
        return $this->client->FEParamGetTiposDoc($this->openTA());
    }

    public function GetTributosDisp()
    {
        //recupero datos de credenciales del TA
        return $this->client->FEParamGetTiposTributos($this->openTA());
    }

    public function GetServerStatus()
	{
		return $this->client->FEDummy();
	}

    
    /************FUNCIONES ANEXAS ***********************/
    /****************************************************/


     /************************************************************************************
     *            FUNCIÓN RETORNA DATOS DE ACCESO A AFIP DEL TA
     ***********************************************************************************/
    public function openTA(){
        $this->TA = simplexml_load_file(URL_TA.'wsfe/TA.xml');
        return array(
            'Auth' => array( 
                'Token' => $this->TA->credentials->token,
                'Sign'  => $this->TA->credentials->sign,
                'Cuit'  => $this->cuit //MODIFICAR CUIT POR PATH CONF!!!!
                )
        );
    }

    public function FormatDate($date)
    {
        return date_format(DateTime::CreateFromFormat('Ymd', $date.''), 'd/m/Y');
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
     *            FUNCIÓN QUE CHECKEA LOS ERRORES EN LA OPERACION DEL WS
     * si encuentra algun error lanza una exception
     * si encuentra un error no fatal, loguea lo que paso en $this->error
     ***********************************************************************************/

    private function _checkErrors($results, $method, $puntual = TRUE){

        if (self::LOG_XMLS) {
            file_put_contents($this->path."XML_llamadas/request-".$method.".xml", $this->client->__getLastRequest());
            file_put_contents($this->path."XML_llamadas/response-".$method.".xml", $this->client->__getLastResponse());
        }

        if (is_soap_fault($results)) {
            throw new FacturaElectronica_Exception('Clase FA. Error en el Web Service: ' . $results->faultcode.' - '.$results->faultstring);
        }

        $xx = $method.'Result';
        if (isset($results->$xx->Errors)) {
            $err = is_array($results->$xx->Errors->Err) ? $results->$xx->Errors->Err[0] : $results->$xx->Errors->Err;
            throw new FacturaElectronica_Exception('('.$err->Code.') '.$err->Msg, $err->Code);
        }

        if ($method == 'FECAESolicitar') {
            if ($results->FECAESolicitarResult->FeCabResp->Resultado != 'A'){ 
                #evaluo si la cabecera de la respuesta tiene error
                if ($puntual){
                       #busco detalle de error                       
                        $error = $results->FECAESolicitarResult->FeDetResp->FECAEDetResponse->Observaciones->Obs;      
                                       
                        if ( count($error) > 1) {
                            foreach ($error as $error_detalle) {
                                $this->Msg .= "Codigo ". $error_detalle->Code . ' - Descrip: '.$error_detalle->Msg. '<br>';  
                            }
                        }else{
                            $this->Msg = "Codigo ". $error->Code . ' - Descrip: '.$error->Msg. '<br>';  
                        }

                    
                        
                }else{            
                    #busco detalle de error               
                    foreach ($results->FECAESolicitarResult->FeDetResp->FECAEDetResponse as $key => $detalleResp) {
                        # recupero los errores
                        foreach ($detalleResp->Observaciones as $error) {
                            if (count($error) > 0) {
                                foreach ($error as $error_detalle) {
                                    $this->Msg .= "Codigo ". $error_detalle->Code . ' - Descrip: '.$error_detalle->Msg. '<br>';  
                                }
                            }else{
                                $this->Msg = "Codigo ". $error->Code . ' - Descrip: '.$error->Msg. '<br>';  
                            }                            
                            // logeuar en la base los errores                     
                        } 
                    
                    }
                    
                }  
            }        
            
        }

        return $this->Msg != null ? true : false;
    }


}








