console.log("Client side JS file loaded.");

// fetch("http://puzzle.mead.io/puzzle").then((response) => {
//   response.json().then((data) => {
//     console.log(data.puzzle);
//   });
// });

const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");

weatherForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const location = search.value;
  console.log(location);

  messageOne.textContent = "Loading...";
  messageTwo.textContent = "";

  fetch("/weather?address=" + location).then(
    (response) => {
      response.json().then((data) => {
        console.log(data);
        if (data.error) {
          console.log(data.error);
          messageOne.textContent = data.error;
        } else {
          console.log(data.location);
          console.log(data.forecast);
          messageOne.textContent = data.location;
          messageTwo.textContent = data.forecast;
        }
      });
    },
    (error) => {
      console.log("error");
    }
  );
});
//console.log(weatherForm);
