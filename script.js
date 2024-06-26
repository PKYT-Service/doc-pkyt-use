document.addEventListener("DOMContentLoaded", function() {
  const menuToggle = document.getElementById('menu-toggle');
  const menuContainer = document.getElementById('menu-container');
  const contentFrame = document.getElementById('contentFrame');

  menuToggle.addEventListener('click', function() {
    if (menuContainer.classList.contains('menu-hidden')) {
      menuContainer.classList.remove('menu-hidden');
      menuToggle.textContent = '✖'; // Icône de fermeture
    } else {
      menuContainer.classList.add('menu-hidden');
      menuToggle.textContent = '☰'; // Icône hamburger
    }
    // Ajuster la largeur du contenu en fonction de l'état du menu
    adjustContentWidth();
  });

  // Fonction pour ajuster la largeur du contenu
  function adjustContentWidth() {
    if (menuContainer.classList.contains('menu-hidden')) {
      contentFrame.style.width = '100%';
    } else {
      contentFrame.style.width = `calc(100% - ${menuContainer.offsetWidth}px)`;
    }
  }

  // Initial call to set the correct width on page load
  adjustContentWidth();

  // Récupérer les URLs des fichiers JSON à partir du fichier de configuration
  fetch('config.json')
    .then(response => response.json())
    .then(config => {
      const officialJsonUrls = config.officialJsonUrls;
      const unofficialJsonUrls = config.unofficialJsonUrls;

      // Charger et afficher les données des fichiers JSON officiels
      officialJsonUrls.forEach(officialJsonUrl => {
        chargerEtAfficherDonnees(officialJsonUrl, true);
      });

      // Charger et afficher les données des fichiers JSON non officiels
      unofficialJsonUrls.forEach(unofficialJsonUrl => {
        chargerEtAfficherDonnees(unofficialJsonUrl, false);
      });
    })
    .catch(error => {
      console.error('Une erreur s\'est produite lors de la récupération du fichier de configuration :', error);
    });

  // Fonction pour charger et afficher les données d'un fichier JSON
  function chargerEtAfficherDonnees(jsonUrl, isOfficial) {
    fetch(jsonUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error('Erreur HTTP ' + response.status);
        }
        return response.json();
      })
      .then(data => {
        afficherMenu(data, isOfficial);
      })
      .catch(error => {
        console.error('Une erreur s\'est produite lors de la récupération du fichier JSON :', error);
      });
  }

  // Fonction pour afficher le menu
  function afficherMenu(data, isOfficial) {
    const menu = document.getElementById('menu');

    // Ajouter l'indicateur officiel ou non officiel en premier
    const indicator = document.createElement('div');
    if (isOfficial) {
      indicator.textContent = '(Officiel)';
      indicator.classList.add('official-indicator');
    } else {
      indicator.textContent = '(Non officiel)';
      indicator.classList.add('unofficial-indicator');
    }
    menu.appendChild(indicator);

    // Ensuite, ajouter les catégories et les liens
    data.forEach(category => {
      const categoryDiv = document.createElement('div');
      categoryDiv.classList.add('category');

      const categoryTitle = document.createElement('h3');
      categoryTitle.textContent = category.categorie;
      categoryDiv.appendChild(categoryTitle);

      const linksList = document.createElement('ul');
      linksList.classList.add('links');

      category.content.forEach(site => {
        const linkItem = document.createElement('li');
        const link = document.createElement('a');
        link.textContent = site['site name'];
        link.href = '#';
        link.dataset.url = site.url;
        link.addEventListener('click', function(event) {
          event.preventDefault();
          contentFrame.classList.remove('show');
          setTimeout(() => {
            contentFrame.src = link.dataset.url;
          }, 500);
        });
        linkItem.appendChild(link);
        linksList.appendChild(linkItem);
      });

      categoryDiv.appendChild(linksList);
      menu.appendChild(categoryDiv);

      categoryTitle.addEventListener('click', function() {
        const links = categoryDiv.querySelector('.links');
        links.classList.toggle('open');
        if (links.classList.contains('open')) {
          links.style.display = 'block';
        } else {
          links.style.display = 'none';
        }
      });

      contentFrame.addEventListener('load', function() {
        contentFrame.classList.add('show');
      });
    });
  }
});
