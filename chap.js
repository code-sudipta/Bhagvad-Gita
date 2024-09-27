// Parse URL parameters to retrieve the shared value
const params = new URLSearchParams(window.location.search);
let sharedValue = params.get("chap");
localStorage.setItem("id", sharedValue);

const url =
  "https://bhagavad-gita3.p.rapidapi.com/v2/chapters/?skip=0&limit=18";
const options = {
  method: "GET",
  headers: {
    "x-rapidapi-key": "e5a362a221mshaf5ecaac90f7f47p17c7ebjsn277dda4199d0",
    "x-rapidapi-host": "bhagavad-gita3.p.rapidapi.com",
  },
};

let pictures = [
  "",
  "images/pic1.webp",
  "images/pic2.jpeg",
  "images/pic3.jpeg",
  "images/pic4.jpeg",
  "images/pic5.jpeg",
  "images/pic6.jpeg",
  "images/pic7.jpeg",
  "images/pic8.jfif",
  "images/pic9.jpg",
  "images/pic10.jfif",
  "images/pic11.jpg",
  "images/pic12.jpg",
  "images/pic13.jpg",
  "images/pic14.jpg",
  "images/pic15.jpg",
  "images/pic16.jpg",
  "images/pic17.jpg",
  "images/pic18.jpg",
];

const p = async () => {
  try {
    const response = await fetch(url, options);
    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error);
  }
};

// Main function to get chapter details
const mainFunc = async () => {
  let result = await p();
  let item = result[localStorage.getItem("id") - 1];
  verse = item["verses_count"];

  // Update the DOM with chapter details
  document.getElementById("chap-pic").src = `${
    pictures[item["chapter_number"]]
  }`;
  document.getElementById("chap-name").innerHTML = item["name"];
  document.getElementById(
    "chap-no"
  ).innerHTML = `Chapter no: ${item["chapter_number"]}`;
  document.getElementById(
    "translit"
  ).innerHTML = `<b>Transliteration:</b> ${item["name_transliterated"]}`;
  document.getElementById(
    "meaning"
  ).innerHTML = `<b>Meaning:</b> ${item["name_meaning"]}`;
  document.getElementById(
    "english-summary"
  ).innerHTML = `<b>English Summary:</b><br>${item["chapter_summary"]}`;
  document.getElementById(
    "hindi-summary"
  ).innerHTML = `<b>Hindi Summary:</b><br>${item["chapter_summary_hindi"]}`;
  document.getElementById(
    "no-verses"
  ).innerHTML = `<b>Number of verses: </b>${item["verses_count"]}`;

  // Return the number of verses
  return verse;
};

const p2 = async (chp, ver) => {
  try {
    const response = await fetch(
      `https://vedicscriptures.github.io/slok/${chp}/${ver}`
    );
    let result = await response.json();
    return result;
  } catch (error) {
    console.error(error);
  }
};

// Function to fetch verse data
const mainFunc2 = async (versesCount, chapterId) => {
  let ihtml = "";
  for (let i = 1; i <= versesCount; i++) {
    let result = await p2(chapterId, i);
    console.log(result);
    ihtml = `<div class="accordion-item">
        <h2 class="accordion-header">
          <button
            class="accordion-button collapsed"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapse${i}"
            aria-expanded="false"
            aria-controls="collapse${i}"
          >
            Verse  ${result["_id"]} 
          </button>
        </h2>
        <div
          id="collapse${i}"
          class="accordion-collapse collapse"
          data-bs-parent="#accordionExample"
        >
          <div class="accordion-body">
            <strong>Sloka:</strong> <span style="font-size:20px;"> ${result["slok"]}</span>
            <hr class="my-4">
            <strong>Transliteration:</strong> ${result["transliteration"]}
            <br>
            <strong>Meaning:</strong> ${result["prabhu"]["et"]}
            <hr class="my-4">
            <a class="btn btn-primary btn1" href="verse.html?chap=${chapterId}&verse=${i}">Explaination</a>
          </div>
        </div>
      </div>`;
    document.getElementById("accordionExample").innerHTML += ihtml;
  }
};

const init = async () => {
  const verseCount = await mainFunc();

  if (verseCount) {
    mainFunc2(verseCount, localStorage.getItem("id"));
  }
};

init();
'Arjuna inquired: Which are considered to be more perfect, those who are always properly engaged in Your devotional service or those who worship the impersonal Brahman, the unmanifested?'