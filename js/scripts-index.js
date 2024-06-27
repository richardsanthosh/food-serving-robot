console.log(window.location.pathname)
if (window.location.pathname == "/"){
  var priceCheeseBurger = 5.99
  var priceHamBurger = 6.99
  var priceBuffBurger = 9.99

  document.getElementById('cheese-price').textContent = `${priceCheeseBurger} $`
  document.getElementById('ham-price').textContent = `${priceHamBurger} $`
  document.getElementById('buff-price').textContent = `${priceBuffBurger} $`

  var qtyCheeseBurger = document.getElementById('cheese-qty')
  var qtyHamBurger = document.getElementById('ham-qty')
  var qtyBuffBurger = document.getElementById('buff-qty')
  var checkoutBtn = document.getElementById('checkout')
  let totalQuantity = 0

  const updateCheckoutBtn = () => {
    totalQuantity = parseInt(qtyCheeseBurger.value) + parseInt(qtyHamBurger.value) + parseInt(qtyBuffBurger.value)
    checkoutBtn.disabled = totalQuantity === 0
  }

  qtyCheeseBurger.addEventListener('change', updateCheckoutBtn)
  qtyHamBurger.addEventListener('change', updateCheckoutBtn)
  qtyBuffBurger.addEventListener('change', updateCheckoutBtn)

  function updateLocalStorage() {

    localStorage.setItem('burgerQuantities', JSON.stringify({
      localQtyCheeseBurger : qtyCheeseBurger.value,
      localQtyHamBurger : qtyHamBurger.value,
      localQtyBuffBurger : qtyBuffBurger.value,
      localPriceCheeseBurger : priceCheeseBurger,
      localPriceHamBurger : priceHamBurger,
      localPriceBuffBurger : priceBuffBurger,
    }))
    console.log("success write")
  }

  checkoutBtn.addEventListener('click', () => {
    updateLocalStorage()
    location.href = '/cart.html'
  })
}
else {
  function getBurgerQuantities() {
    const data = localStorage.getItem('burgerQuantities')
    if (data) {
      console.log("success read")
      return JSON.parse(data)
    } else {
      return { classic: 0, cheese: 0, bacon: 0 }
    }
  }

  const burgerData = getBurgerQuantities()
  const qtyCheeseBurger = burgerData.localQtyCheeseBurger
  const qtyHamBurger = burgerData.localQtyHamBurger
  const qtyBuffBurger = burgerData.localQtyBuffBurger
  const priceCheeseBurger = burgerData.localPriceCheeseBurger
  const priceHamBurger = burgerData.localPriceHamBurger
  const priceBuffBurger = burgerData.localPriceBuffBurger

  if (qtyCheeseBurger != 0) {
    document.getElementById('cart-cheese-name').textContent = 'Cheese Burger'
    document.getElementById('cart-cheese-qty').textContent = qtyCheeseBurger
    document.getElementById('cart-cheese-price').textContent = priceCheeseBurger
  }
  if (qtyHamBurger != 0) {
    document.getElementById('cart-ham-name').textContent = 'Ham Burger'
    document.getElementById('cart-ham-qty').textContent = qtyHamBurger
    document.getElementById('cart-ham-price').textContent = priceHamBurger
  }
  if (qtyBuffBurger != 0) {
    document.getElementById('cart-buff-name').textContent = 'Buff Burger'
    document.getElementById('cart-buff-qty').textContent = qtyBuffBurger
    document.getElementById('cart-buff-price').textContent = priceBuffBurger
  }
}
