export class  SpecificationSetting {
  temperature: number | null;
  time: number | null;
  id: number;
  isFinish: boolean;

  constructor(init?: Partial<SpecificationSetting>){
    Object.assign(this, init);
  }
};