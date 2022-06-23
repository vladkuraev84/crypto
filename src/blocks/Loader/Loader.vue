<template>
  <div class="loader" />
</template>

<style lang="scss" scoped>
.loader,
.loader:after {
  border-radius: 50%;
  width: 20px;
  height: 20px;
}
.loader {
  margin: auto;
  font-size: 10px;
  position: absolute;
  text-indent: -9999em;
  border-top: 1.1em solid rgba(70, 127, 237, 0.2);
  border-right: 1.1em solid rgba(70, 127, 237, 0.2);
  border-bottom: 1.1em solid rgba(70, 127, 237, 0.2);
  border-left: 1.1em solid #467FED;
  -webkit-transform: translateZ(0);
  -ms-transform: translateZ(0);
  transform: translateZ(0);
  -webkit-animation: load 1.1s infinite linear;
  animation: load 1.1s infinite linear;
}

@-webkit-keyframes load {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
@keyframes load {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}

</style>