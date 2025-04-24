import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TestSimpleNodeEditorComponent } from './test-simple-node-editor/test-simple-node-editor.component';
import { RouterModule, Routes } from '@angular/router';
import { AcNodeEditorModule } from '../../../packages/ac-node-editor/src/lib/ac-node-editor.module';
import { TestNodeComponent } from './test-node/test-node.component';
import { BulkTestNodeComponent } from './bulk-test-node/bulk-test-node.component';
import { TestBulkNodesInEditorComponent } from './test-bulk-nodes-in-editor/test-bulk-nodes-in-editor.component';

export const routes: Routes = [
  { path: '', component: TestSimpleNodeEditorComponent },
  { path: 'bulk-nodes', component: TestBulkNodesInEditorComponent },
];

@NgModule({
  declarations: [
    BulkTestNodeComponent,
    TestSimpleNodeEditorComponent,
    TestBulkNodesInEditorComponent,
    TestNodeComponent
  ],
  exports:[
    RouterModule
  ],
  imports: [
    CommonModule,
    AcNodeEditorModule,
    RouterModule.forChild(routes)
  ]
})
export class TestNodeEditorModule { }
