export const newProject = e =>
  let formdata = {
    title: document.querySelector()
  }

export async function getData() {
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
