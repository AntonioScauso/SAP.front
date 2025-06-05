import { UserContext } from "../contexts/UserContext"
import { useContext } from "react";

const hosts = ['http://192.168.0.102:8000/', "https://sap.dealbera.online/", "http://localhost:8000/"];

const hostId = 2;

export const host = hosts[hostId];

async function customFetch(url, requestInit) {
  try {
    const response = await fetch(url, requestInit);
    const responseText = await response.text();

    if (!response.ok) {
      throw new Error(responseText);
    }

    try {
      return JSON.parse(responseText);
    } catch (error) {
      console.log(error);
      return [];
    };
  } catch (error) {
    throw new Error(error)
  };
};

export default function useFetch() {
  const userContext = useContext(UserContext);
  const token = userContext?.token;
  console.log(host)

  function getHeaderToken(header = {}) {
    return { ...header, 'Authorization': `Token ${token}` };
  }

  async function getFetch(url, loginRequired = false) {
    let headers = {};

    if (loginRequired) {
      headers = getHeaderToken(headers);
    }

    console.log(headers);

    return customFetch(url, { method: 'GET', headers: headers });
  };

  async function postFetch(url, body, loginRequired = false) {
    let headers = { 'Content-Type': 'application/json' };

    if (loginRequired) {
      headers = getHeaderToken(headers);
    }

    return customFetch(url, { method: 'POST', headers: headers, body: JSON.stringify(body) });
  };

  async function putFetch(url, body, loginRequired = false) {
    let headers = { 'Content-Type': 'application/json' }

    if (loginRequired) {
      headers = getHeaderToken(headers);
    }

    return customFetch(url, { method: 'PUT', headers: headers, body: JSON.stringify(body) });
  };

  async function postProductsFetch(url, formData, loginRequired = false) {
    let headers = {};

    if (loginRequired) {
      headers = getHeaderToken(headers);
    }

    return customFetch(url, { method: 'POST', body: formData, headers: headers });
  };

  async function putProductsFetch(url, formData, loginRequired = false) {
    let headers = {}

    if (loginRequired) {
      headers = getHeaderToken(headers);
    }

    return customFetch(url, { method: 'PUT', headers: headers, body: formData });
  };

  async function deleteFetch(url, body, loginRequired = false) {
    let headers = { 'Content-Type': 'application/json' };

    if (loginRequired) {
      headers = getHeaderToken(headers);
    }

    return customFetch(url, { method: 'DELETE', headers: headers, body: JSON.stringify(body) });
  };

  return { getFetch, postFetch, putFetch, postProductsFetch, putProductsFetch, deleteFetch };
}