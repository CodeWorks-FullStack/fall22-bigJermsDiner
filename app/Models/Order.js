import { appState } from "../AppState.js"
import { generateId } from "../Utils/generateId.js"

export class Order {
  constructor(data) {
    this.id = data.id || generateId()
    this.name = data.name
    this.type = data.type
    this.shellfishAllergy = data.shellfishAllergy || false
  }

  get Template() {
    return /*html*/`
    <div class="col-12 col-md-6">
      <div class="bg-light order-card rounded elevation-1 m-lg-3 m-1 px-lg-5 p-3">
        <div class="d-flex justify-content-between">
          <h4>Customer:</h4>
          <h4>
            ${this.shellfishAllergy ? '<i class="fa-solid fa-shrimp text-danger"></i>' : ''}
          ${this.name}
          </h4>
        </div>
        <div class="d-flex justify-content-between mb-2">
          <h5>Order Type:</h5>
          <h5>${this.type}</h5>
        </div>
        <div class="d-flex mb-2">
          <h5>Shellfish Allergy?</h5>
          <!--STUB conditionally add checked attribute to a checkbox with a ternary-->
          <input onchange="app.ordersController.toggleShellfishAllergy('${this.id}')" class="ms-2" type="checkbox" ${this.shellfishAllergy ? 'checked' : ''}>
        </div>
        <ul class="list-group elevation-2 mb-3">
          <!--REVIEW do this tomorrow-->
          ${this.ItemTemplates}
        </ul>
        <!-- NOTE                                          vvvvv Pass down the Id to add to our object -->
        <form class="bg-info rounded p-1" onsubmit="app.itemsController.createItem('${this.id}')">
          <div class="d-flex w-100 ">
            <div class="flex-grow-1">
              <input class="form-control square-right" type="text" required minlength="2" name="name" placeholder="Name..."/>
              <label for="name" class="visually-hidden">Name</label>
            </div>
            <div>
              <input class="form-control  square" type="number" required min="0" name="price" placeholder="0.00"/>
              <label for="price" class="visually-hidden">Price</label>
            </div>
            <button type="submit" class="btn btn-info square-left" title="Add Item">
              <b><i class="mdi mdi-plus text-light"></i></b>
            </button>
          </div>
        </form>
        <div class="my-3 d-flex align-items-end py-3 border-top justify-content-between">
          <h5>Items: ${this.Items.length}</h5>
          <h2>Total: $${this.OrderTotal}</h5>
        </div>
      </div>
    </div>
    `
  }

  get ItemTemplates() {
    let template = ''
    // let filteredItems = appState.items.filter(item => item.orderId == this.id)
    this.Items.forEach(item => template += item.Template)
    return template
  }

  get Items() {
    let items = appState.items.filter(item => item.orderId == this.id)
    return items
  }

  get OrderTotal() {
    let total = 0
    this.Items.forEach(item => total += item.price)
    return total
  }
}