import * as React from "react";

// [HELPER COMPONENTS] -> Better code styling
const D = React.forwardRef((props, ref) => {
  const { cn, ...rest } = props;
  return <div ref={ref} className={cn} {...rest} />;
});

const data = {
  send: async (table, action, fields) => {
    console.log(
      JSON.stringify({
        table,
        action,
        ...fields,
      })
    );
    try {
      const req = await fetch(process.env.REACT_APP_PHP_SERVER_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          table,
          action,
          ...fields,
        }),
      });
      const res = await req.json();
      return res;
    } catch (error) {
      return error.toString();
    }
  },
  get: async (keyValuePairs) => {
    // const response = await fetch(`${url}?${queryString}`, {
    //         method: 'GET',
    //         headers: {},
    //         url: "/download.jsp"
    //     }
    // )
    // return response;
  },
};

export { D, data };
