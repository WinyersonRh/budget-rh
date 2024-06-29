// VARIABLES
// FORMULARIO DE PRESUPUESTO INICIAL
const BUDGET = {
  $container: document.querySelector(".budget"),
  $amount: document.getElementById("budget-amount"),
  $btn: document.getElementById("budget-btn"),
};

// FORMULARIO DE INSERTAR ELEMENTOS
const ELEMENTS = {
  $container: document.querySelector(".elements"),
  $close: document.querySelector(".close"),
  $insertElement: document.getElementById("element"),
  $insertPrice: document.getElementById("price"),
  $insertBtn: document.getElementById("element-btn"),
};

// LISTA DE ELEMENTOS
const LIST = {
  $container: document.querySelector(".list-elements"),
  $budgetControl: document.getElementById("budget"),
  $remainingControl: document.getElementById("remaining"),
  $totalControl: document.getElementById("total"),
  $download: document.getElementById("download"),
  $save: document.getElementById("save"),
  $delete: document.getElementById("delete"),
  $add: document.getElementById("add"),
  $listElements: document.getElementById("elements"),
};

// LISTAS GUARDADAS
const SAVELIST = {
  $container: document.querySelector(".savelist"),
  $name: document.getElementById("name"),
  $download: document.getElementById("download"),
  $delete: document.getElementById("delete"),
  $info: document.getElementById("info"),
};

// PROPIEDADES
const PROPERTYS = {
  loader: document.getElementById("loader"),
};
// -------------------------------------------------------------------------->
// FUNCIONES Y CLASES
export default class Budget {
  constructor(BUDGET, ELEMENTS, LIST, SAVELIST, PROPERTYS) {
    this.budget = BUDGET;
    this.elements = ELEMENTS;
    this.list = LIST;
    this.savelist = SAVELIST;
    this.property = PROPERTYS;

    // NO RECARGAR PÁGINA
    history.pushState(null, "", "?#");
  }

