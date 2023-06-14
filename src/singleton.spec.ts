import { Singleton } from "./singleton";

describe("Singleton", () => {
	it("should return the identity (simple)", () => {
		const testSingleton = <T>(value: T) => {
			const loader = jest.fn(() => value);
			const singleton = new Singleton<T>(loader);

			expect(singleton.hasBeenCalled).toBeFalse();
			expect(singleton.get()).toBe(value);

			expect(singleton.hasBeenCalled).toBeTrue();
			expect(singleton.get()).toBe(value);

			expect(singleton.hasBeenCalled).toBeTrue();
			expect(singleton.get()).toBe(value);
			expect(loader).toHaveBeenCalledOnce();
		};

		testSingleton(3);
		testSingleton("24");
		testSingleton(false);
		testSingleton(null);
		testSingleton([1, 2, 3]);
		testSingleton({ a: "a" });
	});

	it("should return the identity (Promise)", async () => {
		const testSingleton = async <T>(value: T) => {
			let calls = 0;
			const loader = jest.fn(
				() =>
					new Promise<T>(resolve => {
						++calls;
						resolve(value);
					})
			);

			const singleton = new Singleton(loader);

			expect(singleton.hasBeenCalled).toBeFalse();
			expect(await singleton.get()).toBe(value);

			expect(singleton.hasBeenCalled).toBeTrue();
			expect(await singleton.get()).toBe(value);

			expect(singleton.hasBeenCalled).toBeTrue();
			expect(await singleton.get()).toBe(value);
			expect(calls).toBe(1);
			expect(loader).toHaveBeenCalledOnce();
		};

		await testSingleton(3);
		await testSingleton("24");
		await testSingleton(false);
		await testSingleton(null);
		await testSingleton([1, 2, 3]);
		await testSingleton({ a: "a" });
	});
});
