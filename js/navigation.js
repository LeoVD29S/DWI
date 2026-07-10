(function () {
  const navButtons = document.querySelectorAll(".nav-btn");
  const sections = document.querySelectorAll(".project-section");

  function showSection(sectionId) {
    sections.forEach(function (section) {
      const isActive = section.id === sectionId;
      section.classList.toggle("active", isActive);
      section.hidden = !isActive;
    });

    navButtons.forEach(function (btn) {
      btn.classList.toggle("active", btn.dataset.section === sectionId);
    });
  }

  navButtons.forEach(function (btn) {
    btn.addEventListener("click", function () {
      showSection(btn.dataset.section);
    });
  });
})();
