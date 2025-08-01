import { types, Instance } from 'mobx-state-tree';

const globalModalProps = {
    title: '',
    message: '',
};
const globalModalObject = types.model('GlobalModal').props(globalModalProps);
const globalKeyStoreSchema = {
    isLoading: false,
    globalModalVisible: false,
    globalModalContent: globalModalObject,
};
const globalKeyStoreObject = types.model('globalKeyStore').props(
    globalKeyStoreSchema).actions((self) => ({
    toggleLoader(value = null) {
        if (value == null) {
            self.isLoading = !self.isLoading;
        } else {
            self.isLoading = value;
        }
        console.log('loader toggled to ', self.isLoading);
    },
    toggleGlobalModal(value = null) {
        if (value == null) {
            self.globalModalVisible = !self.globalModalVisible;
        } else {
            self.globalModalVisible = value;
        }
        console.log('globalmodal visible toggled to ', self.globalModalVisible);
    },
    setGlobalModalContent(title = '', message = '', children = null) {
        self.globalModalContent = globalModalObject.create({
            title,
            message,
        });
    },
  }));
export interface globalKeyStoreObjectType extends Instance<typeof globalKeyStoreObject> {}
export default globalKeyStoreObject.create({
    isLoading: false,
    globalModalVisible: false,
    globalModalContent: globalModalObject.create({ title: '', message: '' }),
});
