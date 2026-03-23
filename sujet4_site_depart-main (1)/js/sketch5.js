let data;
let taille = ["grand", "moyen"];
let couleur = ["rouge", "vert", "bleu"];
let lines = [];
 
function preload() {
  data = loadJSON("data.json");
}
 
function setup() {
   
  let canvas = createCanvas(windowWidth, windowHeight);
  let c = canvas.elt;
  document.body.appendChild(c);
  c.style.cssText = 'position:fixed!important;top:0!important;left:0!important;z-index:1!important;pointer-events:none!important;width:100vw!important;height:100vh!important;';
  canvas.style('position', 'fixed');
  canvas.style('z-index', '1');
  canvas.style('pointer-events', 'none');
 

 
  for (let i = 0; i < 60; i++) {
    lines.push(newLine());
  }
 
  let smsListe = data.corpus.sms;
  for (let i = 0; i < smsListe.length * 2; i++) {
    let smsData = smsListe[i % smsListe.length];
    let texte = smsData.cont;
    if (typeof texte == "object") texte = texte.__text;
    let p = createP(texte);
    p.addClass(random(taille));
    p.addClass(random(couleur));
  }
}
 
function draw() {
 
  clear();
  if (!lines || lines.length === 0) return;
  for (let l of lines) {
    drawShape(l);
    updateLine(l);
  }
}
 
function newLine() {
  let types = ['line', 'bezier', 'arc', 'zigzag', 'spiral'];
  return {
    type: random(types),
    x1: random(width), y1: random(height),
    x2: random(width), y2: random(height),
    cx1: random(width), cy1: random(height),
    cx2: random(width), cy2: random(height),
    r: random(20, 200),
    a1: random(TWO_PI), a2: random(TWO_PI),
    segments: floor(random(4, 12)),
    col: [random(255), random(255), random(255)],
    sw: random(2, 6),
    speed: random(0.3, 2),
    angle: random(TWO_PI),
    life: 0,
    maxLife: random(120, 400),
  };
}
 
function drawShape(l) {
  let alpha = map(l.life, 0, l.maxLife * 0.2, 0, 255);
  if (l.life > l.maxLife * 0.7) alpha = map(l.life, l.maxLife * 0.7, l.maxLife, 255, 0);
 
  stroke(l.col[0], l.col[1], l.col[2], alpha);
  strokeWeight(l.sw);
  noFill();
 
  if (l.type === 'line') {
    line(l.x1, l.y1, l.x2, l.y2);
  } else if (l.type === 'bezier') {
    bezier(l.x1, l.y1, l.cx1, l.cy1, l.cx2, l.cy2, l.x2, l.y2);
  } else if (l.type === 'arc') {
    arc(l.x1, l.y1, l.r * 2, l.r * 2, l.a1, l.a2);
  } else if (l.type === 'zigzag') {
    beginShape();
    for (let i = 0; i <= l.segments; i++) {
      let x = lerp(l.x1, l.x2, i / l.segments);
      let y = lerp(l.y1, l.y2, i / l.segments) + (i % 2 === 0 ? -40 : 40);
      vertex(x, y);
    }
    endShape();
  } else if (l.type === 'spiral') {
    beginShape();
    for (let a = 0; a < l.segments * TWO_PI; a += 0.15) {
      let rad = map(a, 0, l.segments * TWO_PI, 0, l.r);
      vertex(l.x1 + cos(a + l.angle) * rad, l.y1 + sin(a + l.angle) * rad);
    }
    endShape();
  }
}
 
function updateLine(l) {
  l.life++;
  l.x1 += cos(l.angle) * l.speed * 0.3;
  l.y1 += sin(l.angle) * l.speed * 0.3;
  l.x2 += cos(l.angle + 1) * l.speed * 0.3;
  l.y2 += sin(l.angle + 1) * l.speed * 0.3;
  l.angle += 0.005;
  if (l.life >= l.maxLife) lines[lines.indexOf(l)] = newLine();
}
 
function windowResized() {
  if (lines && lines.length > 0) resizeCanvas(windowWidth, windowHeight);
}
 