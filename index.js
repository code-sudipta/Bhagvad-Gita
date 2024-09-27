const url =
  "https://bhagavad-gita3.p.rapidapi.com/v2/chapters/?skip=0&limit=18";
const options = {
  method: "GET",
  headers: {
    "x-rapidapi-key": "e5a362a221mshaf5ecaac90f7f47p17c7ebjsn277dda4199d0",
    "x-rapidapi-host": "bhagavad-gita3.p.rapidapi.com",
  },
};

let pictures = ["", "images/pic1.webp", "images/pic2.jpeg", "images/pic3.jpeg", "images/pic4.jpeg", "images/pic5.jpeg", "images/pic6.jpeg", "images/pic7.jpeg", "images/pic8.jfif", "images/pic9.jpg", "images/pic10.jfif", "images/pic11.jpg", "images/pic12.jpg", "images/pic13.jpg", "images/pic14.jpg", "images/pic15.jpg", "images/pic16.jpg", "images/pic17.jpg", "images/pic18.jpg"]

const p = async () => {
  try {
    const response = await fetch(url, options);
    // console.log(response)
    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error);
  }
};

const mainFunc = async () => {
  let result = await p();
  console.log(result);

  let cards = "";
  for (let items of result) {
    cards += `
    <div class="col-lg-3 col-md-4 col-sm-6 col-12 mb-4 d-flex justify-content-center">
        <div class="card" style="width: 18rem">
      <img src=${pictures[items["chapter_number"]]} class="card-img-top" alt="..." />
      <div class="card-body">
        <h5 class="card-title">Chapter: ${items["chapter_number"]}</h5>
        <h5 class="card-title">Title: ${items["name"]}</h5>
        <p class="card-text">
        <b>Transliteration:</b> ${items["name_transliterated"]}<br>
        <b>Meaning:</b> ${items["name_meaning"]}
        </p>
        <a class="btn btn-primary btn1" onclick="showChap(${items["id"]})">Read Chapter</a>
      </div>
    </div>
    </div>
        `;
    console.log(items)
  }
  document.getElementById('card-container').innerHTML = cards
};

mainFunc();

const showChap=(id)=>{
  window.location.href = `chapter.html?chap=${id}`
}