localStorage.clear();
const $app = document.getElementById('app');
const $observe = document.getElementById('observe');
const API = 'https://rickandmortyapi.com/api/character/';

const getData = api => {
  fetch(api)
    .then(response => response.json())
    .then(response => {
      const characters = response.results;
      let output = characters.map(character => {
        return `
      <article class="Card">
        <img src="${character.image}" />
        <h2>${character.name}<span>${character.species}</span></h2>
      </article>
    `
      }).join('');
      let newItem = document.createElement('section');
      newItem.classList.add('Items');
      newItem.innerHTML = output;
      $app.appendChild(newItem);
      localStorage.setItem("next_fetch", response.info.next)
    })
    .catch(error => console.log(`No podemos conectarnos al API: Error ${error} `));
}

const loadData = async () => {
  let nextUrlPage = localStorage.getItem("next_fetch")
  try {

    if (nextUrlPage)
      await getData(nextUrlPage)

    else if (nextUrlPage === "") {
      console.log("No Existe mas personajes")
      let lastDiv = document.createElement("div");
      lastDiv.classList.add("end");
      lastDiv.innerHTML = `<h1>No Existen mas personajes</h1>`
      $app.appendChild(lastDiv);
      intersectionObserver.unobserve($observe)
    }
    else
      await getData(API)

  } catch (error) {
      console.log (`Ha ocurrido un error al intentar mostrar la info`);
  }

}

const intersectionObserver = new IntersectionObserver(entries => {
  if (entries[0].isIntersecting) {
    loadData();
  }
}, {
  rootMargin: '0px 0px 100% 0px',
});

intersectionObserver.observe($observe);