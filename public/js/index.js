async function deleteRestaurant(btn) {
    const id = btn.getAttribute("data-id");
    const response = await fetch(`http://localhost:3002/api/restaurants/${id}`, { method: "DELETE"});

    if (response.ok) {
        window.location = "/restaurants"
    }
};
async function deleteMenu(btn) {
    const id = btn.getAttribute("data-id");
    const restId = btn.getAttribute("rest");
    const response = await fetch(`http://localhost:3002/api/restaurants/${restId}/menus/${id}`, { method: "DELETE"});

    if (response.ok) {
        window.location = "/restaurants"
    }
};

async function updateRestaurant(event) {

    const form = event.target;

    const data = {
        id: form.restaurantId.value,
        name: form.name.value,
        imagelink: form.imagelink.value
    };

    const url = `http://localhost:3002/api/restaurants/${data.id}`;

    const response = await fetch(url, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body:  JSON.stringify(data),
    });
    
    if (response.ok) {
        window.location = `/restaurants`
    }
};
async function updateMenu(event) {

    const form = event.target;

    const data = {
        id: form.menuId.value,
        name: form.name.value,
        restId: form.restId.value
    };

    const url = `http://localhost:3002/api/restaurants/${data.restId}/menus/${data.id}`;

    const response = await fetch(url, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body:  JSON.stringify(data),
    });
    
    if (response.ok) {
        window.location = `/restaurants/${data.restId}/menus`
    }
}
async function updateMenuItem(event) {

    const form = event.target;

    const data = {
        id: form.menuItemId.value,
        name: form.name.value,
        price: form.price.value,
        menuId: form.menuId.value
    };

    const url = `http://localhost:3002/api/menus/${data.menuId}/menuitems/${data.id}`;

    const response = await fetch(url, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body:  JSON.stringify(data),
    });
    
    if (response.ok) {
        window.location = `/menus/${data.menuId}/menuitems`
    }
};