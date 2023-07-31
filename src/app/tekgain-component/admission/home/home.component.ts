import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdmissionService } from 'src/app/services/admission.service';
import { AssociateService } from 'src/app/services/associate.service';
import { CourseService } from 'src/app/services/course.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor(private admissionService: AdmissionService, private _Activatedroute: ActivatedRoute, private formBuilder: FormBuilder, private associateService: AssociateService, private courseService: CourseService) {
    this.currentUser = localStorage.getItem('roles');
    this.associateId = localStorage.getItem('associateId');
  }
  currentUser: string = '';
  role: string = 'ROLE_ADMIN';
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

  associates: Array<any> = [{associateId:'Select Associate Id'}];
  courses: Array<any> = [{courseId:'Select Course Id'}];

  ngOnInit() {
    this.formSetup();
    this.viewAll();
    this.viewAllCourses();
    this.cols = [
      { field: 'registrationId', header: 'Registration Id' },
      { field: 'courseId', header: 'Course Id' },
      { field: 'associateId', header: 'Associate Id' },
      { field: 'fees', header: 'Fees' },
    ];
  }

  viewAll(): void {
    if (this.role == this.currentUser) {
      this.admissionService.viewAllAdmissions().subscribe(
        (res) => {
          this.admissions = res;
          this.viewAllAssociates(res);
        },
        (error) => {
          console.log(error);
        }
      );
    } else {
      this.associates = [...this.associates,{ associateId: this.associateId }];
      this.addAdmissionsForm.get('associateId').setValue(this.associateId);
      this.addAdmissionsForm.get('associateId').updateValueAndValidity();
      this.admissionService.viewByAssociateId(this.associateId).subscribe(
        (res) => {
          this.admissions = res;
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }

  viewAllAssociates(admissionData): void {
    this.associateService.viewAllAssociates().subscribe(
      (associates) => {
        const filteredAssociates = associates.filter(
          (associate) => !admissionData.some((admiss) => admiss.associateId === associate.associateId)
        );
        this.associates = [...this.associates, ...filteredAssociates];
      }
    );
  }

  viewAllCourses(): void {
    this.courseService.viewAllCourses().subscribe(
      (res) => {
        this.courses = [...this.courses,...res];
      }
    );
  }

  formSetup() {
    this.addAdmissionsForm = this.formBuilder.group({
      registrationId: [''],
      courseId: ['Select Course Id', Validators.compose([Validators.required])],
      associateId: ['Select Associate Id', Validators.compose([Validators.required])],
      fees: [0],
      feedback: [''],
      rating: [0]
    })
    if (this.isEdit) {
      this.addAdmissionsForm.get('feedback').setValidators(Validators.required);
      this.addAdmissionsForm.get('rating').setValidators([Validators.required,Validators.min(1), Validators.max(5)]);
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


  addAdmissions() {
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


  access(roles: string[]) {
    return roles.some(x => x == this.currentUser);
  }

}
