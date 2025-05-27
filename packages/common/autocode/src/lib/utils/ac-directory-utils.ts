import * as fs from 'fs';
import * as path from 'path';

export class AcDirectoryUtils {
  static async checkAndCreateDirectory({ path: dirPath }: { path: string }): Promise<void> {
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }
  }

  static copyDirectory({
    sourcePath,
    destinationPath,
  }: {
    sourcePath: string;
    destinationPath: string;
  }): void {
    if (!fs.existsSync(destinationPath)) {
      fs.mkdirSync(destinationPath, { recursive: true });
    }

    const files = fs.readdirSync(sourcePath, { withFileTypes: true });

    for (const file of files) {
      const src = path.join(sourcePath, file.name);
      const dest = path.join(destinationPath, file.name);

      if (file.isDirectory()) {
        this.copyDirectory({ sourcePath: src, destinationPath: dest });
      } else if (file.isFile()) {
        fs.copyFileSync(src, dest);
      }
    }
  }
}
