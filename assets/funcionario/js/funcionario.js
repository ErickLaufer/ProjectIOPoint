// Função para exibir/ocultar os detalhes do funcionário
function exibirDetalhes(id) {
    var detalhes = document.getElementById("detalhes-" + id);
    if (detalhes) {
        if (detalhes.style.display === "table-row") {
            detalhes.style.display = "none";
        } else {
            detalhes.style.display = "table-row";
        }
    }
}
