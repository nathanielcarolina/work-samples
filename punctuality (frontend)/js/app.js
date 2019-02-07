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
      // let dateString = tableData[i].date.split("-");
      // let year = dateString[0];
      // let month = dateString[1];
      // let day = dateString[2];


      tableContents += "<tr><th scope='row'>" + moment(tableData[i].date).format("MMMM Do YYYY") + "</th>" +
        "<td>" + tableData[i].start.split(" ")[1] + "</td>" +
        "<td>" + "" + "</td>" +
        "<td>" + tableData[i].finish.split(" ")[1] + "</td>" +
        "<td>" + "" + "</td>" +
        "</tr>";
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
