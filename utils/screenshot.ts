import download from 'downloadjs';
import * as htmlToImage from 'html-to-image';
const filter = (node: HTMLElement) => {
    const excludedClasses = ['chat-input-container'];
    console.log(
        `node:${node.id}; excludedClasses.includes(node.id): ${excludedClasses.includes(node.id)}`
    );

    return !excludedClasses.includes(node.id);
};

export const genImage = () => {
    const node = document.getElementById('chat-container');
    if (!node) return;
    htmlToImage
        // .then(function (dataUrl) {
        .toPng(node, {
            filter: filter,
            cacheBust: true,
            width: node.scrollWidth,
            height: node.scrollHeight,
        })
        //
        // })
        .then((dataUrl) => {
            download(dataUrl, 'my-node.png');
            // const link = document.createElement('a');
            // link.download = 'my-image-name.png';
            // link.href = dataUrl;
            // link.click();
        })
        .catch(function (error) {
            console.error('oops, something went wrong!', error);
        });
};
