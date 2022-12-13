window.onload = function() {
	const LARGEUR_GRILLE = 10;  // Nombre de cases en largeur
    const HAUTEUR_GRILLE = 16;  // Nombre de cases en hauteur
    const CARREAU = 15;	        // Taille en pixels d'une case de la grille
    var canvas;                 // Un canvas est un élément HTML dans lequel on peut dessiner des formes
    var ctx;
	
	// Position de la forme sur la grille
	const X_INITIAL = 5;
	const Y_INITIAL = 0;
    var formX = X_INITIAL;
    var formY = Y_INITIAL;

    // Créer le tableau sur une seule dimension
    var grille = new Array(LARGEUR_GRILLE);
    grille[x] = new Array(HAUTEUR_GRILLE);

	// Numéro de la forme (du tableau "forme") à afficher 
	var numForme = 0;
	// Sélection de la version de la forme à afficher (différentes rotations possibles)
    var rotation = 0;
    //  Couleurs formes
    var couleursFormes = new Array();
    couleursFormes = [ // couleur forme et contour
        ["#FF8c00","#FF00FF","#32CD32","#FFE4C4","#D2691E","#00FFFF","#66CDAA"],
        ["#FFFF00","#4B0082","#7FFF00","#800000","#8B4513","#4682B4","#006400"]
    ]; 
    
	// Tableau de définition des formes
    var forme = new Array();
    forme[0]= [ // Forme 1
        [	// rotation 0
            [0,0,0],
            [1,1,1],
            [0,0,1]
        ],
        [	// rotation 1
            [0,1,0],
            [0,1,0],
            [1,1,0]
        ],
        [	// rotation 2
            [1,0,0],
            [1,1,1],
            [0,0,0]
        ],
        [	// rotation 3
            [0,1,1],
            [0,1,0],
            [0,1,0]
        ]
    ]; 
    
	forme[1] = [ // Forme 2
        [	// rotation 0 (cette forme là n'a besoin que de 2 rotations)
            [0,0,0],
            [0,1,1],
            [1,1,0]
        ],
        [	// rotation 1
            [0,1,0],
            [0,1,1],
            [0,0,1]
        ]
    ];

    forme[2] = [ // Forme 3
        [   // rotation 0 
            [0,0,0],
            [1,1,0],
            [0,1,1]
        ],
        [   // rotation 1
            [0,1,0],
            [1,1,0],
            [1,0,0]
        ]
    ]

    forme[3] = [ // Forme 4
        [   // rotation 0
            [0,1,0],
            [1,1,1],
            [0,0,0]
        ],
        [   // rotation 1
            [0,1,0],
            [0,1,1],
            [0,1,0]
        ],
        [   // rotation 2
            [0,0,0],
            [1,1,1],
            [0,1,0]
        ],
        [   // rotation 3
            [0,1,0],
            [1,1,0],
            [0,1,0]
        ]
    ]

    forme[4] = [ // Forme 5
        [   // rotation 0
            [0,0,0],
            [1,1,1],
            [1,0,0]
        ],
        [   // rotation 1
            [1,1,0],
            [0,1,0],
            [0,1,0]
        ],
        [   // rotation 2
            [0,0,1],
            [1,1,1],
            [0,0,0]
        ],
        [   // rotation 3
            [0,1,0],
            [0,1,0],
            [0,1,1]
        ]
    ]

    forme[5] = [ // Forme 6
        [   // rotation 0
            [0,0,0,0],
            [0,1,1,0],
            [0,1,1,0],
            [0,0,0,0]
        ]
    ]

    forme[6] = [ // Forme 7
        [   // rotation 0
            [0,0,0,0],
            [0,0,0,0],
            [1,1,1,1],
            [0,0,0,0]
        ],
        [   // rotation 1
            [0,0,1,0],
            [0,0,1,0],
            [0,0,1,0],
            [0,0,1,0]
        ]
    ]    

	// !!! Fin du Tableau de définition des formes    
	
	// !!! Fin de déclaration des variables !!!
    /////////////////////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////////////////////////////	    
	// !!! Les fonctions !!!
	
    // drawForme()
	//   Dessine une forme à l'écran 
	//   Variable utilisées :
	//		numForme : numéro de la forme à afficher (tableau forme)
	//		rotation : version de la forme à afficher (tableau forme[numForme])
	//		formX : Position horizontale de la forme sur la grille
	//		formY : Position verticale de la forme sur la grille
    function drawForme() {
		for(x=0 ; x<forme[numForme][rotation].length ; x++) {
			for(y=0 ; y<forme[numForme][rotation].length ; y++) {
                if(forme[numForme][rotation][y][x] == 1) {
                    ctx.fillStyle = couleursFormes[0][numForme]; // Couleur du contour de la forme
                    ctx.fillRect((formX + x) * CARREAU, (formY + y) * CARREAU, CARREAU, CARREAU); // Contour de la forme
                    ctx.fillStyle = couleursFormes[1][numForme]; // Couleur de remplissage de la forme
                    ctx.fillRect((formX + x) * CARREAU + 1, (formY + y) * CARREAU + 1, CARREAU - 2, CARREAU - 2); // Remplissage de la forme
                }
            }
        }
    }

    ///////////////////////////////////////////////////////
    // refreshCanvas()
	//   Rafraichi l'affichage :
	//      - efface le canvas
	//      - dessine la forme
    //      Utilisation de l'objet canvas : https://developer.mozilla.org/fr/docs/Web/API/Canvas_API/Tutorial/Basic_usage
    function refreshCanvas() {
		ctx.clearRect(0,0,LARGEUR_GRILLE * CARREAU, HAUTEUR_GRILLE * CARREAU); // Efface la grille
		drawForme(); // Dessine la forme
        formY++;
        if(formY > 16){
            formY = 0;
        }
        setTimeout(refreshCanvas, 250);
    }
    
    ///////////////////////////////////////////////////////
    // inti()
	//   Initialisation du canvas
    function init() {
        canvas = document.createElement('canvas');
        canvas.width = LARGEUR_GRILLE * CARREAU;
        canvas.height = HAUTEUR_GRILLE * CARREAU;
        canvas.style.border = "1px solid";
        document.body.appendChild(canvas);  // Ajoute le canvas à la page html
        ctx = canvas.getContext('2d');

		refreshCanvas();
    }
    // !!! Fin des fonctions !!!
    /////////////////////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////////////////////////////
    // !!! Code !!!
	// Seule ligne de code... avec la gestion des évènements clavier
    init();

	// Gestion des évènements clavier
    window.addEventListener("keydown", function(event) {
        var key = event.key;
        switch(key) {
            // Remarque : Pour connaitre les "keycodes" : https://keycode.info/
            case 'ArrowUp':  // flèche haut => rotation horaire de la forme
                temp = rotation;	// On mémorise la rotation actuelle
                rotation++; 		// On passe à la rotation suivante
                if(rotation > forme[numForme].length - 1) rotation = 0;
                if(collision()) rotation = temp; // Si la rotation est impossible on revient à la précédente
                break;
            
            case 't':  // toutche t
                numForme++; 
                if(numForme > 6){
                    numForme = 0;
                }
                rotation = 0;
				// pour test, ne fait pas parti du jeu final
				// permet de changer la pièce à afficher (changement de la variable numForme)
                break;
            
            case 'ArrowDown': // flèche bas => rotation anti-horaire de la forme
                temp = rotation;
                rotation--;
                if(rotation < 0) rotation = forme[numForme].length - 1;
                if(collision()) rotation = temp;
                break;

            case 'ArrowRight': // flèche droite => bouge la forme sur la droite
                temp = rotation;
                formX++; 
                if(rotation < 0) rotation = forme[numForme].length - 1;
                if(collision()) rotation = temp;
                break;

            case 'ArrowLeft': // flèche gauche => bouge la forme sur la gauche
                temp = rotation;
                formX--;
                if(formX < 0) rotation = forme[numForme].length - 1;
                if(collision()) rotation = temp;
                break;
        }
      }, true);
}