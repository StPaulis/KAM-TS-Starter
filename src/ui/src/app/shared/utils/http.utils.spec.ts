import { async } from '@angular/core/testing';
import { catchHttpError } from './http.utils';

describe('Catch Http Error Response', () => {
  beforeEach(() => {
    spyOn(window, 'alert');
  });

  it('Should return error message', async(async () => {
    catchHttpError({ error: { message: 'Message' } }).subscribe(() => {
      expect(window.alert).toHaveBeenCalled(); // TODO: change when toaster replace alert
    });
  }));
});
