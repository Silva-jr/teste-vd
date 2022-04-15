import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ContactoService } from '../service/contacto.service';
import { UsersComponent } from '../users.component';

@Component({
  selector: 'app-add-contacto',
  templateUrl: './add-contacto.component.html',
  styleUrls: ['./add-contacto.component.scss']
})
export class AddContactoComponent implements OnInit {

  register: FormGroup;
  id: any;

  constructor(
    public dialogRef: MatDialogRef<UsersComponent>,
    @Inject(MAT_DIALOG_DATA) data,
    private contactoService: ContactoService,
    private formBuilder: FormBuilder
  ) {
    this.id = data.id;    
  }

  onNoClick(): void {
    this.dialogRef.close();
    
  }

  ngOnInit(): void {
    this.register = this.formBuilder.group({
      user: [this.id, Validators.required],         
      contacto: [null, Validators.required],      
    });

    
  }

  addContacto(): void {
    this.contactoService.addContacto(this.register.value).subscribe(
      (res: any) => {
        const message = 'Contacto adiconado com sucesso';
        this.onNoClick();
      },
      (err: any) => {
        console.log(err);
      }
    );
  }
}