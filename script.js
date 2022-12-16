import { c, q, GET, POST, DELETE, PATCH } from "./utils.js";
const url = "https://jsonplaceholder.typicode.com/todos";

//ARRAY UTILI
const types = [
  {
    id: 1,
    name: "Capelli",
  },
  {
    id: 2,
    name: "Manicure",
  },
  {
    id: 3,
    name: "Altro",
  },
];

let names = [
  "Albert",
  "Aleksander",
  "Alessandro",
  "Alessio",
  "Alex",
  "Badsha",
  "Bailee",
  "Bailey",
  "Ben",
  "Christian",
  "Christie",
  "Clark",
  "Clifford",
  "Clyde",
  "Cody",
  "Daren",
  "Darrach",
  "Darragh",
  "Darrell",
  "David",
  "Eisa",
  "Eli",
  "Elias",
  "Eliot",
  "Enzo",
  "Famara",
  "Hugh",
  "Hugo",
  "Travis",
  "Trent",
  "Tristain",
  "Tyra",
  "Valentin",
  "Valery",
];

let time = [
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00",
  "19:00",
];

let array = [];
let typeIdOne = [];
let typeIdTwo = [];
let typeIdThree = [];

function getRandomName(min = 0, max = 1) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const getRandomTime = (min = 0, max = 1) => {
  return Math.floor(Math.random() * (max.min + 1)) + min;
};

function generateRandom(max = 5) {
  return Math.floor(Math.random() * max);
}

function generate(max = 4) {
  return Math.floor(Math.random() * max);
}
function randomDate(start, end) {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );
}

const hairEl = q(".hair");
const nailsEl = q(".nails");
const otherEl = q(".other");

//CREAZIONE CARD

const createSection = (item, containerSection) => {
  const { id, surname, time, completed, priority } = item;

  const section = c("div");
  section.className = "section";

  const sectionIdEl = c("h4");
  sectionIdEl.className = "id";
  sectionIdEl.textContent = `${item.typeId}`;

  const sectionNameEl = c("h5");
  sectionNameEl.className = "h5";
  sectionNameEl.textContent = `${item.surname}`;

  const sectionHourEl = c("h5");
  sectionHourEl.className = "h5";
  sectionHourEl.textContent = `${item.time}`;

  const sectionDateEl = c("h5");
  sectionDateEl.className = "h5";
  sectionDateEl.textContent = `${item.date}`;

  if (item.completed === true) {
    section.classList.add("special-class");
  }

  const btn = c("button");
  btn.className = "btn-class";
  btn.textContent = "DELETE";

  const modifybtn = c("button");
  modifybtn.className = "btn-class-edit";
  modifybtn.textContent = "EDIT";

  btn.addEventListener("click", () => {
    DELETE(url, id).then(() => location.reload());
  });

  modifybtn.addEventListener("click", () => {
    elementsFP.surname.value = sectionNameEl.textContent;
    elementsFP.hour.value = sectionHourEl.textContent;
    window.scrollTo({
      top: 0,
    });
  });

  section.append(
    sectionIdEl,
    sectionNameEl,
    sectionDateEl,
    sectionHourEl,
    modifybtn,
    btn
  );
  const container = q(containerSection);
  container.append(section);
};

//FORM SUBMIT

const form = document.forms.appointments;
const element = form.elements;

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const data = {
    surname: element.surname.value,
    date: element.datetime.value,
    time: element.hour.value,
  };

  POST(url, data)
    .then((response) => response.json())
    .then((res) => {
      console.log("Success:", res);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
});

//FORM EDIT
const formPatch = document.forms.appointments;
const elementsFP = formPatch.elements;

formPatch.addEventListener("submit", (e) => {
  e.preventDefault();

  const data = {
    surname: elementsFP.surname.value,
    date: elementsFP.datetime.value,
    time: elementsFP.hour.value,
  };

  PATCH(url, data)
    .then(() => location.reload())
    .catch((e) => console.log(e));
});

GET(url).then((res) => {
  array = res.map((item) => {
    let rand = Math.floor(Math.random() * time.length);
    let rValue = time[rand];

    let name = Math.floor(Math.random() * time.length);
    let Value = names[name];

    const d = randomDate(new Date(2023, 1, 1), new Date());

    item.surname = Value;
    item.time = rValue;
    item.date = d.toLocaleDateString();
    item.priority = generateRandom();
    item.typeId = generate();
    return item;
  });

  filterItems(array);
});

const filterItems = (array) => {
  typeIdOne = array.filter((item) => item.typeId === 1);
  typeIdTwo = array.filter((item) => item.typeId === 2);
  typeIdThree = array.filter((item) => item.typeId === 3);

  if (typeIdOne.length === 0) {
    hairEl.textContent = "No appointment!";
    console.log("No appointment!");
  } else {
    typeIdOne.forEach((item) => createSection(item, "#hair"));
  }
  if (typeIdTwo.length === 0) {
    nailsEl.textContent = "No appointment!";
    console.log("No appointment!");
  } else {
    typeIdTwo.forEach((item) => createSection(item, "#nails"));
  }
  if (typeIdThree.length === 0) {
    otherEl.textContent = "No appointment!";
    console.log("No appointment!");
  } else {
    typeIdThree.forEach((item) => createSection(item, "#other"));
  }
};
