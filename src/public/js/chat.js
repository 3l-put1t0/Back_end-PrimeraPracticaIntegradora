const socket = io();

let user;
let chatBox = document.getElementById("chatBox");

Swal.fire({
    title: "CHAT",
    input: "text",
    text: "Ingresa un nombre",
    icon: "success",
    inputValidator: (value) =>{
        return !value && '!Es obligatorio escribir un nombre para ingresar al chat'
    },
    allowOutsideClick: false
}).then(result => {
    user = result.value.trim();   
    user = user.toUpperCase();
});

// Escucha los eventos y envía la información
chatBox.addEventListener("keyup", event =>{
    if (event.key === 'Enter'){
        if (chatBox.value.trim().length > 0) {
            socket.emit('message', {
                user,
                message: chatBox.value
            });
            chatBox.value = "";
        }
    }
});

socket.on('messageLogs', data => {
    let loadMessage = document.getElementById("messageLogs");
    let message = "";
    data.forEach(element => {
        message += `<p><strong>${element.user}:</strong> ${element.message}</p>`;
    });
    loadMessage.innerHTML = message;
});