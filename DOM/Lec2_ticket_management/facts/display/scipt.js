let allFilters = document.querySelectorAll(".ticket-filters div");
let ticketContainer = document.querySelector(".tickets-container");
let addTicket = document.querySelector('.create.action');

let filterCodes = {
    "red":"#e74c3c",
    "blue":"#3498db",
    "green":"#2ecc71",
    "black":"#34495e"
}

function loadTickets(){
  if(localStorage.getItem("allTickets")){
    let allTickets = JSON.parse(localStorage.getItem("allTickets"));
    ticketContainer.innerHTML ="";
    for(let i=0 ; i<allTickets.length ; i++){
      let {ticketId , ticketFilter , ticketContent} = allTickets[i];
      let ticketItem = document.createElement('div');
      ticketItem.classList.add('ticket-item');
      ticketItem.innerHTML =`<div class="ticket-item-priority ${ticketFilter}"></div>
                            <div class="ticket-id">${ticketId}</div>
                            <div class="ticket-content">${ticketContent}</div>`;
      ticketContainer.append(ticketItem);
    }
  }
}
loadTickets();


let selectedFilter = 'black';

for (let i = 0; i < allFilters.length; i++) {
  allFilters[i].addEventListener("click", chooseFilter);
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

//          <<<<<<<<<<<<<<<------------------------------------------------------------------>>>>>>>>>>>>>




// adding ticket in tickets container 

function addingTicket(e){
  if(e.key == 'Enter'){
    let ticketContent = e.target.textContent;
    let ticketId = uid();
    let ticketItem = document.createElement('div');
    ticketItem.classList.add('ticket-item');
    ticketItem.innerHTML =`<div class="ticket-item-priority ${selectedFilter}"></div>
                          <div class="ticket-id">${ticketId}</div>
                          <div class="ticket-content">${ticketContent}</div>`;
    ticketContainer.append(ticketItem);
    e.target.parentNode.remove();
    if(!localStorage.getItem('allTickets')){
      let allTickets =[];
      let ticketObject ={};
      ticketObject.ticketId =ticketId;
      ticketObject.ticketFilter = selectedFilter;
      ticketObject.ticketContent = ticketContent;
      allTickets.push(ticketObject);
      localStorage.setItem('allTickets', JSON.stringify(allTickets));
    }else{
      let allTickets = JSON.parse(localStorage.getItem("allTickets"));
      let ticketObject = {};
      ticketObject.ticketId = ticketId;
      ticketObject.ticketFilter = selectedFilter;
      ticketObject.ticketContent = ticketContent;
      allTickets.push(ticketObject);

      localStorage.setItem("allTickets" , JSON.stringify(allTickets));

    }
    selectedFilter ='black';

  }
}

function chooseFilter(e) {
  if(e.target.classList.contains("active-filter")){
    // if active filter already present !!
    e.target.classList.remove("active-filter");
    loadTickets();
    return;
  }

  // remove active filter from already selected filter
  if(document.querySelector(".filter.active-filter")){
    document.querySelector(".filter.active-filter").classList.remove("active-filter");
  }
  // add active filter on now selected filter !!
  e.target.classList.add("active-filter");
  let ticketFilter = e.target.classList[1];
  loadSelectedTickets(ticketFilter);
}

function loadSelectedTickets(ticketFilter){
  if(localStorage.getItem("allTickets")){
    let allTickets = JSON.parse(localStorage.getItem("allTickets"));
    
    let filteredTickets = allTickets.filter( function(filterObject){
      return filterObject.ticketFilter == ticketFilter;
    });

    // console.log(filteredTickets);

    // empty tickets container
    ticketContainer.innerHTML = "";
    for(let i=0 ; i<filteredTickets.length ; i++){
      let {ticketId , ticketFilter , ticketContent} = filteredTickets[i];
      let ticketItem = document.createElement('div');
      ticketItem.classList.add('ticket-item');
      ticketItem.innerHTML =`<div class="ticket-item-priority ${ticketFilter}"></div>
                            <div class="ticket-id">${ticketId}</div>
                            <div class="ticket-content">${ticketContent}</div>`;
      ticketContainer.append(ticketItem);
      
    }

  }
}