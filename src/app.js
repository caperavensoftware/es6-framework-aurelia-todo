export class App {
  constructor() {
    this.message = "Hello World";
  }
  
  configureRouter(config, router) {
    config.title = 'ES6 Framework Aurelia';
    config.map([
      {route: ['', 'welcome'], name: 'welcome',      moduleId: 'welcome/welcome',      nav: true, title: 'Welcome'},
    ]);

    this.router = router;
  }
}