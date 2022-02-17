const random = document.querySelector(".random")
const category = document.querySelector(".category")
const categoryButton = document.querySelector(".category-button")
const keyword = document.querySelector(".keyword")
const keywordButton = document.querySelector(".keyword-button")

const img = document.querySelector(".img")
const backdrop = document.querySelector(".backdrop")
const fact = document.querySelector(".fact")

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
img.addEventListener("click", () => {
  resetElem(category)
  resetElem(keyword)
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
      fact.innerHTML = ""
      const factParagraph = document.createElement("p")
      fact.appendChild(factParagraph)
      factParagraph.innerText = data.value
      openThem()
    })
})
backdrop.addEventListener("click", () => {
  closeThem()
})

random.addEventListener("click", (e) => {
  e.preventDefault()
  resetElem(category)
  resetElem(keyword)
  fetch("https://api.chucknorris.io/jokes/random")
    .then((res) => res.json())
    .then((data) => {
      console.log(data)
      fact.innerHTML = ""
      const factParagraph = document.createElement("p")
      fact.appendChild(factParagraph)
      factParagraph.innerText = data.value
      openThem()
    })
})

keywordButton.addEventListener("click", (e) => {
  e.preventDefault()
  console.log(keyword.value)
  if (keyword.value.trim() === "") {
    keyword.style.border = "3px solid red"
    keyword.focus()
    return
  }
  keyword.style.border = "none"
  fetch(`https://api.chucknorris.io/jokes/search?query=${keyword.value}`)
    .then((res) => res.json())
    .then((data) => {
      console.log(data)
      fact.innerHTML = ""

      if (data.error) {
        const factParagraph = document.createElement("p")
        factParagraph.innerText = data.violations["search.query"]
        factParagraph.style.color = "orange"
        fact.appendChild(factParagraph)
        openThem()
        return
      }
      if (data.total === 0) {
        const factParagraph = document.createElement("p")
        factParagraph.innerText = "Try anything else"
        fact.appendChild(factParagraph)
        openThem()
        return
      }
      data.result.forEach((el, i, arr) => {
        const factParagraph = document.createElement("p")
        factParagraph.innerText = el.value
        fact.appendChild(factParagraph)
        if (i !== arr.length - 1) {
          const hr = document.createElement("HR")
          fact.appendChild(hr)
        }
      })

      openThem()
    })
})

function openThem() {
  fact.classList.add("open")
  backdrop.classList.add("open")

  img.style.backgroundPosition = "50% 60%"
  img.style.backgroundSize = "auto 220%"

  setTimeout(() => {
    fact.style.width = "90%"
  }, 1)
}
function closeThem() {
  fact.classList.remove("open")
  backdrop.classList.remove("open")

  img.style.backgroundPosition = "center"
  img.style.backgroundSize = "auto 100%"
}

function resetElem(elem) {
  elem.style.border = "none"
  if (elem.nodeName === "INPUT") {
    elem.value = ""
  } else if (elem.nodeName === "SELECT") {
    elem.selectedIndex = 0
  }
}
