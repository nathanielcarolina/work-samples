let tableBody = document.getElementById("table-body");
let rosterData, shiftData;
let tableContents = "";
let startDiff, startDiffMin, hiddenClassStart, startRemarks, finishDiff, finishDiffMin, hiddenClassFinish, finishRemarks;

function initializeVars(s, r) {
  startDiff = moment.utc(shiftData[s].start).diff(moment.utc(rosterData[r].start));
  startDiffMin = Math.floor(startDiff/1000/60);
  hiddenClassStart = startDiffMin > 0 ? "" : " hidden";
  startRemarks = (startDiff <= 0) ? "on time" : (startDiff > 0 ? "late" : "no time clocked");
  finishDiff = moment.utc(rosterData[r].finish).diff(moment.utc(shiftData[s].finish));
  finishDiffMin = Math.floor(finishDiff/1000/60);
  hiddenClassFinish = finishDiffMin > 0 ? "" : " hidden";
  finishRemarks = (finishDiff <= 0) ? "on time" : (finishDiff > 0 ? "left early" : "no time clocked");
}

function setTableContents(s, r) {
  tableContents += "<tr><th scope='row'>" + moment(shiftData[s].date).format("MMMM Do YYYY") + "</th>" +
    "<td>" + moment.utc(rosterData[r].start).format("h:mma") + "</td>" +
    "<td><span data-toggle='tooltip' data-placement='top' title='" + moment.utc(shiftData[s].start).format("h:mma") + "'>" + startRemarks + " <span class='badge badge-danger" + hiddenClassStart + "'>" + startDiffMin + " minutes</span></span></td>" +
    "<td>" + moment.utc(rosterData[r].finish).format("h:mma") + "</td>" +
    "<td><span data-toggle='tooltip' data-placement='top' title='" + moment.utc(shiftData[s].finish).format("h:mma") + "'>" + finishRemarks + " <span class='badge badge-danger" + hiddenClassFinish + "'>" + finishDiffMin + " minutes</span></span></td>" +
    "</tr>";
}

function setTableContentsShift(s, r) {
  tableContents += "<tr><th scope='row'>" + moment(shiftData[s].date).format("MMMM Do YYYY") + "</th>" +
    "<td>" + "" + "</td>" +
    "<td>" + moment.utc(shiftData[s].start).format("h:mma") + "</td>" +
    "<td>" + "" + "</td>" +
    "<td>" + moment.utc(shiftData[s].finish).format("h:mma") + "</td>" +
    "</tr>";
}

function setTableContentsRoster(s, r) {
  tableContents += "<tr><th scope='row'>" + moment(rosterData[r].date).format("MMMM Do YYYY") + "</th>" +
    "<td>" + moment.utc(rosterData[r].start).format("h:mma") + "</td>" +
    "<td>" + "" + "</td>" +
    "<td>" + moment.utc(rosterData[r].finish).format("h:mma") + "</td>" +
    "<td>" + "" + "</td>" +
    "</tr>";
}



fetch("http://localhost:4567/rosters/2013-08-15/2013-09-15")
  .then((response) => { return response.json(); })
  .then((data) => {
    rosterData = data;

    return fetch("http://localhost:4567/shifts/2013-08-15/2013-09-15") })
  .then((response) => { return response.json(); })
  .then((data) => {
    shiftData = data;
    let s = 0;
    let r = 0;

    if (shiftData.length > rosterData.length) {
      while (s < shiftData.length && r < rosterData.length) {
        if (shiftData[s].date === rosterData[r].date) {
          initializeVars(s, r);
          setTableContents(s, r);
          s += 1;
          r += 1;

        } else {
          setTableContentsShift(s, r);
          s += 1;
        }
      }

    } else if (shiftData.length <= rosterData.length) {
      while (s < shiftData.length && r < rosterData.length) {
        if (shiftData[s].date === rosterData[r].date) {
          initializeVars(s, r);
          setTableContents(s, r);
          s += 1;
          r += 1;

        } else {
          setTableContentsRoster(s, r);
          r += 1;
        }
      }
    }

    tableBody.innerHTML = tableContents;

    // Initialize all tooltips
    $(function () {
      $("[data-toggle='tooltip']").tooltip()
    });
  })
  .catch((error) => { tableBody.innerHTML = "Request failed. Please check your internet connection.<br>" + error; });

//  })
//  .catch((error) => { console.log("Request failed", error) });
//      .catch((error) => { console.log("Request failed", error) });




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
