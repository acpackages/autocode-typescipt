export class AcDirectoryUtils {
  private static isNode(): boolean {
    return typeof process !== 'undefined' && !!process.versions?.node;
  }

  static async checkAndCreateDirectory({ path }: { path: string }): Promise<void> {

  }

  static async copyDirectory({
    sourcePath,
    destinationPath,
  }: {
    sourcePath: string;
    destinationPath: string;
  }): Promise<void> {

  }
}
