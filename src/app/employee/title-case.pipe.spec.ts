import { TitleCasePipe } from './title-case.pipe';

describe('TitleCasePipe', () => {

  it('create an instance', () => {
    const pipe = new TitleCasePipe();
    expect(pipe).toBeTruthy();
  });

  it('should convert to title case', () => {
    const pipe = new TitleCasePipe();
    expect(pipe.transform('karthik', 'e')).toBe('Karthik E');
  });
});
