// disableaði til að skipta í mismunandi skrár til að gera snyrtilegra
/* eslint-disable import/no-cycle */
import { completeProject, unCompleteProject } from '../main.js';
import { el } from './helpers.js';
import { sortByProject } from './sort.js';

// breakpoint fyrir dropdown
const media = window.matchMedia('(max-width: 700px)');

/**
 * Teljum hversu mörg entries eru í hvaða flokki og tags.
 * @param {*} data
 * @returns Hlut með upplýsingum um fjölda verkefna, kláruð verkefni, fjöldi verkefna í hverjum flokk og með hvert tag.
 */
export function countData() {
  let count = 0;
  const all = [];
  let finishedCount = 0;
  const catCount = {};
  const tagCount = {};

  for (let i = 1; i <= window.localStorage.length; i += 1) {
    const parsedItem = JSON.parse(window.localStorage.getItem(i));
    if (parsedItem !== null) {
      all[i] = parsedItem;
    }
  }

  all.forEach((id) => {
    if (id.deleted !== true) {
      if (id.completed === true) {
        finishedCount += 1;
      }
    }
    if (id.deleted !== true && id.completed !== true) {
      if (!catCount[id.category]) {
        catCount[id.category] = 0;
      }
      catCount[id.category] += 1;
      for (const tag of id.tags) {
        if (!tagCount[tag]) {
          tagCount[tag] = 0;
        }
        tagCount[tag] += 1;
      }
      count += 1;
    }
  });
  return { tagCount, catCount, count, finishedCount };
}
/**
 * Býr til yfirlitið yfir alla flokka og tags og upplýsingar um fjölda verkefna.
 * @param {*} data upplýsingar um verkefnin okkar
 */
export function createCategories() {
  const counts = countData();
  const categories = document.querySelector('.container');
  const projects = document.querySelector('.projects-container');
  const allCatContainer = el('div', '');
  allCatContainer.classList.add('all-container');
  const allTagsContainer = el('div', '');
  allTagsContainer.classList.add('all-tags');
  const categoriesHeaderContainer = document.querySelector(
    '.project-categories'
  );
  const tagsHeaderContainer = document.querySelector('.project-tags');
  for (const items in counts.catCount) {
    if (items) {
      const ge = document.createElement('div');
      ge.classList.add('category-container');
      const newCat = el('a', items);
      newCat.href = '';
      newCat.classList.add('sort-category');
      newCat.id = newCat.textContent;
      // Setjum eventlistener á hvern flokk
      newCat.addEventListener('click', () => {
        sortByProject(newCat.textContent);
        if(media.matches){
          categories.classList.add('hidden');
          projects.classList.remove('hidden');
        }

      });
      ge.append(newCat);
      const counter = el('p', `${counts.catCount[items]}`);
      ge.append(counter);
      allCatContainer.appendChild(ge);
    }
  }
  categoriesHeaderContainer.append(allCatContainer);
  for (const items in counts.tagCount) {
    if (items) {
      const ge = document.createElement('div');
      ge.classList.add('category-container');
      const newCat = el('a', items);
      newCat.href = '';
      newCat.classList.add('sort-category');
      newCat.id = newCat.textContent;
      // Setjum eventlistener á hvert tagg
      newCat.addEventListener('click', () =>{
        if(media.matches){
          categories.classList.add('hidden');
          projects.classList.remove('hidden');
        }
        sortByProject(newCat.textContent);
      });
      ge.append(newCat);
      const counter = el('p', `${counts.tagCount[items]}`);
      ge.append(counter);
      allTagsContainer.appendChild(ge);
    }
  }
  tagsHeaderContainer.append(allTagsContainer);
  const projectCount = document.querySelector('.project-count');
  projectCount.textContent = counts.count;

  const unfinishedCount = document.querySelector('.unfinished-count');
  unfinishedCount.textContent = counts.finishedCount;
}
/**
 * Birtir réttar upplýsingar um verkefni í formið, þegar það er verið að uppfæra verkefni
 * @param {*} id
 */
