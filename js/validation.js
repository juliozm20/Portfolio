export function validate(input) {
  const inputType = input.dataset.type;
  if (input.validity.valid) {
    input.parentElement.classList.remove("input-container--invalid");
    input.parentElement.querySelector(".input-message-error").innerHTML = "";
  } else {
    input.parentElement.classList.add("input-container--invalid");
  }
  if (inputType === "email") {
    input.parentElement.querySelector(".input-message-error").innerHTML =
      showError(inputType, input);
  }
}

const errorTypes = [
  "valueMissing",
  "typeMismatch",
  "patternMismatch",
  "customError",
];

const mensajesError = {
  name: {
    valueMissing: "The Name field cannot be empty",
  },
  email: {
    valueMissing: "The Email field cannot be empty",
    typeMismatch: "The email format is not valid",
  },
  project: {
    valueMissing: "The Project field cannot be empty",
  },
  message: {
    valueMissing: "The Message field cannot be empty",
  },
};

const email = document.querySelector("#email-err");
let emailArr = email.getAttribute("data-value").split(";");

const language = document.querySelector("#lang").innerText;

const showError = async (inputType, input) => {
  const req = await fetch(`/languages/${language}.json`);
  const content = await req.json();
  const eSect = "email-error";
  for (const errs of emailArr) {
    if (input.validity[errs]) {
      email.innerHTML = content[eSect][errs];
    }
  }
  return email;
};
