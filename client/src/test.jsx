
let timeoutId;

const debounce=(func)=>{
    if(timeoutId){clearTimeout(timeoutId)}
    timeoutId=setTimeout(()=>{
        func()
    },500)
}

const debounce2=(func,delay)=>{
    return (...args)=>{
        if(timeoutId){clearTimeout(timeoutId)}
        timeoutId=setTimeout(()=>{
            func.apply(null,args)
        },delay)
    }
}

const search=(value)=>{
    console.log(value);
}


const debounceSearch=debounce2(search,500)
const handleChange=({target})=>{
    debounceSearch(target.value)
}

<input type="text" onChange={handleChange} placeholder="name" />