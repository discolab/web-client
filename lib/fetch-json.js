export default function fetchJson(apiPath) {
  return fetch(`${__API_HOST__}/${apiPath}`).then((resp) => resp.json());
}
