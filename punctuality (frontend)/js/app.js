let tableBody = document.getElementById("table-body");
let rosterData, shiftData;
let tableContents = "";
let startDiff, startDiffMin, hiddenClassStart, startRemarks, finishDiff, finishDiffMin, hiddenClassFinish, finishRemarks, rosterDiff, payableHours;

// HTML Templates
const ONTIME = "<span class='text-success'>on time</span>";
const LATE = "<span class='text-danger'>late</span>";
const LEFTEARLY = "<span class='text-danger'>left early</span>";
const NOTIMECLOCKED = "<span class='badge badge-warning'>no time clocked</span>";


// Functions
function initializeVars(s, r) {
  startDiff = moment.utc(shiftData[s].start).diff(moment.utc(rosterData[r].start));
  finishDiff = moment.utc(rosterData[r].finish).diff(moment.utc(shiftData[s].finish));

  startDiffMin = (startDiff > 0) ? convMsToMin(startDiff) : 0;
  finishDiffMin = (finishDiff > 0) ? convMsToMin(finishDiff) : 0;

  startRemarks = (startDiff <= 0) ? ONTIME : (startDiff > 0 ? LATE : NOTIMECLOCKED);
  finishRemarks = (finishDiff <= 0) ? ONTIME : (finishDiff > 0 ? LEFTEARLY : NOTIMECLOCKED);

  hiddenClassStart = hiddenClass(startDiffMin);
  hiddenClassFinish = hiddenClass(finishDiffMin);

  rosterDiff = moment.utc(rosterData[r].finish).diff(moment.utc(rosterData[r].start), "hours", true);
}

function resetRosterDiff() {
  rosterDiff = 0;
}

function computePayableHours() {
  payableHours = (rosterDiff) ? (rosterDiff - (startDiffMin/60) - (finishDiffMin/60)) : 0;
  payableHours = payableHours.toFixed(2);
}

function setTableContents(s, r) {
  tableContents += "<tr><th scope='row'>" + moment(shiftData[s].date).format("MMMM Do YYYY") + "</th>" +
    "<td>" + moment.utc(rosterData[r].start).format("h:mma") + "</td>" +
    "<td><span data-toggle='tooltip' data-placement='top' title='" + moment.utc(shiftData[s].start).format("h:mma") + "'>" + startRemarks + " <span class='badge badge-danger" + hiddenClassStart + "'>" + startDiffMin + " minutes</span></span></td>" +
    "<td>" + moment.utc(rosterData[r].finish).format("h:mma") + "</td>" +
    "<td><span data-toggle='tooltip' data-placement='top' title='" + moment.utc(shiftData[s].finish).format("h:mma") + "'>" + finishRemarks + " <span class='badge badge-danger" + hiddenClassFinish + "'>" + finishDiffMin + " minutes</span></span></td>" +
    "<td>" + payableHours + "</td>" +
    "</tr>";
}

function setTableContentsShift(s, r) {
  tableContents += "<tr><th scope='row'>" + moment(shiftData[s].date).format("MMMM Do YYYY") + "</th>" +
    "<td><span class='badge badge-warning'>no data</span></td>" +
    "<td><span class='text-muted'>" + moment.utc(shiftData[s].start).format("h:mma") + "</span></td>" +
    "<td><span class='badge badge-warning'>no data</span></td>" +
    "<td><span class='text-muted'>" + moment.utc(shiftData[s].finish).format("h:mma") + "</span></td>" +
    "<td>" + payableHours + "</td>" +
    "</tr>";
}

function setTableContentsRoster(s, r) {
  tableContents += "<tr><th scope='row'>" + moment(rosterData[r].date).format("MMMM Do YYYY") + "</th>" +
    "<td><span class='text-muted'>" + moment.utc(rosterData[r].start).format("h:mma") + "</span></td>" +
    "<td><span class='badge badge-warning'>no data</span></td>" +
    "<td><span class='text-muted'>" + moment.utc(rosterData[r].finish).format("h:mma") + "</span></td>" +
    "<td><span class='badge badge-warning'>no data</span></td>" +
    "<td>" + payableHours + "</td>" +
    "</tr>";
}

function convMsToMin(ms) {
  let min = Math.floor(ms/1000/60);
  return min;
}

function hiddenClass(a) {
  return a > 0 ? "" : " hidden";
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
          resetRosterDiff();
          initializeVars(s, r);
          computePayableHours();
          setTableContents(s, r);
          s += 1;
          r += 1;

        } else {
          // Populate only shift data if there are no roster data
          resetRosterDiff();
          computePayableHours();
          setTableContentsShift(s, r);
          s += 1;
        }
      }

    } else if (shiftData.length <= rosterData.length) {
      while (s < shiftData.length && r < rosterData.length) {
        if (shiftData[s].date === rosterData[r].date) {
          resetRosterDiff();
          initializeVars(s, r);
          computePayableHours();
          setTableContents(s, r);
          s += 1;
          r += 1;

        } else {
          // Populate only roster data if there are no shift data
          resetRosterDiff();
          computePayableHours();
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
