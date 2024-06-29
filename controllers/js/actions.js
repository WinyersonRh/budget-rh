// VARIABLES
const d = document;

// MENU
const $btnMenu = d.getElementById("btn-menu");
const $menu = d.getElementById("menu");
const $beginning = d.getElementById("beginning");
const actionsContainer = d.getElementById("select-action");
const budget = d.querySelector(".budget");
const budgetAmount = d.getElementById("budget-amount");
const listElem = d.querySelector(".list-elements");

// ACCIONES
const buttons = {
  budget: d.getElementById("make-budget"),
  purchases: d.getElementById("make-purchases"),
  control: d.getElementById("purchase-control"),
  customers: d.getElementById("customers"),
  back: d.getElementById("back"),
};

// VARIABLES DE COMPRAS
const purchasesVar = {
  container: d.querySelector(".purchases"),
  ci: d.getElementById("ci-c"),
  clean: d.getElementById("clean-ci"),
  dataContainer: d.querySelector(".purchases-data"),
  name: d.getElementById("name-c"),
  lastname: d.getElementById("lastname-c"),
  age: d.getElementById("age-c"),
  phone: d.getElementById("phone-c"),
  email: d.getElementById("email-c"),
  gender: d.getElementById("gender-c"),
  materials: d.getElementById("materials-c"),
  quantity: d.getElementById("qmaterials-c"),
  itemPrice: d.getElementById("item-price"),
  price: d.getElementById("price-c"),
  btn: d.getElementById("purchases-btn"),
  namelist: d.getElementById("namelist-c"),
  namelistBtn: d.getElementById("namelist-btn"),
  back: d.getElementById("back-namelist"),
  paySuccess: d.getElementById("pay-success"),
  seeMaterials: d.getElementById("see-material"),
};

// VARIABLES DE RESULTADO DE COMPRAS
const rsVar = {
  container: d.getElementById("rs"),
  ci: d.getElementById("rs-ci"),
  name: d.getElementById("rs-name"),
  age: d.getElementById("rs-age"),
  phone: d.getElementById("rs-phone"),
  email: d.getElementById("rs-email"),
  materials: d.getElementById("rs-materials"),
  amount: d.getElementById("rs-amount-total"),
};

// VARIABLES DE CONTROL
const controlVar = {
  container: d.querySelector(".control-purchases"),
  ci: d.getElementById("ci-control"),
  btn: d.getElementById("control-btn"),
  clientList: d.getElementById("client-list"),
};

// VARIABLES DE CLIENTES
const customersVar = {
  container: d.querySelector(".customers"),
  form: d.getElementById("customers-form"),
  ci: d.getElementById("ci-customer"),
  btn: d.getElementById("customer-btn"),
  status: d.getElementById("status"),
  list: d.getElementById("search-list"),
  notFound: d.getElementById("not-found"),
  backSearch: d.getElementById("back-search"),
};

