import { appState } from "../AppState.js"
import { Order } from "../Models/Order.js"
import { saveState } from "../Utils/Store.js"

class OrdersService {
  toggleShellfishAllergy(id) {
    let order = appState.orders.find(order => order.id == id)
    if (!order) {
      throw new Error('Bad ID')
    }
    // NOTE bad way
    // if (order.shellfishAllergy == true) {
    //   order.shellfishAllergy = false
    // }
    // else {
    //   order.shellfishAllergy = true
    // }
    // NOTE toggle bool
    order.shellfishAllergy = !order.shellfishAllergy
    // NOTE trigger event listener to redraw
    // appState.orders = appState.orders
    appState.emit('orders')
    saveState('orders', appState.orders)
  }
  createOrder(formData) {
    let order = new Order(formData)
    appState.orders = [order, ...appState.orders]
    console.log(appState.orders);
    saveState('orders', appState.orders)
  }

}

export const ordersService = new OrdersService()