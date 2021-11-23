/**
 * Tökum efnið út data.json og setjum í localStorage, ef það er ekki núþegar þar
 * @param {*} data
 */
export function importData(data) {
  for (const item of data.items) {
    if (!(item.id in localStorage)) {
      localStorage.setItem(item.id, JSON.stringify(item));
    }
  }
}
/**
 * Bætum nýju itemi í localStorage
 * @param {} data
 */
export function addNewData(data) {
  localStorage.setItem(data.id, JSON.stringify(data));
}
