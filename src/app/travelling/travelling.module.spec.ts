import { TravellingModule } from './travelling.module';

describe('TravellingModule', () => {
  let travellingModule: TravellingModule;

  beforeEach(() => {
    travellingModule = new TravellingModule();
  });

  it('should create an instance', () => {
    expect(travellingModule).toBeTruthy();
  });
});
