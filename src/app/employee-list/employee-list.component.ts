import { Component, inject } from '@angular/core';
import { IEmployee } from '../interfaces/employee';
import { HttpService } from '../http.service';
import {MatTableModule} from '@angular/material/table';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [
    MatTableModule
  ],
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.css'
})
export class EmployeeListComponent {
  employeeList: IEmployee[] = [];
  httpService = inject(HttpService);
  displayedColumns: string[] = ['id', 'name', 'email', 'age', 'phone', 'salary'];

  ngOnInit() {
    this.httpService.getAllEmployee().subscribe((result) => {
      this.employeeList = result;
      console.log(this.employeeList);
    });
  }
}
