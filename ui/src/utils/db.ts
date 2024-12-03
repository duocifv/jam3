import { JSONFilePreset } from 'lowdb/node';

type Database<T> = {
  update: (callback: (data: T) => T) => Promise<void>;
  data: T;
};

export const create = async <T>(path: string, defaultData: T) => {
  return await JSONFilePreset<T>(`src/modules/${path}/db.json`, defaultData);
};

export const put = async <T extends Record<string, any[]>>(
  db: Database<T>,
  key: keyof T,
  newData: Array<any>
): Promise<void> => {
  await db.update((data) => {
    const currentData = data[key] as any[]; // Ép kiểu tạm thời
    const added = newData.filter((newItem) => !currentData.some((item) => item.id === newItem.id));
    const removed = currentData.filter((item) => !newData.some((newItem) => newItem.id === item.id));

    data[key] = [
      ...currentData.filter((item) => !removed.some((removedItem) => removedItem.id === item.id)),
      ...added,
    ] as T[keyof T]; // Ép kiểu lại cho phù hợp

    return data;
  });
};
