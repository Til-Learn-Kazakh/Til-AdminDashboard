// types/unit.types.ts
export type Unit = {
  id: string;
  title: string;
  level_id: string;
  progress: number;
  created_at: string;
  updated_at: string;
  descriptions: {
    en: string;
    ru: string;
    kk: string;
  };
  tasks: string[];
  completed: string[];
};

export type CreateUnitDto = {
  title: string;
  level_id: string;
  descriptions: {
    en: string;
    ru: string;
    kk: string;
  };
};
export type UpdateUnitDto = {
  title: string;
  descriptions: {
    en: string;
    ru: string;
    kk: string;
  };
};
