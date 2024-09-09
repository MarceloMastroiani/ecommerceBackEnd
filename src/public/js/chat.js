const socket = io()
let myUserName = "";

const userNameTitle = document.getElementById("userNameTitle")
const messageInput = document.getElementById("messageInput")
const messagesLog = document.getElementById("messagesLog")


socket.on("chat messages",({messages})=> {
    messagesLog.innerHTML= ""
    messages.forEach(m => {
        messagesLog.innerHTML+= `${myUserName}: ${m.message}<br/>`
    });
})

messageInput.addEventListener("keyup",(e)=>{
    if(e.key == "Enter") {
        socket.emit("new message", {
            user: myUserName, 
            message: e.target.value 
        })
        e.target.value = ""
    }
})

Swal.fire({
    title: "Login",
    text: "Introduce tu email para continuar.",
    input: "email",
    allowOutsideClick: false
}).then((result)=>{
    myUserName = result.value;
    userNameTitle.innerHTML = myUserName;
})