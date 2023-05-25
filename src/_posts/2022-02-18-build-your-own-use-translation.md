---
layout: post
title:  Build your own useTranslation hook with NextJS
date:   2022-02-18 13:08:42 +0200
categories: posts
image: /images/blog/build-your-own-use-translation.webp
description: I needed a lightway solution to support internationalization so I've built my own useTranslation hook and I've been using this code for the last year on my website.
---

If you have ever worked on localization for a React application then you probably know [react-18next](https://react.i18next.com/) that is the standard way to solve this kind of problems.

On the other hand, for Next.js we can use [next-translate](https://github.com/vinissimus/next-translate) which has similar concepts. I found out about this library while I was building my own website [achris.me](https://achris.me/) and, since I wanted to support Italian and English languages, I had to understand how this library works but while reading the documentation I thought it was overkill for a tiny website like mine to use such a complex library.

Why not develop my own useTranslation hook and just use a bunch of JSON files to store the translations? That's what I did to build my website.

Let me explain how I made it, it's easier than you expect.

## Add localization in Next.js

First of all, we need to add the locales for the languages we are interested to support. In this example I will add localization for Italian and English languages and I set English as the default language when a user visits the website.

This is the expected behavior:
- `mywebsite.com`     => english translations
- `mywebsite.com/en`  => english translations
- `mywebsite.com/it`  => italian translations

In Next.js we have the `next.config.js` file, that should be something like:
```
const nextConfig = {
  reactStrictMode: true,
}

module.exports = nextConfig
```

now, with the `it` and `en` locales it becomes

```
const nextConfig = {
  reactStrictMode: true,
  i18n: {
    locales: ["en", "it"],
    defaultLocale: "en",
  },
};

module.exports = nextConfig
```

## Create translations

Next step, let's write the translations for the texts we want to show on the website.

Create two files: `it.js` and `en.js` in the path `public/static/locales`
```
pages/
public/
├─ static/
│  ├─ locales/
│  │  ├─ it.js
│  │  ├─ en.js
next.config.js/
....
```

as you can guess, the `it.js` file is going to contain all the italian translations and `en.js` the english ones.

```
// it.js
module.exports = {
  WELCOME_MSG: "Benvenuto nel mio sito web!"
}
```

```
// en.js
module.exports = {
  WELCOME_MSG: "Welcome to my website!"
};
```
Of course, you can use JSON files instead of Javascript to store the translations if you only have text strings. In my case I used Javascript files to have more control over the data, you will read more about this in the last section.

## Create the useTranslation hook
Now it's time to create our custom React hook to use these translations.
Create the `hooks` folder into the root of the project and the file `useTranslation.jsx`
```
// hooks/useTranslation.jsx

import { useRouter } from "next/router";
import en from "../public/static/locales/en";
import it from "../public/static/locales/it";

const TRANSLATIONS = { en, it };

export default function useTranslation() {
  const router = useRouter();
  const { locale, asPath } = router;

  const setLocale = (locale) => router.push(asPath, asPath, { locale });

  const t = (keyString) => TRANSLATIONS[locale][keyString];

  return { t, locale, setLocale };
}
```

and that's all, this is the hardest part you will see in this tutorial!
If you have already used React hooks you already know what's going on, otherwise, let me explain.

As you can see, we are importing the italian and english translation files and we store them into the `TRANSLATIONS` constant.
```
import en from "../public/static/locales/en";
import it from "../public/static/locales/it";

const TRANSLATIONS = { en, it };
```
We need to detect the current locale of the user and to do this we use the Next.js router, imported from `next/router`. The `locale` constant contains the current locale which can be `it` or `en`.
```
const router = useRouter();
const { locale, asPath } = router;
```
The function `setLocale` just changes the locale of the URL with the given one by using the Next.js router, this means that `setLocale("it")` navigates the user to `mywebsite.com/it` and switches all the website to italian.
```
const setLocale = (locale) => router.push(asPath, asPath, { locale });
```
Now the core idea of this useTranslation hooks is the `t` function: it receives a key and access the TRANSLATIONS object using that key and the current locale.
```
const t = (keyString) => TRANSLATIONS[locale][keyString];
```

so, if the current locale is `en` and we pass the key `WELCOME_MSG` it will do `TRANSLATIONS[en][WELCOME_MSG]` that equals to `"Welcome to my website!"`

## How to use the hook

Finally, to display the `WELCOME_MSG` text we can just write:
```
export default function Home() {
  const { t } = useTranslation()

  return (
    <div>
      ...
      <main>
        <h1>{t("WELCOME_MSG")}</h1>
      </main>
    </div>
  );
}

```
Now if you change the user changes the localization of the website this text will automatically refresh to display the correct string.

## Optimizations

There's some space for optimization, for example we can use React `useCallback` hook to wrap the inner useTranslation functions so they will not re-render if nothing changes.

```
// hooks/useTranslation.jsx

import { useRouter } from "next/router";
import { useCallback } from "react";
import en from "../public/static/locales/en";
import it from "../public/static/locales/it";

const TRANSLATIONS = { en, it };

export default function useTranslation() {
  const router = useRouter();
  const { locale, asPath } = router;

  const setLocale = useCallback(
    (locale) => {
      router.push(asPath, asPath, { locale });
    },
    [asPath]
  );

  const t = useCallback(
    (keyString) => {
      return TRANSLATIONS[locale][keyString];
    },
    [TRANSLATIONS, locale]
  );

  return { t, locale, setLocale };
}
```

## Advanced use cases

As I've already mentioned, I chose to use Javascript files to store all the translations to have more control over the data. You are probably thinking "Why? It's just text!"

Well, in my case I needed to show different components based on the current user localization, for example the italian translation should be red while english one should be green.
This behaviour is pretty straightforward to obtain, just write the React components code into the localization files like this:
```javascript
// it.js
module.exports = {
  WELCOME_MSG_COLORED: <h2 style={{ color: 'red' }}>Benvenuto nel mio sito web!</h2>
}
```

```
// en.js
module.exports = {
  WELCOME_MSG_COLORED: <h2 style={{ color: 'green' }}>Welcome to my personal website!</h2>
};
```
and then we can use the `t` like this:
```
export default function Home() {
  const { t } = useTranslation()

  return (
    <div>
      ...
      <main>
        <h1>{t("WELCOME_MSG")}</h1>   // previous text, only black
        {t("WELCOME_MSG_COLORED")}    // colored text
      </main>
    </div>
  );
}
```
<br/><br/>

That's all guys, I hope it has been an interesting tutorial, I wanted to help novices and let them know that even something “obscure“ like internationalization can be made easy and without the need of complex libraries.

In the end, if you want to see a real world example of how this code looks like and it works, you can check out the GitHub repository which contains the code of my personal website [achris.me](https://github.com/a-chris/achris.me) in which I've been using my own useTranslation hook.
