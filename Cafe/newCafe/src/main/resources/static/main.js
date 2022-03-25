let data = []
const state = {
    menuOpen: null,
    fav: null
}

fetch('/cafes')
    .then(response => response.json())
    .then(_data => {
        data = _data
        render()
    })
    .catch(err => console.error(err))


function getAddFormHtml() {
    return `
        <article class="cafe-card">
            <form onsubmit="event.preventDefault();addCafe(this);">
                <div>
                    <label>Restaurant Name</label>
                    <input name="name" required />
                </div>
                <div>
                    <label>Image URL for Restaurant</label>
                    <input name="image" type="url" required />
                </div>
                <button style="width: 9rem;">Add Restaurant</button>
            </form>
        </article>
    `
}

function render() {
    let content = data.map((cafeData, i) => {
        return `
            <article class="cafe-card">
                <div style="background-image: url('${cafeData.image}');"></div>
                <footer class="cafe-card-footer">
                    <h2 id="${i}-header">${cafeData.name}</h2>
                    <button onclick="displayMenus(${i})">Menus</button>
                </footer>
            </article>
        `
    }).join("")

    content += getAddFormHtml()

    const appEl = document.getElementById('app')
    appEl.innerHTML = content

    if (state.selectedRestaurant) {
        const modalContent = `
            <section class="model-bg">
                <article>
                    <main>
                        ${state.selectedRestaurant.menus.map(menu => {
            return `
                                <article>
                                    <h3>${menu.title}</h3>
                                    <ul>
                                        ${menu.drinks.map(item => {
                return `<li>${item.name} £${item.price}</li>`
            })}
                                    </ul>
                                </article>
                            `
        }).join("")}
                    </main>
                    <footer>
                        <button onclick="loadCreateMenuForm(${state.selectedRestaurant.id})">create Menu</button>
                        <button onclick="closeModel()">close</button>
                    </footer>
                </article>
            </section>
        `
        const modelEl = document.getElementById('model')
        modelEl.innerHTML = modalContent
    } else {
        const modelEl = document.getElementById('model')
        modelEl.innerHTML = ""
    }
}

function displayMenus(index) {
    state.menuOpen = data[index].menus
    render()
}

function addCafe(HTMLform) {
    const form = new FormData(HTMLform)
    const name = form.get('name')
    const image = form.get('image')
    fetch('/cafes', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ name, image })
    })
        .then(res => res.json())
        .then(cafe => {
            data.push(cafe)
            render()
        })
        .catch(console.error)
}
function addItemsToMenu() {
    const name = document.getElementById('item-name')
    const price = document.getElementById('item-price')

    if (!state.newMenu) {
        state.newMenu = {
            name: "",
            items: []
        }
    }

    state.newMenu.items.push({ name: name.value, price: price.value })

    name.value = ""
    price.value = ""

    const menuItemsList = document.getElementById('menu-items')
    menuItemsList.innerHTML = state.newMenu.items.map(item => {
        return `<li>${item.name} £${item.price}</li>`
    }).join("")
}

function updateMenuName(inputValue) {
    if (!state.newMenu) {
        state.newMenu = {
            name: "",
            items: []
        }
    }

    state.newMenu.name = inputValue
}

const addItemsToMenuRequest = new Promise((resolve, reject) => {

})

function addItemToMenuRequest(cafe_id, menu_id, items) {
    return new Promise((resolve, reject) => {

    })

    if (!items.length) return resolve()
    const item = items.pop()
    fetch(`/cafes/${cafe_id}/menus/${menu_id}/drinks`, {
        method: 'POST',
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify({ name: item.name, price: item.price })
    }).then(() => {
        addItemToMenuRequest(cafe_id, menu_id, items)
    }).catch(reject)
}

function submitNewMenu(cafe_id) {
    fetch(`/cafes/${cafe_id}/menus`, {
        method: 'POST',
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify({ title: state.newMenu.name })
    })
        .then(res => res.json())
        .then(menu => {
            return addItemToMenuRequest(cafe_id, menu.id, state.newMenu.items)
        })
        .then(result => {
            console.log(result)
            // clean up
        })
        .catch(console.error)

}

function loadCreateMenuForm(restaurant_id) {
    const createForm = `
        <form onsubmit="event.preventDefault();submitNewMenu(${restaurant_id})">
            <h3>Create a new Menu</h3>
            <input type="hidden" name="restaurant_id" value="${restaurant_id}" /> 
            <div>
                <label>Menu name</label>
                <input name="name" oninput="updateMenuName(this.value)" required />
            </div>
            <ul id="menu-items"></ul>
            <div>
                <label style="display: block;margin-top:1rem;">add items to your new menu</label>
                <input id="item-name" name="item-name" placeholder="menu item"/>
                <input id="item-price" name="item-price" type="number" min="0.00" placeholder="menu item price"/>
                <button type="button" onclick="addItemsToMenu()">+</button>
            </div>
            <button>Create</button>
        </form>
    `
    const mainSectionInModal = document.querySelector('.model-bg > article > main')
    mainSectionInModal.innerHTML = createForm
}
function displayFav(id) {
    const title = document.getElementById(id)
    title.innerHTML += " ♥️"
}

function clearFav(id) {
    const title = document.getElementById(id)
    title.innerHTML = title.innerHTML.substring(0, title.innerHTML.length - 2)
}

function closeModel() {
    state.menuOpen = null
    render()
}