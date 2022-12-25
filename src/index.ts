import { makeStubComposerFunction } from '~stub-maker/app/composer/make-composer-base-function';
import { IStubComposer } from '~stub-maker/domain/stub-composer';
import { IStubComposerFunction } from '~stub-maker/domain/stub-composer-function';

const asyncFunction: IStubComposerFunction<'async'> = makeStubComposerFunction<'async'>(() =>
	Promise.resolve()
);
const asyncBlockFunction: IStubComposerFunction<'async'> = makeStubComposerFunction<'async'>(() =>
	Promise.reject(new Error('mocked-error'))
);

const syncFunction: IStubComposerFunction<'sync'> = makeStubComposerFunction<'sync'>(() => {});
const syncBlockFunction: IStubComposerFunction<'sync'> = makeStubComposerFunction<'sync'>(() => {
	throw new Error('mocked-error');
});

export const makeClassLikeStub: IStubComposer = Object.assign(asyncFunction, {
	sync: syncFunction,
	syncBlock: syncBlockFunction,
	block: asyncBlockFunction,
});
