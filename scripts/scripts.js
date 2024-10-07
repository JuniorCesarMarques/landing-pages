import faqData from "./faqData.js";

class FAQSection {
  constructor() {
    this.container = document.querySelector("#faq-container");
    this.renderFaq();
  }

  renderFaq() {
    faqData.forEach((item) => {
      const questionContainer = document.createElement("div");
      const question = document.createElement("div");
      const answer = document.createElement("div");
      const textQuestion = document.createElement("p");
      const iconContainer = document.createElement("span");

      iconContainer.classList.add("material-symbols-outlined");
      questionContainer.classList.add("question-container");
      question.classList.add("question");
      answer.classList.add("answer-container");

      textQuestion.textContent = item.question;
      answer.textContent = item.answer;
      iconContainer.textContent = "keyboard_arrow_down";

      questionContainer.appendChild(question);
      questionContainer.appendChild(answer);
      question.appendChild(textQuestion);
      question.appendChild(iconContainer);
      this.container.appendChild(questionContainer);

      questionContainer.addEventListener("click", () => {
        const isOpen = answer.classList.contains("answer-container");

        if (isOpen) {
          answer.classList.remove("answer-container");
          answer.classList.add("answer-container-open");
        } else {
          answer.classList.remove("answer-container-open");
          answer.classList.add("answer-container");
        }
      });
    });
  }
}

const faqSection = new FAQSection();
