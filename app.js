let amountNews = 9;
let pageEnd = amountNews;
let pageInit = 0;
let currentTopic = "programming";

let news = {
  "apiKey": "2c428aa742b240fda9949bbdbe0153ec",
  fetchNews: function (category) {
    fetch(
      "https://newsapi.org/v2/everything?q="
      + category +
      "&languaje=en&apiKey=" + this.apiKey

    )
      .then((response) => response.json())
      .then((data) => this.displayNews(data))
  },
  displayNews: function (data) {
    if (pageInit == 0) {
      document.querySelector(".containers-news").textContent = "";
    }
    for (let i = pageInit; i < pageEnd; i++) {
      const { title } = data.articles[i];
      let h2 = document.createElement("h2")
      h2.textContent = title;

      const { urlToImage } = data.articles[i];
      let img = document.createElement("img")
      img.setAttribute("src", urlToImage)

      let info_item = document.createElement("div");
      info_item.className = "info_item";
      const { publishedAt } = data.articles[i]
      let dates = document.createElement("span")
      let date = publishedAt;
      date = date.split("T")[0].split("-").reverse().join("-");
      dates.className = "dates";
      dates.textContent = date;

      const { name } = data.articles[i].source;
      let font = document.createElement("span");
      font.className = "font"
      font.textContent = name;

      info_item.appendChild(dates);
      info_item.appendChild(font)

      const { url } = data.articles[i]

      let item = document.createElement("div");
      item.className = "item";
      item.appendChild(h2)
      item.appendChild(img)
      item.appendChild(info_item)
      item.setAttribute("onclick", "location.href='" + url + " ")
      document.querySelector(".containers-news").appendChild(item);

    }

    let btnNext = document.createElement("span");
    btnNext.id = "btnNext";
    btnNext.textContent = "See More";
    btnNext.setAttribute("onclick", "next()");
    document.querySelector(".containers-news").appendChild(btnNext);
  }
}


function search(cat) {
  pageInit = 0;
  pageEnd = amountNews;
  currentTopic = cat;
  news.fetchNews(cat);
}

function searchTopic() {
  pageInit = 0;
  pageEnd = amountNews;

  let current = document.querySelector("#search").value;
  currentTopic = current;
  news.fetchNews(currentTopic);
}

function next() {
  pageInit = pageEnd + 1;
  pageEnd = pageEnd + amountNews + 1;

  document.querySelector("#btnNext").remove();
  news.fetchNews(currentTopic);
}



news.fetchNews(currentTopic)