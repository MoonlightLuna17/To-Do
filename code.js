let todo = document.getElementById('todo');
let add = document.getElementById('add');
let toDoList = [];
let toDoArray = JSON.parse(localStorage.getItem('To_Do_List')) || [];
let doneArray = JSON.parse(localStorage.getItem('Done_List')) || [];
let todostuff = document.getElementById('todolist');
let donestuff = document.getElementById('donelist');

console.log(donestuff);

function showOne (item, index) {
	console.log((index + 1) + ':' + item);
	todostufflist = todostufflist + toDoString;
	return todostufflist;
}

function showToDos() {
	let todos = '';
	for(let i = 0; i < toDoArray.length; i++) {
		let itemthing = document.getElementById('pendinglistitem').innerText;
		let toDoString = itemthing.replace('{{item}}', toDoArray[i]);
		toDoString = toDoString.replace('{{id}}', i);
		todos = todos + toDoString;	
	}
	todostuff.innerHTML = todos;
	let startMessage = document.getElementById('startMessage');
	if (toDoArray.length !== 0){
		startMessage.className = 'hide';
	} else {
		startMessage.className = 'show';
	}
}

function showDone() {
	let dones = '';
	for(let i = 0; i < doneArray.length; i++) {
		let itemthing = document.getElementById('donelistitem').innerText;
		let completedString = itemthing.replace('{{item}}', doneArray[i]);
		completedString = completedString.replace('{{id}}', i);
		dones = dones + completedString;	
	}
	let startMessageDone = document.getElementById('startMessageDone');
	if (doneArray.length !== 0){
		startMessageDone.className = 'hide';
	} else {
		startMessageDone.className = 'show';
	}
	donestuff.innerHTML = dones;
}

function showBoth() {
	showToDos();
	showDone();
}

function completeItem() {
	let todobody = document.getElementById('todobody');
	todobody.addEventListener('click', event => {
		if (event.target.nodeName.toLowerCase() == 'img') {
			event.stopPropagation();
			let id = event.target.id;
			let done = toDoArray.splice(id, 1);
			doneArray.push(done[0])
			stringify = JSON.stringify(doneArray);
  			localStorage.setItem('Done_List', stringify);
  			console.log(localStorage.Done_List)

			stringify = JSON.stringify(toDoArray);
  			localStorage.setItem('To_Do_List', stringify);
  			showBoth();
		}
	});
	/*let deleteit = document.getElementsByClassName('delete');
	deleteit.addEventListener('click', event => {
		console.log('clicked');
	});*/
}

function deleteItem() {
	let donebody = document.getElementById('donebody');
	donebody.addEventListener('click', event => {
		if (event.target.nodeName.toLowerCase() == 'img') {
			event.stopPropagation();
			let id = event.target.id;
			let deleted = doneArray.splice(id, 1);
			stringify = JSON.stringify(doneArray);
			localStorage.setItem('Done_List', stringify);

			console.log('deleting '+ deleted);
  			showBoth();
		}
	});
}

add.addEventListener('click', event => {
	addToDo();
});

function addToDo() {
	 if (todo.value !== '') {
 		toDoArray.push(todo.value);
  		todo.value = '';
  		stringify = JSON.stringify(toDoArray);
  		localStorage.setItem('To_Do_List', stringify);
  		showBoth();
 	}
}
function addToDoWithKey() {
	document.addEventListener('keydown', event => {
		if (event.code == 'Enter') {
			addToDo();
		}
	})
}
showBoth();
completeItem();
deleteItem();

addToDoWithKey();
