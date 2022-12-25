import { AccessingUndefinedStubKeyError } from '~stub-maker/domain/errors/accessing-undefined-stub-key-error';
import { Stubbable } from '~stub-maker/domain/stub-able';

const skipSafetyCheckProps: Array<string | RegExp> = [
	'$$typeof',
	'assymetricMatch',
	'toString',
	'nodeType',
	'tagName',
	'hasAttribute',
	/@@__.+__@@/,
];

function shouldIgnoreOnKeyNotSet(key: PropertyKey) {
	if (typeof key !== 'string') return true;

	return skipSafetyCheckProps.some((matcher) => {
		if (matcher instanceof RegExp) {
			return matcher.test(key as string);
		}
		return matcher === key;
	});
}

export default {
	handle: <S extends Stubbable>(stub: S): S => {
		const knownKeys = Object.keys({ ...stub });

		return new Proxy(stub, {
			get(...args) {
				const [target, key] = args;
				if (typeof key !== 'symbol') {
					const value = (target as any)[key];
					if (key in stub) {
						return value;
					}
					if (shouldIgnoreOnKeyNotSet(key)) {
						return (target as any)[key];
					}
					throw new AccessingUndefinedStubKeyError(key, knownKeys);
				}
				return Reflect.get(...args);
			},
		});
	},
};
