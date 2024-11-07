export default function SeparadorMiles(numero) {
    if (!numero) {
        return "0,00";
    }
    let numeroSeparado = numero.toString().split(".");
    numero = numeroSeparado[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".") + ',' + (numeroSeparado[1] || "00");
    return numero
}