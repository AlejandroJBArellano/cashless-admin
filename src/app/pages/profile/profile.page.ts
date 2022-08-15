import { Component } from '@angular/core';
import { ViewDidEnter } from '@ionic/angular';
import { ValueAccessor } from '@ionic/angular/directives/control-value-accessors/value-accessor';
import { ItemService } from 'src/app/services/item.service';
import { MenuService } from 'src/app/services/menu.service';
import { ProfileService } from 'src/app/services/profile.service';
import { UserService } from 'src/app/services/user.service';
import Item from 'src/app/types/Item';
import Order from 'src/app/types/Order';
import Profile from 'src/app/types/Profile';
import User from 'src/app/types/User';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements ViewDidEnter {
  public profiles: Profile[];
  public itemsFounded: Item[];
  public items: Item[];
  public searchText: string;
  public selected: string = "name";
  public newMenu: Item[] = [];
  public profileForm: Profile;
  public profileName: string;
  constructor(private profileService: ProfileService,
    private itemService: ItemService,
    private menuService: MenuService,
    private userService: UserService) {}

  ionViewDidEnter(){
    this.itemService.getItems().subscribe(
      (res: Item[]) => {
        this.itemsFounded = [...res]
        this.items = res
      }
    );
    this.profileService.getProfiles().subscribe(
      (res: Profile[]) => {
        this.profiles = res;
        console.log(this.profiles);
      }
    );
  }

  public async deleteProfile(profile:Profile){
    // if(confirm(`¿Quieres eliminar de verdad el perfil con ID ${id}`)){
    //   await this.profileService.deleteProfile(id).toPromise()
    // }
    const usersToDelete = await this.userService.getUsersByParams({profileName: profile.profileName}).toPromise() as User[]
    console.log(usersToDelete)
    if(confirm(`¿Estás seguro que quieres eliminar el perfil ${profile.profileName}? ${usersToDelete.length > 0 ? ' También se eliminarán a los usuarios ' : ''}${usersToDelete.map(e => `${e.completeName}`)}`)){
      console.log('yes')
      await this.profileService.deleteProfile(profile._id).toPromise()
      for await (const user of usersToDelete) {
        await this.userService.deleteUser(user._id).toPromise()
      }
      this.profiles = await this.profileService.getProfiles().toPromise() as Profile[]
    }
  }
  public async deleteItem(id: string){
    this.newMenu = this.newMenu.filter( item => item._id !== id)
  }
  async createProfile(){
    // {newMenu: {items: Item[], _id: string}}
    const resMenu: any = await this.menuService.createMenu(this.newMenu).toPromise()
    this.profileForm = {
      menuId: resMenu.newMenu._id,
      profileName: this.profileName
    }
    await this.profileService.createProfile(this.profileForm).toPromise()
    this.newMenu.length = 0;
    this.searchText = ""
    this.itemsFounded.length = 0
    this.profileForm = null;
    this.profiles = await this.profileService.getProfiles().toPromise() as any
  }

  public addItemToNewMenu(item: Item){
    if(!(this.newMenu.find(i => i === item))){
      this.newMenu.push(item);
    }
  }
  public searchItems(){
    if(Array.isArray(this.selected)){
      for (const iterator of this.selected) {
        const array = this.items.filter(item =>
          item[iterator].toLowerCase().includes(this.searchText.toLowerCase()));
        console.log(array)
        this.itemsFounded = [...array]
        this.itemsFounded = this.itemsFounded.filter((value, index, self) => index === self.findIndex((t) => t.name === value.name))
        return;
      }
    }
    console.log(this.selected);
    if(this.searchText.length === 0){
      this.itemsFounded = [...this.items];
      return;
    }
    this.itemsFounded = this.items.filter(item =>
      item[this.selected].toLowerCase().includes(this.searchText.toLowerCase()))
    // bucar todas las configuraciones YY verificar que no haya duplicados
  }

  public setEditProfile(profile: Profile){
    profile.contentEditable = !profile.contentEditable
  }

  public async deleteItemFromMenu(profile: Profile, item: Item){
    if(confirm(`¿Seguro que quieres eliminar ${item.name} del perfil ${profile.profileName}?`)){
      profile.menu.items = profile.menu.items.filter(i => i !== item)
      await this.menuService.editMenu(profile.menu).toPromise()
    }
  }
  public async editProfile(profile: Profile){
    const [profileFounded] = await this.profileService.getProfileById(profile) as Profile[]
    console.log(profileFounded)
    const users = await this.userService.getUsersByParams({profileName: profileFounded.profileName}).toPromise() as User[]
    for await (const user of users) {
      user.profileName = profile.profileName
      await this.userService.editUser(user).toPromise();
    };
    await this.profileService.editProfile(profile).toPromise();
    this.setEditProfile(profile)
  }
  public async addItemToMenuEditingProfile(profile: Profile){
    profile.newItemId = profile.newItemId.trim()
    const [itemToNewMenu] = await this.itemService.getItemById(profile.newItemId).toPromise() as Item[]
    const menu = await this.menuService.getMenuById(profile.menu._id).toPromise() as {items: Item[]; _id: string;};
    profile.newItemId = ""
    for (const item of menu.items) {
      if(item.name === itemToNewMenu.name){
        alert(`El producto ${itemToNewMenu.name} ya existe en el menú del perfil ${profile.profileName}`)
        return
      }
    }
    menu.items.push(itemToNewMenu)
    await this.menuService.editMenu(menu).toPromise()
    profile.menu.items.push(itemToNewMenu)
  }

}
