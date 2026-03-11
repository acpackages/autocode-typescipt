/* eslint-disable @typescript-eslint/no-inferrable-types */
import { AcPipeRegistry } from "../core/ac-pipe";

AcPipeRegistry.register({
  name: 'urltobase64',
  pure: false,
  transform: async (url: string): Promise<string> => {
    if (!url) return '';
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      return new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      });
    } catch (e) {
      console.error(`urlToBase64 pipe: Failed to fetch resource from '${url}'`, e);
      return '';
    }
  }
});
