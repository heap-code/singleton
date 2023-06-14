/**
 * A (lazy) Singleton class that will store a single value.
 * The value will only be loaded when asked (lazy).
 *
 * It also works with promised values as they are only fulfilled once.
 *
 * @see {@link https://en.wikipedia.org/wiki/Singleton_pattern}
 */
export class Singleton<T> {
	/**
	 * Has the Singleton been called ?
	 */
	private called = false;
	/**
	 * The singleton value.
	 * It can not be used to determine if it is initialized: The final value could be falsy
	 */
	private value?: T;

	/**
	 * @returns If the Singleton loader has been called
	 */
	public get hasBeenCalled() {
		return this.called;
	}

	/**
	 * Creates a Singleton
	 *
	 * @param loader The function called to load the singleton value
	 */
	public constructor(private readonly loader: () => T) {}

	/**
	 * Runs the loader if it has not already been called, then returns the value.
	 * Only returns the value if it has already been called
	 *
	 * @returns The value of this singleton
	 */
	public get(): T {
		if (!this.called) {
			this.called = true;
			this.value = this.loader();
		}

		return this.value as T;
	}
}
