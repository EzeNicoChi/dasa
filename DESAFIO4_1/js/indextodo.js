/* ---------- Utilidades de pantalla ---------- */
var ACENTO = {1:'#10b981', 2:'#3b82f6', 3:'#f59e0b', 4:'#a855f7'};

function campo(id, etiqueta, extra) {
  return '<div class="campo"><label for="'+id+'">'+etiqueta+'</label><input type="number" id="'+id+'" '+extra+'></div>';
}
function salida(html) { document.getElementById('resultado').innerHTML = html; }

// Dibuja un ejercicio dentro de un panel con cabecera de color y botón para volver
function pintar(n, icono, titulo, desc, cuerpo) {
  document.title = titulo;
  document.getElementById('barra').className = 'top en-ejercicio';
  var v = document.getElementById('vista');
  v.style.setProperty('--c', ACENTO[n]);
  v.innerHTML = '<section class="panel"><header><div class="ico">'+icono+'</div><h2>'+titulo+'</h2><p>'+desc+'</p></header>' +
    '<div class="cuerpo">'+cuerpo+'<div class="result" id="resultado">Los resultados aparecerán aquí.</div>' +
    '<div class="pie"><button type="button" class="volver" onclick="mostrarVista(5)">← Volver al menú</button></div></div></section>';
  window.scrollTo(0, 0);
}

function tarjeta(n, icono, titulo, desc) {
  return '<button type="button" class="tarjeta" style="--c:'+ACENTO[n]+'" onclick="mostrarVista('+n+')">' +
    '<span class="num">'+n+'</span><div class="ico">'+icono+'</div><h3>'+titulo+'</h3><p>'+desc+'</p></button>';
}

/* ---------- SWITCH PRINCIPAL: 5 ramas ----------
   1 = Ejercicio 12 | 2 = Ejercicio 13 | 3 = Capítulo IX | 4 = Capítulo VIII | 5 = Volver al menú */
function mostrarVista(opcion) {
  switch (opcion) {
    case 1:
      pintar(1, '🧮', 'Quadroots', 'Resuelve la ecuación ax² + bx + c = 0',
        campo('valA','Valor de a','step="any" placeholder="Ej: 3"') + campo('valB','Valor de b','step="any" placeholder="Ej: 6"') +
        campo('valC','Valor de c','step="any" placeholder="Ej: 3"') +
        '<button type="button" class="accion" onclick="resolverEcuacion()">Calcular raíces</button>');
      break;
    case 2:
      pintar(2, 'π', 'Estimación de Pi', 'Fórmula: π ≈ √(6 · Σ 1/n²), con n desde 1 hasta el valor ingresado',
        campo('valN','Valor de n (ej: 100, 10000, 1000000)','min="1" placeholder="Ej: 100"') +
        '<button type="button" class="accion" onclick="calcularPi()">Calcular Pi</button>');
      break;
    case 3:
      pintar(3, '🔮', 'El Enigma del Astrólogo', 'Capítulo IX · Calcula el año de nacimiento a partir de la edad',
        campo('valAnio','Año actual','value="2026"') + campo('valEdad','Edad de la persona','placeholder="Ej: 30"') +
        '<button type="button" class="accion" onclick="resolverAstrologo()">Calcular año</button>');
      break;
    case 4:
      pintar(4, '🏺', 'Las 21 Vasijas', 'Capítulo VIII · Repartir 7 llenas, 7 semillenas y 7 vacías entre 3 personas en partes iguales',
        '<button type="button" class="accion" onclick="resolverVasijas()">Mostrar solución</button>');
      break;
    case 5:
      document.title = 'Proyecto Integrado - 4 Ejercicios';
      document.getElementById('barra').className = 'top';
      var m = document.getElementById('vista');
      m.style.removeProperty('--c');
      m.innerHTML = '<div class="hero"><h1>Panel Principal</h1><p>Elige un ejercicio o capítulo para abrirlo</p></div><div class="grid">' +
        tarjeta(1,'🧮','Ejercicio 12: Quadroots','Ecuación cuadrática ax² + bx + c = 0') +
        tarjeta(2,'π','Ejercicio 13: Estimación de Pi','Aproximación con la sumatoria de 1/n²') +
        tarjeta(3,'🔮','Capítulo IX: El Astrólogo','Cálculo del año de nacimiento') +
        tarjeta(4,'🏺','Capítulo VIII: Las 21 Vasijas','Reparto equitativo entre 3 personas') + '</div>';
      window.scrollTo(0, 0);
      break;
    default:
      mostrarVista(5);
  }
}

