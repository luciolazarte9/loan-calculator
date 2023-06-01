document.getElementById("loanCalculatorForm").addEventListener("submit", function(event) {
    event.preventDefault();

    // Obtener los valores ingresados por el usuario
    var cantidadPrestamo = parseFloat(document.getElementById("loanAmount").value);
    var costoFinancieroTotal = parseFloat(document.getElementById("costoFinanciero").value);
    var plazoMeses = parseInt(document.getElementById("loanTerm").value);
    var interesMensual = parseFloat(document.getElementById("interestRate").value);

    // Calcular la tasa de interés mensual
    var tasaInteresMensual = (1 + (costoFinancieroTotal / 100)) ** (1/12) - 1;

    // Crear una tabla para mostrar los resultados
    var resultTable = document.getElementById("resultTable");
    resultTable.innerHTML = "";

    // Calcular y mostrar los resultados para cada mes
    var saldoActual = cantidadPrestamo;
    var cuotaInicial = 427000;

    var row = document.createElement("tr");
    row.innerHTML = "<td>1</td>" +
                    "<td>" + cuotaInicial.toFixed(2) + "</td>" +
                    "<td>0.00</td>" +
                    "<td>" + saldoActual.toFixed(2) + "</td>";
    resultTable.appendChild(row);

    for (var mes = 2; mes <= plazoMeses; mes++) {
        // Calcular el interés generado en función del saldo disponible
        var interesGenerado = saldoActual * (interesMensual / 100);

        // Calcular la cantidad a pagar por cada cuota mensual después de restar los intereses generados
        var cuotaPagar = cuotaInicial - interesGenerado;

        // Calcular el saldo disponible para el próximo mes
        saldoActual -= cuotaPagar;

        // Mostrar los resultados en la tabla
        var row = document.createElement("tr");
        row.innerHTML = "<td>" + mes + "</td>" +
                        "<td>" + cuotaPagar.toFixed(2) + "</td>" +
                        "<td>" + interesGenerado.toFixed(2) + "</td>" +
                        "<td>" + saldoActual.toFixed(2) + "</td>";
        resultTable.appendChild(row);
    }

    // Mostrar el resultado y la tabla
    document.getElementById("result").style.display = "block";
});
