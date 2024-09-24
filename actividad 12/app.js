// Clase Ventas
class Ventas {
    constructor() {
        this.matriz = [
            [5, 16, 10, 12, 24, 18, 12],
            [40, 55, 10, 11, 18, 14, 51],
            [15, 41, 78, 14, 51, 15, 12],
            [35, 22, 81, 15, 12, 10, 20],
            [50, 12, 71, 10, 20, 28, 22],
            [70, 40, 60, 28, 22, 36, 25],
            [50, 50, 50, 36, 25, 46, 20],
            [40, 70, 40, 11, 20, 13, 18],
            [20, 40, 30, 12, 18, 13, 16],
            [10, 40, 32, 13, 16, 15, 82],
            [50, 3, 24, 15, 82, 46, 22],
            [40, 46, 15, 46, 22, 24, 22]
        ];
        this.meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
        this.dias = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];
    }

    mostrarMatriz() {
        const matrixContainer = document.getElementById('matrixContainer');
        matrixContainer.innerHTML = '';  // Limpiar contenido previo
        const table = document.createElement('table');

        this.matriz.forEach((fila, filaIndex) => {
            const row = document.createElement('tr');
            fila.forEach((valor, colIndex) => {
                const cell = document.createElement('td');
                const input = document.createElement('input');
                input.type = 'number';
                input.value = valor;
                input.addEventListener('change', (e) => {
                    this.matriz[filaIndex][colIndex] = parseInt(e.target.value);  // Actualiza el valor en la matriz
                });
                cell.appendChild(input);
                row.appendChild(cell);
            });
            table.appendChild(row);
        });

        matrixContainer.appendChild(table);
        document.getElementById('calculateBtn').style.display = 'inline';  // Mostrar botón "Calcular Resultados"
    }

    // Recursividad para encontrar la menor venta
    encontrarMenorVenta(fila = 0, col = 0, menor = { valor: Infinity, mes: '', dia: '' }) {
        if (fila >= this.matriz.length) return menor;
        if (col >= this.matriz[fila].length) return this.encontrarMenorVenta(fila + 1, 0, menor);

        const ventaActual = this.matriz[fila][col];
        if (ventaActual < menor.valor) {
            menor = { valor: ventaActual, mes: this.meses[fila], dia: this.dias[col] };
        }

        return this.encontrarMenorVenta(fila, col + 1, menor);
    }

    // Recursividad para encontrar la mayor venta
    encontrarMayorVenta(fila = 0, col = 0, mayor = { valor: -Infinity, mes: '', dia: '' }) {
        if (fila >= this.matriz.length) return mayor;
        if (col >= this.matriz[fila].length) return this.encontrarMayorVenta(fila + 1, 0, mayor);

        const ventaActual = this.matriz[fila][col];
        if (ventaActual > mayor.valor) {
            mayor = { valor: ventaActual, mes: this.meses[fila], dia: this.dias[col] };
        }

        return this.encontrarMayorVenta(fila, col + 1, mayor);
    }

    // Recursividad para calcular la venta total
    calcularVentaTotal(fila = 0, col = 0, total = 0) {
        if (fila >= this.matriz.length) return total;
        if (col >= this.matriz[fila].length) return this.calcularVentaTotal(fila + 1, 0, total);

        total += this.matriz[fila][col];
        return this.calcularVentaTotal(fila, col + 1, total);
    }

    // Recursividad para sumar ventas por día
    calcularVentasPorDia(col = 0, ventasPorDia = Array(7).fill(0), fila = 0) {
        if (col >= this.matriz[0].length) return ventasPorDia;
        if (fila >= this.matriz.length) return this.calcularVentasPorDia(col + 1, ventasPorDia);

        ventasPorDia[col] += this.matriz[fila][col];
        return this.calcularVentasPorDia(col, ventasPorDia, fila + 1);
    }

    calcularResultados() {
        const resultsContainer = document.getElementById('resultsContainer');
        resultsContainer.innerHTML = '';  // Limpiar resultados previos

        const menorVenta = this.encontrarMenorVenta();
        const mayorVenta = this.encontrarMayorVenta();
        const ventaTotal = this.calcularVentaTotal();
        const ventasPorDia = this.calcularVentasPorDia();

        // Imprimir resultados
        const menorVentaText = `<p>Menor venta: $${menorVenta.valor} en ${menorVenta.mes}, ${menorVenta.dia}</p>`;
        const mayorVentaText = `<p>Mayor venta: $${mayorVenta.valor} en ${mayorVenta.mes}, ${mayorVenta.dia}</p>`;
        const ventaTotalText = `<p>Venta total: $${ventaTotal}</p>`;
        let ventasPorDiaText = `<p>Ventas por día de la semana:</p><ul>`;
        this.dias.forEach((dia, index) => {
            ventasPorDiaText += `<li>${dia}: $${ventasPorDia[index]}</li>`;
        });
        ventasPorDiaText += '</ul>';

        resultsContainer.innerHTML = menorVentaText + mayorVentaText + ventaTotalText + ventasPorDiaText;
    }
}

// Evento al hacer clic en "Generar Matriz"
document.getElementById('generateMatrixBtn').addEventListener('click', () => {
    const ventas = new Ventas();
    ventas.mostrarMatriz();

    // Evento para calcular los resultados
    document.getElementById('calculateBtn').addEventListener('click', () => {
        ventas.calcularResultados();
    });
});
