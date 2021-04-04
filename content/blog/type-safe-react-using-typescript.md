---
title: Type-safe React using TypeScript
published: true
description: Let's improve the quality of your React app by using TypeScript 😉
tags: react, typescript, frontend
date: '2020-10-13' 
cover_image: https://i2.wp.com/blog.alexdevero.com/wp-content/uploads/2019/12/02-12-19-getting-started-with-react-and-typescript-pt1.jpg?resize=768%2C476&ssl=1
cannonical_url: 'https://dev.to/msambassadorske/type-safe-react-using-typescript-1dkh'
---
### A little background

For the past 4 months, I've been learning React and using it to build applications in a professional context. To spice things up, I've been using TypeScript with it. The type system TypeScript offers is phenomenal, coming from a JavaScript world. Combining the two just makes everything simple (didn't say it was going to be easy). This article isn't going to solve all your problems either. This is an attempt give a gentle introduction to React and TS, in a way that will not be overwhelming too.

I've had lots of happy-sad moments too. Sad, because I was rethinking my career choices (thought about being a farmer) because I could not understand error messages and throwing around the `any` type (take my advice, do not even think of trying this if you know what the data type is 😂). Happy too, because it helped me avoid mistakes, I would classify as stupid, like typos and using array methods on what I think is an array but is actually an object and save lots of hours swearing at JavaScript. 

How I like to think of JS is, it's the parent who would see their child make a mistake and be, "Meh... they will learn from their mistakes", and TS as the overprotective parent who will do their best to make sure they have a smooth childhood. If you would like to share some of your tips on this topic, share it in the comments, I would be glad to learn from you too 😁.

As you can tell, I'm by no means no expert at these two topics, but I'm learning new things in an attempt to improve the quality of my code. It will not be comprehensive either, just short and sweet too. I will leave links to resources that have helped me get a deeper understanding.

### The Ground work

The assumptions I'm making while writing this is that you are knowledgeable in React and just got started with TS, and would like make the most out of both worlds. We are going to use `create-react-app` and using TS in your project will still be possible while using frameworks and libraries such as Next.Js and Gatsby.

Starting a new React project with TypeScript is pretty straightforward..

```bash
npx create-react-app my-app --template typescript
# or
yarn create react-app my-app --template typescript
```

If you would like to add TS to your existing project, add the following dependencies and rename your .js or .jsx files to .tsx. This will allow us to take advantage of TypeScript in our project.

```bash
npm install --save typescript @types/node @types/react @types/react-dom @types/jest
# or
yarn add typescript @types/node @types/react @types/react-dom @types/jest
```

Let's say you are working an e-commerce app, and you'd like to create a product component. This component will receive some props, the product details such as an id, the name, description, price availability and the image. The example might be a little crude, but bear with me here...

Enough talk, let's just dive into the code. 

### Interfaces and Types

Interfaces and types are used to describe the structure of data, or a "blueprint". In this case, it's a product, so let's go ahead and create an interface.

```tsx
interface ProductProps {
	id: string;
	name: string;
	description: string;
	price: number;
	availability: "SOLD OUT" | "IN STOCK";
	imageUrl: string | null; // this means imageUrl can return either a string or null
}

// this is how the type would look like
type ProductProps = {
	id: string
	name: string;
	description: string;
	price: number;
	availability: "SOLD OUT" | "IN STOCK";
	imageUrl: string | null;
}
```

I'll be honest, I don't know the difference between the two. Even after lots of googling. But they pretty much work the same, from how I understand it. The difference is their syntax and implementation. If you happen to understand this difference, feel free to explain it to me in the comments

### React.FC or FC

Now that we have our interface/type ready, let's create our Product component. I prefer functional components to class components because makes everything simple and clean... oh, and hooks too, [the best thing that's happened to React so far](https://dev.to/dan_abramov/making-sense-of-react-hooks-2eib) 😀.

Let's create our functional component here.... let's not forget it will expect some props too, `ProductProps`,

```tsx
import React, { FC } from 'react'

export interface ProductProps {/**...*/}

export const ProductComponent: FC<ProductProps> = (props) => {
	return (
		{/** some jsx here... div soup probably, guilty as charged 😂*/}
	)
}
```

From the above example, `FC` represents the functional component and `<ProductProps>` represents the props passed to our component. You may choose to destructure the props, and you will notice that the intellisense will suggest properties found inside your interface or type.

### API requests

Your React app will most likely communicate with an API and send or receive some data. It would be nice to know what will be in this data instead of trying to guess what's in it...right? So, let's try reduce the tears you might shed here 😅.

The common pattern method of making network requests without any external library using `fetch`.  I'd love to talk about how life changing `react-query` is but that's for another day. 

When a network request is made, it returns a promise. We can extend the promise to return data that will be of a specific type. For our example, we'd like to receive a list of objects that are of the type Product: 

```tsx
export const getProducts = async (): Promise<ProductProps[]> =>
  await fetch('https://some_backend.api/products').then(data => data.json())
```

### Call the API

If you've gotten this far bear with me, we are almost done, for now. 

The last thing left is inferring type to the `useState` hook. `useState` is mostly used to manage component state. We will wrap everything together by having a component that will fetch data using the function we just created and `useEffect` (no dependencies since we'd like it to run only on mount) and pass the data fetched to the component we had just created.

```tsx
import React, { FC, useState, useEffect } from 'react';
import { ProductProps, ProductComponent } from './ProductComponent';
import { getProducts } from './api/products';

const ProductsPage: FC = () => {
	const [products, setProducts] = useState<ProductProps[]>([])
	/** you could probably create an abstraction of this into a custom hook or use react-query but let's keep this simple...*/
	const [error, setError] = useState(false)
	const [isLoading, setLoading] = useState(false)

	useEffect(() => {
    setLoading(true)
    getProducts()
      .then(data => {
        setProducts(data)
        setLoading(false)
      })
      .catch(error => {
        setLoading(false)
        setError(error)
      })
  }, [])

	return(
		<>
			<h1>Next Gen Consoles</h1>
			<p>This is a dummy example </p>
			{products.length ? 
					products.map(product => (
					<ProductComponent key={product.id} {...product} />
						))
				: <p>Check in again pretty soon</p>}	
		</>
	)
}
```

... and that is it, for now. I hope this article helped you as you create a type-safe React application ... less `any` types in your codebase 😉.

### Resources

[The TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)

[Write a React component with TypeScript](https://katifrantz.com/react-component-with-typescript) by Kati Frantz

[React + TypeScript Cheatsheets](https://github.com/typescript-cheatsheets/react#reacttypescript-cheatsheets)

[Ultimate React Components patterns with TypeScript 2.8](https://levelup.gitconnected.com/ultimate-react-component-patterns-with-typescript-2-8-82990c516935)

[React Hooks in TypeScript](https://medium.com/@jrwebdev/react-hooks-in-typescript-88fce7001d0d)