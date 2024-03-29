import { baseUrl, logUrl } from "./data";

export async function postData(url, data) {
  const token = sessionStorage.getItem("token");
  const fd = new FormData();
  let response;

  fd.append("data", JSON.stringify(data));
  try {
    response = await (
      await fetch(`${baseUrl}${url}`, {
        method: "POST",
        body: fd,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
    ).json();
    if (response.code === 401) {
      sessionStorage.setItem("token", "");
      window.location.href = "/";
    }
    return response;
  } catch (err) {}
}

export async function getData(url) {
  const response = await (
    await fetch(`${baseUrl}${url}`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    })
  ).json();
  if (response.code === 401) {
    sessionStorage.setItem("token", "");
    window.location.href = "/";
  }
  return response;
}

export async function getUser(token) {
  const response = await (
    await fetch(`${baseUrl}client/getuser`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  ).json();
  return response;
}

export async function getToken(data) {
  return await (
    await fetch(logUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: data[0], password: data[1] }),
    })
  ).json();
}

export function fetchPromise(url) {
  return fetch(`${baseUrl}${url}`).then((response) => response.json());
}
