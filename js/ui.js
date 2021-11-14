import { el, empty } from './helpers.js';

/**
 * Býr til yfirlitið yfir alla flokka og tags og upplýsingar um fjölda verkefna.
 * @param {*} data upplýsingar um verkefnin okkar
 */
export function createCategories() {
  const counts = countData();
  const allCatContainer = el('div', '');
  allCatContainer.classList.add('all-container');
  const allTagsContainer = el('div', '');
  allTagsContainer.classList.add('all-tags');
  const categoriesHeaderContainer = document.querySelector('.project-categories');
  const tagsHeaderContainer = document.querySelector('.project-tags');
  for (const items in counts.catCount) {
    if(items){
      const ge = document.createElement('div');
      ge.classList.add('category-container');
      const newCat = el('h3', items);
      ge.append(newCat);
      const counter = el('p', `${counts.catCount[items]}`);
      ge.append(counter);
      allCatContainer.appendChild(ge);
      }
    }
  categoriesHeaderContainer.append(allCatContainer);
  for (const items in counts.tagCount) {
      if(items){
        const ge = document.createElement('div');
        ge.classList.add('category-container');
        const newCat = el('h3', items);
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
 * Teljum hversu mörg entries eru í hvaða flokki og tags.
 * @param {*} data
 * @returns Hlut með upplýsingum um fjölda verkefna, kláruð verkefni, fjöldi verkefna í hverjum flokk og með hvert tag.
 */
function countData() {
  let count = 0;
  const all= [];
  let finishedCount = 0;
  const catCount = {};
  const tagCount = {};
  
  for(let i = 1; i<=window.localStorage.length; i+= 1){
    const parsedItem = JSON.parse(window.localStorage.getItem(i));
    if(parsedItem !== null){
      all[i] = parsedItem;
    }
  }
  
  all.forEach((id) =>{
    if (id.completed === true) {
      finishedCount+=1;
    }
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
    count+=1;
  });
  
  return { tagCount, catCount, count, finishedCount };
}
export function showProjects(id = ''){
    const ul = document.createElement('ul');
    ul.classList.add('projects');
    const container= document.querySelector('.projects-container')
    container.append(ul);
    for(let i = 1; i<=window.localStorage.length; i+= 1){
      let parsedItem;
      if(id !== ''){
        parsedItem = id[i-1];
      }
      else{
        parsedItem = JSON.parse(window.localStorage.getItem(i));
      }
        const newLi = el('li','');
        const title = el('h3',  parsedItem.title);
        ul.appendChild(newLi);
        newLi.append(title);
        const dateTagsContainer = el('div', '');
        dateTagsContainer.classList.add('date-tag-container');

        if(parsedItem.description !== ''){
            const descript = el('p' , parsedItem.description);
            newLi.appendChild(descript);
        }
        newLi.append(dateTagsContainer);
        if(parsedItem.due !== null){
          const date = new Date(parsedItem.due)
          const dateString =(date.toString()).split(' ');
          const dateTime = el('p' , dateString[2], ' ', dateString[1]);
          dateTagsContainer.append(dateTime);
        }
        
        for(const item in parsedItem.tags){
            if(parsedItem.tags[item] !== ''){
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

export function createNewProjectBtn(){
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

export function sortByDate(id =''){
  const all = [];
  for(let i = 1; i<=window.localStorage.length; i+= 1){
    const parsedItem = JSON.parse(window.localStorage.getItem(i));
    if(parsedItem !== null){
      all[i] = parsedItem;
    }
  }
  const ul = document.querySelector('.projects');
  
  // ef title er valið þá sorterum við eftir tilti
  if(id === '2'){
    all.sort((a,b) => {
      const nameA = a.title.toUpperCase(); 
      const nameB = b.title.toUpperCase(); 
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
    return 0;
    });
  }
  
  // ef titill er ekki valinn þá sorterum við eftir dagsetningu
  if(id !== '2'){
    all.sort((a,b)=> a.due-b.due);
  }
  
  // ef forgangur er valinn þá sorterum við einning eftir forgangi
  if(id === '1'){
    all.sort((a,b) => { 
      if(a.priority === b.priority) return 0;
      if(a.priority !== 0) return 1;
      return -1;
    });
  }
  const addNewBtn = document.querySelector('.new-modify-project')
  addNewBtn.remove();
  ul.remove();
  showProjects(all);
  createNewProjectBtn();
}
