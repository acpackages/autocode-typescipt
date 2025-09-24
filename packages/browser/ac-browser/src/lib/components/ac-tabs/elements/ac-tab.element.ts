/* eslint-disable @typescript-eslint/no-unused-expressions */
import { AcEvents, Autocode } from "@autocode-ts/autocode";
import { AcTabsAttributeName } from "../consts/ac-tabs-attribute-name.const";
import { AcTabsCssClassName } from "../consts/ac-tabs-css-class-name.const";
import { IAcTabsOptions } from "../interfaces/ac-tabs-options.interface";
import { AcTabsEvent } from "../enums/ac-tabs-event.enum";
import { acAddClassToElement, acRegisterCustomElement, acRemoveClassFromElement } from "../../../utils/ac-element-functions";
import { AC_TABS_TAG } from "../_ac-tabs.export";
import { AcElementBase } from "../../../core/ac-element-base";

export class AcTab extends AcElementBase{
}

acRegisterCustomElement({tag:AC_TABS_TAG.tab,type:AcTab});
