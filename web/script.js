var login = null
var navegacio = null
var popups = null
var seccioBackofficeUsuaris = null
var seccioFrontendProductes = null

// Aquesta funció s'inicia al carregar la pàgina
async function inicia () {

    // Iniciem els objectes globals
    login = new ObjLogin()
    navegacio = new ObjNavegacio()
    popups = new ObjPopups()
    seccioBackofficeUsuaris = new ObjSeccioBackofficeUsuaris()
    seccioFrontendProductes = new ObjSeccioFrontendProductes()

    // Inicia les funcions de navegació HTML5
    navegacio.inicia()

    // Fem que els botons de navegació endavant i endarrera mostrin el canvi de secció
    window.onpopstate = function (evt) {
        if (evt.state === null) {
            navegacio.mostraSeccio('frontendHome')
        } else {
            navegacio.mostraSeccio(evt.state.html)
        }
    }

    // Si tenim guardat un usuari i un token intentem identificar-lo
    await login.autenticaAmbToken()
}

function iniciaSeccio(seccio) {
    switch(seccio) {
    case 'frontendProductes': seccioFrontendProductes.iniciaSeccio(); break
    case 'backofficeUsuaris': seccioBackofficeUsuaris.iniciaSeccio(); break
    default:
    }
}

var imagenslider = 2
function slider(direccion) {
    let ref = document.getElementsByName('sliderportada'),
        cnt = 0
    if (direccion =='anterior') {
        imagenslider = imagenslider - 1
        if (imagenslider < 0) {
            imagenslider = ref.length - 1
        }
    }

    if (direccion =='siguiente') {
        imagenslider = imagenslider + 1
        if (imagenslider >= ref.length) {
            imagenslider = 0
        }
    }
    console.log(imagenslider)
    for (cnt = 0; cnt < ref.length; cnt = cnt + 1) {
        ref[cnt].style.display = 'none'
        if (cnt == imagenslider) {
            ref[cnt].style.display = 'flex'
        }
    }

}

function mostrar() {
    document.getElementById("sidebar").style.width = "300px";
    document.getElementById("abrir").style.transform = "translateY(-20px)";
    document.getElementById("sidebarFondo").style.display = "flex";

    
}

function ocultar() {
    document.getElementById("sidebar").style.width = "0";
    document.getElementById("abrir").style.transform = "translateY(0px)";
    document.getElementById("sidebarFondo").style.display = "none";
}
