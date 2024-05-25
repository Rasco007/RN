<?php


class DomicilioContribuyente
{
    private $tipoafip;
    private $idnomenclaafip;
    private $calle;
    private $numero;
    private $tipodatoadic;
    private $datoadic;
    private $postafip;
    private $descripafip;
    private $idcontribuyente;
    private $fechadesde;

    /**
     * DomicilioContribuyente constructor.
     * @param $tipoafip
     * @param $idnomenclaafip
     * @param $calle
     * @param $tipodatoadic
     * @param $datoadic
     * @param $postafip
     * @param $descripafip
     * @param $idcontribuyente
     * @param $tipodomicilio
     * @param $fechadesde
     */
    public function __construct($tipoafip, $idnomenclaafip, $calle, $numero, $tipodatoadic, $datoadic, $postafip, $fechadesde)
    {
        $this->tipoafip = $tipoafip;
        $this->idnomenclaafip = $idnomenclaafip;
        $this->calle = $calle;
        $this->numero = $numero;
        $this->tipodatoadic = $tipodatoadic;
        $this->datoadic = $datoadic;
        $this->postafip = $postafip;
        $this->fechadesde = $fechadesde;
    }

    /**
     * @return mixed
     */
    public function getTipoafip()
    {
        return $this->tipoafip;
    }

    /**
     * @param mixed $tipoafip
     */
    public function setTipoafip($tipoafip)
    {
        $this->tipoafip = $tipoafip;
    }

    /**
     * @return mixed
     */
    public function getIdnomenclaafip()
    {
        return $this->idnomenclaafip;
    }

    /**
     * @param mixed $idnomenclaafip
     */
    public function setIdnomenclaafip($idnomenclaafip)
    {
        $this->idnomenclaafip = $idnomenclaafip;
    }

    /**
     * @return mixed
     */
    public function getCalle()
    {
        return $this->calle;
    }

    /**
     * @param mixed $calle
     */
    public function setCalle($calle)
    {
        $this->calle = $calle;
    }

    /**
     * @return mixed
     */
    public function getNumero()
    {
        return $this->numero;
    }

    /**
     * @param mixed $numero
     */
    public function setNumero($numero)
    {
        $this->numero = $numero;
    }



    /**
     * @return mixed
     */
    public function getTipodatoadic()
    {
        return $this->tipodatoadic;
    }

    /**
     * @param mixed $tipodatoadic
     */
    public function setTipodatoadic($tipodatoadic)
    {
        $this->tipodatoadic = $tipodatoadic;
    }

    /**
     * @return mixed
     */
    public function getDatoadic()
    {
        return $this->datoadic;
    }

    /**
     * @param mixed $datoadic
     */
    public function setDatoadic($datoadic)
    {
        $this->datoadic = $datoadic;
    }

    /**
     * @return mixed
     */
    public function getPostafip()
    {
        return $this->postafip;
    }

    /**
     * @param mixed $postafip
     */
    public function setPostafip($postafip)
    {
        $this->postafip = $postafip;
    }

    /**
     * @return mixed
     */
    public function getDescripafip()
    {
        return $this->descripafip;
    }

    /**
     * @param mixed $descripafip
     */
    public function setDescripafip($descripafip)
    {
        $this->descripafip = $descripafip;
    }

    /**
     * @return mixed
     */
    public function getIdcontribuyente()
    {
        return $this->idcontribuyente;
    }

    /**
     * @param mixed $idcontribuyente
     */
    public function setIdcontribuyente($idcontribuyente)
    {
        $this->idcontribuyente = $idcontribuyente;
    }


    /**
     * @return mixed
     */
    public function getFechadesde()
    {
        return $this->fechadesde;
    }

    /**
     * @param mixed $fechadesde
     */
    public function setFechadesde($fechadesde)
    {
        $this->fechadesde = $fechadesde;
    }




}