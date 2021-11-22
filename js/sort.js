import {showProjects, showCompletedProjects, createNewProjectBtn} from './ui.js';

// Sáum enga þæginlega leið en að disablea þetta hér
// Leyfir okkar flokka rétt eftir því hvort einhver flokkur/
// tagg er valið eða hvort öll verkefninu eru völd.
// eslint-disable-next-line import/no-mutable-exports
export let isclicked ='';
/**
 * Flokkar verkefnin eftir því hvað var valið í dropdown listanum
 * @param {*} id Segir til um hvað var valið í listanum
 */
 export function sortBy(id =''){
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
      if (parsedItem !== null && parsedItem !== undefined) {
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
    if(item[0].completed === true){
      showCompletedProjects(item);
      createNewProjectBtn();
    }
    else{
      showProjects(item);
      createNewProjectBtn();
    }
  }