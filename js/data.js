export async function getData(){
    try {
        const result = await fetch('../data.json');
        if (!result.ok) {
          throw new Error('result not ok');
        }
        const data = await result.json();
        return await data;
      } catch (e) {
        console.warn('unable to fetch', e);
        return null;
      }
}
export async function printData(){
    const a = await getData();
    console.log(a);
    for(let i = 0; i <3 ;i++){
        console.log(a.categories[i].id);
    }
}
