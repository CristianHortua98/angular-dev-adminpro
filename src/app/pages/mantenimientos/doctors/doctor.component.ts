import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HospitalService } from '../../../services/hospital.service';
import { Hospital } from '../../../interfaces/hospital.interface';
import { DoctorService } from '../../../services/doctor.service';
import { Doctor } from '../../../interfaces/doctor.interface';
import Swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styles: ''
})
export class DoctorComponent implements OnInit{

  public doctorForm: FormGroup;
  public hospitals: Hospital[];
  public hospitalSelected: Hospital;
  public doctorSelected: Doctor;

  constructor(
    private fb: FormBuilder,
    private hospitalService: HospitalService,
    private doctorService: DoctorService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ){}

  ngOnInit(): void {

    this.doctorForm = this.fb.group({
      name: ['', Validators.required],
      hospital: ['', Validators.required],
    })


    this.loadHospitals();

    //OBTENER LAS VARIABLES DE LA RUTA
    //OBTENER LA VARIABLE ID DEL MEDICO Y LA DESESTRUCTURAMOS
    this.activatedRoute.params.subscribe(({id}) => {
      this.loadDoctor(id);
    });

    //NOS SUSCRIBIMOS A UN OBSERVABLE CUANDO EL CAMPO HOSPITAL CAMBIE DE VALOR
    this.doctorForm.get('hospital').valueChanges
      .subscribe({
        next:(hospitalId) => {
          this.hospitalSelected = this.hospitals.find(h => h.id === Number(hospitalId));
        }
      })

  }

  loadDoctor(id: number){

    if(isNaN(Number(id))){
      return;
    }

    this.doctorService.viewDoctor(id)
      .subscribe({
        next: (doctor: Doctor) => {
          
          if(!doctor){
            this.router.navigateByUrl(`/dashboard/doctors`);
            return;
          }

          const { name, hospital: {id} } = doctor;
          this.doctorSelected = doctor;

          //ENVIAMOS VALORES AL FORMULARIO
          this.doctorForm.setValue({name, hospital: id});
        },
        error: (err) => {
          this.router.navigateByUrl(`/dashboard/doctors`);
        }
      })

  }

  saveDoctor(){

    if(this.doctorSelected){

      //ACTUALIZAMOS

      const dataDoctor = {
        name: this.doctorForm.get('name').value,
        id_hospital: Number(this.doctorForm.get('hospital').value)
      }


      this.doctorService.updateDoctor(this.doctorSelected.id, dataDoctor)
        .subscribe({
          next: (resp: Doctor) => {

            Swal.fire({
              title: 'Updated!',
              text: `Doctor updated.`,
              icon: 'success'
            })
  
          }
        })

    }else{

      //CREAMOS

      const dataDoctor = {
        name: this.doctorForm.get('name').value,
        id_hospital: Number(this.doctorForm.get('hospital').value)
      }

      this.doctorService.createDoctor(dataDoctor)
        .subscribe({
          next: (resp: Doctor) => {
  
            Swal.fire({
              title: 'Created!',
              text: `Doctor: ${resp.name} created.`,
              icon: 'success'
            })
  
            this.router.navigateByUrl(`/dashboard/doctor/${resp.id}`);
          }
        })

    }



  }

  loadHospitals(){

    this.hospitalService.listHospital()
      .subscribe({
        next: (resp: Hospital[]) => {
          this.hospitals = resp;
        }
      })

  }


}
