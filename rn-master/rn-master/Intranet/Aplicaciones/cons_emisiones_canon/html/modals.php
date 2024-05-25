<?php

?>

<style type="text/css">

    details {
      width: 100%;
      min-height: 5px;
      max-width: 700px;
      padding: 20px 20px 20px 10px;
      margin: 0 auto;
      position: relative;
      font-size: 14px;
      border: 1px solid rgba(0,0,0,.1);
      border-radius: 15px;
      box-sizing: border-box;
      transition: all .3s;
    }

    details + details {
      margin-top: 20px;
    }

    details[open] {
      min-height: 50px;
      background-color: #f6f7f8;
      box-shadow: 2px 2px 20px rgba(0,0,0,.2);
    }

    details label {
        font-size:12px;
        font-weight: 500 !important;
    }

    summary {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-weight: 501;
      cursor: pointer;
      font-size:16px;
    }

    summary:focus {
      outline: none !important;  
    }

    summary:focus::after {
      content: "";
      height: 100%;
      width: 100%;
      display: block;
      position: absolute;
      top: 0;
      left: 0;
      box-shadow: 0 0 0 5px transparent;
    }

    summary::-webkit-details-marker {
      display: none
    }

    .control-icon {
      fill: var(--colorPrimerNivel);
      transition: .3s ease;
      pointer-events: none;
    }

    .control-icon-close {
      display: none;
    }

    details[open] .control-icon-close {
      display: initial;
      transition: .3s ease;
    }

    details[open] .control-icon-expand {
      display: none;
    }

</style>

<div class="modal fade" id="modal_errores_emi" tabindex="-1" role="dialog" aria-labelledby="errores_emiLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
                <h5 class="modal-title" id="errores_emiLabel">Errores</h5>
            </div>
            <div class="modal-body">
                <table id="errores_emisiones_grid" class="scroll" cellpadding="0" cellspacing="0"><tr><td></td></tr></table>
                <div id="errores_emisiones_grid_pager" class="scroll"></div>
            </div>
            <div class="modal-footer">
                <div class="text-center">
                    <button type="button" class="btn btn-secondary" id="btn_volver_errores_emi" data-dismiss="modal">Volver</button>
                </div>
            </div>
        </div>
    </div>
</div>

<div class="modal fade" id="modal_impresion_masiva" tabindex="-1" role="dialog" aria-labelledby="impresion_masivaLabel" aria-hidden="true">
    <div class="modal-dialog modal-md" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
                <h5 class="modal-title" id="impresion_masivaLabel">Elija una Opción</h5>
            </div>
            <div class="modal-body">
                <form id='frm_impresion_masiva'>
                    <div style="visibility: hidden; position: absolute; width: 0px; height: 0px;">
                        <svg xmlns="http://www.w3.org/2000/svg">
                            <symbol viewBox="0 0 24 24" id="expand-more">
                            <path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z"/><path d="M0 0h24v24H0z" fill="none"/>
                            </symbol>
                            <symbol viewBox="0 0 24 24" id="close">
                            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/><path d="M0 0h24v24H0z" fill="none"/>
                            </symbol>
                        </svg>
                    </div>

                    <details id="det1">
                    <summary  id="sum1">
                        Imprima por Secuencia
                        <svg class="control-icon control-icon-expand" width="24" height="24" role="presentation"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#expand-more" /></svg>
                        <svg class="control-icon control-icon-close" width="24" height="24" role="presentation"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#close" /></svg>
                    </summary>
                    <br>
                    <div class="row">
                        <div class="form-group col-md-6">
                            <label for="n_secuencia_desde">Desde</label>
                            <input type="text" class="form-control input-sm text-right limpiar" name="n_secuencia_desde" id="n_secuencia_desde">
                        </div>

                        <div class="form-group col-md-6">
                            <label for="n_secuencia_hasta">Hasta</label>
                            <input type="text" class="form-control input-sm text-right limpiar" name="n_secuencia_hasta" id="n_secuencia_hasta">
                        </div>
                    </div>
                    </details>

                    <details id="det2">

                        <summary id="sum2">
                        Imprima por Consorcio-Región-Área y/o Tipo de Distribución
                            <svg class="control-icon control-icon-expand" width="24" height="24" role="presentation"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#expand-more" /></svg>
                            <svg class="control-icon control-icon-close" width="24" height="24" role="presentation"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#close" /></svg>
                        </summary>
                        <br>
                        <div class="row">
                            <div class="col-md-12">
                                <label for="combo_consorcios" class="control-label">Consorcio</label>
                                <select id="combo_consorcios" data-live-search="true" title="Seleccionar" class="selectpicker form-control input-sm show-tick" data-style="cDropdown">
                                    <option value=""></option>
                                    <?php foreach ($consorcios as $consorcio): ?>
                                    <option value="<?=$consorcio['C_ORGANISMO']; ?>"> <?=$consorcio['D_ORGANISMO']; ?></option>
                                    <?php endforeach; ?>
                                </select>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-12">
                                <label for="combo_regiones" class="control-label">Región</label>
                                <select id="combo_regiones" title="Seleccionar" class="selectpicker form-control input-sm show-tick" data-style="cDropdown">
                                    <option value=""></option>
                                </select>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-12">
                                <label for="combo_areas" class="control-label">Áreas</label>
                                <select id="combo_areas" title="Seleccionar" class="selectpicker form-control input-sm show-tick" data-style="cDropdown">
                                    <option value=""></option>
                                </select>
                            </div>
                        </div>
                        <br>
                        <div class="row">
                            <div class="form-group col-md-4">
                                <label> Imprimir Todas</label>
                                <input type="checkbox" class="form-control input-sm text-center" name="m_todas" id="m_todas" onclick="fun_select_todas();">
                            </div>

                            <div class="form-group col-md-4">
                                <label for="m_todas_sin_mail">Solo Correo</label>
                                <input type="checkbox" class="form-control input-sm text-center" name="m_todas_sin_mail" id="m_todas_sin_mail" onclick="fun_select_todas_mail();">
                            </div>
                        </div>
                    </details>


                    <br><br>
                    <div>
                        <b><u>Nota:</u></b> Seleccione una de las dos opciones disponibles.
                    </div>
            
                </form>
            </div>
            <div class="modal-footer">
                <div class="text-center">
                    <button type="button" class="btn btn-secondary" id="btn_volver_impresion_masiva" data-dismiss="modal">Volver</button>
                    <button type="button" class="btn btn-primary" id="btn_impresion_masiva">Imprimir</button>
                </div>
            </div>
        </div>
    </div>
</div>
