let tableBody = document.getElementById("table-body");
let rosterData, shiftData;
let tableContents = "";
let startDiff, startDiffMin, hiddenClassStart, startRemarks, finishDiff, finishDiffMin, hiddenClassFinish, finishRemarks;


// Functions
function initializeVars(s, r) {
  startDiff = moment.utc(shiftData[s].start).diff(moment.utc(rosterData[r].start));
  startDiffMin = Math.floor(startDiff/1000/60);
  hiddenClassStart = startDiffMin > 0 ? "" : " hidden";
  startRemarks = (startDiff <= 0) ? "<span class='text-success'>on time</span>" : (startDiff > 0 ? "<span class='text-danger'>late</span>" : "<span class='badge badge-warning'>no time clocked</span>");
  finishDiff = moment.utc(rosterData[r].finish).diff(moment.utc(shiftData[s].finish));
  finishDiffMin = Math.floor(finishDiff/1000/60);
  hiddenClassFinish = finishDiffMin > 0 ? "" : " hidden";
  finishRemarks = (finishDiff <= 0) ? "<span class='text-success'>on time</span>" : (finishDiff > 0 ? "<span class='text-danger'>left early</span>" : "<span class='badge badge-warning'>no time clocked</span>");
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
    "<td><span class='badge badge-warning'>no data</span></td>" +
    "<td><span class='text-muted'>" + moment.utc(shiftData[s].start).format("h:mma") + "</span></td>" +
    "<td><span class='badge badge-warning'>no data</span></td>" +
    "<td><span class='text-muted'>" + moment.utc(shiftData[s].finish).format("h:mma") + "</span></td>" +
    "</tr>";
}

function setTableContentsRoster(s, r) {
  tableContents += "<tr><th scope='row'>" + moment(rosterData[r].date).format("MMMM Do YYYY") + "</th>" +
    "<td><span class='text-muted'>" + moment.utc(rosterData[r].start).format("h:mma") + "</span></td>" +
    "<td><span class='badge badge-warning'>no data</span></td>" +
    "<td><span class='text-muted'>" + moment.utc(rosterData[r].finish).format("h:mma") + "</span></td>" +
    "<td><span class='badge badge-warning'>no data</span></td>" +
    "</tr>";
}


// Fetch roster data from the server
fetch("http://localhost:4567/rosters/2013-08-15/2013-09-15")
  .then((response) => { return response.json(); })
  .then((data) => {
    rosterData = data;

    // Fetch shift data from the server
    return fetch("http://localhost:4567/shifts/2013-08-15/2013-09-15") })
  .then((response) => { return response.json(); })
  .then((data) => {
    shiftData = data;
    let s = 0;
    let r = 0;

    // Handling of shifts/rosters with some times missing
    if (shiftData.length > rosterData.length) {
      while (s < shiftData.length && r < rosterData.length) {
        if (shiftData[s].date === rosterData[r].date) {
          initializeVars(s, r);
          setTableContents(s, r);
          s += 1;
          r += 1;

        } else {
          // Populate only shift data if there are no roster data
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
          // Populate only roster data if there are no shift data
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
