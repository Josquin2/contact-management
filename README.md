## About the Project

I started this project using _Vue CLI_ and added _TypeScript_ for better typing. I created the necessary pages and components using _Vue_. The API for this site was built with _Express.js_, _MySQL2_, and _Drizzle-ORM_. You can find the repository in my GitHub profile.

To make things easier on the frontend, every API call returns all the contacts. This way, data updates are faster and simpler. However, it would probably be even more convenient to use _Pinia_ or _Vuex_ for state management so I wouldn’t have to hit the API every time and wait for the response to update the frontend data.

The contact search works not only by name but also by phone and email. Form validation is handled with _Vuelidate_.

## Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

### Lints and fixes files

```
npm run lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).
