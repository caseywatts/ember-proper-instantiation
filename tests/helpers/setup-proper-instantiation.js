// properInstantiation has the same signature as mirage,
// except it returns an ember-data model instance
// that is already loaded into the store
//
// This is better to pass into a component test than `mirageInstance.attrs`
// because it also supports computed properties and relationships
//
// This is similar to FactoryGuy, except a server is also spun up
// so you can test server interaction, too.
// Great for component tests for components that load additional
// data through an init hook or ember-data relationships

export function setupProperInstantiation(server, store) {
  return (modelName, hash, overrides) => {
    const mirageInstance = server.create(modelName, hash);
    const mirageInstanceNormalized = server.serializerOrRegistry.serialize(mirageInstance);
    let emberDataInstance;

    if (overrides && overrides.emberDataModelName) {
      // if the mirage model name doesn't match the ember-data model name
      // like how Mirage doesn't support models in sub-folders
      emberDataInstance = store.push(store.normalize(overrides.emberDataModelName, mirageInstanceNormalized));
    } else {
      emberDataInstance = store.push(store.normalize(modelName, mirageInstanceNormalized));
    }
    return emberDataInstance;
  };
}
