export const encodeString = (str) => window.btoa(unescape(encodeURIComponent(str)));
export const hasSubstr = (str, substr) => str.indexOf(substr) > -1;
