<template>
  <div class="container">
    <svg
      width="160"
      height="165"
      viewBox="0 0 32 33"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="Frame 1171276001">
        <path
          id="Home"
          d="M15.3174 13.7529C15.7003 13.4254 16.2653 13.415 16.6602 13.7285L19.9824 16.3652V16.3662C20.1522 16.5072 20.2499 16.7149 20.25 16.9326V21.2891C20.2499 21.6096 20.1213 21.9181 19.8916 22.1455C19.6618 22.3729 19.3494 22.5008 19.0234 22.5H18.0449C17.9769 22.4994 17.9278 22.4456 17.9277 22.3867V20.8574C17.9276 20.1877 17.3816 19.6514 16.7158 19.6514H15.2764C14.6135 19.6555 14.0724 20.1907 14.0723 20.8574V21.8906H14.0537V22.3906C14.0537 22.4185 14.0425 22.4461 14.0215 22.4668C14.0003 22.4877 13.9708 22.5002 13.9395 22.5H12.9785C12.2969 22.5 11.75 21.9522 11.75 21.2842V16.9443C11.7553 16.7232 11.8603 16.5149 12.0381 16.3779L12.0459 16.3721L15.3047 13.7627L15.3115 13.7578L15.3174 13.7529Z"
          fill="white"
          stroke="#B28CFF"
        />
        <circle id="Ellipse_90" cx="16" cy="29" r="1" fill="#B28CFF" />
      </g>
    </svg>
  </div>
</template>

<style>
.container {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

#Home {
  width: 9.5px;
  height: 10px;
  animation: 0.5s linear 0s 1 normal forwards running Home;
  /* animation: 0.5s linear 0s infinite normal forwards running Home; */
  transform-box: fill-box;
  transform-origin: 50% 50%;
}
@keyframes Home {
  0% {
    transform: scaleX(2) scaleY(2);
    fill: rgba(255, 255, 255, 1);
  }
  100% {
    fill: rgba(178, 140, 255, 1);
    transform: scaleX(2) scaleY(2);
  }
}
#Ellipse_90 {
  width: 2px;
  height: 2px;
  animation: 0.5s linear 0s 1 normal forwards running Ellipse_90;
  /* animation: 0.5s linear 0s infinite normal forwards running Ellipse_90; */
  transform-box: fill-box;
  transform-origin: 50% 50%;
}
@keyframes Ellipse_90 {
  0% {
    transform: translateY(1px) scaleX(2) scaleY(2);
  }
  50% {
    transform: translateY(-3px);
  }
  100% {
    transform: translateY(1px) scaleX(2) scaleY(2);
  }
}
</style>