// SIMULACION DE BASE DE DATOS
const customers = {
  ci: {
    c1: "11111111",
    c2: "22222222",
    c3: "33333333",
    c4: "44444444",
    c5: "55555555",
    c6: "66666666",
    c7: "77777777",
    c8: "88888888",
    c9: "99999999",
  },
  name: {
    c1: "Annie",
    c2: "Vince",
    c3: "Arianna",
    c4: "Jefferson",
    c5: "Hernesto",
    c6: "Agustin",
    c7: "Yonny",
    c8: "Angel",
    c9: "Emily",
  },
  lastname: {
    c1: "Rivera",
    c2: "Carrasco",
    c3: "Chacon",
    c4: "Gutierrez",
    c5: "Dominguez",
    c6: "Silva",
    c7: "Salas",
    c8: "Pereira",
    c9: "Mendez",
  },
  age: {
    c1: "21",
    c2: "20",
    c3: "41",
    c4: "24",
    c5: "18",
    c6: "33",
    c7: "52",
    c8: "20",
    c9: "28",
  },
  phone: {
    c1: "0123456789",
    c2: "0123456789",
    c3: "0123456789",
    c4: "0123456789",
    c5: "0123456789",
    c6: "0123456789",
    c7: "0123456789",
    c8: "0123456789",
    c9: "0123456789",
  },
  email: {
    c1: "customer1@gmail.com",
    c2: "customer2@gmail.com",
    c3: "customer3@gmail.com",
    c4: "customer4@outlook.es",
    c5: "customer5@gmail.com",
    c6: "customer6@gmail.com",
    c7: "customer7@gmail.com",
    c8: "customer8@gmail.com",
    c9: "customer9@gmail.com",
  },
  gender: {
    c1: "f",
    c2: "m",
    c3: "f",
    c4: "m",
    c5: "m",
    c6: "m",
    c7: "m",
    c8: "m",
    c9: "f",
  },
  namelist: {
    c1: "Techo",
    c2: "Closet",
    c3: "Encimeras",
    c4: "Escritorio",
    c5: "Techos de sin",
    c6: "Escritorio",
    c7: "Construccion",
    c8: "Encimeras",
    c9: "Barra",
  },
  date: {
    c1: "04-09-21",
    c2: "15-09-21",
    c3: "20-09-21",
    c4: "23-09-21",
    c5: "23-09-21",
    c6: "04-09-21",
    c7: "04-09-21",
    c8: "04-09-21",
    c9: "04-09-21",
  },
  price: {
    c1: "35000",
    c2: "32000",
    c3: "13500",
    c4: "8500",
    c5: "1200",
    c6: "12000",
    c7: "75000",
    c8: "10000",
    c9: "9000",
  },
  result: {
    c1: "Exitoso",
    c2: "Exitoso",
    c3: "Exitoso",
    c4: "Pendiente",
    c5: "Pendiente",
    c6: "Pendiente",
    c7: "Cancelado",
    c8: "Cancelado",
    c9: "Cancelado",
  },
};

// FUNCIONES
export default class Actions {
  constructor(variables) {
    this.variables = variables;

    // NO RECARGAR PÁGINA
    if (!window.location.href.includes("?#")) {
      history.pushState(null, "", "?#");
    }
  }

  validateCI() {
    const expReg = /^[0-9]+$/;

    if (
      expReg.test(this.variables.ci.value) &&
      this.variables.ci.value.length >= 7 &&
      this.variables.ci.value.length < 9
    ) {
      this.variables.ci.classList.remove("error");
      this.variables.btn.disabled = false;
    } else {
      if (this.variables.ci.value.length === 0) {
        this.variables.ci.classList.remove("error");
        this.variables.btn.disabled = true;
      } else {
        this.variables.ci.classList.add("error");
        this.variables.btn.disabled = true;
      }
    }
  }

  validateName(input) {
    const expReg = /^[a-z]+$/i;

    if (expReg.test(input.value)) {
      input.dataset.valid = "true";
      input.classList.remove("error");
    } else {
      input.dataset.valid = "false";
      if (input.value.length === 0) {
        input.classList.remove("error");
      } else {
        input.classList.add("error");
      }
    }
  }

  validateAge(input) {
    const expReg = /^[0-9]+$/i;
    const expReg2 = /[a-z]+/gi;

    const value = parseInt(input.value);

    if (typeof value === "number" && expReg.test(input.value) && value <= 100 && value > 0) {
      input.dataset.valid = "true";
      input.classList.remove("error");
    } else {
      input.dataset.valid = "false";
      if (input.value.length === 0) {
        input.classList.remove("error");
      } else {
        input.classList.add("error");
      }
    }
  }

  validatePhone(input) {
    const expReg = /^[0-9]+$/i;

    const value = parseInt(input.value);

    if (typeof value === "number" && expReg.test(input.value) && input.value.length <= 11 && input.value.length > 9) {
      input.dataset.valid = "true";
      input.classList.remove("error");
    } else {
      input.dataset.valid = "false";
      if (input.value.length === 0) {
        input.classList.remove("error");
      } else {
        input.classList.add("error");
      }
    }
  }

  validateEmail(input) {
    const expReg = /[\w._%+-]+@[\w.-]+\.[a-zA-Z]{2,4}/;

    if (typeof input.value === "string" && expReg.test(input.value) && input.value.length > 10) {
      input.dataset.valid = "true";
      input.classList.remove("error");
    } else {
      input.dataset.valid = "false";
      if (input.value.length === 0) {
        input.classList.remove("error");
      } else {
        input.classList.add("error");
      }
    }
  }

