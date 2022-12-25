import makeInternalClassStub from '~stub-maker/app/instance/make-class-stub';
import { Stubbable } from '~stub-maker/domain/stub-able';
import { IStubComposerFunction } from '~stub-maker/domain/stub-composer-function';
import {
	FunctionSyncType,
	GetSourceKeysMatchingSyncType,
} from '~stub-maker/helpers/get-source-keys-matching-sync-type';

type DefaultBehaviour<SyncType extends FunctionSyncType> = (...args: any) => {
	sync: void | never;
	async: Promise<void | never>;
}[SyncType];

export type MakeComposerBaseFunctionPayload = {
	syncType: FunctionSyncType;
	defaultFunctionBehaviour: (...args: any) => any;
};

export const makeStubComposerFunction = <SyncType extends FunctionSyncType>(
	defaultFunctionBehaviour: DefaultBehaviour<SyncType>
): IStubComposerFunction<SyncType> => {
	type Keys<S extends Stubbable> = GetSourceKeysMatchingSyncType<S, SyncType>[];

	const makeStub = <S extends Stubbable>(...keys: Keys<S>[]) => {
		const stub = makeInternalClassStub.handle<S>({
			defaultFunctionBehaviour,
			getBase: () => ({}),
			keys: keys as any,
		});

		return stub;
	};

	return makeStub as any;
};
