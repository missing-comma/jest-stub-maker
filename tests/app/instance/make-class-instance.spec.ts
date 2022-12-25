import makeClassMethodMock from '~stub-maker/app/instance/make-class-method-mock';
import applyStubSafetyCheck from '~stub-maker/app/instance/make-class-stub/apply-stub-safety-check';
import makeInternalClassStub from '~stub-maker/app/instance/make-class-stub';

interface ClassLike {
	foo(): number;
	boo(): string;
}

const makeSut = (keys: (keyof ClassLike)[] = ['foo']) => {
	const defaultFunctionBehaviour = jest.fn();
	const getBase = jest.fn(() => ({}));
	const sut = () =>
		makeInternalClassStub.handle<ClassLike>({
			defaultFunctionBehaviour,
			getBase,
			keys,
		});

	return { sut, stubs: { defaultFunctionBehaviour, getBase, keys } };
};

describe('makeInternalClassStub test', () => {
	describe('should invoke makeClassMethodMock.handle with proper parameters', () => {
		test('when one key is passed', () => {
			const { sut, stubs } = makeSut(['foo']);

			const makeClassMethodMockSpy = jest.spyOn(makeClassMethodMock, 'handle');

			sut();

			expect(makeClassMethodMockSpy).toHaveBeenCalledTimes(1);
			expect(makeClassMethodMockSpy).toHaveBeenCalledWith({
				defaultFunctionBehaviour: stubs.defaultFunctionBehaviour,
				key: 'foo',
			});
		});

		test('when two keys are passed', () => {
			const { sut, stubs } = makeSut(['foo', 'boo']);

			const makeClassMethodMockSpy = jest.spyOn(makeClassMethodMock, 'handle');

			sut();

			expect(makeClassMethodMockSpy).toHaveBeenCalledTimes(2);
			expect(makeClassMethodMockSpy).toHaveBeenCalledWith({
				defaultFunctionBehaviour: stubs.defaultFunctionBehaviour,
				key: 'foo',
			});
			expect(makeClassMethodMockSpy).toHaveBeenCalledWith({
				defaultFunctionBehaviour: stubs.defaultFunctionBehaviour,
				key: 'boo',
			});
		});
	});

	it('should should applyStubSafetyCheck', () => {
		const { sut } = makeSut(['foo', 'boo']);

		const applyStubSafetyCheckSpy = jest.spyOn(applyStubSafetyCheck, 'handle');

		sut();

		expect(applyStubSafetyCheckSpy).toHaveBeenCalledTimes(1);
	});

	it('should return the stub object', () => {
		const { sut } = makeSut();

		const stub = sut();

		expect(stub).toBeDefined();
		expect(typeof stub).toBe('object');
		expect(stub.foo).toBeDefined();
		expect(typeof stub.foo).toBe('function');
	});
});
