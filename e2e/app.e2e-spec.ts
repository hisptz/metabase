import { Metabase2Page } from './app.po';

describe('metabase2 App', () => {
  let page: Metabase2Page;

  beforeEach(() => {
    page = new Metabase2Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
