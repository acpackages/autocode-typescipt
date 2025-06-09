import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TestSimpleNodeEditorComponent } from './test-simple-node-editor/test-simple-node-editor.component';
import { RouterModule, Routes } from '@angular/router';
import { AcNgNodeEditorModule } from 'packages/angular/ac-ng-node-editor/src/lib/ac-ng-node-editor.module';
import { TestNodeComponent } from './test-node/test-node.component';
import { BulkTestNodeComponent } from './bulk-test-node/bulk-test-node.component';
import { TestBulkNodesInEditorComponent } from './test-bulk-nodes-in-editor/test-bulk-nodes-in-editor.component';
import { AcAngularModule } from 'packages/angular/ac-angular/src/lib/ac-angular.module';
import { AcInputsModule } from 'packages/angular/ac-angular/src/lib/ac-inputs/ac-inputs.module';

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
    AcNgNodeEditorModule,
    AcInputsModule,
    RouterModule.forChild(routes)
  ]
})
export class TestNodeEditorModule { }
