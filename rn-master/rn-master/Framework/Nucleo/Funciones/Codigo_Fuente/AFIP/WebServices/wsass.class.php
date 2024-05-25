<?php

//Esteban Martinez TDI

class WSASS {

    /***********************************************************************************
       Bloque de CONSTANTES a definir para la utilización del WS de Autenticación AFIP
       ADEMAS SETEAR LA VARIABLE PRIVADA PATH!!!
    ************************************************************************************/

    //Parametros de autenticación
    const WSAA_WSDL = WSAA_WSDL; //WSDL del Web Service de Autorización y Autenticación
    #const CERT =  "Claves_AFIP/diegorentas.crt"; #Homologación     # Certificado obtenido en el paso 3(empieza el archivo con -----BEGIN CERTIFICATE-----)
    const CERT =  CERT; #PRODUCCION

    const PRIVATEKEY = PRIVATEKEY; # La clave privada obtenida paso 1 (empieza archivo con -----BEGIN RSA PRIVATE KEY-----)
    
    //Es la misma para TEST que para PROD
    const PASSPHRASE = PASSPHRASE; #La clave elegida para la generación del certificado (la que se coloco en paso 1 y 2)
    const URL_TA = URL_TA;
    //Definición de ambientes
    const URL = URL; 

    /***********************************************************************************
                                            VARIABLES
    ************************************************************************************/
    //Path de trabajo
   
    private $path  = AFIP_ROOT_DIR; //Path del directorio RAIZ

    public $error = ''; //Manejo de errores
    private $client; //Cliente SOAP
    private $service; //WSN que se desea autorizar


    /************************************************************************************
     *                                      CONSTRUCTOR
     ***********************************************************************************/
   
    var $TA;

    public function __construct($service)
    {
        $this->service = $service;
        //Se deshabilita la caché WSDL que suele estar activada en php.ini
        ini_set ("soap.wsdl_cache_enabled", "0");
        ini_set ('soap.wsdl_cache_ttl', "0");

        // validar archivos necesarios
        if (!file_exists(self::CERT)) $this->error .= "No se pudo abrir el archivo correspondiente al Certificado: ".self::CERT;
        if (!file_exists(self::PRIVATEKEY)) $this->error .= "No se pudo abrir el archivo correspondiente a la Clave Privada: ".self::PRIVATEKEY;

        if (!file_exists($this->path.self::WSAA_WSDL)) $this->error .= "No se pudo abrir el descriptor del WSAA: ".$this->path.self::WSAA_WSDL;

        if(!empty($this->error)) {
            throw new Exception('Clase WSAA. Faltan archivos necesarios para el funcionamiento. '.$this->error);
        }
        try{
            $this->client = new SoapClient($this->path.self::WSAA_WSDL, array(
                    'soap_version'   => SOAP_1_2,
                    'location'       => self::URL,
                    'trace'          => 1,
                    'exceptions'     => 1
                )
            );
        }catch(Throwable $e){
            throw new Exception('Clase WSAA. Error en la conexion WSDL: '.$e);
        }

    }

    /************************************************************************************
     *                         FUNCIÓN PUBLICA QUE GENERA EL TA
     * Función principal que llama a las demás para generar el archivo TA.xml
     ***********************************************************************************/
   
    public function generar_TA()
    {
        date_default_timezone_set('America/Argentina/Buenos_Aires');
       	
        $actual_time        = time();
        $expiration_time    = strtotime($this->get_expiration());

        if ($actual_time < $expiration_time){
            $this->TA = simplexml_load_file(URL_TA.$this->service.'/TA.xml');
        }else{         
            $this->create_TRA();
            $ta_local = $this->call_WSAA( $this->sign_TRA() );

            if (!file_put_contents(URL_TA.$this->service.'/TA.xml', $ta_local))
                throw new Exception("Error accediendo al WSAA AFIP: Generando al archivo TA.xml");
        
            $this->TA = $this->xml2Array($ta_local);
        }      

        return true;
    }
     
    private function create_TRA()
    {
        $TRA = new SimpleXMLElement(
            '<?xml version="1.0" encoding="UTF-8"?>' .
            '<loginTicketRequest version="1.0">'.
            '</loginTicketRequest>');
        $TRA->addChild('header');
        $TRA->header->addChild('uniqueId', date('U'));
        $TRA->header->addChild('generationTime', date('c',date('U')-60));
        $TRA->header->addChild('expirationTime', date('c',date('U')+60));
        $TRA->addChild('service', $this->service);
        $TRA->asXML(URL_TA.$this->service.'/TRA.xml');
    }

    /************************************************************************************
     *                   FUNCIÓN QUE FIRMA EL REQUEST DE ACCESO (TRA)
     * Función que anexa el certificado y la clave a la solicitud del TRA
     * (genera el archivo TRA.tmp)
     ***********************************************************************************/
    private function sign_TRA()
    {
        //Toma el contenido del archivo TRA.xml y lo firma usando el certificado y su clave privada coincidente
        $STATUS = openssl_pkcs7_sign(URL_TA.$this->service.'/TRA.xml', URL_TA.$this->service.'/TRA.tmp', "file://" . self::CERT,
            array("file://" . self::PRIVATEKEY, self::PASSPHRASE),
            array(),
            !PKCS7_DETACHED
        );

        if (!$STATUS){
            throw new Exception("Error generando la solicitud de acceso. No se pudo firmar con el certificado y la clave\n");
        }

        $inf = fopen(URL_TA.$this->service.'/TRA.tmp', "r");
        $i = 0;
        $CMS = "";
        while (!feof($inf)) {
            $buffer = fgets($inf);
            if ( $i++ >= 4 ) $CMS .= $buffer;
        }

        fclose($inf);
        unlink(URL_TA.$this->service.'/TRA.tmp');
        return $CMS;
    }

    /************************************************************************************
     *    FUNCIÓN QUE CONECTA CON EL WEB SERVICE Y OBTIENE EL TICKET DE ACCESO (TA.xml)
    ***********************************************************************************/

    private function call_WSAA($cms)
    {
        $results = $this->client->loginCms(array('in0' => $cms));

        // para logueo
        file_put_contents($this->path."XML_llamadas/request-loginCms.xml", $this->client->__getLastRequest());
        file_put_contents($this->path."XML_llamadas/response-loginCms.xml", $this->client->__getLastResponse());

        if (is_soap_fault($results))
            throw new Exception("Error accediendo al WSAA AFIP: ".$results->faultcode.': '.$results->faultstring);

        return $results->loginCmsReturn;
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
     *                FUNCIÓN PUBLICA QUE OBTIENE LA FECHA DE EXPIRACIÓN DEL TA
     * Si no existe el archivo, devuelve false
     ***********************************************************************************/
    public function get_expiration()
    {
        // si no esta en memoria abrirlo
        if(empty($this->TA)) {
            $TA_file = file(URL_TA.$this->service.'/TA.xml', FILE_IGNORE_NEW_LINES);
            if($TA_file) {
                $TA_xml = '';
                for($i=0; $i < sizeof($TA_file); $i++)
                    $TA_xml.= $TA_file[$i];
                $this->TA = $this->xml2Array($TA_xml);
                $r = $this->TA['header']['expirationTime'];
            } else {
                $r = false;
            }
        } else {
            $r = $this->TA['header']['expirationTime'];
        }
        return $r;
    }
}