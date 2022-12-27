# jest-stub-maker

# Installation

With yarn:

```.sh
	yarn add -D @missing-comma/jest-class-stub-maker
```

With npm:

```sh
	npm i --save-dev @missing-comma/jest-class-stub-maker
```

# Description

An easy solution to quickly mock an implementation of an interface with it's methods properly mocked
as well.

# Usage

Let's say we are creating a controller for some HTTP Request. This controller requires a check for
authentication. The implementation to this check is passed to the controller as a dependecy.

Let's say our "check if authenticated" implementation should implement the following interface:

```.ts
export interface IsAuthenticated {
	check(request: any): Promise<boolean>;
}
```

and your controller implementation looks something like this:

```.ts
export class RequestController {
	constructor(private readonly isAuthenticated: IsAuthenticated) {}

	async handle(request: any): Promise<any> {
		const authenticated = await this.isAuthenticated.check(request);

		if (!authenticated) {
			throw new Error("unauthenticated");
		}

		// do something
	}
}
```

To make a proper unit-test for this class, we should mock "isAuthenticated" inside the controller.
And this package provides the tools for mocking such interface's implementation easily

Here's how your test to check if "isAuthenticated" is being properly used would look like:

```.ts
import { makeClassLikeStub } from "@missing-comma/jest-class-stub-maker";
import { IsAuthenticated, RequestController } from "...";

describe("RequestController Test", () => {
	test("Should throw error if user has no permission", async () => {
		const isAuthenticatedStub = makeClassLikeStub<IsAuthenticated>("check");
		const controller = new RequestController(isAuthenticatedStub);

		const request = "valid_request";
		isAuthenticatedStub.check.mockResolvedValueOnce(false);

		await expect(controller.handle(request)).rejects.toThrow("unauthenticated");
	});

	test("Should not throw error if user has permission", async () => {
		const isAuthenticatedStub = makeClassLikeStub<IsAuthenticated>("check");
		const controller = new RequestController(isAuthenticatedStub);

		const request = "valid_request";
		isAuthenticatedStub.check.mockResolvedValueOnce(true);

		await expect(controller.handle(request)).resolves.not.toThrow();
	});
});

```

# Disclaimer

The name of the package and it's methods are all open for discussion. My bad if they are not great
:c
