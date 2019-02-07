let tableDay = document.getElementById("table-day");
let tableBody = document.getElementById("table-body");
let tableData;
let tableContents = "";
let dates;
let starts;
let actualStarts;
let finishes;
let actualFinishes;




fetch("http://localhost:4567/rosters/2013-08-15/2013-09-15").then((response) => { response.text().then((object) =>
  { tableData = JSON.parse(object);
    console.log(tableData);
    for (let i = 0; i < tableData.length; i++) {
      tableContents += "<tr><th scope='row'>" + tableData[i].date + "</th>" +
        "<td>" + tableData[i].start + "</td>" +
        "<td>" + "" + "</td>" +
        "<td>" + tableData[i].finish + "</td>" +
        "<td>" + "" + "</td>" +
        "</tr>"
    }
    tableBody.innerHTML = tableContents;

    // dates = tableData.map(i => i.date);
    // starts = tableData.map(i => i.start);
    // console.log(dates);
    // dates.forEach(date => { tableBody.innerHTML +=
    //   "<tr><th scope='row' id='table-day'>" + date + "</th></tr>"
    //   "<td></td>"
    //   ; });
  }) });
