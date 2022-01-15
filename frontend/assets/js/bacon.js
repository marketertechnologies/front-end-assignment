const button = document.querySelector('button')
const img = document.querySelector('img')
const imgSection = img.parentElement
imgSection.style.height = '500px'
imgSection.style.overflow = 'scroll'

button.addEventListener('click', () => {
  const i = img.cloneNode()
  imgSection.appendChild(i)
})