/* ---------- Lógica de los ejercicios ---------- */
function resolverEcuacion() {
  var a = parseFloat(document.getElementById('valA').value);
  var b = parseFloat(document.getElementById('valB').value);
  var c = parseFloat(document.getElementById('valC').value);
  if (isNaN(a) || isNaN(b) || isNaN(c)) { salida('Por favor, ingrese todos los valores numéricos.'); return; }
  if (a === 0) { salida('El valor de a no puede ser 0 (no sería una ecuación cuadrática).'); return; }
  var D = b * b - 4 * a * c;
  var msg = '<strong>Discriminante (D):</strong> ' + D.toFixed(4) + '<br><br>';
  if (D > 0) {
    msg += 'The equation has two roots,<br>Raíz 1: ' + ((-b + Math.sqrt(D)) / (2 * a)).toFixed(4) +
           '<br>Raíz 2: ' + ((-b - Math.sqrt(D)) / (2 * a)).toFixed(4);
  } else if (D === 0) {
    msg += 'The equation has one root,<br>Raíz: ' + (-b / (2 * a)).toFixed(4);
  } else {
    msg += 'The equation has no real roots.';
  }
  salida(msg);
}

function calcularPi() {
  var n = parseInt(document.getElementById('valN').value);
  if (isNaN(n) || n <= 0) { salida('Por favor, ingrese un número entero válido mayor a 0.'); return; }
  var suma = 0;
  for (var i = 1; i <= n; i++) { suma += 1 / (i * i); }
  var est = Math.sqrt(6 * suma);
  salida('<strong>Resultados con n = ' + n.toLocaleString() + ':</strong><br>' +
    '• <strong>Pi estimado:</strong> ' + est.toFixed(8) + '<br>' +
    '• <strong>Pi real (Math.PI):</strong> ' + Math.PI.toFixed(8) + '<br>' +
    '• <strong>Diferencia:</strong> ' + Math.abs(Math.PI - est).toExponential(4));
}

function resolverAstrologo() {
  var anio = parseInt(document.getElementById('valAnio').value);
  var edad = parseInt(document.getElementById('valEdad').value);
  if (isNaN(anio) || isNaN(edad) || edad < 0) { salida('Por favor, ingrese valores numéricos válidos.'); return; }
  salida('<strong>Resultado del Capítulo IX:</strong><br>• <strong>Año actual:</strong> ' + anio +
    '<br>• <strong>Edad ingresada:</strong> ' + edad + ' años<br>• <strong>Año de nacimiento calculado:</strong> ' + (anio - edad));
}

function resolverVasijas() {
  var porPersona = 21 / 3, vino = (7 * 1 + 7 * 0.5) / 3;
  function fila(p, l, s, v) {
    return '<div class="persona"><strong>' + p + '</strong><span>' + l + ' llenas · ' + s + ' semillenas · ' + v + ' vacías</span><span>7 vasijas · 3.5 de vino</span></div>';
  }
  salida('<strong>Resultado del reparto equitativo:</strong><br>Cada persona recibe <strong>' + porPersona +
    ' vasijas</strong> y <strong>' + vino + ' unidades de vino</strong>.' +
    fila('Persona 1', 3, 1, 3) + fila('Persona 2', 3, 1, 3) + fila('Persona 3', 1, 5, 1));
}

mostrarVista(5);