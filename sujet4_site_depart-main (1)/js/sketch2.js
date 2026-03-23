let data;
let taille = ["grand", "moyen", "petit",'dessin'];
let couleur = ["rouge", "vert", "bleu"];

function preload() {
  data = loadJSON("data.json");
}

function setup() {
  //Chager le corpus
  
  let smsListe = data.corpus.sms;
  //connaître le nbr de sms
  let nbrSms = smsListe.length;
  console.log("nombre de sms : " + nbrSms);

  //afficher un sms aléatoire :
  let texte = random(smsListe).cont;
  if (typeof texte == "object") {
    texte = texte.__text;
  }
  console.log(texte);

  //Parcourir toute la liste
  for (let i = 0; i < smsListe.length*2; i++) {
    let smsData = smsListe[i % smsListe.length];
    let texte = smsData.cont;

    if (typeof texte == "object") {
      texte = texte.__text;
    }

    //pour chaque sms on crée une balise p
    let p = createP(texte);

    //on ajoute aléatoirement des classes à ces balises pour les modifiers en css
     let c = map(i,0,smsListe.length,0,100); 
  
    // p.style("color", "hsl(90, 50%, " + c + "%)");
    p.addClass(random(taille));
    p.addClass(random(couleur));
  }
}
