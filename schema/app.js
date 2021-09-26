cube(`testapi`, {
    sql: `select * from public.testapi`,
    dimensions: {
      a: {
        type: `string`,
        sql: `a`,
      },
  
      b: {
        type: `string`,
        sql: `b`,
      },
    },
  });