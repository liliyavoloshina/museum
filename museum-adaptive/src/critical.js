import './scss/critical.scss'
import './js/header'

console.log(`
Score: 150 / 150


  ✅ Вёрстка соответствует макету. Ширина экрана 1024px +40

  ✅ Вёрстка соответствует макету. Ширина экрана 768px +40

  ✅ Вёрстка соответствует макету. Ширина экрана 420px +40

  ✅ Ни на одном из разрешений до 320px включительно не появляется горизонтальная полоса прокрутки +6

  ✅ Совмещается адаптивная и респонсивная (резиновая) вёрстка +14

  ✅ На ширине экрана 1024рх и меньше реализовано адаптивное меню +12

  ✅ Оптимизация скорости загрузки страницы +8
`)

console.image = function(url, size) {
  const image = new Image()
  image.onload = function() {
    const style = [
      `font-size: 1px;`,
      `padding: ${(this.height / 100) * size}px ${(this.width / 100) * size}px;`,
      `background: url(${url}) no-repeat;`,
      `background-size: contain;`
    ].join(' ')
    console.log('%c ', style)
  }
  image.src = url
}

console.image('https://i.ibb.co/tqV2MSf/proof-speed.jpg', 30)
