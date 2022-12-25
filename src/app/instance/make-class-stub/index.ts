import makeClassMethodMock from '~stub-maker/app/instance/make-class-method-mock';
import applyStubSafetyCheck from '~stub-maker/app/instance/make-class-stub/apply-stub-safety-check';
import { OverwritingPropertiesFromBaseError } from '~stub-maker/domain/errors/overwritting-properties-from-base-error';
import { Stubbable } from '~stub-maker/domain/stub-able';
import { Jester } from '~stub-maker/helpers/jester';

export type MakeClassStubPayload<S extends Stubbable> = {
	getBase(): {};
	defaultFunctionBehaviour: (...args: any) => any;
	keys: Array<keyof S>;
};

export default {
	handle: <S extends Stubbable>(payload: MakeClassStubPayload<S>): Jester.Mock.Stub<S> => {
		const { getBase, defaultFunctionBehaviour, keys } = payload;
		const source: Jester.Mock.Stub<S> = { ...getBase() } as any;

		keys.forEach((key) => {
			if (key in source) {
				throw new OverwritingPropertiesFromBaseError(key);
			}
			source[key] = makeClassMethodMock.handle({
				defaultFunctionBehaviour,
				key,
			}) as any;
		});

		const transforms = [applyStubSafetyCheck];

		return transforms.reduce((prev, transform) => transform.handle(prev), source);
	},
};
