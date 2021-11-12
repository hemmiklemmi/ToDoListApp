import { getData } from './data.js';
import { el } from './helpers.js';
import { importData } from './locals.js';

export async function fetchAndCreatePage() {
  const data = await getData();
  importData(data);
  createCategories(data);
  showProjects();
  createNewProjectBtn();
  return data;
}
/**
 * Býr til yfirlitið yfir alla flokka og tags og upplýsingar um fjölda verkefna.
 * @param {*} data upplýsingar um verkefnin okkar
 */
function createCategories(data) {
  const counts = countData(data);
  for (let i = 0; i < data.categories.length; i+=1) {
    const ge = document.createElement('div');
    ge.classList.add('category-container');
    const newCat = el('h3', data.categories[i].title);
    const he = document.querySelector('.project-categories');
    he.append(ge);
    ge.append(newCat);
    for (const items in counts.catCount) {
      if (items === data.categories[i].id) {
        const counter = el('p', `${counts.catCount[items]}`);
        ge.append(counter);
      }
    }
  }
  for (const items in counts.tagCount) {
      if(items){
        const ge = document.createElement('div');
        ge.classList.add('category-container');
        const newCat = el('h3', items);
        const he = document.querySelector('.project-tags');
        he.append(ge);
        ge.append(newCat);
        const counter = el('p', `${counts.tagCount[items]}`);
        ge.append(counter);
      }
  }
  const projectCount = document.querySelector('.project-count');
  projectCount.textContent = counts.count;

  const unfinishedCount = document.querySelector('.unfinished-count');
  unfinishedCount.textContent = counts.finishedCount;
}

/**
 * Teljum hversu mörg entries eru í hvaða flokki og tags.
 * @param {*} data
 * @returns Hlut með upplýsingum um fjölda verkefna, kláruð verkefni, fjöldi verkefna í hverjum flokk og með hvert tag.
 */
function countData(data) {
  let count = 0;
  let finishedCount = 0;
  const catCount = {};
  const tagCount = {};
  const {items} = data;
  items.forEach((id) => {
    if (id.completed === true) {
      finishedCount+=1;
    }
    count+=1;
  });
  for (const row of items) {
    if (!catCount[row.category]) {
      catCount[row.category] = 0;
    }
    catCount[row.category] += 1;
    for (const tag of row.tags) {
      if (!tagCount[tag]) {
        tagCount[tag] = 0;
      }
      tagCount[tag] += 1;
    }
  }
  return { tagCount, catCount, count, finishedCount };
}
function showProjects(id = ''){
    const ul = document.createElement('ul');
    ul.classList.add('projects');
    const container= document.querySelector('.projects-container')
    container.append(ul);
    for(let i = 1; i<window.localStorage.length; i+= 1){
        const parsedItem = JSON.parse(window.localStorage.getItem(i));
        const newLi = el('li','');
        const title = el('h3',  parsedItem.title)
        ul.appendChild(newLi);
        newLi.append(title);
        const dateTagsContainer = el('div', '');
        dateTagsContainer.classList.add('date-tag-container');

        if(parsedItem.description !== ''){
            const descript = el('p' , parsedItem.description);
            newLi.appendChild(descript);
        }
        newLi.append(dateTagsContainer);
        const date = new Date(parsedItem.due)
        const dateString =(date.toString()).split(' ');
        const dateTime = el('p' , dateString[2], ' ', dateString[1]);
        dateTagsContainer.append(dateTime);
        
        for(const item in parsedItem.tags){
            if(parsedItem.tags !== ''){
                const tag = el('button', parsedItem.tags[item])
                dateTagsContainer.append(tag);
            }
        }
        if(parsedItem.category !== ''){
          const category = el('p' , parsedItem.category);
          dateTagsContainer.appendChild(category);
        }
    }
    
}
function createNewProjectBtn(){
  const newProjectBtn = el('button', 'Búa til nýtt verkefni');
  const ul = document.querySelector('.projects');
  ul.append(newProjectBtn);
  newProjectBtn.classList.add('new-modify-project');
  newProjectBtn.addEventListener('click', ()=>{
    const he = document.querySelector('.new-project');
    he.classList.remove('hidden');
    ul.classList.add('hidden');
  } )
}