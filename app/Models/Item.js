import { generateId } from "../Utils/generateId.js";

export class Item {
  constructor (data) {
    this.id = data.id || generateId()
    // NOTE you're gonna need this, very important. This keeps track of which order I belong to
    this.orderId = data.orderId
    this.name = data.name
    this.price = parseInt(data.price)
  }

  get Template() {
    return/*html*/`
    <li class="d-flex justify-content-between list-group-item">
      <span>${this.name}</span>
      <span>$${this.price} <i onclick="app.itemsController.removeItem('${this.id}')" class="mdi mdi-close text-danger selectable rounded"  title="Remove Item"></i></span>
    </li>
    `
  }
}