// HTML Templates
const ON_TIME = "<span class='text-success'>on time</span>";
const LATE = "<span class='text-danger'>late</span>";
const LEFT_EARLY = "<span class='text-danger'>left early</span>";
const NO_TIME_CLOCKED = "<span class='badge badge-warning'>no time clocked</span>";
const NO_DATA = "<span class='badge badge-warning'>no data</span>";

function th_row(child) {
  return "<th scope='row'>" + child + "</th>";
}

function td(child) {
  return "<td>" + child + "</td>";
}

function td_muted(child) {
  return td( "<span class='text-muted'>" + child + "</span>" );
}

function toolTip(title, child) {
  return "<span data-toggle='tooltip' data-placement='top' title='" + title + "'>" + child + "</span>"
}

function badgeDanger(addClass, child) {
  return " <span class='badge badge-danger" + addClass + "'>" + child + " minutes</span>";
}

function hiddenClass(a) {
  return a > 0 ? "" : " hidden";
}
