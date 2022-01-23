/**
 * loads buttons for all the routename in routes.js
 * 
 * @param {void}
 * @returns {void}
 */
window.onload = () => {

    loadRoute('index')

    let routesElement = '<div class="topnav">'
    routes.map(route => {
        // routesElement += `<button name='` + route.route + `' onclick=loadRoute(this.name)>${route.route}</button>`
        routesElement += `<a href="javascript:void(0);" class='` + route.route + `' name='` + route.route + `' onclick=loadRoute(this.name)>${route.route}</a>`

    })
    routesElement += '</div>'
    document.getElementById('routes').innerHTML = routesElement
}

/**
 * Loads routename to URL as param arg
 * 
 * @param {name}
 * @returns {void}  
 */
const loadRoute = (name) => {
    let parmsArg = '?route=' + name
    window.history.replaceState(null, null, parmsArg)
    init()
    return false
}

/**
 * Loads JS file to the HTML
 * 
 * @param {file} 
 * @returns {void}
 */
const loadJS = (file) => {
    document.getElementById('scriptsdiv').innerHTML = ""
    var script = document.createElement('script')
    script.src = file
    document.getElementById('scriptsdiv').appendChild(script)
    script.onload = function () { app(); app = null }
    clearURL()
}

/**
 * clears String parameters after the content is rendered
 * @param {void}
 * @returns {void}
 */


const clearURL = () => {
    let currentURL = window.location.href.split('?')[0];
    window.history.replaceState(null, null, currentURL)
}

/**
 * checks route params in routes and sends routefile specified for the route
 * 
 * @param {void}
 * @returns {void}
 */
const init = () => {
    var urlparams = new URLSearchParams(window.location.search)
    var routeParam = urlparams.get("route")
    for (route of routes) {
        if (routeParam == route.route) {
            loadJS(route.routefile)
            break
        }
    }
}

