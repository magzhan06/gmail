let btnBack = document.querySelector("#btnBack")
let btnNext = document.querySelector("#btnNext")

let change = false
let changeId
let str = 1
let start = 0

function show() {
    console.log("show");
    if (localStorage.length > 0) {
        for (let i = 1; i < 5; i++) {
            if (obj[i + start]) {
                let keys = document.querySelector("#keys"+i)
                keys.innerHTML = obj[i + start].keys
                if (obj[i + start].names.length < 16) {
                    let names = document.querySelector("#names"+i)
                    names.innerHTML = obj[i + start].names
                    names.title = obj[i + start].names
                } else{
                    let names = document.querySelector("#names"+i)
                    names.innerHTML = "..."
                    names.title = obj[i + start].names
                }
                if (obj[i + start].dis.length < 16) {
                    let discriptions = document.querySelector("#discriptions"+i)
                    discriptions.innerHTML = obj[i + start].dis
                    discriptions.title = obj[i + start].dis
                } else{
                    let discriptions = document.querySelector("#discriptions"+i)
                    discriptions.innerHTML = "..."
                    discriptions.title = obj[i + start].dis
                }
                btn = document.querySelector("#btnEdit_"+i).style.display = "block"
            } else {
                let keys = document.querySelector("#keys"+i)
                keys.innerHTML = ""
                let names = document.querySelector("#names"+i)
                names.innerHTML = ""
                let discriptions = document.querySelector("#discriptions"+i)
                discriptions.innerHTML = ""
                btn = document.querySelector("#btnEdit_"+i).style.display = "none"
            }
        }    
    } else {
        for (let i = 1; i < 5; i++) {
            if (obj[i + start]) {
                let keys = document.querySelector("#keys"+i)
                keys.innerHTML = ""
                let names = document.querySelector("#names"+i)
                names.innerHTML = ""
                let discriptions = document.querySelector("#discriptions"+i)
                discriptions.innerHTML = ""
                btn = document.querySelector("#btnEdit_"+i).style.display = "none"
            }
        }  
    }
}

function createObj() {
    delete obj
    obj = {}
    if (localStorage.length >= 1) {
        for (let i = 1; i < localStorage.length; i++) {
            let data = JSON.parse(localStorage.getItem(i))
            obj[i] = data
        }
        show()
    }
}
createObj()

btnBack.addEventListener("click", function() {
    if (str != 1) {
        str--
        start = start - 4

        show()
    }
})
btnNext.addEventListener("click", function() {
    if (str < (localStorage.length-1) / 4) {
        str++
        start = start + 4
        show()
    }
})










let btnClear = document.querySelector("#btnClear")
let btnCreate = document.querySelector("#btnCreate")
let nameBox = document.querySelector("#nameBox")
let descriptionBox = document.querySelector("#descriptionBox")

let btnEdit_1 = document.querySelector("#btnEdit_1")
let btnEdit_2 = document.querySelector("#btnEdit_2")
let btnEdit_3 = document.querySelector("#btnEdit_3")
let btnEdit_4 = document.querySelector("#btnEdit_4")

btnClear.addEventListener("click", function() {
    if (change == false) {
        let nameText = document.querySelector("#name-text")
        let textDescription = document.querySelector("#name-description")
        nameText.value = ""
        textDescription.value = ""
        nameText.disabled = true
        textDescription.disabled = true
        nameBox.style.backgroundColor="darkred"
        descriptionBox.style.backgroundColor="darkred"
        delete mass
        setTimeout(function() {
            nameBox.style.backgroundColor="white"
            descriptionBox.style.backgroundColor="white"
            nameText.disabled = false
            textDescription.disabled = false
        }, 500)   
    } else {
        changeId = ""
        window.scroll(0, 600);
        nameText = document.querySelector("#name-text")
        textDescription = document.querySelector("#name-description")
        nameText.value = ""
        textDescription.value = ""
        change = false
        let btnDelete = document.querySelector("#btnDelete")
        btnDelete.style.display ="none"
        let btnCancel = document.querySelector("#btnClear")
        btnCancel.innerHTML = "Clear";
        let btnEdit = document.querySelector("#btnCreate")
        btnEdit.innerHTML = "Create"
        let headText = document.querySelector("#headText")
        headText.innerHTML = "CREATE DISCRIPTIONS"
    }
})


