export class OverwritingPropertiesFromBaseError extends Error {
	constructor(key: PropertyKey) {
		console.error(
			`Attempting to overwrite stub key [ ${String(
				key
			)} ], which was already defined inside the base object`
		);
		super(`Overwritting properties from base are not allowed`);
	}
}
