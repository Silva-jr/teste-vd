import { CommonModule } from "@angular/common";
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import {MatCardModule} from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialogActions, MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { UsersRoutingModule } from "./users.routing";
import { UsersComponent } from "./users.component";
import { AddUserComponent } from "./add-user/add-user.component";
import { AddContactoComponent } from './add-contacto/add-contacto.component';
import { EditUserComponent } from './edit-user/edit-user.component';


@NgModule({
  declarations: [UsersComponent, AddUserComponent, AddContactoComponent, EditUserComponent],
  imports: [
    CommonModule,
    UsersRoutingModule,
    MatCardModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    MatMenuModule,
    MatButtonModule,
    MatTooltipModule,
  ],
  exports: [MatDialogModule, MatDialogActions],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class UsersModule {}