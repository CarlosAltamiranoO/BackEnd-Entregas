const formCargarProductos = document.querySelector('#formCargarProductos')
const formBorrarProducto = document.querySelector('#formBorrarProducto')
const formModificarProducto = document.querySelector('#formModificarProducto')


if (formCargarProductos instanceof HTMLElement) {
    formCargarProductos.addEventListener('submit', event => {
        event.preventDefault()
        const formData = new FormData(formCargarProductos)
        const data = {}
        formData.forEach((value, key) => (data[key] = value))

        fetch('/api/products', {
            method: 'post',
            body: JSON.stringify(data),
            headers: {
                "content-type": "application/json"
            }
        })
        location.reload()
    })
}
if (formBorrarProducto instanceof HTMLElement) {
    formBorrarProducto.addEventListener('submit', event => {
        event.preventDefault()
        const data = document.getElementById("input_idErase").value;
        fetch(`/api/products/${data}`, { method: 'delete' })
            .then((res) => { if (res.ok) { location.reload() } else { console.log("ah ocurrido un error") } })
    })
}
if (formModificarProducto instanceof HTMLElement) {
    formModificarProducto.addEventListener('submit', event => {
        event.preventDefault()
        const variable = document.getElementById("select").value;
        const valor = document.getElementById("input_Modificar").value;
        const id = document.getElementById("input_idModificar").value;
        const data = {
            [variable]: valor,
        }
        fetch(`/api/products/${id}`, {
            method: 'put',
            body: JSON.stringify(data),
            headers: {
                "content-type": "application/json"
            }
        }) .then((res) => { if(res.ok) {location.reload()} else{console.log("ah ocurrido un error")} })
    })
}