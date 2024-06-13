// Inicia o estado do state conforme o que encontrar em localStorage
// Caso encontre um item, o estado inicia com true, e permite ser visualizado a area administrativa ao recarregar a página
// Caso contrario, retorna false, e ao tentar visualizar a tela administrativa, será imediatamente redirecionado para a tela de login

const initialState = localStorage.getItem("token") ? true : false;

export default function (state = initialState, action) {
    switch (action.type) {
        // tratamento de login // seta em local Storage o token para verificações
        case "LOGIN":
            localStorage.setItem("token", action.payload.token);
            localStorage.setItem("name", action.payload.name);
            // Retorna true para o state atual, permitindo continuar navegando na área administrativa
            return true;
        case "LOGOUT":
            // Limpa o local Storage para evitar possiveis acessos indesejados com token
            localStorage.clear();
            // Retorna false para o state atual, bloqueando a navegação na área administrativa
            return false;
        default:
            // Caso não seja nenhuma das opções acima, retorna o state no seu estado atual
            return state;
    }
}
