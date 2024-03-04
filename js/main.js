// Array de camisetas
const camisetas = [
    { pais: "Argentina", equipo: "Boca Juniors", ano: 2000, precio: 70000 },
    { pais: "Argentina", equipo: "River Plate", ano: 2011, precio: 50000 },
    { pais: "Argentina", equipo: "Independiente", ano: 1976, precio: 65000 },
    { pais: "Brasil", equipo: "Santos", ano: 2013, precio: 90000 },
    { pais: "Brasil", equipo: "Flamengo", ano: 2019, precio: 45000 },
    { pais: "Uruguay", equipo: "Peñarol", ano: 1997, precio: 30000 },
    { pais: "Chile", equipo: "Colo Colo", ano: 2001, precio: 20000 },
    { pais: "Inglaterra", equipo: "Manchester United", ano: 2005, precio: 40000 },
    { pais: "Inglaterra", equipo: "Chelsea", ano: 2014, precio: 60000 },
    { pais: "España", equipo: "Real Madrid", ano: 2024, precio: 75000 }
];

// Array vacio del carrito de  compras
const carrito = [];



// Funcion para solo ver todas las camisetas 
function verTodasCamisetas() {
    let todasCamisetas = camisetas.map((camiseta) => `${camiseta.pais}, ${camiseta.equipo}, ${camiseta.ano}, $${camiseta.precio}`);
    alert("Todas las camisetas disponibles:\n\n" + todasCamisetas.join("\n"));
}



// Funcion para filtrrar por país la busqueda  (TIENE METODO DE FILTRAR BUSQUEDA)
function filtrarPorPais(pais) {
    let paisMinuscula = pais.toLowerCase();
    let camisetasFiltradas = camisetas.filter((camiseta) => camiseta.pais.toLowerCase().startsWith(paisMinuscula)); //investigue y puse startswith en vez de includes poruqe con includes si ponia "a" me filtraba todos los paises que contengan una "a", en cabio con startswith me filtra el comienzo del pais.
    
    if (camisetasFiltradas.length > 0) {
        let camisetasConFiltro = camisetasFiltradas.map((camiseta) => `${camiseta.pais}, ${camiseta.equipo}, ${camiseta.ano}, $${camiseta.precio}`).join("\n");
        alert("Camisetas disponibles de " + "`" + pais + "´ :\n" + camisetasConFiltro);
    } else {
        alert("No se venden camisetas de " + "`"+ pais + "´");
    }
}



// Funcion para añadir las camisetas al carrito   (NO TIENE METODO DE FILTAR BUSQUEDA)
function anadirCamiseta(equipo) {
    let camisetaEncontrada = camisetas.find((camiseta) => camiseta.equipo.toLowerCase() === equipo.toLowerCase());
    
    if (camisetaEncontrada) {
        let camisetaConfirmar = prompt("Camiseta encontrada:\n" + `${camisetaEncontrada.pais}, ${camisetaEncontrada.equipo}, ${camisetaEncontrada.ano}, $${camisetaEncontrada.precio}` + "\n1. Añadir al carrito\n2. Volver");
       
        if (camisetaConfirmar === "1") {
            carrito.push(camisetaEncontrada);
            alert("Producto añadido al carrito.");
        } else if (camisetaConfirmar === "2") {
            return;
        } else {
            alert("Opción inválida. Por favor, selecciona 1 o 2.");
            anadirCamiseta(equipo);
        }

    } else {
        alert("Equipo no encontrado. Vea los equipos disponibles y escriba el nombre del equipo completo");
    }
}



// Funcioon para eliminar camisetas del carrito
function eliminarCamiseta() {
    let camisetaEnumeracion = carrito.map((camiseta, item) => (item + 1) + ". " + `${camiseta.pais}, ${camiseta.equipo}, ${camiseta.ano}, $${camiseta.precio}`).join("\n");
    // puse el `${}, ${}` porque el concatenado quedo obsoleto camiseta.pais + camiseta.equipo + etc.
    let camisetaOrden = prompt("Escriba la posición de la camiseta a eliminar o ponga X para volver:\n" + camisetaEnumeracion);   
    let camisetaBorrar = parseInt(camisetaOrden) - 1;

    if (!isNaN(camisetaBorrar) && camisetaBorrar >= 0 && camisetaBorrar < carrito.length) {
        carrito.splice(camisetaBorrar, 1);
        alert("Camiseta eliminada.");
    } else if (camisetaOrden.toLowerCase() === "x") {
        return;
    } else {
        alert("Opción inválida. Debe seleccionar la posición de la camiseta a eliminar");
    }
}



// Funcion para mostrar el carrito y  calcular el total
function mostrarCarrito() {
    let total = 0;
    let contenidoCarrito = "";

    carrito.forEach((camiseta, item) => {
        contenidoCarrito += (item + 1) + ". " + `${camiseta.pais}, ${camiseta.equipo}, ${camiseta.ano}, $${camiseta.precio}` + "\n"; // puse el `${}, ${}` porque el concatenado quedo obsoleto camiseta.pais + camiseta.equipo + etc.
        total += camiseta.precio;
    });

    let carritoTotal = prompt("Carrito de compras:\n" + contenidoCarrito + "\nTotal: $" + total + "\n1. Comprar\n2. Volver");

    if (carritoTotal === "1") {
        alert("Pedido hecho. Hasta la proxima.");
        return true;
    } else if (carritoTotal === "2") {
        return false;
    } else {
        alert("Opción incorrecta. Selecciona 1 o 2.");
        return mostrarCarrito();
    }
}



// FUNCION VISIIBLE PARA EL COMPRADOR
function main() {
    while (true) {
        let opcion = prompt("Seleccione una opción:\n1. Ver todas las camisetas\n2. Ver con filtrado por país\n3. Añadir camiseta\n4. Eliminar camiseta\n5. Carrito\n6. Salir");

        switch (opcion) {
            case "1":
                verTodasCamisetas();
                break;
            case "2":
                let pais = prompt("Escriba un país disponible");
                filtrarPorPais(pais);
                break;
            case "3":
                let equipo = prompt("Escriba el nombre completo del equipo");
                anadirCamiseta(equipo);
                break;
            case "4":
                eliminarCamiseta();
                break;
            case "5":
                if (mostrarCarrito()) {
                    return;
                }
                break;
            case "6":
                return;
            default:
                alert("Opción incorrecta. Por favor, seleccione una opción válida.");
        }
    }
}

// Iniciar script.
main();