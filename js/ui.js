import { getData } from "./data.js"
import { el } from "./helpers.js";
export async function fetchAndCreatePage(){
    const data = await getData();
    createCategories(data);

}
function createCategories(data){
    for(let i = 0; i < data.categories.length; i++){
        const ge = document.createElement('div');
        ge.classList.add('title__and__count');
        let newCat = el("h3", data.categories[i].title);
        const he = document.querySelector('.project__categories');
        he.append(ge);
        ge.append(newCat);
    }
    for(let i = 0; i < data.tags.length; i++){
        const ge = document.createElement('div');
        ge.classList.add('title__and__count');
        let newCat = el("h3", data.tags[i].title);
        const he = document.querySelector('.project__tags');
        he.append(ge);
        ge.append(newCat);
        
    }
    const counteddata =countData(data);
    counteddata.forEach((items) =>{
        console.log(items);
    })
    const projectCount = document.querySelector('.project__count');
    projectCount.textContent = counteddata[0];

    const unfinishedCount = document.querySelector('.unfinished__count');
    unfinishedCount.textContent = counteddata[1];
}
function countData(data){
    let count = 0;
    let finishedCount = 0;
    let Catcount = {};
    let Tagcount = {};
    const items = data.items;
    const tags = data.tags;
    //console.log(categories);
   // data.items.forEach((items) =>{
   //     categories.forEach((element) => {
   //         if(items.category === element.id){
   //             if (element.id === "vefforrit"){
   //                 count[element.id]++;
   //             }
   //             if(element.id === "skipulag"){
   //                 count[element.id]++;
   //             }
   //             if(element.id === "vefþjónustur"){
   //                 count[element.id]++;
   //             }
   //         }
   //     });
   // })
   items.forEach((id) =>{
        if(id.completed === true){
            finishedCount++;
        }
        count++
   })
   //console.log(count);
   //console.log(finishedCount);
    items.forEach(function (o) {
        if (!Catcount.hasOwnProperty(o.category)) {
            Catcount[o.category] = 0;
        }
        Catcount[o.category] += 1;
    });
    
    //console.log(Catcount);
    
    items.forEach(function (o) {
        if (!Tagcount.hasOwnProperty(o.tags)) {
            Tagcount[o.tags] = 0;
        }
        Tagcount[o.tags] += 1;
    });
    
    //console.log(Tagcount);
        
    items.forEach(function (o) {
        if (!Catcount.hasOwnProperty(o.category)) {
            Catcount[o.category] = 0;
        }
        Catcount[o.category] += 1;
    });
    
    //console.log(Catcount);
    //const ye = el('p', `${vefforritcount}`);
    //container.append(ye);
    const finalData = [count,finishedCount,Catcount,Tagcount];
    return finalData;
}
fetchAndCreatePage();