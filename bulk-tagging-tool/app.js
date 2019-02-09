$(function () {
  $('[data-toggle="tooltip"]').tooltip()
})

let selectAll = document.getElementById("select-all");
let checkBoxes = document.getElementsByClassName("checkbox");
console.log(selectAll);
console.log(checkBoxes);

selectAll.onclick = function() {
  Array.prototype.map.call(checkBoxes, function(checkBox) {
    if (selectAll.checked) {
      checkBox.checked = true;
    } else {
      checkBox.checked = false;
    }
  });
}
