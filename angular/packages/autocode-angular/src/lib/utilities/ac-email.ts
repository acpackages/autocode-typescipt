import { AjaxService } from "../services/ajax.service";
import { SimpleExtensionMethods } from "./simple-extension-methods";
import { Simplify } from "./simplify";

export interface SimpleEmailAttachmentDetails {
  name: string,
  url?: string,
  fileData?:Blob|number[]
}

export interface SimpleEmailDetails {
  attachments?: SimpleEmailAttachmentDetails[],
  body?: string,
  subject?: string,
  to?: string,
  cc?: string,
  bcc?: string,
  from?: string,
}



export class SimpleEmail {
  static async downloadEmlFile(emailDetails: SimpleEmailDetails, fileName?: string | undefined) {
    const emlContent = await this.generateEmlContent(emailDetails);
    const blob = new Blob([emlContent], { type: 'message/rfc822' });
    const url = URL.createObjectURL(blob);
    if (fileName) {
      const a = document.createElement('a');
      a.href = url;
      a.download = fileName;
      a.click();
    }
    else {
      window.open(url);
    }
    URL.revokeObjectURL(url);
  }

  static async generateEmlContent(emailDetails: SimpleEmailDetails) {

    const boundary = 'boundary';
    const buffer = [];
    if (emailDetails.from) {
      buffer.push(`From: ${emailDetails.from}`);
    }
    if (emailDetails.to) {
      buffer.push(`To: ${emailDetails.to}`);
    }
    if (emailDetails.cc) {
      buffer.push(`Cc: ${emailDetails.cc}`);
  }
  if (emailDetails.bcc) {
      buffer.push(`Bcc: ${emailDetails.bcc}`);
  }
    if (emailDetails.subject) {
      buffer.push(`Subject: ${emailDetails.subject}`);
    }
    buffer.push('MIME-Version: 1.0');
    buffer.push('X-Unsent: 1');
    buffer.push('X-Draft-Status: Yes');
    buffer.push(`Content-Type: multipart/mixed; boundary="${boundary}"`);
    buffer.push('');
    buffer.push(`--${boundary}`);
    if (emailDetails.body) {
      buffer.push('Content-Type: text/html; charset="UTF-8"');
      buffer.push('');
      buffer.push(emailDetails.body);
      buffer.push('');
    }

    if (emailDetails.attachments) {
      for (let attachment of emailDetails.attachments) {
        let base64String:any = "" ;
        if(attachment.url){
          base64String = await AjaxService.getFileContentAsBase64FromUrl(attachment.url);
        }
        else if(attachment.fileData){
          base64String = await SimpleExtensionMethods.convertFileDataToBase64(attachment.fileData,attachment.name);
        }
        buffer.push(`--${boundary}`);
        buffer.push(`Content-Disposition: attachment; filename="${attachment.name}"`);
        buffer.push(`Content-Type: ${Simplify.getMimeTypeFromFileName(attachment.name)}; name="${attachment.name}"`);
        buffer.push('Content-Transfer-Encoding: base64');
        buffer.push('');
        buffer.push(base64String);
        buffer.push('');
      }
    }
    buffer.push(`--${boundary}--`);
    return buffer.join('\n');
  }

}
