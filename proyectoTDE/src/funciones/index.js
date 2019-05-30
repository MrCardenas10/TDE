const controles=(Component,rol)=>{
    if(localStorage.rol===rol){
        return Component;
    }
    return "";
}

export default controles;