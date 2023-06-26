# Singleton

[![CI](https://github.com/heap-code/singleton/actions/workflows/ci.yml/badge.svg?branch=master)](https://github.com/heap-code/singleton/actions/workflows/ci.yml)
[![npm version](https://img.shields.io/npm/v/@heap-code/singleton)](https://www.npmjs.com/package/@heap-code/singleton)
![Code coverage](.badges/code/coverage.svg)
![Comment coverage](.badges/comment/coverage.svg)

A simple singleton implementation with lazy initialization.

## Installation

Simply run:

```bash
npm install @heap-code/singleton
```

### CDN

Thanks to [_jsdelivr_](https://www.jsdelivr.com/),
this package can easily be used in browsers like this:

```html
<script
 src="https://cdn.jsdelivr.net/npm/@heap-code/singleton/dist/bundles/singleton.umd.js"
 type="application/javascript"
></script>
```

> **Note:**  
> It is recommended to use a minified and versioned bundle.
>
> For example:
>
> ```html
> <script
>  src="https://cdn.jsdelivr.net/npm/@heap-code/singleton@1.1.1/dist/bundles/singleton.umd.min.js"
>  type="application/javascript"
> ></script>
> ```

More at this [_jsdelivr_ package page](https://www.jsdelivr.com/package/npm/@heap-code/singleton).

## Usage

Wrap a value that should only be calculated once and only when needed:

```typescript
// Typescript
import { Singleton } from "@heap-code/singleton";

const mySingleton = new Singleton(() => Math.random());
console.log(mySingleton.get() === mySingleton.get());  // true
```

### Promise

It also works with `Promise` as they are only fulfilled once:

```typescript
import { Singleton } from "@heap-code/singleton";

function doAsyncStuff() {
  return new Promise(resolve => {
    console.log("It doesn't look like it, but I'm actually doing a lot of things.");
    setTimeout(() => resolve(new Date().getMilliseconds()), 100);
  });
}

async function bootstrap() {
  const a1 = await doAsyncStuff();
  const a2 = await doAsyncStuff();
  console.log(a1 === a2); // false

  const singleton = new Singleton(() => doAsyncStuff());
  const b1 = await singleton.get();
  const b2 = await singleton.get();
  console.log(b1 === b2); // true
}

bootstrap();
```

> **Note**:  
> Rather use this library for its lazy initialization rather than its "singletoness":
>
> **Example**:
>
> ```typescript
> import { Singleton } from "@heap-code/singleton";
> 
> class MyAddition {
>   // Simply calculated, often used
>   public readonly added: number;
> 
>   private readonly singleton: Singleton<number>;
> 
>   public constructor(private readonly a: number, private readonly b: number) {
>     this.added = a + b;
>     this.singleton = new Singleton(() => Math.pow(a * b, Math.sin(a) * Math.cos(b)));
>   }
> 
>   public get divided() {
>     // Used sometimes
>     return this.a / this.b;
>   }
> 
>   public get complicated() {
>     // Used only sometimes and performance-intensive.
>     // Calculated only once needed
>     return this.singleton.get();
>   }
> }
> ```

## Releases

See information about breaking changes and release notes [here](https://github.com/heap-code/singleton/blob/HEAD/CHANGELOG.md).

## Author's note

This is not the most useful package, as it can most of the time be simply replaced by a variable.
And come consider it to be an anti-pattern ([Singleton pattern criticism](https://en.wikipedia.org/wiki/Singleton_pattern#Criticism)).

This package was more a test for automating changelogs generation, _GitHub_ and _npm_ publishing process.
