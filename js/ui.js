import { getData } from "./data.js"
import { el } from "./helpers.js";
export async function fetchAndCreatePage(){
    const data = await getData();
    createCategories(data);
}
/**
 * Býr til yfirlitið yfir alla flokka og tags og upplýsingar um fjölda verkefna.
 * @param {*} data upplýsingar um verkefnin okkar
 */
function createCategories(data){
    const counts = countData(data);
    for(let i = 0; i < data.categories.length; i++){
        const ge = document.createElement('div');
        ge.classList.add('category__container');
        let newCat = el("h3", data.categories[i].title);
        const he = document.querySelector('.project__categories');
        he.append(ge);
        ge.append(newCat);
        for(let items in counts.catCount){
            if(items === data.categories[i].id){
                const counter = el("p", `${counts.catCount[items]}`);
                ge.append(counter);
            }
        }
    }
    for(let items in counts.tagCount){
        const ge = document.createElement('div');
        ge.classList.add('category__container');
        let newCat = el("h3", items);
        const he = document.querySelector('.project__tags');
        he.append(ge);
        ge.append(newCat);
        const counter = el("p", `${counts.tagCount[items]}`);
        ge.append(counter);
    }
    const projectCount = document.querySelector('.project__count');
    projectCount.textContent = counts.count;

    const unfinishedCount = document.querySelector('.unfinished__count');
    unfinishedCount.textContent = counts.finishedCount;
}

/**
 * Teljum hversu mörg entries eru í hvaða flokki og tags.
 * @param {*} data 
 * @returns Hlut með upplýsingum um fjölda verkefna, kláruð verkefni, fjöldi verkefna í hverjum flokk og með hvert tag.
 */
function countData(data){
    let count = 0;
    let finishedCount = 0;
    let catCount = {};
    let tagCount = {};
    const items = data.items;
   items.forEach((id) =>{
        if(id.completed === true){
            finishedCount++;
        }
        count++
   })
   for(let row of items){
        if (!catCount[row.category]) {
            catCount[row.category] = 0;
        }
        catCount[row.category] += 1;
    }
    for(let row of items){
        for(let tag of row.tags){
            if (!tagCount[tag]) {
                tagCount[tag] = 0;
            }
            tagCount[tag] += 1;
        }
    }
    
    return {tagCount, catCount, count,finishedCount};
}