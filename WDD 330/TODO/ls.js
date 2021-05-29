function addItemToLocalStorage(key, value) {
    try {
        localStorage.setItem(key, value)
    } catch (error) {
        console.log(error.message)
    }
}

function getItemFromLocalStorage(key) {
    return JSON.parse(localStorage.getItem(key))
}