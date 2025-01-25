// -- JAVASCRIPT CAFE! -- //
//    PRODUCTS  //

let products = {
  whiteCoffee: {
    stock: 4,
    price: 4,
    wholesaleCost: 2,
  },
  blackCoffee: {
    stock: 7,
    price: 3.5,
    wholesaleCost: 1.5,
  },
  sandwich: {
    stock: 9,
    price: 8,
    wholesaleCost: 4,
  },
  muffin: {
    stock: 5,
    price: 8.5,
    wholesaleCost: 4.5,
  },
  eggs: {
    stock: 1,
    price: 12.5,
    wholesaleCost: 7,
  },
}

// CUSTOMERS

let customer = {
  order: [],
  money: 0,
}
let minOrderSize = 1
let maxOrderSize = 6
let cash = 0
let minCustomerMoney = 2
let maxCustomerMoney = 35
let transactionHistory = []

//Random integer generator
function getRandomInt(min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min
}

//Display products
function displayProducts() {
  for (let productName in products) {
    let product = products[productName]
    let productElement = document.getElementById(productName)
    productElement.innerHTML = `${productName}/($${product.price.toFixed(
      2
    )}): ${product.stock} `
    productElement.style.color = product.stock > 0 ? 'black' : 'red'
    if (productElement.style.color === 'red' || product.stock <= 0) {
      product.stock = 0
    }

    /* Checking whether the button is exist inside the p tag productelement
     * for make sure buttons are created only once, before appending it.*/
    if (!productElement.querySelector('button')) {
      let restockButton = document.createElement('button')
      restockButton.textContent = 'Restock'
      restockButton.className = 'restock-button'
      restockButton.style.cssText =
        'background-color:rgb(5, 142, 150); color: white; border: none; padding: 5px 10px; border-radius: 5px; cursor: pointer; font-size: 14px; margin-left: 8px;'
      restockButton.onmouseover = () =>
        (restockButton.style.backgroundColor = 'rgb(126, 136, 223)')
      restockButton.onmouseout = () =>
        (restockButton.style.backgroundColor = 'rgb(5, 142, 150)')
      restockButton.onclick = () => restockProduct(productName)

      productElement.appendChild(restockButton)
    }
  }
}
// display customer money
function displayCustomerMoney() {
  document.getElementById('customerMoney').innerHTML =
    'Customer Money: $' + customer.money.toFixed(2)
}

//displays the customer order
function displayCustomerOrder() {
  document.getElementById('customerOrder').innerHTML =
    'Customer Order :' + customer.order.join(', ')
}

// display cash
function displayCash() {
  document.getElementById('cash').innerHTML = 'Cash: $' + cash.toFixed(2)
}

// Check if we have enough cash to restock
function restockProduct(productName) {
  let product = products[productName]
  if (cash >= product.wholesaleCost) {
    // Deduct the wholesale cost from cash and increase product stock
    cash -= product.wholesaleCost
    product.stock++
    displayProducts()
    displayCash()
  } else {
    alert('Not enough cash to restock ' + productName)
  }
}

/** DECLARING FUNCTIONS FOR CUSTOMER ORDERS
 * get a random size for the order in a range, 1-5
 * make a new array of the things they are ordering
 * assign the new order to the customer object.
 * displays the customer order **/
function generateCustomerOrder() {
  let orderSize = getRandomInt(minOrderSize, maxOrderSize)
  let productNames = Object.keys(products)
  customer.money = getRandomInt(minCustomerMoney, maxCustomerMoney)
  let newOrder = []
  // cash = 0

  for (let i = 0; i < orderSize; i++) {
    let productIndex = getRandomInt(0, productNames.length - 1)
    let productName = productNames[productIndex]
    if (productName === 'eggs') {
      let eggSpecification = prompt(
        'How would you like your eggs cooked? (scrambled, fried, poached, etc.)'
      )
      if (!eggSpecification || eggSpecification.trim() === '') {
        alert('Eggs order canceled due to no cooking style was specified.')
        continue
      }
      productName += ` (${eggSpecification.trim()})`
    }
    newOrder.push(productName)
  }
  customer.order = newOrder
  displayCustomerMoney()
  displayCustomerOrder()
}

