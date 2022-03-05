const nydrt = document.querySelector("main .form .head>button");
const form = document.querySelector("main .form form");
const tbl = document.querySelectorAll("table tbody tr img");
const addMed = document.querySelector("main .form form .add");
const register = document.querySelector("main .form form .reg");

nydrt.addEventListener(
  "click",
  () => {
    form.classList.add("sh");
  },
  false
);

register.addEventListener("click", () => {
  form.classList.remove("sh");
});

addMed.addEventListener("click", () => {
  let med = document.createElement("input");
  let tim = document.createElement("input");
  med.type = "text";
  med.placeholder = "Medicine";
  med.name = "medicine";
  tim.placeholder = "Time";
  tim.type = "text";
  tim.name = "time";
  form.insertBefore(med, addMed);
  form.insertBefore(tim, addMed);
});

[...tbl].forEach((node) => {
  node.addEventListener("click", () => {
    console.log(node.parentElement.parentElement.children[2]);
    fetch("/darta", {
      method: "delete",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        bedNo: `${node.parentElement.parentElement.children[2].textContent}`,
      }),
    })
      .then((res) => {
        if (res.ok) return res.json();
      })
      .then((data) => {
        window.location.reload();
      });
  });
});
