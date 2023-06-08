import * as htmlToImage from 'html-to-image';
import { jsPDF } from 'jspdf';

const filter = (node: HTMLElement) => {
    const excludedClasses = ['chat-params-card', 'chat-message-btn-group', 'chat-input-container'];
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
        })
        .then((dataUrl) => {
            // download(dataUrl, 'my-node.png');
            const link = document.createElement('a');
            link.download = 'gptAssistant_chat.png';
            link.href = dataUrl;
            link.click();
        })
        .catch(function (error) {
            console.error(error);
        });
};

export const getPdf = () => {
    const node = document.getElementById('chat-messages-container');
    if (!node) return;
    htmlToImage
        .toJpeg(node, {
            filter: filter,
            cacheBust: true,
            height: node.scrollHeight,
            skipAutoScale: true,
        })
        .then((dataUrl) => {
            const pdf = new jsPDF({
                unit: 'px',
                format: [node.clientWidth, node.scrollHeight],
                hotfixes: ['px_scaling'],
            });
            pdf.addImage(
                dataUrl,
                'JPEG',
                0,
                0,
                pdf.internal.pageSize.getWidth(),
                pdf.internal.pageSize.getHeight()
            );
            pdf.save('gptAssistant_chat.pdf');
        });
};
