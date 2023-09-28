let pokemonRepository = function () {
  let t = []; function e() { return t } async function i() { try { let e = await fetch("https://pokeapi.co/api/v2/pokemon/?limit=45"), i = await e.json(); i.results.forEach(function (e) { var i = { name: e.name, detailsUrl: e.url }; t.push(i) }) } catch (a) { console.error("Error loading Pok\xe9mon list", a) } } async function a(t) { try { let e = await fetch(t.detailsUrl), i = await e.json(), a = i.abilities.map(t => t.ability.name); t.abilities = a.join(", "); let n = i.types.map(t => t.type.name); t.types = n.join(", "), t.imgUrl = i.sprites.front_default, t.height = i.height, t.weight = i.weight } catch (l) { console.error("Error loading Pok\xe9mon details", l) } } return {
    getAll: e, addListItem: function t(e) {
      let i = document.createElement("li"); i.classList.add("col-12", "col-md-4", "mb-2"); let a = document.createElement("button"); a.textContent = e.name, a.classList.add("pokemon-button", "btn", "btn-block", "btn-lg", "w-100", "mb-3"), i.appendChild(a), a.setAttribute("data-toggle", "modal"), a.setAttribute("data-target", "#exampleModal"), a.setAttribute("data-name", e.name), a.setAttribute("data-img", e.imgUrl), a.setAttribute("data-height", e.height), a.setAttribute("data-weight", e.weight), a.setAttribute("data-abilities", e.abilities), a.setAttribute("data-types", e.types), i.appendChild(a), a.addEventListener("click", function () {
        let t = document.querySelector(".modal-title"), e = document.querySelector(".modal-body"), i = a.getAttribute("data-name"), n = a.getAttribute("data-img"), l = a.getAttribute("data-height"), o = a.getAttribute("data-weight"), s = a.getAttribute("data-types"), r = a.getAttribute("data-abilities"); t.textContent = i, e.innerHTML = `
        <img src="${n}" class="modal-img" style="width: 40%;">
        <p>Height: ${l}</p>
        <p>Weight: ${o}</p>
        <p>Types: ${s}</p>
        <p>Abilities: ${r}</p>
      `}); document.querySelector(".pokemon-list").appendChild(i)
    }, loadList: i, loadDetails: a, showModal: function t(e) {
      let i = document.getElementById("modal-body"), a = `
   <div class="pokemon-details">
     <h3>${e.name}</h3>
     <img src="${e.imgUrl}">
     <p>Height: ${e.height}</p>
     <p>Weight: ${e.weight}</p>
     <p>Types: ${e.types.map(t => t.type.name).join(", ")}</p>
     <p>Abilities: ${e.abilities.map(t => t.ability.name).join(", ")}</p>
   </div>
 `; i.innerHTML = a
    }
  }
}(); function showSearchBar() { document.querySelector(".search-container").classList.remove("d-none"); let t = document.querySelector(".search-wrapper"); t && (t.style.display = "d-none") } async function initialize() { let t = document.getElementById("pokeball"); t.classList.add("spinning"), await pokemonRepository.loadList(); let e = document.getElementById("realtime-search"); e.style.display = "block", e.addEventListener("input", function () { let t = this.value.toLowerCase(); !function t(e) { let i = document.querySelectorAll(".pokemon-button"); i.forEach(function (t) { let i = t.textContent.toLowerCase(); i.includes(e) ? t.parentElement.style.display = "block" : t.parentElement.style.display = "none" }) }(t) }), t.addEventListener("click", async function () { t.classList.remove("spinning"), t.style.display = "none"; let e = document.getElementById("pokeball-container"); e && (e.style.display = "none"), setTimeout(async () => { let t = document.getElementById("pokemon-container"); if (t) { t.style.display = "block", t.classList.remove("d-none"); let e = pokemonRepository.getAll(); for (let i of e) await pokemonRepository.loadDetails(i), pokemonRepository.addListItem(i) } }, 1e3) }) } document.addEventListener("DOMContentLoaded", function () { let t = document.querySelector("#pokeball"); t && t.addEventListener("click", function () { showSearchBar() }) }), initialize();

/* eslint quotes: "off" */