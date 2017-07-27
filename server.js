// require express and other modules
var express = require('express'),
    app = express(),
    bodyParser = require('body-parser');

// configure bodyParser (for receiving form and JSON data)
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// serve static files from public folder
app.use(express.static(__dirname + '/public'));

/************
 * DATABASE *
 ************/

// our database is an array for now with some hardcoded values
var todos = [
  { _id: 1, task: 'Laundry', description: 'Wash clothes' },
  { _id: 2, task: 'Grocery Shopping', description: 'Buy dinner for this week' },
  { _id: 3, task: 'Homework', description: 'Make this app super awesome!' }
];

/**********
 * ROUTES *
 **********/

/*
 * HTML Endpoints
 */

app.get('/', function homepage(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


/*
 * JSON API Endpoints
 *
 * The comments below give you an idea of the expected functionality
 * that you need to build. These are basic descriptions, for more
 * specifications, see the todosTest.js file and the outputs of running
 * the tests to see the exact details. BUILD THE FUNCTIONALITY IN THE
 * ORDER THAT THE TESTS DICTATE.
 */

app.get('/api/todos/search', function search(req, res) {
  /* This endpoint responds with the search results from the
   * query in the request. COMPLETE THIS ENDPOINT LAST.
   */
});
var i = 3;
app.get('/api/todos', function index(req, res) {
  console.log("200");
  res.json({todos: todos});
});

app.post('/api/todos', function create(req, res) {
 var newToDo = {
  "_id": req.body._id,
  "task": req.body.task,
  "description": req.body.description
 };
 newToDo._id = (i++);
 res.json(newToDo);
});

app.get('/api/todos/:id', function show(req, res) {
  var ToDoId = parseInt(req.params.id);
  var requestedToDo = todos.filter(function(todo) {
    return todo._id == ToDoId;
  })
  [0];
  res.json(requestedToDo);
  /* This endpoint will return a single todo with the
   * id specified in the route parameter (:id)
   */
});

app.put('/api/todos/:id', function update(req, res) {
  var currentToDo;
  for (var i=0; i<todos.length; i++) {
    if (req.params.id == todos[i]._id) {
      currentToDo = todos[i];
      currentToDo._id = parseInt(req.params.id);
      currentToDo.task = req.body.task;
      currentToDo.description = req.body.description;
      todos.splice(i,1,currentToDo);
    }
  }
  res.json(currentToDo);
  /* This endpoint will update a single todo with the
   * id specified in the route parameter (:id) and respond
   * with the newly updated todo.
   */
});

app.delete('/api/todos/:id', function destroy(req, res) {
  var deletedToDo;
  for (var i=0; i<todos.length; i++) {
    if (req.params.id == todos[i]._id) {
      deletedToDo = todos[i];
      todos.splice(i, 1);
    }
  }
  res.json(deletedToDo);
  /* This endpoint will delete a single todo with the
   * id specified in the route parameter (:id) and respond
   * with deleted todo.
   */
});

/**********
 * SERVER *
 **********/

// listen on port 3000
app.listen(3000, function() {
  console.log('Server running on http://localhost:3000');
});
