import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { UserInterface } from '../../../../interfaces';
import { ApiService } from '../../../core/services';
//  import { PaginationApiService } from '../../../core/services';

@Component({
    selector: 'app-users-list',
    templateUrl: './users-list.component.html',
    styleUrls: ['./users-list.component.css'],
    providers: [ApiService]
})
export class UsersListComponent implements OnInit {

    displayedColumns = ['first_name', 'last_name', 'email', 'showButton'];
    userList: any[] = [];
    pagesCount: number;

    public loading = false;

    constructor(private activatedRoute: ActivatedRoute,
        private router: Router) {
    }

    ngOnInit() {
        this.loading = true;
        this.activatedRoute.data
            .pipe(map(data => data.users))
            .subscribe((users: UserInterface[]) => {
                this.userList = users;
                this.loading = false;
            });

        this.activatedRoute.data
            .pipe(map(data => data.paginationInfo))
            .subscribe(paginationInfo => {
                this.pagesCount = paginationInfo.total;
            });
    }

    pageChanged(event: PageEvent): void {
        this.loading = true;
        const page: number = event.pageIndex + 1;
        this.router.navigate(['./users/'], { queryParams: { page } });
    }

    userSelected(user: UserInterface): void {
        this.router.navigate(['./user', user.id]);
    }
}
