function getRandomColor() {
  let color = "#" + Math.floor(Math.random() * 16777215).toString(16);
  while (color.length < 7) {
    color = color + "0";
  }
  return color;
}

function getRandomContrastColor(background) {
  let r = parseInt(background.slice(1, 3), 16);
  let g = parseInt(background.slice(3, 5), 16);
  let b = parseInt(background.slice(5, 7), 16);
  let luminance = (r * 299 + g * 587 + b * 114) / 1000;
  return luminance > 128 ? "#000000" : "#ffffff";
}
function countWords() {
  const fileInput = document.getElementById("myFile");
  const file = fileInput.files[0];
  if (!file) {
    alert("Please select a file!");
    return;
  }
  const reader = new FileReader();
  reader.onload = function (e) {
    let text = e.target.result;
    text = text.replace(/[^a-zA-Z' ]/g, " ").toLowerCase();
    const words = text.split(/\s+/);
    const wordCount = {};
    for (let word of words) {
      if (word in wordCount) {
        wordCount[word]++;
      } else {
        wordCount[word] = 1;
      }
    }
    const sortedWordCount = Object.entries(wordCount).sort(
      (a, b) => b[1] - a[1]
    );
    console.log(sortedWordCount.length);
    let htmlShow = ``;
    sortedWordCount.map((item) => {
      let colorBg = getRandomColor();
      let colorText = getRandomContrastColor(colorBg);
      return (htmlShow += `
        <div class="card border p-2 m-1 bg-[${colorBg}] text-center">
            <p class="text-[${colorText}]">${item[0]}</p>
            <p class="text-[${colorText}]">${item[1]}</p>
        </div>`);
    });
    document.querySelector(".show_card").innerHTML = htmlShow;
    // const outputDiv = document.getElementById("output");
    // outputDiv.textContent = JSON.stringify(sortedWordCount, null, 2);
  };
  reader.readAsText(file);
}
