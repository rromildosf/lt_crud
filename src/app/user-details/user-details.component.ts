import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from '../services/users.service';
import { User } from '../_models/user.model';
import * as moment from 'moment'

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {
  private user: User
  phoneMask = '(00) 00000-0000'
  userAge: number
  constructor(private route: ActivatedRoute, private userService: UsersService) { }

  ngOnInit() {
    const userId = this.route.snapshot.paramMap.get('id')
    this.userService.getUser(userId).subscribe((user: User) => {
      this.phoneMask = user.phone.length < 11 ? '(00) 0000-0000': this.phoneMask

      this.userAge = moment().diff(user.birthdate, 'years')
      this.user = user
      
    })
  }


}
