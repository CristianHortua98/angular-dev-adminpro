import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SearchService } from '../../services/search.service';
import { User } from '../../auth/interfaces/models/user.interface';
import { Hospital } from '../../interfaces/hospital.interface';
import { Doctor } from '../../interfaces/doctor.interface';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styles: ``
})
export class SearchComponent implements OnInit{

  public users: User[] = [];
  public hospitals: Hospital[] = [];
  public doctors: Doctor[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private searchService: SearchService,
    private router: Router
  ){}


  ngOnInit(): void {

    this.activatedRoute.params
      .subscribe({
        next:({term}) => {
          this.search(term);
        }
      })

  }


  search(term: string){

    this.searchService.searchTodo(term)
      .subscribe({
        next: (resp) => {

          this.users = resp.users;
          this.hospitals = resp.hospitals;
          this.doctors = resp.doctors;

        }
      })

  }

  showDoctor(doctor: Doctor){

    this.router.navigateByUrl(`/dashboard/doctor/${doctor.id}`);

  }



}
