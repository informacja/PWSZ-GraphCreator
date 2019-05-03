// declare const width: number;
// declare const height: number;
declare const colors: any;
declare const svg: any;
declare const force: any;
declare const nodes: {
    id: number;
    reflexive: boolean;
}[];
declare let lastNodeId: number;
declare var links: {
    source: {
        id: number;
        reflexive: boolean;
    };
    target: {
        id: number;
        reflexive: boolean;
    };
    left: boolean;
    right: boolean;
}[];
declare const drag: any;
declare const dragLine: any;
declare let path: any;
declare let circle: any;
declare let selectedNode: any;
declare let selectedLink: any;
declare let mousedownLink: any;
declare let mousedownNode: any;
declare let mouseupNode: any;
declare function resetMouseVars(): void;
declare function tick(): void;
declare function restart(): void;
declare function mousedown(): void;
declare function mousemove(): void;
declare function mouseup(): void;
declare function spliceLinksForNode(node: any): void;
declare let lastKeyDown: number;
declare function keydown(): void;
declare function keyup(): void;
