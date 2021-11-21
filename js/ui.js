import { el} from './helpers.js';
import { addNewData } from './locals.js';

// Sáum enga þæginlega leið en að disablea þetta hér
// Leyfir okkar flokka rétt eftir því hvort einhver flokkur/
// tagg er valið eða hvort öll verkefninu eru völd.
// eslint-disable-next-line import/no-mutable-exports
export let isclicked ='';

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
      const newCat = el('a', items);
      newCat.href = '';
      newCat.classList.add('sort-category');
      newCat.addEventListener('click', () => sortByProject(newCat.textContent));
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
        const newCat = el('a', items);
        newCat.href = '';
        newCat.classList.add('sort-category');
        newCat.addEventListener('click', () => sortByProject(newCat.textContent));
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
    for(let i = 0; i<=window.localStorage.length; i+= 1){
      let parsedItem;
      if(id !== ''){
        if(id[i]){
          parsedItem = id[i];
        }
      }
      else{
        parsedItem = JSON.parse(window.localStorage.getItem(i));
      }

      const newLi = el('li','');
      const projectButton = el('button','');
      projectButton.classList.add('modify-project-button');
      if(parsedItem !== null && parsedItem !== undefined){
        console.log(parsedItem.id);
        projectButton.addEventListener('click', () => modifyProject(parsedItem.id));
      }
    
      const dateTagsContainer = el('div', '');
      
      if (parsedItem !== null && parsedItem !== undefined) {
        const title = el('h3',  parsedItem.title);
        title.classList.add('project-title');
        ul.appendChild(newLi);
        newLi.append(projectButton);
        projectButton.append(title);
        dateTagsContainer.classList.add('date-tag-container');
        if(parsedItem.description !== ''){
          const descript = el('p' , parsedItem.description);
          descript.classList.add('desc');
          projectButton.appendChild(descript);
        }
        projectButton.append(dateTagsContainer);
        if(parsedItem.due !== null){
          const date = new Date(parsedItem.due)
          const dateString =(date.toString()).split(' ');
          const dateTime = el('p' , dateString[2], ' ', dateString[1]);
          dateTime.classList.add('date-tag-container-dagsetning');
          dateTagsContainer.append(dateTime);
        }

        for(const item in parsedItem.tags){
            if(parsedItem.tags[item] !== ''){
                const tag = el('button', parsedItem.tags[item])
                tag.classList.add('date-tag-container-tag');
                dateTagsContainer.append(tag);
            }
        }
        if(parsedItem.category !== ''){
          const category = el('p' , parsedItem.category);
          category.classList.add('date-tag-container-category');
          dateTagsContainer.appendChild(category);
        }
      }
    }
    
}

export function modifyProject(id) {
  const modify = document.querySelector('.modify-project');
  const he = document.querySelector('.new-project');
  const ul = document.querySelector('.projects');
  const modButton = document.querySelector('.change-btn');
  const newItem = {};
  const item = JSON.parse(localStorage.getItem(id));

  const newTitle = document.querySelector('.mod-title');
  const newDescription = document.querySelector('.mod-description');
  const newDate = document.querySelector('.mod-duedate');
  const newTag = document.querySelector('.mod-tags');
  const newCat = document.querySelector('.mod-category');

  newTitle.value = item.title;
  newDescription.value = item.description;
  const date = new Date(item.due);
  
  // TODO þarf að setja eitthvað if statemnt til að láta date virka
  // semsagt ef mánuður er minni en 10 þarf að bæta 0 fyrir framan date.getmonth og alveg eins með dagana
  const correctDate =`${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`;
  newDate.value = correctDate;

  newItem.id = item.id
  newItem.title = newTitle.value;
  newItem.description = newDescription.value;
  newItem.category = newCat.value;
  newItem.priority = false;
  const tags = (newTag.value).split(' ');
  newItem.tags = tags;
  const dates = new Date(newDate.value);
  const dateTimeStamp = dates.getTime();
  newItem.due = dateTimeStamp;
  modButton.addEventListener('click', modbutton(newItem));
  
  // Setjum hvert tagg inn
  for(let i = 0; i < item.tags.length; i+=1){
    newTag.value += item.tags[i];
    newTag.value += ' ';
  }
  modify.classList.remove('hidden');
  he.classList.add('hidden');
  ul.classList.add('hidden');
  //return item;
}

