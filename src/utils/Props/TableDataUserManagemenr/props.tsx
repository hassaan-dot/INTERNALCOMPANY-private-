import {Company} from '../types'
export const generateData = (): Company[] => {
    return Array.from({ length: 10 }, (_, i) => ({
      id: i + 143444444,
      email: `user${i + 1}@example.com`,
      phone: `(+971) 7 35 55 45 ${i}`,
      contactPerson: `Person ${i + 1}`,
      companyName: `Company ${i + 1}`,
      Status: i % 2 === 0 ? "Approved" : "Pending",
    }));
  };
  
