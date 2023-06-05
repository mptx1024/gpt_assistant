import download from 'downloadjs';
import * as htmlToImage from 'html-to-image';
const filter = (node: HTMLElement) => {
    const excludedClasses = ['chat-params-card', 'chat-message-btn-group'];
    console.log(
        `node:${node.id}; excludedClasses.includes(node.id): ${excludedClasses.includes(node.id)}`
    );

    return !excludedClasses.includes(node.id);
};


export const getImage = () => {
    const node = document.getElementById('chat-messages-container');

    if (!node) return;
    htmlToImage
        .toPng(node, {
            filter: filter,
            cacheBust: true,
            height: node.scrollHeight,
            skipAutoScale: true,
            style: {
                color: '#000000',
                backgroundColor: '#ffffff',
                overflowWrap: 'break-word',
            },
        })
        .then((dataUrl) => {
            download(dataUrl, 'my-node.png');
            // const link = document.createElement('a');
            // link.download = 'my-image-name.png';
            // link.href = dataUrl;
            // link.click();
        })
        .catch(function (error) {
            console.error(error);
        });
};

export const getPdf = () => {
    const node = document.getElementById('chat-container');
    if (!node) return;
};
