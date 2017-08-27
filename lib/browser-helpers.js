export const isMobile = check(/mobile|android|iphone|ipod|ipad/i);

function check(re) {
  return re.test(navigator.userAgent.toLowerCase());
}


