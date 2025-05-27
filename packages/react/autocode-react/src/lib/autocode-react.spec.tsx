import { render } from '@testing-library/react';

import AutocodeReact from './autocode-react';

describe('AutocodeReact', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<AutocodeReact />);
    expect(baseElement).toBeTruthy();
  });
});
