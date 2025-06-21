document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("form");
  const thankYouMessage = document.getElementById("thankYouMessage");
  const formTitle = document.querySelector(".form-title");

  // Спрячем “Thank you” при старте (CSS у нас уже скрывает #thankYouMessage)
  thankYouMessage.classList.remove("visible");

  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    // 1) Валидируем
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    // 2) Собираем данные
    const formData = new FormData(form);

    try {
      // 3) Шлём на Make
      const response = await fetch(
        "https://hook.us2.make.com/8me3a5xbrk6b3bay0u39h0ssbllh8ome",
        {
          method: "POST",
          body: formData,
        }
      );

      if (response.ok) {
        // 4) Убираем форму
        form.reset();
        form.style.display = "none";
        if (formTitle) formTitle.style.display = "none";

        // 5) Показываем «Thank you» классом
        thankYouMessage.classList.add("visible");
      } else {
        alert("Error sending message, please try again later.");
      }
    } catch (error) {
      console.error("Network error:", error);
      alert("Failed to send the form. Please check your connection.");
    }
  });
});
