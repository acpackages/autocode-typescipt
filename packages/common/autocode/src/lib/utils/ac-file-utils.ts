export class AcFileUtils {
  private static readonly _mimeTypes: Record<string, string> = {
    "323": "text/h323",
    "3g2": "video/3gpp2",
    "3gp": "video/3gpp",
    "aac": "audio/aac",
    "avi": "video/avi",
    "bmp": "image/bmp",
    "css": "text/css",
    "csv": "text/csv",
    "doc": "application/msword",
    "docx": "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "eot": "application/vnd.ms-fontobject",
    "gif": "image/gif",
    "htm": "text/html",
    "html": "text/html",
    "ico": "image/x-icon",
    "jpeg": "image/jpeg",
    "jpg": "image/jpeg",
    "js": "application/javascript",
    "json": "application/json",
    "mp3": "audio/mpeg",
    "mp4": "video/mp4",
    "mpeg": "video/mpeg",
    "oga": "audio/ogg",
    "ogg": "video/ogg",
    "ogv": "video/ogg",
    "otf": "font/otf",
    "pdf": "application/pdf",
    "png": "image/png",
    "ppt": "application/vnd.ms-powerpoint",
    "pptx": "application/vnd.openxmlformats-officedocument.presentationml.presentation",
    "rar": "application/x-rar-compressed",
    "rtf": "application/rtf",
    "svg": "image/svg+xml",
    "tar": "application/x-tar",
    "ttf": "font/ttf",
    "txt": "text/plain",
    "wav": "audio/wav",
    "webm": "video/webm",
    "webp": "image/webp",
    "woff": "font/woff",
    "woff2": "font/woff2",
    "xls": "application/vnd.ms-excel",
    "xlsx": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    "xml": "application/xml",
    "zip": "application/zip"
  };

  static mimeFromExtension({ extension }: { extension: string }): string | undefined {
    return AcFileUtils._mimeTypes[extension.toLowerCase()];
  }

  static mimeFromPath({ path }: { path: string }): string | undefined {
    const ext = path.split('.').pop()?.toLowerCase() ?? '';
    return AcFileUtils.mimeFromExtension({ extension: ext });
  }

  static mimeFromFile({ file }: { file: { path?: string, name?: string } }): string | undefined {
    const filePath = file.path || file.name || '';
    return AcFileUtils.mimeFromPath({ path: filePath });
  }

  static mimeFromPathOrDefault({ path, defaultType = 'application/octet-stream' }: {
    path: string,
    defaultType?: string
  }): string {
    return AcFileUtils.mimeFromPath({ path }) ?? defaultType;
  }
}
