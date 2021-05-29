console.log('client side js loaded.')

// fetch('http://puzzle.mead.io/puzzle').then((response) => {
//     response.json().then((data)=>{
//         console.log(data)
//     })

//     })

    const weatherForm = document.querySelector('form')
    
    weatherForm.addEventListener('submit',(e)=>{
        e.preventDefault()
        
        const search = document.querySelector('input')
        const msg1 = document.querySelector('#message-1')
        const msg2 = document.querySelector('#message-2')

        const address = search.value
        msg1.textContent='fetching weather...'
        msg2.textContent= ''
        
            fetch('/weather?address=' + address).then((response)=>{
        
            response.json().then((data)=>{  
                if (data.error) {          
                    msg1.textContent=data.error 
                    msg2.textContent=''
                    }
                else {
                    msg1.textContent=data.forecast 
                    msg2.textContent=data.location                
                    }
                })
            })
    })

    