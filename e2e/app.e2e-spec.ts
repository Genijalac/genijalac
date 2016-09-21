import { GenijalacPage } from './app.po';

describe('genijalac App', function() {
  let page: GenijalacPage;

  beforeEach(() => {
    page = new GenijalacPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
