import { AcAccordionCssClassName, AcCollapseCssClassName, AcDrawerCssClassName, AcDropdownCssClassName, AcInputCssClassName, AcMessage, AcMessageCssClassName, AcModalCssClassName, AcPaginationCssClassName, AcPopoverCssClassName, AcScrollTrackCssClassName, AcSlidesCssClassName, AcTabs } from "../components/_components.export";
import { AcTabsCssClassName } from "../components/ac-tabs/consts/ac-tabs-css-class-name.const";

export class AcBootstrapCss{
  static init(){
    AcAccordionCssClassName.acAccordion += 'accordion';

    AcCollapseCssClassName.acCollapseContent += 'collapse';
    AcCollapseCssClassName.acCollapseShow += 'show';
    AcCollapseCssClassName.acCollapseTransition += 'collapsing';

    AcDrawerCssClassName.acDrawer += 'offcanvas';
    AcDrawerCssClassName.acDrawerContent += 'offcanvas-body';

    AcDropdownCssClassName.acDropdown += 'dropdown';
    AcDropdownCssClassName.acDropdownTrigger += 'dropdown-toggle';
    AcDropdownCssClassName.acDropdownTarget += 'dropdown-menu';
    AcDropdownCssClassName.acDropdownItem += 'dropdown-item';

    AcInputCssClassName.acInput += 'form-control';
    AcInputCssClassName.acOptionInput += 'form-check-input';
    AcInputCssClassName.acSelectInput += 'form-select';
    AcInputCssClassName.acInvalidInput += 'is-invalid';
    AcInputCssClassName.acValidInput += 'is-valid';

    AcMessageCssClassName.acMessage += 'toast';
    AcMessageCssClassName.acMessageTitle += 'toast-header';
    AcMessageCssClassName.acMessageContent += 'toast-body';

    AcModalCssClassName.acModal += 'modal';
    AcModalCssClassName.acModalContent += 'modal-content';
    AcModalCssClassName.acModalShow += 'show';

    AcPaginationCssClassName.acPaginationNavigationButtons += 'pagination';
    AcPaginationCssClassName.acPaginationPageButton += 'page-item';

    AcPopoverCssClassName.acPopover += 'popover';
    AcPopoverCssClassName.acPopoverContent += 'popover-body';

    AcSlidesCssClassName.acSlides += 'carouse slide';
    AcSlidesCssClassName.acSlidesIndicators += 'carousel-indicators';
    AcSlidesCssClassName.acSlidesIndicatorButtonActive += 'active';
    AcSlidesCssClassName.acSlidesContent += 'carousel-inner';
    AcSlidesCssClassName.acSlide += 'carousel-item';
    AcSlidesCssClassName.acSlideActive += 'active';
    AcSlidesCssClassName.acSlidesPreviousButton += 'carousel-control-prev';
    AcSlidesCssClassName.acSlidesNextButton += 'carousel-control-next';

    AcTabsCssClassName.acTabs += 'tab-content';
    AcTabsCssClassName.acTabPane += 'tab-pane';
    AcTabsCssClassName.acTabPaneActive += 'show active';
  }
}
