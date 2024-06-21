let tittle      = document.getElementById("tittle")
let price       = document.getElementById("price")
let taxes       = document.getElementById("taxes")
let ads         = document.getElementById("ads")
let discount    = document.getElementById("discount")
let total       = document.getElementById("total")
let count       = document.getElementById("count")
let category    = document.getElementById("category")
let submit      = document.getElementById("submit")
let tbody       = document.getElementById("tbody")
let del         = document.getElementById("delete")
let divDelete   = document.getElementById("deleteAll")

// عشان حطيت update , create 
let mood = "create"

// عشان اعمل i = temp  فى update
let tmp
// Get Total 
total.innerHTML = 0
function getTotal(){
    if (price.value != "" ){
        let reslut = (+price.value + +taxes.value + +ads.value) - +discount.value;
        total.innerHTML = reslut
    }else{
        total.innerHTML = 0
    }
    
}

// Create 
let dataPro;
if (localStorage.product != null) {
    dataPro =JSON.parse(localStorage.product)
}else{
    dataPro = []
}



submit.onclick = function (){
    let newpro = {
        tittle      : tittle.value       ,
        price       : price.value        ,
        taxes       : taxes.value        ,
        ads         : ads.value          ,
        discount    : discount.value     ,
        total       : total.innerHTML    ,
        count       : count.value        ,
        category    : category.value     ,
    }

    if( tittle.value != "" &&
        price.value != "" &&
        taxes.value != ""  &&
        ads.value  != "" &&
        count.value < 100 &&
        category.value != ""  )

        
        {    if (mood =="create")
        {    if(newpro.count >1 ){
                for(let m =0 ; m < newpro.count ; m++){
                    dataPro.push(newpro)
                }
                clearInput()
            }else{
                dataPro.push(newpro)
            }}else {
                dataPro[tmp] = newpro 
                mood= "create"
                submit.innerHTML= "Create"
                count.style.display="block"
            }
        }
    localStorage.setItem("product",JSON.stringify(dataPro))
        showDate()
}


// Clear Input 
function clearInput(){
    tittle.value  = ""   
    price.value    = ""
    taxes.value    = ""
    ads.value      = ""
    discount.value = ""
    total.innerHTML = ""
    count.value    = ""
    category.value = ""
    
}


// Read

function showDate(){
    getTotal()

    let table ="";
    
    for(let i = 0 ; i < dataPro.length ; i++)
        {
            table += `
            <tr>
                <td>${i + 1}</td>
                <td>${dataPro[i].tittle}</td>
                <td>${dataPro[i].price}</td>
                <td>${dataPro[i].taxes}</td>
                <td>${dataPro[i].ads}</td>
                <td>${dataPro[i].discount}</td>
                <td>${dataPro[i].total}</td>
                <td>${dataPro[i].category}</td>
                <td><button onclick="updateData(${i})" id="update">Update</button></td>
                <td><button onclick="deleteData(${i})" id="delete">Delete</button></td>
            </tr>
            `
        }
    
    tbody.innerHTML = table;
    if (dataPro.length > 0){
    divDelete.innerHTML = `<button onclick="deleteAll()" id="delete">Delete All (${dataPro.length })</button>`
    
}
else{
    divDelete.innerHTML = ""
}
}
showDate()

function deleteData(i){
    dataPro.splice(i,1);
    localStorage.product = JSON.stringify(dataPro)
    console.log(dataPro.length)
    showDate() 
    // عملت function بتاعه اظهار بيانات عشان كل ما امسح يحدث بيانات
}

// Delete All 
function deleteAll(){
    localStorage.clear()
    dataPro.splice (0 ,dataPro.length)
    showDate() 
    // عملت function بتاعه اظهار بيانات عشان كل ما امسح يحدث بيانات
}

function updateData(i){
    tittle.value = dataPro[i].tittle
    price.value    = dataPro[i].price
    taxes.value    = dataPro[i].taxes
    ads.value      = dataPro[i].ads
    discount.value = dataPro[i].discount
    total.innerHTML = dataPro[i].total
    category.value = dataPro[i].category
    getTotal()
    count.style.display="none"
    submit.innerHTML = "Update"
    mood = "update"
    tmp = i
    window.scroll({top:0, behavior:"smooth"})
}

// Search
let searchMood = "tittle"

function getSearchMood(id) {
    let search = document.getElementById("search")
    if (id =="searchTitle"){
        searchMood = "tittle"
        search.placeholder ="Search By Tittle"
    }else{
        searchMood = "category"
    }
    search.placeholder ="Search By "+ searchMood
    search.focus()
    search.value =""
    showDate()
}


function searchData(value){
    let table = ""
        for (let i =0 ; i <dataPro.length ; i++){
            if (searchMood == "tittle"){
                    if (dataPro[i].tittle.toLowerCase().includes(value.toLowerCase())){
                        
                    table += `
                    <tr>
                        <td>${i + 1}</td>
                        <td>${dataPro[i].tittle}</td>
                        <td>${dataPro[i].price}</td>
                        <td>${dataPro[i].taxes}</td>
                        <td>${dataPro[i].ads}</td>
                        <td>${dataPro[i].discount}</td>
                        <td>${dataPro[i].total}</td>
                        <td>${dataPro[i].category}</td>
                        <td><button onclick="updateData(${i})" id="update">Update</button></td>
                        <td><button onclick="deleteData(${i})" id="delete">Delete</button></td>
                    </tr>
                    `
                
                    }
                
            }else{
            
                    if (dataPro[i].category.toLowerCase().includes(value.toLowerCase())){
                    table += `
                    <tr>
                        <td>${i + 1}</td>
                        <td>${dataPro[i].tittle}</td>
                        <td>${dataPro[i].price}</td>
                        <td>${dataPro[i].taxes}</td>
                        <td>${dataPro[i].ads}</td>
                        <td>${dataPro[i].discount}</td>
                        <td>${dataPro[i].total}</td>
                        <td>${dataPro[i].category}</td>
                        <td><button onclick="updateData(${i})" id="update">Update</button></td>
                        <td><button onclick="deleteData(${i})" id="delete">Delete</button></td>
                    </tr>
                    `
                
                    }
                }
            }
        tbody.innerHTML = table;

}