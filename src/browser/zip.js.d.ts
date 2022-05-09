// Type definitions for zip.js 2.4.11
// Project: https://github.com/gildas-lormeau/zip.js
// Definitions by: Louis Grignon <https://github.com/lgrignon>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

interface FileEntry {}

declare namespace zip {
	export var useWebWorkers: boolean;
	export var workerScriptsPath: string;
	export var workerScripts: {
		deflater?: string[];
		inflater?: string[];
	};

	export class Reader {
		public size: number;
		public init(callback: () => void, onerror: (error: any) => void): void;
		public readUint8Array(index: number, length: number, callback: (result: Uint8Array) => void, onerror?: (error: any) => void): void;
	}

	export class TextReader extends Reader {
		constructor(text: string);
	}

	export class BlobReader extends Reader {
		constructor(blob: Blob);
	}

	export class Data64URIReader extends Reader {
		constructor(dataURI: string);
	}

	export class HttpReader extends Reader {
		constructor(url: string);
	}

	export class ZipReader {
		constructor(reader: Reader, options?: ZipReaderConstructorOptions);
		getEntries(): zip.Entry[];
		close(callback?: () => void): void;
	}

	type ZipReaderConstructorOptions = ZipReaderOptions & GetEntriesOptions;

	type ZipReaderGetEntriesOptions = EntryOnprogressOption & GetEntriesOptions;

	interface ZipReaderOptions {
		checkSignature?: boolean;
		password?: string;
		useWebWorkers?: boolean;
		signal?: AbortSignal;
	}

	interface GetEntriesOptions {
		filenameEncoding?: string;
		commentEncoding?: string;
	}

	export interface Entry {
		filename: string;
		directory: boolean;
		compressedSize: number;
		uncompressedSize: number;
		lastModDate: Date;
		lastModDateRaw: number;
		comment: string;
		crc32: number;

		getData(writer: zip.Writer, onprogress?: (progress: number, total: number) => void, checkCrc32?: boolean): Promise<any>;
	}

	export class Writer {
		public init(callback: () => void, onerror?: (error: any) => void): void;
		public writeUint8Array(array: Uint8Array, callback: () => void, onerror?: (error: any) => void): void;
		public getData(callback: (data: any) => void, onerror?: (error: any) => void) : void;
	}

	export class TextWriter extends Writer {
		constructor(encoding: string);
	}

	export class BlobWriter extends Writer {
		constructor(contentType?: string);
	}

	export class FileWriter extends Writer {
		constructor(fileEntry: FileEntry);
	}

	export class Data64URIWriter extends Writer {
		constructor(mimeString?: string);
	}

	export function createWriter(writer: zip.Writer, callback: (zipWriter: zip.ZipWriter) => void, onerror?: (error: any) => void, dontDeflate?: boolean): void;

	export interface WriteOptions {
		directory?: boolean;
		level?: number;
		comment?: string;
		lastModDate?: Date;
		version?: number;
	}

	export class ZipWriter {
		public add(name: string, reader: zip.Reader, onend: () => void, onprogress?: (progress: number, total: number) => void, options?: WriteOptions): void;
		public close(callback: (result: any) => void): void;
	}

	type ZipWriterAddDataOptions = EntryDataOnprogressOption & AddDataOptions & ZipWriterConstructorOptions;

	type ZipWriterCloseOptions = EntryOnprogressOption & CloseOptions;

	interface ZipWriterConstructorOptions {
		zip64?: boolean;
		level?: number;
		bufferedWrite?: boolean;
		keepOrder?: boolean;
		version?: number;
		password?: string;
		encryptionStrength?: number;
		zipCrypto?: boolean;
		useWebWorkers?: boolean;
		dataDescriptor?: boolean;
		dataDescriptorSignature?: boolean;
		signal?: AbortSignal;
		lastModDate?: Date;
		lastAccessDate?: Date;
		creationDate?: Date;
		extendedTimestamp?: boolean;
		msDosCompatible?: boolean;
		internalFileAttribute?: number;
		externalFileAttribute?: number;
	}

	interface AddDataOptions {
		directory?: boolean;
		comment?: string;
		extraField?: Map<number, Uint8Array>;
	}

	interface CloseOptions {
		zip64?: boolean;
	}

	interface EntryDataOnprogressOption {
		onprogress?: (progress: number, total: number) => void;
	}

	interface EntryOnprogressOption {
		onprogress?: (progress: number, total: number, entry: Entry) => void;
	}
}
