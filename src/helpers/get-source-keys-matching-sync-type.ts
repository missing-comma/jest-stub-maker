import { Stubbable } from '~stub-maker/domain/stub-able';

export type FunctionSyncType = 'sync' | 'async';

type SyncFilter<SourceValue, K extends PropertyKey, ST extends FunctionSyncType> = {
	sync: SourceValue extends (...args: any) => infer R
		? R extends Promise<any>
			? never
			: K
		: never;
	async: SourceValue extends (...args: any) => Promise<any> ? K : never;
}[ST];

export type GetSourceKeysMatchingSyncType<
	Source extends Stubbable,
	SyncType extends FunctionSyncType
> = {
	[K in keyof Source]: SyncFilter<Source[K], K, SyncType>;
}[keyof Source];
