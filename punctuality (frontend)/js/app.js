let tableDay = document.getElementById("table-day");
let tableBody = document.getElementById("table-body");
let tableData, rosterData, shiftData;
let shiftDataContents = "";
let tableContents = "";
let dates;
let starts;
let actualStarts;
let finishes;
let actualFinishes;





fetch("http://localhost:4567/rosters/2013-08-15/2013-09-15")
  .then((response) => { return response.json(); })
  .then((data) => {
    rosterData = data;
    return fetch("http://localhost:4567/shifts/2013-08-15/2013-09-15") })
      .then((response) => { return response.json(); })
      .then((data) => {
        shiftData = data;
        if (shiftData.length > rosterData.length) {
          let s = 0;
          let r = 0;
          while (s < shiftData.length && r < rosterData.length) {
            if (shiftData[s].date === rosterData[r].date) {
              tableContents += "<tr><th scope='row'>" + shiftData[s].date + "</th>" +
                "<td>" + moment.utc(rosterData[r].start).format("h:mma") + "</td>" +
                "<td>" + moment.utc(shiftData[s].start).format("h:mma") + "</td>" +
                "<td>" + moment.utc(rosterData[r].finish).format("h:mma") + "</td>" +
                "<td>" + moment.utc(shiftData[s].finish).format("h:mma") + "</td>" +
                "</tr>";
              s += 1;
              r += 1;
            } else {
              tableContents += "<tr><th scope='row'>" + shiftData[s].date + "</th>" +
                "<td>" + "" + "</td>" +
                "<td>" + moment.utc(shiftData[s].start).format("h:mma") + "</td>" +
                "<td>" + "" + "</td>" +
                "<td>" + moment.utc(shiftData[s].finish).format("h:mma") + "</td>" +
                "</tr>";
              s += 1;
            }
          }
          tableBody.innerHTML = tableContents;
        }
       })
      .catch((error) => { console.log("Request failed", error) });




//  (tableData) =>
  // {
  //
  //
  //
  //   //tableData = JSON.parse(object);
  //   console.log(tableData);
  //   for (let i = 0; i < tableData.length; i++) {
  //     // let dateString = tableData[i].date.split("-");
  //     // let year = dateString[0];
  //     // let month = dateString[1];
  //     // let day = dateString[2];
  //
  //
  //     tableContents += "<tr><th scope='row'>" + moment(tableData[i].date).format("MMMM Do YYYY") + "</th>" +
  //       "<td>" + moment.utc(tableData[i].start).format("h:mma") + "</td>" +
  //       "<td>" + "" + "</td>" +
  //       "<td>" + moment.utc(tableData[i].finish).format("h:mma") + "</td>" +
  //       "<td>" + "" + "</td>" +
  //       "</tr>";
  //   }
  //   tableBody.innerHTML = tableContents;
  //
  //   // dates = tableData.map(i => i.date);
  //   // starts = tableData.map(i => i.start);
  //   // console.log(dates);
  //   // dates.forEach(date => { tableBody.innerHTML +=
  //   //   "<tr><th scope='row' id='table-day'>" + date + "</th></tr>"
  //   //   "<td></td>"
  //   //   ; });
  // }) }).then(() => {
  //   fetch("http://localhost:4567/shifts/2013-08-15/2013-09-15").then((response) => { response.json().then((shiftData) =>
  //     { //shiftData = JSON.parse(object);
  //       console.log(shiftData);
  //       for (let j = 0; j < shiftData.length; j++) {
  //         // let dateString = tableData[i].date.split("-");
  //         // let year = dateString[0];
  //         // let month = dateString[1];
  //         // let day = dateString[2];
  //         let shiftDate = shiftData[j].date;
  //         if (shiftDate === )
  //         console.log(shiftDate);
  //
  //         // shiftContents += "<tr><th scope='row'>" + moment(tableData[i].date).format("MMMM Do YYYY") + "</th>" +
  //         //   "<td>" + moment.utc(tableData[i].start).format("h:mma") + "</td>" +
  //         //   "<td>" + "" + "</td>" +
  //         //   "<td>" + moment.utc(tableData[i].finish).format("h:mma") + "</td>" +
  //         //   "<td>" + "" + "</td>" +
  //         //   "</tr>";
  //       }
  //     }); });

//    });
