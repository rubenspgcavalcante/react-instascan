const Camera = {
  getCameras: jest.fn(() => {
    return Promise.resolve([]);
  })
};

const Scanner = jest.fn().mockImplementation(opts => {
  Scanner.instances = [];
  const instance = {
    __mock__: { getOptions: () => opts },

    addListener: (type, call) => call(),
    start: cam => Promise.resolve(cam),
    stop: jest.fn(() => Promise.resolve()),
    removeAllListeners: () => null
  };
  Scanner.instances.push(instance);
  return instance;
});

export { Camera, Scanner };
export default { Camera, Scanner };
