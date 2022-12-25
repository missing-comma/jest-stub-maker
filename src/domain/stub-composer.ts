import { IStubComposerFunction } from './stub-composer-function';

export interface IStubComposer extends IStubComposerFunction<'async'> {
	/**
	 * Same as the default behaviour, but all function implementations returns nothing, instead of a Promise
	 */
	sync: IStubComposerFunction<'sync'>;

	/**
	 * Same as the default behaviour, but all function implementations returns a Promise that rejects to an empty error
	 */
	block: IStubComposerFunction<'async'>;
	/**
	 * Same as the default block behaviour, but all function implementations throws an error
	 */
	syncBlock: IStubComposerFunction<'sync'>;
}
