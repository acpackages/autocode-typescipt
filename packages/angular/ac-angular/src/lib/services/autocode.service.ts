/* eslint-disable @angular-eslint/prefer-inject */
/* eslint-disable @typescript-eslint/no-inferrable-types */
import { ElementRef, Injectable, Renderer2, RendererFactory2 } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AutocodeService {
  private renderer: Renderer2;
  constructor(rendererFactory: RendererFactory2) {
    this.renderer = rendererFactory.createRenderer(null, null);
  }

  commentElementTag(elementRef:ElementRef){
    let initialized:boolean = false;
    if(elementRef){
      if(elementRef.nativeElement){
        initialized = true;
        const hostElement = elementRef.nativeElement; // The component's host element
        const parentElement = hostElement.parentElement;

        if (!parentElement) {
          // console.warn('Cannot comment out element because it has no parent.');
          return;
        }

        // Get the tag name of the component
        const tagName = hostElement.tagName.toLowerCase(); // e.g., 'app-my-component'

        // Create comments for opening and closing tags
        const openingComment = this.renderer.createComment(`<${tagName}>`);
        const closingComment = this.renderer.createComment(`</${tagName}>`);

        // Insert the opening comment before the host element
        this.renderer.insertBefore(parentElement, openingComment, hostElement);

        // Move the host's children into the parent
        while (hostElement.firstChild) {
          this.renderer.insertBefore(parentElement, hostElement.firstChild, hostElement);
        }

        // Insert the closing comment after the content
        this.renderer.insertBefore(parentElement, closingComment, hostElement.nextSibling);

        // Remove the host element
        this.renderer.removeChild(parentElement, hostElement);
      }
    }
    if(!initialized){
      setTimeout(() => {
        this.commentElementTag(elementRef);
      }, 100);
    }
  }

}
