import {
  createRouter,
  createWebHistory,
  NavigationGuardNext,
  RouteLocation,
  RouteRecordRaw,
  RouterView,
} from "vue-router";
import Dashboard from "../views/Dashboard.vue";
import Exchange from "../views/Exchange.vue";
import CurrencyDetails from "@/views/CurrencyDetails.vue";
import WalletBase from "@/views/User/Wallet/Base.vue";
import MarketBase from "@/views/User/Market/Base.vue";
import SettingsBase from "@/views/User/Settings/Base.vue";
import i18n from "@/plugins/i18n/i18n";
import { Trans } from "@/plugins/i18n/Translation";
import store from "@/store";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: `/${i18n.global.locale.value}`,
  },
  {
    path: "/:locale",
    component: RouterView,
    beforeEnter: Trans.routeMiddleware,
    children: [
      {
        path: "",
        name: "Dashboard",
        component: Dashboard,
      },
      {
        path: "currencies/:symbol",
        name: "CurrencyDetails",
        component: CurrencyDetails,
        beforeEnter: upperCaseParamSymbol,
      },
      {
        path: "exchange",
        name: "Exchange",
        component: Exchange,
      },
      {
        path: "login",
        name: "Log In",
        component: () =>
          import(/* webpackChunkName: "auth" */ "@/views/Auth/Login.vue"),
        beforeEnter(from, to, next) {
          store.getters.isLogin ? next({ name: "WalletBase" }) : next();
        },
        props: true,
      },
      {
        path: "registration",
        name: "Register",
        component: () =>
          import(/* webpackChunkName: "auth" */ "@/views/Auth/Register.vue"),
        props: true,
      },
      {
        path: "change-password",
        name: "ChangePassword",
        component: () =>
          import(
            /* webpackChunkName: "auth" */ "@/views/Auth/ChangePassword.vue"
          ),
      },
      {
        path: "deposit",
        name: "Deposit",
        component: () =>
          import(
            /* webpackChunkName: "auth" */ "@/views/User/Deposit/Deposit.vue"
          ),
      },
      {
        path: "verification/:tokenId/:type",
        name: "Email-Phone",
        component: () =>
          import(
            /* webpackChunkName: "auth" */ "@/views/Auth/Verification/EmailPhone.vue"
          ),
      },
      {
        // path: "/:pathMatch(.*)*",
        path: ":any(.*)",
        name: "E404",
        component: () =>
          import(/* webpackChunkName: "auth" */ "@/views/Errors/E404.vue"),
      },
      {
        path: "verification/:tokenId/sumsub",
        name: "SumsubPage",
        beforeEnter: Trans.routeMiddleware,
        meta: { auth: true },
        component: () =>
          import(/* webpackChunkName: "auth" */ "@/views/Auth/Sumsub.vue"),
      },
    ],
  },
  {
    path: "/:locale/wallet",
    component: WalletBase,
    name: "WalletBase",
    beforeEnter: Trans.routeMiddleware,
    meta: { auth: true },
    redirect: { name: "WalletBalance" },
    children: [
      {
        path: "wallet-balance",
        name: "WalletBalance",
        component: () =>
          import(
            /* webpackChunkName: "office" */ "@/views/User/Wallet/Balance.vue"
          ),
      },
      {
        path: "wallet-connect",
        name: "WalletConnect",
        component: () =>
          import(
            /* webpackChunkName: "office" */ "@/views/User/Wallet/Connect.vue"
          ),
      },
    ],
  },
  {
    path: "/:locale/settings",
    component: SettingsBase,
    name: "SettingsBase",
    beforeEnter: Trans.routeMiddleware,
    meta: { auth: true },
    redirect: { name: "SettingsSecurity" },
    children: [
      {
        path: "settings-security",
        name: "SettingsSecurity",
        component: () =>
          import(
            /* webpackChunkName: "office" */ "@/views/User/Settings/Security.vue"
          ),
      },
      {
        path: "settings-verification",
        name: "SettingsVerification",
        component: () =>
          import(
            /* webpackChunkName: "office" */ "@/views/User/Settings/Verification.vue"
          ),
      },
    ],
  },
  {
    path: "/:locale/market",
    component: MarketBase,
    name: "MarketBase",
    beforeEnter: Trans.routeMiddleware,
    meta: { auth: true },
    children: [
      {
        path: "",
        name: "Market",
        component: () =>
          import(
            /* webpackChunkName: "office" */ "@/views/User/Market/Index.vue"
          ),
      },
      {
        path: ":symbol/market-operations",
        name: "MarketOperations",
        component: () =>
          import(
            /* webpackChunkName: "office" */ "@/views/User/Market/Operations.vue"
          ),
        redirect: { name: "MarketBuy" },

        children: [
          {
            path: "buy",
            name: "MarketBuy",
            component: () =>
              import(
                /* webpackChunkName: "office" */ "@/views/User/Market/Buy.vue"
              ),
          },
          {
            path: "sell",
            name: "MarketSell",
            component: () =>
              import(
                /* webpackChunkName: "office" */ "@/views/User/Market/Sell.vue"
              ),
          },
        ],
      },
    ],
  },
  {
    path: "/:locale/withdraw",
    component: () =>
      import(/* webpackChunkName: "office" */ "@/views/User/Withdraw/Base.vue"),
    name: "WithdrawBase",
    redirect: { name: "WithdrawToWallet" },
    children: [
      {
        path: "wallet",
        name: "WithdrawToWallet",
        component: () =>
          import(
            /* webpackChunkName: "office" */ "@/views/User/Withdraw/ToWallet.vue"
          ),
      },
      {
        path: "cash-out",
        name: "WithdrawCashOut",
        component: () =>
          import(
            /* webpackChunkName: "office" */ "@/views/User/Withdraw/CashOut.vue"
          ),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.meta.auth && !localStorage.getItem("token")) {
    next({ name: "Log In" });
  } else {
    next();
  }
});

export default router;

function upperCaseParamSymbol(
  to: RouteLocation,
  from: RouteLocation,
  next: NavigationGuardNext
) {
  if (
    to.name == "CurrencyDetails" &&
    !Array.isArray(to.params.symbol) &&
    to.params.symbol !== to.params.symbol.toUpperCase()
  ) {
    next({
      name: "CurrencyDetails",
      params: {
        symbol: to.params.symbol.toUpperCase(),
      },
    });
  } else {
    next();
  }
}
