/* eslint-disable @angular-eslint/prefer-standalone */
import { Component } from '@angular/core';
import { AcNodeComponent } from 'packages/angular/ac-ng-node-editor/src/lib/components/ac-node/ac-node.component';

@Component({
  selector: 'app-bulk-test-node',
  standalone:false,
  templateUrl: './bulk-test-node.component.html',
  styleUrl: './bulk-test-node.component.scss'
})
export class BulkTestNodeComponent extends AcNodeComponent{

  override ngOnInit(): void {
    super.ngOnInit()
    console.log(this.nodeId);;
  }

}
