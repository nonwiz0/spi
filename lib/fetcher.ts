import useSWR from "swr";

export const fetcher = (url: RequestInfo, data = undefined) =>
  fetch(
    String(url).indexOf("http") == -1 ? window.location.origin + url : url,
    {
      method: data ? "POST" : "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  ).then((r) => r.json());

export const getFetcher = (...args: any[]) => fetch(...args).then((res) => res.json());

export const getData = (url: string) => {
  const { data, error } = useSWR(url, getFetcher);
  return {
    data,
    isLoading: !error && !data,
    isError: error,
  };
};

export const useAdmin = () => {
  return getData("/api/admin");
};

export const useInventory = () => {
  return getData("/api/inventory");
};

export const usePurchase = () => {
  return getData("/api/purchase");
};

export const useCustomer = () => {
  return getData("/api/customer");
};



export const getFieldsValues = (event, fields) => {
  console.log(event, fields)
  const data = {};
  fields.forEach((item) => {
    data[item] = event.target.querySelector(`[name=${item}]`).value;
  });
  return data;
};

