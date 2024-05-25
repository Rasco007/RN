/*

function myFunction(x) {
    if (x.matches) { // If media query matches
        document.body.style.backgroundColor = "yellow";
    } else {
        document.body.style.backgroundColor = "pink";
    }
}

var x = window.matchMedia("(max-width: 700px)")

*/
		function mediaMatch(unMedia) { //"(max-width: 700px)"
			var x = window.matchMedia(unMedia);
		    if (x.matches) { // If media query matches
		        return true;
		    } else {
		        return false;
		    }
		}



		function creaElemento(unTipo, unId, unasClases="", unosAtributos=new Array()){
			var elem = document.createElement(unTipo);
			elem.id = unId;
			elem.className = unasClases;
			unosAtributos.forEach(atributo =>{
				elem.setAttribute(atributo[0], atributo[1]);
			});

			return elem;
		}

		function creaInputBootstrap(unId, unasClases="", unTipo="text", unosAtributos=new Array(), unValue=null){
			var inputBs = document.createElement("INPUT");
			inputBs.id = unId;
			inputBs.name = unId;
			inputBs.className = "form-control input-sm " + unasClases;
			inputBs.type = unTipo;
			inputBs.value = unValue;

			unosAtributos.forEach(atributo =>{
				inputBs.setAttribute(atributo[0], atributo[1]);
			});
			return inputBs;
		}

		function creaSpan(unId, unasClases="", unosAtributos=new Array()){
			var span = document.createElement("SPAN");
			span.id = unId;
			span.className = unasClases;
			for(var i = 0; i<unosAtributos.length; i++){
				span.setAttribute(unosAtributos[i][0], unosAtributos[i][1]);
			}

			return span;
		}

		function creaBoton(unId, unasClases="", unHtml="", unTipo="button"){
			var boton = document.createElement("BUTTON");
			boton.id = unId;
			boton.className = unasClases;
			boton.type = unTipo;
			boton.innerHTML = unHtml;

			return boton;
		}

		function creaLabel(unNombre, unHtml){
			var label = document.createElement("LABEL");
			label.id = "label_" + unNombre;
			label.setAttribute("for", "d_" + unNombre);
			label.innerHTML = unHtml;

			return label;
		}

		function creaDiv(unId, unasClases="", unosAtributos=new Array()){
			var div = document.createElement("DIV");
			div.id = unId;
			div.className = unasClases;
			unosAtributos.forEach(atributo =>{
				elem.setAttribute(atributo[0], atributo[1]);
			});

			return div;
		}

		function creaBotonBootstrap(unId, unIcono="", unHtml="", unasClases=""){
			var botonBs = creaBoton(unId, "btn-sm btn-primary " + unasClases);
			
			var html = document.createTextNode(unHtml);
			
			if(unIcono != ""){
				var spanIcon = creaSpan("", "glyphicon glyphicon-" + unIcono, [["aria-hidden", "true"]]);
				botonBs.appendChild(spanIcon);
				spanIcon.style.marginBottom = "5px";
			}
			if(unHtml != ""){
				botonBs.appendChild(html);

			}
			return botonBs;
		}

		function creaRowBotonesFiltros(){
			var row = creaRow("botones", [], "text-center");
			var botonBuscar = creaBotonBootstrap("btn_buscar", "search", " Buscar");
			var botonLimpiar = creaBotonBootstrap("btn_limpiar", "trash", " Limpiar");
			var botonHabilitar = creaBotonBootstrap("btn_habilitar", "refresh", " Habilitar");
			
			botonBuscar.style.marginRight = "5px";
			botonLimpiar.style.marginRight = "5px";
			
			botonBuscar.style.paddingBottom = "21px";
			botonLimpiar.style.paddingBottom = "21px";
			botonHabilitar.style.paddingBottom = "21px";
			
			row.appendChild(botonBuscar);
			row.appendChild(botonLimpiar);
			row.appendChild(botonHabilitar);
			return row;
		}


		function creaSpanLupa(unNombre){

			var spanLupa = creaSpan("span_" + unNombre, "input-group-btn");
			
			var buttonLupa = creaBotonBootstrap("lupa_c_" + unNombre, "search");
		
			spanLupa.appendChild(buttonLupa);

			return spanLupa;
		}

		function creaInputGroup(unNombre, unosBloques){
			var inputGroup = creaDiv("inputgroup_" + unNombre, "input-group");
			for(let i = 0; i<unosBloques.length; i++){
				inputGroup.appendChild(unosBloques[i]);
			}

			return inputGroup;

		}

		function creaInputGroupLupa(unNombre){
			
			var inputCodigo = creaInputBootstrap("c_" + unNombre, "input-cod-short");
			var inputDescrip = creaInputBootstrap("d_" + unNombre, "input-desc-long");
			var spanLupa = creaSpanLupa(unNombre);
			inputDescrip.setAttribute("readonly", "");

			var inputGroup = creaInputGroup(unNombre, [inputCodigo, inputDescrip, spanLupa]);
			
			return inputGroup;

		}

		function creaInputAddon(unNombre, unHtml="", unasClases=""){
			var addon = creaElemento("DIV", "addon_"+unNombre, "input-group-addon "+unasClases);
			addon.innerHTML = unHtml;

			return addon;
		}

		function creaFechaDesdeHasta(unTitulo, unNumero="", ignoreMedia=false){
			/*
			<div class="form-group col-md-3">
						    <label for="f_hasta">Per&iacute;odo que abarca</label>	
						    <div class="input-group-addon addon-fecha-out">desde</div>
						    <div class="input-group-addon addon-fecha-out">hasta</div>
						    <div class="input-group" id="periodo_div">
						   			<div class="input-group-addon addon-fecha">desde</div>						    	
							        <input name='f_desde' id='f_desde' type='text' class='form-control datepicker2 text-center input-sm'/>
							        <div class="input-group-addon addon-fecha">hasta</div>
							        <input name='f_hasta' id='f_hasta' type='text' class='form-control datepicker2 text-center input-sm'/>
							    
						    </div>
						    
						</div>	
			*/
			var addonDesde = creaInputAddon("f_desde", "desde");
			var addonHasta = creaInputAddon("f_hasta", "hasta");
			var datePickerDesde = creaInputBootstrap("f_desde"+unNumero, "datepicker text-center");
			var datePickerHasta = creaInputBootstrap("f_hasta"+unNumero, "datepicker text-center");
			var inputGroup;
			var formGroup;
			if(!mediaMatch("(min-width:992px) and (max-width:1316px)") || ignoreMedia){
				inputGroup = creaInputGroup("f_desde_hasta", [addonDesde, datePickerDesde, addonHasta, datePickerHasta]);
				formGroup = creaFormGroup("f_desde_hasta", unTitulo, inputGroup);
						
			}else{				
				formGroup = creaFormGroup("f_desde_hasta", unTitulo, addonDesde);
				formGroup.appendChild(addonHasta);
				datePickerDesde.style.width = "50%";
				datePickerHasta.style.width = "50%";
				inputGroup = creaInputGroup("f_desde_hasta", [datePickerDesde, datePickerHasta]);
				formGroup.appendChild(inputGroup);
			}

			return formGroup;

		}

		function creaFormGroup(unNombre, titulo, unosBloques=new Array(creaInputBootstrap(unNombre)), unasClases=""){
			var formGroup = creaDiv("formgroup_" + unNombre, "form-group " + unasClases);
			var label = creaLabel(unNombre, titulo);
					
			formGroup.appendChild(label);

			unosBloques.forEach(bloque => 
			{
				formGroup.appendChild(bloque);
			});

			return formGroup;
		}


		function creaFormGroupLupa(unNombre, titulo, unasClases=""){
			var formGroup = creaFormGroup(unNombre, titulo, [creaInputGroupLupa(unNombre)]);
			
			return formGroup;
		}

		function creaRow(unNombre, unosBloques=[], unasClases=""){
			var row = creaDiv("row_" + unNombre, "row-search "+unasClases);
			var cantFG = unosBloques.length;
			if(cantFG != 0){
							var columnas = 12/cantFG;
						}
			unosBloques.forEach(bloque => 
			{
				bloque.classList.add("col-md-" + columnas);
				row.appendChild(bloque);
			});
			return row;
		}

		function creaForm(unNombre, unasRows, unasClases=""){
			var form = creaElemento("FORM", "frm-" + unNombre, unasClases);
			
			unasRows.forEach(element =>
			{
					form.appendChild(element);				
			});
			return form;
		}

		function creaFormBusqueda(unasRows, unasClases=""){
			var form = creaForm("busqueda", unasRows, unasClases);
			var rowBotones = creaRowBotonesFiltros();
			form.style.paddingTop = "5px";
			rowBotones.style.marginTop = "5px";
			form.appendChild(rowBotones);	
			return form;
		}

		function creaPanelSearch(){
			var divSearch = creaDiv("div_search", "panel-search");
			var divPanel = creaDiv("div_panel", "panel panel-primary");
			var atributos = [
				["role", "button"],
				["data-toggle", "collapse"],
				["href", "#collapse_search"],
				["aria-expanded", "true"],
				["aria-controls", "#collapse_search"]
			];

			var btnSearch = creaElemento("A", "a_search_btn", "btn btn-primary", atributos);
			var spanIcon = creaSpan("span_search_icon", "glyphicon");
			var divCollapse = creaElemento("DIV", "collapse_search", "collapse in", [["aria-expanded", "true"]]);
			var divHeading = creaDiv("div_search_heading", "panel-heading");
			divHeading.innerHTML = "B&uacute;squeda";
			var divBody = creaDiv("div_search_body", "panel-body");

			divCollapse.appendChild(divHeading);
			divCollapse.appendChild(divBody);
			btnSearch.appendChild(spanIcon);
			divPanel.appendChild(btnSearch);
			divPanel.appendChild(divCollapse);
			divSearch.appendChild(divPanel);

			document.getElementsByClassName("page-content")[0].appendChild(divSearch);
			return divBody;
		}


		function creaTitulo(unTitulo){
			var div = creaDiv("div_titulo", "text-center");
			var b = document.createElement("B");
			var h3 = document.createElement("H3");
			div.appendChild(h3);
			div.appendChild(b);
			b.innerHTML = unTitulo
			div.style.padding = "5px";s
			div.style.marginBottom = "5px";

			return div;
		}


		function parsearTexto(unTexto){
			var puntero = 0;
			var cadena = "";
			var charAct = "";
			var inputs = [];
			

			while(puntero < unTexto.length){

				charAct = unTexto[puntero];
				cadena += charAct;				

				switch(charAct){
					case ">":
						break;
					case "<": //si abri un tag busco que sea un input
						while(charAct != " "){
							puntero++;
							charAct = unTexto[puntero];
							cadena += charAct;
						}
						//si el tag era un input, me guardo todo hasta que cierre el tag
						if(cadena == "input"){
							alert("Encontre un " + cadena);							
							cadena = "";
							while(charAct != ">"){
								puntero++;
								charAct = unTexto[puntero];
								cadena += charAct;
							}
							alert("Adentro habia: " + cadena);
							cadena = "";
						}
						cadena = "";
					default:
						cadena = "";
					 	break;
				}
				/*
				switch(cadena){
					case " ":
						cadena = "";
						break;
					case "<input"
				}
				*/
				//alert(cadena);
				//alert(charAct);

				puntero++;

			}
		}

		function htmlSinConcatenar(unTexto){
			var puntero = 0;
			var cadena = "";
			var charAct = "";
			var contador = 0;

			while(puntero < unTexto.length){

				charAct = unTexto[puntero];								

				switch(charAct){
					case "<":
						contador++
						cadena += charAct;
						break;
					case ">":
						contador--;
						cadena += charAct;
						break;
					case "'":
					case '"':
					case "+":
						if(contador != 0){
							cadena += charAct;
						}
						break;
					default:
						cadena += charAct;
					 break;
				}	

				puntero++;

			}
			return cadena;

		}
