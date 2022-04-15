import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Contacto } from '../security/models/contacto';
import { UserAuth } from '../security/models/userAuth';
import { AddContactoComponent } from './add-contacto/add-contacto.component';
import { AddUserComponent } from './add-user/add-user.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { ContactoService } from './service/contacto.service';
import { LoginService } from './service/login.service';

export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  dataContacto: Contacto[] = [];
  dataUser: any[];
  currentUser: UserAuth = new UserAuth();
  name: any;
  isLoadingResults = true;
  
  register: FormGroup;    
  bloqueio = '';

  constructor(
    public dialog: MatDialog,
    private contactoService: ContactoService,
    private loginService: LoginService,
    private formBuilder: FormBuilder
  ) {
    this.currentUser = loginService.decodeTokne();
  }

  ngOnInit(): void {
       this.register = this.formBuilder.group({     
      bloqueio: [true, Validators.required],
    });
    this.getContacto();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddUserComponent, {
      width: '70%',
      disableClose: true,
      autoFocus: true,
    });

    dialogRef.afterClosed().subscribe(() => {
      this.getContacto();
    });
  }

  openAddContacto(id: any): void {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '50%';

    dialogConfig.data = {
      id: id,
      title: 'Angular For Beginners',
    };

    const dialogRe = this.dialog.open(AddContactoComponent, dialogConfig);

    dialogRe.afterClosed().subscribe(() => {
      this.getContacto();
    });
  }

  openEditContacto(id: any): void {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '50%';

    dialogConfig.data = {
      id: id,
    };

    const dialogRe = this.dialog.open(EditUserComponent, dialogConfig);

    dialogRe.afterClosed().subscribe(() => {
      this.getContacto();
    });
  }

  getContacto() {
    // tslint:disable-next-line: deprecation
    this.contactoService.getContacto().subscribe(
      (data: any) => {
        this.dataContacto = data;
        console.log(this.dataContacto);
      },
      (err: any) => {
        console.log(err);
      }
    );
  }

  bloquear(id: string) {
    this.contactoService.updateContacto(id, this.register.value).subscribe(
      (res: any) => {
        console.log(res);
        this.getContacto();
      },
      (err) => {
        console.log(err);
      }
    );
  }

  search() {
    if (this.name == '') {
      this.getContacto();
    } else {
      this.dataContacto = this.dataContacto.filter((res) => {
        return res.user.nome.toLowerCase().match(this.name.toLowerCase());
      });
    }
  }
}
