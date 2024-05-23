import { Provide } from '@midwayjs/decorator';
import * as fs from 'fs';
import * as path from 'path';

@Provide()
export default class FileService {
  /**
   * 将 base64 编码的字符串转换为文件并保存到项目的相对路径中
   * @param base64String - base64 编码的字符串
   * @param fileName - 保存文件的名称
   * @returns 返回保存的文件路径
   */
  async saveBase64ToFile(base64String: string, fileName: string): Promise<string> {
    // 从 base64 字符串中提取数据部分
    const matches = base64String.match(/^data:(.+);base64,(.+)$/);
    if (!matches || matches.length !== 3) {
      throw new Error('Invalid base64 string');
    }

    const fileData = matches[2];
    const buffer = Buffer.from(fileData, 'base64');

    // 获取项目的相对路径
    const projectDir = this.getProjectDir();
    const filePath = path.join(projectDir, fileName);
    console.log(`Saving file to: ${filePath}`);

    await fs.promises.writeFile(filePath, buffer);
    console.log(`File saved to ${filePath}`);

    return filePath;
  }

  /**
   * 获取项目的相对路径
   * @returns 项目根目录路径
   */
  private getProjectDir(): string {
    // 在 MidwayJS 中，应用根目录可以通过 process.cwd() 获取
    return process.cwd();
  }
}
