import { Component } from '@angular/core';
import { AcNodeComponent } from '../../../../packages/ac-node-editor/src/lib/components/ac-node/ac-node.component';

@Component({
  selector: 'app-bulk-test-node',
  standalone:false,
  templateUrl: './bulk-test-node.component.html',
  styleUrl: './bulk-test-node.component.scss'
})
export class BulkTestNodeComponent extends AcNodeComponent{

  ngOnInit(): void {
    super.ngOnInit()
    console.log(this.nodeId);;
  }

}
