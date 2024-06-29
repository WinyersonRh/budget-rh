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
      elem.children[0].textContent = `${Object.values(customers.name)[i]} ${Object.values(customers.lastname)[i]}`;
      elem.children[1].textContent = this.convert(Object.values(customers.price)[i]);
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
            elem.children[0].textContent = this.convert(Object.values(customers.ci)[i]);
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
            elem.children[0].textContent = `${Object.values(customers.name)[i]} ${
              Object.values(customers.lastname)[i]
            }`;
            elem.children[1].textContent = this.convert(Object.values(customers.price)[i]);
            elem.children[2].textContent = Object.values(customers.date)[i];
            elem.children[2].style.cssText = "";
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
            this.variables.container.querySelector("h4").textContent = "Resultado de búsqueda";

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
        this.variables.container.querySelector("h4").textContent = "";

        loader.classList.remove("none");

        setTimeout(() => {
          this.variables.table.appendChild(elem);

          // this.variables.titles.children[i].textContent =
          //   this.variables.titles.children[i].dataset.default;

          this.moreData("default");

          loader.classList.add("none");
          backRegisters.classList.remove("show");

          hrs[1].style.cssText = "";
          hrs[2].style.cssText = "";
          hrs[3].style.cssText = "";

          searchContainer.style.cssText = "";

          this.variables.actions.style.cssText = "";
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
          if (Object.values(customers.result)[i] !== "Exitoso" && e.target.id === "success") {
            this.variables.rows[i].style.display = "none";
          }
          if (Object.values(customers.result)[i] !== "Pendiente" && e.target.id === "pending") {
            this.variables.rows[i].style.display = "none";
          }
          if (Object.values(customers.result)[i] !== "Cancelado" && e.target.id === "canceled") {
            this.variables.rows[i].style.display = "none";
          }
        });
      }, 500);
    } else {
      Object.values(this.variables.rows).forEach((elem, i) => {
        this.variables.rows[i].style.cssText = "";

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
              if (parseInt(elem.children[1].textContent.split(".").join("")) === newList[0]) {
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
              if (parseInt(elem.children[1].textContent.split(".").join("")) === newList[0]) {
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

searchBtn.addEventListener("click", (e) => new Customers(purchaseList).searchCustomers(searchCi));

backRegisters.onclick = (e) => new Customers(purchaseList).searchCustomers();

// MOSTRAR MAS
purchaseList.more.onclick = (e) => new Customers(purchaseList).moreData();

// FILTRAR POR
purchaseList.filter.onclick = (e) => new Customers(purchaseList).filterCustomers();

purchaseList.filter.onclick = (e) => {
  if (purchaseList.filter.dataset.reset) {
    new Customers(purchaseList).filterCustomers(e);
  } else {
    filterOptions.classList.add("show");
  }
};
closeFilter.onclick = (e) => filterOptions.classList.remove("show");

filterOptions.children[2].onclick = (e) => new Customers(purchaseList).filterCustomers(e, true);
filterOptions.children[3].onclick = (e) => new Customers(purchaseList).filterCustomers(e, true);
filterOptions.children[4].onclick = (e) => new Customers(purchaseList).filterCustomers(e, true);

// ORDENAR POR
purchaseList.order.onclick = (e) => orderOptions.classList.add("show");

closeOrder.onclick = (e) => orderOptions.classList.remove("show");

orderOptions.children[2].onclick = (e) => new Customers(purchaseList).orderCustomers("date");
orderOptions.children[3].onclick = (e) => new Customers(purchaseList).orderCustomers("name");
orderOptions.children[4].onclick = (e) => new Customers(purchaseList).orderCustomers("amount");
