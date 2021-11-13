import { createNewProjectBtn, createCategories, showProjects } from './js/ui.js';
import {el, empty} from './js/helpers.js';
import { importData, addNewData } from './js/locals.js';
import { getData} from './js/data.js';

// Birtum allt efnið þegar við opnum síðuna
async function fetchAndCreatePage() {
    const data = await getData();
    importData(data);
    createCategories(data);
    showProjects();
    createNewProjectBtn();
    return data;
  }

// Bætum eventListener við bæta við hnappinn
const addBtn = document.querySelector('.add-btn');
addBtn.addEventListener('click', addProject());


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
        //console.log(newItem);
        addNewData(newItem);
        
        // Eyðum bætaviðverkefni takkanum og bætum við aftur neðst
        const addNewBtn = document.querySelector('.new-modify-project')
        addNewBtn.remove();

        // birtum nýja verkefnið á síðuna
        const container = document.querySelector('.projects');
        const newLi = el('li','');
        const title = el('h3',  newItem.title)
        container.appendChild(newLi);
        newLi.append(title);
        const dateTagsContainer = el('div', '');
        dateTagsContainer.classList.add('date-tag-container');

        if(newItem.description !== ''){
            const descript = el('p' , newItem.description);
            newLi.appendChild(descript);
        }
        newLi.append(dateTagsContainer);
        const date = new Date(newItem.due)
        const dateString =(date.toString()).split(' ');
        const dateTime = el('p' , dateString[2], ' ', dateString[1]);
        dateTagsContainer.append(dateTime);
        
        for(const item in newItem.tags){
            if(newItem.tags !== ''){
                const tag = el('button', newItem.tags[item])
                dateTagsContainer.append(tag);
            }
        }
        if(newItem.category !== ''){
          const category = el('p' , newItem.category);
          dateTagsContainer.appendChild(category);
        }
        createNewProjectBtn();
        const categoryContainer = document.querySelector('.project-categories');
        const tagContainer = document.querySelector('.project-tags');
        const allCountContainer = document.querySelector('.project-count');
        const finishedCountContainer = document.querySelector('.unfinished-count');
        empty(categoryContainer);
        empty(tagContainer);
        allCountContainer.textContent= '';
        finishedCountContainer.textContent = '';
        createCategories();
    };
}
fetchAndCreatePage();