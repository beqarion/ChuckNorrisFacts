const random = document.querySelector(".random")
const category = document.querySelector(".category")
const categoryButton = document.querySelector(".category-button")
const keyword = document.querySelector(".keyword")
const keywordButton = document.querySelector(".keyword-button")

const content = document.querySelector(".content")
const backdrop = document.querySelector(".backdrop")
const facts = document.querySelector(".facts")

populateCategory(category)

content.addEventListener("click", () => {
  resetElem(category)
  resetElem(keyword)
  resetElem(facts)
})
categoryButton.addEventListener("click", (e) => {
  e.preventDefault()
  console.log(category.value)
  if (category.value === "none") {
    category.style.border = "3px solid red"
    return
  }
  category.style.border = "none"
  populateWithFacts(
    facts,
    `https://api.chucknorris.io/jokes/random?category=${category.value}`
  )
})
backdrop.addEventListener("click", () => {
  closeThem()
})

random.addEventListener("click", (e) => {
  e.preventDefault()
  resetElem(category)
  resetElem(keyword)
  populateWithFacts(facts, "https://api.chucknorris.io/jokes/random")
  openThem()
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
  populateWithFacts(
    facts,
    `https://api.chucknorris.io/jokes/search?query=${keyword.value}`
  )
})
function openThem() {
  facts.classList.add("open")
  backdrop.classList.add("open")

  content.style.backgroundPosition = "50% 60%"
  content.style.backgroundSize = "auto 220%"

  setTimeout(() => {
    facts.style.width = "90%"
  }, 1)
}
function closeThem() {
  facts.classList.remove("open")
  backdrop.classList.remove("open")

  if (window.matchMedia("(orientation: portrait)").matches) {
    content.style.backgroundPosition = "center"
    content.style.backgroundSize = "auto 100%"
  }

  if (window.matchMedia("(orientation: landscape)").matches) {
    content.style.backgroundPosition = "50% 25%"
    content.style.backgroundSize = "100% auto"
  }
}

function resetElem(elem) {
  elem.style.border = "none"
  if (elem.nodeName === "INPUT") {
    elem.value = ""
  } else if (elem.nodeName === "SELECT") {
    elem.selectedIndex = 0
  } else if (elem.nodeName === "P") {
    elem.style.width = "50%"
    elem.style.maxHeight = "90%"
  }
}

async function populateCategory(selectElement) {
  const res = await fetch("https://api.chucknorris.io/jokes/categories")
  const data = await res.json()
  data.forEach((el) => {
    const option = document.createElement("option")
    option.innerText = el.charAt(0).toUpperCase() + el.slice(1)
    option.setAttribute("value", el)
    selectElement.appendChild(option)
  })
}

async function populateWithFacts(parent, url) {
  const res = await fetch(url)
  const data = await res.json()

  if (data.error) {
    const factParagraph = document.createElement("p")
    factParagraph.innerText = data.violations["search.query"]
    factParagraph.style.color = "orange"
    facts.appendChild(factParagraph)
    openThem()
    return
  }
  if (data.total === 0) {
    const factParagraph = document.createElement("p")
    factParagraph.innerText = "Try anything else"
    facts.appendChild(factParagraph)
    openThem()
    return
  }
  if (Array.isArray(data.result)) {
    data.result.forEach((el, i, arr) => {
      const factParagraph = document.createElement("p")
      factParagraph.innerText = el.value
      parent.appendChild(factParagraph)
      if (i !== arr.length - 1) {
        const hr = document.createElement("HR")
        parent.appendChild(hr)
      }
    })
  } else {
    console.log(data)
    parent.innerHTML = ""
    const factParagraph = document.createElement("p")
    parent.appendChild(factParagraph)
    factParagraph.innerText = data.value
  }
  openThem()
}
