import { TicketsPipe } from './tickets.pipe';

describe('TicketsPipe', () => {
  it('create an instance', () => {
    const pipe = new TicketsPipe();
    expect(pipe).toBeTruthy();
  });
});
