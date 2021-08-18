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
  let span = document.createElement("span");

  for(let key in data) {
    let col = document.createElement("td");

    col.innerHTML = data[key];
    row.classList.add('tooltip');

    table.appendChild(row);
    row.appendChild(col);
  }
  span.innerHTML = data.title;
  span.classList.add('tooltip-text');
  row.appendChild(span);
}
