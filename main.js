// disableaði til að skipta í mismunandi skrár til að gera snyrtilegra
/* eslint-disable import/no-cycle */
import {
  createNewProjectBtn,
  createCategories,
  showProjects,
  showCompletedProjects,
} from './js/ui.js';
import { sortByProject, sortBy, isclicked } from './js/sort.js';
import { importData, addNewData } from './js/locals.js';
import { getData } from './js/data.js';

// Birtum allt efnið þegar við opnum síðuna
async function fetchAndCreatePage() {
  const data = await getData();
  importData(data);
  createCategories(data);
  showProjects();
  createNewProjectBtn();
  sortBy('title');
}

// setur select elementið í variable
const select = document.querySelector('.select');

/**
 * Tekur upplýsingarnar úr formi og býr til nýtt verkefni
 * uppfærir svo síðuna og birtir allt efni
 */
function addProject() {
  return (e) => {
    e.preventDefault();
    const newTitle = document.querySelector('.title');

    // Ef ekkert er sett í titil, þá býst verkefnið ekki til
    if (newTitle.value === '') {
      newTitle.placeholder = 'Ekki er hægt að búa til verkefni án titils!';
    } else {
      // birtum og felum rétt element
      const dropList = document.querySelector('.dropdown-list');
      const projects = document.querySelector('.projects');
      const newProjects = document.querySelector('.new-project');
      const modProject = document.querySelector('.modify-project');
      const container = document.querySelector('.container');
      projects.classList.remove('hidden');
      newProjects.classList.add('hidden');
      modProject.classList.add('hidden');
      dropList.classList.remove('hidden');
      container.classList.remove('hidden');

      // búum til nýtt object með öllum upplýsingum um verkefnið
      const newDescription = document.querySelector('.description');
      const newDate = document.querySelector('.duedate');
      const newTag = document.querySelector('.tags');
      const newCat = document.querySelector('.category');
      const priority = document.querySelector('.priority-check');
      const newItem = {};
      const id = window.localStorage.length + 1;
      newItem.id = id;
      newItem.title = newTitle.value;
      newItem.description = newDescription.value;
      newItem.category = newCat.value;
      newItem.priority = priority.checked;
      const tags = newTag.value.split(' ');
      newItem.tags = tags;
      const dates = new Date(newDate.value);
      const dateTimeStamp = dates.getTime();
      newItem.due = dateTimeStamp;

      // Bætum nýja verkefninu í localStorage
      addNewData(newItem);

      // Birtum öll verkefnin nú aftur og sorterum eftir því sem er valið
      sortBy(select.value);

      const categoryContainer = document.querySelector('.all-container');
      const tagContainer = document.querySelector('.all-tags');
      const allCountContainer = document.querySelector('.project-count');
      const finishedCountContainer =
        document.querySelector('.unfinished-count');

      // Uppfærum flokkana og counterana vinstra megin á síðunni
      categoryContainer.remove();
      tagContainer.remove();
      allCountContainer.textContent = '';
      finishedCountContainer.textContent = '';
      createCategories();

      // Gerum öll fieldin auð þegar við opnum næst
      newTitle.value = '';
      newDescription.value = '';
      newDate.value = null;
      newTag.value = '';
      newCat.value = '';
    }
  };
}

// Bætum eventlisteners á delete takkann
const deleteBtn = document.querySelector('.delete-button');
// Ekki hægt að stilla þessu upp til að uppfylla þessa reglu
// eslint-disable-next-line no-use-before-define
deleteBtn.addEventListener('click', deleteProject());

export function modbutton() {
  return (e) => {
    e.preventDefault();
    const newTitle = document.querySelector('.mod-title');
    if (newTitle.value === '') {
      newTitle.placeholder = 'Ekki er hægt að hafa verkefni án titils!';
    } else {
      const modify = document.querySelector('.modify-project');
      const he = document.querySelector('.new-project');
      const ul = document.querySelector('.projects');
      const dropList = document.querySelector('.dropdown-list');
      const container = document.querySelector('.container');

      const newDescription = document.querySelector('.mod-description');
      const newDate = document.querySelector('.mod-duedate');
      const newTag = document.querySelector('.mod-tags');
      const newCat = document.querySelector('.mod-category');
      const newPrio = document.querySelector('.mod-priority-check');
      const newItem = {};
      newItem.id = deleteBtn.id;
      newItem.title = newTitle.value;
      newItem.description = newDescription.value;
      newItem.category = newCat.value;
      newItem.priority = newPrio.checked;
      const tags = newTag.value.split(' ');
      newItem.tags = tags;
      const dates = new Date(newDate.value);
      const dateTimeStamp = dates.getTime();
      newItem.due = dateTimeStamp;

      // uppfærum hvenær verkefnið var síðast breytt
      const lastModified = new Date();
      newItem.modified = lastModified.getTime();

      // Uppfærum verkefnið í localStorage
      addNewData(newItem);

      // Getum gert þetta í stað reloads til að fá upplýsingar strax inn
      const addNewBtn = document.querySelector('.new-modify-project');
      addNewBtn.remove();
      ul.remove();
      showProjects();
      createNewProjectBtn();

      dropList.classList.remove('hidden');
      container.classList.remove('hidden');
      modify.classList.add('hidden');
      he.classList.add('hidden');
      ul.classList.remove('hidden');
    }
  };
}
function deleteProject() {
  return (e) => {
    e.preventDefault();
    const item = JSON.parse(window.localStorage.getItem(deleteBtn.id));
    item.deleted = true;
    localStorage.setItem(item.id, JSON.stringify(item));
    if (isclicked === '') {
      sortBy(select.value);
    } else {
      sortByProject(isclicked);
    }

    const modify = document.querySelector('.modify-project');
    const he = document.querySelector('.new-project');
    const ul = document.querySelector('.projects');
    const dropList = document.querySelector('.dropdown-list');
    const container = document.querySelector('.container');

    const categoryContainer = document.querySelector('.all-container');
    const tagContainer = document.querySelector('.all-tags');
    const allCountContainer = document.querySelector('.project-count');
    const finishedCountContainer = document.querySelector('.unfinished-count');
    modify.classList.add('hidden');
    he.classList.add('hidden');
    ul.classList.remove('hidden');
    dropList.classList.remove('hidden');
    container.classList.remove('hidden');

    // Uppfærum flokkana og counterana vinstra megin á síðunni
    categoryContainer.remove();
    tagContainer.remove();
    allCountContainer.textContent = '';
    finishedCountContainer.textContent = '';
    createCategories();
  };
}
// Bætum eventListener við dropdown listann svo það flokkist rétt
select.addEventListener('change', () => {
  if (isclicked === '') {
    sortBy(select.value);
  } else {
    sortByProject(isclicked);
  }
});