  // VALIDAR INPUTS PARA RECIBIR SOLO NUMEROS
  validateAmount(input, btn) {
    const validChar = /[a-zäöüÄÖÜ´"``'#$%&+/*|{}()=_¿?!¡/]|-+$/gi;
    const validNum = /^[1-9]+/gi;

    if (validChar.test(input.value) || !validNum.test(input.value)) {
      btn.disabled = true;
      input.classList.add("error");
      document.getElementById("invalid").classList.remove("none");
      document.getElementById("valid").classList.add("none");
    } else {
      btn.disabled = false;
      input.maxLength = 13;
      input.value = this.convert(input.value);
      input.classList.remove("error");
      document.getElementById("invalid").classList.add("none");
      document.getElementById("valid").classList.remove("none");
    }
  }

  // ENVIAR PRESUPUESTO, RESTANTE Y TOTAL
  sendBudget() {
    this.list.$budgetControl.textContent = this.budget.$amount.value;
    this.list.$remainingControl.textContent = this.budget.$amount.value;
    this.list.$totalControl.textContent = 0;

    this.budget.$amount.value = "";
    this.budget.$container.classList.remove("show");
    this.property.loader.classList.remove("none");

    setTimeout(() => {
      this.list.$container.classList.remove("none");
      this.list.$add.disabled = false;
      this.budget.$container.style.display = "none";
      this.property.loader.classList.add("none");
    }, 800);
  }

  // SEPARAR CANTIDADES POR MILES CON UN PUNTO
  convert(elem) {
    const validate = {
      exp1: /\./g,
      exp2: /(?=-|\d*\.?)(\d{3})/g,
      exp3: /^[\.]/,
    };

    elem = elem.replace(validate.exp1, "");
    elem = elem.split("").reverse().join("").replace(validate.exp2, "$1.");
    elem = elem.split("").reverse().join("").replace(validate.exp3, "");

    return elem;
  }

  // CALCULO DE RESTANTE Y TOTAL
  control() {
    let elementPrice = Number(
      Math.round(this.elements.$insertPrice.value.replace(/\./g, ""))
    ).valueOf();
    let remaining = Number(
      Math.round(this.list.$remainingControl.textContent.replace(/\./g, ""))
    ).valueOf();
    let total = Number(
      Math.round(this.list.$totalControl.textContent.replace(/\./g, ""))
    ).valueOf();

    let remainingCalculated = remaining - elementPrice;
    let totalCalculated = total + elementPrice;

    let remainingResult = this.convert(remainingCalculated.toString());
    let totalResult = this.convert(totalCalculated.toString());

    this.list.$remainingControl.textContent = remainingResult.replace(
      "-.", //REEMPLAZAR ESTO
      "-" // POR ESTO
    );
    this.list.$totalControl.textContent = totalResult;

    if (remainingCalculated < 0) {
      this.list.$remainingControl.classList.add("insuficent");
    } else {
      this.list.$remainingControl.classList.remove("insuficent");
    }

    this.insertElements();
  }

  // AGREGAR ELEMENTOS A LA LISTA
  insertElements() {
    document.querySelector(".empty").classList.add("none");
    this.list.$delete.disabled = false;

    const map = new Map();

    for (const elem of this.list.$container.children) {
      map.set(elem.firstChild.textContent, elem.lastChild.textContent);
    }

    for (const [key, value] of map) {
      const result = [key, value];
    }

    const name = document.createElement("button");
    const price = document.createElement("i");

    name.textContent = this.elements.$insertElement.value;
    price.textContent = this.elements.$insertPrice.value;

    if (!name.textContent) name.textContent = "Undefined";

    name.appendChild(price);

    this.list.$container.querySelector("#elements").appendChild(name);

    this.elements.$insertElement.value = "";
    this.elements.$insertPrice.value = "";
    this.elements.$insertBtn.disabled = true;
    this.elements.$insertElement.focus();
  }

  // BOTONES DE LA LISTA
  deleteList() {
    this.list.$delete.disabled = true;

    while (this.list.$listElements.querySelector("button")) {
      this.list.$listElements.removeChild(
        this.list.$listElements.querySelector("button")
      );
    }

    this.list.$remainingControl.textContent =
      this.list.$budgetControl.textContent;
    this.list.$totalControl.textContent = 0;

    this.list.$remainingControl.classList.remove("insuficent");
    document.querySelector(".empty").classList.remove("none");
  }
}

// AGREGAR Y QUITAR BOX SHADOW AL FORMULARIO
const formShadow = (action) => {
  if (action === "add") {
    document.querySelector(".budget-form").classList.add("box-shadow");
  } else {
    document.querySelector(".budget-form").classList.remove("box-shadow");
    document.querySelector(".amount").classList.remove("error");
    document.querySelector("#invalid").classList.add("none");
    document.querySelector("#valid").classList.add("none");
  }
};
// -------------------------------------------------------------------------->
// EVENTOS
// EVENTOS DE PRESUPUESTO INICIAL
BUDGET.$amount.onkeyup = () =>
  new Budget(BUDGET, ELEMENTS, LIST, SAVELIST, PROPERTYS).validateAmount(
    BUDGET.$amount,
    BUDGET.$btn
  );

BUDGET.$btn.onclick = () =>
  new Budget(BUDGET, ELEMENTS, LIST, SAVELIST, PROPERTYS).sendBudget();

BUDGET.$amount.onfocus = () => formShadow("add");
BUDGET.$amount.onblur = () => formShadow();
BUDGET.$btn.onfocus = () => formShadow("add");
BUDGET.$btn.onblur = () => formShadow();

// EVENTOS DE INSERTAR ELEMENTOS
ELEMENTS.$insertElement.onkeyup = () =>
  new Budget(BUDGET, ELEMENTS, LIST, SAVELIST, PROPERTYS);

ELEMENTS.$insertPrice.onkeyup = () =>
  new Budget(BUDGET, ELEMENTS, LIST, SAVELIST, PROPERTYS).validateAmount(
    ELEMENTS.$insertPrice,
    ELEMENTS.$insertBtn
  );

ELEMENTS.$insertBtn.onclick = () =>
  new Budget(BUDGET, ELEMENTS, LIST, SAVELIST, PROPERTYS).control();

ELEMENTS.$close.onclick = () => ELEMENTS.$container.classList.toggle("show");

// EVENTOS DE LISTA DE ELEMENTOS
LIST.$add.onclick = () => {
  if (ELEMENTS.$container.classList.contains("show")) {
    ELEMENTS.$container.classList.remove("show");
  } else {
    ELEMENTS.$container.classList.add("show");
    ELEMENTS.$insertElement.focus();
  }
};

LIST.$delete.onclick = () =>
  new Budget(BUDGET, ELEMENTS, LIST, SAVELIST, PROPERTYS).deleteList();

LIST.$listElements.firstChild.onclick = (e) =>
  new Budget(BUDGET, ELEMENTS, LIST, SAVELIST, PROPERTYS).deleteElement(
    e.target
  );

LIST.$save.onclick = () =>
  new Budget(BUDGET, ELEMENTS, LIST, SAVELIST, PROPERTYS).saveElement();

// LIST.$download.onclick = () =>
//   new Budget(BUDGET, ELEMENTS, LIST, SAVELIST, PROPERTYS).downloadElement();

// EVENTOS DE LISTAS GUARDADAS
// -------------------------------------------------------------------------->
// EVENTOS GLOBALES
document.addEventListener("click", (e) => {
  if (e.target.matches("#elements button")) {
    if (e.target.parentNode.children.length === 2) {
      e.target.parentNode.firstElementChild.className = "empty";

      LIST.$remainingControl.classList.remove("insuficent");
      LIST.$delete.disabled = "true";
    }

    let newRemaining =
      parseFloat(LIST.$remainingControl.textContent.replace(/\./g, "")) +
      parseFloat(e.target.firstElementChild.textContent.replace(/\./g, ""));

    let newTotal =
      parseFloat(LIST.$totalControl.textContent.replace(/\./g, "")) -
      parseFloat(e.target.firstElementChild.textContent.replace(/\./g, ""));

    LIST.$remainingControl.textContent = new Budget(
      BUDGET,
      ELEMENTS,
      LIST,
      SAVELIST,
      PROPERTYS
    ).convert(newRemaining.toString());

    LIST.$totalControl.textContent = new Budget(
      BUDGET,
      ELEMENTS,
      LIST,
      SAVELIST,
      PROPERTYS
    ).convert(newTotal.toString());

    if (
      parseFloat(LIST.$remainingControl.textContent.replace(/\./g, "")) >= 0
    ) {
      LIST.$remainingControl.classList.remove("insuficent");
    }

    e.target.remove();
  }
});

// ATAJOS
document.addEventListener("keyup", (e) => {
  // AGREGAR ELEMENTO CTRL + A
  if (LIST.$add.disabled === false) {
    if (e.ctrlKey && e.which === 65) {
      ELEMENTS.$container.classList.toggle("show");
      ELEMENTS.$insertElement.focus();
    }
  }

  // ELIMINAR LISTA CTRL + SUPR
  if (LIST.$delete.disabled === false) {
    if (e.which === 46) {
      new Budget(BUDGET, ELEMENTS, LIST, SAVELIST, PROPERTYS).deleteList();
    }
  }
});

// -------------------------------------------------------------------------->
