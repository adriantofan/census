import { Selector } from 'testcafe';

fixture('/login').page('http://localhost:3007');

test(`users should be able to select a category and see results`, async (t) => {
  const select = Selector('div[class=Select-placeholder]').nth(1);

  // select education
  await t
    .navigateTo('http://localhost:3007')
    .click('#react-select-2--value')
    .click(Selector('span', { text: 'education' }))
    .expect(Selector('td',{ text: 'Less than 1st grade' } ))
    
});