export function modbutton(newItem) {
  return (e) => {
    e.preventDefault();

    console.log(newItem);
    const modify = document.querySelector('.modify-project');
    const he = document.querySelector('.new-project');
    const ul = document.querySelector('.projects');
    addNewData(newItem);
    modify.classList.add('hidden');
    he.classList.add('hidden');
    ul.classList.remove('hidden');
  }
}

export function createNewProjectBtn(){
  const newProjectBtn = el('button', 'Búa til nýtt verkefni');
  const ul = document.querySelector('.projects');
  ul.append(newProjectBtn);
  newProjectBtn.classList.add('new-modify-project');
  newProjectBtn.addEventListener('click', ()=>{
    const he = document.querySelector('.new-project');
    const modify = document.querySelector('.modify-project');
    he.classList.remove('hidden');
    ul.classList.add('hidden');
    modify.classList.add('hidden');
  } )
}

/**
 * Flokkar verkefnin eftir því hvað var valið í dropdown listanum
 * @param {*} id Segir til um hvað var valið í listanum
 */
export function sortByDate(id =''){
  const all = [];
  isclicked = '';
  for(let i = 1; i<=window.localStorage.length; i+= 1){
    const parsedItem = JSON.parse(window.localStorage.getItem(i));
    if(parsedItem !== null){
      all[i] = parsedItem;
    }
  }
  const ul = document.querySelector('.projects');
  
  // ef title er valið þá sorterum við eftir titli
  if(id === 'title'){
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
  if(id !== 'title'){
    all.sort((a,b)=> a.due-b.due);
  }
  
  // ef forgangur er valinn þá sorterum við einning eftir forgangi
  if(id === 'priority'){
    all.sort((a,b) => { 
    if(a.priority === b.priority){
      return 0;
      } 
    if(a.priority){
        return -1;
      } 
    return 1;
    });
  }
  const addNewBtn = document.querySelector('.new-modify-project')
  addNewBtn.remove();
  ul.remove();
  showProjects(all);
  createNewProjectBtn();
}

/**
 * Hópar saman öll verkefni sem tengjast þeim flokki eða taggi sem var
 * valið vinstra megin á skjánum
 * @param {*} id 
 */
export function sortByProject(id = ''){
  isclicked = id;
  window.event.preventDefault();
  const allInCat = [];
  const allCompleted = [];
  for(let i = 1; i<=window.localStorage.length; i+= 1){
    const parsedItem = JSON.parse(window.localStorage.getItem(i));
      if(parsedItem.category === id){
        allInCat[i] = parsedItem;
      }
      for(const item of parsedItem.tags){
          if(item === id){
              allInCat[i] = parsedItem;
          }
      }
      if(id === 'Kláruð verkefni'){
        if(parsedItem.completed === true){
          allCompleted[i] = parsedItem;
        }
    }
  }
  const ul = document.querySelector('.projects');
  ul.remove();
  if(id === 'Kláruð verkefni'){
    sortSelectedCat(allCompleted);
  }
  else{
    sortSelectedCat(allInCat);
  }
}

/**
 * Tekur við verkefnum sem á að sýna, flokkar þau rétt og sýnir þau svo
 * @param {} item 
 */
function sortSelectedCat(item) {
  const select = document.querySelector('.select');
  // ef title er valið þá sorterum við eftir titli
  if(select.value === 'title'){
   item.sort((a,b) => {
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
  if(select.value !== 'title'){
    item.sort((a,b)=> a.due-b.due);
  }

  // ef forgangur er valinn þá sorterum við einning eftir forgangi
  if(select.value === 'priority'){
    item.sort((a,b) => { 
    if(a.priority === b.priority){
      return 0;
      } 
    if(a.priority){
        return -1;
      } 
    return 1;
    });
  }
  showProjects(item);
  createNewProjectBtn();
}