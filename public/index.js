document.getElementById("showData").onclick = TableFromJson;

function TableFromJson() {
  fetch('http://localhost:5000/movies')
  .then((resp) => resp.json())
  .then((data) => {

  let col = [];
  for(let i = 0; i < data.length; i++) {
    for(let key in data[i]) {
      if(col.indexOf(key) === -1) {
        col.push(key);
      }
    }
  }
  const table = document.createElement('table');
  let tr = table.insertRow(-1);

  for(let i = 0; i < col.length; i++) {
    let th = document.createElement('th');
    th.innerHTML = col[i];
    tr.appendChild(th);
  }

  for(let i=0; i<data.length;i++) {
    tr = table.insertRow(-1);

    for(let j = 0; j < col.length; j++) {
      let tableCell = tr.insertCell(-1);
      tableCell.innerHTML = data[i][col[j]];
    }
  }

  const divShowData = document.getElementById('addTable');
  divShowData.innerHTML = '';
  divShowData.appendChild(table);
})}