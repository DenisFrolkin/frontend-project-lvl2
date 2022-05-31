
import path from 'path';
import { readFileSync } from 'fs'
import _ from 'lodash';


    const gendiff = (filepath1, filepath2) => {
      const obj1 = JSON.parse(readFileSync(path.resolve(process.cwd(), filepath1)));
      const obj2 = JSON.parse(readFileSync(path.resolve(process.cwd(), filepath2)));
           
      const keys = _.sortBy(Object.keys({...obj1, ...obj2}));
      const newData = keys.map((key) => {
        const res = {};
        if (obj1[key] === obj2[key]) {
          res.newKey = key;
          res.value1 = obj1[key];
          res.value2 = obj2[key];
          return res;
        }
          else if (obj1[key] && obj2[key]) {
          res.newKey = key;
          res.value1 = obj1[key];
          res.value2 = obj2[key];
          return res;
        } 
          else if (!obj2[key]) {
          res.newKey = key;
          res.value1 = obj1[key];
          return res;
        } else {
          res.newKey = key;
          res.value2 = obj2[key];
          return res;
        }
      });

      console.log('{')
      for (const obj of newData) {
        if (obj.value1 === obj.value2) {
          console.log(`   ${obj.newKey}: ${obj.value1}`);
        }
        else if (obj.value1 && obj.value2) {
          console.log(` - ${obj.newKey}: ${obj.value1}`);
          console.log(` + ${obj.newKey}: ${obj.value2}`);
        }
        else if (!obj.value2) {
          console.log(` - ${obj.newKey}: ${obj.value1}`);
        }
        else {
          console.log(` + ${obj.newKey}: ${obj.value2}`);
        }
      }
      console.log('}')
    };    
    
 
export default gendiff;