import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Course } from 'src/app/models/course';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdmissionService } from 'src/app/services/admission.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor(private admissionService: AdmissionService, private _Activatedroute: ActivatedRoute, private formBuilder: FormBuilder) { }

  admissions: Array<any> = [];
  cols: any[];
  admissionDialog: boolean;
  public addAdmissionsForm: FormGroup;
  isEdit: boolean = false;
  isUpdateField: boolean = false;

  courseId: string = '';
  associateId: string = '';
  fees: number = 0;
  feedback: string = '';
  rating: number = 0;

  ngOnInit() {
    this.formSetup();
    this.viewAll();
    this.cols = [
      { field: 'registrationId', header: 'Registration Id' },
      { field: 'courseId', header: 'Course Id' },
      { field: 'associateId', header: 'Associate Id' },
      { field: 'fees', header: 'Fees' },
    ];
  }

  viewAll(): void {
    this.admissionService.viewAllAdmissions().subscribe(
      (res) => {
        this.admissions = res;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  formSetup() {
    this.addAdmissionsForm = this.formBuilder.group({
      registrationId: [''],
      courseId: ['', Validators.compose([Validators.required])],
      associateId: ['', Validators.compose([Validators.required])],
      fees: [0, Validators.compose([Validators.required])],
      feedback: [''],
      rating: [0]
    })
    if (this.isEdit) {
      this.addAdmissionsForm.get('feedback').setValidators(Validators.required);
      this.addAdmissionsForm.get('rating').setValidators(Validators.required);
    } else {
      this.addAdmissionsForm.get('feedback').clearValidators();
      this.addAdmissionsForm.get('rating').clearValidators();
    }
  }

  openNew() {
    this.isEdit = false;
    this.addAdmissionsForm.reset();
    this.admissionDialog = true;
  }

  editAdmission(admissionObj: any) {
    admissionObj.rating = 0;
    console.log(admissionObj)
    this.isEdit = true;
    this.admissionDialog = true;
    this.addAdmissionsForm.setValue(admissionObj);
  }

  hideDialog() {
    this.addAdmissionsForm.reset();
    this.admissionDialog = false;
    this.isEdit = false;
  }


  addCourse() {
    if (!this.isEdit) {
      if (this.addAdmissionsForm.valid) {
        this.admissionService.registration(this.addAdmissionsForm.value.associateId, this.addAdmissionsForm.value.courseId).subscribe((suc) => {
          Swal.fire('Registration Successfully', 'success');
          this.hideDialog();
          this.addAdmissionsForm.reset();
          this.viewAll();
        },
          (err) => {
            if (err) {
              Swal.fire(err);
            } else {
              Swal.fire('Oops', 'Something went wrong', 'error');
            }
          }
        );

      }
    } else {
      if (this.addAdmissionsForm.valid) {
        this.admissionService.addFeedback(this.addAdmissionsForm.value.registrationId, this.addAdmissionsForm.value.feedback, this.addAdmissionsForm.value.rating).subscribe((suc) => {
          Swal.fire('Admissions Updated Successfully');
          this.addAdmissionsForm.reset();
          this.hideDialog();
          this.viewAll();
        },
          (err) => {
            if (err) {
              Swal.fire(err);
            } else {
              Swal.fire('Oops', 'Something went wrong', 'error');
            }
          }
        );

      }

    }
  }

}
