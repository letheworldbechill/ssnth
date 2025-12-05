document.addEventListener("DOMContentLoaded", () => {
  const stepSections = document.querySelectorAll(".step");
  const navButtons = document.querySelectorAll(".step-nav-button");
  const titleEl = document.getElementById("current-step-title");

  // Info-Buttons: auf/zu klappen
  const infoButtons = document.querySelectorAll(".info-button");
  infoButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      btn.classList.toggle("expanded");
    });
  });

  // Checkboxen beobachten => "Nächster Schritt" ein-/ausblenden
  const allCheckboxes = document.querySelectorAll(
    ".confirm-checkbox input[type='checkbox']"
  );

  allCheckboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", () => {
      const stepSection = checkbox.closest(".step");
      updateNextButtonVisibility(stepSection);
    });
  });

  // Initial prüfen
  stepSections.forEach((section) => updateNextButtonVisibility(section));

  function updateNextButtonVisibility(stepSection) {
    const checkboxes = stepSection.querySelectorAll(
      ".confirm-checkbox input[type='checkbox']"
    );
    const nextButton = stepSection.querySelector(".next-step-btn");

    if (!nextButton) return;

    if (checkboxes.length === 0) {
      nextButton.classList.remove("visible");
      return;
    }

    const allChecked = Array.from(checkboxes).every((cb) => cb.checked);

    if (allChecked) {
      nextButton.classList.add("visible");
    } else {
      nextButton.classList.remove("visible");
    }
  }

  // Tabs oben: Schritt wechseln
  navButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const targetId = btn.getAttribute("data-target");
      activateStep(targetId);
    });
  });

  // Nächster-Schritt-Buttons
  const nextStepButtons = document.querySelectorAll(".next-step-btn");
  nextStepButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const target = btn.getAttribute("data-next-step");
      if (target === "done") {
        alert("Alle Schritte abgeschlossen ✅");
      } else {
        activateStep(target);
      }
    });
  });

  function activateStep(stepId) {
    // Schritt sichtbar schalten
    stepSections.forEach((section) => {
      if (section.id === stepId) {
        section.classList.add("step-active");
      } else {
        section.classList.remove("step-active");
      }
    });

    // Nav-Buttons aktualisieren
    navButtons.forEach((btn) => {
      if (btn.getAttribute("data-target") === stepId) {
        btn.classList.add("active");
      } else {
        btn.classList.remove("active");
      }
    });

    // Titel aktualisieren
    if (titleEl) {
      if (stepId === "step-1") titleEl.textContent = "Schritt eins";
      if (stepId === "step-2") titleEl.textContent = "Schritt zwei";
      if (stepId === "step-3") titleEl.textContent = "Schritt drei";
    }

    // Smooth nach oben
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
});
