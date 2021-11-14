import { AppModule } from './app.module';
import { SwaggerCss } from './swaggerCss';

describe('AppController', () => {
  const App = new AppModule();
  const css = SwaggerCss;

  describe('root', () => {
    it('App should be able to initialize"', () => {
      expect(App).toBeDefined();
    });
    it('Swagger css should exist and have length', () => {
      expect(css).toBeDefined();
      expect(css.length).toBeGreaterThan(1);
    });
  });
});
