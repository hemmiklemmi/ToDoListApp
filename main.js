import { createNewProjectBtn, createCategories, showProjects, sortByDate,
        countData, sortByProject, isclicked} from './js/ui.js';
import {empty} from './js/helpers.js';
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
    sortByDate('title');
  }

// Bætum eventListener við dropdown listann svo það flokkist rétt
select.addEventListener('change', ()=>{
    if(isclicked === ''){
        sortByDate(select.value);
    }
    else{
        sortByProject(isclicked);
    }
  });

  // Bætum eventListener við hnappana
const addBtn = document.querySelector('.add-btn');
const modButton = document.querySelector('.change-btn');
addBtn.addEventListener('click', addProject());
modButton.addEventListener('click', modbutton());

const showAll = document.querySelector('.show-projects');
const showFinished = document.querySelector('.show-finishedprojects');
showAll.addEventListener('click', () => {
    window.event.preventDefault();
    sortByDate(select.value);
});
   
showFinished.addEventListener('click', () => sortByProject(showFinished.textContent));

const deleteBtn = document.querySelector('.delete-button');
deleteBtn.addEventListener('click',deleteProject());


function addProject(){
    return (e) => {
        e.preventDefault();
        
        // birtum og felum rétt element
        const projects = document.querySelector('.projects');
        const newProjects =document.querySelector('.new-project');
        const modProject = document.querySelector('.modify-project');
        projects.classList.remove('hidden');
        newProjects.classList.add('hidden');
        modProject.classList.add('hidden');
        
        // búum til nýtt object með öllum upplýsingum um verkefnið
        const newTitle = document.querySelector('.title');
        const newDescription = document.querySelector('.description');
        const newDate = document.querySelector('.duedate');
        const newTag = document.querySelector('.tags');
        const newCat = document.querySelector('.category');
        const newItem = {}
        const id = window.localStorage.length +1
        newItem.id = id;
        newItem.title = newTitle.value;
        newItem.description = newDescription.value;
        newItem.category = newCat.value;
        newItem.priority = false;
        const tags = (newTag.value).split(' ');
        newItem.tags = tags;
        const dates = new Date(newDate.value);
        const dateTimeStamp = dates.getTime();
        newItem.due = dateTimeStamp;
       
        // Bætum nýja verkefninu í localStorage
        addNewData(newItem);
        
        // Birtum öll verkefnin nú aftur og sorterum eftir því sem er valið
        sortByDate(select.value);
    
        const categoryContainer = document.querySelector('.all-container');
        const tagContainer = document.querySelector('.all-tags');
        const allCountContainer = document.querySelector('.project-count');
        const finishedCountContainer = document.querySelector('.unfinished-count');
        
        // Uppfærum flokkana og counterana vinstra megin á síðunni
        empty(categoryContainer);
        empty(tagContainer);
        allCountContainer.textContent= '';
        finishedCountContainer.textContent = '';
        createCategories();
    };
}

export function modbutton() {
    return (e) => {
      e.preventDefault();
      const modify = document.querySelector('.modify-project');
      const he = document.querySelector('.new-project');
      const ul = document.querySelector('.projects');
      const newTitle = document.querySelector('.mod-title');
      const newDescription = document.querySelector('.mod-description');
      const newDate = document.querySelector('.mod-duedate');
      const newTag = document.querySelector('.mod-tags');
      const newCat = document.querySelector('.mod-category');
      const newItem = {};
   
      newItem.id = deleteBtn.id;
      newItem.title = newTitle.value;
      newItem.description = newDescription.value;
      newItem.category = newCat.value;
      newItem.priority = false;
      const tags = (newTag.value).split(' ');
      newItem.tags = tags;
      const dates = new Date(newDate.value);
      const dateTimeStamp = dates.getTime();
      newItem.due = dateTimeStamp;
  
      addNewData(newItem);
      
      // Getum gert þetta í stað reloads til að fá upplýsingar strax inn
      const addNewBtn = document.querySelector('.new-modify-project')
      addNewBtn.remove();
      ul.remove();
      showProjects();
      createNewProjectBtn();
      
      modify.classList.add('hidden');
      he.classList.add('hidden');
      ul.classList.remove('hidden');
    }
}

function deleteProject(){
    return (e) => {
        e.preventDefault();
        console.log(deleteBtn.id);
        const item =JSON.parse(window.localStorage.getItem(deleteBtn.id));
        console.log(item);
        item.deleted = true;
        localStorage.setItem(item.id, JSON.stringify(item));
        if(isclicked === ''){
            sortByDate(select.value);
        }
        else{
            sortByProject(isclicked);
        }

        const modify = document.querySelector('.modify-project');
        const he = document.querySelector('.new-project');
        const ul = document.querySelector('.projects');
        
        const categoryContainer = document.querySelector('.all-container');
        const tagContainer = document.querySelector('.all-tags');
        const allCountContainer = document.querySelector('.project-count');
        const finishedCountContainer = document.querySelector('.unfinished-count');
        modify.classList.add('hidden');
        he.classList.add('hidden');
        ul.classList.remove('hidden');
        // Uppfærum flokkana og counterana vinstra megin á síðunni
        
        // Smá bögg ennþá hérna, ef maður deletar tvisvar í röð án refresh
        //empty(categoryContainer);
        //empty(tagContainer);
        //allCountContainer.textContent= '';
        //finishedCountContainer.textContent = '';
        //createCategories();
        
    
    }
}

fetchAndCreatePage();