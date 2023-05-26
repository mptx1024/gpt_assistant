export interface ChatOptions {
    userInput: string;
    onController?: (controller: AbortController) => void;
}

const chat = async function ({ userInput, onController }: ChatOptions) {
    const controller = new AbortController();
    onController?.(controller);

    const response = await fetch('/api/generateReply', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userInput),
        signal: controller.signal,
    });
    // rest of code ommited
};

//Call chat()
chat({
    userInput: '',
    onController(controller) {
        fetchController.setController(controller);
    },
});

export const fetchController = {
    controller: undefined as AbortController | undefined,
    setController(controller: AbortController) {
        this.controller = controller;
    },
    stop() {
        this.controller?.abort();
    },
    remove() {
        delete this.controller;
    },
};


export interface ChatOptions {
    userInput: string;
    onController?: (controller: AbortController) => void;
}
