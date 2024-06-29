// VARIABLES
const d = document;

const customers = {
  container: d.querySelector(".customers"),
  form: d.getElementById("customers-form"),
  ci: d.getElementById("ci-customer"),
  btn: d.getElementById("customer-btn"),
  status: d.getElementById("status"),
  list: d.getElementById("search-list"),
  notFound: d.getElementById("not-found"),
  backSearch: d.getElementById("back-search"),
};

// SIMULACION DE BASE DE DATOS DE CLIENTES
const customersPurchases = {
  11111111: {
    name: "Annie",
    lastname: "Rivera",
    age: "21",
    phone: "0123456789",
    email: "customer1@gmail.com",
    gender: "f",
    list1: {
      name: "Techo",
      price: "35000",
      date: "04-09-21",
      result: "Exitoso",
    },
  },
  22222222: {
    name: "Vince",
    lastname: "Carrasco",
    age: "20",
    phone: "0123456789",
    email: "customer2@gmail.com",
    gender: "m",
    list1: {
      name: "Closet",
      price: "32000",
      date: "15-09-21",
      result: "Exitoso",
    },
  },
  33333333: {
    name: "Arianna",
    lastname: "Chacon",
    age: "41",
    phone: "0123456789",
    email: "customer3@gmail.com",
    gender: "f",
    list1: {
      name: "Encimeras",
      price: "13500",
      date: "20-09-21",
      result: "Exitoso",
    },
  },
  44444444: {
    name: "Jefferson",
    lastname: "Gutierrez",
    age: "24",
    phone: "0123456789",
    email: "customer4@outlook.es",
    gender: "m",
    list1: {
      name: "Escritorio",
      price: "8500",
      date: "23-09-21",
      result: "Pendiente",
    },
  },
  55555555: {
    name: "Hernesto",
    lastname: "Dominguez",
    age: "18",
    phone: "0123456789",
    email: "customer5@gmail.com",
    gender: "m",
    list1: {
      name: "Techos de sin",
      price: "1200",
      date: "23-09-21",
      result: "Pendiente",
    },
  },
  66666666: {
    name: "Agustin",
    lastname: "Silva",
    age: "33",
    phone: "0123456789",
    email: "customer6@gmail.com",
    gender: "m",
    list1: {
      name: "Escritorio",
      price: "12000",
      date: "04-09-21",
      result: "Pendiente",
    },
  },
  77777777: {
    name: "Yonny",
    lastname: "Salas",
    age: "52",
    phone: "0123456789",
    email: "customer7@gmail.com",
    gender: "m",
    list1: {
      name: "Construccion",
      price: "75000",
      date: "04-09-21",
      result: "Cancelado",
    },
  },
  88888888: {
    name: "Angel",
    lastname: "Pereira",
    age: "20",
    phone: "0123456789",
    email: "customer8@gmail.com",
    gender: "m",
    list1: {
      name: "Encimeras",
      price: "10000",
      date: "04-09-21",
      result: "Cancelado",
    },
  },
  99999999: {
    name: "Emily",
    lastname: "Mendez",
    age: "28",
    phone: "0123456789",
    email: "customer9@gmail.com",
    gender: "f",
    list1: {
      name: "Barra",
      price: "9000",
      date: "04-09-21",
      result: "Cancelado",
    },
  },
};

// FUNCIONES
class SearchCustomers {
  constructor(customers, database) {
    this.customers = customers;
    this.db = database;
  }

  search() {
    let found = {};
    let foundValid = false;

    Object.values(this.db).forEach((elem, i) => {
      if (Object.keys(this.db)[i] === this.customers.ci.value) {
        found.ci = Object.keys(this.db)[i];
        found.name = Object.values(this.db)[i].name;
        found.lastname = Object.values(this.db)[i].lastname;
        found.age = Object.values(this.db)[i].age;
        found.phone = Object.values(this.db)[i].phone;
        found.email = Object.values(this.db)[i].email;
        found.gender = Object.values(this.db)[i].gender;
        found.list1 = {};
        found.list1.name = Object.values(this.db)[i].list1.name;
        found.list1.price = Object.values(this.db)[i].list1.price;
        found.list1.date = Object.values(this.db)[i].list1.date;
        found.list1.result = Object.values(this.db)[i].list1.result;
        foundValid = true;
      }
    });

    if (foundValid === true) {
      const template = d.getElementById("purchase-template");
      const clone = d.importNode(template.content, true);
      clone.querySelector("tr").innerHTML = `
      <td>${found.list1.name}</td>
      <td>${found.list1.price}</td>
      <td>${found.list1.date}</td>
      <td>${found.list1.result}</td>
      `;

      function genderAutent(a) {
        if (a === "m") return "Masculino";
        else return "Femenino";
      }

      this.customers.status.innerHTML = `
        <h3>Datos del cliente</h3>
        <p><b>CI:</b> ${found.ci}</p>
        <p><b> Nombre:</b> ${found.name + " " + found.lastname}</p>
        <p><b> Edad:</b> ${found.age}</p>
        <p><b> Género:</b> ${genderAutent(found.gender)}</p>
        <h3>Contacto</h3>
        <p><b> Télefono:</b> ${found.phone}</p>
        <p><b> Correo:</b> ${found.email}</p>`;

      this.customers.list.children[0].appendChild(clone);

      this.customers.container.children[0].style.display = "none";
      this.customers.form.classList.add("none");
      this.customers.status.classList.add("show");
      this.customers.container.querySelector(".customers-hr").classList.add("show");
      this.customers.list.classList.add("show");
    } else {
      this.customers.container.children[0].style.display = "none";
      this.customers.form.classList.add("none");
      this.customers.notFound.classList.add("show");
      this.customers.backSearch.classList.add("show");
    }
  }

  searchRestart() {
    this.customers.container.children[0].style.cssText = "";
    this.customers.form.classList.remove("none");
    this.customers.notFound.classList.remove("show");
    this.customers.backSearch.classList.remove("show");
    customers.ci.focus();
    customers.ci.value = "";
  }
}

// EVENTOS
customers.btn.addEventListener("click", (e) => new SearchCustomers(customers, customersPurchases).search());
customers.backSearch.addEventListener("click", (e) =>
  new SearchCustomers(customers, customersPurchases).searchRestart()
);
