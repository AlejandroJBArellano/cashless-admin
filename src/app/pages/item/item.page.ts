import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ViewDidEnter } from '@ionic/angular';
import { ItemService } from 'src/app/services/item.service';
import { MenuService } from 'src/app/services/menu.service';
import Item from 'src/app/types/Item';

@Component({
  selector: 'app-item',
  templateUrl: './item.page.html',
  styleUrls: ['./item.page.scss'],
})
export class ItemPage implements ViewDidEnter {
  public itemForm: FormGroup;
  public items: Item[];
  constructor(private fb: FormBuilder,
    private itemService: ItemService,
    private menuService: MenuService) {
    this.itemForm = this.fb.group({
      name: ['', Validators.required],
      colorHex: ['', Validators.required],
      price: [0, Validators.required],
      proveedor: ['', Validators.required]
    });
   }

  ionViewDidEnter() {
    this.itemService.getItems().subscribe(
      (res: Item[]) => this.items = res.reverse()
    );
  }
  onSubmit(){
    console.log(this.itemForm.value);
    this.itemService.createItem(this.itemForm.value).subscribe(
      res => {
        console.log(res);
        this.ionViewDidEnter();
        this.itemForm.reset()

      },
      err => console.error(err)
    );
  }
  editItem(item: Item){
    item.contentEditable = !item.contentEditable;
  }
  async sendItemToChange(item: Item){
    console.log("item",item)
    const [itemFounded] = await this.itemService.getItemById(item._id).toPromise() as Item[]
    console.log("itemFounded",itemFounded)
    const menus = await this.menuService.getMenusByItem(itemFounded).toPromise() as {items: Item[]; _id: string;}[]
    if(menus){
      console.log(menus)
      for await (const menu of menus) {
        menu.items = menu.items.filter(({name}) => name !== itemFounded.name);
        menu.items.push(item)
        await this.menuService.editMenu(menu).toPromise()
        console.log("menu",menu)
      }
    }
    await this.itemService.changeItem(item).toPromise()
    this.editItem(item)
  }
  async deleteItem(_id: string){
    if(confirm('¿Quieres eliminar este producto definitivamente?')){
      await this.itemService.deleteItem(_id).toPromise()
      this.ionViewDidEnter();
    } else {return;}
  }
}
