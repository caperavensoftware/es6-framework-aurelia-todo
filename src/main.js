/*jshint strict: false */

export function configure(aurelia) {
  return new Promise((resolve) => {
    aurelia.use
      .standardConfiguration()
      .developmentLogging()
      .plugin('aurelia-validatejs');

    aurelia.start().then(() => {
      aurelia.setRoot();
      resolve();
    });
  });
}