let todoinput = document.querySelector('.todo-input');
let todobutton = document.querySelector('.add-todo');
let todolist = document.querySelector('.todo-list');


todobutton.addEventListener("click", function(data){
    let todo = todoinput.value;
    if(todo){
        let listitem = document.createElement('li');
        listitem.classList.add('todo-item');

        let pTag = document.createElement('p');
        pTag.classList.add('todo');
        pTag.innerHTML = todo;

        let deleteButtton = document.createElement('button');
        deleteButtton.classList.add('Delete-todo');
        deleteButtton.innerHTML = 'DELETE TASK'

        listitem.append(pTag);
        listitem.append(deleteButtton)
        todolist.append(listitem);

    }
})

// todoinput.addEventListener("keypress" , function(event){
//     if(event.key == 'Enter'){
//         console.log(event.key)
//     }
    
// })