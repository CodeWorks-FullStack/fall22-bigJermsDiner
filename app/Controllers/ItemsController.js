import { appState } from "../AppState.js";
import { itemsService } from "../Services/ItemsService.js";
import { getFormData } from "../Utils/FormHandler.js";
import { setHTML } from "../Utils/Writer.js";

export class ItemsController {

  constructor () {
  }

  createItem(orderId) {
    try {
      window.event.preventDefault()
      // console.log('Create Item is working');
      let form = window.event.target
      let formData = getFormData(form)
      formData.orderId = orderId
      console.log('does this look okay?', formData);
      itemsService.createItem(formData)
      // @ts-ignore
      form.reset()
    } catch (error) {
      console.error('[CREATE_ITEM]', error);
    }
  }

  removeItem(id) {
    // console.log(id);
    if (window.confirm('Do you want to remove this item?')) {
      itemsService.removeItem(id)
    }
  }
}