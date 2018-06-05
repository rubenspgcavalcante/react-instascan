export const Camera = {
  getCameras: jest.fn(() => {
    return Promise.resolve([]);
  })
};

export const Scanner = jest.fn().mockImplementation(opts => {
  Scanner.instances.push({ __mock__: { getOptions: () => opts } });

  return {
    addListener: () => null,
    start: () => null
  };
});
Scanner.instances = [];

export default { Camera, Scanner };
