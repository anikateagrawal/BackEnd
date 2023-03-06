const url='http://localhost:3000/search?q=';
const searchInput=document.getElementById('search');
searchInput.addEventListener('keyup',search)

async function search(){
    let text=searchInput.value;
    const res=await fetch(url+text);
    const data=await res.json();
    console.log(data);
}

