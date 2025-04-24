import { Component } from '@angular/core';
import { AcNodeComponent } from '../../../../packages/ac-node-editor/src/lib/components/ac-node/ac-node.component';

@Component({
  selector: 'app-test-node',
  standalone:false,
  templateUrl: './test-node.component.html',
  styleUrl: './test-node.component.scss'
})
export class TestNodeComponent extends AcNodeComponent{
  ngOnInit(): void {
    super.ngOnInit();
    console.log(this);
  }
}
