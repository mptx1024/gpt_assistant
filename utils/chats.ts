export const copyToClipboard = async (text: string, setIsCopied: (value: boolean) => void): Promise<void> => {
    try {
        await navigator.clipboard.writeText(text);
        setIsCopied(true);
        setTimeout(() => {
            setIsCopied(false);
        }, 1500);
    } catch (err) {
        console.error('Failed to copy text: ', err);
    }
};

export const generateTitle = (title: string) => {};
