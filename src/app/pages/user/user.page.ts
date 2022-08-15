import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProfileService } from 'src/app/services/profile.service';
import { UserService } from 'src/app/services/user.service';
import Profile from 'src/app/types/Profile';
import User from 'src/app/types/User';

@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
})
export class UserPage implements OnInit {
  public users: User[];
  public profileNamesValid: string[];
  public userForm: FormGroup;
  public profileName: string;
  public pin: number;
  public completeName: string;
  public profiles: Profile[]
  public profileNameSelected: string;
  public profilesNamesForSpecificUser: string[];
  constructor(private userService: UserService,
    private profileService: ProfileService,
    private fb: FormBuilder) {
      this.userForm = this.fb.group({
        profileName: ['', Validators.required],
        completeName: ['', Validators.required],
        pin: ['', Validators.required]
      });
    }

  ngOnInit() {
    this.userService.getUsers().subscribe(
      (res: User[]) => this.users = res
    );
    this.profileService.getProfiles().subscribe(
      (res: Profile[]) => {
        this.profiles = res;
        this.profileNamesValid = res.map( e => e.profileName);
        this.profilesNamesForSpecificUser = res.map(({profileName}) => profileName)
        console.log(this.profileNamesValid);
      }
    );
  }
  public onChangeInputProfileName(){
    console.log(this.profileName)
    this.profileNamesValid = this.profiles.filter(({profileName}) => profileName.toLowerCase().includes(this.profileName.toLowerCase())).map(({profileName})=>profileName)
  }
  public onChangeInputPin(){
    if(this.pin.toString().length > 4) {
      this.pin = parseInt(this.pin.toString().slice(0, 4))
    }
    console.log(this.pin)
  }
  public async createUser(){
    await this.userService.createUser({
      profileName: this.profileNameSelected,
      pin: this.pin,
      completeName: this.completeName
    }).toPromise();
    this.users = await this.userService.getUsers().toPromise() as User[];
  }
  public selectProfile(profileName: string){
    if(profileName === this.profileNameSelected){
      this.profileNameSelected = ""
      this.profileNamesValid = this.profiles.filter(({profileName}) => profileName.toLowerCase().includes('')).map(({profileName})=>profileName)
      return;
    }
    this.profileNameSelected = profileName
    this.profileNamesValid = this.profileNamesValid.filter(el => el === profileName)
    console.log(this.profileNameSelected)
  }
  public async deleteUser(id: string){
    if(confirm('¿Estás seguro que quieres eliminar este usuario?')){
      await this.userService.deleteUser(id).toPromise()
      this.users = await this.userService.getUsers().toPromise() as User[];
    } else {return}
  }
  public booleanToEditUser(user: User){
    user.contentEditable = !user.contentEditable
  }
  public async editUser(user: User){
    this.booleanToEditUser(user);
    await this.userService.editUser(user).toPromise()
  }
  public selectProfileForSpecificUser(profileName: string, user: User){
    user.profileName = profileName
  }
  //crear funcionalidad para que al momento de tratar de cambiar el nombre del perfil encaje con los ya existentes

}
