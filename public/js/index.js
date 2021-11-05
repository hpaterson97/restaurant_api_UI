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

    event.preventDefault();
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

    event.preventDefault();
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
};