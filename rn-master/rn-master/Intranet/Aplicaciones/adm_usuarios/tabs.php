<?php
function tabs_mode($tipo){
    $grid = ($tipo == 'INTERNO')? 'int': 'ext';

    $tabla = '<div style="width: 100%; display: table;"><div style="display: table-row">';

    $tabla_menues = '<div class="col-md-4" style="display: table-cell;"><table id="grid_menues_'.$grid.'" class="scroll" cellpadding="0" cellspacing="0"><tr><td>&nbsp;</td></tr></table><div id="grid_menues_'.$grid.'_pager" class="scroll" style="text-align:center;"></div></div>';

    $tabla_permisos = '<div class="col-md-4" style="display: table-cell;padding-left: 50px;"><table id="grid_permisos_'.$grid.'" class="scroll" cellpadding="0" cellspacing="0"><tr><td>&nbsp;</td></tr></table><div id="grid_permisos_'.$grid.'_pager" class="scroll" style="text-align:center;"></div></div>';
    
    $tabla_entes = '<div class="col-md-4" style="display: table-cell;padding-left: 50px;"><table id="grid_entes_'.$grid.'" class="scroll" cellpadding="0" cellspacing="0"><tr><td>&nbsp;</td></tr></table><div id="grid_entes_'.$grid.'_pager" class="scroll" style="text-align:center;"></div></div>';

    $tabla = $tabla_menues . $tabla_permisos . $tabla_entes;

    $tabla = $tabla.'</div></div>';
    return $tabla;
}