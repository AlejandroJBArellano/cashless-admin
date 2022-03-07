import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ItemService } from 'src/app/services/item.service';
import { MenuService } from 'src/app/services/menu.service';
import Item from 'src/app/types/Item';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {
  public menuForm: FormGroup;
  public menus: {_id: string; items: Item[]}[];
  public itemsFounded: Item[];
  public items: Item[]
  public searchText: string;
  public selected: string;
  public newMenu: Item[] = [];
  constructor(private itemService: ItemService,
    private menuService: MenuService,
    private fb: FormBuilder) {
      this.menuForm = this.fb.group({
        productName: ['', Validators.required]
      })
    }
    // pasar todo a profile para crear automáticamente menpus desde allí
  ngOnInit() {
    this.menuService.getMenus().subscribe(
      (res: {_id: string; items: Item[]}[]) => this.menus = res
    );
    this.itemService.getItems().subscribe(
      (res: Item[]) => this.items = res
    );
  }
  public copyIdToClipboard(id: string){
    navigator.clipboard.writeText(id);
  }
  public findItems(){
    console.log(this.menuForm.value)
    this.itemService.getItemsByProductName(this.menuForm.value.productName)
      .subscribe((res: Item[]) => this.itemsFounded = res)
  }
  public searchItems(){
    console.log(this.searchText, this.selected, this.itemsFounded)
    if(this.searchText.length === 0){
      this.itemsFounded.length = 0;
      return;
    }
    this.itemsFounded = this.items.filter(item =>
      item[this.selected].toLowerCase().includes(this.searchText.toLowerCase()))
    // bucar todas las configuraciones YY verificar que no haya duplicados
  }
  public addItemToNewMenu(item: Item){
    this.newMenu.push(item);
  }
  public deleteItem(_id:string){
    this.newMenu = this.newMenu.filter(item => item._id !== _id);
  }
  public createMenu(){
    this.menuService.createMenu(this.newMenu).subscribe(
      res => {
        console.log(res);
        this.newMenu.length = 0;
        this.searchText = ""
        this.itemsFounded.length = 0
        this.menuService.getMenus().subscribe(
          (res: {_id: string; items: Item[]}[]) => this.menus = res
        )
      }, err => console.log(err)
    )
  }
}
