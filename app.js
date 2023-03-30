var filterTexts=document.querySelectorAll(".filter-text");
var allofText=document.querySelector("#all");
var addTask=document.querySelector("#add-task");
var tasks=document.querySelector(".tasks");
var addButton=document.querySelector(".add-button");


var editId;

var state;

let gorevler=[ ]

if(localStorage.getItem("gorevler")!==null){

    gorevler=JSON.parse(localStorage.getItem("gorevler"))
}

const showMissions= (filter) =>{

    tasks.innerHTML="";

    if(gorevler.length==0){

        tasks.innerHTML='<p class="empty-field">Görev Listesi Boş</p>'

    }else{
    
        for(gorev of gorevler){
    
        if(gorev.gorevdurum=="completed"){
            state="checked";
        }else{
            state="";
        } 

        if(filter==gorev.gorevdurum || filter=="all"){

        var addMissionTag=`<div class="task-field" >
        <div>
            <input id="${gorev.gorevid}" onclick="changeState(this)" class="task-checkbox" type="checkbox" name="" ${state}>
            <label class="task-label ${state}" >${gorev.gorevadı}</label>
        </div>
        
        <div class="icons">               
            <i class="fa-sharp fa-solid fa-trash" onclick="removeTask(${gorev.gorevid})"></i>
            <i class="fa-solid fa-pen" onclick='editTask(${gorev.gorevid},"${gorev.gorevadı}")'></i>
        </div>
    
        </div>`

        tasks.insertAdjacentHTML("beforeend",addMissionTag);
        
        }
        
    }
    }   
}

window.addEventListener("load",showMissions("all"));

const clearAll= () =>{
    
    gorevler.splice(0,gorevler.length);
    localStorage.setItem("gorevler",JSON.stringify(gorevler));
    showMissions("all");
    
}

const filter= (element) =>{
    for(eleman of filterTexts){
        eleman.classList.remove("selected-title");
    }

    element.classList.add("selected-title");
    showMissions(element.id);
    
}

allofText.addEventListener("click",showMissions(document.querySelector(".selected-title").id));

const addMission= ()=>{

    if(addTask.value==""){

        alert("Boş Metin Eklenemez");

    }else{ 
        
        if(addButton.textContent=="Edit"){

        for(gorev of gorevler){

            if(gorev.gorevid==editId){

                gorev.gorevadı=addTask.value;
                
            }
            
        }

            addButton.textContent="Ekle";
            addTask.value="";
            showMissions(document.querySelector(".selected-title").id);
            
        }else{

        gorevler.push({"gorevid":gorevler.length+1,"gorevadı":addTask.value,"gorevdurum":"uncompleted"});
        showMissions(document.querySelector(".selected-title").id);
       

        }
        localStorage.setItem("gorevler",JSON.stringify(gorevler))
    }
}



addButton.addEventListener("click",addMission);

const removeTask= (id) =>{

    let deletedId=gorevler.find(gorev => gorev.gorevid==id);

    gorevler.splice(deletedId,1);
    showMissions(document.querySelector(".selected-title").id);
    localStorage.setItem("gorevler",JSON.stringify(gorevler));
}

const editTask= (id,metin)=>{

    addButton.textContent="Edit";

    editId=id;

    addTask.value=metin;
     
}


const changeState= (element)=>{

    let taskState;

    if(element.checked){

        element.nextElementSibling.classList.add("checked");
        taskState="completed";
   
    }else{

        element.nextElementSibling.classList.remove("checked");
        taskState="uncompleted";

    }

    for(gorev of gorevler){

        if(gorev.gorevid==element.id){

            gorev.gorevdurum=taskState;
            
        }
    }

    showMissions(document.querySelector(".selected-title").id);
    localStorage.setItem("gorevler",JSON.stringify(gorevler))
}