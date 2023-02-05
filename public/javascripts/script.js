document.addEventListener(
  'DOMContentLoaded',
  () => {
    console.log('IronGenerator JS imported successfully!');
  },
  false
);

function hideNavigationBar() {
  document.getElementsByClassName('navbar').style.display = 'none';
}

const recipes = []; // how to get the recipes from the db?

function checkCuisine(cuisine) {
  return (cuisine = document.getElementById('cuisine').value);
}



