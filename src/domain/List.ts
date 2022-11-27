export interface List {
  elements: any[];
  random: () => any[];
  add: (element: any) => any[];
}

export function createList(elements: any[] = []): List {
  return {
    elements,
    add: function (element) {
      return [...this.elements, element];
    },
    random: () => {
      let res: number[] = [];

      for (let i = 0; i < Math.floor(Math.random() * 100); i++) {
        res = [...res, Math.floor(Math.random() * 200)];
      }

      return res;
    },
  };
}