export function modifyProject(id) {
  const dropList = document.querySelector('.dropdown-list');
  const container = document.querySelector('.container');
  const modify = document.querySelector('.modify-project');
  const he = document.querySelector('.new-project');
  const ul = document.querySelector('.projects');
  const deleteBtn = document.querySelector('.delete-button');
  const dropdown = document.querySelector('.dropdown-menu');
  const item = JSON.parse(localStorage.getItem(id));

  // Setjum alla hluti modify project formsins í breytur
  const newTitle = document.querySelector('.mod-title');
  const newDescription = document.querySelector('.mod-description');
  const newDate = document.querySelector('.mod-duedate');
  const newTag = document.querySelector('.mod-tags');
  const newCat = document.querySelector('.mod-category');
  const newPrio = document.querySelector('.mod-priority-check');

  // Setjum titilinn og descriptionið inn í formið
  newTitle.value = item.title;
  newDescription.value = item.description;

  // Fáum dagsetningarnar á rétt form til að geta birt þær í forminu
  const date = new Date(item.due);
  let correctMonth = '';
  let correctDay = '';
  if (date.getMonth() + 1 < 10) {
    correctMonth = `0${date.getMonth() + 1}`;
  } else {
    correctMonth = date.getMonth() + 1;
  }
  if (date.getDate() < 10) {
    correctDay = `0${date.getDate()}`;
  } else {
    correctDay = date.getDate();
  }
  let correctDate = '';
  if (item.due !== null) {
    correctDate = `${date.getFullYear()}-${correctMonth}-${correctDay}`;
  } else {
    correctDate = null;
  }
  newDate.value = correctDate;

  // setjum id á hverju verkefni í delete takkann
  deleteBtn.id = id;

  // Setjum hvort verkefnið er í forgangi eða ekki
  newPrio.checked = item.priority;
  // Setjum hvert tagg inn
  newTag.value = '';
  for (let i = 0; i < item.tags.length; i += 1) {
    newTag.value += item.tags[i];
    newTag.value += ' ';
  }

  // setjum réttan flokk inn í select
  newCat.value = item.category;

  // birtum svo og felum rétt element
  dropList.classList.add('hidden');
  container.classList.add('hidden');
  modify.classList.remove('hidden');
  he.classList.add('hidden');
  ul.classList.add('hidden');
  dropdown.classList.add('hidden');
}
/**
 * Fall sem birtir verkefnin á skjáinn
 * @param {} id obj með hluta af verkefnunum, ef tómt þá er allt birt út localStorage
 */
export function showProjects(id = '') {
  const ul = document.createElement('ul');
  ul.classList.add('projects');
  const container = document.querySelector('.projects-container');
  container.append(ul);

  // Ef showprojects fær ekkert inntak sýnir það bara allt í localStorage
  // Annars sýnir það verkefnin í objectinu sem var tekið inn sem id
  for (let i = 0; i <= window.localStorage.length; i += 1) {
    let parsedItem;
    if (id !== '') {
      if (id[i]) {
        parsedItem = id[i];
      }
    } else {
      parsedItem = JSON.parse(window.localStorage.getItem(i));
    }

    const newLi = el('li', '');
    const projectButton = el('button', '');
    const completed = el('input');
    completed.setAttribute('type', 'checkbox');
    completed.classList.add('checkbox');
    if (parsedItem !== null && parsedItem !== undefined) {
      completed.id = parsedItem.id;
    }
    completed.addEventListener('change', () => {
      completeProject(completed.id);
    });
    projectButton.classList.add('modify-project-button');
    if (
      parsedItem !== null &&
      parsedItem !== undefined &&
      parsedItem.deleted !== true
    ) {
      projectButton.addEventListener('click', () =>
        modifyProject(parsedItem.id)
      );
    }

    const dateTagsContainer = el('div', '');

    if (
      parsedItem !== null &&
      parsedItem !== undefined &&
      parsedItem.deleted !== true &&
      parsedItem.completed !== true
    ) {
      // Birtum titil verkefnisins
      const title = el('h3', parsedItem.title);
      title.classList.add('project-title');
      ul.appendChild(newLi);
      newLi.append(projectButton);
      newLi.appendChild(completed);
      projectButton.append(title);
      dateTagsContainer.classList.add('date-tag-container');

      // Birtum lýsinguna fyrir verkefnið
      if (parsedItem.description !== '') {
        const descript = el('p', parsedItem.description);
        descript.classList.add('desc');
        projectButton.appendChild(descript);
      }
      projectButton.append(dateTagsContainer);

      // Ef verkefnið er í forgangi, þá birtum við það, annars ekki
      if (parsedItem.priority === true) {
        const prio = el('p', 'Í forgangi');
        prio.classList.add('priority');
        projectButton.appendChild(prio);
      }

      // Birtum dagsetningu á skilum á verkefninu
      if (parsedItem.due !== null) {
        const date = new Date(parsedItem.due);
        const dateString = date.toString().split(' ');
        const dateTime = el('p', dateString[2], ' ', dateString[1]);
        dateTime.classList.add('date-tag-container-dagsetning');
        dateTagsContainer.append(dateTime);
      }

      // Birtum töggin á verkefninu
      for (const item in parsedItem.tags) {
        if (parsedItem.tags[item] !== '') {
          const tag = el('button', parsedItem.tags[item]);
          tag.classList.add('date-tag-container-tag');
          dateTagsContainer.append(tag);
        }
      }

      // Birtum flokkana á verkefninu
      if (parsedItem.category !== '') {
        const category = el('p', parsedItem.category);
        category.classList.add('date-tag-container-category');
        dateTagsContainer.appendChild(category);
      }
    }
  }
}

