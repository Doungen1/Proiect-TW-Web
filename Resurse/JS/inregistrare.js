windoww.onload = function () {
    var formular=document.getElemendById("form_inreg");
    if(formular){
        formular.onsubmit=function(){
            if(document.getElemendbyId("parl").value!=document.getElemendById("rparl").value){
                alert("Nu ati introdus acelasi sir pentru campurile parola si repeta parola");
                return false;
            }
            return true;
        }
    }
}