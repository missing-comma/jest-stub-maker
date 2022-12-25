import { AccessingUndefinedStubKeyError } from '~stub-maker/domain/errors/accessing-undefined-stub-key-error';
import { makeClassLikeStub } from '~stub-maker/index';

interface SampleInterface {
	foo(value: number): Promise<string>;
	boo(value: number): Promise<string>;
}

const makeSut = () => {
	const sut = makeClassLikeStub<SampleInterface>('foo');

	return { sut };
};

describe('makeClassLikeStub receiving Interface', () => {
	it('should mock foo', () => {
		const { sut } = makeSut();

		expect(sut.foo).toBeDefined();
		expect(typeof sut.foo).toBe('function');
		expect(sut.foo.mock).toBeDefined();
	});

	test('foo should return a Promise by default', async () => {
		const { sut } = makeSut();

		await expect(sut.foo(2)).resolves.toBeUndefined();
	});

	test('foo should support jest function assertions', async () => {
		const { sut } = makeSut();

		await sut.foo(2);

		expect(sut.foo).toHaveBeenCalled();
		expect(sut.foo).toHaveBeenCalledWith(2);
	});

	test('foo should support jest function spy', () => {
		const { sut } = makeSut();

		sut.foo.mockImplementationOnce((): any => 3);

		sut.foo(2);

		expect(sut.foo).toHaveBeenCalled();
		expect(sut.foo).toHaveBeenCalledWith(2);
		expect(sut.foo).toHaveReturnedWith(3);
	});

	it('should throw if attempting to access [boo]', () => {
		const { sut } = makeSut();

		let errorCatched: any = null;

		jest.spyOn(console, 'error').mockImplementationOnce(() => {});

		try {
			expect(sut.boo).toBeUndefined();
		} catch (err) {
			errorCatched = err;
			expect(errorCatched).toBeInstanceOf(AccessingUndefinedStubKeyError);
		}
		// to avoid false-positive test
		expect(errorCatched).not.toBeNull();
	});
});
