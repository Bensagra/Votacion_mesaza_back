async function loadFoods() {
  const res = await fetch('https://votacion-mesaza-back.vercel.app/food');
  const data = await res.json();

  const container = document.getElementById('packs');
  container.innerHTML = '';

  data.forEach(chapter => {
    const pack = document.createElement('div');
    pack.className = 'pack';

    const foodsList = document.createElement('div');
    foodsList.className = 'foods';

    chapter.foods.forEach(food => {
      const foodDiv = document.createElement('div');
      foodDiv.className = 'food';
      foodDiv.innerHTML = `
        <img src="${food.imageUrl}" alt="${food.name}" />
        <p>${food.name}</p>
      `;
      foodsList.appendChild(foodDiv);
    });

    const voteButton = document.createElement('button');
    voteButton.innerText = 'Votar este pack';
    voteButton.onclick = async () => {
      await fetch('https://votacion-mesaza-back.vercel.app/vote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chapterId: chapter.id }),
      });
      alert('¡Gracias por tu voto!');
    };

    pack.appendChild(foodsList);
    pack.appendChild(voteButton);
    container.appendChild(pack);
  });
}

loadFoods();