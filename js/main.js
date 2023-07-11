/*selectores en javascript */
/*VALIDACIONESt */
let nombre = document.getElementById('nombre');
let capital = document.getElementById('capital');
let region = document.getElementById('region');

function validarnombre() {
    let regex = /^[A-Za-z]+$/;
    let validnombre = document.getElementById('validnombre');
    if (!regex.test(nombre.value)) {
        //alert("Invalid");
        validnombre.style = "display:block;";
        validnombre.innerText = "ingrese solo letras";
        validnombre.className = "text-danger";

        nombre.className="form-control border-input-error";
        return false;
    }
    nombre.className="form-control border-input-ok";
    validnombre.style = "display:none;";
    return true;
}
nombre.addEventListener('input', validarnombre);


//funcion principal. será la encargada de leer los datos.
function leerInputForm(){
    let valid1= validarnombre();
    console.log(valid1);
}

function validarcapital() {
  let regex = /^[A-Za-z]+$/;
  let validcapital = document.getElementById('validcapital');
  if (!regex.test(capital.value)) {
      //alert("Invalid");
      validcapital.style = "display:block;";
      validcapital.innerText = "ingrese solo letras";
      validcapital.className = "text-danger";

      capital.className="form-control border-input-error";
      return false;
  }
  capital.className="form-control border-input-ok";
  validcapital.style = "display:none;";
  return true;
}
capital.addEventListener('input', validarcapital);


//funcion principal. será la encargada de leer los datos.
function leerInputForm(){
  let valid1= validarcapital();
  console.log(valid1);
}

function validarregion() {
  let regex = /^[A-Za-z]+$/;
  let validregion = document.getElementById('validregion');
  if (!regex.test(region.value)) {
      //alert("Invalid");
      validregion.style = "display:block;";
      validregion.innerText = "ingrese solo letras";
      validregion.className = "text-danger";

      region.className="form-control border-input-error";
      return false;
  }
  region.className="form-control border-input-ok";
  validregion.style = "display:none;";
  return true;
}
region.addEventListener('input', validarregion);


//funcion principal. será la encargada de leer los datos.
function leerInputForm(){
  let valid1= validarregion();
  console.log(valid1);
}

/*VALIDACIONESt */

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
