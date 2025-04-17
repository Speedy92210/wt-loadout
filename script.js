const weaponData = {
  'agm-65d': { name: 'AGM-65D', weight: 240, type: 'guided' },
  'mk82': { name: 'Mk.82', weight: 227, type: 'unguided' },
  'gb12': { name: 'GBU-12', weight: 227, type: 'guided' },
  'empty': { name: 'Empty', weight: 0, type: 'none' }
};

function updateStats() {
  let totalWeight = 0;
  let totalWeapons = 0;

  for (let i = 1; i <= 4; i++) {
    const weapon = document.getElementById(`weapon-${i}`).value;
    totalWeight += weaponData[weapon].weight;
    totalWeapons += weapon === 'empty' ? 0 : 1;
  }

  document.getElementById('weight').textContent = `Weight: ${totalWeight} kg`;
  document.getElementById('total-weapon-count').textContent = `Total Weapons: ${totalWeapons}`;
}

document.querySelectorAll('select').forEach(select => {
  select.addEventListener('change', updateStats);
});

document.getElementById('save-loadout').addEventListener('click', () => {
  const loadout = {};
  for (let i = 1; i <= 4; i++) {
    loadout[`pylon-${i}`] = document.getElementById(`weapon-${i}`).value;
  }
  localStorage.setItem('loadout', JSON.stringify(loadout));
  alert('Loadout saved!');
});

window.addEventListener('load', () => {
  const savedLoadout = JSON.parse(localStorage.getItem('loadout'));
  if (savedLoadout) {
    for (let i = 1; i <= 4; i++) {
      const weapon = savedLoadout[`pylon-${i}`];
      document.getElementById(`weapon-${i}`).value = weapon;
    }
    updateStats();
  }
});