  validateGender(input) {
    if (input.value === "m" || input.value === "f" || input.value === "o") {
      input.dataset.valid = "true";
    } else {
      input.dataset.valid = "false";
    }
  }

  validateQuantity(input) {
    if (input.value.length > 4) {
      input.value = input.value.slice(0, 4);
    }
    if (input.value > 1000) {
      input.value = 1000;
    }

    if (typeof parseInt(input.value) === "number" && input.value > 0) {
      input.dataset.valid = "true";
      input.classList.remove("error");
    } else {
      input.dataset.valid = "false";
      input.classList.add("error");
    }
  }

  // MOSTRAR ACCION
  showAction(action, show, input, back) {
    buttons.budget.disabled = true;
    buttons.purchases.disabled = true;
    buttons.control.disabled = true;
    buttons.customers.disabled = true;

    back.classList.add("show");

    action.classList.add("hide");
    setTimeout(() => {
      if (show.classList.contains("customers")) {
        show.style.display = "grid";
      } else {
        show.style.display = "block";
      }
    }, 300);

    setTimeout(() => {
      show.classList.add("show");
      action.style.display = "none";
      back.classList.add("show");
    }, 400);
    setTimeout(() => input.focus(), 800);
    setTimeout(() => (back.disabled = false), 1000);
  }

  // OCULTAR ACCION
  hideAction() {
    back.disabled = true;
    back.classList.remove("show");

    actionsContainer.style.cssText = "";

    setTimeout(() => {
      budget.style.opacity = "0";
      listElem.style.opacity = "0";
      Object.values(purchasesVar).forEach((elem) => {
        elem.disabled = true;
        elem.value = "";
        elem.style.cssText = "";
      });

      budgetAmount.value = "";

      purchasesVar.ci.disabled = false;
      purchasesVar.btn.disabled = true;
      purchasesVar.btn.value = "Aceptar";
      purchasesVar.container.style.opacity = "0";
      purchasesVar.dataContainer.classList.remove("show");
      purchasesVar.container.querySelector("hr").classList.remove("show");

      controlVar.ci.value = "";
      controlVar.btn.disabled = true;
      controlVar.container.style.opacity = "0";

      customersVar.container.style.opacity = "0";
      customersVar.container.querySelector(".customers-hr").classList.remove("show");
      customersVar.form.classList.remove("none");
      customersVar.ci.value = "";
      customersVar.status.classList.remove("show");
      customersVar.list.classList.remove("show");
      customersVar.notFound.classList.remove("show");
      if (customersVar.list.querySelector(".purchase") !== null) {
        customersVar.list.querySelector(".purchase").remove();
      }
    }, 300);

    setTimeout(() => actionsContainer.classList.remove("hide"), 400);

    setTimeout(() => {
      budget.style.cssText = "";
      budget.classList.remove("show");

      listElem.style.cssText = "";
      listElem.classList.add("none");

      purchasesVar.container.style.cssText = "";
      purchasesVar.container.classList.remove("show");

      controlVar.container.style.cssText = "";
      controlVar.container.classList.remove("show");

      customersVar.container.style.cssText = "";
      customersVar.container.classList.remove("show");
      customersVar.list.classList.remove("show");
      customersVar.status.classList.remove("show");
    }, 500);

    setTimeout(() => {
      buttons.budget.disabled = false;
      buttons.purchases.disabled = false;
      buttons.control.disabled = false;
      buttons.customers.disabled = false;
    }, 1000);
  }