// Bætum eventListener við hnappana
const addBtn = document.querySelector('.add-btn');
const modButton = document.querySelector('.change-btn');
addBtn.addEventListener('click', addProject());
modButton.addEventListener('click', modbutton());

// Bætum eventlistener við flokkana vinstra megin á siðunni
const showAll = document.querySelector('.show-projects');
const showFinished = document.querySelector('.show-finishedprojects');
showAll.addEventListener('click', () => {
  const cats = document.querySelectorAll('.sort-category');
  for (let i = 0; i < cats.length; i += 1) {
    cats[i].classList.remove('selected');
  }
  showFinished.classList.remove('selected');
  showAll.classList.add('selected');
  window.event.preventDefault();
  sortBy(select.value);
});
showFinished.addEventListener('click', () => {
  showFinished.classList.add('selected');
  sortByProject(showFinished.textContent);
});

/**
 * Setur valið verkefni sem completed og uppfærir síðuna samkvæmt því
 * @param {*} id
 */
export function completeProject(id) {
  const item = JSON.parse(window.localStorage.getItem(id));
  item.completed = true;
  localStorage.setItem(item.id, JSON.stringify(item));
  if (isclicked === '') {
    sortBy(select.value);
  } else {
    sortByProject(isclicked);
  }
  const modify = document.querySelector('.modify-project');
  const he = document.querySelector('.new-project');
  const ul = document.querySelector('.projects');
  const dropList = document.querySelector('.dropdown-list');
  const container = document.querySelector('.container');

  const categoryContainer = document.querySelector('.all-container');
  const tagContainer = document.querySelector('.all-tags');
  const allCountContainer = document.querySelector('.project-count');
  const finishedCountContainer = document.querySelector('.unfinished-count');
  modify.classList.add('hidden');
  he.classList.add('hidden');
  ul.classList.remove('hidden');
  dropList.classList.remove('hidden');
  container.classList.remove('hidden');

  // Uppfærum flokkana og counterana vinstra megin á síðunni
  categoryContainer.remove();
  tagContainer.remove();
  allCountContainer.textContent = '';
  finishedCountContainer.textContent = '';
  createCategories();
}
/**
 * Tekur verkefnið sem er completed og ef það er klikkað
 * þá fer það aftur í verkefnalistinn. Uppfærum síðuna svo
 * samkvæmt því
 * @param {} id
 */
export function unCompleteProject(id) {
  const item = JSON.parse(window.localStorage.getItem(id));
  item.completed = false;
  localStorage.setItem(item.id, JSON.stringify(item));
  const projects = document.querySelector('.projects');
  const addNewBtn = document.querySelector('.new-modify-project');
  addNewBtn.remove();
  projects.remove();
  const categoryContainer = document.querySelector('.all-container');
  const tagContainer = document.querySelector('.all-tags');
  const allCountContainer = document.querySelector('.project-count');
  const finishedCountContainer = document.querySelector('.unfinished-count');
  categoryContainer.remove();
  tagContainer.remove();
  allCountContainer.textContent = '';
  finishedCountContainer.textContent = '';
  createCategories();
  showCompletedProjects();
  createNewProjectBtn();
}

const dropdown = document.querySelector('.dropdown-menu');
const projects = document.querySelector('.projects-container');
const categories = document.querySelector('.container');
const media = window.matchMedia('(max-width: 700px)');
dropdown.addEventListener('click', () => {
    if (projects.classList.contains('hidden')) {
        projects.classList.remove('hidden');
        categories.classList.add('hidden');
    } else {
        projects.classList.add('hidden');
        categories.classList.remove('hidden');
    }
});
function listen() {
  if (media.matches) {
    categories.classList.add('hidden');
  } else if (categories.classList.contains('hidden') && !media.matches) {
    categories.classList.remove('hidden');
  }
}

listen();
media.addEventListener('change', listen)




// Keyrum þetta fall þegar við opnum síðuna
fetchAndCreatePage();
