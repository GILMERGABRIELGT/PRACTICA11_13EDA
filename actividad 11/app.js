// Clase Matriz que maneja las operaciones de la matriz 5x10
class Matriz {
    constructor(filas, columnas) {
        this.filas = filas;
        this.columnas = columnas;
        this.matriz = this.generarMatriz();
    }

    // Método para generar la matriz de números aleatorios
    generarMatriz() {
        let matriz = [];
        for (let i = 0; i < this.filas; i++) {
            let fila = [];
            for (let j = 0; j < this.columnas; j++) {
                fila.push(Math.floor(Math.random() * 100)); // Números aleatorios entre 0 y 99
            }
            matriz.push(fila);
        }
        return matriz;
    }

    // Método para mostrar la matriz editable en una tabla HTML
    mostrarMatrizEditable() {
        const matrixContainer = document.getElementById('matrixContainer');
        matrixContainer.innerHTML = '';  // Limpiar el contenido previo
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
        document.getElementById('addRowBtn').style.display = 'inline';  // Mostrar botón "Añadir Fila"
        document.getElementById('addColumnBtn').style.display = 'inline';  // Mostrar botón "Añadir Columna"
        document.getElementById('removeRowBtn').style.display = 'inline';  // Mostrar botón "Eliminar Fila"
        document.getElementById('removeColumnBtn').style.display = 'inline';  // Mostrar botón "Eliminar Columna"
        document.getElementById('calculateBtn').style.display = 'inline';  // Mostrar botón "Recalcular"
    }

    // Método para añadir una nueva fila
    añadirFila() {
        const nuevaFila = Array(this.columnas).fill(0);  // Rellena con ceros por defecto
        this.matriz.push(nuevaFila);
        this.filas++;
        this.mostrarMatrizEditable();  // Actualizar la tabla
    }

    // Método para añadir una nueva columna
    añadirColumna() {
        this.matriz.forEach(fila => fila.push(0));  // Añadir un cero al final de cada fila
        this.columnas++;
        this.mostrarMatrizEditable();  // Actualizar la tabla
    }

    // Método para eliminar la última fila
    eliminarFila() {
        if (this.filas > 1) {  // Para no permitir que se eliminen todas las filas
            this.matriz.pop();  // Elimina la última fila
            this.filas--;
            this.mostrarMatrizEditable();  // Actualizar la tabla
        } else {
            alert('No puedes eliminar todas las filas.');
        }
    }

    // Método para eliminar la última columna
    eliminarColumna() {
        if (this.columnas > 1) {  // Para no permitir que se eliminen todas las columnas
            this.matriz.forEach(fila => fila.pop());  // Elimina la última columna de cada fila
            this.columnas--;
            this.mostrarMatrizEditable();  // Actualizar la tabla
        } else {
            alert('No puedes eliminar todas las columnas.');
        }
    }

    // Método recursivo para calcular suma y promedio de cada fila
    calcularSumaPromedioFila(fila = 0, sumas = [], promedios = []) {
        if (fila === this.matriz.length) return { sumas, promedios };

        const suma = this.matriz[fila].reduce((acc, val) => acc + val, 0);
        const promedio = suma / this.matriz[fila].length;

        sumas.push(suma);
        promedios.push(promedio);

        return this.calcularSumaPromedioFila(fila + 1, sumas, promedios);
    }

    // Método recursivo para calcular suma y promedio de cada columna
    calcularSumaPromedioColumna(columna = 0, sumas = [], promedios = []) {
        if (columna === this.matriz[0].length) return { sumas, promedios };

        let suma = 0;
        this.matriz.forEach(fila => suma += fila[columna]);
        const promedio = suma / this.matriz.length;

        sumas.push(suma);
        promedios.push(promedio);

        return this.calcularSumaPromedioColumna(columna + 1, sumas, promedios);
    }

    // Mostrar los arreglos A, B, C, D en formato de tabla
    mostrarArreglosEnTabla(sumasFilas, promediosFilas, sumasColumnas, promediosColumnas) {
        const arraysContainer = document.getElementById('arraysContainer');
        arraysContainer.innerHTML = ''; // Limpiar

        const table = document.createElement('table');
        table.classList.add('table-arrays');

        const headerRow = document.createElement('tr');
        const headers = ['A', 'B', 'C', 'D'];
        headers.forEach(header => {
            const th = document.createElement('th');
            th.textContent = header;
            headerRow.appendChild(th);
        });
        table.appendChild(headerRow);

        // Filas con datos
        const maxLength = Math.max(sumasFilas.length, sumasColumnas.length);  // El máximo de filas entre A/B y C/D
        for (let i = 0; i < maxLength; i++) {
            const row = document.createElement('tr');

            const sumA = sumasFilas[i] !== undefined ? sumasFilas[i] : '';
            const avgB = promediosFilas[i] !== undefined ? promediosFilas[i].toFixed(2) : '';
            const sumC = sumasColumnas[i] !== undefined ? sumasColumnas[i] : '';
            const avgD = promediosColumnas[i] !== undefined ? promediosColumnas[i].toFixed(2) : '';

            [sumA, avgB, sumC, avgD].forEach(value => {
                const td = document.createElement('td');
                td.textContent = value;
                row.appendChild(td);
            });

            table.appendChild(row);
        }

        arraysContainer.appendChild(table);
    }

    // Método para recalcular sumas y promedios después de la edición
    recalcularSumasYPromedios() {
        const { sumas: sumasFilas, promedios: promediosFilas } = this.calcularSumaPromedioFila();
        const { sumas: sumasColumnas, promedios: promediosColumnas } = this.calcularSumaPromedioColumna();

        // Mostrar los resultados en la tabla
        this.mostrarArreglosEnTabla(sumasFilas, promediosFilas, sumasColumnas, promediosColumnas);
    }
}

// Evento al hacer clic en "Generar Matriz"
document.getElementById('generateMatrixBtn').addEventListener('click', () => {
    const filas = 5;
    const columnas = 10;
    const matriz = new Matriz(filas, columnas);

    // Mostrar la matriz editable
    matriz.mostrarMatrizEditable();

    // Evento para añadir fila
    document.getElementById('addRowBtn').addEventListener('click', () => {
        matriz.añadirFila();
    });

    // Evento para añadir columna
    document.getElementById('addColumnBtn').addEventListener('click', () => {
        matriz.añadirColumna();
    });

    // Evento para eliminar fila
    document.getElementById('removeRowBtn').addEventListener('click', () => {
        matriz.eliminarFila();
    });

    // Evento para eliminar columna
    document.getElementById('removeColumnBtn').addEventListener('click', () => {
        matriz.eliminarColumna();
    });

    // Evento para recalcular sumas y promedios
    document.getElementById('calculateBtn').addEventListener('click', () => {
        matriz.recalcularSumasYPromedios();
    });
});
