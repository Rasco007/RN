function inicializarEventos(){
    switch(p_tipo_consulta){
        case 'boleta_individual':
            imprimir_boleta_individual(p_id_boleta);
        break;
        case 'boleta_grilla':
            imprimir_boleta_grilla(p_id_contrib);
        break;
    }
} 