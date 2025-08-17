import { AcFileUtils } from "@autocode-ts/autocode";

export class AcBrowser {
  static downloadJsonObjectAsFile({ data, filename = 'data.json' }: { data: any, filename?: string }) {
    this.downloadFile({ content: JSON.stringify(data, null, 2), filename: filename })
  }

  static downloadFile({ content, filename }: { content: string | Blob, filename: string }) {
    let blob: Blob;
    const mimeType = AcFileUtils.mimeFromPath({ path: filename });
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

  static pickFiles(options?: {
    multiple?: boolean;
    accept?: string;
  }): Promise<File[]> {
    return new Promise((resolve, reject) => {
      const input = document.createElement("input");
      input.type = "file";

      if (options?.multiple) {
        input.multiple = true;
      }
      if (options?.accept) {
        input.accept = options.accept;
      }

      input.style.display = "none";
      document.body.appendChild(input);

      input.addEventListener("change", () => {
        const files = input.files ? Array.from(input.files) : [];
        document.body.removeChild(input);

        if (files.length > 0) {
          resolve(files);
        } else {
          reject(new Error("No file selected"));
        }
      });

      input.click();
    });
  }
}
