import { AcResult } from '@autocode-ts/autocode';
import { AcDDSelectStatement } from '@autocode-ts/ac-data-dictionary';
import { AcWebResponse } from '../../models/ac-web-response.model';
import { AcWebApiResponse } from '../../models/ac-web-api-response.model';

export class AcDataDictionaryWebAutoExecuteResult extends AcResult {
  selectStatement?: AcDDSelectStatement;
  webResponse?: AcWebResponse;
  webApiResponse?: AcWebApiResponse;
}
