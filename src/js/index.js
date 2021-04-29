import '../sass/style.scss';
import 'bootstrap';
import { routes } from './routes'

console.log("here")

let pageArgument;

const setRoute = () => {
    let path = window.location.hash.substring(1).split("/");
    pageArgument = path[1] || "";

    var pageContent = document.getElementById("pageContent");
    routes[path[0]](pageArgument);
};

window.addEventListener("hashchange", () => setRoute());
window.addEventListener("DOMContentLoaded", () => setRoute());

