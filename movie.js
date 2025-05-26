document.getElementById('tombol').addEventListener('click', () => {
  let button = document.getElementById('tombol')
  button.style.display = 'none';
  fetch('Datamovie.json')
    .then(res => res.json())
    .then(movie => {
      let container = document.getElementById('movie-container');
      
      movie.forEach(movies => {
        let card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
          <img src="${movies.img}" alt="">
          <h2>${movies.title}</h2>
          <p>${movies.genre}</p>
        `;
        container.appendChild(card);
      });
    });
});