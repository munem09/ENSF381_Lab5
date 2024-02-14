// Generates matrices based on user input
function generateMatrices() {
    createMatrix('The 1st Matrix', 'matrix1', document.getElementById('matrix1Rows').value, document.getElementById('matrix1Cols').value);
    createMatrix('The 2nd Matrix','matrix2', document.getElementById('matrix2Rows').value, document.getElementById('matrix2Cols').value);
}

// Creates and displays a matrix in the specified container
const createMatrix = (title, containerId, rows, cols) => {
    let container = document.getElementById(containerId);
    container.innerHTML = ''; // Clear previous content
    let table = document.createElement('table');
    for (let i = 0; i < rows; i++) {
        let tr = document.createElement('tr');
        for (let j = 0; j < cols; j++) {
            let td = document.createElement('td');
            let input = document.createElement('input');
            input.type = 'number';
            input.value = Math.floor(Math.random() * 100); // Random value between 0 and 99
            td.appendChild(input);
            tr.appendChild(td);
        }
        table.appendChild(tr);
    }
    let caption = table.createCaption();
    caption.textContent = title;
    container.appendChild(table);
};

// Retrieves 1D array of matrix data from the DOM
const getMatrixData1D = function (matrixId) {
    let matrixData = [];
    let inputs = document.querySelectorAll(`#${matrixId} input`);
    inputs.forEach(input => {
        matrixData.push(parseInt(input.value, 10));
    });
    return matrixData;
};

// Retrieves 2D array of matrix data from the DOM
const getMatrixData2D = function (matrixId) {
    let matrixData = [];
    let rows = parseInt(document.getElementById(matrixId + 'Rows').value, 10);
    let cols = parseInt(document.getElementById(matrixId + 'Cols').value, 10);
    let inputs = document.querySelectorAll(`#${matrixId} input`);

    for (let i = 0; i < rows; i++) {
        let rowData = [];
        for (let j = 0; j < cols; j++) {
            let index = i * cols + j;
            if (index < inputs.length) {
                rowData.push(parseInt(inputs[index].value, 10));
            } else {
                rowData.push(0); // Default value if input is missing
            }
        }
        matrixData.push(rowData);
    }
    return matrixData;
};

// Displays the result of matrix operations in 2D
const showResult2D = (title, containerId, dataArray) => {
    let container = document.getElementById(containerId);
    container.innerHTML = ''; // Clear previous content
    let table = document.createElement('table');

    dataArray.forEach(row => {
        let tr = document.createElement('tr');
        row.forEach(cell => {
            let td = document.createElement('td');
            let span = document.createElement('span');
            span.innerHTML = cell;
            td.appendChild(span);
            tr.appendChild(td);
        });
        table.appendChild(tr);
    });

    let caption = table.createCaption();
    caption.textContent = title;
    container.appendChild(table);
};

// Adds two matrices
function addMatrices(matrix1, matrix2) {
    if (matrix1.length !== matrix2.length || matrix1[0].length !== matrix2[0].length) {
        console.log("Matrices dimensions do not match for addition.");
        return;
    }

    let result = matrix1.map((row, i) =>
        row.map((val, j) => val + matrix2[i][j])
    );
    return result;
}

// Subtracts the second matrix from the first
const subtractMatrices = function (matrix1, matrix2) {
    if (matrix1.length !== matrix2.length || matrix1[0].length !== matrix2[0].length) {
        console.log("Matrices dimensions do not match for subtraction.");
        return;
    }

    let result = matrix1.map((row, i) =>
        row.map((val, j) => val - matrix2[i][j])
    );
    return result;
};

// Multiplies two matrices
const multiplyMatrices = (matrix1, matrix2) => {
    if (matrix1[0].length !== matrix2.length) {
        console.log("Matrices dimensions do not match for multiplication.");
        return;
    }

    let result = new Array(matrix1.length).fill(0).map(() => new Array(matrix2[0].length).fill(0));

    for (let i = 0; i < matrix1.length; i++) {
        for (let j = 0; j < matrix2[0].length; j++) {
            for (let k = 0; k < matrix1[0].length; k++) {
                result[i][j] += matrix1[i][k] * matrix2[k][j];
            }
        }
    }

    return result;
};

// Performs the selected matrix operation
function performOperation(operation) {
    let matrix1 = getMatrixData2D('matrix1');
    let matrix2 = getMatrixData2D('matrix2');
    let result;

    switch (operation) {
        case 'add':
            result = addMatrices(matrix1, matrix2);
            break;
        case 'subtract':
            result = subtractMatrices(matrix1, matrix2);
            break;
        case 'multiply':
            result = multiplyMatrices(matrix1, matrix2);
            break;
        default:
            console.log("Unsupported operation");
            return;
    }

    if (result) {
        showResult2D('The Result', 'matrix3', result);
    }
}