btnCreate.addEventListener("click", function() {
    if (change == false) {
        let nameText = document.querySelector("#name-text")
        let textDescription = document.querySelector("#name-description")
        if (localStorage.length == 0) {
            mass = JSON.stringify({
                "keys": 1,
                "names": nameText.value,
                "dis": textDescription.value})   
        } else {
            mass = JSON.stringify({
                "keys": localStorage.length,
                "names": nameText.value,
                "dis": textDescription.value})  
        }
        localStorage.setItem(0,localStorage.length)
        if (localStorage.length == 0) {
            localStorage.setItem(localStorage.length+1, mass)
            createObj()
        } else {
            localStorage.setItem(localStorage.length, mass)
            createObj()
        }
        nameText = document.querySelector("#name-text")
        textDescription = document.querySelector("#name-description")
        nameText.value = ""
        textDescription.value = ""
        nameText.disabled = true
        textDescription.disabled = true
        nameBox.style.backgroundColor="darkgreen"
        descriptionBox.style.backgroundColor="darkgreen"
        delete mass
        setTimeout(function() {
            nameBox.style.backgroundColor="white"
            descriptionBox.style.backgroundColor="white"
            nameText.disabled = false
            textDescription.disabled = false
        }, 500)   
    } else {
        let nameText = document.querySelector("#name-text")
        let textDescription = document.querySelector("#name-description")
        obj[changeId].names = nameText.value
        obj[changeId].dis = textDescription.value
        let mass = JSON.stringify(obj[changeId])
        localStorage.setItem(changeId, mass)
        delete mass
        changeId = ""
        change = false
        nameText.innerHTML = ""
        textDescription.innerHTML = ""
        nameText.value = ""
        textDescription.value = ""
        nameText = document.querySelector("#name-text")
        textDescription = document.querySelector("#name-description")
        nameText.disabled = true
        textDescription.disabled = true
        nameText = document.querySelector("#name-text")
        textDescription = document.querySelector("#name-description")
        nameBox.style.backgroundColor="darkgreen"
        descriptionBox.style.backgroundColor="darkgreen"
        setTimeout(function() {
            let btnDelete = document.querySelector("#btnDelete")
            btnDelete.style.display ="none"
            let btnCancel = document.querySelector("#btnClear")
            btnCancel.innerHTML = "Clear";
            let btnEdit = document.querySelector("#btnCreate")
            btnEdit.innerHTML = "Create"
            nameBox.style.backgroundColor="white"
            descriptionBox.style.backgroundColor="white"
            nameText.disabled = false
            textDescription.disabled = false
            createObj()
            window.scroll(0, 600);
        }, 500)
    }
})
btnDelete.addEventListener("click", function() {
    if (change == true) {
        delete obj[changeId]
        localStorage.clear()
        let key = 0
        localStorage.setItem("0", localStorage.length)
        for (let i = 1; i <= Object.keys(obj).length+1; i++) {
            if (obj[i] != undefined) {
                key++
                obj[i].keys = key
                let mass = JSON.stringify(obj[i])
                localStorage.setItem(key, mass)
            }
            localStorage.setItem("0", localStorage.length-1)
        }
        delete mass
        changeId = ""
        change = false
        let btnDelete = document.querySelector("#btnDelete")
        btnDelete.style.display ="none"
        let btnCancel = document.querySelector("#btnClear")
        btnCancel.innerHTML = "Clear";
        let btnEdit = document.querySelector("#btnCreate")
        btnEdit.innerHTML = "Create"
        nameText = document.querySelector("#name-text")
        textDescription = document.querySelector("#name-description")
        nameText.value = ""
        textDescription.value = ""
        nameText.disabled = true
        textDescription.disabled = true
        nameBox.style.backgroundColor="darkgreen"
        descriptionBox.style.backgroundColor="darkgreen"
        setTimeout(function() {
            let headText = document.querySelector("#headText")
            headText.innerHTML = "CREATE DISCRIPTIONS"
            nameBox.style.backgroundColor="white"
            descriptionBox.style.backgroundColor="white"
            nameText.disabled = false
            textDescription.disabled = false
            createObj()
            window.scroll(0, 600);
        }, 500)
    }
})



function ch(num) {
    changeId = num
    let nameText = document.querySelector("#name-text")
    let textDescription = document.querySelector("#name-description")
    let headText = document.querySelector("#headText")
    headText.innerHTML = "CHANGE DISCRIPTIONS"
    nameText.value = obj[changeId].names
    textDescription.value = obj[changeId].dis
    change = true
    window.scroll(0, 0)
    let btnDelete = document.querySelector("#btnDelete")
    btnDelete.style.display ="inline-block"
    let btnCancel = document.querySelector("#btnClear")
    btnCancel.innerHTML = "Cancel";
    let btnEdit = document.querySelector("#btnCreate")
    btnEdit.innerHTML = "Save"
}


btnEdit_1.addEventListener("click", function() {
    ch(start+1)
})
btnEdit_2.addEventListener("click", function() {
    ch(start+2)
})
btnEdit_3.addEventListener("click", function() {
    ch(start+3)
})
btnEdit_4.addEventListener("click", function() {
    ch(start+4)
})