const form = document.getElementById("restoreEmailForm");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const data = new FormData(form);
  const obj = {};

  data.forEach((value, key) => (obj[key] = value));
  //hacer un fetch
  fetch("/api/sessions/reset-password", {
    method: "POST",
    body: JSON.stringify(obj),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((response) => {
    if (response.status === 200) {
      console.log("exito");
    } else {
      console.log("algo salio mal");
    }
  });
});
