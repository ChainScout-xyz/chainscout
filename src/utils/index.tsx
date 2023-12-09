export const calculatePercentage = (array1: string[], array2: string[]) => {
    // Step 1: Determine the total number of addresses
    const totalAddresses = [...new Set([...array1, ...array2])].length;

    // Step 2: Identify common addresses
    const commonAddresses = array1.filter(address => array2.includes(address));

    // Step 3: Calculate the percentage
    const percentage = (commonAddresses.length / totalAddresses) * 100;

    return Number(percentage);
};


export const shortenAddress = (address: string, chars = 4): null | string => {
    if (!address) {
        return null;
    }
    const parsed = (address)
    return `${parsed.substring(0, chars + 2)}...${parsed.substring(address.length - chars)}`
}
