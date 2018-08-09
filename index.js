// global datastore
let store = { neighborhoods: [], meals: [], customers: [], deliveries: [] };

let neighborhoodId = 0
class Neighborhood {
  constructor(name) {
    this.id = ++neighborhoodId
    this.name = name
    store.neighborhoods.push(this)
  }

  deliveries() {
    return store.deliveries.filter((delivery) => delivery.neighborhoodId === this.id)
  }

  customers() {
    return store.customers.filter((customer) => customer.neighborhoodId === this.id)
  }

  meals() {
    let mealIds =  this.deliveries().map(delivery => delivery.mealId)
    let neighborhoodMeals = mealIds.map(mealId => store.meals.filter(meal => meal.id === mealId)[0])
    return [...new Set(neighborhoodMeals)]
  }

}

let mealId = 0
class Meal {
  constructor(title, price) {
    this.id = ++mealId
    this.title = title
    this.price = price
    store.meals.push(this)
  }

  deliveries() {return store.deliveries.filter(delivery => delivery.mealId === this.id)}

  customers() {
    let customerIds = this.deliveries().map( delivery => delivery.customerId)
    return customerIds.map(customerId => store.customers.filter(customer => customer.id === customerId)[0])
  }

  static byPrice() {
    let meals = store.meals
    let sortedMeals = meals.sort((a, b) => b.price - a.price)
    return sortedMeals
  }

}

let customerId = 0
class Customer {
  constructor(name, neighborhoodId) {
    this.id = ++customerId
    this.name = name
    this.neighborhoodId = neighborhoodId
    store.customers.push(this)
  }

  deliveries() {
    return store.deliveries.filter( delivery => delivery.customerId === this.id)
  }

  meals() {
    let customerMealIds =  this.deliveries().map(delivery => delivery.mealId)
    return customerMealIds.map(mealId => store.meals.filter(meal => meal.id === mealId)[0])
  }

  totalSpent() {
    let prices = this.meals().map(meal => meal.price)
    return prices.reduce((a, b) => a+ b, 0)
  }

}

let deliveryId = 0
class Delivery {
  constructor(mealId, neighborhoodId, customerId) {
    this.id = ++ deliveryId
    this.neighborhoodId = neighborhoodId
    this.customerId = customerId
    this.mealId = mealId
    store.deliveries.push(this)
  }

  meal() {
    return store.meals.filter(meal => meal.id === this.mealId)[0]
  }

  customer() {
    return store.customers.filter(customer => customer.id === this.customerId)[0]
  }

  neighborhood() {
    return store.neighborhoods.filter(neighborhood => neighborhood.id === this.neighborhoodId)[0]
  }

}
