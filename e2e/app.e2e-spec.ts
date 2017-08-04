import { Ng4authPage } from './app.po';

describe('ng4auth App', () => {
  let page: Ng4authPage;

  beforeEach(() => {
    page = new Ng4authPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
