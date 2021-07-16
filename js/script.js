console.log("Test");

document.getElementById("name").focus();

//*******************  Job Title *******************
// Reminder:  visibility and display are different and dont behave the same
document.getElementById("other-job-role").style.display = "none";

document.getElementById("title").onchange = function () {
  if (document.getElementById("title").value != "other") {
    document.getElementById("other-job-role").style.display = "none";
  } else {
    document.getElementById("other-job-role").style.display = "block";
  }
};

//*******************  Tshirt *******************
// needs refactoring
document.getElementById("shirt-colors").style.display = "none";

document.getElementById("design").onchange = function () {
  document.getElementById("shirt-colors").style.display = "block";

  if (document.getElementById("design").value == "heart js") {
    var tshirtsPun = document.querySelectorAll("[data-theme='js puns']");
    for (let tPun of tshirtsPun) {
      tPun.style.display = "none";
    }
    var tshirtHeart = document.querySelectorAll("[data-theme='heart js']");
    for (let tHeart of tshirtHeart) {
      tHeart.style.display = "block";
    }
  }

  if (document.getElementById("design").value == "js puns") {
    var tshirtHeart = document.querySelectorAll("[data-theme='heart js']");
    for (let tHeart of tshirtHeart) {
      tHeart.style.display = "none";
    }
    var tshirtsPun = document.querySelectorAll("[data-theme='js puns']");
    for (let tPun of tshirtsPun) {
      tPun.style.display = "block";
    }
  }
};

// *******************  Total*******************
document.getElementById("activities-box").onchange = function () {
  var boxActivity = document.querySelectorAll(".activity-cost");
  for (let activity of boxActivity) {
    if (activity !== null) {
      console.log(activity.textContent);
    }
  }
};

// ********************* "Payment Info" section *******************

selectElement("payment", "credit-card");

function selectElement(id, valueToSelect) {
  let element = document.getElementById(id);
  element.value = valueToSelect;
}

document.getElementById("paypal").style.display = "none";
document.getElementById("bitcoin").style.display = "none";
