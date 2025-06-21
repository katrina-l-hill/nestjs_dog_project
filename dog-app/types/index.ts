export interface Breed {
    id: string;
    attributes: {
      name: string;
      description?: string;
    };
  }
  
  export interface Fact {
    id: string;
    attributes: {
      body: string;
    };
  }
  
  export interface Group {
    id: string;
    attributes: {
      name: string;
    };
  }
  
  export interface Dog {
    id: number;
    name: string;
    breed: string;
    age: number;
  }