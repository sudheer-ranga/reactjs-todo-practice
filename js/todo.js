var Todo = React.createClass({

	getInitialState: function () {
		return {
			tasks: [
				'Task 1',
				'Task 2',
				'Task 3',
				'Task 4',
				'Task 5'
			],
			inputPlaceholder: "I want to "
		};
	},

	addTask: function ( e ) {
		e.preventDefault();

		// var newTaskValue = this.refs.newTask.value;

		var taskDom = ReactDOM.findDOMNode(this.refs.newTask);
		var newTaskValue = taskDom.value;

		var newTask = (newTaskValue !== "undefined" && newTaskValue !== "") ? this.state.tasks.concat( newTaskValue ) : false;

		if (!newTask) return newTask;
		
		this.setState({ tasks: newTask });

		taskDom.value = "";
		taskDom.focus();

		// console.log(JSON.stringify(newTask));
	},

	render: function () {

		return (
			<div>
				<TodoList list={this.state.tasks} />

				<input type="text" ref="newTask" defaultValue={this.state.inputPlaceholder} />
				<button onClick={this.addTask}>Add Task</button>
			</div>
		);
	}
});

var TodoList = React.createClass({
	render: function() {
		var taskList = this.props.list.map(function(task, i) {
				return (
					<li key={i}>{task}</li>
				);
		});

		return (
			<ul>{taskList}</ul>
		);
	}
});

ReactDOM.render(<Todo />, document.getElementById("app"));