const clientStorage = require('../src/client-storage');

test('setItem no expiration', () => {
    const key = 'key';
    const value = 'value';
    clientStorage.setItem(key, value);
    const result = clientStorage.getItem(key);
    expect(result).toBe(value);
});

test('setItem with expiration', async () => {
    const key = 'key';
    const value = 'value';
    const expiration = 2;
    clientStorage.setItem(key, value, expiration);
    await new Promise((r) => setTimeout(r, 1000));
    const result = clientStorage.getItem(key);
    expect(result).toBe(value);
});

test('setItem with expiration - expired', async () => {
    const key = 'key';
    const value = 'value';
    const expiration = 1;
    clientStorage.setItem(key, value, expiration);
    await new Promise((r) => setTimeout(r, 2000));
    const result = clientStorage.getItem(key);
    expect(result).toBe(undefined);
});

test('removeItem', async () => {
    const key = 'key';
    const value = 'value';
    const expiration = 1;
    clientStorage.setItem(key, value, expiration);
    clientStorage.removeItem(key);
    const result = clientStorage.getItem(key);
    expect(result).toBe(undefined);
});
