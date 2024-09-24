// Clase Calificaciones
class Calificaciones {
    constructor() {
        this.matriz = [
            [5.5, 8.6, 10.0],
            [8.0, 5.5, 10.0],
            [9.0, 4.1, 7.8],
            [10.0, 2.2, 8.1],
            [7.0, 9.2, 7.1],
            [9.0, 4.0, 6.0],
            [6.5, 5.0, 5.0],
            [4.0, 7.0, 4.0],
            [8.0, 8.0, 9.0],
            [10.0, 9.0, 9.2],
            [5.0, 10.0, 8.4],
            [9.0, 4.6, 7.5]
        ];
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
                    this.matriz[filaIndex][colIndex] = parseFloat(e.target.value);  // Actualiza el valor en la matriz
                });
                cell.appendChild(input);
                row.appendChild(cell);
            });
            table.appendChild(row);
        });

        matrixContainer.appendChild(table);
        document.getElementById('calculateBtn').style.display = 'inline';  // Mostrar botón "Calcular Resultados"
    }

    // Recursividad para calcular el promedio de cada alumno
    calcularPromedioAlumno(fila, col = 0, suma = 0) {
        if (col >= this.matriz[fila].length) return suma / this.matriz[fila].length;
        suma += this.matriz[fila][col];
        return this.calcularPromedioAlumno(fila, col + 1, suma);
    }

    // Recursividad para calcular el promedio más alto
    encontrarPromedioMasAlto(fila = 0, maxProm = -Infinity) {
        if (fila >= this.matriz.length) return maxProm;
        const promedio = this.calcularPromedioAlumno(fila);
        if (promedio > maxProm) maxProm = promedio;
        return this.encontrarPromedioMasAlto(fila + 1, maxProm);
    }

    // Recursividad para calcular el promedio más bajo
    encontrarPromedioMasBajo(fila = 0, minProm = Infinity) {
        if (fila >= this.matriz.length) return minProm;
        const promedio = this.calcularPromedioAlumno(fila);
        if (promedio < minProm) minProm = promedio;
        return this.encontrarPromedioMasBajo(fila + 1, minProm);
    }

    // Recursividad para contar cuántos parciales fueron reprobados (menores a 7.0)
    contarReprobados(fila = 0, col = 0, reprobados = 0) {
        if (fila >= this.matriz.length) return reprobados;
        if (col >= this.matriz[fila].length) return this.contarReprobados(fila + 1, 0, reprobados);
        if (this.matriz[fila][col] < 7.0) reprobados++;
        return this.contarReprobados(fila, col + 1, reprobados);
    }

    // Recursividad para calcular la distribución de calificaciones
    calcularDistribucion(fila = 0, distribucion = [0, 0, 0, 0, 0]) {
        if (fila >= this.matriz.length) return distribucion;
        const promedio = this.calcularPromedioAlumno(fila);
        if (promedio >= 9.0) distribucion[4]++;
        else if (promedio >= 8.0) distribucion[3]++;
        else if (promedio >= 7.0) distribucion[2]++;
        else if (promedio >= 6.0) distribucion[1]++;
        else distribucion[0]++;
        return this.calcularDistribucion(fila + 1, distribucion);
    }

    calcularResultados() {
        const resultsContainer = document.getElementById('resultsContainer');
        resultsContainer.innerHTML = '';  // Limpiar resultados previos

        const promedioMasAlto = this.encontrarPromedioMasAlto();
        const promedioMasBajo = this.encontrarPromedioMasBajo();
        const reprobados = this.contarReprobados();
        const distribucion = this.calcularDistribucion();

        let resultadosPromedios = `<p>Promedio más alto: ${promedioMasAlto.toFixed(2)}</p>`;
        resultadosPromedios += `<p>Promedio más bajo: ${promedioMasBajo.toFixed(2)}</p>`;
        resultadosPromedios += `<p>Total de parciales reprobados: ${reprobados}</p>`;

        let resultadosDistribucion = '<p>Distribución de calificaciones finales:</p><ul>';
        resultadosDistribucion += `<li>0.0 - 5.9: ${distribucion[0]} alumnos</li>`;
        resultadosDistribucion += `<li>6.0 - 6.9: ${distribucion[1]} alumnos</li>`;
        resultadosDistribucion += `<li>7.0 - 7.9: ${distribucion[2]} alumnos</li>`;
        resultadosDistribucion += `<li>8.0 - 8.9: ${distribucion[3]} alumnos</li>`;
        resultadosDistribucion += `<li>9.0 - 10.0: ${distribucion[4]} alumnos</li>`;
        resultadosDistribucion += '</ul>';

        // Mostrar promedios por alumno
        let resultadosPorAlumno = '<p>Promedios por alumno:</p><ul>';
        this.matriz.forEach((fila, index) => {
            const promedio = this.calcularPromedioAlumno(index).toFixed(2);
            resultadosPorAlumno += `<li>Alumno ${index + 1}: ${promedio}</li>`;
        });
        resultadosPorAlumno += '</ul>';

        resultsContainer.innerHTML = resultadosPromedios + resultadosDistribucion + resultadosPorAlumno;
    }
}

// Evento al hacer clic en "Generar Matriz"
document.getElementById('generateMatrixBtn').addEventListener('click', () => {
    const calificaciones = new Calificaciones();
    calificaciones.mostrarMatriz();

    // Evento para calcular los resultados
    document.getElementById('calculateBtn').addEventListener('click', () => {
        calificaciones.calcularResultados();
    });
});
