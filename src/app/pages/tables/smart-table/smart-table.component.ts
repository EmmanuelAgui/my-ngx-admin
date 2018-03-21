import { Component } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';

import { SmartTableService } from '../../../@core/data/smart-table.service';

@Component({
  selector: 'ngx-smart-table',
  templateUrl: './smart-table.component.html',
  styles: [`
    nb-card {
      transform: translate3d(0, 0, 0);
    }
  `],
})
export class SmartTableComponent {

  settings = {
    mode: "external",
    selectMode: 'multi',
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmCreate: true
    },/* 
    Actions:{
      title:'Detail',
      type:'html',
      valuePrepareFunction:(cell,row)=>{
        return `<a title="查看详情" href="#"><i class="ion-edit"></i></a> `
      },
      filter:false
    }, */
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmSave: true,
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    columns: {

      id: {
        title: 'ID',
        type: 'number',
      },
      firstName: {
        title: 'First Name',
        type: 'string',
        filter: {
          type: 'list',
          config: {
            selectText: 'Select...',
            list: [
              { value: 'Mark', title: 'Mark' },
              { value: 'Jacob', title: 'Jacob' },
              { value: 'Larry', title: 'Larry' }
            ]
          }
        }
      },
      lastName: {
        title: 'Last Name',
        type: 'string',
      },
      username: {
        title: 'Username',
        type: 'string',
      },
      email: {
        title: 'E-mail',
        type: 'string',
      },
      age: {
        title: 'Age',
        type: 'number',
      }/* ,
      age0: {
        title: 'Age',
        type: 'number',
      },
      age1: {
        title: 'Age',
        type: 'number',
      },
      age2: {
        title: 'Age',
        type: 'number',
      },
      age3: {
        title: 'Age',
        type: 'number',
      },
      age4: {
        title: 'Age',
        type: 'number',
      },
      age5: {
        title: 'Age',
        type: 'number',
      },
      age10: {
        title: 'Age',
        type: 'number',
      },
      age11: {
        title: 'Age',
        type: 'number',
      },
      age12: {
        title: 'Age',
        type: 'number',
      },
      age13: {
        title: 'Age',
        type: 'number',
      },
      age14: {
        title: 'Age',
        type: 'number',
      },
      age15: {
        title: 'Age',
        type: 'number',
      }, */
    },
  };

  source: LocalDataSource = new LocalDataSource();
  delArray=[];

  constructor(private service: SmartTableService) {
    const data = this.service.getData();
    this.source.load(data);
  }

  newOne(event) {
    //alert('1');
    console.log(event);
  }

  onEdit(event) {
    //alert('2');
    console.log(event);
  }

  onSelect(event) {
    console.log(event);
  }

  deleteOne(event){
    console.log(event);
    this.source.remove(event.data);
    this.source.refresh();
  }

  deleteSelected(event) {
    console.log(event.grid.dataSet.rows);
    this.delArray=event.grid.dataSet.rows.filter(item=>item.isSelected)
    console.log(this.delArray);
    this.source.remove(this.delArray[0].data);
    this.source.refresh()    ;
  }

  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }
}
