// VARIABLES
const d = document;

const searchContainer = d.querySelector(".control-purchases-form");
const searchCi = d.getElementById("ci-control");
const searchBtn = d.getElementById("control-btn");

const purchaseList = {
  container: d.getElementById("purchases-list"),
  table: d.getElementById("customers-list"),
  titles: d.getElementById("customers-head"),
  actions: d.getElementById("customers-actions"),
  rows: d.querySelectorAll(".customer"),
  more: d.getElementById("more-data"),
  filter: d.getElementById("filter"),
  resetFilter: d.getElementById("reset-filter"),
  order: d.getElementById("sort-by"),
};

const customersInfo = d.getElementById("customer-info");
const filterOptions = d.getElementById("filter-options");
const closeFilter = d.getElementById("close-filter");
const orderOptions = d.getElementById("order-options");
const closeOrder = d.getElementById("close-order");

const loader = d.getElementById("loader");
const backRegisters = d.getElementById("back-registers");
const hrs = d.getElementsByTagName("hr");

// SIMULACION DE BASE DE DATOS DE CLIENTES
const customers = {
  ci: {
    c1: "27439511",
    c2: "27774428",
    c3: "14165437",
    c4: "25990203",
    c5: "30111851",
    c6: "9902156",
    c7: "17111390",
    c8: "5494378",
    c9: "14660911",
  },
  name: {
    c1: "Winyerson",
    c2: "Leidy",
    c3: "Yenny",
    c4: "Wilinyer",
    c5: "Daikel",
    c6: "Agustin",
    c7: "Yonny",
    c8: "Yolanda",
    c9: "Maria",
  },
  lastname: {
    c1: "Rivera",
    c2: "Carrasco",
    c3: "Chacon",
    c4: "Rivera",
    c5: "Dominguez",
    c6: "Silva",
    c7: "Salas",
    c8: "Rondon",
    c9: "Mendez",
  },
  namelist: {
    c1: "Techo",
    c2: "Closet",
    c3: "Encimeras",
    c4: "Escritorio",
    c5: "Techos de sin",
    c6: "Escritorio",
    c7: "Construccion",
    c8: "Peinadora",
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
    c8: "12-09-21",
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
    c8: "14000",
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
export default class Customers {
  constructor(variables) {
    this.variables = variables;
  }

  // SEPARAR CANTIDADES DE MILES CON PUNTO
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

  addCustomers() {
    Object.values(this.variables.rows).forEach((elem, i) => {
      elem.dataset.ci = Object.values(customers.ci)[i];
      elem.children[0].textContent = `${Object.values(customers.name)[i]} ${
        Object.values(customers.lastname)[i]
      }`;
      elem.children[1].textContent = this.convert(
        Object.values(customers.price)[i]
      );
      elem.children[2].textContent = Object.values(customers.date)[i];
    });
  }

  moreData(action) {
    this.variables.more.style.pointerEvents = "none";
    // FOREACH
    Object.values(this.variables.titles.children).forEach((elem) => {
      // CAMBIAR A MAS DATOS
      if (elem.textContent === elem.dataset.default) {
        this.variables.table.style.opacity = "0";
        setTimeout(() => {
          this.variables.table.style.opacity = "1";
          Object.values(this.variables.rows).forEach((elem, i) => {
            elem.children[0].textContent = this.convert(
              Object.values(customers.ci)[i]
            );
            elem.children[1].textContent = Object.values(customers.namelist)[i];
            elem.children[2].textContent = Object.values(customers.result)[i];
            if (elem.children[2].textContent === "Exitoso") {
              elem.children[2].style.color = "#000";
              elem.children[2].style.background = "#2ecc71";
            } else if (elem.children[2].textContent === "Pendiente") {
              elem.children[2].style.color = "#000";
              elem.children[2].style.background = "#fffa659c";
            } else {
              elem.children[2].style.color = "#000";
              elem.children[2].style.background = "#ff4d4d";
            }
          });
          this.variables.more.style.pointerEvents = "auto";
          return (elem.textContent = elem.dataset.more);
        }, 500);
      }
      // -----------------------------END IF------------------------------->
      // CAMBIAR A DEFAULT
      if (elem.textContent === elem.dataset.more || action === "default") {
        this.variables.table.style.opacity = "0";
        setTimeout(() => {
          this.variables.table.style.opacity = "1";
          Object.values(this.variables.rows).forEach((elem, i) => {
            elem.children[0].textContent = `${
              Object.values(customers.name)[i]
            } ${Object.values(customers.lastname)[i]}`;
            elem.children[1].textContent = this.convert(
              Object.values(customers.price)[i]
            );
            elem.children[2].textContent = Object.values(customers.date)[i];
            elem.children[2].style = defaultStatus;
          });
          this.variables.more.style.pointerEvents = "auto";
          return (elem.textContent = elem.dataset.default);
        }, 500);
      }
      // ----------------------------------END IF------------------------------>
    });
    // ----------------------------END FOREACH----------------------------->
  }

  searchCustomers(input) {
    if (input) {
      Object.values(customers.ci).forEach((elem, i) => {
        if (input.value === elem) {
          searchContainer.style.display = "none";

          loader.classList.remove("none");

          this.moreData("default");

          setTimeout(() => {
            this.variables.container.querySelector("h4").textContent =
              "Resultado de b??squeda";

            loader.classList.add("none");

            hrs[1].style.display = "none";
            hrs[2].style.display = "none";
            hrs[3].style.display = "none";

            backRegisters.classList.add("show");

            this.variables.actions.style.display = "none";
          }, 500);
        } else {
          this.variables.rows[i].remove();
        }
      });
    } else {
      Object.values(this.variables.rows).forEach((elem, i) => {
        this.variables.container.querySelector("h4").textContent =
          defaultStatus;

        loader.classList.remove("none");

        setTimeout(() => {
          this.variables.table.appendChild(elem);

          // this.variables.titles.children[i].textContent =
          //   this.variables.titles.children[i].dataset.default;

          this.moreData("default");

          loader.classList.add("none");
          backRegisters.classList.remove("show");

          hrs[1].style = defaultStatus;
          hrs[2].style = defaultStatus;
          hrs[3].style = defaultStatus;

          searchContainer.style = defaultStatus;

          this.variables.actions.style = defaultStatus;
        }, 500);
      });
    }
  }

  filterCustomers(e, action) {
    if (action) {
      filterOptions.classList.remove("show");

      this.variables.filter.dataset.reset = "true";
      this.variables.filter.children[0].classList.add("none");
      this.variables.filter.children[1].classList.remove("none");

      this.variables.table.style.opacity = "0";

      loader.classList.remove("none");

      setTimeout(() => {
        loader.classList.add("none");
        this.variables.table.style.opacity = "1";

        Object.values(customers.result).forEach((elem, i) => {
          if (
            Object.values(customers.result)[i] !== "Exitoso" &&
            e.target.id === "success"
          ) {
            this.variables.rows[i].style.display = "none";
          }
          if (
            Object.values(customers.result)[i] !== "Pendiente" &&
            e.target.id === "pending"
          ) {
            this.variables.rows[i].style.display = "none";
          }
          if (
            Object.values(customers.result)[i] !== "Cancelado" &&
            e.target.id === "canceled"
          ) {
            this.variables.rows[i].style.display = "none";
          }
        });
      }, 500);
    } else {
      Object.values(this.variables.rows).forEach((elem, i) => {
        this.variables.rows[i].style.display = defaultStatus;

        loader.classList.remove("none");

        this.variables.table.style.opacity = "0";

        this.variables.filter.dataset.reset = "";
        this.variables.filter.children[0].classList.remove("none");
        this.variables.filter.children[1].classList.add("none");

        setTimeout(() => {
          loader.classList.add("none");
          this.variables.table.style.opacity = "1";
        }, 500);
      });
    }
  }

  orderCustomers(by) {
    // POR FECHA (DEFAULT)
    if (by === "date") {
      // ASCENDENTE
      if (orderOptions.dataset.date === "asc") {
        orderOptions.classList.remove("show");
        orderOptions.dataset.date = "desc";

        this.variables.table.style.opacity = "0";
        this.moreData("default");

        setTimeout(() => {
          this.variables.table.style.opacity = "1";

          Object.values(this.variables.rows).forEach((elem, i) => {
            this.variables.table.appendChild(elem);
          });
        }, 500);

        return false;
      }

      // DESCENDENTE
      if (orderOptions.dataset.date === "desc") {
        orderOptions.classList.remove("show");
        orderOptions.dataset.date = "asc";

        const nameList = [...Object.values(customers.name)].reverse();

        this.variables.table.style.opacity = "0";

        this.moreData("default");

        setTimeout(() => {
          this.variables.table.style.opacity = "1";

          while (nameList.length > 0) {
            Object.values(this.variables.rows).forEach((elem, i) => {
              if (elem.children[0].textContent.split(" ")[0] === nameList[0]) {
                this.variables.table.firstElementChild.appendChild(elem);
                nameList.shift();
              }
            });
          }
        }, 500);

        return false;
      }
    }

    // POR NOMBRE
    if (by === "name") {
      // ASCENDENTE
      if (orderOptions.dataset.name === "asc") {
        orderOptions.dataset.name = "desc";
        orderOptions.classList.remove("show");

        const nameList = [...Object.values(customers.name)].sort();

        this.variables.table.style.opacity = "0";

        this.moreData("default");

        setTimeout(() => {
          this.variables.table.style.opacity = "1";

          while (nameList.length > 0) {
            Object.values(this.variables.rows).forEach((elem, i) => {
              if (elem.children[0].textContent.split(" ")[0] === nameList[0]) {
                this.variables.table.firstElementChild.appendChild(elem);
                nameList.shift();
              }
            });
          }
        }, 500);

        return false;
      }

      // DESCENDENTE
      if (orderOptions.dataset.name === "desc") {
        orderOptions.dataset.name = "asc";
        orderOptions.classList.remove("show");

        const nameList = [...Object.values(customers.name)].sort().reverse();

        this.variables.table.style.opacity = "0";

        this.moreData("default");

        setTimeout(() => {
          this.variables.table.style.opacity = "1";

          while (nameList.length > 0) {
            Object.values(this.variables.rows).forEach((elem, i) => {
              if (elem.children[0].textContent.split(" ")[0] === nameList[0]) {
                this.variables.table.firstElementChild.appendChild(elem);
                nameList.shift();
              }
            });
          }
        }, 500);

        return false;
      }
    }

    // POR MONTO
    if (by === "amount") {
      // ASCENDENTE
      if (orderOptions.dataset.date === "asc") {
        orderOptions.classList.remove("show");
        orderOptions.dataset.date = "desc";

        const nameList = [...Object.values(customers.price)];

        const newList = [];

        nameList.filter((elem) => newList.push(parseInt(elem)));

        newList
          .sort((a, b) => {
            return a - b;
          })
          .reverse();

        this.variables.table.style.opacity = "0";

        this.moreData("default");

        setTimeout(() => {
          this.variables.table.style.opacity = "1";

          while (newList.length > 0) {
            Object.values(this.variables.rows).forEach((elem, i) => {
              if (
                parseInt(elem.children[1].textContent.split(".").join("")) ===
                newList[0]
              ) {
                this.variables.table.firstElementChild.appendChild(elem);
                newList.shift();
              }
            });
          }
        }, 500);

        return false;
      }

      // DESCENDENTE
      if (orderOptions.dataset.date === "desc") {
        orderOptions.classList.remove("show");
        orderOptions.dataset.date = "asc";

        const nameList = [...Object.values(customers.price)];

        const newList = [];

        nameList.filter((elem) => newList.push(parseInt(elem)));

        newList.sort((a, b) => {
          return a - b;
        });

        this.variables.table.style.opacity = "0";

        this.moreData("default");

        setTimeout(() => {
          this.variables.table.style.opacity = "1";

          while (newList.length > 0) {
            Object.values(this.variables.rows).forEach((elem, i) => {
              if (
                parseInt(elem.children[1].textContent.split(".").join("")) ===
                newList[0]
              ) {
                this.variables.table.firstElementChild.appendChild(elem);
                newList.shift();
              }
            });
          }
        }, 500);

        return false;
      }
    }
  }
}

// EVENTOS
new Customers(purchaseList).addCustomers();

searchBtn.addEventListener("click", (e) =>
  new Customers(purchaseList).searchCustomers(searchCi)
);

backRegisters.onclick = (e) => new Customers(purchaseList).searchCustomers();

// MOSTRAR MAS
purchaseList.more.onclick = (e) => new Customers(purchaseList).moreData();

// FILTRAR POR
purchaseList.filter.onclick = (e) =>
  new Customers(purchaseList).filterCustomers();

purchaseList.filter.onclick = (e) => {
  if (purchaseList.filter.dataset.reset) {
    new Customers(purchaseList).filterCustomers(e);
  } else {
    filterOptions.classList.add("show");
  }
};
closeFilter.onclick = (e) => filterOptions.classList.remove("show");

filterOptions.children[2].onclick = (e) =>
  new Customers(purchaseList).filterCustomers(e, true);
filterOptions.children[3].onclick = (e) =>
  new Customers(purchaseList).filterCustomers(e, true);
filterOptions.children[4].onclick = (e) =>
  new Customers(purchaseList).filterCustomers(e, true);

// ORDENAR POR
purchaseList.order.onclick = (e) => orderOptions.classList.add("show");

closeOrder.onclick = (e) => orderOptions.classList.remove("show");

orderOptions.children[2].onclick = (e) =>
  new Customers(purchaseList).orderCustomers("date");
orderOptions.children[3].onclick = (e) =>
  new Customers(purchaseList).orderCustomers("name");
orderOptions.children[4].onclick = (e) =>
  new Customers(purchaseList).orderCustomers("amount");
