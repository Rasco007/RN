function inicializarFiltro() {
    if(p_tributo){
        $('#c_tributo').val(p_tributo);
        $('#lupa_c_tributo').css("visibility", "hidden");
        $('#c_tributo').blur();
    }
}