/**
 * Fall sem birtir öll kláruð verkefni á skjáinn
 * @param {} id obj með hluta af verkefnunum, ef tómt þá er allt birt út localStorage
 */
export function showCompletedProjects(id = '') {
  const ul = document.createElement('ul');
  ul.classList.add('projects');
  const container = document.querySelector('.projects-container');
  container.append(ul);

  // Ef showprojects fær ekkert inntak sýnir það bara allt í localStorage
  // Annars sýnir það verkefnin í objectinu sem var tekið inn sem id
  for (let i = 0; i <= window.localStorage.length; i += 1) {
    let parsedItem;
    if (id !== '') {
      if (id[i]) {
        parsedItem = id[i];
      }
    } else {
      parsedItem = JSON.parse(window.localStorage.getItem(i));
    }

    const newLi = el('li', '');
    const projectButton = el('button', '');

    projectButton.classList.add('modify-project-button');
    // Setjum checkboxið rétt inn, því verkefnin eru kláruð
    const completed = el('input');
    completed.setAttribute('type', 'checkbox');
    completed.checked = true;
    if (parsedItem !== null && parsedItem !== undefined) {
      completed.id = parsedItem.id;
      completed.addEventListener('change', () => {
        unCompleteProject(completed.id);
      });
    }
    projectButton.classList.add('clicked');

    const dateTagsContainer = el('div', '');

    if (
      parsedItem !== null &&
      parsedItem !== undefined &&
      parsedItem.deleted !== true &&
      parsedItem.completed !== false
    ) {
      // Birtum titil verkefnisins
      const title = el('h3', parsedItem.title);
      title.classList.add('project-title');
      ul.appendChild(newLi);
      newLi.append(projectButton);
      newLi.appendChild(completed);
      projectButton.append(title);
      dateTagsContainer.classList.add('date-tag-container');

      // Birtum lýsinguna fyrir verkefnið
      if (parsedItem.description !== '') {
        const descript = el('p', parsedItem.description);
        descript.classList.add('desc');
        projectButton.appendChild(descript);
      }
      projectButton.append(dateTagsContainer);

      // Ef verkefnið er í forgangi, þá birtum við það, annars ekki
      if (parsedItem.priority === true) {
        const prio = el('p', 'Í forgangi');
        prio.classList.add('priority');
        projectButton.appendChild(prio);
      }

      // Birtum dagsetningu á skilum á verkefninu
      if (parsedItem.due !== null) {
        const date = new Date(parsedItem.due);
        const dateString = date.toString().split(' ');
        const dateTime = el('p', dateString[2], ' ', dateString[1]);
        dateTime.classList.add('date-tag-container-dagsetning');
        dateTagsContainer.append(dateTime);
      }

      // Birtum töggin á verkefninu
      for (const item in parsedItem.tags) {
        if (parsedItem.tags[item] !== '') {
          const tag = el('button', parsedItem.tags[item]);
          tag.classList.add('date-tag-container-tag');
          dateTagsContainer.append(tag);
        }
      }

      // Birtum flokkana á verkefninu
      if (parsedItem.category !== '') {
        const category = el('p', parsedItem.category);
        category.classList.add('date-tag-container-category');
        dateTagsContainer.appendChild(category);
      }
    }
  }
}
/**
 * Býr til takka sem fer opnar formið til að búa til nýtt verkefni
 */
export function createNewProjectBtn() {
  const dropList = document.querySelector('.dropdown-list');
  const container = document.querySelector('.container');
  const newprojectdiv = el('div', '');
  const newProjectBtn = el('button', 'Búa til nýtt verkefni');
  newprojectdiv.classList.add('new-project-div');
  newprojectdiv.appendChild(newProjectBtn);
  const ul = document.querySelector('.projects');
  ul.append(newprojectdiv);
  newProjectBtn.classList.add('new-modify-project');
  newProjectBtn.addEventListener('click', () => {
    const he = document.querySelector('.new-project');
    const modify = document.querySelector('.modify-project');
    const dropdown = document.querySelector('.dropdown-menu');
    he.classList.remove('hidden');
    ul.classList.add('hidden');
    modify.classList.add('hidden');
    dropList.classList.add('hidden');
    container.classList.add('hidden');
    dropdown.classList.add('hidden');
  });
}
