import { Component, inject } from '@angular/core';
import { MatInputModule } from '@angular/material/input'
import { MatButtonModule } from '@angular/material/button'
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpService } from '../http.service';
import { IEmployee } from '../interfaces/employee';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-employee-form',
  standalone: true,
  imports: [
    MatInputModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './employee-form.component.html',
  styleUrl: './employee-form.component.css'
})
export class EmployeeFormComponent {
  http = inject(HttpService);
  formBuilder = inject(FormBuilder);
  router = inject(Router);
  activeRoute = inject(ActivatedRoute);

  toaster = inject(ToastrService);

  employeeForm = this.formBuilder.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    age: [0, [Validators.required]],
    phone: ['', []],
    salary: [0, [Validators.required]],
  });

  employeeId: number = 0;
  isEdit=false;

  ngOnInit() {
    this.employeeId = this.activeRoute.snapshot.params['id'];

    this.isEdit = false;
    if(this.employeeId) {
      this.isEdit = true;
      this.http.getEmployee(this.employeeId).subscribe((result:any) => {
        console.log(result);
        this.employeeForm.patchValue(result);
        //this.employeeForm.controls.email.disable();
      })
    }
  }

  save() {
    console.log(this.employeeForm.value);
    const employee: IEmployee = {
      name: this.employeeForm.value.name!,
      age: this.employeeForm.value.age!,
      email: this.employeeForm.value.email!,
      phone: this.employeeForm.value.phone!,
      salary: this.employeeForm.value.salary!,
    }

    if(this.isEdit) {
      this.http.updateEmployee(this.employeeId, employee).subscribe(() => {
        console.log("success");
        this.toaster.success("Record updated successfully.");
        this.router.navigateByUrl('/employee-list');
      });
    } else {
      this.http.createEmployee(employee).subscribe(() => {
        console.log("success");
        this.toaster.success("Record added successfully.");
        this.router.navigateByUrl('/employee-list');
      });
    }
  }
}
