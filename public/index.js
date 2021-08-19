document.getElementById("addData").onclick = initializeTable;

function initializeTable() {
  axios.get('http://localhost:5000/movies')
  .then(response => response.data)
  .then((data) => {
    data.map((el) => createTable(el))
})}

function createTable(data) {
  let table = document.getElementById('table')
  let row = document.createElement('tr');

  for(let key in data) {
    let col = document.createElement("td");

    col.innerHTML = data[key];

    table.appendChild(row);
    row.appendChild(col);
  }
}
