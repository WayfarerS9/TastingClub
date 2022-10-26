import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DrinksService } from 'src/app/services/drinks.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-drink',
  templateUrl: './create-drink.component.html',
  styleUrls: ['./create-drink.component.scss']
})
export class CreateDrinkComponent implements OnInit {
  @Output() onReturnToAddDrink: EventEmitter<any> = new EventEmitter();

  userId = JSON.parse(localStorage.getItem('USER_TASTYCLUB')!).id;

  constructor(
    private _drinksService: DrinksService,
    private _toastrService: ToastrService
    ) { }

  ngOnInit(): void {
  }

  createDrinkForm: FormGroup = new FormGroup({
    name: new FormControl(),
    typeOfDrink: new FormControl(),
    brand: new FormControl(),
    producer: new FormControl(),
    region: new FormControl(),
    alcohol: new FormControl(),
    creatorId: new FormControl(this.userId),
  })

  returnToAddDrink() {
    this.onReturnToAddDrink.emit()
  }
  
  createDrink(createDrinkForm: FormGroup) {
    this._drinksService.create(createDrinkForm.value).subscribe({
      next: (res: any) => {
        this._toastrService.success(res.message);
        this.returnToAddDrink();
      },
      error: (error) => console.log(error)    
    });
  }

}
