const chartContainer = document.getElementById('chart');

function animateRandomBars(chapters) {
  chartContainer.innerHTML = '';
  chapters.forEach(chapter => {
    const barWrapper = document.createElement('div');
    barWrapper.className = 'bar-wrapper';

    const bar = document.createElement('div');
    bar.className = 'bar';
    bar.style.height = Math.floor(Math.random() * 250 + 30) + 'px';

    const label = document.createElement('div');
    label.className = 'bar-label';
    label.innerText = '?';

    const name = document.createElement('div');
    name.className = 'bar-name';
    name.innerText = chapter.name;

    bar.appendChild(label);
    barWrapper.appendChild(bar);
    barWrapper.appendChild(name);
    chartContainer.appendChild(barWrapper);
  });

  let count = 0;
  const interval = setInterval(() => {
    chartContainer.querySelectorAll('.bar').forEach(bar => {
      bar.style.height = Math.floor(Math.random() * 250 + 30) + 'px';
    });
    count++;
    if (count >= 10) {
      clearInterval(interval);
      showRealResults();
    }
  }, 200);
}

async function showRealResults() {
  const res = await fetch('https://votacion-mesaza-back.vercel.app/totalVotes');
  const data = await res.json(); // [{ id, name, votes }]

  const maxVotes = Math.max(...data.map(c => c.votes || 1));

  const barWrappers = document.querySelectorAll('.bar-wrapper');
  barWrappers.forEach((wrapper, i) => {
    const bar = wrapper.querySelector('.bar');
    const label = wrapper.querySelector('.bar-label');

    const height = Math.round((data[i].votes / maxVotes) * 250);
    bar.style.height = `${height}px`;
    label.innerText = data[i].votes;
  });
}

async function init() {
  const res = await fetch('https://votacion-mesaza-back.vercel.app/totalVotes');
  const data = await res.json();
  animateRandomBars(data);
}

init();