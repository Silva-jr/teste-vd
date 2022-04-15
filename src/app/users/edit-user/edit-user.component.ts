import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ContactoService } from '../service/contacto.service';
import { DialogData, UsersComponent } from '../users.component';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss'],
})
export class EditUserComponent implements OnInit {
  idContacto: any;
  constructor(
    public dialogRef: MatDialogRef<UsersComponent>,
    @Inject(MAT_DIALOG_DATA) data,
    private formBuilder: FormBuilder,
    private contactoService: ContactoService
  ) {
    this.idContacto = data.id;
  }

  register: FormGroup;
  _id = '';
  user = '';
  contacto = '';

  ngOnInit(): void {
    //this.dialogRef.close();
    this.register = this.formBuilder.group({
      user: [null, Validators.required],
      contacto: [null, Validators.required],
    });

    this.getUserById(this.idContacto);
  }

  getUserById(id: any) {
    this.contactoService.getContactoById(id).subscribe((data: any) => {
      this._id = data._id;      
      this.register.patchValue({
        user: data.user._id,
        contacto: data.contacto,
      });
    });
  }

  updateContacto() {
    this.contactoService
      .updateContacto(this._id, this.register.value)
      .subscribe(
        (res: any) => {
          this.closeModal();
          this.register.reset();
        },
        (err: any) => {
          console.log(err);
        }
      );
  }

  closeModal(): void {
    this.dialogRef.close();
  }
}
