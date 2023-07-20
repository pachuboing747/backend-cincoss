
const socket = io() 

socket.emit("event", "hola desde el back")
socket.on("evento", (res)=>console.log(res))