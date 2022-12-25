import { Jester } from '~stub-maker/helpers/jester';

export type MakeClassMethodMockPayload = {
	defaultFunctionBehaviour: (...args: any) => any;
	key: PropertyKey;
};

export default {
	handle: (payload: MakeClassMethodMockPayload): Jester.Mock<any> => {
		const func = jest.fn(payload.defaultFunctionBehaviour);
		func.mockName(String(payload.key));
		return func;
	},
};
