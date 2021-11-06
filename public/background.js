document.getElementById("buttonSearch").addEventListener("click", function () {
  waitForElementToDisplay("#search-results", operation, 1000);
});

function waitForElementToDisplay(selector, callback, checkFrequencyInMs) {
  (function loopSearch() {
    if (document.querySelector(selector).children.length != 0) {
      callback();
      return;
    } else {
      setTimeout(function () {
        loopSearch();
      }, checkFrequencyInMs);
    }
  })();
}
function operation() {
  console.log("found");
  const x = document.getElementById("search-results");
  if (x != null) {
    const z = x.getElementsByClassName("secondary-head class-title-header");
    console.log(z.length);

    for (let i = 0; i < z.length; i++) {
      let className = z[i].innerHTML;
      console.log(z[i].innerHTML);
      org_html = z[i].innerHTML;
      new_html = `<div id=addReview${i}>` + org_html + "</div>";
      z[i].innerHTML = new_html;
      z[i].children[0].style.display = "flex";
      z[i].children[0].style.justifyContent = "space-between";
      var checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.transform = "scale(1.5)";
      var button = document.createElement("button");
      button.setAttribute("class", "btn btn-primary");
      button.innerHTML = "Add review";
      button.id = `reviewButton${i}`;
      button.addEventListener("click", function (e) {
        addReview(e, className);
      });
      let div = document.createElement("div");
      div.style.display = "flex";
      div.appendChild(checkbox);
      div.appendChild(button);
      let button2 = document.createElement("button");
      button2.setAttribute("class", "btn btn-primary");
      button2.innerHTML = "Checkout reviews";
      button2.id = `CheckreviewButton${i}`;
      button2.addEventListener("click", function (e) {
        getReview(e, className);
      });
      div.appendChild(button2);
      z[i].children[0].appendChild(div);
    }
  }
}

function addReview(e, className) {
  let form = document.createElement("form");
  let dummy = document.createElement("div");
  dummy.style.visibility = "hidden";
  dummy.id = "dummy";
  dummy.innerHTML = className;
  form.id = `form${e.target.id}`;
  let review = document.createElement("input");
  review.style.cssText =
    "display: block;width: 100%;border: 3px solid currentColor;color: currentColor;background: transparent;";
  review.placeholder = "Add review here";
  review.id = `reviewId${e.target.id}`;
  review.type = "text";
  let professorName = document.createElement("input");
  professorName.style.cssText =
    "display: block;width: 100%;border: 3px solid currentColor;color: currentColor;background: transparent;";
  professorName.placeholder = "Name of Professor";
  professorName.id = `professor${e.target.id}`;
  professorName.type = "text";
  let submit = document.createElement("button");
  submit.innerHTML = "Submit";
  submit.id = `submit${e.target.id}`;
  submit.style.backgroundColor = "#4CAF50";
  let cancel = document.createElement("button");
  cancel.innerHTML = "Cancel";
  cancel.id = `cancel${e.target.id}`;
  form.appendChild(professorName);
  let br = document.createElement("br");
  form.appendChild(br);
  form.appendChild(review);
  br = document.createElement("br");
  form.appendChild(br);
  form.appendChild(submit);
  form.appendChild(cancel);
  form.appendChild(dummy);
  e.target.parentElement.parentElement.parentElement.appendChild(form);
  cancel.addEventListener("click", handleCancel);
  submit.addEventListener("click", handleSubmit);

  console.log(`right here${className}`);
  //console.log(e.target.id);
}

function handleCancel(e) {
  e.preventDefault();
  e.target.parentElement.remove();
  //console.log(e.target.parentElement.id);
  console.log("Cancel");
}

function handleSubmit(e) {
  e.preventDefault();
  submit(
    e.target.parentElement.children[0].value,
    e.target.parentElement.children[2].value,
    e.target.parentElement.children[6].innerHTML
  );
  console.log(`before submit ${e.target.parentElement.children[6].innerHTML}`);
  e.target.parentElement.remove();
  console.log(e.target.parentElement.id);
  console.log("Submit");
}

async function submit(professorName, review, className) {
  console.log(`inside submit ${className}`);
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, "0");
  var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  var yyyy = today.getFullYear();
  today = mm + "/" + dd + "/" + yyyy;

  let data = {
    className: className,
    professor: professorName,
    review: review,
    date: today,
    likes: "0",
    dislikes: "0",
  };

  const url = "https://alberthelper.herokuapp.com/review";

  const response = await fetch(url, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });

  console.log(response);
}

function getReview(e, className) {
  console.log("waiting for reviews");
  fetchReview(className, e);
  // e.target.parentElement.parentElement;
}

async function fetchReview(className, e) {
  let div = document.createElement("div");
  div.id = `review ${className}`;
  div.setAttribute("class", "section-content");
  let response = await fetch(
    `https://alberthelper.herokuapp.com/review/${className}`
  )
    .then((response) => response.json())
    .then((data) => {
      data.map((item) => {
        let div2 = document.createElement("div");
        div2.setAttribute("class", "section-content");
        Object.keys(item).map((type) => {
          let div3 = document.createElement("div");
          div3.setAttribute("class", "section-body");
          console.log(`${type}: ${item[type]}`);
          div3.innerHTML = `${type}: ${item[type]}`;
          div2.appendChild(div3);
        });
        div.appendChild(div2);
      });
      e.target.parentElement.parentElement.parentElement.appendChild(div);
    });
}
