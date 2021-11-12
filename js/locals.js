export function importData(data) {
  for (const item of data.items) {
    if (!localStorage.item) {
      localStorage.setItem(item.id, JSON.stringify(item));
    }
  }

}