  purchaseFields() {
    if (
      this.variables.name.dataset.valid === "true" &&
      this.variables.lastname.dataset.valid === "true" &&
      this.variables.age.dataset.valid === "true" &&
      this.variables.phone.dataset.valid === "true" &&
      this.variables.email.dataset.valid === "true" &&
      this.variables.gender.dataset.valid === "true" &&
      this.variables.materials.dataset.valid === "true" &&
      this.variables.quantity.dataset.valid === "true"
    ) {
      // MOSTRAR BOTON DE RESULTADOS
      this.variables.seeMaterials.disabled = false;
      this.variables.seeMaterials.classList.add("show");

      // RESULTADOS
      rsVar.ci.textContent = `CI: ${this.variables.ci.value}`;
      rsVar.name.textContent = `Nombre: ${this.variables.name.value} ${this.variables.lastname.value}`;
      rsVar.age.textContent = `Edad: ${this.variables.age.value}`;
      rsVar.phone.textContent = `Télefono: ${this.variables.phone.value}`;
      rsVar.email.textContent = `Correo: ${this.variables.email.value}`;

      let materialName;
      let materialPrice;
      const materialQuantity = parseInt(this.variables.quantity.value);

      Object.values(this.variables.materials.children).forEach((elem) => {
        if (elem.value == this.variables.materials.value) {
          materialName = elem.textContent;
          materialPrice = parseInt(elem.dataset.price);
        }
      });

      const material = d.createElement("b");
      material.className = "material";
      material.innerHTML = `${materialQuantity}- ${materialName}(S)
        <i class="price" data-price="${materialPrice * materialQuantity}">$${(
        materialPrice * materialQuantity
      ).toLocaleString()},00</i>`;

      rsVar.materials.appendChild(material);

      let amounts = {};
      let amountTotal = 0;

      Object.values(rsVar.materials.children).forEach((elem, i) => {
        amounts[`${i}`] = parseInt(elem.children[0].dataset.price);
      });
      Object.values(amounts).forEach((elem, i) => {
        amountTotal += elem;
      });

      rsVar.amount.innerHTML = `$${amountTotal.toLocaleString()},00`;

      this.variables.materials.dataset.valid = "false";
      this.variables.materials.value = "";

      this.variables.quantity.value = "";
      this.variables.quantity.focus();

      this.variables.itemPrice.textContent = "$0,00 - Unidad";
      this.variables.price.textContent = "$0,00 - Total";

      setTimeout(() => window.scrollTo(0, scrollY), 0);
    } else {
      // AUTOCOMPLETAR DATOS
      Object.values(customers.ci).forEach((elem, i) => {
        if (elem === this.variables.ci.value) {
          this.variables.ci.value = Object.values(customers.ci)[i];

          this.variables.name.dataset.valid = "true";
          this.variables.name.value = Object.values(customers.name)[i];

          this.variables.lastname.dataset.valid = "true";
          this.variables.lastname.value = Object.values(customers.lastname)[i];

          this.variables.age.dataset.valid = "true";
          this.variables.age.value = Object.values(customers.age)[i];

          this.variables.phone.dataset.valid = "true";
          this.variables.phone.value = Object.values(customers.phone)[i];

          this.variables.email.dataset.valid = "true";
          this.variables.email.value = Object.values(customers.email)[i];

          this.variables.gender.dataset.valid = "true";
          this.variables.gender.value = Object.values(customers.gender)[i];
        }
        if (this.variables.ci.value && this.variables.name.value) {
          setTimeout(() => {
            this.variables.quantity.focus();
            window.scrollTo(0, 500);
          }, 200);
        } else {
          setTimeout(() => {
            this.variables.name.focus();
          }, 100);
        }
      });

      // DESPLEGAR CAMPOS
      this.variables.clean.classList.add("active");
      this.variables.dataContainer.classList.add("show");

      Object.values(this.variables).forEach((elem) => (elem.disabled = false));

      this.variables.ci.disabled = true;
      this.variables.ci.style.border = "2px solid var(--second-color)";
      this.variables.ci.style.background = "var(--third-alpha-color)";
      this.variables.container.querySelector("hr").classList.add("show");
    }
  }

  itemPriceTotal() {
    if (this.variables.materials.value) {
      let materialPrice;
      const materialQuantity = parseInt(this.variables.quantity.value);

      Object.values(this.variables.materials.children).forEach((elem) => {
        if (elem.value == this.variables.materials.value) {
          materialPrice = parseInt(elem.dataset.price);
        }
      });

      this.variables.itemPrice.textContent = `$${materialPrice},00 - Unidad`;
      this.variables.price.textContent = `$${(materialPrice * materialQuantity).toLocaleString()},00 - Total`;
    }
  }

