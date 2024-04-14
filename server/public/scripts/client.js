console.log('JS is sourced!');

function getTodoItem(){
    console.log( 'client side request for todo data' );
    // axios call to server to get todos
  
   
      axios({
        method: 'GET',
        url: '/todos'
      })
        .then((response) => {
          console.log("GET /todos response.data", response.data);
          let todos = response.data;
          console.log(todos);

        //  -------------render todos ------------------------- 
        renderTodos(todos)

        })
        .catch((error) => {
          console.log('Error ', error);
        })
    }; // end getting todos


    //this function renders each todoitems and the delete and update button

    getTodoItem()

    function renderTodos(todos) {

        let wheretoPutTodos = document.getElementById('viewTODOs');
        console.log(wheretoPutTodos);
        wheretoPutTodos.innerHTML = ''; 

    
    
    for (let todo of todos) {


    wheretoPutTodos.innerHTML += `
    <tr>
        <td data-testid="toDoItem"> ${todo.text}</td>
        <td data-testid="toDoItem"> ${todo.isComplete}</td> 
        <td>
        <button data-testid="completeButton" onclick="markComplete(${todo.id})" class="completed${todo.id}" >Completion Status</button>
      </td> 
      <td>
      <button data-testid="deleteButton" onclick="deletetoDOitem(${todo.id})">Delete</button>
    </td>

`
// ----- logic within a loop

if (todo.isComplete === true) {
    let completedButton = document.querySelector(`.completed${todo.id}`);
    completedButton.innerText = 'Completed';
    completedButton.classList.add('completed');
} 

// else {
//     completedButton.innerText = 'Completion Status';
//     completedButton.classList.remove('completed');
// }

}
// ------

}


    // ----------------------- post todo item -------------

      //this function allows users to post data that then gets posted to DB using pool
function addToDOitem(event){

    event.preventDefault();
  
    console.log( 'We have a todo-item' );
    // axios call to server to add a todos
    let item = document.getElementById('usertext').value;

  console.log(item);

  let todo = {
    item:item
  }
  
  console.log(todo);

  // clear input fields
  document.getElementById('usertext').value = '';
  
  
  axios({
    method: 'POST',
    url: '/todos',
    data: todo
  })
    .then((response) => {
      // clearForm(); not written yet
      getTodoItem() // <---- this function gets and renders and brings our dom up to date with DB
    }).catch((error) => {
      console.log('Error in post route', error);
    });
  
  
  }
    
//   --------------------------- delete a todo item --------------------------


function deletetoDOitem(id) {
  axios({
    method: "DELETE",
    url: `/todos/${id}`,
  })
  .then(function(response) {
    getTodoItem()// < bringing dom in sync with DB
  })
  .catch(function(error) {
    alert("Error deleting todo item")
  })

}


// ------------------------------------------------- update completion status -----

function markComplete(id) {

  
    axios({
      method: "PUT",
      url: `/todos/${id}`,
    })
    .then(function(response) {

     getTodoItem() // < bringing dom in sync with DB
    })
    .catch(function(error) {
      alert("Error changing todo completion status.")
      console.error("Error changing todo completion status:", error)
    })
  
  }