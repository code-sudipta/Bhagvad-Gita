// Parse URL parameters to retrieve the shared value
const params = new URLSearchParams(window.location.search);
let chap = params.get("chap");
let ver = params.get('verse')
localStorage.setItem("chap", chap);
localStorage.setItem("verse", ver);

const p = async(chap, ver)=>{
    let response = await fetch(`https://vedicscriptures.github.io/slok/${chap}/${ver}`)
    let result = await response.json();
    return result;
}

const mainFunc =async()=>{
    let result = await p(chap, ver);
    // console.log(result)
    document.getElementById('chap-name').innerHTML = `Chapter ${result["chapter"]} <br>Verse ${result["_id"]}`
    document.getElementById('slok').innerHTML = `<strong>${result["slok"]}</strong>`
    document.getElementById('translit').innerHTML = `${result["transliteration"]}`
    document.getElementById('meaning').innerHTML = `<strong>Meaning: </strong><br> ${result["prabhu"]["et"]}`
    document.getElementById('explaination').innerHTML = `<strong>Explaination: </strong><br> ${result["prabhu"]["ec"]}`
}

mainFunc()