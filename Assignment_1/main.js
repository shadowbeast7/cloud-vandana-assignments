// waiting for full dom render
const tbody = document.querySelector("tbody");
const addAbove = document.querySelector("#add-above");
const addBelow = document.querySelector("#add-below");
const form1 = document.querySelector("#form1");

const url = "data.json";

// temp array to store data
const globalData = [];

// get data from localStorage
function getLocalStorage(collection) {
  return JSON.parse(localStorage.getItem(collection));
}

// set data to localStorage
function setLocalStorage(collection, data) {
  JSON.stringify(localStorage.setItem(collection, JSON.stringify(data)));
}

// setting hidden input for add check
addAbove.addEventListener("click", () => {
  document.querySelector("#addCheck").value = "above";
});

addBelow.addEventListener("click", () => {
  document.querySelector("#addCheck").value = "below";
});

/**
 * Check for data in localStorage
 * if data then display
 * else fetch + store + display
 */
if (!getLocalStorage("globalData")) {
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      globalData.push(...data);
      setLocalStorage("globalData", globalData);
      displayData(globalData, tbody);
    })
    .catch((err) => console.log(err));
} else {
  globalData.push(...getLocalStorage("globalData"));
  displayData(globalData, tbody);
}

// delete row
function deleteRow(id) {
  if (id > -1) {
    globalData.splice(id, 1);
    setLocalStorage("globalData", globalData);
  }
  displayData(globalData, tbody);
}

// display data into the table
function displayData(data, selector) {
  if (data) {
    let tr = data.map((element, index) => {
      return `
            <tr>
                <th>${index + 1}</th>
                <td>${element.first_name}</td>
                <td>${element.last_name}</td>
                <td>${element.city}</td>
                <td>${element.country}</td>
                <td>
                  <div onclick="deleteRow(${index})" role="button">
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      height="24" 
                      viewBox="0 0 24 24" 
                      width="24">
                        <path d="M0 0h24v24H0z" fill="none"/>
                        <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
                    </svg>
                  </div>
                </td>
            </tr>`;
    });
    selector.innerHTML = tr.join("");
  } else {
    selector.innerHTML = "No Data";
  }
}

// handleForm Submission
form1.addEventListener("submit", (e) => {
  e.preventDefault();
  let obj = {
    first_name: e.target.firstname.value,
    last_name: e.target.lastname.value,
    city: e.target.city.value,
    country: e.target.country.value,
  };

  if (e.target.addCheck.value === "above") {
    globalData.unshift(obj);
  }
  if (e.target.addCheck.value === "below") {
    globalData.push(obj);
  }
  setLocalStorage("globalData", globalData);
  displayData(globalData, tbody);
  form1.reset();
  document.querySelector(".btn-close").click();
});