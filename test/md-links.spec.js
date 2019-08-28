const mdLinks = require('../');

describe('mdLinks', () => {
  it('should return true for a valid .md file', () => {
    expect(mdLinks, mdSearch('../README.md')).toBe(true);
    //console.log('FIX ME!');
  });

  it('should return false for an invalid .md file', () => {
    expect(mdLinks.mdSearch('../index.js')).toBe(false);
  });
});
