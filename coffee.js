fetch('coffee.json')
  .then(response => response.json())
  .then(data => {
    let container = document.getElementById('menu-container');

    data.forEach(item => {
      let card = document.createElement('div');
      card.className = 'card';
      card.innerHTML = `
        <img src="${item.img}" alt="${item.name}">
        <h2>${item.name}</h2>
        <p>${item.description}</p>
        <p>${item.price}</p>
      `;
      container.appendChild(card);
    });
  });