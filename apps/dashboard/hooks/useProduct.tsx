export type ProductType = 'chatvolt' | 'cs' | 'chat' | 'blablaform';
import React, { useContext, useEffect } from 'react';
import { createContext } from 'react';

export const ProductContext = createContext('chatvolt' as ProductType);

export const getProductFromHostname = (hostname?: string): ProductType => {
  if (!hostname) {
    return 'chatvolt';
  }

  if (
    ['cs.chatvolt.ai', 'cs.localhost', 'cs.localhost:3000'].includes(hostname)
  ) {
    return 'cs';
  } else if (
    ['chat.chatvolt.ai', 'chat.localhost', 'chat.localhost:3000'].includes(
      hostname
    )
  ) {
    return 'chat';
  }
  // ['agents.localhost', 'localhost'].includes(window.location.hostname)
  else {
    return 'chatvolt';
  }
};

const useProduct = () => {
  const product = useContext(ProductContext);

  return {
    product,
  };
};

export default useProduct;
