<?php

require_once("MotivoImpuesto.php");

class ImpuestoContribuyente
{
    private $impuesto;
    private $estado;
    private $periodo;
    private $dia;
    private $motivo;
    private $inscripcion;
    private $fechadesde;

    public function __construct()
    {
    }

    /**
     * @return mixed
     */
    public function getImpuesto()
    {
        return $this->impuesto;
    }

    /**
     * @param mixed $impuesto
     */
    public function setImpuesto($impuesto)
    {
        $this->impuesto = $impuesto;
    }

    /**
     * @return mixed
     */
    public function getEstado()
    {
        return $this->estado;
    }

    /**
     * @param mixed $estado
     */
    public function setEstado($estado)
    {
        $this->estado = $estado;
    }

    /**
     * @return mixed
     */
    public function getPeriodo()
    {
        return $this->periodo;
    }

    /**
     * @param mixed $periodo
     */
    public function setPeriodo($periodo)
    {
        $this->periodo = $periodo;
    }

    /**
     * @return mixed
     */
    public function getDia()
    {
        return $this->dia;
    }

    /**
     * @param mixed $dia
     */
    public function setDia($dia)
    {
        $this->dia = $dia;
    }

    /**
     * @return mixed
     */
    public function getMotivo()
    {
        return $this->motivo;
    }

    /**
     * @param mixed $motivo
     */
    public function setMotivo($motivo)
    {
        $this->motivo = $motivo;
    }

    /**
     * @return mixed
     */
    public function getInscripcion()
    {
        return $this->inscripcion;
    }

    /**
     * @param mixed $inscripcion
     */
    public function setInscripcion($inscripcion)
    {
        $this->inscripcion = $inscripcion;
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