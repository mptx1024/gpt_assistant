import * as htmlToImage from 'html-to-image';

const filter = (node: HTMLElement) => {
    const excludedClasses = ['chat-input-container', 'chat-message-btn-group'];
    console.log(
        `node:${node.id}; excludedClasses.includes(node.id): ${excludedClasses.includes(node.id)}`
    );

    return !excludedClasses.includes(node.id);
};

type CSSProperties = {
    [property: string]: string | number;
};
function applyStylesToChildren(element: HTMLElement, styles: CSSProperties) {
    // Apply styles to the current element
    for (let property in styles) {
        if (typeof property === 'string' && property in element.style) {
            (element.style as any)[property] = styles[property];
        }
    }

    // Recursively apply styles to each child
    for (let i = 0; i < element.children.length; i++) {
        let child = element.children[i];
        if (child instanceof HTMLElement) {
            applyStylesToChildren(child, styles);
        }
    }
}

let styles = {
    color: '#000000',
    backgroundColor: '#ffffff',
    // overflowWrap: 'break-word',
    border: '1px solid #000000',
};

export const getImage = () => {
    const node = document.getElementById('chat-container');

    if (!node) return;
    // const cloneNode = node.cloneNode(true) as HTMLElement;
    // const children = cloneNode.getElementsByTagName('*');
    // // Apply the style to the target element and its children
    // for (let i = 0; i < children.length; i++) {
    //     const child = children[i] as HTMLElement;
    // child.style.color = '#000000';
    // child.style.backgroundColor = '#ffffff';

    // }
    // cloneNode.id = 'chat-container-clone';
    // applyStylesToChildren(cloneNode, styles);
    // document.body.appendChild(cloneNode);
    htmlToImage
        .toPng(node, {
            filter: filter,
            cacheBust: true,
            height: node.scrollHeight,
            skipAutoScale: true,
            backgroundColor: 'red',
            style: {
                color: 'black',
                backgroundColor: 'white',
                overflowWrap: 'break-word',
            },
        })
        .then((dataUrl) => {
            // download(dataUrl, 'my-node.png');
            const link = document.createElement('a');
            link.download = 'my-image-name.png';
            link.href = dataUrl;
            link.click();
        })
        .catch(function (error) {
            console.error(error);
        });
};

export const getPdf = () => {
    const node = document.getElementById('chat-container');
    if (!node) return;
};
