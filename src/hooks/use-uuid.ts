const useUuid = () => {
  const uuidPattern = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx';

  const cryptoRandomValues = new Uint32Array(uuidPattern.length / 2);
  crypto.getRandomValues(cryptoRandomValues);

  return uuidPattern.replace(/[xy]/g, (char, index) => {
    const randomValue = cryptoRandomValues[index >> 1];

    const id = char === 'x' ? randomValue & 0xffff : ((randomValue >> 16) & 0x0f) | 0x40; // Set the 4 to denote a UUID

    return id.toString(16).padStart(1, '0');
  });
};

export default useUuid;
