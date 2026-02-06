const field1=document.getElementById('field1');
const field2=document.getElementById('field2');
const pass_length=document.getElementById('length');
const exclusion=document.getElementById('exclude_characters');
const advanced_tab=document.getElementById("advanced_tab");
const generateBtn=document.getElementById("generateBtn");

const characters=["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9","~","`","!","@","#","$","%","^","&","*","(",")","_","-","+","=","{","[","}","]",",","|",":",";","<",">",".","?",
"/"];


advanced_tab.addEventListener("click", function(){
    const advanced = document.querySelector('.advanced');
    advanced.style.display = advanced.style.display === 'none' ? 'flex' : 'none';
})

generateBtn.addEventListener("click", function(){
    chars= characters.filter(char => !exclusion.value.includes(char));
    length= parseInt(pass_length.value) || 15;
    let password1 = "";
    let password2 = "";
    for(let i=0; i<length; i++){
        password1+= chars[Math.floor(Math.random()*chars.length)]
        password2+= chars[Math.floor(Math.random()*chars.length)]
    }
    field1.textContent = password1;
    field2.textContent = password2;
})

function copyPassword(fieldId) {
    const field = document.getElementById(fieldId);
    navigator.clipboard.writeText(field.textContent).then(() => {
        alert('Copied to clipboard: ' + field.textContent);
    }).catch(err => {
        console.error('Error copying text: ', err);
    });
}
