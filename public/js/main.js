// Clientside

const deleteBtn = document.querySelectorAll('.fa-trash')
const item = document.querySelectorAll('.item span')
const itemCompleted = document.querySelectorAll('.item span.completed')

Array.from(deleteBtn).forEach((element)=>{
    element.addEventListener('click', deleteItem)
})
Array.from(item).forEach((element)=>{
    element.addEventListener('click', markComplete)
})
Array.from(itemCompleted).forEach((element) => {
    element.addEventListener('click', markUnComplete)
})

async function deleteItem(){
    const titleText = this.parentNode.childNodes[1].innerText
    const roleText = this.parentNode.childNodes[3].innerText
    const dateText = this.parentNode.childNodes[5].innerText
    const statusText = this.parentNode.childNodes[7].innerText
    const notesText = this.parentNode.childNodes[9].innerText
    const sparkText = this.parentNode.childNodes[11].innerText
    try{
        const response = await fetch('deleteItem', {
            method: 'delete',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              'jobTitleJS': titleText,
              'jobRoleJS': roleText,
              'jobDateJS': dateText,
              'jobStatusJS': statusText,
              'jobNotesJS': notesText,
              'jobSparkJS': sparkText
            })
          })
        const data = await response.json()
        console.log(data)
        location.reload()
 
    }catch(err){
        console.log(err)
    }
}

async function markComplete(){
    const titleText = this.parentNode.childNodes[1].innerText
    const roleText = this.parentNode.childNodes[3].innerText
    const dateText = this.parentNode.childNodes[5].innerText
    const statusText = this.parentNode.childNodes[7].innerText
    const notesText = this.parentNode.childNodes[9].innerText
    const sparkText = this.parentNode.childNodes[11].innerText
    try{
        const response = await fetch('markComplete', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                'jobTitleJS': titleText,
                'jobRoleJS': roleText,
                'jobDateJS': dateText,
                'jobStatusJS': statusText,
                'jobNotesJS': notesText,
                'jobSparkJS': sparkText
            })
          })
        const data = await response.json()
        console.log(data)
        location.reload()

    }catch(err){
        console.log(err)
    }
}

async function markUnComplete(){
    const titleText = this.parentNode.childNodes[1].innerText
    const roleText = this.parentNode.childNodes[3].innerText
    const dateText = this.parentNode.childNodes[5].innerText
    const statusText = this.parentNode.childNodes[7].innerText
    const notesText = this.parentNode.childNodes[9].innerText
    const sparkText = this.parentNode.childNodes[11].innerText
    try{
        const response = await fetch('markUnComplete', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                'jobTitleJS': titleText,
                'jobRoleJS': roleText,
                'jobDateJS': dateText,
                'jobStatusJS': statusText,
                'jobNotesJS': notesText,
                'jobSparkJS': sparkText
            })
          })
        const data = await response.json()
        console.log(data)
        location.reload()

    }catch(err){
        console.log(err)
    }
}