import { createNewProjectBtn, createCategories, showProjects, sortByDate} from './js/ui.js';
import {empty} from './js/helpers.js';
import { importData, addNewData } from './js/locals.js';
import { getData} from './js/data.js';

// Birtum allt efnið þegar við opnum síðuna
async function fetchAndCreatePage() {
    const data = await getData();
    importData(data);
    createCategories(data);
    showProjects();
    createNewProjectBtn();
    sortByDate('2');
    return data;
  }

// Bætum eventListener við bæta við hnappinn
const addBtn = document.querySelector('.add-btn');
addBtn.addEventListener('click', addProject());

const select = document.querySelector('.select');
select.addEventListener('change', ()=>{
    if(select.value ==='title'){
        sortByDate('2');
    }
    if(select.value === 'date'){
        sortByDate();
    }
    if(select.value === 'priority'){
        sortByDate('1');
    }
});

function addProject(){
    return (e) => {
        e.preventDefault();
        // birtum og felum rétt element
        const projects = document.querySelector('.projects');
        const newProjects =document.querySelector('.new-project');
        projects.classList.remove('hidden')
        newProjects.classList.add('hidden');
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
        const tags = (newTag.value).split(' ');
        newItem.tags = tags;
        const dates = new Date(newDate.value);
        const dateTimeStamp = dates.getTime();
        newItem.due = dateTimeStamp;
        // Bætum nýja verkefninu í localStorage
        addNewData(newItem);
        // Birtum öll verkefnin nú aftur og sorterum eftir því sem er valið
        if(select.value ==='title'){
            sortByDate('2');
        }
        if(select.value === 'date'){
            sortByDate();
        }
        if(select.value === 'priority'){
            sortByDate('1');
        }
        const categoryContainer = document.querySelector('.all-container');
        const tagContainer = document.querySelector('.all-tags');
        const allCountContainer = document.querySelector('.project-count');
        const finishedCountContainer = document.querySelector('.unfinished-count');
        //
        // Uppfærum flokkana og counterana vinstra megin á síðunni
        empty(categoryContainer);
        empty(tagContainer);
        allCountContainer.textContent= '';
        finishedCountContainer.textContent = '';
        createCategories();
    };
}
fetchAndCreatePage();