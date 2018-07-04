export const Camera = {
  getCameras: jest.fn(() => {
    return Promise.resolve([]);
  })
};

export const Scanner = jest.fn().mockImplementation(opts => {
  const instance = {
    __mock__: { getOptions: () => opts },

    addListener: (type, call) => call(),
    start: cam => Promise.resolve(cam),
    stop: jest.fn( () => Promise.resolve()),
    removeAllListeners: () => null
  };
  Scanner.instances.push(instance);
  return instance;
});
Scanner.instances = [];

export default { Camera, Scanner };
