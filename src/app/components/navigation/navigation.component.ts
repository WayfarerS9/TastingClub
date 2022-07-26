import { FlatTreeControl } from '@angular/cdk/tree';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {
  MatTreeFlatDataSource,
  MatTreeFlattener,
  MatTreeNestedDataSource,
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
  TREE_DATA: TypeOfAlcohol[] = [
    {
      id: 1,
      name: 'Merlot',
      children: [],
    },
    {
      name: 'Whiskey',
      id: 2,
      children: [
        {
          name: 'Green',
          id: 2,
          children: [
            { name: 'Broccoli', id: 1 },
            { name: 'Brussels sprouts', id: 2 },
          ],
        },
        {
          name: 'Orange',
          id: 3,
          children: [
            { name: 'Pumpkins', id: 3 },
            { name: 'Carrots', id: 4 },
          ],
        },
      ],
    },
  ];

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
  ) {
    this.dataSource.data = this.TREE_DATA;
  }

  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;

  user!: any;
  search: String = '';

  ngOnInit(): void {
    let userString = localStorage.getItem('USER_TASTYCLUB');
    this.user = userString ? JSON.parse(userString) : null;
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
