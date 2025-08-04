import { acAddClassToElement } from "@autocode-ts/ac-browser";
import { Autocode } from "@autocode-ts/autocode";
import { AcRouter, IAcRoute, IAcRouteGroup } from "../../utils/ac-router";

export class DashboardPage extends HTMLElement {
  public static observedAttributes = [];

  connectedCallback() {
    const menuAccordionElement:HTMLElement = document.createElement('div');
    this.append(menuAccordionElement);
    acAddClassToElement({cssClass:'accordion',element:menuAccordionElement});
    menuAccordionElement.setAttribute('id','dashoardMenus');
    for(const pageGroup of AcRouter.routeGroups){
      menuAccordionElement.append(this.getPageGroupElement(pageGroup));
    }
  }

  getPageGroupElement(pageGroup:IAcRouteGroup):HTMLElement {
    const groupId:string = Autocode.uuid();
    const element:HTMLElement = document.createElement('div');
    acAddClassToElement({cssClass:'accordion-item',element:element});

    const accordionHeaderElement:HTMLElement = document.createElement('h2');
    element.append(accordionHeaderElement);
    acAddClassToElement({cssClass:'accordion-header',element:accordionHeaderElement});

    const accordionButtonElement:HTMLElement = document.createElement('button');
    accordionHeaderElement.append(accordionButtonElement);
    acAddClassToElement({cssClass:'accordion-button collapsed',element:accordionButtonElement});
    accordionButtonElement.setAttribute('type','button');
    accordionButtonElement.setAttribute('data-bs-toggle','collapse');
    accordionButtonElement.setAttribute('data-bs-target',`#${groupId}`);
    accordionButtonElement.setAttribute('aria-expanded','false');
    accordionButtonElement.setAttribute('aria-controls',groupId);
    accordionButtonElement.innerHTML = pageGroup.label;

    const accordionCollapseElement:HTMLElement = document.createElement('div');
    element.append(accordionCollapseElement);
    acAddClassToElement({cssClass:'accordion-collapse collapse',element:accordionCollapseElement});
    accordionCollapseElement.setAttribute('id',groupId);
    accordionCollapseElement.setAttribute('data-bs-parent',`#dashoardMenus`);

    const accordionBodyElement:HTMLElement = document.createElement('div');
    accordionCollapseElement.append(accordionBodyElement);
    acAddClassToElement({cssClass:'accordion-body p-3',element:accordionBodyElement});

    const accordionPageList:HTMLElement = document.createElement('ul');
    accordionBodyElement.append(accordionPageList);
    acAddClassToElement({cssClass:'list-group',element:accordionPageList});
    for(const page of pageGroup.routes){
      accordionPageList.append(this.getPageElement(page));
    }
    return element;
  }

  getPageElement(page:IAcRoute):HTMLElement {
    const element:HTMLElement = document.createElement('a');
    acAddClassToElement({cssClass:'list-group-item',element:element});
    element.setAttribute('href',page.path);
    element.innerHTML = page.label;
    return element;
  }
}
