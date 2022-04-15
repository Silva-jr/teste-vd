import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ContactoService } from '../service/contacto.service';
import { DialogData, UsersComponent } from '../users.component';

@Component({
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss'],
})
export class AddUserComponent implements OnInit {
  register: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<UsersComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private contactoService: ContactoService,
    private formBuilder: FormBuilder
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    this.register = this.formBuilder.group({
      nome: [null, Validators.required],
      email: [null, Validators.required],      
      contacto: [null, Validators.required],
      tipo_user: ['Contacto',],
    });
  }

  addContacto(): void {
    this.contactoService.addUserContacto(this.register.value).subscribe(
      (res: any) => {
        const message = 'User adiconado com sucesso';
        this.onNoClick();
      },
      (err: any) => {
        console.log(err);
      }
    );
  }
}
