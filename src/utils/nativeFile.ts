import { NativeModules } from 'react-native';

const { FileModule } = NativeModules;

export const downloadPdf = async (filePath: string, fileName: string): Promise<string> => {
  if (!FileModule) {
    throw new Error('FileModule native module is not available.');
  }
  return FileModule.downloadPdf(filePath, fileName);
};

export const sharePdf = async (filePath: string, title: string): Promise<boolean> => {
  if (!FileModule) {
    throw new Error('FileModule native module is not available.');
  }
  return FileModule.sharePdf(filePath, title);
};
