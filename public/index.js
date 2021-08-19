const APP = {
  SW:null,
  cacheName: 'assetCache1',
  init() {

    // APP.registerSW();

    document
      .querySelector('div>h3')
      .addEventListener('click', APP.deleteCache);

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

        span.innerHTML = data.title;
        span.classList.add('tooltip-text');

        col.appendChild(span);
        table.appendChild(row);
        row.appendChild(col);
        
      }


    }
  },
  registerSW() {
    if('serviceWorker' in navigator) {
      navigator.serviceWorker
      .register('/serviceWorker.js', {
        scope: '/',
      })
      .then(registration => {
        APP.SW = registration.installing || 
          registration.waiting || 
          registration.active;
          console.log('service worker registered');
      })
      if(navigator.serviceWorker.controller) {
        console.log('We have a service worker installed');
      }

      navigator.serviceWorker.oncontrollerchange = (ev) => {
        console.log('New service worker activated');
      }

      // navigator.serviceWorker.getRegistrations().then(regs => {
      //   for(let reg of regs) {
      //     reg.unregister().then(isUnreg => console.log(isUnreg));
      //   }
      // })
    } else {
      console.log('Service workers are not supported');
    }
  }
}

document.addEventListener('DOMContentLoaded', APP.init);