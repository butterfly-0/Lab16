async function fetchQ(countPage) {
  const users = await fetch(
    `https://api.unsplash.com/photos/?client_id=ab3411e4ac868c2646c0ed488dfd919ef612b04c264f3374c97fff98ed253dc9&page=${
      countPage === undefined ? "1" : countPage
    }`
  );
  const json = await users.json();
  return json;
}
async function main(page) {
  const gUsers = await fetchQ(page);
  clearAll();
  createListHtml(gUsers);
  paginationHtml(page);
}
function createListHtml(list) {
  const app = document.getElementById("app");
  const beginning = document.createElement("div");
  beginning.textContent = "User list=)";
  beginning.classList.add("beginning");
  app.appendChild(beginning);

  for (let i = 0; i < list.length; i++) {
    const div = document.createElement("div");
    div.classList.add("form");



    const username = document.createElement("div");
    username.classList.add("text");
    username.textContent = list[i].user.username;
    div.appendChild(username);
 
    const fullscreen = document.createElement("div");
    fullscreen.classList.add("fullscreen");
    div.appendChild(fullscreen);

    const img = document.createElement("img");
    img.src = list[i].user.profile_image.small;
    img.classList.add("photo_profile");
    div.appendChild(img);

    app.appendChild(div);
    img.addEventListener("click", () => {
      const fullscreen = div.querySelector(".fullscreen");
      const photo = document.createElement("img");
      photo.src = list[i].user.profile_image.large;
      fullscreen.appendChild(photo);

      const backButton = document.createElement("button");
      backButton.textContent = "Back";
      backButton.classList.add("back-button");
      backButton.addEventListener("click", () => {
        fullscreen.removeChild(photo);
        fullscreen.removeChild(backButton);
      });
      fullscreen.appendChild(backButton);
    });
  }
}
function paginationHtml(pageNumber = 1) {
  const app = document.getElementById("app");
  const divPaginate = document.createElement("div");
  divPaginate.classList.add("pagination");

  const prevPageButton = document.createElement("button");
  prevPageButton.textContent = "<";
  prevPageButton.disabled = pageNumber <= 1;
  prevPageButton.addEventListener("click", () => {
    main(pageNumber - 1);
  });
  divPaginate.appendChild(prevPageButton);

  const pagesNums = Array.from(Array(10), (_, i) => i + 1);
  pagesNums.forEach((item) => {
    const div = document.createElement("div");
    div.textContent = item;
    div.classList.add("page-number");
    if (item === pageNumber) {
      div.classList.add("active");
    }
    div.addEventListener("click", () => {
      main(item);
    });
    divPaginate.appendChild(div);
  });

  const nextPageButton = document.createElement("button");
  nextPageButton.textContent = ">";
  nextPageButton.disabled = pageNumber >= 10;
  nextPageButton.addEventListener("click", () => {
    main(pageNumber + 1);
  });
  divPaginate.appendChild(nextPageButton);

  app.appendChild(divPaginate);
}
function clearAll() {
  const app = document.getElementById("app");
  app.innerHTML = "";
}
main();
