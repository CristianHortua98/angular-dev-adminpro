import { Component, computed, OnDestroy, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

import { User } from '../../../auth/interfaces/models/user.interface';
import { AuthService } from '../../../services/auth.service';
import { ModalImageService } from '../../../services/modal-image.service';
import { SearchService } from '../../../services/search.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.css',
})
export class UsersComponent implements OnInit, OnDestroy {
  public countUsers: number = 0;
  public users: User[];
  public usersTemp: User[];
  public imgSubs: Subscription;
  public offset: number = 0;
  public loading: boolean = true;

  constructor(
    private authService: AuthService,
    private searchService: SearchService,
    private modalImageService: ModalImageService
  ){}
  
  ngOnInit(): void {
    this.loadUsers();
    
    //RECIBIMOS LA SEÑAL DE QUE CAMBIO LA IMAGEN PARA ACTUALIZAR LA TABLE
    this.imgSubs = this.modalImageService.newImg.subscribe(img => this.loadUsers());
  }


  ngOnDestroy(): void {

    //DESTRUIMOS LA SUSCRIPCION A LA SEÑAL DE ACTUALIZACION DE IMAGEN
    this.imgSubs.unsubscribe();

  }

  loadUsers() {
    this.loading = true;

    this.authService.loadUsers(this.offset).subscribe({
      next: (resp) => {
        // console.log(resp);
        this.countUsers = resp.totalUser;
        this.users = resp.users;
        this.usersTemp = resp.users;
        this.loading = false;
      },
    });
  }

  changePage(valor: number) {
    this.offset += valor;

    if (this.offset < 0) {
      this.offset = 0;
    } else if (this.offset >= this.countUsers) {
      this.offset -= valor;
    }

    this.loadUsers();
  }

  search(term: string) {
    if (term.length === 0) {
      this.users = this.usersTemp;
      return;
    }

    this.searchService.search('users', term).subscribe({
      next: (resp: User[]) => {
        this.users = resp;
      },
    });
  }

  deleteUser(user: User) {

    if(this.authService.currentUser().id === user.id){
      Swal.fire({
        title: 'Attetion!',
        text: `It cannot eliminate itself`,
        icon: 'error',
      });
      return;
    }

    Swal.fire({
      title: 'Are you sure you want to delete the User?',
      text: `delete the User: ${user.name}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete User!',
    }).then((result) => {
      if (result.isConfirmed) {

        this.authService.deleteUser(user).subscribe({
          next:(resp) => {
            Swal.fire({
              title: 'Deleted!',
              text: `User: ${user.name} has been deleted.`,
              icon: 'success',
            });
            this.loadUsers();
          },
          error: (err) => {
            Swal.fire({
              title: 'Attetion!',
              text: `${err.error.message}`,
              icon: 'error',
            });
            this.loadUsers();
          }
        })
      }
    });
  }


  changeRole(user: User){

    this.authService.saveUser(user)
      .subscribe({
        next: (resp) => {
          console.log(resp);
        },
        error: (err) => {
          console.log(err);
        }
      })

  }

  openModal(user: User){
    this.modalImageService.openModal('users', user.id, user.img);
  }

}
