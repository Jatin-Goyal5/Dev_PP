let todoinput = document.querySelector('.todo-input');
let todobutton = document.querySelector('.add-todo');
let todolist = document.querySelector('.todos-list');


todobutton.addEventListener("click", function(data){
    addTodo();
   
})



todoinput.addEventListener("keypress" , function(event){
    if(event.key == 'Enter'){
        addTodo();
    }
    
})

function addTodo(){
    let todo = todoinput.value;
    if(todo){
        // create list element
        let listitem = document.createElement('li');
        listitem.classList.add('todo-item');

        // create pTag
        let pTag = document.createElement('p');
        pTag.classList.add('todo');
        pTag.innerHTML = todo;

        // create deleteButtton
        let deleteButtton = document.createElement('button');
        deleteButtton.classList.add('delete-task');
        deleteButtton.innerHTML = 'DELETE';
        
        deleteButtton.addEventListener('click', function(event){
          event.target.parentNode.remove();  
        })

        // add todo to list Element
        listitem.append(pTag);
        listitem.append(deleteButtton)
        todolist.append(listitem);

        todoinput.value ="";

    }
}