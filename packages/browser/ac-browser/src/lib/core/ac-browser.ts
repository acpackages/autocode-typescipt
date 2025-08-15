import { AcFileUtils } from "@autocode-ts/autocode";

export class AcBrowser {
  static downloadJsonObjectAsFile({ data, filename = 'data.json' }: { data: any, filename?: string }) {
    this.downloadFile({content:JSON.stringify(data, null, 2),filename:filename})
  }

  static downloadFile({content,filename}:{content: string | Blob, filename: string}) {
  let blob: Blob;
  const mimeType = AcFileUtils.mimeFromPath({path:filename});
  if (content instanceof Blob) {
    blob = content;
  } else {
    blob = new Blob([content], { type: mimeType });
  }

  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
}
