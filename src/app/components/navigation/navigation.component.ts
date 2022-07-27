import { FlatTreeControl } from '@angular/cdk/tree';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {
  MatTreeFlatDataSource,
  MatTreeFlattener,
} from '@angular/material/tree';
import { Router } from '@angular/router';
import {
  ExampleFlatNode,
  TypeOfAlcohol,
} from 'src/app/models/typeOfAlcohol.model';
import { AddingDialogComponent } from './../../dialogs/adding-dialog/adding-dialog.component';
import { AlcoholService } from 'src/app/services/newAlcohol.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent implements OnInit {
  private _transformer = (node: TypeOfAlcohol, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      level: level,
      id: node.id,
    };
  };

  treeControl = new FlatTreeControl<ExampleFlatNode>(
    (node) => node.level,
    (node) => node.expandable
  );

  treeFlattener = new MatTreeFlattener(
    this._transformer,
    (node) => node.level,
    (node) => node.expandable,
    (node) => node.children
  );

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
  constructor(
    private _router: Router,
    public _dialog: MatDialog,
    private _alcoholService: AlcoholService
  ) {}

  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;

  user!: any;

  ngOnInit(): void {
    let userString = localStorage.getItem('USER_TASTYCLUB');
    this.user = userString ? JSON.parse(userString) : null;
    this.getTree();
  }

  getTree() {
    this._alcoholService.getAlcohol().subscribe((res: any) => {
      const getStatus = (array: any) => {
        let values: {
          id: number;
          name: string;
          children: {
            name: string;
            id: 0;
            children: { id: number; name: string }[];
          }[];
        }[] = [];

        array.forEach(function (item: any) {
          let parent = values.find((el) => el.name === item.typeOfAlcohol);
          if (parent) {
            let category = parent.children.find(
              (el) => el.name === item.category
            );
            if (category) {
              category.children.push({
                name: item.nameOfAlcohol,
                id: item.alcoholsId,
              });
            } else {
              parent.children.push({
                name: item.category,
                id: 0,
                children: [
                  {
                    name: item.nameOfAlcohol,
                    id: item.alcoholsId,
                  },
                ],
              });
            }
          } else {
            values.push({
              id: item.id,
              name: item.typeOfAlcohol,
              children: [
                {
                  name: item.category,
                  id: 0,
                  children: [
                    {
                      name: item.nameOfAlcohol,
                      id: item.alcoholsId,
                    },
                  ],
                },
              ],
            });
          }
        });
        return values;
      };
      let data: TypeOfAlcohol[] = getStatus(res.result);
      this.dataSource.data = data;
    });
  }

  openDialog() {
    this._dialog.open(AddingDialogComponent);
  }

  logOut() {
    localStorage.removeItem('USER_TASTYCLUB');
    localStorage.removeItem('TOKEN_TASTYCLUB');
    this._router.navigate(['/auth/login']);
  }

}
