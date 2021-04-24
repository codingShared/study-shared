const section = document.querySelector('.section');
const todoInput = document.querySelector('#todo-input');
const allDelete = document.querySelector('.all-delete');
const todoList = document.querySelector('.todo-list');
const likeButton = document.querySelector('.like');

todoInput.addEventListener("keypress", (e)=>{
    
    if(e.keyCode === 13){
        generateTodo(todoInput.value);
        todoInput.value = "";
    }
});

allDelete.addEventListener("click", ()=>{
   

    if(todoList.firstChild){
        while(todoList.firstChild){
                
            todoList.removeChild(todoList.firstChild);
               
        }

         alert('모든 일정이 삭제 되었습니다.'); 
    } else if(todoList.firstChild == null){
        alert('삭제시킬 일정이 없습니다.');
    }
   
    
     
});

const generateTodo = (todo)=>{
    const li = document.createElement("li");
    const likeSpan = generateLike();
    const itemSpan = generateItem(todo);
    const manageSpan = generateManage();
    li.appendChild(likeSpan);
    li.appendChild(itemSpan);
    li.appendChild(manageSpan );
    todoList.appendChild(li);
}

const generateLike = ()=>{
    const span = document.createElement("span");
    span.classList.add("todo-like");
    const icon = document.createElement("i");
    icon.classList.add("material-icons");
    icon.classList.add("like");
    icon.innerText = "favorite_border";
    span.appendChild(icon);
    icon.addEventListener("click", ()=>{
        if(icon.innerText === 'favorite_border'){
            icon.innerText = 'favorite';
        } else{
            icon.innerText = 'favorite_border';
        }
         
    });
    return span;
}

const generateItem = (todo)=>{
    const span = document.createElement("span");
    span.classList.add("todo-item");
    span.innerText = todo;
    return span;
}

const generateManage = ()=>{
    const span = document.createElement("span");
    span.classList.add("todo-manage");
    const icon1 = document.createElement("i");
    const icon2 = document.createElement("i");
    icon1.classList.add("material-icons");
    icon1.classList.add("check");
    icon1.innerText = "check";
    icon2.classList.add("material-icons");
    icon2.classList.add("clear");
    icon2.innerText = "clear";
    icon1.addEventListener("click", (e)=>{
        const li = e.target.parentNode.parentNode;
        li.classList.add("done");
    });
    icon2.addEventListener("click", (e)=>{
        const li = e.target.parentNode.parentNode;
        todoList.removeChild(li);
    });
    span.appendChild(icon1);
    span.appendChild(icon2);
    return span;
}
