function GridParam(paramGrid) {
  var grid = $.extend({m_autoquery: "S", param: {}, fields_sql: FUNCIONES_BASEPATH + "grid_fields_sql.php", grid_childs_id: {}, keyNavigation: true, altoGrillaDinamico: false}, paramGrid);
  var _0xce4ax4 = this;
  var columna = new Array;
  this.id_menu = grid.id_menu;
  this.n_grid = grid.n_grid;
  this.m_autoquery = grid.m_autoquery;
  this.extra_param = grid.param;
  this.n_orden = grid.n_orden;
  this.grid_childs_id = grid.grid_childs_id;
  this.keyNavigation = grid.keyNavigation;
  this.altoGrillaDinamico = grid.altoGrillaDinamico;
  var extra_param = this.extra_param;
  $.extend(extra_param, {id_menu: this.id_menu, n_grid: this.n_grid});
  $.ajax(grid.fields_sql, {async: false, dataType: "json", type: "POST", success: function (data, _0xce4ax8, error) {
    for (var i = 0; i < data.length; i++) {
      columna[data[i].N_COLUMN] = new GridField(data[i]);
    }
  }, error: function (dataError, _0xce4ax8, error) {
    if (error == "abort") {
      return;
    }
    ;
    if (error == "Timeout" || error == "NoLog" || error == "Forbidden" || error == "Token") {
      window.location = BASEPATH_ENTORNO + "index.php?error=" + error;
    } else {
      var _0xce4axd;
      if (dataError.responseText != "") {
        _0xce4axd = dataError.responseText;
      } else {
        _0xce4axd = "Se ha producido el siguiente error: " + error;
      }
      ;
      if (error != "" && error != null && error != "null" && error != "OK" && error != "ok") {
        alert(_0xce4axd);
      }
    }
  }, data: extra_param});
  this.colNames = function () {
    cols = new Array;
    for (i = 0; i < columna.length; i++) {
      cols[columna[i].getIndex()] = columna[i].getTitle();
    }
    ;
    return cols;
  };
  this.colModel = function () {
    cols = new Array;
    for (var i = 0; i < columna.length; i++) {
      var col = columna[i];
      var propiedades = "validate[";
      propiedades += col.getRowValue("M_OBLIGATORIO") == "S" ? "required," : "";
      propiedades += col.getRowValue("D_VALIDA_DATO") + ",";
      propiedades += col.getRowValue("D_VALIDACION") + "] FormElement ";
      propiedades += col.getRowValue("D_CLASE");
      var propExtra = $.extend({class: propiedades, size: 50}, eval("({" + col.getRowValue("D_EDITOPTIONS") + "})") || {});
      if (col.getRowValue("M_READONLY") == "S") {
        $.extend(propExtra, {readonly: "readonly"});
      }
      ;
      if (col.getRowValue("N_ID_LISTA")) {
        propiedades += " lupa_input";
        $.extend(propExtra, {class: propiedades, "data-id-lista": col.getRowValue("N_ID_LISTA")});
      }
      ;
      var cabeceraColumna = {name: col.getRowValue("D_COLUMN_NAME"), index: col.getRowValue("D_COLUMN_NAME"), frmwktype: col.getRowValue("C_TIPO_DATO"), width: 100, align: "left", searchoptions: {sopt: ["LIKE", "IGU", "LIKSTART", "LIKEND", "MENIGU", "MAYIGU", "nu"]}, hidden: col.getRowValue("M_VISIBLE") == "S" ? false : true, hidedlg: col.getRowValue("M_VISIBLE_DLG") == "S" ? false : true, editable: col.getRowValue("M_EDITABLE") == "S" ? true : false, editrules: {edithidden: col.getRowValue("M_EDITABLE") == "S" && col.getRowValue("M_VISIBLE") == "S" ? true : false}, coloptions: {sorting: true, columns: col.getRowValue("M_COLUMNS") == "S" ? true : false, filtering: false, seraching: false, grouping: false, freeze: col.getRowValue("M_FREEZE") == "S" ? true : false}, editoptions: propExtra};
      var obligatorio;
      if (col.getRowValue("M_OBLIGATORIO") == "S") {
        obligatorio = col.getTitle() + " (*)";
      } else {
        obligatorio = col.getTitle();
      }
      ;
      if (col.getRowValue("N_ID_LISTA")) {
        $.extend(cabeceraColumna, {formoptions: {label: obligatorio, elmprefix: '<div class="div_lup"><button type="button" tabindex="-1" class="btn btn-primary glyphicon glyphicon-search lupa_button" data-input-id="' + col.getRowValue("D_COLUMN_NAME") + '" id="' + col.getRowValue("D_COLUMN_NAME") + '_lupa">' + "</button></div>"}});
      } else {
        $.extend(cabeceraColumna, {formoptions: {label: obligatorio, elmsuffix: " " + col.getRowValue("MASCARA")}});
      }
      ;
      if (col.getRowValue("D_CLASE") == "datepicker") {
        $.extend(cabeceraColumna, {searchoptions: {sopt: ["IGU", "MENIGU", "MAYIGU", "nu"], dataInit: function (_0xce4ax13) {
          $(_0xce4ax13).datepicker({autoclose: true, format: "dd/mm/yyyy", dateFormat: "dd/mm/yy", changeMonth: false, changeYear: false, onClose: function () {
            $(this).focus();
          }, dayNamesMin: ["D", "L", "M", "M", "J", "V", "S"], monthNamesShort: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"], monthNames: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"]}).blur(function () {
            formatearFecha($(this));
          }).keypress(function (_0xce4ax14) {
            if (_0xce4ax14.which == 13) {
              formatearFecha($(this));
            }
          }).mask("99/99/99ZZ", {translation: {Z: {pattern: /[0-9]/, optional: true}}}).css("text-align", "center").attr("placeholder", "DD/MM/AAAA");
        }}});
      }
      ;
      if (col.getRowValue("D_CLASE") == "mascara_importe") {
        $.extend(cabeceraColumna, {searchoptions: {sopt: ["LIKE", "IGU", "LIKSTART", "LIKEND", "MENIGU", "MAYIGU", "nu"], dataInit: function (_0xce4ax13) {
          $(_0xce4ax13).keydown(function (_0xce4ax15) {
            controla_number(_0xce4ax15, this, 2);
          });
          $(_0xce4ax13).focus(function () {
            $(_0xce4ax13).val(",00");
            $(_0xce4ax13).get(0).setSelectionRange(0, 0);
          });
        }}});
      }
      ;
      cols[col.getIndex()] = $.extend(cabeceraColumna, eval("({" + columna[i].getRowValue("D_EXTRA_PARAM_DEFAULT") + "})") || {});
    }
    ;
    return cols;
  };
  this.postData = function () {
    return {id_menu: this.id_menu, n_grid: this.n_grid, m_autoquery: this.m_autoquery, n_orden: this.n_orden, grid_childs_id: this.grid_childs_id, keyNavigation: this.keyNavigation, altoGrillaDinamico: this.altoGrillaDinamico, param_init: JSON.stringify(this.extra_param), param: JSON.stringify(this.extra_param)};
  };
}

