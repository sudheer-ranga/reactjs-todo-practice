var Todo = React.createClass({

	mixins: [ReactFireMixin],

	getInitialState: function () {
		return {
			tasks: []
		};
	},

	componentWillMount: function() {
	  this.firebaseRef = new Firebase('https://popping-heat-9730.firebaseio.com/');

	  this.firebaseRef.limitToLast(25).on('value', function(dataSnapshot) {
	  	console.log("dataSnapshot");
	  	console.log(dataSnapshot);

      var tasks = [];
      dataSnapshot.forEach(function(childSnapshot) {
        var task = childSnapshot.val();
        task['.key'] = childSnapshot.key();
        tasks.push(task);
      }.bind(this));

      this.setState({
        tasks: tasks
      });
    }.bind(this));

	},

	addTask: function ( e ) {
		e.preventDefault();
		event.stopPropagation();

		// var newTaskValue = this.refs.newTask.value;

		var taskDom = ReactDOM.findDOMNode(this.refs.newTask);
		var newTaskValue = taskDom.value.trim();

		if(newTaskValue) {
			var newTaskObject = {
				title: newTaskValue,
				completed: false
			}

			this.setState({ tasks: this.state.tasks.concat( newTaskObject ) });

			this.firebaseRef.push(newTaskObject);

			console.log("Task Entered");
			taskDom.value = "";
			taskDom.focus();
		}
	},

	render: function () {

		return (
			<div>
				<TodoList list={this.state.tasks} />

				<form onSubmit={this.addTask}>
					<input type="text" ref="newTask" autoFocus />
					<button type="submit">Add Task</button>
				</form>
			</div>
		);
	}
});

var TodoList = React.createClass({
	render: function() {
		var taskList = this.props.list.map(function(task, i) {
				return (
					<li key={i}>{task.title}</li>
				);
		});

		return (
			<ul>{taskList}</ul>
		);
	}
});

ReactDOM.render(<Todo />, document.getElementById("app"));