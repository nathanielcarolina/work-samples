let tableBody = document.getElementById("table-body");
let tableContents = "";
let rosterData, shiftData, startDiff, finishDiff, startDiffMin, finishDiffMin, startRemarks, finishRemarks, hiddenClassStart, hiddenClassFinish, rosterDiff, payableHours;

// Functions
function initializeVars(s, r) {
  startDiff = moment.utc(shiftData[s].start).diff(moment.utc(rosterData[r].start));
  finishDiff = moment.utc(rosterData[r].finish).diff(moment.utc(shiftData[s].finish));

  startDiffMin = (startDiff > 0) ? convMsToMin(startDiff) : 0;
  finishDiffMin = (finishDiff > 0) ? convMsToMin(finishDiff) : 0;

  startRemarks = (startDiff <= 0) ? ON_TIME : (startDiff > 0 ? LATE : NO_TIME_CLOCKED);
  finishRemarks = (finishDiff <= 0) ? ON_TIME : (finishDiff > 0 ? LEFT_EARLY : NO_TIME_CLOCKED);

  hiddenClassStart = hiddenClass(startDiffMin);
  hiddenClassFinish = hiddenClass(finishDiffMin);

  rosterDiff = moment.utc(rosterData[r].finish).diff(moment.utc(rosterData[r].start), "hours", true);
}

function resetRosterDiff() {
  rosterDiff = 0;
}

function computePayableHours() {
  payableHours = (rosterDiff) ? (rosterDiff - convMinToHr(startDiffMin) - convMinToHr(finishDiffMin)) : 0;
  payableHours = payableHours.toFixed(2);
}

function setTableContents(s, r) {
  tableContents += "<tr>" +
    th_row( moment(shiftData[s].date).format("MMMM Do YYYY") ) +
    td( moment.utc(rosterData[r].start).format("h:mma") ) +
    td( toolTip( moment.utc(shiftData[s].start).format("h:mma"), startRemarks + badgeDanger(hiddenClassStart, startDiffMin) )) +
    td( moment.utc(rosterData[r].finish).format("h:mma") ) +
    td( toolTip( moment.utc(shiftData[s].finish).format("h:mma"), finishRemarks + badgeDanger(hiddenClassFinish, finishDiffMin) )) +
    td( payableHours ) +
    "</tr>";
}

function setTableContentsShift(s, r) {
  tableContents += "<tr>" +
    th_row( moment(shiftData[s].date).format("MMMM Do YYYY") ) +
    td( NO_DATA ) +
    td_muted( moment.utc(shiftData[s].start).format("h:mma") ) +
    td( NO_DATA ) +
    td_muted( moment.utc(shiftData[s].finish).format("h:mma") ) +
    td( payableHours ) +
    "</tr>";
}

function setTableContentsRoster(s, r) {
  tableContents += "<tr>" +
    th_row( moment(rosterData[r].date).format("MMMM Do YYYY") ) +
    td_muted( moment.utc(rosterData[r].start).format("h:mma") ) +
    td( NO_DATA ) +
    td_muted( moment.utc(rosterData[r].finish).format("h:mma") ) +
    td( NO_DATA ) +
    td( payableHours ) +
    "</tr>";
}

function convMsToMin(ms) {
  let min = Math.floor(ms/1000/60);
  return min;
}

function convMinToHr(min) {
  let hr = min/60;
  return hr;
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

    while (s < shiftData.length && r < rosterData.length) {
      if (shiftData[s].date === rosterData[r].date) {
        initializeVars(s, r);
        computePayableHours();
        setTableContents(s, r);
        s += 1;
        r += 1;
      } else {
        resetRosterDiff();
        computePayableHours();
        // Handling of shifts/rosters with some times missing
        if (shiftData.length > rosterData.length) {
          // Populate only shift data if there are no roster data
          setTableContentsShift(s, r);
          s += 1;
        } else if (shiftData.length <= rosterData.length) {
          // Populate only roster data if there are no shift data
          setTableContentsRoster(s, r);
          r += 1;
        }
      }
    }
    tableBody.innerHTML = tableContents;
    // Initialize all tooltips
    $(function () { $("[data-toggle='tooltip']").tooltip() }); })
  .catch((error) => { tableBody.innerHTML = "Request failed. Please check your internet connection.<br>" + error; });
