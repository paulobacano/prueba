// Requerimiento 2: Guardar los datos del API en un array
const dataArray = [];

// Requerimiento 3: Mostrar los datos del array en una tabla de HTML
function renderTable() {
  const tableBody = document.getElementById('data-table-body');
  tableBody.innerHTML = '';

  dataArray.forEach((country, index) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${country.nombre}</td>
      <td>${country.capital}</td>
      <td>${country.poblacion}</td>
      <td>${country.region}</td>
      <td>
        <button class="btn btn-danger btn-sm" onclick="eliminarElemento(${index})">Eliminar</button>
      </td>
    `;
    tableBody.appendChild(row);
  });
}

// Requerimiento 5: La tabla html debe tener la opción de eliminar un elemento de array
function eliminarElemento(index) {
  dataArray.splice(index, 1);
  renderTable();
}

// Requerimiento 7: Crear un formulario que permita ingresar datos al array
const dataForm = document.getElementById('data-form');
dataForm.addEventListener('submit', function(event) {
  event.preventDefault();

  // Requerimiento 9: Validar campos utilizando JavaScript
  const nombreInput = document.getElementById('nombre');
  const capitalInput = document.getElementById('capital');
  const poblacionInput = document.getElementById('poblacion');
  const regionInput = document.getElementById('region');

  if (nombreInput.value && capitalInput.value && poblacionInput.value && regionInput.value) {
    const newData = {
      nombre: nombreInput.value,
      capital: capitalInput.value,
      poblacion: poblacionInput.value,
      region: regionInput.value,
    };

    dataArray.push(newData);
    renderTable();

    // Limpiar campos del formulario
    nombreInput.value = '';
    capitalInput.value = '';
    poblacionInput.value = '';
    regionInput.value = '';
  } else {
    alert('Por favor, complete todos los campos');
  }
});

// Requerimiento 1: Consumir un API
fetch('https://restcountries.com/v3.1/lang/spanish')
  .then(response => response.json())
  .then(data => {
    // Obtener los atributos necesarios del API y guardarlos en el array
    data.forEach(country => {
      const newData = {
        nombre: country.name.common,
        capital: country.capital?.[0] || '',
        poblacion: country.population || '',
        region: country.region || '',
      };

      dataArray.push(newData);
    });

    // Requerimiento 4: Diseñar tabla utilizando estilos de Bootstrap
    renderTable();
  });