// Transaction History
function displayTransactionHistory() {
  let historyElement = document.getElementById('transactionHistory')
  historyElement.innerHTML = '<h3>Transaction History</h3>'

  // Create a table element
  let table = document.createElement('table')
  table.style.width = '100%'
  table.style.borderCollapse = 'collapse'

  // Create the table header row
  let headerRow = document.createElement('tr')

  let headers = ['Transaction #', 'Order', 'Total ($)']
  headers.forEach((headerText) => {
    let headerCell = document.createElement('th')
    headerCell.textContent = headerText
    headerCell.style.border = '1px solid #ccc'
    headerCell.style.padding = '8px'
    headerCell.style.backgroundColor = '#f5f5f5'
    headerCell.style.textAlign = 'left'
    headerRow.appendChild(headerCell)
  })

  table.appendChild(headerRow)

  // Create table rows for each transaction
  transactionHistory.forEach((transaction, index) => {
    let row = document.createElement('tr')

    let transactionNumberCell = document.createElement('td')
    transactionNumberCell.textContent = index + 1
    transactionNumberCell.style.border = '1px solid #ccc'
    transactionNumberCell.style.padding = '8px'

    let orderCell = document.createElement('td')
    orderCell.textContent = transaction.order.join(', ')
    orderCell.style.border = '1px solid #ccc'
    orderCell.style.padding = '8px'

    let totalCell = document.createElement('td')
    totalCell.textContent = transaction.total.toFixed(2)
    totalCell.style.border = '1px solid #ccc'
    totalCell.style.padding = '8px'

    row.appendChild(transactionNumberCell)
    row.appendChild(orderCell)
    row.appendChild(totalCell)

    table.appendChild(row)
  })

  historyElement.appendChild(table)
}

// make a variable to keep track of our sale total
// loop through the customer order array
// if we have  product in stock, sell it to them and keep track of the sale
// if we don't have it, alert we 're out of this product
// add the sale total to our cash
// display the new totals
//  clear the customer order
function fillOrder() {
  if (customer.order.length <= 0) {
    alert("Customer doesn't have any order.")
    return
  }

  let saleTotal = 0
  let productBeforeFillOrder = JSON.parse(JSON.stringify(products)) //Create a copy of the products object before processing the order

  // if you are out of one item in the customers order, they leave without paying
  for (let i = 0; i < customer.order.length; i++) {
    let productName = customer.order[i].split(' ')[0]
    if (products[productName] && products[productName].stock > 0) {
      saleTotal += products[productName].price
      if (saleTotal > customer.money) {
        alert("Customer doesn't have enough money for this order.")
        products = productBeforeFillOrder
        customer.order = []
        displayCustomerOrder()
        return
      }
      products[productName].stock--
    } else {
      alert(`We're out of ${productName}!`)
      products = productBeforeFillOrder
      customer.order = []
      displayCustomerOrder()
      return
    }
  }

  cash += saleTotal
  customer.money -= saleTotal
  transactionHistory.push({
    order: [...customer.order],
    total: saleTotal,
  })
  customer.order = []
  displayProducts()
  displayCash()
  displayCustomerMoney()
  displayCustomerOrder()
  displayTransactionHistory()
  // After filling the order, enable the refund button
  document.getElementById('refundButton').disabled = false
  displayRefundOptions()
}

// Refund logic
function processRefund() {
  let selectedProducts = []
  let refundCheckboxes = document.querySelectorAll(
    '#refundContainer input[type="checkbox"]'
  )

  refundCheckboxes.forEach((checkbox) => {
    if (checkbox.checked) selectedProducts.push(checkbox.value)
  })

  if (selectedProducts.length === 0) {
    alert('Please select at least one product for a refund.')
    return
  }

  // Random chance of passive-aggressive alert
  if (Math.random() < 0.1) {
    let refundReasons = [
      'Atmosphere was too noisy.',
      'The service was incredibly slow and not clean.',
      "I'm just not happy. This wasn't exactly what I was expecting, okay?",
    ]
    let randomReason =
      refundReasons[Math.floor(Math.random() * refundReasons.length)]
    alert(`Refund Denied: "${randomReason}".`)
    return
  }

  let refundAmount = 0
  selectedProducts.forEach((productName) => {
    if (products[productName]) refundAmount += products[productName].price
  })

  alert(`Refund Approved! Amount: $${refundAmount.toFixed(2)}`)
  cash -= refundAmount

  // Re-enable products and update stock
  selectedProducts.forEach((productName) => {
    if (products[productName]) {
      products[productName].stock++
    }
  })

  displayProducts()
  displayCash()
  document.getElementById('refundButton').disabled = true
  let refundContainer = document.getElementById('refundContainer')
  refundContainer.innerHTML = '' // Clear existing options
}

// Create refund options after order is filled
function displayRefundOptions() {
  let refundContainer = document.getElementById('refundContainer')
  refundContainer.innerHTML = '' // Clear existing options

  transactionHistory[transactionHistory.length - 1].order.forEach((item) => {
    let productName = item.split(' ')[0]
    let checkbox = document.createElement('input')
    checkbox.type = 'checkbox'
    checkbox.value = productName

    let label = document.createElement('label')
    label.textContent = productName

    let div = document.createElement('div')
    div.appendChild(checkbox)
    div.appendChild(label)

    refundContainer.appendChild(div)
  })
}

// Update refund options on order generation
document.getElementById('customerButton').onclick = () => {
  generateCustomerOrder()
}

// Ensure refund options update on order fulfillment
document.getElementById('fillOrder').onclick = () => {
  fillOrder()
}
// Add refund button event listener
document.getElementById('refundButton').onclick = processRefund
displayProducts()
displayCash()
