import type { NamedBean } from '../../context/bean';
import { BeanStub } from '../../context/beanStub';
import type { GetLocaleTextParams } from '../../interfaces/iCallbackParams';
import type { WithoutGridCommon } from '../../interfaces/iCommon';
import type { LocaleTextFunc } from './localeUtils';

export class AcDGLocaleService extends BeanStub implements NamedBean {
    beanName = 'localeSvc' as const;

    public override getLocaleTextFunc(): LocaleTextFunc {
        const gos = this.gos;
        const getLocaleText = gos.getCallback('getLocaleText');
        if (getLocaleText) {
            //key: string, defaultValue: string, variableValues?: string[]
            return (key: string, defaultValue: string, variableValues?: string[]) => {
                const params: WithoutGridCommon<GetLocaleTextParams> = {
                    key,
                    defaultValue,
                    variableValues,
                };
                return getLocaleText(params);
            };
        }

        const localeText = gos.get('localeText');
        return (key: string, defaultValue: string, variableValues?: string[]) => {
            let localisedText = localeText && localeText[key];

            if (localisedText && variableValues && variableValues.length) {
                let found = 0;
                while (true) {
                    if (found >= variableValues.length) {
                        break;
                    }
                    const idx = localisedText.indexOf('${variable}');
                    if (idx === -1) {
                        break;
                    }

                    localisedText = localisedText.replace('${variable}', variableValues[found++]);
                }
            }

            return localisedText ?? defaultValue;
        };
    }
}
