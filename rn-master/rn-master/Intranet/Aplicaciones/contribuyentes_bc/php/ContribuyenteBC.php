<?php
class ContribuyenteBC
{
    private $cuit;
    private $fechaactualizacion;
    private $denominacion;
    private $tipopersona;
    private $tipodocumento;
    private $documento;
    private $sexo;
    private $fechanacimiento;
    private $impuestos;
    private $domicilios;

    /**
     * ContribuyenteBC constructor.
     * @param $cuit
     * @param $fechaactualizacion
     * @param $denominacion
     * @param $tipopersona
     * @param $tipodocumento
     * @param $documento
     * @param $sexo
     * @param $fechanacimiento
     */
    public function __construct($cuit, $fechaactualizacion, $denominacion, $tipopersona, $tipodocumento, $documento, $sexo, $fechanacimiento)
    {
        $this->cuit = $cuit;
        $this->fechaactualizacion = $fechaactualizacion;
        $this->denominacion = $denominacion;
        $this->tipopersona = $tipopersona;
        $this->tipodocumento = $tipodocumento;
        $this->documento = $documento;
        $this->sexo = $sexo;
        $this->fechanacimiento = $fechanacimiento;
    }

    /**
     * @return mixed
     */
    public function getDomicilios()
    {
        return $this->domicilios;
    }

    /**
     * @param mixed $domicilios
     */
    public function setDomicilios($domicilios)
    {
        $this->domicilios = $domicilios;
    }



    /**
     * @return mixed
     */
    public function getImpuestos()
    {
        return $this->impuestos;
    }

    /**
     * @param mixed $impuestos
     */
    public function setImpuestos($impuestos)
    {
        $this->impuestos = $impuestos;
    }


    /**
     * @return mixed
     */
    public function getCuit()
    {
        return $this->cuit;
    }

    /**
     * @param mixed $cuit
     */
    public function setCuit($cuit)
    {
        $this->cuit = $cuit;
    }

    /**
     * @return mixed
     */
    public function getFechaactualizacion()
    {
        return $this->fechaactualizacion;
    }

    /**
     * @param mixed $fechaactualizacion
     */
    public function setFechaactualizacion($fechaactualizacion)
    {
        $this->fechaactualizacion = $fechaactualizacion;
    }

    /**
     * @return mixed
     */
    public function getDenominacion()
    {
        return $this->denominacion;
    }

    /**
     * @param mixed $denominacion
     */
    public function setDenominacion($denominacion)
    {
        $this->denominacion = $denominacion;
    }

    /**
     * @return mixed
     */
    public function getTipopersona()
    {
        return $this->tipopersona;
    }

    /**
     * @param mixed $tipopersona
     */
    public function setTipopersona($tipopersona)
    {
        $this->tipopersona = $tipopersona;
    }

    /**
     * @return mixed
     */
    public function getTipodocumento()
    {
        return $this->tipodocumento;
    }

    /**
     * @param mixed $tipodocumento
     */
    public function setTipodocumento($tipodocumento)
    {
        $this->tipodocumento = $tipodocumento;
    }

    /**
     * @return mixed
     */
    public function getDocumento()
    {
        return $this->documento;
    }

    /**
     * @param mixed $documento
     */
    public function setDocumento($documento)
    {
        $this->documento = $documento;
    }

    /**
     * @return mixed
     */
    public function getSexo()
    {
        return $this->sexo;
    }

    /**
     * @param mixed $sexo
     */
    public function setSexo($sexo)
    {
        $this->sexo = $sexo;
    }

    /**
     * @return mixed
     */
    public function getFechanacimiento()
    {
        return $this->fechanacimiento;
    }

    /**
     * @param mixed $fechanacimiento
     */
    public function setFechanacimiento($fechanacimiento)
    {
        $this->fechanacimiento = $fechanacimiento;
    }


}
