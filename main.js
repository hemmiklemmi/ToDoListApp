/* eslint-disable import/no-cycle */
import { createNewProjectBtn, createCategories, 
         showProjects, showCompletedProjects} from './js/ui.js';
import {sortByProject, sortBy, isclicked} from './js/sort.js';
import { importData, addNewData } from './js/locals.js';
import { getData} from './js/data.js';

const select = document.querySelector('.select');

// Birtum allt efnið þegar við opnum síðuna
async function fetchAndCreatePage() {
    const data = await getData();
    importData(data);
    createCategories(data);
    showProjects();
    createNewProjectBtn();
    sortBy('title');
  }

// Bætum eventListener við dropdown listann svo það flokkist rétt
select.addEventListener('change', ()=>{
    if(isclicked === ''){
        sortBy(select.value);
    }
    else{
        sortByProject(isclicked);
    }
  });

  // Bætum eventListener við hnappana
const addBtn = document.querySelector('.add-btn');
const addp = document.querySelector('.addp');
const modButton = document.querySelector('.change-btn');
const modp = document.querySelector('.change-confirm');
addBtn.addEventListener('click',addProject());
addp.addEventListener('click', addProject());
modButton.addEventListener('click', modbutton());
modp.addEventListener('click', modbutton());


const showAll = document.querySelector('.show-projects');
const showFinished = document.querySelector('.show-finishedprojects');
showAll.addEventListener('click', () => {
    window.event.preventDefault();
    sortBy(select.value);
});
   
showFinished.addEventListener('click', () => sortByProject(showFinished.textContent));

const deleteBtn = document.querySelector('.delete-button');
const deletep = document.querySelector('.deletep');
deleteBtn.addEventListener('click',deleteProject());
deletep.addEventListener('click',deleteProject());


function addProject(){
    return (e) => {
        e.preventDefault();
        const newTitle = document.querySelector('.title');

        // Ef ekkert er sett í titil, þá býst verkefnið ekki til
        if(newTitle.value === ''){
            newTitle.placeholder = 'Ekki er hægt að búa til verkefni án titils!';
        }
        else{
            // birtum og felum rétt element
        const dropList = document.querySelector('.dropdown-list');
        const projects = document.querySelector('.projects');
        const newProjects =document.querySelector('.new-project');
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
        const newItem = {}
        const id = window.localStorage.length +1
        newItem.id = id;
        newItem.title = newTitle.value;
        newItem.description = newDescription.value;
        newItem.category = newCat.value;
        newItem.priority = priority.checked;
        const tags = (newTag.value).split(' ');
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
        const finishedCountContainer = document.querySelector('.unfinished-count');
        
        // Uppfærum flokkana og counterana vinstra megin á síðunni
        categoryContainer.remove();
        tagContainer.remove();
        allCountContainer.textContent= '';
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

export function modbutton() {
    return (e) => {
      e.preventDefault();
      const newTitle = document.querySelector('.mod-title');
      if(newTitle.value === ''){
        newTitle.placeholder = 'Ekki er hægt að hafa verkefni án titils!';
        }
      else{
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
        const tags = (newTag.value).split(' ');
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
        const addNewBtn = document.querySelector('.new-modify-project')
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
    }
}

function deleteProject(){
    return (e) => {
        e.preventDefault();
        const item =JSON.parse(window.localStorage.getItem(deleteBtn.id));
        item.deleted = true;
        localStorage.setItem(item.id, JSON.stringify(item));
        if(isclicked === ''){
            sortBy(select.value);
        }
        else{
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
        allCountContainer.textContent= '';
        finishedCountContainer.textContent = '';
        createCategories();
        
    
    }
}
export function completeProject(id){
        const item =JSON.parse(window.localStorage.getItem(id));
        item.completed = true;
        localStorage.setItem(item.id, JSON.stringify(item));
        console.log(id);
        if(isclicked === ''){
            sortBy(select.value);
        }
        else{
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
        allCountContainer.textContent= '';
        finishedCountContainer.textContent = '';
        createCategories();
        
    
}
export function unCompleteProject(id){
    const item =JSON.parse(window.localStorage.getItem(id));
      item.completed = false;
      localStorage.setItem(item.id, JSON.stringify(item));
      const projects = document.querySelector('.projects');
      const addNewBtn = document.querySelector('.new-modify-project')
      addNewBtn.remove();
      projects.remove();
      const categoryContainer = document.querySelector('.all-container');
      const tagContainer = document.querySelector('.all-tags');
      const allCountContainer = document.querySelector('.project-count');
      const finishedCountContainer = document.querySelector('.unfinished-count');
      categoryContainer.remove();
      tagContainer.remove();
      allCountContainer.textContent= '';
      finishedCountContainer.textContent = '';
      createCategories();
      showCompletedProjects();
      createNewProjectBtn();
}

fetchAndCreatePage();