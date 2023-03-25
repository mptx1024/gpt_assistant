// this code provides a data structure for managing messages organized in a tree-like structure, with methods for adding, updating, and retrieving messages, as well as methods for getting specific subsets of nodes, such as roots and leaves.
// Each message is represented as a node in the tree, and nodes can have children and a parent.

import { Message } from './types';

export interface Node extends Message {
    parent: Node | null;
    children: Set<Node>;
}

// This function takes a Message object as input and returns a new Node object with the same properties as the input Message object, as well as a parent property set to null, and a children property set to an empty Set object.
export function createNode(message: Message): Node {
    return {
        ...message,
        parent: null,
        children: new Set(),
    };
}

export class MessageTree {
    public nodes: Map<string, Node> = new Map();
    // (Message | Node)[]: an array of elements, where each element can be either a Message object or a Node object.
    // = []: default to empty array when called without value for the `messages`param
    constructor(messages: (Message | Node)[] = []) {
        this.addMessages(messages);
    }
    // Takes a Message object as input, and adds it to the tree as a Node. If the message already exists in the tree, it does nothing. It also ensures that the parent-child relationship between nodes is maintained.
    public addMessage(message: Message) {
        if (this.nodes.get(message.id)?.content) {
            return;
        }
        const node = createNode(message);
        this.nodes.set(message.id, node);
        if (node.parentID) {
            let parent = this.nodes.get(node.parentID);
            //  If the parent node does not exist, create a new parent node with just the id property set.
            if (!parent) {
                // createNode function expects a Message object as input, we use a type assertion (as Message) to tell TypeScript to treat this object as an instance of the Message type. Keep in mind that this newly created node will have no content, timestamp, or done property set, as they are not provided.
                parent = createNode({
                    id: node.parentID,
                } as Message);

                this.nodes.set(parent.id, parent);
            }
            parent.children.add(node);
            node.parent = parent;
        }
        /**
         * Iterate through all nodes in the nodes map. If any node has its parentID property set to the id of the current node, do the following:
            a. Add that node as a child of the current node by adding it to the children set of the current node.
            b. Set the parent property of that node to the current node.
         */
        for (const other of Array.from(this.nodes.values())) {
            if (other.parentID === message.id) {
                node.children.add(other);
                other.parent = node;
            }
        }
    }

    public addMessages(messages: Message[]) {}

    public get roots(): Node[] {
        return [];
    }
    public get leafs(): Node[] {
        return [];
    }

    public get first(): Node | null {
        return null;
    }
    // The get method retrieves a Node object with the specified ID from the nodes map.
    public get(id: string) {
        return this.nodes.get(id);
    }
    public updateMessage(message: Message) {}
    // takes a message ID as input and returns an array containing the sequence of nodes from the root node to the specified node.
    public getMessageChainTo(messageID: string) {}
    // The serialize method returns an array of Node objects with their parent and children properties removed.

    public serialize() {}
    // The mostRecentLeaf method returns the leaf node with the most recent timestamp.

    public mostResentLeaf() {}
}
