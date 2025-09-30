export const useDebounce = (func: Function, delay: number) => {
  let timeout: any;
  return (...args: any) => {
    clearTimeout(timeout);
    
    timeout = setTimeout(() => {
      func(...args);
    }, delay);
  };
};
