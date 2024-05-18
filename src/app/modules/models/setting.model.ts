export class  SpecificationSetting {
  temperature: number;
  time: number;
  id: number;
  isFinish: boolean;

  constructor(init?: Partial<SpecificationSetting>){
    Object.assign(this, init);
  }
};