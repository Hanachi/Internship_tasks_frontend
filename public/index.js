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
    let span = document.createElement("span");
    
    col.innerHTML = data[key];
    col.classList.add('tooltip');

    table.appendChild(row);
    col.appendChild(span);
    row.appendChild(col);

    span.innerHTML = data.title;
    span.classList.add('tooltip-text');
  }


}
