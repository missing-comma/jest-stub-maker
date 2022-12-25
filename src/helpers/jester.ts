type Foo = (...args: any) => any;

export namespace Jester {
	export type Mock<F extends Foo> = jest.Mock<ReturnType<F>, Parameters<F>>;
}

export namespace Jester.Mock {
	export type Stub<S> = {
		[K in keyof S]: S[K] extends Foo ? Jester.Mock<S[K]> : S[K];
	};
}
