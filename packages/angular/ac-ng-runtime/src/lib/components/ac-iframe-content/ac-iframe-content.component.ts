/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable @angular-eslint/no-output-on-prefix */
/* eslint-disable @angular-eslint/prefer-standalone */
/* eslint-disable @angular-eslint/component-selector */
import { ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, Output, Renderer2, ViewChild, ViewContainerRef } from '@angular/core';
import { AcBase, AutocodeService } from 'packages/angular/ac-angular/src/index';
import { AcRuntimeService } from '../../services/ac-runtime.service';

@Component({
    selector: 'ac-repeater',
    templateUrl: './ac-iframe-content.component.html',
    styleUrl: './ac-iframe-content.component.css',
    standalone: false
})
export class AcIframeContentComponent extends AcBase{
  @ViewChild('iframeElement') iframeElement!: ElementRef;
  @ViewChild('contentContainer') contentContainer!: ElementRef;
  @Input() stylesheetUrls: string[] = [];
  @Input() scriptUrls: string[] = [];
  private mutationObserver!: MutationObserver;

  constructor(autocodeService:AutocodeService,elementRef:ElementRef,private changeDetectorRef: ChangeDetectorRef, private renderer: Renderer2) {
    super(elementRef,autocodeService);
  }

  override ngAfterViewInit() {
    super.ngAfterViewInit();
    this.updateIframeContent();
    this.mutationObserver = new MutationObserver(() => this.updateIframeContent());
    this.mutationObserver.observe(this.contentContainer.nativeElement, {
      childList: true,
      subtree: true,
      attributes: true,
      characterData: true
    });
    this.changeDetectorRef.detectChanges();
  }

  printIframe() {
    const iframe = this.iframeElement.nativeElement;
    if (iframe.contentWindow) {
      iframe.contentWindow.focus();
      iframe.contentWindow.print();
    }
  }

  updateIframeContent() {
    const iframeDoc = this.iframeElement.nativeElement.contentDocument || this.iframeElement.nativeElement.contentWindow.document;
    const content = this.contentContainer.nativeElement.innerHTML;
    let iframeHtml = '<html><head>';
    for(const link of this.stylesheetUrls){
      iframeHtml+=`<link rel="stylesheet" href="${link}"/>`;
    }
    for(const link of this.scriptUrls){
      iframeHtml+=`<script src="${link}"/>`;
    }
    iframeHtml+='</head><body>'+content+'</body></html>';
    iframeDoc.open();
    iframeDoc.write(iframeHtml);
    iframeDoc.close();
  }

  override ngOnDestroy() {
    super.ngOnDestroy();
    if (this.mutationObserver) {
      this.mutationObserver.disconnect();
    }
  }
}
