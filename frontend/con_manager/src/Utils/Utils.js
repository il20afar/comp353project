import * as React from "react";

// [HELPER COMPONENTS] -> Better code styling
const D = React.forwardRef((props, ref) => {
  const { cn, ...rest } = props;
  return <div ref={ref} className={cn} {...rest} />;
});

const url = "http://localhost:80/comp353project/backend/main.php";
const data = {
  send: async (type, action, fields) => {
    const alskd = JSON.stringify({
      type,
      action,
      ...fields,
    })
    console.log(alskd)
    try {
      const req = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type,
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
