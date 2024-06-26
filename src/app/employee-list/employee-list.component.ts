import { Component, inject } from '@angular/core';
import { IEmployee } from '../interfaces/employee';
import { HttpService } from '../http.service';
import {MatTableModule} from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [
    MatTableModule,
    MatButtonModule,
    RouterLink
  ],
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.css'
})
export class EmployeeListComponent {
  employeeList: IEmployee[] = [];
  httpService = inject(HttpService);
  displayedColumns: string[] = ['id', 'name', 'email', 'age', 'phone', 'salary', 'action'];

  route = inject(Router);

  toaster = inject(ToastrService);

  ngOnInit() {
    this.getEmployeeFromServer();
  }

  getEmployeeFromServer() {
    this.httpService.getAllEmployee().subscribe((result) => {
      this.employeeList = result;
    });
  }

  edit(id: number) {
    this.route.navigateByUrl('/employee/'+id);
  }

  delete(id: number) {
    this.httpService.deleteEmployee(id).subscribe((result) => {
      //this.employeeList = this.employeeList.filter(x => x.id != id);
      this.getEmployeeFromServer();
      this.toaster.success("Record deleted successfully.");
    });
  }
}
