import {
    isTag,
    AnyNode,
    ChildNode,
    Element,
    ParentNode,
    hasChildren,
} from "domhandler";

/**
 * Get a node's children.
 *
 * @category Traversal
 * @param elem Node to get the children of.
 * @returns `elem`'s children, or an empty array.
 */
export function getChildren(elem: AnyNode): ChildNode[] {
    return hasChildren(elem) ? elem.children : [];
}

export function getParent(elem: AnyNode): ParentNode | null;
/**
 * Get a node's parent.
 *
 * @category Traversal
 * @param elem Node to get the parent of.
 * @returns `elem`'s parent node, or `null` if `elem` is a root node.
 */
export function getParent(elem: AnyNode): ParentNode | null {
    return elem.parent || null;
}

/**
 * Gets an elements siblings, including the element itself.
 *
 * Attempts to get the children through the element's parent first. If we don't
 * have a parent (the element is a root node), we walk the element's `prev` &
 * `next` to get all remaining nodes.
 *
 * @category Traversal
 * @param elem Element to get the siblings of.
 * @returns `elem`'s siblings, including `elem`.
 */
export function getSiblings(elem: AnyNode): AnyNode[] {
    const parent = getParent(elem);
    if (parent != null) return getChildren(parent);

    const siblings = [elem];
    let { prev, next } = elem;
    while (prev != null) {
        siblings.unshift(prev);
        ({ prev } = prev);
    }
    while (next != null) {
        siblings.push(next);
        ({ next } = next);
    }
    return siblings;
}

/**
 * Gets an attribute from an element.
 *
 * @category Traversal
 * @param elem Element to check.
 * @param name Attribute name to retrieve.
 * @returns The element's attribute value, or `undefined`.
 */
export function getAttributeValue(
    elem: Element,
    name: string,
): string | undefined {
    return elem.attribs?.[name];
}

/**
 * Checks whether an element has an attribute.
 *
 * @category Traversal
 * @param elem Element to check.
 * @param name Attribute name to look for.
 * @returns Returns whether `elem` has the attribute `name`.
 */
export function hasAttrib(elem: Element, name: string): boolean {
    return (
        elem.attribs != null &&
        Object.prototype.hasOwnProperty.call(elem.attribs, name) &&
        elem.attribs[name] != null
    );
}

/**
 * Get the tag name of an element.
 *
 * @category Traversal
 * @param elem The element to get the name for.
 * @returns The tag name of `elem`.
 */
export function getName(elem: Element): string {
    return elem.name;
}

/**
 * Returns the next element sibling of a node.
 *
 * @category Traversal
 * @param elem The element to get the next sibling of.
 * @returns `elem`'s next sibling that is a tag, or `null` if there is no next
 * sibling.
 */
export function nextElementSibling(elem: AnyNode): Element | null {
    let { next } = elem;
    while (next !== null && !isTag(next)) ({ next } = next);
    return next;
}

/**
 * Returns the previous element sibling of a node.
 *
 * @category Traversal
 * @param elem The element to get the previous sibling of.
 * @returns `elem`'s previous sibling that is a tag, or `null` if there is no
 * previous sibling.
 */
export function prevElementSibling(elem: AnyNode): Element | null {
    let { prev } = elem;
    while (prev !== null && !isTag(prev)) ({ prev } = prev);
    return prev;
}
