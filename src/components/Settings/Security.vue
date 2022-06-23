<template>
  <div class="white-block settings-block">
    <h2 class="title-sub text-center">Account Settings</h2>
    <ul class="security-list">
      <li v-if="userData.Email">
        <div class="settings-block--info">
          <p><strong>Email</strong></p>
          <p>
            {{ strSub(3, 8, userData.Email) }}
          </p>
        </div>
        <!--        <button class="btn btn-link">Change</button>-->
      </li>
      <li v-else>
        <div class="settings-block--info">
          <p><strong>Phone Number</strong></p>
          <p>
            {{ strSub(5, 10, userData.MobilePhone) }}
          </p>
        </div>
        <!--        <button class="btn btn-link">Change</button>-->
      </li>
      <li>
        <div class="settings-block--info">
          <p><strong>Password</strong></p>
          <p>***********************</p>
        </div>
        <!--        <button class="btn btn-link">Change</button>-->
      </li>
      <li>
        <button class="btn btn-link">
          <strong>Enable Google Authenticator</strong>
        </button>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useStore } from "vuex";
import { subString } from "@/filters/subString.ts";

export default defineComponent({
  name: "Security",
  components: {},
  setup() {
    const store = useStore();
    const userData = store.getters["user/dataUser"];
    const strSub = subString;

    return {
      userData,
      strSub,
    };
  },
});
</script>
