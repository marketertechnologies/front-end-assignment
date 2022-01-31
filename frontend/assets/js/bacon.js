const button = document.querySelector('button')
const img = document.querySelector('img')
const imgSection = img.parentElement
button.parentElement.parentElement.classList.add('container')
button.parentElement.classList.add('button-container')
imgSection.classList.add('img-container')

button.addEventListener('click', () => {
  const i = img.cloneNode()
  imgSection.appendChild(i)
})
