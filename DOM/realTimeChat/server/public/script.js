let chatWindow = document.querySelector(".chat-window");
let inputBox = document.querySelector(".chat-input");
let myName = document.querySelector(".me .user-name");
let username = prompt("Enter Your Name ");
myName.textContent= username;

inputBox.addEventListener("keypress",function(e){
    if(e.key == "Enter"){
        let userInput = document.createElement('div');
        userInput.classList.add("chat");
        userInput.classList.add("right");
        userInput.textContent = inputBox.value;
        chatWindow.append(userInput);
        socket.emit("chat",{username,"chat":inputBox.value});
        inputBox.value="";
        

    }
});