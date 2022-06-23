<template>
  <div class="nav">
    <div class="nav-list">
      <ul>
        <li>
          <router-link
            active-class="active"
            class="nav-link"
            :to="$i18nRoute({ name: 'Dashboard' })"
          >
            <svg
              width="24"
              height="20"
              viewBox="0 0 24 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M24 0V11.25H0V0H24Z" fill="#96ABE3" />
              <path d="M0 13.125H24V15H0V13.125Z" fill="#96ABE3" />
              <path
                d="M10.2 16.875H13.8V18.75H17.4C17.4 18.75 17.4 19.0298 17.4 19.375C17.4 19.7202 17.4 20 17.4 20H6.6C6.6 20 6.6 19.7202 6.6 19.375C6.6 19.0298 6.6 18.75 6.6 18.75H10.2V16.875Z"
                fill="#96ABE3"
              />
            </svg>
          </router-link>
        </li>
        <li v-if="$store.getters['user/isLogin']">
          <router-link :to="$i18nRoute({ name: 'Market' })" class="nav-link">
            <svg
              width="24"
              height="20"
              viewBox="0 0 24 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M0 0H24V8.75H0V0Z" fill="#96ABE3" />
              <path d="M10.8 14.375H0V10.625H10.8V14.375Z" fill="#96ABE3" />
              <path d="M0 20H10.8V16.25H0V20Z" fill="#96ABE3" />
              <path d="M24 14.375H13.2V10.625H24V14.375Z" fill="#96ABE3" />
              <path d="M13.2 20H24V16.25H13.2V20Z" fill="#96ABE3" />
            </svg>
          </router-link>
        </li>
        <li v-if="$store.getters['user/isLogin']">
          <router-link
            :to="$i18nRoute({ name: 'WalletBase' })"
            class="nav-link"
          >
            <svg
              width="24"
              height="20"
              viewBox="0 0 24 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0 0H24V6H13.2C13.2 6 13.2 7.79086 13.2 10C13.2 12.2091 13.2 14 13.2 14H24V20H1.47701e-05L0 0Z"
                fill="#96ABE3"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M15 8H24V12H15C15 12 15 11.1046 15 10C15 8.89543 15 8 15 8ZM16.8002 9.33333C16.8002 9.33333 16.8002 9.63181 16.8002 10C16.8002 10.3682 16.8002 10.6667 16.8002 10.6667H19.2003C19.2003 10.6667 19.2003 10.3682 19.2003 10C19.2003 9.63181 19.2003 9.33333 19.2003 9.33333H16.8002Z"
                fill="#96ABE3"
              />
            </svg>
          </router-link>
        </li>
        <li v-if="$store.getters['user/isLogin']">
          <router-link
            :to="$i18nRoute({ name: 'SettingsBase' })"
            class="nav-link"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M10.9091 0H13.3635L14.5945 2.76535C15.4093 2.99318 16.1804 3.32582 16.8922 3.74783L19.7098 2.73177L21.4394 4.49882L20.3633 7.28994C20.7568 7.98566 21.0659 8.73541 21.2767 9.52527L24 10.7687V13.2401L21.2767 14.4836C21.0572 15.3061 20.7311 16.0852 20.3141 16.805L21.3609 19.6097L19.6121 21.3578L16.8063 20.3114C16.0756 20.7344 15.284 21.0638 14.4478 21.2833L13.1942 24.0002L10.7203 23.9907L9.48772 21.264C8.66596 21.0414 7.88797 20.7124 7.16947 20.2928L4.36107 21.3283L2.61865 19.5738L3.67543 16.7733C3.25468 16.0406 2.92791 15.2472 2.71153 14.4093L0 13.1454L0.018843 10.674L2.75097 9.45175C2.97613 8.63442 3.30676 7.86078 3.72732 7.14638L2.70113 4.33449L4.46259 2.59912L7.25869 3.66465C7.99527 3.24497 8.79284 2.91999 9.63482 2.70628L10.9091 0ZM11.9927 18.0006C15.3083 18.0006 17.9962 15.3112 17.9962 11.9937C17.9962 8.67623 15.3083 5.98687 11.9927 5.98687C8.6771 5.98687 5.98926 8.67623 5.98926 11.9937C5.98926 15.3112 8.6771 18.0006 11.9927 18.0006Z"
                fill="#96ABE3"
              />
            </svg>
          </router-link>
        </li>
        <li v-if="$store.getters['user/isLogin']">
          <router-link
            :to="$i18nRoute({ name: 'WithdrawBase' })"
            class="nav-link"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M24 0H0V10.8H4.8V7.2H3.6V3.6H20.4V7.2H19.2V10.8H24V0Z"
                fill="#96ABE3"
              />
              <path
                d="M6.6 5.4H9.3C9.3 5.85599 9.1558 6.55997 8.74962 7.12412C8.37647 7.64238 7.74668 8.1 6.6 8.1V5.4Z"
                fill="#96ABE3"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M10.2104 8.17588C10.8842 7.24003 11.1 6.14401 11.1 5.4H12.9C12.9 6.14401 13.1158 7.24003 13.7896 8.17588C14.4965 9.15762 15.6667 9.9 17.4 9.9V19.5C15.6667 19.5 14.4965 20.2424 13.7896 21.2241C13.1158 22.16 12.9 23.256 12.9 24H11.1C11.1 23.256 10.8842 22.16 10.2104 21.2241C9.50352 20.2424 8.33333 19.5 6.6 19.5V9.9C8.33333 9.9 9.50352 9.15762 10.2104 8.17588ZM14.4 14.6789C14.4 16.0044 13.3255 17.0789 12 17.0789C10.6745 17.0789 9.6 16.0044 9.6 14.6789C9.6 13.3534 10.6745 12.2789 12 12.2789C13.3255 12.2789 14.4 13.3534 14.4 14.6789Z"
                fill="#96ABE3"
              />
              <path
                d="M6.6 21.3V24H9.3C9.3 23.544 9.1558 22.84 8.74962 22.2759C8.37647 21.7576 7.74668 21.3 6.6 21.3Z"
                fill="#96ABE3"
              />
              <path
                d="M14.7 24H17.4V21.3C16.2533 21.3 15.6235 21.7576 15.2504 22.2759C14.8442 22.84 14.7 23.544 14.7 24Z"
                fill="#96ABE3"
              />
              <path
                d="M15.2504 7.12412C14.8442 6.55997 14.7 5.85599 14.7 5.4H17.4V8.1C16.2533 8.1 15.6235 7.64238 15.2504 7.12412Z"
                fill="#96ABE3"
              />
            </svg>
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Nav",
  components: {},
});
</script>