function GridField(data) {
  var campo = data;
  this.getTitle = function () {
    return campo.D_COLUMN_TITLE;
  };
  this.getIndex = function () {
    return campo.N_COLUMN;
  };
  this.getRowValue = function (col) {
    return campo[col] === null ? "" : campo[col];
  };
}

(function () {
  var doc, aux;
  jQuery.uaMatch = function (dataMatch) {
    dataMatch = dataMatch.toLowerCase();
    var propDataMatch = /(chrome)[ \/]([\w.]+)/.exec(dataMatch) || /(webkit)[ \/]([\w.]+)/.exec(dataMatch) || /(opera)(?:.*version|)[ \/]([\w.]+)/.exec(dataMatch) || /(msie) ([\w.]+)/.exec(dataMatch) || dataMatch.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(dataMatch) || [];
    return {browser: propDataMatch[1] || "", version: propDataMatch[2] || "0"};
  };
  doc = jQuery.uaMatch(navigator.userAgent);
  aux = {};
  if (doc.browser) {
    aux[doc.browser] = true;
    aux.version = doc.version;
    if (doc.browser != "msie") {
      aux.msie = null;
    }
  }
  ;
  if (aux.chrome) {
    aux.webkit = true;
  } else {
    if (aux.webkit) {
      aux.safari = true;
    }
  }
  ;
  jQuery.browser = aux;
}());
