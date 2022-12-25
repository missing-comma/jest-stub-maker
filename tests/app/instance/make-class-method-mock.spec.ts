import makeClassMethodMock from '~stub-maker/app/instance/make-class-method-mock';

const makeSut = (key: string = 'any-key') => {
	const defaultFunctionBehaviour = jest.fn();
	const sut = makeClassMethodMock.handle({
		defaultFunctionBehaviour,
		key,
	});

	return { sut, stubs: { defaultFunctionBehaviour } };
};

describe('makeClassMethodMock test', () => {
	it('should set function name', () => {
		const { sut } = makeSut('foo');

		expect(sut.getMockName()).toBe('foo');
	});

	it('should invoke the defaultFunctionBehaviour when invoking the mocked function', () => {
		const { sut, stubs } = makeSut('foo');

		sut();

		expect(stubs.defaultFunctionBehaviour).toHaveBeenCalled();
	});

	it('should invoke the defaultFunctionBehaviour with correct parameters', () => {
		const { sut, stubs } = makeSut('foo');

		const params = ['valid-param1', 2, 'valid-param3', Symbol('valid-symbol-parameter')];

		sut(...params);

		expect(stubs.defaultFunctionBehaviour).toHaveBeenCalledWith(...params);
	});

	it('should return the defaultFunctionBehaviour returned value ', () => {
		const { sut, stubs } = makeSut('foo');

		stubs.defaultFunctionBehaviour.mockReturnValueOnce('valid-value');

		expect(sut()).toBe('valid-value');
	});
});
