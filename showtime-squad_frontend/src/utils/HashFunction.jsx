function hashToIndex(key, arraySize) {
    let hash = 0;
    for (let i = 0; i < key.length; i++) {
        hash = (hash << 5) - hash + key.charCodeAt(i);
    }
    return Math.abs(hash) % arraySize;
}

export { hashToIndex }