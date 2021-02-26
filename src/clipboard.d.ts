// declare class ClipboardItem {
//     constructor(data: { [mimeType: string]: Blob });
//   }

//   interface Clipboard {
//     read?(): Promise<Array<ClipboardItem>>;
  
//     write?(items: Array<ClipboardItem>): Promise<void>;
//   }

interface ClipboardItem {
}

declare var ClipboardItem: {
  prototype: ClipboardItem;
  new(objects: Record<string, Blob>): ClipboardItem;
};

interface Clipboard {
  read?(): Promise<Array<ClipboardItem>>;

  write(items: Array<ClipboardItem>): Promise<void>;
}