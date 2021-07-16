let onlineList = document.querySelector(".online-list");
socket.emit("userConnected",username);


socket.on("join",function(joinUser){
    let joinDiv = document.createElement("div");
    joinDiv.classList.add("chat");
    joinDiv.classList.add("join");
    joinDiv.textContent = joinUser.username+" joined chat ";
    chatWindow.append(joinDiv);
    addUserInList(joinUser);
});

socket.on("leave",function(leftUser){
    let leaveDiv = document.createElement("div");
    leaveDiv.classList.add("chat");
    leaveDiv.classList.add("leave");
    leaveDiv.textContent = leftUser.username+" left ";
    chatWindow.append(leaveDiv);
    deleteUserfromList(leftUser.id);
});

socket.on("message",function(chatObj){
    let leftChat =document.createElement("div");
    leftChat.classList.add("chat");
    leftChat.classList.add("left");
    leftChat.textContent = chatObj.chat;
    chatWindow.append(leftChat);
    

});

function addUserInList(user){
    let newUser = document.createElement('div');
    newUser.classList.add("user");
    newUser.setAttribute("id",user.id);
    newUser.innerHTML = ` <div class="user-image">
                            <img src ="user.png">
                        </div>
                        <div class="user-name">${user.username}</div>`;
    onlineList.append(newUser);

}
function deleteUserfromList(userid){
    document.querySelector(`#${userid}`).remove();
}

socket.on("onlineList",function(userList){
    for(let i =0 ; i < userList.length; i++){
        let user = userList[i];
        let newUser = document.createElement('div');
        newUser.classList.add("user");
        newUser.setAttribute("id",user.id);
        newUser.innerHTML = ` <div class="user-image">
                                <img src ="user.png">
                            </div>
                            <div class="user-name">${user.username}</div>`;
        onlineList.append(newUser);

    }
});