  cleanPurchaseFields() {
    Object.values(this.variables.dataContainer.children).forEach((elem) => {
      if (elem.dataset.valid === "true") elem.dataset.valid = "false";
      if (elem.id === "qmaterials-c") elem.dataset.valid = "true";
    });

    this.variables.seeMaterials.disabled = true;
    this.variables.seeMaterials.classList.remove("show");

    this.variables.clean.classList.remove("active");
    this.variables.dataContainer.classList.remove("show");

    Object.values(this.variables).forEach((elem) => {
      elem.classList.remove("error");
      elem.disabled = true;
      elem.value = "";
      if (elem.id === "qmaterials-c") elem.value = "1";
    });

    this.variables.ci.disabled = false;
    this.variables.btn.disabled = true;
    this.variables.btn.value = "Aceptar";
    this.variables.container.querySelector("hr").classList.remove("show");
    this.variables.ci.style.cssText = "";
    this.variables.ci.focus();
  }

  showPurchaseResult(namelist, seeMaterials) {
    if (namelist.classList.contains("show")) {
      namelist.classList.remove("show");
      seeMaterials.classList.add("show");
    } else {
      namelist.classList.add("show");
      seeMaterials.classList.remove("show");
    }
  }
}

// EVENTOS
$btnMenu.onclick = () => $menu.classList.toggle("show");

d.onclick = (e) => {
  if (e.target.matches(".menu a")) $menu.classList.remove("show");
};

// IR AL INICIO
$beginning.onclick = () => {
  if (buttons.back.disabled === false) {
    d.getElementById("add").disabled = true;
    new Actions(purchasesVar).cleanPurchaseFields();
    new Actions().hideAction();
  }
};
buttons.back.onclick = () => {
  if (buttons.back.disabled === false) {
    d.getElementById("add").disabled = true;
    new Actions(purchasesVar).cleanPurchaseFields();
    new Actions().hideAction();
  }
};

// PRESUPUESTAR BUTTON
buttons.budget.onclick = () => {
  buttons.back.disabled = false;
  const actionsContainer = d.querySelector(".select-action");
  const budget = d.querySelector(".budget");
  const input = d.querySelector("#budget-amount");
  new Actions(buttons).showAction(actionsContainer, budget, input, buttons.back);
};

// COMPRAS BUTTON
buttons.purchases.onclick = () => {
  buttons.back.disabled = false;
  const actionsContainer = d.querySelector(".select-action");
  const purchases = d.querySelector(".purchases");
  const input = d.querySelector("#ci-c");
  new Actions(buttons).showAction(actionsContainer, purchases, input, buttons.back);
};

// CONTROL BUTTON
buttons.control.onclick = () => {
  buttons.back.disabled = false;
  const actionsContainer = d.querySelector(".select-action");
  const control = d.querySelector(".control-purchases");
  const input = d.querySelector("#ci-control");
  new Actions(buttons).showAction(actionsContainer, control, input, buttons.back);
};

// CLIENTES BUTTON
buttons.customers.onclick = () => {
  buttons.back.disabled = false;
  const actionsContainer = d.querySelector(".select-action");
  const customers = d.querySelector(".customers");
  const input = d.querySelector("#ci-customer");
  new Actions(buttons).showAction(actionsContainer, customers, input, buttons.back);
};

