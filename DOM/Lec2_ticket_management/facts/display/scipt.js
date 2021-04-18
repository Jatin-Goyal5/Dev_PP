let allFilters = document.querySelectorAll(".ticket-filters div");
let ticketContainer = document.querySelector(".tickets-container");
let addTicket = document.querySelector('.create.action');

let filterCodes = {
    "red":"#e74c3c",
    "blue":"#3498db",
    "green":"#2ecc71",
    "black":"#34495e"
}

let selectedFilter = 'black';

// [ <div></div> ,<div></div> ,<div></div> ,<div></div>  ];

for (let i = 0; i < allFilters.length; i++) {
  allFilters[i].addEventListener("click", chooseFilter);
}

function chooseFilter(e) {
  let filter = e.target.classList[1];
  let filterCode = filterCodes[filter];
  ticketContainer.style.background = filterCode;
}


// addig detail in ticket action 
addTicket.addEventListener('click', handelModal);

function handelModal(){
  let findModal = document.querySelector('.modal');
  if(findModal){
    return ;
  }
  // get detail adding div 
  let modalDiv = addModal();

  let modalTextbox = modalDiv.querySelector('.modal-textbox');
  modalTextbox.addEventListener('click' ,handleInput);

  modalTextbox.addEventListener('keypress',addingTicket);

  // get all modal filters  
  let allModalFilters = modalDiv.querySelectorAll(".modal-filter");

  for (let i = 0; i < allModalFilters.length; i++) {
    // add a click event on every modal filter
    allModalFilters[i].addEventListener("click", chooseModalFilter);
  }

  ticketContainer.append(modalDiv);
  selectedFilter ='black'
}


/// handle issue text 
function handleInput(e){
  if(e.target.getAttribute('data-type') == 'false'){
    e.target.innerHTML ="";
    e.target.setAttribute('data-type',true)
  }else{
    return;
  }

}


function chooseModalFilter(e){
  let currentSelectedFilter = e.target.classList[1];
  if(currentSelectedFilter == selectedFilter)
    return;
  selectedFilter = currentSelectedFilter;

  document.querySelector('.active-filter').classList.remove('active-filter');

  e.target.classList.add('active-filter');

}



// form div for adding detail
function addModal(){

    let newModel = document.createElement('div');
    console.log(newModel)

    newModel.classList.add('modal');
    newModel.innerHTML = ` <div class="modal-textbox" data-type = "false" contenteditable="true">
                    Enter your task here
                </div>
                <div class="modal-filter-options">
                    <div class="modal-filter red"></div>
                    <div class="modal-filter blue"></div>
                    <div class="modal-filter green"></div>
                    <div class="modal-filter black active-filter"></div>
    
                </div>`;
                console.log(ticketContainer)

    return newModel;

}

//          <<<<<<<<<<<<<<<<<<<<<<<<<<<<<------------------------------------------------------------------>>>>>>>>>>>>>

// adding ticket in tickets container 

function addingTicket(e){
  if(e.key == 'Enter'){
    let ticketContent = e.target.textContent;
  let ticketItem = document.createElement('div');
  ticketItem.classList.add('ticket-item');
  ticketItem.innerHTML =`<div class="ticket-item-priority ${selectedFilter}"></div>
                        <div class="ticket-id">#exampleId</div>
                        <div class="ticket-content">${ticketContent}</div>`;
  ticketContainer.append(ticketItem);
  e.target.parentNode.remove();
  }
  
}

