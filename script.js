const random = document.querySelector(".random")
const category = document.querySelector(".category")
const categoryButton = document.querySelector(".category-button")
const keyword = document.querySelector(".keyword")
const keywordButton = document.querySelector(".keyword-button")

const backdrop = document.querySelector(".backdrop")
const factParagraph = document.querySelector(".fact > p")

let url

fetch("https://api.chucknorris.io/jokes/categories")
  .then((res) => res.json())
  .then((data) => {
    data.forEach((el) => {
      const option = document.createElement("option")
      option.innerText = el.charAt(0).toUpperCase() + el.slice(1)
      option.setAttribute("value", el)
      category.appendChild(option)
    })
  })

categoryButton.addEventListener("click", (e) => {
  e.preventDefault()
  console.log(category.value)
  if (category.value === "none") {
    category.style.border = "3px solid red"
    return
  }
  category.style.border = "none"
  fetch(`https://api.chucknorris.io/jokes/random?category=${category.value}`)
    .then((res) => res.json())
    .then((data) => {
      console.log(data)
      factParagraph.innerText = data.value
    })
})

function smallTextAndBg() {}
