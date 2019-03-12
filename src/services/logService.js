import * as Sentry from "@sentry/browser";

function init() {
  Sentry.init({
    dsn: "https://9f2725155fe94b439826d52911139dcb@sentry.io/1406698"
  });
}

function log(error) {
  Sentry.captureException(error);
}

export default {
  init,
  log
};
