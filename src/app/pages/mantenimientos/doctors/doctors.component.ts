import { Component, OnDestroy, OnInit } from '@angular/core';
import { DoctorService } from '../../../services/doctor.service';
import { Doctor } from '../../../interfaces/doctor.interface';
import { delay, Subscription } from 'rxjs';
import { SearchService } from '../../../services/search.service';
import { ModalImageService } from '../../../services/modal-image.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-doctors',
  templateUrl: './doctors.component.html',
  styleUrl: './doctors.component.css'
})
export class DoctorsComponent implements OnInit, OnDestroy{

  public offset: number = 0;
  public loading = true;
  public doctors: Doctor[];
  public doctorsTemp: Doctor[];
  public countDoctors: number = 0;
  public imgSubs: Subscription;

  constructor(
    private doctorService: DoctorService,
    private searchService: SearchService,
    private modalImageService: ModalImageService
  ){}
  
  
  ngOnInit(): void {
    this.loadDoctors();
    
    this.imgSubs = this.modalImageService.newImg.subscribe(img => this.loadDoctors());
    
  }
  
  ngOnDestroy(): void {

    this.imgSubs.unsubscribe();

  }


  loadDoctors(){

    this.doctorService.loadDoctors(this.offset)
      .pipe(
        // delay(3000)
      )
      .subscribe({
        next: (resp) => {

          this.loading = false;
          this.doctors = resp.doctors;
          this.doctorsTemp = resp.doctors;
          this.countDoctors = resp.totalDoctors;

        }
      })

  }

  search(term: string){

    if (term.length === 0) {
      this.doctors = this.doctorsTemp;
      return;
    }

    this.searchService.search('doctors', term).subscribe({
      next: (resp: Doctor[]) => {
        this.doctors = resp;
      },
    });

  }

  changePage(valor: number){

    this.offset += valor;

    if (this.offset < 0) {
      this.offset = 0;
    } else if (this.offset >= this.countDoctors) {
      this.offset -= valor;
    }

    this.loadDoctors();

  }

  openModal(doctor: Doctor){
    this.modalImageService.openModal('doctors', doctor.id, doctor.img);
  }

  deleteDoctor(doctor: Doctor){


    Swal.fire({
      title: 'Delete Doctor',
      text: `Is sure to remove the Doctor: ${doctor.name}?`,
      showCancelButton: true,
      confirmButtonText: "Delete",
      cancelButtonColor: '#d33',
      confirmButtonColor: '#3085d6'
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.doctorService.deleteDoctor(doctor.id)
          .subscribe({
            next: (resp) => {

              this.loadDoctors();

              Swal.fire({
                title: 'Deleted!',
                text: `Doctor: ${doctor.name} deleted.`,
                icon: 'success'
              })

            },
            error: (err) => {
              Swal.fire({
                title: 'Attetion!',
                text: `${err.error.message}`,
                icon: 'error'
              })

            }
          })

      }
    });

  }

}
