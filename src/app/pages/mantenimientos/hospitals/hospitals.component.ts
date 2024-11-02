import { Component, OnDestroy, OnInit } from '@angular/core';
import { HospitalService } from '../../../services/hospital.service';
import { Hospital } from '../../../interfaces/hospital.interface';
import { ListHospitalsResponse } from '../../../interfaces/list-hospitals-response.interface';
import { SearchService } from '../../../services/search.service';
import { delay, Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { ModalImageService } from '../../../services/modal-image.service';

@Component({
  selector: 'app-hospitals',
  templateUrl: './hospitals.component.html',
  styleUrl: './hospitals.component.css'
})
export class HospitalsComponent implements OnInit, OnDestroy{

  public loading: boolean = true;
  public offset: number = 0;
  public hospitals: Hospital[];
  public hospitalsTemp: Hospital[];
  public imgSubs: Subscription;
  public countHospitals: number = 0;


  constructor(
    private hospitalService:HospitalService,
    private searchService:SearchService,
    private modalImageService: ModalImageService
  ){}

  ngOnInit(): void {
    this.loadHospital();

    this.imgSubs = this.modalImageService.newImg.subscribe(resp => this.loadHospital());

  }

  ngOnDestroy(): void {

    this.imgSubs.unsubscribe();

  }

  loadHospital(){

    this.hospitalService.loadHospitals(this.offset)
      .pipe(
        // delay(1000)
      )
      .subscribe({
        next:(resp) => {
          this.loading = false;
          this.hospitals = resp.hospitals;
          this.hospitalsTemp = resp.hospitals;
          this.countHospitals = resp.totalHospitals;
        }
      })

  }

  changePage(valor: number) {
    this.offset += valor;

    if (this.offset < 0) {
      this.offset = 0;
    } else if (this.offset >= this.countHospitals) {
      this.offset -= valor;
    }

    this.loadHospital();
  }

  search(term: string) {
    if (term.length === 0) {
      this.hospitals = this.hospitalsTemp;
      return;
    }

    this.searchService.search('hospitals', term).subscribe({
      next: (resp: Hospital[]) => {
        this.hospitals = resp;
      },
    });
  }


  saveChange(hospital: Hospital){

    this.hospitalService.updateHospital(hospital.id, hospital.name)
      .subscribe({
        next: (resp) => {
          this.loadHospital();
          Swal.fire({
            title: 'Updated!',
            text: `Hospital updated.`,
            icon: 'success',
          });
        },
        error: (err) => {

          Swal.fire({
            title: 'Attetion!',
            text: `${err.error.message}, Contact Administrador`,
            icon: 'error'
          })

        }
      })

  }

  deleteHospital(hospital: Hospital){

    this.hospitalService.deleteHospital(hospital.id)
      .subscribe({
        next:(resp) => {
          this.loadHospital();
          Swal.fire({
            title: 'Deleted!',
            text: `Hospital: ${hospital.name} deleted.`,
            icon: 'success'
          })
        },
        error:(err) => {
          Swal.fire({
            title: 'Attetion!',
            text: `${err.error.message}, Contact Administrador`,
            icon: 'error'
          })
        }
      })

  }

  async openSweetAlert(){

    const { value } = await Swal.fire({
      title: 'Create Hospital',
      input: "text",
      inputLabel: "Name Hospital",
      inputPlaceholder: "Enter Name Hospital",
      showCancelButton: true,
      cancelButtonColor: '#d33',
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Save'
    });
    if(value){
      console.log(value);
      this.hospitalService.createHospital(value)
        .subscribe({
          next:(resp) => {

            this.loadHospital();

            Swal.fire({
              title: 'Created!',
              text: 'Hospital Created!',
              icon: 'success'
            })
          },
          error:(err) => {

            Swal.fire({
              title: 'Attetion!',
              text: `${err.error.message}, Contact Administrador`,
              icon: 'error'
            })

          }
        })
    }else{

      Swal.fire({
        title: 'Attetion!',
        text: `Name Hospital empty`,
        icon: 'error'
      })

    }

  }

  openModal(hospital: Hospital){
    this.modalImageService.openModal('hospitals', hospital.id, hospital.img);
  }

}
