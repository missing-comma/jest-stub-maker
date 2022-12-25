export class AccessingUndefinedStubKeyError extends Error {
	constructor(key: string, knownKeys: string[]) {
		console.error(
			`Àttempting to access property [ ${key} ] of stub, but stub has only [ ${knownKeys.join(
				', '
			)} ] defined.
			If you think this is an error, Open an issue describing your case.`
		);
		// If you are trying to define on run-time, use .with<name of your interface>({ ${key}: undefined }).
		super(`${key} is not a valid stub`);
	}
}
