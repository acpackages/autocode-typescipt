import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AcNodeComponent } from './components/ac-node/ac-node.component';
import { AcNodeEditorComponent } from './components/ac-node-editor/ac-node-editor.component';
import { AcNodeConnectionComponent } from './components/ac-node-connection/ac-node-connection.component';
import { AcNodeSocketComponent } from './components/ac-node-socket/ac-node-socket.component';

@NgModule({
  declarations: [
    AcNodeComponent,
    AcNodeEditorComponent,
    AcNodeConnectionComponent,
    AcNodeSocketComponent
  ],
  exports:[
    AcNodeComponent,
    AcNodeEditorComponent,
    AcNodeConnectionComponent,
    AcNodeSocketComponent
  ],
  imports: [
    CommonModule
  ]
})
export class AcNgNodeEditorModule { }
