import { fetchAndCreatePage } from './js/ui.js';

fetchAndCreatePage();
const addBtn = document.querySelector('.add-btn');
addBtn.addEventListener('click', () => {
    const projects = document.querySelector('.projects');
    const newProjects =document.querySelector('.new-project');
    projects.classList.remove('hidden')
    newProjects.classList.add('hidden');
})