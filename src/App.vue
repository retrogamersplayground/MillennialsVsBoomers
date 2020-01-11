<template>
  <div id="app">
    <app-navigation></app-navigation>
    <router-view />
  </div>
</template>

<script>
import Navigation from "./components/Navigation";

export default {
  name: "App",
  components: {
    "app-navigation": Navigation
  }
};
</script>

<style>
/* Remove default padding */
ul[class],
ol[class] {
  padding: 0;
}

/* Remove default margin */
body,
h1,
h2,
h3,
h4,
p,
ul[class],
ol[class],
li,
figure,
figcaption,
blockquote,
dl,
dd {
  margin: 0;
}

/* Remove list styles on ul, ol elements with a class attribute */
ul[class],
ol[class] {
  list-style: none;
}
a {
  text-decoration: none;
}
/*End of reset*/
body {
  font-family: "Arial", "Helvetica", sans-serif;
}
.boomerFont {
  font-family: "Baskervville", serif;
}
.millennialFont {
  font-family: "Monoton", cursive;
}
a {
  color: #ffffff;
}
ul {
  list-style: none;
}

.homeButton {
  float: right;
}
</style>
