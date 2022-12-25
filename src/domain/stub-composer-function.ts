import { Stubbable } from '~stub-maker/domain/stub-able';
import {
	FunctionSyncType,
	GetSourceKeysMatchingSyncType,
} from '~stub-maker/helpers/get-source-keys-matching-sync-type';
import { Jester } from '~stub-maker/helpers/jester';

export interface IStubComposerFunction<SyncType extends FunctionSyncType> {
	/**
	 * Creates a stub version of the interface
	 *
	 * @param {...GetSourceKeysMatchingSyncType<S, SyncType>[]} keys list of keys that maps to functions to automatically mock
	 *
	 * @returns {Jester.Mock.Stub<S>}
	 */
	<S extends Stubbable>(
		...keys: GetSourceKeysMatchingSyncType<S, SyncType>[]
	): Jester.Mock.Stub<S>;
}
