
// Pop-up
class PopupNotification {
  constructor(names, intervalFirst, intervalNext) {
    this.names = names;
    this.intervalFirst = intervalFirst; // Tempo antes do primeiro popup
    this.intervalNext = intervalNext; // Intervalo entre os próximos popups
    this.popupElement = null;
    this.timer = null;
  }

  // Gera um nome aleatório do array
  getRandomName() {
    const randomIndex = Math.floor(Math.random() * this.names.length);
    return this.names[randomIndex];
  }

  // Cria e exibe o pop-up
  createPopup() {
    // Se já existir um pop-up, remova antes de criar outro
    if (this.popupElement) {
      this.popupElement.remove();
    }

    // Gera o texto da mensagem com um nome aleatório
    const name = this.getRandomName();
    const message = `${name} acabou de comprar!`;

    // Cria o elemento do pop-up
    this.popupElement = document.createElement("div");
    this.popupElement.classList.add("popup-notification");

    // Adiciona o ícone antes do texto
    const iconElement = document.createElement("span");
    iconElement.classList.add("material-symbols-outlined");
    iconElement.textContent = "new_releases";

    // Cria o conteúdo do texto
    const textElement = document.createElement("span");
    textElement.textContent = message;

    // Adiciona o ícone e o texto ao pop-up
    this.popupElement.appendChild(iconElement);
    this.popupElement.appendChild(textElement);

    // Adiciona o pop-up ao corpo da página
    document.body.appendChild(this.popupElement);

    // Remove o pop-up após 3 segundos
    setTimeout(() => {
      this.popupElement.remove();
    }, 3000);
  }

  // Inicia os pop-ups
  start() {
    // Primeiro pop-up após 10 segundos
    setTimeout(() => {
      this.createPopup();

      // Depois do primeiro pop-up, cria intervalos de 20 segundos para os próximos
      this.timer = setInterval(() => {
        this.createPopup();
      }, this.intervalNext);
    }, this.intervalFirst);
  }

  // Para os pop-ups
  stop() {
    clearInterval(this.timer);
  }
}

// Array de nomes
const names = [
  "Ana",
  "Sonia",
  "Maria",
  "Priscila",
  "Carla",
  "Fernanda",
  "Verônica",
  "Bruna",
];

// Exemplo de uso:
const popup = new PopupNotification(names, 10000, 20000); // Primeiro após 10 seg, próximos a cada 20 seg
popup.start();

// Countdown
class CountdownTimer {
  constructor(containerId, durationInSeconds) {
    this.container = document.getElementById(containerId);
    this.duration = durationInSeconds; // Duração em segundos
    this.intervalId = null;

    this.createElements();
    this.updateCurrentDate();
    this.startCountdown();
  }

  // Cria os elementos HTML para a contagem e a data
  createElements() {
    this.countdownElement = document.createElement("div");
    this.countdownElement.className = "countdown";

    this.timeElement = document.createElement("span");
    this.timeElement.className = "time";
    this.countdownElement.appendChild(this.timeElement);

    this.dateElement = document.createElement("span");
    this.dateElement.className = "date";
    this.countdownElement.appendChild(this.dateElement);

    this.container.appendChild(this.countdownElement);
  }

  // Formata o tempo em mm:ss
  formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(
      remainingSeconds
    ).padStart(2, "0")}`;
  }

  // Atualiza a data atual
  updateCurrentDate() {
    const currentDate = new Date();
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    this.dateElement.textContent = currentDate.toLocaleDateString(
      "pt-BR",
      options
    );
  }

  // Inicia a contagem regressiva
  startCountdown() {
    this.timeElement.textContent = this.formatTime(this.duration);
    this.intervalId = setInterval(() => {
      if (this.duration <= 0) {
        clearInterval(this.intervalId);
        this.timeElement.textContent = "00:00";
      } else {
        this.timeElement.textContent = this.formatTime(this.duration);
        this.duration -= 1;
      }
    }, 1000);
  }
}

// Inicializa a contagem regressiva com 14 minutos e 47 segundos
const countdown = new CountdownTimer("countdown-container", 14 * 60 + 47);

// UTM

document.addEventListener("DOMContentLoaded", function () {
  const prefix = ["https://pay.kiwify.com.br"];

  function getParams() {
    let t = "";
    const e = window.location.href;
    const r = new URL(e);
    if (r) {
      const a = r.searchParams.get("utm_source");
      const n = r.searchParams.get("utm_medium");
      const o = r.searchParams.get("utm_campaign");
      const m = r.searchParams.get("utm_term");
      const c = r.searchParams.get("utm_content");
      if (e.indexOf("?") !== -1) {
        t = `&sck=${a}|${n}|${o}|${m}|${c}`;
      }
      console.log(t);
    }
    return t;
  }

  function updateLinks() {
    const params = new URLSearchParams(window.location.search);
    if (params.toString()) {
      document.querySelectorAll("a").forEach((e) => {
        for (let r = 0; r < prefix.length; r++) {
          if (e.href.indexOf(prefix[r]) !== -1) {
            e.href = e.href.indexOf("?") === -1
              ? `${e.href}?${params.toString()}${getParams()}`
              : `${e.href}&${params.toString()}${getParams()}`;
          }
        }
      });
    }
  }

  updateLinks();

  console.log('%cScript de rastreamento de vendas desenvolvido pela Comunidade NOD - Dericson Calari e Samuel Choairy', 'font-size:20px;color:yellow;');
});