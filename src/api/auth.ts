import http from "@/api/http.ts";

export async function login({ email, phone, password }) {
  const { data } = await http.post(
    "/User/login",
    { email, phone, password },
    { data: { errorAlert: "Smth wrong with login process" } }
  );
  // localStorage.setItem("token", data.token);
  return data;
}

export async function registration({ email, phone, password }) {
  const { data } = await http.post(
    "/User/signUp",
    { email, phone, password },
    { data: { errorAlert: "Smth wrong with registration process" } }
  );
  return data;
}

export async function getUser() {
  const { data } = await http.get(`/User`);
  return data;
}

export async function getBalance() {
  const { data } = await http.get(`/Exchange/balance`);
  return data;
}

export async function verifyLogReg({ verifyType, userId, otpCode }) {
  const { data } = await http.post(
    `/User/${verifyType}/${userId}/verify?otpCode=${otpCode}`
  );
  return data;
}

export async function verifyReSend({ userId }) {
  const { data } = await http.get(`/User/reSend/${userId}`);
  return data;
}

export async function sumsubTestComplete({ applicantId, externalUserId }) {
  const { data } = await http.post(
    `/Verification/sumsub/testcomplete/${applicantId}?ExternalUserId=${externalUserId}`
  );
  return data;
}

export async function postVoucher({ voucher }) {
  const { data } = await http.post(
    `/Exchange/deposit/fiat?voucher=${voucher}`
  );
  return data;
}

export async function check() {
  try {
    const { data } = await http.get("/");
    return data;
  } catch (e) {
    return { res: false };
  }
}
