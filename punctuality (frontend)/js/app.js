let tableDay = document.getElementById('table-day');
let tableBody = document.getElementById('table-body');
let tableData;
let dates;




fetch("http://localhost:4567/rosters/2013-08-15/2013-09-15").then((response) => { response.text().then((object) =>
  { tableData = JSON.parse(object);
    console.log(tableData);
    dates = tableData.map(i => i.date);
    console.log(dates);
    dates.forEach(date => { tableBody.innerHTML += '<tr><th scope="row" id="table-day">'+date+'</th></tr>'; });
  }) });