// VALIDAR FORMULARIO DE COMPRAS
purchasesVar.ci.addEventListener("keyup", (e) => {
  new Actions(purchasesVar).validateCI();
});
purchasesVar.name.addEventListener("keyup", (e) => {
  new Actions(purchasesVar).validateName(purchasesVar.name);
});
purchasesVar.lastname.addEventListener("keyup", (e) => {
  new Actions(purchasesVar).validateName(purchasesVar.lastname);
});
purchasesVar.age.addEventListener("keyup", (e) => {
  new Actions(purchasesVar).validateAge(purchasesVar.age);
});
purchasesVar.phone.addEventListener("keyup", (e) => {
  new Actions(purchasesVar).validatePhone(purchasesVar.phone);
});
purchasesVar.email.addEventListener("keyup", (e) => {
  new Actions(purchasesVar).validateEmail(purchasesVar.email);
});
purchasesVar.gender.addEventListener("blur", (e) => {
  new Actions(purchasesVar).validateGender(purchasesVar.gender);
});
purchasesVar.materials.addEventListener("blur", (e) => {
  new Actions(purchasesVar).validateName(purchasesVar.materials);
  new Actions(purchasesVar).itemPriceTotal();
});
purchasesVar.materials.addEventListener("click", (e) => {
  new Actions(purchasesVar).validateName(purchasesVar.materials);
  new Actions(purchasesVar).itemPriceTotal();
});
purchasesVar.quantity.addEventListener("keyup", (e) => {
  new Actions(purchasesVar).validateQuantity(purchasesVar.quantity);
  new Actions(purchasesVar).itemPriceTotal();
});
purchasesVar.btn.addEventListener("click", (e) => {
  new Actions(purchasesVar).purchaseFields();
});
purchasesVar.clean.addEventListener("click", (e) => {
  new Actions(purchasesVar).cleanPurchaseFields();
});
purchasesVar.back.addEventListener("click", (e) => {
  new Actions(purchasesVar).showPurchaseResult(purchasesVar.namelist.parentNode, purchasesVar.seeMaterials);
});
purchasesVar.namelistBtn.addEventListener("click", (e) => {
  purchasesVar.paySuccess.classList.add("show");
  purchasesVar.paySuccess.children[1].style.transform = "rotate(720deg)";

  setTimeout(() => {
    purchasesVar.paySuccess.children[1].style.transform = "rotate(-360deg)";
    purchasesVar.namelist.parentNode.classList.remove("show");
    new Actions(purchasesVar).cleanPurchaseFields();
  }, 1500);

  setTimeout(() => purchasesVar.paySuccess.classList.remove("show"), 2000);

  setTimeout(() => {
    purchasesVar.paySuccess.children[1].style.cssText = "";
  }, 3000);
});
purchasesVar.seeMaterials.addEventListener("click", (e) => {
  new Actions(purchasesVar).showPurchaseResult(purchasesVar.namelist.parentNode, purchasesVar.seeMaterials);
});

// VALIDAR CI DE CONTROL DE COMPRAS
controlVar.ci.addEventListener("keyup", (e) => new Actions(controlVar).validateCI());
controlVar.btn.addEventListener("click", (e) => {});

// VALIDAR CI DE BUSCAR CLIENTES
customersVar.ci.addEventListener("keyup", (e) => new Actions(customersVar).validateCI());
customersVar.btn.addEventListener("keyup", (e) => {});

// ATAJOS
document.addEventListener("keyup", (e) => {
  // PRESUPUESTAR
  if (e.which === 49 && e.altKey) {
    if (buttons.budget.disabled === false) {
      const actionsContainer = d.querySelector(".select-action");
      const budget = d.querySelector(".budget");
      const input = d.querySelector("#budget-amount");
      new Actions(buttons).showAction(actionsContainer, budget, input, buttons.back);
    }
  }
  // COMPRAS
  if (e.which === 50 && e.altKey) {
    if (buttons.purchases.disabled === false) {
      const actionsContainer = d.querySelector(".select-action");
      const purchases = d.querySelector(".purchases");
      const input = d.querySelector("#ci-c");
      new Actions(buttons).showAction(actionsContainer, purchases, input, buttons.back);
    }
  }
  // CONTROL DE COMPRAS
  if (e.which === 51 && e.altKey) {
    if (buttons.control.disabled === false) {
      const actionsContainer = d.querySelector(".select-action");
      const control = d.querySelector(".control-purchases");
      const input = d.querySelector("#ci-control");
      new Actions(buttons).showAction(actionsContainer, control, input, buttons.back);
    }
  }
  // BUSCAR CLIENTES
  if (e.which === 52 && e.altKey) {
    if (buttons.customers.disabled === false) {
      const actionsContainer = d.querySelector(".select-action");
      const customers = d.querySelector(".customers");
      const input = d.querySelector("#ci-customer");
      new Actions(buttons).showAction(actionsContainer, customers, input, buttons.back);
    }
  }
  // ATRAS
  if (e.which === 220 && e.altKey) {
    if (buttons.back.disabled === false) {
      d.getElementById("add").disabled = true;
      new Actions(purchasesVar).cleanPurchaseFields();
      new Actions().hideAction();
    }
  }
});
