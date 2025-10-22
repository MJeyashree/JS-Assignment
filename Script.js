const form = document.getElementById("alienForm");
function clearErrors() {
  document.querySelectorAll(".error").forEach(e => e.textContent = "");
  document.querySelectorAll("input").forEach(i => i.style.border = "1px solid #00ffee");
}
function showError(id, msg) {
  const input = document.getElementById(id);
  const errorEl = document.getElementById(id + "Error");
  if (errorEl) errorEl.textContent = msg;
  input.style.border = "2px solid red";
  input.style.boxShadow = "0 0 10px red";
}
function validateField(id) {
  const value = document.getElementById(id).value.trim();
  const today = new Date();
  let valid = true;
  if (id === "planet") {
    if (!/[aeiouAEIOU]/.test(value) || !/\d/.test(value)) {
      showError("planet", "Must contain a vowel and a number.");
      valid = false;
    }
  }
  else if (id === "antenna") {
    const antenna = parseInt(value);
    if (isNaN(antenna) || antenna % 2 !== 0) {
      showError("antenna", "Must be an even number.");
      valid = false;
    }
  }
  else if (id === "alienID") {
    if (!/^ZOR-[A-Z]{2}_[0-9]{4}@UFO$/.test(value)) {
      showError("alienID", "Format: ZOR-XY_9999@UFO");
      valid = false;
    }
  }
  else if (id === "phrase") {
    if (!/[\p{P}\p{S}]/u.test(value)) {
      showError("phrase", "Include emoji or punctuation.");
      valid = false;
    }
  }
  else if (id === "landingDate") {
    const landingDate = new Date(value);
    if (isNaN(landingDate.getTime())) {
      showError("landingDate", "Choose a valid date.");
      valid = false;
    } else if (landingDate < today.setHours(0, 0, 0, 0)) {
      showError("landingDate", "Date cannot be in the past.");
      valid = false;
    }
  }
  if (valid) {
    const input = document.getElementById(id);
    input.style.border = "1px solid #00ffee";
    input.style.boxShadow = "0 0 8px #00ffee";
    const errorEl = document.getElementById(id + "Error");
    if (errorEl) errorEl.textContent = "";
  }
  return valid;
}
form.addEventListener("submit", function (event) {
  event.preventDefault();
  clearErrors();

  let valid = true;

  ["planet", "antenna", "alienID", "phrase", "landingDate"].forEach(id => {
    if (!validateField(id)) valid = false;
  });
  const alienPhoto = document.getElementById("alienPhoto").files[0];
  if (!alienPhoto) {
    showError("alienPhoto", "Please upload your alien photo.");
    valid = false;
  } else if (!alienPhoto.type.startsWith("image/")) {
    showError("alienPhoto", "File must be an image.");
    valid = false;
  } else if (alienPhoto.size > 2 * 1024 * 1024) {
    showError("alienPhoto", "Image too large (max 2MB).");
    valid = false;
  }
  const idProof = document.getElementById("idProof").files[0];
  const validTypes = ["application/pdf", "image/png", "image/jpeg"];
  if (!idProof) {
    showError("idProof", "Please upload your ID proof.");
    valid = false;
  } else if (!validTypes.includes(idProof.type)) {
    showError("idProof", "Upload PDF or image only.");
    valid = false;
  } else if (idProof.size > 3 * 1024 * 1024) {
    showError("idProof", "File too large (max 3MB).");
    valid = false;
  }

  if (valid) {
    alert("🚀 Welcome to Earth, Alien! 🎉 Your registration is Successfully completed!");
    form.reset();
    clearErrors();
  }
});
["planet", "antenna", "alienID", "phrase", "landingDate"].forEach(id => {
  const input = document.getElementById(id);
  input.addEventListener("input", () => validateField(id));
  input.addEventListener("blur", () => validateField(id));
});
